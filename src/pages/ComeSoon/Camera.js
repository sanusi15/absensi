import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Camera = () => {
    
    const [imageUri, setImageUri] = React.useState(null);

    const dataImage = async () => {
        try {
            const value = await AsyncStorage.getItem('image');
            if (value !== null) {
                // We have data!!
                console.log(value);
                setImageUri(value);
            }
        } catch (error) {
            // Error retrieving data
            console.log(error);
        }
    }    

    const openCamera = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            storageOptions: {
                path: 'images',
                mediaType: 'photo'
            },
            includeBase64: true,
        }
        launchImageLibrary(options, res => {
            if (res.didCancel) {
                console.log('User cancelled simage picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            }
            else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
            } else {
                const source = res.assets[0];
                console.log(source.uri);
                try {
                    AsyncStorage.setItem('image', source.uri);
                    dataImage();
                }catch (error) {
                    console.log(error);
                }
            }
        })
    }

    useEffect(() => {
        dataImage();
    } , [])
    

    return (
        <View style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={() => openGallery()}>
                <Text>Open Gallery</Text>
                <Image source={{ uri:imageUri }} style={{  width: 200, height: 200  }} />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 20 }} onPress={() => openCamera()}>
                <Text>Open Camera</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Camera

const styles = StyleSheet.create({})