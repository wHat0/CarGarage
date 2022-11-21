import React from 'react';
import {View, StyleSheet, Image, useColorScheme} from 'react-native';
import AButton from '../../components/AButton';
import Input from '../../components/Input';
import colors from '../../config/colors';
import useOrientation from '../../config/useOrientation';

function Forget(props) {
  const scheme = useColorScheme() === 'dark' ? 'dark' : false;
  const orientation = useOrientation();
  const ScreenHeight = orientation.height;
  const ScreenWidth = orientation.width;
  return (
    <View style={[styles.container, scheme && {backgroundColor: 'black'}]}>
      <Image
        style={{
          width: ScreenWidth,
          height: ScreenHeight / 2,
          margin: 30,
          resizeMode: 'center',
        }}
        resizeMode={'contain'}
        source={require('../../../assets/icon.png')}
      />
      <Input type="Email" BColor={scheme && 'black'} />
      <AButton type={'RESET PASSWORD'} />
    </View>
  );
}

export default Forget;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    padding: 5,
  },
  underlineText: {
    margin: 5,
    textDecorationLine: 'underline',
    color: colors.primary,
  },
});
