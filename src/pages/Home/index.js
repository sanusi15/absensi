import { Text, View, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native'
import React, {useEffect, useState} from 'react'
import {Bg} from '../../../assets'
import { BottomSheet, ButtonAbsen, Header } from '../../components'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const Home = () => {
  const navigation = useNavigation()
  const [username, setUsername] = useState('');
  const [kelas, setKelas] = useState('');

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('dataStorage')      
      if (value !== null) {
        const user = JSON.parse(value)
        setUsername(user.username)
        setKelas(user.kelas)
      }
    } catch(e) {
      console.log('Value 0 : '+ e)
    }
  }
  

  const LogOut = async () => {
    try {
        const value = await AsyncStorage.removeItem('dataStorage')
        if (value == null) {
          navigation.replace('Login')            
        }
    } catch (e) {
      console.log('gagal logout')
    }
  }


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ImageBackground source={ Bg} resizeMode="cover" style={styles.image}>
        <Header nama={username} onPress={() => LogOut() }/>
      <ButtonAbsen />
      <View style={styles.contWarn}>
        <Text style={styles.warning}>Silahkan Tekan Tombol di Atas Untuk Melakukan Absensi</Text>
      </View>                
      <View style={styles.contMkNow}>
        <LinearGradient style={styles.contNow} colors={['#f83600', '#fe8c00',]}>
          <Text style={styles.now}>Sekarang</Text>
        </LinearGradient>
        <Text style={styles.mkNow}>Tasest</Text>
      </View>
        <BottomSheet kelasMhs={ kelas }/>
      </ImageBackground>
    </GestureHandlerRootView>
    
  )
}

export default Home

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  
  contMkNow: {
    alignSelf: 'center',
    marginTop: 20,
  },
  mkNow: {
    fontSize: 25,
    color: '#fff',
    fontFamily: 'BebasNeue-Regular',
    letterSpacing: 2,
  },
  contWarn: {
    alignSelf: 'center',
    marginVertical: 30
  },
  warning: {
    fontSize: 13,
    color: 'white',    
  },
  now: {
    color: 'white',
    fontFamily: 'BebasNeue-Regular',
    letterSpacing: 2,
    fontSize: 11
  },
  contNow: {
    width: 60,
    height: 15,
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    borderRadius: 3,
    transform: [{ rotate: '-45deg' }],
    left: -50

  }
  
});
