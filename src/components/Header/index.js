import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Header = ({title}) => {
  return (
    <View style={styles.head2Container}>
      <Text style={styles.titleHead}>{title}</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    head2Container: {
        backgroundColor: '#fff',
        width: '100%',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleHead: {
        fontSize: 18,
        fontFamily: 'Quicksand-Bold',
        color: '#000',
    }
})