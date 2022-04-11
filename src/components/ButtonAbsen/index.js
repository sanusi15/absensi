import { StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { Tombol3 } from '../../../assets';
import Axios from 'axios'
import url from '../../routes/url'
import { AlertView } from '../../components';
import { Success } from '../../../assets';



const ButtonAbsen = () => {
  const [alertLottie,  setAlertLottie] = useState(false);
  const [loading,  setLoading] = useState(false);


  const AbsenMhs = async () => {
    setLoading(true)
    try {
      await fetch(url + 'golkar/api.php?op=mhsAbsen', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "hari=Kamis&tanggal=2022-04-05&jam=13:14:20&nim=2157570017&idJadwal=164342597957&pertemuanKe=3&status=MASUK",       
      })
      .then((response) => response.json())
      .then((json) => {
        console.log(json.data.result)
        setLoading(false)
      })
      .then(() => setAlertLottie(true))
    } catch (e) {
      console.log('Gagal Absen',e)
    }
  }

  if(loading == true) {
    return (
      <ActivityIndicator size="large" loading={true} color="#00c6ff" style={{ flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        zIndex: 999 }} />
    )
  }

  if (alertLottie == true) {
    return (          
                    
      <AlertView jsonPath={Success} btnCollor="#8000FF" title="Success" message="Anda berhasil absen, terimakasih.."  visible={alertLottie} setVisibleAlert={() => setAlertLottie(false)}  />
    )
  }


  return (
    <>
      <LinearGradient
        colors={[ '#8000FF', '#00FFFF', ]}
        start={{ x: 0.0, y: 0.0 }} end={{ x: 0.0, y: 1.0 }}          
        style={styles.grediant}
      >
        {
          loading == true ? (
            <ActivityIndicator size="large" loading={true} color="#00c6ff" style={styles.loading} />
          ) : (
              <TouchableOpacity onPress={() => AbsenMhs()} style={styles.buttonContainer}>              
              <Image source={Tombol3} style={styles.iconJari} />
          </TouchableOpacity>
          )
        }
          
      </LinearGradient> 
    </>  
  )
}

export default ButtonAbsen

const styles = StyleSheet.create({
    grediant: {
      height: 120,
      width: 120,
      borderRadius: 120/2,
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop: 100
    },
    buttonContainer: {      
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#4f498f',
        width: 100,
        height: 100,
        borderRadius: 100/2,
        margin: 1
    },
    iconJari: {
        width: 80,
        height: 80,
        alignSelf: 'center'
    },
    txtAbsen: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    loading: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      zIndex: 999 
    }
})