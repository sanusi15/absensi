import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
  Image,
  DevSettings,
}from 'react-native'
import React, {useState, useEffect} from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios'
import url from '../../routes/url'
import { RNCamera } from 'react-native-camera';
import { LogoDark, Scanqr2, Success, Error2, Warning } from '../../../assets'
import LottieView from 'lottie-react-native'
import { AlertView } from '../../components';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const Scan = () => {
  const navigation = useNavigation();
  const [alertLottie, setAlertLottie] = useState(false);
  const [dataMhs, setDataMhs] = useState();
  const [statusBayar, setStatusBayar] = useState('');
  const [idJadwal, setIdJadwal] = useState('');
  const [pertemuanMk, setPertemuanMk] = useState('');
  // camera
  const [camera, setCamera] = useState('back');

  // alert
  const [titleAlert, setTitileAlert] = useState('');
  const [messageAlert, setMessageAlert] = useState('');
  const [btnColor, setBtnColor] = useState('');
  const [iconAlert, setIconAlert] = useState('');

  const cameraSwicth = () => {
    if (camera === 'back') {
      setCamera('front');
    } else {
      setCamera('back');
    }
  };


  useEffect(() => {
    getDataMhsDanMk()
  }, [])
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
    var second = tglIND.getSeconds().toString()
    if (jam.length == 1) {
      jam = 0 + jam
    } else {
      jam = jam;
    }
    if (menit.length == 1) {
      menit = 0 + menit
    } else {
      menit = menit;
    }
    if (second.length == 1) {
      second = 0 + second
    } else {
      second = second;
    }
    jamAsli = jam + ":" + menit + ":" + second
    return jamAsli
  }

  const getDataMhsDanMk = async () => {
    try {
      const DataStorage = await AsyncStorage.getItem('dataStorage')
      if(DataStorage != null) {
        const dataMhs = JSON.parse(DataStorage)
        setDataMhs(dataMhs)
        // cek bayaran
        try {
          await Axios.get(url + 'api.php?op=cekBayaran&nim=' + dataMhs.nim)
            .then((response) => {
              setStatusBayar(response.data)
            })
            .then(async () => {
              // get data jadwal
              await Axios.get(url + 'api.php?op=mkSekarang&hari=' + getHari() + '&kelas=' + dataMhs.kelas + '&nim=' + dataMhs.nim)
                .then((response) => {
                  const a = response.data.data.hasil
                  setIdJadwal(a.idjadwal)
                  setPertemuanMk(a.pertemuanke)
                })
            })
        } catch (e) {
          console.log(e)
        }
      } else {
        console.log('DataStorage null')
      }
    } catch (e) {
      console.log('Tidak ada data storage');
    }
  }

  const AbsenMhs = async ({nimScan}) => {
      if (statusBayar !== 'LUNAS') {
        setTitileAlert('Absen Gagal')
        setMessageAlert('Mohon maaf anda belum melakukan pembayaran registrasi tingkat')
        setBtnColor('#fa5050')
        setIconAlert(Error2)
        setAlertLottie(true)
        
      } else {
        // post data absen ke database
        var jmlhpertemuan = parseInt(pertemuanMk) + 1
        try {
          await fetch(url + 'api.php?op=mhsAbsen', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({
              hari: getHari(),
              jam: getJam(),
              nim: nimScan,
              nimAsli: dataMhs.nim,
              idjadwal: idJadwal,
              pertemuanke: jmlhpertemuan,
              status: 'MASUK'
            })
          })
            .then((response) => response.json())
            .then((json) => {
              var res = json
              console.log(res)
              if (res == 'Kartu tidak sesuai') {
                setTitileAlert("Absensi Gagal")
                setMessageAlert("Silahkan Scan Kartu Anda Pribadi")
                setIconAlert(Error2)
                setBtnColor('#fa5050')
                setAlertLottie(true)
              } else if (res == 'Sudah Absen') {
                setTitileAlert("Perhatian")
                setMessageAlert("Anda Sudah Melakukan Absen")
                setIconAlert(Warning)
                setBtnColor('#f7f740')
                setAlertLottie(true)
              } else if (res == 'Berhasil Absen') {
                setTitileAlert("Berhasil")
                setMessageAlert("Absensi Berhasil Terima Kasih")
                setIconAlert(Success)
                setBtnColor('#8000FF')
                setAlertLottie(true)
              }
            })            
        } catch (e) {
            setTitileAlert("Perhatian")
            setMessageAlert("Anda Sudah Melakukan Absen")
            setIconAlert(Warning)
            setBtnColor('#f7f740')
            setAlertLottie(true)
        }
        // end proses
        
      }

  }
  
  onSuccess = e => {
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err)
    // );
    var nimScan = e.data
    // console.log(nimScan)
    AbsenMhs({nimScan})
    
  };


  if (alertLottie == true) {
    return (
      <AlertView jsonPath={iconAlert} btnCollor={btnColor} title={titleAlert} message={messageAlert} visible={alertLottie} setVisibleAlert={() => setAlertLottie(false)} klik={() => {
        navigation.navigate('Home')
      } } />
    )
  } else {
    return (
      <QRCodeScanner
        cameraType={camera}
        showMarker={true}
        markerStyle={styles.markerStyle}
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.off}
        style={styles.container}
        topContent={
          <View style={styles.centerText}>
            <View style={{ backgroundColor: '#1488CC', marginTop: -60 }} >
              <LottieView source={Scanqr2} autoPlay loop style={{ width: 80, height: 150, justifyContent: 'center' }} />
            </View>
            <TouchableOpacity style={styles.close} onPress={() => navigation.goBack()}>
              <Icon name='arrow-forward-ios' size={20} color='#1488CC' />
            </TouchableOpacity>
            <TouchableOpacity style={styles.camera} onPress={() => cameraSwicth()}>
              <Icon name='flip-camera-ios' size={20} color='#1488CC' />
            </TouchableOpacity>
          </View>
        }
        bottomContent={        
          <TouchableOpacity style={styles.buttonTouchable} >
            <Image source={LogoDark} style={styles.buttonImage} />
          </TouchableOpacity>
        }
      />
    );
  }

 
}

export default Scan

const styles = StyleSheet.create({  
  markerStyle: {
    borderColor: '#fff',

  },
  centerText: {
    flex: 1,
    width: '100%',
    backgroundColor: '#1488CC',
    // backgroundColor: '#aeae',
    fontSize: 18,
    color: '#777',
    alignItems: 'center',
    justifyContent: 'center',
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
    marginRight: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',    
    padding: 5,
  },
  camera: {
    position: 'absolute',
    top: 0,
    left: 0,
    marginLeft: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',    
    padding: 5,
  },
  text: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'Quicksand-Bold',
    marginBottom: 10
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    top: -50,

  },
  buttonTouchable: {
    flex: 1,
    top:40,
    backgroundColor: '#1488CC',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#aeae',
    width: '100%',
    height: '90%',
  }
});