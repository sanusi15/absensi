import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import LottieView from 'lottie-react-native'

const AlertView = ({ title, message, btnCollor, jsonPath, visible, setVisibleAlert }) => {
    // const [ visibleAlert, setVisibleAlert ] = useState(visible)
    return (
        <View style={styles.centeredView}>
            <Modal transparent={true} animationType="slide" visible={visible}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{title}</Text>
                        <View style={{ width: '100%', height: 0.5, backgroundColor: '#aeaeae', marginVertical: 15 }}></View>
                        <View style={{ width: '50%', height: 100 }}>
                            <LottieView  source={jsonPath} autoPlay loop />
                        </View>
                        <Text style={styles.textStyle}>{message}</Text>                        
                        <TouchableOpacity style={{ ...styles.openButton, backgroundColor: btnCollor }} onPress={() => setVisibleAlert()}>
                            <Text style={styles.okStyle}>Ok</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default AlertView

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        zIndex: 999
    },
    modalView: {
        width: '80%',
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.85,
        elevation:5
    },
    openButton: {
        backgroundColor: '#aeaeae',
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        width: '100%',
        marginTop: 30
    },
    textStyle: {
        color: '#000',
        textAlign: 'center',
        fontSize: 18,
        marginTop:6,
        fontFamily: 'Oswald'
    }, 
    okStyle: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 20,
    },
    modalText: {
        textAlign: 'center',
        // fontWeight: 'bold',
        fontSize: 34,
        fontFamily: 'BebasNeue-Regular',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,            
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 5
    }
    
})