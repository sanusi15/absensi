import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'
import { Boy, Girl } from '../../../assets/Image/index'
import LinearGradient from 'react-native-linear-gradient'



const CardProfile = ({nama, kelas, jk}) => {
    return (
        <View style={styles.profileContainer}>            
            <LinearGradient
                colors={['#2B32B2', '#1488CC']}
                // colors={['#3f2b96', '#a8c0ff']}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                style={styles.card}>
                <View style={styles.biodata}>
                    <Text style={styles.nama}>{nama}</Text>
                    <Text style={styles.nim}>{kelas}</Text>
                </View>
                <View style={styles.img}>
                    {
                        jk == 'Perempuan' ? (
                            <Image source={Girl} style={styles.imgProfile} />
                            ) : (
                            <Image source={Boy} style={styles.imgProfile} />
                        )
                    }
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
        width: 40,
        height: 40,
        borderRadius: 20,
    }


})