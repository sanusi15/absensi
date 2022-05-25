import { StyleSheet, TouchableOpacity, Image, ActivityIndicator, View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { Tombol3, Tombol4, Warning, Success, Logo } from '../../../assets';
import Axios from 'axios'
import url from '../../routes/url'
import { AlertView } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';



const ButtonAbsen = () => {
  const [alertLottie,  setAlertLottie] = useState(false);
  const [dataMhs, setDataMhs] = useState();
  const [loading, setLoading] = useState(false);
  const [idJadwal, setIdJadwal] = useState('');
  const [pertemuanMk, setPertemuanMk] = useState('');
  const [statusBayar, setStatusBayar] = useState('');
  const [ketAbsen, setKetAbsen] = useState('');

  const [iconAlert, setIconAlert] = useState('');
  const [titleAlert, setTitileAlert] = useState('');
  const [messageAlert, setMessageAlert] = useState('');
  const [btnColor, setBtnColor] = useState('');

  const AbsenMhs = async () => {
    if (statusBayar != 'Belum Lunas') {
      // setLoading(true)
      const data = dataMhs
      var jmlhpertemuan = parseInt(pertemuanMk)+1
      console.log(idJadwal, 'yaya')
      try {  
        await fetch(url + 'golkar/api.php?op=mhsAbsen', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: JSON.stringify({
            hari: getHari(),
            jam: getJam(),
            nim: dataMhs.nim,
            idjadwal: idJadwal,
            pertemuanke: jmlhpertemuan,
            status: 'MASUK'
          })
        })
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          // setLoading(false)
        })
        .then(() => {
          setTitileAlert("Berhasil")
          setMessageAlert("Absensi Berhsail Terima Kasih")
          setIconAlert(Success)
          setBtnColor('#8000FF')
          setAlertLottie(true)
          setKetAbsen(true)
          getDataMhsDanMk()
        })
      } catch (e) {
        console.log('Gagal Absen',e)
      }
    } else {
      setTitileAlert("Warning")
      setMessageAlert("Mohon maaf anda tidak bisa melakukan Absensi \n Silahkan menyelaesaikan administrasi tingkat telebih dahulu")
      setIconAlert(Warning)
      setBtnColor('#F8E71C')
      setAlertLottie(true)
    }
  }



  const getHari = () => {
    var d = new Date()
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000)
    var tglIND = new Date(utc + (3600000 * 7))
    var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    var hari = myDays[tglIND.getDay()]
    return hari
  }

  const getJam = () => {
    var d = new Date()
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000)
    var tglIND = new Date(utc + (3600000 * 7))
    var jam = tglIND.getHours().toString()
    var menit = tglIND.getMinutes().toString()
    var second =  tglIND.getSeconds().toString()
    if (jam.length == 1) {
      jam = 0+jam
    } else {
      jam = jam;
    }
    if (menit.length == 1) {
      menit = 0+menit
    } else {
      menit = menit;
    }
    if (second.length == 1) {
      second = 0+second
    } else {
      second = second;
    }
    jamAsli = jam+":"+menit+":"+second
    return jamAsli
  }

  const getDataMhsDanMk = async () => {
    try {
      const DataStorage = await AsyncStorage.getItem('dataStorage')
      if (DataStorage) {
        const data = JSON.parse(DataStorage)
        setDataMhs(data)
        try {
          // cek bayaran
          await Axios.get(url + '/golkar/smart.php?op&nim='+data.nim)
          .then((res) => {
            setStatusBayar(res.data)
          })
          .then( async () => {
            // get data mata kuliah
            try {
              await Axios.get(url+'golkar/api.php?op=mkSekarang&hari='+getHari()+'&kelas='+data.kelas)
                  .then( async (res) => {            
                    const a = res.data.data.hasil                    
                    setIdJadwal(a.idjadwal)
                    setPertemuanMk(a.pertemuanterakhir)
                    // cek sudah absen
                    try {  
                      await Axios.get(url +'golkar/api.php?op=cekSudahAbsen&hari='+getHari()+'&nim='+data.nim+'&idjadwal='+a.idjadwal)
                        .then((res) => {
                          setKetAbsen(res.data.hasil)
                          }
                        )
                    } catch (e) {
                      console.log(e)     
                    }
                  })
            } catch (e) {
                setIdJadwal(false)
                console.log('Gagal get idJadwal', e)
            }
          })
        } catch (e) {
            console.log('cek bayar error')
        }
      }
    } catch (e) {
      console.log('Tidak ada data storage');
    }
  }

  useEffect(() => {
    getDataMhsDanMk()
  }, [])


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
      <AlertView jsonPath={iconAlert} btnCollor={btnColor} title={titleAlert} message={messageAlert}  visible={alertLottie} setVisibleAlert={() => setAlertLottie(false)}  />
    )
  }

  if (idJadwal == false) {
    return (
      <View style={{ flex: 1, alignItems: 'center', marginTop: '30%', marginBottom: -100 }}>
        <Image source={Logo} style={{ width: 120, height: 120 }} />
      </View>
    )
  } else {
    if (ketAbsen == 'true') {
      return (
        <View style={{ flex: 1, alignItems: 'center', marginTop: '30%', marginBottom: -100 }}>
          <Image source={Logo} style={{ width: 120, height: 120 }} />
          <Text style={{ color: '#fff', fontSize:15, marginTop: 20, fontFamily: 'Akaya' }}>Anda Sudah Melakukan Absensi Terimakasih</Text>
        </View>
      )
    } else {
      return (
        <>
          <LinearGradient
            colors={[ '#8000FF', '#00FFFF', ]}
            start={{ x: 0.0, y: 0.0 }} end={{ x: 0.0, y: 1.0 }}          
            style={styles.grediant}
          >
            {
              loading == true ? (  <ActivityIndicator size="large" loading={true} color="#00c6ff" style={styles.loading} />) : (<></>)
            }
              <TouchableOpacity onPress={() => AbsenMhs()} style={styles.buttonContainer}>                
                <Image source={Tombol4} style={styles.iconJari} />
              </TouchableOpacity>
            </LinearGradient> 
            <View style={styles.contWarn}>
              <Text style={styles.warning}>Silahkan Tekan Tombol di Atas Untuk Melakukan Absensi</Text>
            </View>  
        </>
      )
    }
  }

  // return (
  //   <>
  //       {
  //         idJadwal == false ? (
  //           <View style={{ flex:1, alignItems: 'center', marginTop: '30%', marginBottom: -100 }}>
  //             <Image source={Logo} style={{ width: 120, height: 120 }} />
  //           </View>
  //         ) : (
  //           <>
  //             <LinearGradient
  //               colors={[ '#8000FF', '#00FFFF', ]}
  //               start={{ x: 0.0, y: 0.0 }} end={{ x: 0.0, y: 1.0 }}          
  //               style={styles.grediant}
  //             >
  //               {
  //                 loading == true ? (  <ActivityIndicator size="large" loading={true} color="#00c6ff" style={styles.loading} />) : (<></>)
  //               }
  //                 <TouchableOpacity onPress={() => AbsenMhs()} style={styles.buttonContainer}>                
  //                   <Image source={Tombol3} style={styles.iconJari} />
  //                 </TouchableOpacity>
  //               </LinearGradient> 
  //               <View style={styles.contWarn}>
  //                 <Text style={styles.warning}>Silahkan Tekan Tombol di Atas Untuk Melakukan Absensi</Text>
  //               </View>  
  //           </>
  //         )
  //       }
  //   </>  
  // )

  
}

export default ButtonAbsen

const styles = StyleSheet.create({
    contWarn: {
      alignSelf: 'center',
      marginVertical: 30
    },
    warning: {
      fontSize: 13,
      fontFamily: 'Akaya',
      color: 'white',    
    },
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
      alignSelf: 'center',
      tintColor: '#dde'
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