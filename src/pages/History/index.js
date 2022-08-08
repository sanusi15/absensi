import { StyleSheet, Text, View, Modal, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios'
import Icon from 'react-native-vector-icons/Entypo'
import SelectDropdown from 'react-native-select-dropdown'
import url from '../../routes/url'
import { Header } from '../../components';


const Height = Dimensions.get("window").height;
const Width = Dimensions.get("window").width;

const History = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [mhs, setMhs] = useState('');
  const [jadwal, setJadwal] = useState([]);
  const [idjadwal, setIdJadwal] = useState('');
  const [dftrHadir, setDftrHadir] = useState([]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('dataStorage');
      if (value !== null) {
        // We have data!!
        const data = JSON.parse(value);
        setMhs(data);
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  }

  const getMK = async ({ index }) => {
    var smstr = index + 1;
    console.log(smstr);
    try {
      await Axios.get(url + 'api.php?op=mkSemester&smstr=' + smstr + '&kls=' + mhs.kelas)
        .then((response) => {          
          const res = response.data;        
          if (res.status === null) {
            const results = ["Tidak ada data"];
            setJadwal(results);
          } else {    
            setJadwal(res);            
          }
        }      
      ).finally(() => {
        // setLoading(false)
        setModalVisible(false);
        }
      )
    } catch (e) {
      setJadwal([{ "matakuliah": 'Tidak ada data' }, { "matakuliah": 'Tidak ada data' }]);
      console.log('Gagalll Menampilkan Jadwal MK')
    }
  }

  const getKehadiran = async () => {
    var nim = mhs.nim;
    var id = idjadwal;
    console.log(nim);
    console.log(id);
    await Axios.get(url + 'api.php?op=getKehadiran&nim=' + nim + '&idjadwal=' + id)
      .then((response) => {
        const res = response.data;
        console.log(res);
        setDftrHadir(res);
      })

  }

  useEffect(() => {
    getData();
  }, [])

  const allSmstr = ["Satu", "Dua", "Tiga", "Empat", "Lima", "Enam"]
  const dftrMk = jadwal;


  return (
    <ScrollView style={{ backgroundColor: '#ebebeb' }}>
    <View>
        <Header title='History' />
        <View style={styles.historyContent}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Mengambil data...</Text>             
              </View>
            </View>
          </Modal>
          <View style={styles.historyHeader}>
            <Text style={styles.txtlabel}>Pilih Semester</Text>
            <SelectDropdown
              data={allSmstr}            
              onSelect={(selectedItem, index) => {
                setModalVisible(true);
                getMK({ index });
              }}
              renderDropdownIcon={() => <Icon name="chevron-down" size={15} color="#000" />}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
              }}
              defaultButtonText="Semester"
              searchPlaceHolderText="Search"
              buttonStyle={{ backgroundColor: '#fff', borderRadius: 5, borderColor: '#aeaeae', borderWidth: 1, width: '100%', height: 40, justifyContent: 'center', alignItems: 'center' }}
              buttonTextStyle={{ fontSize: 10, fontFamily: 'Quicksand-Bold', color: '#000' }}            
              dropdownStyle={{ backgroundColor: '#fff', borderColor: '#fff', borderWidth: 1, borderRadius: 10, }}
              rowTextStyle={{ fontSize: 10, fontFamily: 'Quicksand-Bold', color: '#000' }}
            />
          </View>
          <View style={styles.historyHeader}>
            <Text style={styles.txtlabel}>Pilih Mata Kuliah</Text>
            <SelectDropdown
              data={dftrMk.map(item => item.matakuliah)}            
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
                console.log(dftrMk[index].idjadwal)
                setIdJadwal(dftrMk[index].idjadwal)
              }}
              renderDropdownIcon={() => <Icon name="chevron-down" size={15} color="#000" />}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
              }}
              defaultButtonText="Mata kuliah"
              searchPlaceHolderText="Search"
              buttonStyle={{ backgroundColor: '#fff', borderRadius: 5, borderColor: '#aeaeae', borderWidth: 1, width: '100%', height: 40, justifyContent: 'center', alignItems: 'center' }}
              buttonTextStyle={{ fontSize: 10, fontFamily: 'Quicksand-Bold', color: '#000' }}
              dropdownStyle={{ backgroundColor: '#fff', borderColor: '#fff', borderWidth: 1, borderRadius: 10, }}
              rowTextStyle={{ fontSize: 10, fontFamily: 'Quicksand-Bold', color: '#000' }}
            />
          </View>
          <View style={styles.cariHeader}>
            <TouchableOpacity style={styles.contCari} onPress={() => getKehadiran()}>
              <Text style={styles.txtCari}>Lihat Riwayat Absen</Text>
              <Icon name="eye" size={20} color="#fff" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          </View>

          
          <View style={styles.historyBody}>
            {
              dftrHadir != null ? dftrHadir.map((item, index) => {
                return (
                  <View style={[styles.cardDftrAbsen, index % 2 == 0 ? styles.cardDftrAbsen1 : styles.cardDftrAbsen2]} key={index}>
                    <View style={styles.dftrAbsenCont}>
                      <Text style={styles.dftrAbsenTxtLbl}>Hari</Text>
                      <Text style={styles.dftrAbsenTxtIsi}>{item.hari}</Text>
                    </View>
                    <View style={styles.dftrAbsenCont}>
                      <Text style={styles.dftrAbsenTxtLbl}>Jam Absensi</Text>
                      <Text style={styles.dftrAbsenTxtIsi}>{item.jam}</Text>
                    </View>
                    <View style={styles.dftrAbsenCont}>
                      <Text style={styles.dftrAbsenTxtLbl}>Pertemuan ke</Text>
                      <Text style={styles.dftrAbsenTxtIsi}>{item.pertemuan}</Text>
                    </View>
                    <View style={styles.dftrAbsenCont}>
                      <Text style={styles.dftrAbsenTxtLbl}>Tanggal</Text>
                      <Text style={styles.dftrAbsenTxtIsi}>{item.tanggal}</Text>
                    </View>
                    <View style={styles.dftrAbsenCont}>
                      <Text style={styles.dftrAbsenTxtLbl}>Status</Text>
                      <Text style={[styles.dftrAbsenTxtStatus, item.status == 'MASUK' ? styles.dftrAbsenTxtStatus1 : styles.dftrAbsenTxtStatus2 ]}>{item.status}</Text>
                    </View>
                  </View>
                )
              }
              ) : (
                  <View style={styles.cardDftrAbsenNol}>
                    <View style={styles.dftrAbsenCont}>
                      <Text style={styles.dftrAbsenTxtLbl}>Data Kosong</Text>
                    </View>
                  </View>
              )

            }
           
            
          </View>

        </View>
      </View>
    </ScrollView>
  )
}

