import { StyleSheet, Text, View, TouchableOpacity, Dimensions  } from 'react-native'
import React, {useState, useEffect} from 'react'
import LottieView from 'lottie-react-native'
import { Click, Waiting, DoneAbsen } from '../../../assets';
import Axios from 'axios'
import url from '../../routes/url'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Height = Dimensions.get('window').height
const Width = Dimensions.get('window').width

const CardAbsen = ({ mkNow, dosen }) => {  
    const navigation = useNavigation();
    const [idJadwal, setIdJadwal] = useState('');
    const [sudahAbsen, setSudahAbsen] = useState('')

    const getHari = () => {
        var d = new Date()
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000)
        var tglIND = new Date(utc + (3600000 * 7))
        var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        var hari = myDays[tglIND.getDay()]
        return hari
    }

    const cekSudahAbsen = async () => {
        const DataStorage = await AsyncStorage.getItem('dataStorage')
        const dataMhs = JSON.parse(DataStorage)
        try {
            // get data jadwal
            await Axios.get(url + 'api.php?op=mkSekarang&hari=' + getHari() + '&kelas=' + dataMhs.kelas + '&nim=' + dataMhs.nim)
                .then((response) => {
                    const a = response.data.data.hasil
                    setIdJadwal(a.idjadwal)
                }).then(async () => { 
                    // cek sudah absen atau belum
                    await Axios.get(url + 'api.php?op=cekSudahAbsen&idjadwal=' + idJadwal + '&nim=' + dataMhs.nim + '&hari=' + getHari())
                    .then((response) => { 
                        setSudahAbsen(response.data.hasil)                        
                    })
                })
        }catch(error){
            console.log('wehh',error)
        }
    }

    useEffect(() => {
        cekSudahAbsen()       
    }, [])


    if (mkNow == null) {
        return (
            <View style={styles.profileContainer}>
                <View style={styles.card}>
                    <View style={styles.headCard}>
                        <Text style={{ fontFamily: 'Quicksand-Bold', fontSize: 18, color: '#000', }}>Tidak ada Kelas</Text>
                        <TouchableOpacity style={{ width: 80, height: 80, borderRadius: 40, marginVertical: 40, left: -10 }} >
                            <LottieView source={Waiting} autoPlay loop style={{ width: 100, alignItems: 'center', justifyContent: 'center' }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    } else {
        return (
            <View style={styles.profileContainer}>
                <View style={styles.card}>
                    <View style={styles.headCard}>
                        {
                            sudahAbsen === 'true' ? (
                                <>
                                    <Text style={{ fontFamily: 'Quicksand-Bold', fontSize: 18, color: '#000', }} >Anda Sudah Absen</Text>
                                    <TouchableOpacity style={{ width: 80, height: 80, borderRadius: 40, marginVertical: 40 }} >
                                        <LottieView source={DoneAbsen} autoPlay loop />
                                    </TouchableOpacity>
                                </>
                            ) : (
                                <>
                                    <Text style={{ fontFamily: 'Quicksand-Bold', fontSize: 18, color: '#000', }} >Absen Disini</Text>
                                    <TouchableOpacity style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: '#ddd', marginVertical: 40 }} onPress={() => navigation.navigate('Scan', {data : 'tes'})} >
                                        <LottieView source={Click} autoPlay loop />
                                    </TouchableOpacity>
                                </>
                            )
                        }
                        <Text style={{ fontFamily: 'Quicksand-Bold', fontSize: 15, color: '#000' }}>{dosen} | {mkNow}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default CardAbsen

const styles = StyleSheet.create({
    profileContainer: {
        paddingHorizontal: 20,
    },
    card: {
        backgroundColor: '#fff',
        width: '100%',
        height: Height * 30 / 100,
        borderRadius: 10,
        marginBottom: 10,
        padding: 20,     
        shadowColor: '#1488CC',
        shadowOffset: {
            width: 5,
            height: 15
        },
        shadowOpacity: 0.51,
        shadowradius: 3.5,
        elevation: 5
    },
    headCard: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        
    },


})