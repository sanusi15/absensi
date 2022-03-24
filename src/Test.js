import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Axios from 'axios';
import React from 'react'

const Test = () => {
    const onSignIn = async () => {         
        // post data
        await Axios.get('http://192.168.1.8:8011/golkar/api.php?op=mhsLogin&nim=2157570017&username=sanusi')            
        .then((json) => {
            console.log(json.data.data)          
        })      
    }
return (
    <View style={{ flex:1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => onSignIn()}>
            <Text style={{ fontSize: 30 }}>Test</Text>
        </TouchableOpacity>
    </View>
)
}

export default Test

const styles = StyleSheet.create({})