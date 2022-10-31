import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native';

const Menu = () => {

    const navigation = useNavigation();

    const goComing = () => {
        navigation.navigate('ComeSoon');
    }

    return (
        <View style={styles.menuContainer} >
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <TouchableOpacity onPress={() => goComing()} style={styles.menuItem}>
                    <View style={styles.cardMenu}>
                        <Icon name="document-text-outline" size={30} color="#2B32B2" />
                    </View>
                    <Text style={styles.menuItemText}>KHS</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => goComing()}  style={styles.menuItem}>
                    <View style={styles.cardMenu}>
                        <Icon name="document-text-outline" size={30} color="#2B32B2" />
                    </View>
                    <Text style={styles.menuItemText}>KRS</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => goComing()}  style={styles.menuItem}>
                    <View style={styles.cardMenu}>
                        <Icon name="md-document-attach-outline" size={30} color="#2B32B2" />
                    </View>
                    <Text style={styles.menuItemText}>Nilai</Text>                    
                </TouchableOpacity>    
                <TouchableOpacity onPress={() => goComing()}  style={styles.menuItem}>
                    <View style={styles.cardMenu}>
                        <Icon2 name="payment" size={30} color="#2B32B2" />
                    </View>
                    <Text style={styles.menuItemText}>Pembayaran</Text>
                </TouchableOpacity>    
                <TouchableOpacity onPress={() => goComing()}  style={styles.menuItem}>
                    <View style={styles.cardMenu}>
                        <Icon3 name="file-download-outline" size={30} color="#2B32B2" />
                    </View>
                    <Text style={styles.menuItemText}>Unduhan</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default Menu

const styles = StyleSheet.create({
    menuContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: '10%',
        padding: 0,
        marginTop: 10,
        // backgroundColor: '#aeae',
    },
    menuItem: {
        height: 60,
        width: 60,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    cardMenu: {
        height: 40,
        width: 40,
        backgroundColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // maxHeight: 80,
    },
    contText: {
        height: 40,
    },
    menuItemText: {
        marginTop: 5,
        fontSize: 10,
        color: '#2B32B2',
    }
})