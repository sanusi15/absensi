import { StyleSheet, Text, Pressable, TouchableOpacity } from 'react-native';
import React from 'react';

const CustomButton = ({onPress, text, type = "PRIMARY", bgColor, fgColor}) => {
    return (
        <TouchableOpacity onPress={onPress}
        style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : {}
        ]}>
            <Text style={[
                styles.text,
                styles[`text_${type}`],
                fgColor ? {color: fgColor} : {}
                ]}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    container: {        
        width: '100%',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    container_PRIMARY: {
        backgroundColor: '#2196F3',
    },
    container_TERTIARY:{},
    text: {
        color: '#fff',
        fontFamily: 'Oswald',
        
    },
    text_TERTIARY: {
        color: 'white',
        fontFamily: 'FugazOne-Regular'
    }
});
