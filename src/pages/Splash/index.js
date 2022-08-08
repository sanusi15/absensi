import { View, StatusBar, Image } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Logo} from '../../../assets'

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      // navigation.replace('Login')
      cekLogin()
    }, 3000);
  }, [navigation]);

  const cekLogin = async () => {
        try {
            const DataStorage = await AsyncStorage.getItem('dataStorage')
            if (DataStorage) {
                console.log(DataStorage)
                navigation.replace('MainApp')
            } else {
                navigation.replace('Login')                            
                console.log('Tidak ada data storage')
            }
        }catch (e){
            console.log('Gagal login otomats')
            navigation.replace('Login')
        }
    }
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar hidden={false} backgroundColor="#ebebeb" />
      <Image source={Logo} style={{ width: 300, height:320 }} />          
    </View>
  )
}

export default Splash