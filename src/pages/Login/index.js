import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import url from '../../routes/url';
import { StyleSheet, StatusBar, useWindowDimensions, View, Image, ScrollView, TextInput} from 'react-native';
import { Logo, Error2 } from '../../../assets'
import {CustomButton, AlertView} from '../../components'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const Login = ({ navigation }) => {
    const [nim, setNim] = useState('');
    const [username, setUsername] = useState('');
    const [alertLottie, setAlertLottie] = useState(false);
    const [iconAlert, setIconAlert] = useState('');
    const [titleAlert, setTitileAlert] = useState('');
    const [messageAlert, setMessageAlert] = useState('');
    const [btnColor, setBtnColor] = useState('');
    const { height } = useWindowDimensions();

    const onSignIn = async () => {
        // post data
        await Axios.get(url + 'api.php?op=mhsLogin&nim=' + nim + '&username=' + username)
            .then((json) => {
                const mahasiswa = json.data.data
                if (json.data.data == false || json.data.data == null) {
                    setTitileAlert("Error")
                    setMessageAlert("Username atau Nim anda tida sesuai!")
                    setIconAlert(Error2)
                    setBtnColor('#cf4c4c')
                    setAlertLottie(true)
                } else {
                    console.log('Bisa Login');
                    let data = {
                        username: mahasiswa.namamahasiswa,
                        nim: mahasiswa.nim,
                        idkelas: mahasiswa.idkelas,
                        kelas: mahasiswa.kelas,
                        jeniskelamin: mahasiswa.jeniskelamin,
                        namaprodi: mahasiswa.namaprodi,
                    }                                
                    try {
                        AsyncStorage.setItem('dataStorage', JSON.stringify(data))
                        navigation.replace('MainApp')
                    } catch (e) {
                        console.log('Kirim err ' + e);                    
                    }
                }
            })
    }
    
    return (
        <LinearGradient
            colors={['#2B32B2', '#1488CC', ]}        
            style={styles.grediant}
        >
        <ScrollView showsVerticalScrollIndicator={false}>
            <StatusBar hidden={true} />
            <View style={styles.root}>
                <Image source={Logo} style={[styles.logo, {height: height * 0.3}]} resizeMode='contain' />
                <AlertView jsonPath={iconAlert} btnCollor={btnColor} title={titleAlert} message={messageAlert} visible={alertLottie} setVisibleAlert={() => setAlertLottie(false)} klik={() => setAlertLottie(false)}></AlertView>
                <TextInput style={styles.txtInput} placeholder="Masukan Username Anda" onChangeText={(value) => setUsername(value)} value={username} />
                <TextInput style={styles.txtInput} placeholder="Masukan Password Anda" onChangeText={(value) => setNim(value)} value={nim}/>
                <CustomButton text="Sign In" onPress={onSignIn} />
                <CustomButton text="Silahkan Masukan Username dan Password Anda" type="TERTIARY" />
            </View>    
        </ScrollView>   
        </LinearGradient>
    );
};

export default Login;

const styles = StyleSheet.create({
    root: {
        alignItems: 'center', padding: 30,
    },
    logo: {
        width: '30%',
        maxWidth: 300,
        maxHeight: 200
    },
    txtInput: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        width: '100%',
        borderColor: '#E8E8E8',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        padding: 15,
    },
    centeredView: {
        flex: 1,
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: 'green',
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalView2: {
        margin: 20,
        backgroundColor: '#fa6348',
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        // width: '50%'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        textAlign: "center",
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold'
    },
    grediant: {
        flex:1
    }
});
