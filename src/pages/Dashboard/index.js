import { StatusBar, StyleSheet, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Header} from '../../components'
import { CardProfile, CardAbsen, JadwalMk, Menu } from '../../components/'
import Axios from 'axios'
import url from '../../routes/url'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const Dashboard = ({route}) => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [kelas, setKelas] = useState('');
  const [mkNow, setMkNow] = useState('')
  const [jk, setJk] = useState('')
  const params = route.params;
  useEffect(() => {
    cekLogin()
    getMK()
  }, [])

  const cekLogin = async () => {
    try {
      const DataStorage = await AsyncStorage.getItem('dataStorage')
      if (!DataStorage) {
        navigation.replace('Login')
      } else {
        console.log('Ada ada data storasge')
      }
    } catch (e) {
      console.log('Gagal login otomatis')
      navigation.replace('Login')
    }
  }
  const getMK = async () => {
    try {
      const value = await AsyncStorage.getItem('dataStorage')
      if (value !== null) {
        const user = JSON.parse(value)
        console.log(user.namaprodi)
        setUsername(user.username)
        setKelas(user.namaprodi)
        setJk(user.jeniskelamin)
        var d = new Date()
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000)
        var tglIND = new Date(utc + (3600000 * 7))
        var myDays = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];
        var hari = myDays[tglIND.getDay()]
        try {
          await Axios.get(url + 'api.php?op=mkSekarang&hari=' + hari + '&kelas=' + user.kelas + '&nim=' + user.nim)
            .then((res) => {
              const namaMk = res.data
              if (namaMk == '') {
                setMkNow('Tidak Ada Perkuliahan')
              } else {
                console.log(namaMk)
                setMkNow(namaMk.data.hasil)
              }
              // setMkNow(a.mksekarang)
            })
        } catch (e) {
          console.log('tidak ada perkuliahana', e)
        }
      }
    } catch (e) {
      console.log('Value 0 :as ' + e)
    }
  }

  return (
    <View style={styles.dashboardContainer}>
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
      <StatusBar backgroundColor="#2B32B2" barStyle="light-content" />
      <Header title="Dashboard" />
      <CardProfile nama={username} kelas={kelas} jk={jk} />
      <Menu />
      <CardAbsen mkNow={ mkNow.mksekarang } dosen={mkNow.namadosen} params={params} />
      <JadwalMk />
      </ScrollView>
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  dashboardContainer: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },

})