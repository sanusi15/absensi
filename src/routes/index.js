import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Splash, Login, DaftarAkun, Home, AddNews, Profile } from '../pages';
import Testing from '../pages/Home/testing'

const Stack = createNativeStackNavigator();


const index = () => {
  return (
    <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Splash" component={Splash}  options={{headerShown: false}} />       
        <Stack.Screen name="Login" component={Login}  options={{headerShown: false}} />       
        <Stack.Screen name="Home" component={Home}  options={{headerShown: false}} />       
    </Stack.Navigator>
  );
};

export default index;
