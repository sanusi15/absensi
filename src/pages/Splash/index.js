import { Text, View, StatusBar, Image } from 'react-native'
import React, { useEffect } from 'react'
import {Logo} from '../../../assets'

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login')
    }, 300);
  }, [navigation]);
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar hidden={true} />
      <Image source={Logo} style={{ width: 300, height:320 }} />          
    </View>
  )
}

export default Splash