import { Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import url from '../../routes/url'
import SwipeUpDown from 'react-native-swipe-up-down';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SwipeUp, SwipeDown} from '../../../assets'


const BottomSheet = () => {    
    const [jadwal, setJadwal] = useState('');

    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('dataStorage')
            if (value !== null) {
                const user = JSON.parse(value)
                var d = new Date()
                var utc = d.getTime() + (d.getTimezoneOffset() * 60000)
                var tglIND = new Date(utc + (3600000 * 7))
                var myDays = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];
                var hari = myDays[tglIND.getDay()]                
                try {
                    await Axios.get(url + 'golkar/api.php?op=jadwalMk&hari='+hari+'&kelas=' + user.kelas)
                        .then((response) => setJadwal(response.data.data.hasil))
                } catch (e) {
                    console.log('Gagaal get API')
                }
            }
        } catch (e) {
            console.log('Gagal Menampilkan Jadwal MK')
        }
    }
    const ItemMini = () => {
        return (
            <View style={styles.mini}>
                <Image source={SwipeUp} style={{}} />
                <Text style={styles.lihatJadwal}>Jadwal Mata Kuliah</Text>
                <Image source={SwipeUp} style={{}} />
            </View>   
        )
    }
    const ItemFull = ({ value }) => (
        <View>
            <Image source={SwipeDown} style={{ alignSelf: 'center' }} />
            {
                value.length > 0 ? (
                    value.map((val, i) => (
                        <View style={styles.full} key={i}>
                            <View >
                                <Text style={styles.namaMk}>{ val.matakuliah }</Text>
                                <Text style={styles.namaDosen}>{ val.dosen }</Text>
                            </View>
                            <View>
                                <Text style={styles.jamMk}>{ val.jammasuk} - { val.jamkeluar } WIB</Text>
                            </View> 
                        </View>
                    ))
                ): (
                    <View style={{ flex: 1, }}>
                        <Text style={{ color: 'white', marginLeft: 10, marginTop: 20, marginBottom: 30 }}>Mohon Tunggu Sebentar...</Text>
                        <ActivityIndicator size="large" loading={true} color="#00c6ff" />
                    </View>        
                )
            }
        </View>
    )

    return (
      
        <View style={styles.container}>
            <SwipeUpDown
                itemMini={(hide) => <ItemMini show={hide} />}
                itemFull={(hide) => <ItemFull show={hide} value={jadwal} />}
                onShowMini={() => console.log('mini')}
                onShowFull={() => console.log('full') }
                animation="easeInEaseOut"
                disableSwipeIcon={true}
                extraMarginTop={50}
                iconColor='#00c6ff'
                iconSize={30}
                style={{ backgroundColor: '#4f43cc', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
                />
        </View>
    )
}

export default BottomSheet

const styles = StyleSheet.create({
    animation: {
        width: 100,
        height: 100,
    },
    container: {
        flex: 1,
        padding: 20
    },
    mini: {
        flexDirection: 'row',        
        justifyContent: 'space-around'
    },
    line: {
        width: 100,
        height: 3,
        backgroundColor: '#00c6ff',
        top: -20,
        borderRadius: 5
    },
    lihatJadwal: {
        fontFamily: 'BebasNeue-Regular',
        color: '#fff',
        fontSize: 20
    },
    full: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginVertical: 15,
    },
    namaMk: {
        fontFamily: 'Oswald',
        color: '#fff',
        fontSize: 15
    },
    namaDosen: {
        fontFamily: 'Akaya',
        color: '#fff',
        fontSize: 13
    },
    jamMk: {
        color: '#fcb314',
        fontFamily: 'PTSansNarrow-Bold',
        marginTop: 7
    }
})