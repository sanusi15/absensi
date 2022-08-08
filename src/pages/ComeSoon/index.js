import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import { Comingsoon2 } from '../../../assets'

const ComeSoon = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#fff" />
        <LottieView source={Comingsoon2} autoPlay loop />      
    </View>
  )
}

export default ComeSoon

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    }
})