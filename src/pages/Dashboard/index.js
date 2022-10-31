import { StatusBar, StyleSheet, View, ScrollView, RefreshControl, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Header} from '../../components'
import { CardProfile, CardAbsen, JadwalMk, Menu } from '../../components/'
import Axios from 'axios'
import url from '../../routes/url'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}


const Dashboard = () => {
  const navigation = useNavigation();
  const [mhs, setMhs] = useState('')
  const [imageUri, setImageUri] = useState('')
  const [mkNow, setMkNow] = useState('')
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false)      
    });    
  }, [getMK]);


  const cekLogin = async () => {
    try {
      const DataStorage = await AsyncStorage.getItem('dataStorage')
      if (!DataStorage) {
        navigation.replace('Login')
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
        const data = JSON.parse(value)        
        setMhs(data)
        var d = new Date()
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000)
        var tglIND = new Date(utc + (3600000 * 7))
        var myDays = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];
        var hari = myDays[tglIND.getDay()]
        try {
          await Axios.get(url + 'api.php?op=mkSekarang&hari=' + hari + '&kelas=' + data.kelas + '&nim=' + data.nim)
            .then((res) => {
              const namaMk = res.data
              if (namaMk == '') {
                setMkNow('Tidak Ada Perkuliahan')
              } else {
                setMkNow(namaMk.data.hasil)
              }
            })
            .then(() => {
              Axios.get(url + 'api.php?op=getImg&nim=' + data.nim)
                .then((res) => {
                  console.log(res.data.hasil)
                  const src = res.data.hasil
                  setImageUri(src)
                })
            })
        } catch (e) {
          console.log('tidak ada perkuliahan', e)
        }
      }
    } catch (e) {
      console.log('Value ' + e)
    }
  }

  useEffect(() => {
    cekLogin()
    getMK()    
  }, [refreshing])


  return (
    <View style={[styles.dashboardContainer,]}>
      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />}
      >
      <StatusBar backgroundColor="#2B32B2"  barStyle="light-content" />           
      <Header title="Dashboard" />
      <CardProfile data={mhs} imageUri={imageUri} />
      <Menu />
      <CardAbsen mkNow={ mkNow.mksekarang } dosen={mkNow.namadosen} />
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