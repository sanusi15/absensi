import { StyleSheet, View, Image } from 'react-native'
import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Login, History, Scan, User, Splash, ComeSoon } from '../pages'
import Icon from 'react-native-vector-icons/Octicons'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const MainApp = () => {

    return (
        <Tab.Navigator 
            initialRouteName='Home'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home';
                        color = focused ? '#fff' : '#aeaeae';
                        size = focused ? 20 : 20;
                    } else if (route.name === 'User') {
                        iconName = focused ? 'person' : 'person';
                        color = focused ? '#fff' : '#aeaeae';
                        size = focused ? 25 : 25;
                    } else if (route.name === 'History') {
                        iconName = focused ? 'history' : 'history';
                        color = focused ? '#fff' : '#aeaeae';
                        size = focused ? 20 : 20;
                    }
                    return (
                        <View style={focused ? styles.iconsContainer : ''}>
                            <View style={focused ? styles.icons : ''}>
                                <Icon name={iconName} size={size} color={color} />
                            </View>
                        </View>
                    )

                },
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#fff',
                    position: 'absolute',
                    bottom: 10,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    borderRadius: 15,
                    height: 60,
                    ...styles.shadow
                },


            })}
        >
            <Tab.Screen name="History" component={History} options={{ headerShown: false, }}  />
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false, }} />
            <Tab.Screen name="User" component={User} options={{ headerShown: false }} Color={'#aeae'} />
        </Tab.Navigator>
    )
}

const Router = () => {
    return (
        <Stack.Navigator initialRouteName='Splash'>
            <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
            <Stack.Screen name="Scan" component={Scan} options={{ headerShown: false }} />
            <Stack.Screen name="ComeSoon" component={ComeSoon} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default Router

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#1488CC',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.51,
        shadowradius: 3.5,
        elevation: 5
    },
    iconsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        top: -25,
        // backgroundColor: 'green',
        backgroundColor: '#fff',
        padding: 0,
        width: 58,
        height: 58,
        borderRadius: 29,

    },
    icons: {
        backgroundColor: '#1488CC',
        width: 46,
        height: 46,
        borderRadius: 23,
        alignItems: 'center',
        justifyContent: 'center'

    }

})