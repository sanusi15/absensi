import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { Tombol3 } from '../../../assets';

export class ButtonAbsen extends Component {
  render() {
    return (
      <LinearGradient
          colors={[ '#8000FF', '#00FFFF', ]}
          start={{ x: 0.0, y: 0.0 }} end={{ x: 0.0, y: 1.0 }}
          
          style={styles.grediant}
        >
            <TouchableOpacity style={styles.buttonContainer}>
                {/* <Text style={styles.txtAbsen}>ABSENSI</Text> */}
                <Image source={Tombol3} style={styles.iconJari} />
            </TouchableOpacity>
        </LinearGradient>
    )
  }
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
    }
})