import { StyleSheet, View, Text, TouchableOpacity, Image, Modal, ImageBackground, Pressable, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Boy, Girl, Bg } from '../../../assets';
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/Feather'
import { launchImageLibrary } from 'react-native-image-picker';
import Axios from 'axios';
import url from '../../routes/url';

const User = ({ navigation, }) => {
    // const navigation = useNavigation();
    const [user, setUser] = useState('')
    const [imageUri, setImageUri] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('dataStorage')
            if (value !== null) {
                // We have data!!
                // console.log(value);
                var data = JSON.parse(value);
                setUser(data);
            }

            try {
                const img = await Axios.get(url + 'api.php?op=getImg&nim=' + data.nim)
                var src = img.data.hasil
                setImageUri(src)
            }catch(err){
                console.log(err)
            }
        }catch(err){
            console.log('User page tidak dapat datastorage')
        }
    }

    const LogOut = async () => {
        try {
            const value = await AsyncStorage.removeItem('dataStorage')  
            if (value == null) {
                navigation.replace('Login')
            }
        } catch (e) {
            console.log('gagasl logout')
        }        
    }    

    const UploadImage = async ({source}) => {
        // console.log('Upload Image = ', source)
        const data = new FormData()
        data.append('photo', {            
            name: source.fileName,
            type: source.type,
            uri: Platform.OS === "ios" ? source.uri.replace("file://", "") : source.uri 
        })
        await fetch(url + 'api.php?op=uploadImg&nim='+user.nim, {
        // await fetch('http://192.168.1.14:8080/tes/api.php', {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => res.json())
            .then(json => {
                console.log('Upload Imazgse = ', json)
            }
        )
    }

    const openGallery = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
            storageOptions: {
                mediaType: 'photo',
                skipBackup: true,
                path: 'images',
                saveToPhotos: true,
                waitUntilSaved: true,
                cameraRoll: true,
            },
            includeBase64: false,
        }
        launchImageLibrary(options, res => {
            if (res.didCancel) {
                console.log('User cancelled saage picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            }
            else if (res.customButton) {
                console.log('User tapped custom butston: ', res.customButton);
            } else {
                const source = res.assets[0];     
                // console.log(source)
                setImageUri(source.uri)
                UploadImage({ source })
            }
        })
    }

    const ImageProfile = () => {        
        if (imageUri != null) {
            return (
                <Image source={{ uri: 'https://smart.politeknikpgribanten.ac.id/assets/img/' + imageUri }} style={styles.profileImg} />
            )
        } else {
            if (user.jeniskelamin === 'Perempuan') {
                return (
                    <Image source={Girl} style={styles.profileImg} />
                    )
            } else {
                return (
                    <Image source={Boy} style={styles.profileImg} />
                )
                
            }
        }
    }


    useEffect(() => {
        getData()
    }, [])

    return (
        <View style={styles.containerUser}>           
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {                    
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.seeImg}>
                            <Image source={{ uri: 'https://smart.politeknikpgribanten.ac.id/assets/img/' + imageUri }} style={styles.detailImg} />                            
                        </View>
                    </View>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={styles.textStyle}>Kembali</Text>
                    </Pressable>
                </View>
            </Modal>
            <View style={styles.header}>
                <ImageBackground source={Bg} style={styles.bg} imageStyle={styles.imgBg}>
                    <TouchableOpacity
                        style={styles.cardImg}
                        onPress={() => setModalVisible(!modalVisible)}
                    >                                              
                        <ImageProfile />
                        <TouchableOpacity style={styles.cardIcon} onPress={() => openGallery() } >
                            <Icon name='camera' size={15} color='#fff' />
                        </TouchableOpacity>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
            <View style={styles.body}>
                <View style={styles.contLogout}>
                    <TouchableOpacity style={styles.cardLogout} onPress={() => LogOut()}>
                        <Icon name='power-off' size={25} color='#fff' />
                    </TouchableOpacity>                    
                    <Text style={styles.textLogout}>LogOut</Text>
                </View>
                <View style={styles.line}></View>
                <View style={styles.contInfo}>  
                    <View style={styles.contTitle}>
                        <Text style={styles.textTitle}>Biodata</Text>
                        <Icon2 name='info' size={12} color='#000' style={styles.icon} />
                    </View>    
                    <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.textQ}>Nama</Text>
                        <Text style={styles.textBio}>{user.username}</Text>
                    </View>    
                    <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.textQ}>Jenis Kelamin</Text>
                        <Text style={styles.textBio}>{user.jeniskelamin}</Text>
                    </View>    
                    <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.textQ}>Kelas</Text>
                        <Text style={styles.textBio}>{user.kelas}</Text>
                    </View>    
                    <View style={{ marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.textQ}>Jurusan</Text>
                        <Text style={styles.textBio}>{user.namaprodi}</Text>
                    </View>                        
                </View>
            </View>
        </View>
    )
}

export default User

const styles = StyleSheet.create({
    containerUser: {
        flex: 1,
    },
    header: {
        height: 200,
    },
    bg: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
    },
    imgBg: {
        height: '100%',
    },
    cardImg: {
        width: 90,
        height: 90,
        borderRadius: 50,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#fff',
    },
    seeImg: {
        width: '100%',
        height: '100%',
        borderRadius: 5
    },
    detailImg: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
        marginBottom: 20,
    },
    profileImg: {
        width: 85,
        height: 85,
        borderRadius: 40,
    },
    cardIcon: {
        position: 'absolute',
        bottom: -1,
        right: -5,
        backgroundColor: '#fc6f65',
        height: 30,
        width: 30,
        borderRadius: 15,
        padding: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        backgroundColor: '#fff',
        padding: 20,
        height: '100%',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        top: -20,
    },
    contLogout: {
        height: 100,
        // backgroundColor: '#fc6f65',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardLogout: {
        backgroundColor: '#fc6f65',
        marginTop: 10,
        width: '18%',
        height: '60%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#dde',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    textLogout: {
        color: '#fc6f65',
        fontSize: 20,
        fontFamily: 'Quicksand-Bold',
        marginTop: 10,
    },
    line: {
        borderWidth: 1,
        borderColor: '#dde',
        marginTop: 20,
        marginBottom: 10,
        
    },
    textHeadInfo: {
    },
    contInfo: {
        height: '100%',
        marginTop: 20,
    },
    contTitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textTitle: {
        color: '#000',
        fontSize: 15,
        fontFamily: 'Quicksand-Bold',
        marginBottom: 10,
    },
    icon: {
        marginLeft: 5,
        top: -3,
    },
    textQ: {
        fontSize: 15,
        fontFamily: 'Quicksand-Bold',
        color: '#aeaeae',
    },
    textBio: {
        fontSize: 18,
        fontFamily: 'Quicksand-Bold',
        color: '#000',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 10,
        height: '50%',
        width: '80%',
        backgroundColor: "white",
        borderRadius: 5,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        martginTop: 10,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }


})
