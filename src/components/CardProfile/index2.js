import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import { Boy, Girl } from '../../../assets/Image/index'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import url from '../../routes/url';

export class CardProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {           
            nama: props.data.username,
            kelas: props.data.kelas,
            jk: props.data.jeniskelamin,
            nim: props.data.nim,
            imagUri: props.data.imageUri
        }
    }

    getImage = async () => {
        try {
            const img = await Axios.get(url + 'api.php?op=getImg&nim=' + this.state.nim)
            console.log(img.data.hasil)
            var src = img.data.hasil
            this.setState({ imagUri: src })
        } catch (err) {
            console.log(err)
        }
    }

    componentDidMount() {
        this.getImage()
    }

    componentDidUpdate() {
        console.log('update')
    }

        

    

    


    render() {
        return (
            <View style={styles.profileContainer}>
                <LinearGradient
                    colors={['#2B32B2', '#1488CC']}
                    // colors={['#3f2b96', '#a8c0ff']}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    style={styles.card}>
                    <View style={styles.biodata}>
                        <Text style={styles.nama}>{this.state.nama}</Text>
                        <Text style={styles.nim}>{this.state.imagUri}</Text>
                    </View>
                    <View style={styles.img}>
                        <Image source={{ uri: this.state.imagUri }} style={styles.imgProfile} />
                    </View>
                </LinearGradient>
            </View>
        )
    }
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