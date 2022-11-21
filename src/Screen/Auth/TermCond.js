import React from 'react';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import colors from '../../config/colors';

export default function TermCond(props) {
  const ScreenHeight = Dimensions.get('window').height;
  const ScreenWidth = Dimensions.get('window').width;
  return (
    <View style={styles.container}>
      <Image
        style={{width: '90%', height: '33%', margin: 30}}
        source={require('../../../assets/icon.png')}
        resizeMode={'contain'}
      />
      <Text>TERM AND CONDITIONS</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    paddingTop: '18%',
  },
});
