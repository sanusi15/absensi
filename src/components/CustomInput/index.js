import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

const CustomInput = ({value, setValue, placeholder, secureTextEntry, icon}) => {
  return (
    <View style={styles.container}>
      <TextInput
              style={styles.input}
              placeholder={placeholder}
              value={value}
              onChangeText={setValue}
              secureTextEntry={secureTextEntry}
          />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      // justifyContent: '',
      backgroundColor: '#fff',
      width: '100%',
      borderColor: '#E8E8E8',
      borderWidth: 1,
      borderRadius: 5,

      paddingHorizontal: 10,
      marginVertical: 7,
  },
});
