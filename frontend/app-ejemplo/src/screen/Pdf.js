import React, {useState} from "react";
import {Text, View, StyleSheet, Button, TextInput} from "react-native";
import * as ExpoDocumentPicker from "expo-document-picker";
import axios from 'axios';

const Pdf = () => {
    const [pdfDoc, setPdfDoc] = useState()
    const [question, setQuestion] = useState('')
    const [result, setResult] = useState('')
    const handleFilePicker = async () => {
        let result = await ExpoDocumentPicker.getDocumentAsync({copyToCacheDirectory: true});
        setPdfDoc(result.file)
    }
    const handleUpload = async () => {
        try {
            const data = new FormData();
            data.append('question', question);
            data.append('file', pdfDoc);
        
            console.log(data.get('file'));
        
            const response = await axios.post('http://localhost:9004/upload', data);
        
            if (response.status === 200) {
                setQuestion('');
                const responseJSON = response.data;
                setResult(responseJSON.text);
            }
        } catch (error) {
            console.error(error);
        }

    }

    return (
        <View>
            <Button title={'Select PDF'} onPress={handleFilePicker}/>
            <TextInput style={styles.input} value={question} onChangeText={setQuestion}
                       placeholder={'Ingresa tu pregunta'}/>
            <Button title={'send'} onPress={handleUpload}/>
            <Text>{result}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    input: {
        backgroundColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10
    }
})
export default Pdf