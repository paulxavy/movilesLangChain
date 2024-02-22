import React from "react";
import {View, Text, StyleSheet, Image, Linking,TouchableWithoutFeedback} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import paul from "../../../assets/paul.jpg"
import CustomIcon from "../../../assets/kwai.png"
//import I from 'react-native-vector-icons/KwaiIconLibrary';
const twitter = <Icon name={'twitter'} size={30} color={'black'}/>
const facebook = <Icon name={'facebook'} size={30} color={'black'}/>
const kwai = <Icon name={'kwai'} size={30} color={'black'}/>
const twitch = <Icon name={'twitch'} size={30} color={'black'}/>
const reddit = <Icon name={'reddit'} size={30} color={'black'}/>
const load = <Image source={CustomIcon} style={{ width: 50, height: 50 }} />
//const file = {test}
const ProfileCard = () => {
    const user = {
        avatar: paul,
        coverPhoto: "https://1.bp.blogspot.com/-Zloi1ZJhubw/T0bUdC_UiOI/AAAAAAAAADE/zYXx7Vxlu7k/s1600/Plaza%2BIndoam%252B%25C2%25AErica%2B3.JPG",
        name: "Paul Martinez"
    }
    return (
        <View style={styles.container}>
            <Image source={{uri: user.coverPhoto}} style={styles.coverPhoto}/>
            <View style={styles.avatarContainer}>
                <Image source={{uri: user.avatar}} style={styles.avatar}/>
                <Text style={styles.name}>
                    {user.name}
                </Text>
            </View>
            <View style={styles.buttonContainer}>

                <TouchableWithoutFeedback style={{color: 'blue'}} onPress={() => {
                    Linking.openURL('https://facebook.com/PaulXavy')
                }}>
                    {facebook}
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback style={{color: 'blue'}} onPress={() => {
                    Linking.openURL('https://twitter.com/PaulXavy')
                }}>
                    {twitter}
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback style={{color: 'blue'}} onPress={() => {
                    Linking.openURL('https://www.kwai.com/es')
                }}>
                    {load}
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>Linking.openURL('https://www.twitch.tv/')}>
                    {twitch}
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>Linking.openURL('https://www.reddit.com/?rdt=34229')}>
                    {reddit}
                </TouchableWithoutFeedback>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '50%',
        alignItems: 'center', //flex y grid
        backgroundColor: '#42D14F'
    },
    coverPhoto: {
        width: '100%',
        height: 200,
        resizeMode: 'cover'

    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: -75
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 10,
        borderColor: 'red'
    },
    name: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: 'bold'
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
        width: '60%',
        justifyContent: 'space-between'
    }
});
export default ProfileCard