import { Text, View, StyleSheet, StatusBar, Image, TouchableOpacity, Alert } from 'react-native'
import React, { Component } from 'react'
import Axios from 'axios'
import { Titik, Tombol } from '../../../assets'
import { List } from '../../components'
import AsyncStorage from '@react-native-async-storage/async-storage';



export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
    }
  }

  componentDidMount() {   
    this.ambilListData()
        
  }

  async logOut() {
    await AsyncStorage.clear()
    this.props.navigation.navigate('Login')
  }

  ambilListData() {        
      Axios.get('https://websanblog.000webhostapp.com/api.php?op=getOne&id_user=4')
        .then((json) => {
        // console.log('hasil = ' + JSON.stringify(json.data.result))
          
        this.setState({listData:json.data.result})
      })
      .catch(err => console.log('err = ',err))
  }

  
  // const GetJadwal = async () => {
  //   var d = new Date()
  //   var utc = d.getTime()+(d.getTimezoneOffset()*60000)
  //   var tglIND = new Date(utc + (3600000 * 7))    
  //   var myDays = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];
  //   var hari = myDays[tglIND.getDay()]
  //   await Axios.get('http://192.168.1.8:8011/golkar/api.php?op=jadwalMk&hari='+hari+'&kelas='+kelas)            
  //     .then((res) => JSON.parse(res.data))
  //     // .then(console.log)
      
  // }

  absenMhs() {
    var b = new Date()
    var utc = b.getTime()+(b.getTimezoneOffset()*60000)
    var tglIND = new Date(utc+(3600000*7))
    var myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    var hari = tglIND.getDay()
    var tanggal = tglIND.getFullYear()+"-"+(tglIND.getMonth()+1)+"-"+tglIND.getDate()
    var jam = tglIND.toLocaleTimeString()
    var nim = this.state.token
    var idJdwal = 121
    var pertemuanKe = 2
    var status = 'Masuk'
    fetch('https://websanblog.000webhostapp.com/api.php?op=mhsAbsen', {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: "hari="+myDays[hari]+"&tanggal="+tanggal+"&jam="+jam+"&nim="+nim+"&idJadwal="+idJdwal+"&pertemuanKe="+pertemuanKe+"&status="+status
    })
    .then((response) => response.json())
    .then((json) => {
      console.log(JSON.stringify(json.data))
      Alert.alert(JSON.stringify(json.data))
    })
  }
      

  render() {
    return (
      <View style={styles.content}>
        <StatusBar barStyle='light-content' backgroundColor='#6504b5' />
        <View style={styles.header}>                  
          <View></View>
          <Text style={styles.nama}>{ this.state.listData.username }</Text>
          <Image source={Titik} style={{ width:20, height:20, marginTop:60}} />
        </View>

        <View style={styles.pesan}>
          <Text style={styles.isiPesan}>Silahkan tekan untuk Proses Absensi</Text>
        </View>

        <View style={styles.body}>
          {/* <View >
            <Text style={styles.jam}>18</Text>
          </View> */}
          <TouchableOpacity onPress={() => this.logOut()}>
            <View style={styles.tombol}>
            <Image source={Tombol} style={{ width:150, height:150 }} />
            </View>
          </TouchableOpacity>
          {/* <View>
            <Text style={styles.jam}>00</Text>
          </View> */}
        </View>

        <View style={styles.mkNow}>
          <Text style={styles.mk}>UI/UX Desain</Text>
        </View>

        <List />

      </View>
    )
  }
}

export default Home

const styles = StyleSheet.create({
  content: {
    flex:1,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#6504B5',
    width: '100%',
    height: 100,
    justifyContent: 'space-between',
  },
  nama: {
    color: '#ffffff',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 50,
    fontFamily: 'Oswald'
  },
  pesan: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 50
  },
  isiPesan: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000'
  },
  body: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  jam: {
    fontFamily: 'Oswald',
    fontSize: 50,
    fontWeight: 'bold',
    color: '#6504B5',
    marginTop: 35
  },
  mkNow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  mk: {
    fontFamily: 'Pacifico',
    fontWeight: 'bold',
    fontSize: 25,
    color: '#6504B5'
  }
});