export default History

const styles = StyleSheet.create({
  cardDftrAbsen: {
    // backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#aeaeae',
    borderWidth: 1,
    height: 200,
    justifyContent: 'center',
    marginVertical: 5,  
    padding: 10,
    paddingHorizontal: 20,
  },
  cardDftrAbsen1: {
    backgroundColor: '#fff',   
  },
  cardDftrAbsen2: {
    backgroundColor: '#ebe8e8',   
  },
  dftrAbsenCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  dftrAbsenTxtIsi: {
    fontSize: 15,
    fontFamily: 'Quicksand-Bold',
    color: '#515251',
  },
  dftrAbsenTxtStatus: {
    fontSize: 15,
    fontFamily: 'Quicksand-Bold',    
  },
  dftrAbsenTxtStatus1: {
    color: '#36cf36',
  },
  dftrAbsenTxtStatus2: {
    color: '#ff0000',
  },
  dftrAbsenTxtLbl: {
    fontSize: 12,
    fontFamily: 'Quicksand-Bold',
    color: '#aeaeae',
  },
  cardDftrAbsenNol: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#aeaeae',
    borderWidth: 1,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  historyContent: {
    flex: 1,  
    backgroundColor: '#ebebeb',
    marginTop: 10,
  },
  historyHeader: {
    flexDirection: 'column',
    paddingHorizontal: 10,
    height: Height * 0.1 - 10,
    // backgroundColor: '#aeaf',
    marginBottom: 10,
  },
  txtlabel: {
    fontSize: 13,
    fontFamily: 'Quicksand-Bold',
    color: '#000',
    top: 3,
    marginBottom: 10,
  },
  cariHeader: {
    marginTop: 10,
    paddingHorizontal: 10,
    height: Height * 0.1 - 40,
    marginBottom: 10,
  },
  contCari: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: Height * 0.1 -40,
    width: '100%',
    backgroundColor: '#1488CC',
    marginBottom: 10,
    borderRadius: 5,
  },
  txtCari: {
    fontSize: 13,
    color: '#fff',
    fontFamily: 'Quicksand-Bold',
    marginLeft: 10,
  },
  historyBody: {
    padding: 10,
  },

  centeredView: {    
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    // backgroundColor: "#aeaeae",
    // opacity: 0.5,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
})