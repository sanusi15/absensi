import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { StyleSheet, StatusBar, useWindowDimensions, View, Modal, Image, ScrollView, Alert, TextInput, Text} from 'react-native';
import { Logo } from '../../../assets'
import {CustomButton} from '../../components'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import AwesomeAlert from 'react-native-awesome-alerts';

const Login = ({ navigation }) => {
    
    const [nim, setNim] = useState('');
    const [username, setUsername] = useState('');
    const [alertAwsome,  setAlertAwesome] = useState(false);
    const { height } = useWindowDimensions();
    
    const onSignIn = async () => {         
        // post data
        await Axios.get('http://192.168.1.8:8011/golkar/api.php?op=mhsLogin&nim='+nim+'&username='+username)            
        .then((json) => {
            const mahasiswa = json.data.data
            // console.log(mahasiswa.namamahasiswa)
            if (json.data.data == false || json.data.data == null){
                setAlertAwesome(true)
            } else {
                let data = {
                    username: mahasiswa.namamahasiswa,
                    nim: mahasiswa.nim,
                    idkelas: mahasiswa.idkelas,
                    kelas: mahasiswa.kelas,
                    keterangan: mahasiswa.keterangan,
                    idjurusan: mahasiswa.idjurusan,
                    jurusan: mahasiswa.jurusan,
                }                                
                try {
                    AsyncStorage.setItem('dataStorage', JSON.stringify(data))
                    navigation.replace('Home')
                } catch (e) {
                    console.log('Kirim err ' + e);                    
                }
            }
        })      
    }

    const closeAlert = () => {
        setAlertAwesome(false)
        console.log(() => alertAwsome());
    }
    
    useEffect(()  => {
        cekLogin()
    }, [])

    const cekLogin = async () => {
        try {
            const DataStorage = await AsyncStorage.getItem('dataStorage')
            if (DataStorage) {
                // console.log(DataStorage)
                navigation.replace('Home')
            }
            
        }catch (e){
            console.log('Gagal login otomatis')
            navigation.replace('Login')            
        }
    }

    return (
        <LinearGradient
            colors={[ '#8000FF', '#00FFFF', ]}        
            style={styles.grediant}
        >
        <ScrollView showsVerticalScrollIndicator={false}>
            <StatusBar hidden={true} />
            <View style={styles.root}>
                <Image source={Logo} style={[styles.logo, {height: height * 0.3}]} resizeMode='contain' />

                <TextInput style={styles.txtInput} placeholder="Masukan Username Anda" onChangeText={(value) => setUsername(value)} value={username} />
                <TextInput style={styles.txtInput} placeholder="Masukan NIM Anda" onChangeText={(value) => setNim(value)} value={nim}/>

                <CustomButton text="Sign In" onPress={onSignIn} />
                <CustomButton text="Silahkan Masukan NIM dan Password Anda" type="TERTIARY" />

                <AwesomeAlert
                    show={alertAwsome}
                    // showProgress={() => setAwsomeAlert(true)}
                    title="Peringatan!"
                    message="Username atau NIM anda tidak sesuai."
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={true}
                    showConfirmButton={true}
                    confirmText="Tutup"
                    confirmButtonColor="#DD6B55"
                    confirmButtonStyle={
                        width='100%'
                    }
                    onConfirmPressed={() => closeAlert()}

                />
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
        // width: '50%'
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
