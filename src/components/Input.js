import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import colors from '../config/colors';

function Input({BColor, type, TextValues, KeyPad, secure}) {
  return (
    <View
      style={{
        backgroundColor: BColor ? BColor : 'white',
        width: '80%',
        height: 40,
        marginTop: 18,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,
      }}>
      <TextInput
        placeholder={type}
        style={{width: '100%'}}
        placeholderTextColor={colors.primary}
        keyboardType={KeyPad ? KeyPad : 'default'}
        onChangeText={TextValues}
        secureTextEntry={secure ? secure : false}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({});
