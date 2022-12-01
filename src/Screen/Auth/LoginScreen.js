import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Keyboard,
  useColorScheme,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {AuthContext} from '../../../store/context/Auth-Contex';
import {LoginUser} from '../../../util/user';
import AButton from '../../components/AButton';
import Input from '../../components/Input';
import colors from '../../config/colors';
import useOrientation from '../../config/useOrientation';

export default function LoginScreen({navigation}) {
  const orientation = useOrientation();
  const ScreenHeight = orientation.height;
  const ScreenWidth = orientation.width;
  const [Loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [person, setperson] = useState('ServiceProvider');
  const scheme = useColorScheme() === 'dark' ? 'dark' : false;

  const ContxAuth = useContext(AuthContext);

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!email) {
      isValid = false;
      return Alert.alert('Email is empty', 'Please input email');
    } else if (!email.match(/\S+@\S+\.\S+/)) {
      isValid = false;
      return Alert.alert('Email is invalid', 'Please input a valid email');
    }

    if (!password) {
      isValid = false;
      return Alert.alert('Please input password', "password can't be null");
    } else if (password.length < 6) {
      isValid = false;
      return Alert.alert('Incorrect password', 'Min password length of 6');
    }

    if (isValid) {
      // console.log('LOGIN');
      Login();
      // navigation.navigate("HomeStack");
    }
  };

  if (Loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  async function Login() {
    // console.log('CALLED in');
    const data = await LoginUser(email, password);
    console.log(data);
    console.log(data?.token, 'REDSPOINSE');
    await AsyncStorage.setItem('token', data?.token);
    await AsyncStorage.setItem('email', JSON.stringify(data));
    ContxAuth.authenticate(data.token, data.email, data);
    Alert.alert(' Successfully', ' 🎉 You are Login Now... 🎉');
  }
  return (
    <View
      style={[
        styles.container,
        scheme && {backgroundColor: scheme === 'dark' ? 'black' : 'white'},
      ]}>
      <ScrollView style={{paddingBottom: 5}}>
        <Image
          style={{
            width: ScreenWidth,
            height: ScreenHeight / 2,
            resizeMode: 'center',
            alignSelf: 'center',
          }}
          resizeMode={'contain'}
          source={require('../../../assets/icon.png')}
        />
        <View style={{alignItems: 'center'}}>
          <Input
            type="Email"
            TextValues={value => setEmail(value)}
            BColor={scheme && 'black'}
          />
          <Input
            type={'Password'}
            secure={true}
            TextValues={value => setPassword(value)}
            BColor={scheme && 'black'}
          />

          <AButton type={'LOGIN'} onPress={validate} />
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 15,
            }}>
            <Text style={{margin: 8, textAlign: 'center'}}>
              Don't have an account?{'  '}
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text
                  style={[
                    styles.underlineText,
                    {
                      textDecorationLine: 'underline',
                      textAlign: 'center',
                      margin: 0,
                      fontWeight: 'bold',
                    },
                  ]}>
                  Register Now
                </Text>
              </TouchableOpacity>
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Forget')}>
              <Text style={styles.underlineText}>Forget Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  underlineText: {
    margin: 5,
    textDecorationLine: 'underline',
    color: colors.primary,
  },
});
