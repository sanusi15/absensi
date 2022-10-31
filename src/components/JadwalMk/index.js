import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import url from '../../routes/url'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient'
const JadwalMk = () => {
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
                var myDays = ['Minggu', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];
                var hari = myDays[tglIND.getDay()]
                try {
                    await Axios.get(url + 'api.php?op=jadwalMk&hari=' + hari + '&kelas=' + user.kelas+'&nim='+user.nim)
                        .then((response) => {
                            // setJadwal(response.data.data.hasil)
                            if (response.data.data.hasil.status == 'Ada MK') {
                                setJadwal(response.data.data.hasil.data)
                                sendData(response.data.data.hasil.data)
                            } else {
                                setJadwal(response.data.data)
                            }
                        })
                        
                } catch (e) {
                    console.log('Gagaal get API')
                }
            }
        } catch (e) {
            console.log('Gagalll Menampilkan Jadwal MK')
        }
    }

    const ListJadwal = ({jadwal}) => (
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            {
                jadwal.length > 0 ? (
                    jadwal.map((item, index) => (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }} key={index}>
                            <View style={{ overflow: 'hidden' }}>
                                <Text style={{ fontFamily: 'Quicksand-Bold', fontSize: 14, color: '#FFF' }}> {item.matakuliah} </Text>
                                <Text style={{ fontFamily: 'Quicksand-Bold', fontSize: 12, color: '#FFF' }}> {item.dosen} </Text>
                            </View>
                            <View>
                                <Text style={{ fontFamily: 'Quicksand-Bold', fontSize: 14, color: '#FFF' }}>{item.jammasuk} - { item.jamkeluar }</Text>
                            </View>
                        </View>
                    ))                    
                ) : (
                        <Text style={{ fontFamily: 'Quicksand-Bold', fontSize: 12, color: '#FFF' }}>Tidak ada Jadwal Perkuliahan</Text>
                )
            }
        </ScrollView>
    )  

    return (        
        <View style={styles.profileContainer}>            
            <LinearGradient
                colors={['#2B32B2', '#1488CC']}
                start={{ x: 1, y: 0 }} end={{ x: 1, y: 1 }}
                style={styles.cardJadwal}>
                <ListJadwal jadwal={jadwal} />
            </LinearGradient>            
        </View>
    )
}

export default JadwalMk

const Height = Dimensions.get('window').height
const Width = Dimensions.get('window').width

const styles = StyleSheet.create({
    profileContainer: {
        paddingHorizontal: 20,
        marginTop: 0,
    },
    cardJadwal: {
        marginTop: 10,
        width: '100%',
        // minHeight: 260,
        
        borderRadius: 10,
        marginBottom: 10,
        padding: 20,
    }


})