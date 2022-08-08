import { StyleSheet, View, Text, TouchableOpacity, Image, StatusBar, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Boy, Girl, Bg } from '../../../assets';
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/Feather'

const User = ({ navigation }) => {
    // const navigation = useNavigation();
    const [user, setUser] = useState('')

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('dataStorage')
            if (value !== null) {
                const user = JSON.parse(value)
                setUser(user)
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

    useEffect(() => {
        getData()
    }, [])
2
    return (
        <View style={styles.containerUser}>
            <View style={styles.header}>
                <ImageBackground source={Bg} style={styles.bg} imageStyle={styles.imgBg}>
                    <View style={styles.cardImg}>
                        {
                            user.jeniskelamin === 'Laki-Laki' ? (<Image source={Boy} style={styles.profileImg} />) : (<Image source={Girl} style={styles.profileImg} />)
                        }
                        
                        <TouchableOpacity style={styles.cardIcon} onPress={() => navigation.navigate('ComeSoon')} >
                            <Icon name='camera' size={15} color='#fff' />
                        </TouchableOpacity>
                    </View>
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
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#fff',
    },
    profileImg: {
        width: 80,
        height: 80,
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
    }

})
