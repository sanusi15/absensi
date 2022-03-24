import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { LogOutIcon,} from '../../../assets'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';

const Header = ({nama, onPress}) => {
return (
    <View style={styles.container}>
        <View></View>
        <View>
            <Text style={styles.nama}>{nama}</Text>
        </View>

        <TouchableOpacity onPress={onPress}>
            <LinearGradient style={styles.boxIcon}
                colors={['#0072ff', '#00c6ff',]}
                start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
            >
                <Image source={LogOutIcon} style={styles.gearIcon} />
            </LinearGradient> 
        </TouchableOpacity>
    </View>
)
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',        
        marginTop: 20,
        paddingHorizontal: 20
    },
    nama: {
        fontSize: 20,
        color: '#fff',
        fontFamily: 'PTSansNarrow-Bold',
        marginLeft: 20
    },
    boxIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    gearIcon: {
        width: 24,
        height: 24
    },
})