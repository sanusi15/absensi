import { Text, View, StyleSheet, Image } from 'react-native'
import React, { Component } from 'react'
import { Book, Jam } from '../../../assets/icons'

const Card = ({MK, jam}) => {
    return (
        <View style={styles.card}>
            <View style={styles.iconContent}>
                <Image source={Book} style={{ width: 50, height:50 }} />
            </View>
            <View style={styles.info}>
                <Text style={styles.textMK}>
                    {MK}
                </Text>
                <View style={{ flexDirection: 'row', }}>
                    <Image source={Jam} style={{ width:20, height:20, marginRight:10  }} />
                    <Text style={styles.textJam}>{jam}</Text>
                </View>

            </View>
        </View>
    )
}

export class List extends Component {
  render() {
    return (
      <View style={styles.content}>
            <Card MK={"Pemrograman Basic"} jam={"08:00 - 11:40"} />
            <Card MK={"Android Studio"} jam={"13:00 - 17:00"} />
            <Card MK={"UI/UX Desain"} jam={"18:00 - 21:00"} />
      </View>
    )
  }
}

export default List

const styles = StyleSheet.create({
    content: {
        padding: 30,
        flex: 1
    },
    card: {
        flexDirection: 'row',
        marginBottom:10,
        width: '100%',
        backgroundColor: '#6504B5',
        // backgroundColor: '#fff',
        height: 80,
        borderRadius: 10,
        elevation: 10,
        padding:10
    },
    info:{
        marginLeft:20,        
    },
    textMK: {
        fontSize: 18,
        fontFamily: 'Oswald',
        fontWeight:'bold',
        color: '#ffffff',
        backgroundColor: 'transparent',
        marginBottom:10
    },
    textJam: {
        fontSize: 14,
        fontFamily: 'Oswald',
        color: '#dee0df',
        backgroundColor: 'transparent'
    },
    iconContent: {
        backgroundColor: '#fff',
        height: 60,
        width: 60,
        borderRadius: 30,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }
})