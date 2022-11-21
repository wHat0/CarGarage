import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, Text, TouchableOpacity} from 'react-native';
import colors from '../config/colors';

function AButton({type, onPress, width, icon, color}) {
  return (
    <TouchableOpacity
      style={{
        marginTop: 18,
        width: width ? width : '55%',
        height: 50,
        backgroundColor: color ? color : colors.primary,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}
      onPress={onPress}>
      {icon && (
        <Ionicons name={icon} size={25} color={'white'} style={{margin: 6}} />
      )}
      <Text style={{textAlign: 'center', color: 'white'}}>{type}</Text>
    </TouchableOpacity>
  );
}

export default AButton;
