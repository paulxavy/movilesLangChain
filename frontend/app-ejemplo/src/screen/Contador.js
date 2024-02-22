import React, {useState} from "react";
import {TextInput, View, StyleSheet, Text, Button} from "react-native";
import axios from 'axios';


const Chat = () => {
    const [prompt, setPrompt] = useState('')
    const [result, setResult] = useState('')

    const getResultFromOpenApi = async () => {
        try {
            const response = await axios.post('http://192.168.1.40:9004/contador', {
                prompt
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        
            const jsonData = response.data;
            setResult(`${jsonData.result} y los token utilizados fueron ${jsonData.token}`);
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {'Ingrese la palabra que quieras contar las letras'}
            </Text>
            <TextInput style={styles.input} value={prompt} onChangeText={setPrompt}/>
            <Button title={'Enviar'} onPress={getResultFromOpenApi}/>
            <Text style={styles.text}>
                {result}
            </Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center'
    },
    input: {
        backgroundColor: 'green',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold'
    }
})

export default Chat