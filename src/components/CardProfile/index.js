import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Boy, Girl } from '../../../assets'

const CardProfile = ({ data, imageUri }) => {    

    const ImgProfile = () => {
        if (imageUri != null) {
            return (
                <Image source={{ uri: 'https://smart.politeknikpgribanten.ac.id/assets/img/'+imageUri }} style={styles.imgProfile} />
            )
        } else {
            if (data.jeniskelamin == 'Perempuan') {
                return (
                    <Image source={Girl} style={styles.imgProfile} />
                )
            } else {
                return (
                    <Image source={Boy} style={styles.imgProfile} />
                )                
            }
        }
    }

    useEffect(() => {
        console.log(imageUri)
    })

    return (
        <View style={styles.profileContainer}>            
            <LinearGradient
                // colors={['#666eff', '#1488CC']}
                colors={['#2B32B2', '#1488CC']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={styles.card}>
                <View style={styles.biodata}>
                    <Text style={styles.nama}>{data.username}</Text>
                    <Text style={styles.nim}>{data.kelas}</Text>
                </View>
                <View style={styles.img}>
                    {/* {
                        imageUri === '' ? (
                            <Image source={} style={styles.imgProfile} />
                        ) : (<Image source={{ uri: imageUri }} style={styles.imgProfile} />)
                    } */}
                    <ImgProfile />
                </View>     
            </LinearGradient>
        </View>
    )
}

export default CardProfile

const Height = Dimensions.get('window').height
const Width = Dimensions.get('window').width

const styles = StyleSheet.create({
    profileContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    card: {
        backgroundColor: '#fff',
        width: '100%',
        height: Height * 12 / 100,
        // height: 100,
        
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10,
        padding: 20,
    },
    nama: {
        fontSize: 18,
        fontFamily: 'Quicksand-Bold',
        color: '#FFF',
    },
    nim: {
        color: '#FFF',
    },
    img: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: 60,
        borderRadius: 30,
        borderColor: '#ddd',
        borderWidth: 2,
        // backgroundColor: '#ddd',
    },
    imgProfile: {
        width: 55,
        height: 55,
        borderRadius: 25,
    }


})