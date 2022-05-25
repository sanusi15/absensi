import { Text, View, StyleSheet, ImageBackground, StatusBar } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Bg, Bg2, Logo, Planet, planet } from '../../../assets'
import Axios from 'axios'
import url from '../../routes/url'
import { BottomSheet, ButtonAbsen, Header, Midtrans,} from '../../components'
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const Home = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [kelas, setKelas] = useState('');
  const [mkNow,  setMkNow] = useState('')
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
              console.log('Ada ada data storage')
          }
      }catch (e){
          console.log('Gagal login otomatis')
          navigation.replace('Login')            
      }
  }
  const getMK = async () => {
    try {
      const value = await AsyncStorage.getItem('dataStorage')      
      if (value !== null) {
        const user = JSON.parse(value)        
        setUsername(user.username)
        setKelas(user.kelas)
        var d = new Date()
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000)
        var tglIND = new Date(utc + (3600000 * 7))
        var myDays = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];
        var hari = myDays[tglIND.getDay()]
        try {
          await Axios.get(url+'golkar/api.php?op=mkSekarang&hari='+hari+'&kelas='+user.kelas)
              .then((res) => {            
                const namaMk = res.data
                if (namaMk == '') {
                  setMkNow('Tidak Ada Perkuliahan')
                } else {
                  console.log(namaMk)
                  setMkNow(namaMk.data.hasil.mksekarang)
                }
                // setMkNow(a.mksekarang)
              })
        } catch (e) {
            console.log('tidak ada perkuliahana', e)
        }
      }
    } catch(e) {
      console.log('Value 0 :as '+ e)
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
    <View style={{ flex: 1 }}>      
      <StatusBar  barStyle="light-content" backgroundColor={'#323d78'} />
        <View resizeMode="cover" style={styles.image}>
          <Header nama={username} onPress={() => LogOut()} />
          <ButtonAbsen  />                         
          <View style={styles.contMkNow}>
            <LinearGradient style={styles.contNow} colors={['#f83600', '#fe8c00',]}>
              <Text style={styles.now}>Sekarang</Text>
            </LinearGradient>
              <Text style={styles.mkNow}>{mkNow}</Text>
          </View>
          <View style={styles.contMkNow}>
            <Text style={{ color: 'white', fontFamily: 'BebasNeue-Regular', fontSize: 20 }}>Poltek PGRI Banten</Text>
          </View>
          <BottomSheet kelasMhs={ kelas }/>
        </View>      
    </View>
  )
}
export default Home

const styles = StyleSheet.create({
  image: {
    flex: 1,
    backgroundColor: '#323d78'
  },
  
  contMkNow: {
    alignSelf: 'center',
    marginTop: 20,
  },
  mkNow: {
    fontSize: 22,
    color: '#fff',
    fontFamily: 'BebasNeue-Regular',
    letterSpacing: 2,
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
