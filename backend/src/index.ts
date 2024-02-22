import cors from "cors"
import multer from "multer";
import * as dotenv from 'dotenv';
import {v4 as uuidv4} from 'uuid';
import express, {response} from "express"
import {process_doc} from "./lang_script";

dotenv.config()
const app = express()
app.use(express.json())
const PORT = 9004
app.use(cors())
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads')
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname)
    }
})
const upload = multer({
    storage,
    fileFilter(req, file, callback: multer.FileFilterCallback) {
        const fileExtension = path.extname(file.originalname)
        if (!fileExtension.includes('.pdf')) {
            callback(new Error('Only pdfs ara allowed'))
        }
        callback(null, true)
    }
})

import {OpenAI, } from 'openai'
import * as path from "path";

const openai = new OpenAI({
    apiKey: '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', // This is the default and can be omitted
  });

const generatePrompt = (numberToConvert: number) => {
    return ` Tu tienes un rol de convertidor binario y requiero que conviertes este numero ${numberToConvert} a  binario`

}
const generateContador = (numberToConvert: number) => {
    return ` Tu tienes un rol de contar el numero de letras del siguiente texto sin contar los espacios solo las letras :${numberToConvert} `

}
let names = [
    {
        id: uuidv4(),
        firstName: 'Paul',
        lastName: 'Martinez'
    },
    {
        id: uuidv4(),
        firstName: 'Lea',
        lastName: 'Rolfes'
    }
]
app.get("/ping", (req, res) => {
    console.log("alguien ha dado pin!!")
    res.setHeader("Content-Type", "application/json")
    res.send("pong")
})


app.post('/upload', upload.single('file'), async (req, res) => {
    if (!req.file || !req.body?.question) {
        return res.status(400).send()
    }
    const response = await process_doc(req.file?.filename, req.body.question)
    res.send(response)
   
})
app.get("/hola/:nombre/:apellido", (req, res) => {
    console.log("alguien ha dado pin!!")
    res.setHeader("Content-Type", "application/json")
    const nombre = req.params.nombre
    const apellido = req.params.apellido
    console.log("alguien ha ingresado su nombre")
    res.send({nombre, apellido})
})

app.get('/nombres', (req, res) => {

    res.setHeader('Content-Type', 'application/json')
    res.send(names)
})

app.post('/nombres', (req, res) => {
    const item = {...req.body, id: uuidv4()};
    names.push(item)
    res.send(item)
})

app.post("/openapi", async (req, res) => {
    console.log();
    const { prompt } = req.body;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: generatePrompt(prompt) }],
    });
  
    // @ts-ignore
    res.send({
      // @ts-ignore
      result: completion.choices[0].message.content,
      token: completion.usage?.completion_tokens,
      // @ts-ignore
    });
  });
  app.post("/contador", async (req, res) => {
    console.log();
    const { prompt } = req.body;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: generateContador(prompt) }],
    });
  
    // @ts-ignore
    res.send({
      // @ts-ignore
      result: completion.choices[0].message.content,
      token: completion.usage?.completion_tokens,
      // @ts-ignore
    });
  });

app.delete('/nombres/:id', (req, res) => {
    names = names.filter(n => n.id !== req.params.id)
    res.status(204).end()
})

app.get('/nombres/:id', (req, res) => {
    const searchedName = names.find(n => n.id === req.params.id)
    if (!searchedName)
        res.status(400).end()
    res.send(searchedName)
})

app.put('/nombres/:id', (req, res) => {
    const index = names.findIndex(n => n.id === req.params.id)
    if (index === -1)
        res.status(404).end()
    names[index] = {...req.body, id: req.params.id}
    res.status(204).end()
})
app.listen(PORT, () => {
    console.log(`running application ${PORT}`)

})


