import { OpenAI } from "@langchain/openai";
import { RetrievalQAChain } from "langchain/chains";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

export const process_doc = async (
  filename: string | undefined,
  question: string
) => {
  const model = new OpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: 0.9,
    openAIApiKey: "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",
  });

  const loader = new PDFLoader(
    `C:/Users/Martínez/Desktop/dispositivos/mobil-2-main/backend/uploads/${filename}`,
    {
      splitPages: false,
    }
  );

  const doc = await loader.load();

  const vectorStore = await MemoryVectorStore.fromDocuments(
    doc,
    new OpenAIEmbeddings( {openAIApiKey: "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",})
  );


  const vectorStoreRetriever = vectorStore.asRetriever();
  const chain = RetrievalQAChain.fromLLM(model, vectorStoreRetriever);

  return await chain.invoke({
    query: question,
    
  });

};