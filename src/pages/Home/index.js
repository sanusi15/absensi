import { Text, View, StyleSheet, ImageBackground } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Bg } from '../../../assets'
import Axios from 'axios'
import url from '../../routes/url'
import { BottomSheet, ButtonAbsen, Header,} from '../../components'
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
                const hasil = res.data.data.hasil
                console.log(hasil)                                 
                setMkNow(res.data.data.hasil)
              })
        } catch (e) {
            setMkNow('Tidak Ada Perkuliahan')
            console.log('tidak ada perkuliahan', e)
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
        <ImageBackground source={ Bg} resizeMode="cover" style={styles.image}>
        <Header nama={username} onPress={() => LogOut()} />
            <ButtonAbsen  />
            <View style={styles.contWarn}>
              <Text style={styles.warning}>Silahkan Tekan Tombol di Atas Untuk Melakukan Absensi</Text>
            </View>                
            <View style={styles.contMkNow}>
              <LinearGradient style={styles.contNow} colors={['#f83600', '#fe8c00',]}>
                <Text style={styles.now}>Sekarang</Text>
              </LinearGradient>
                <Text style={styles.mkNow}>{mkNow}</Text>
            </View>
            <BottomSheet kelasMhs={ kelas }/>
        </ImageBackground>      
    </View>
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
    fontSize: 22,
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
