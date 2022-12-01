import React, {useState} from 'react';
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
} from 'react-native';
import {SignUpUser} from '../../../util/user';
import AButton from '../../components/AButton';
import Input from '../../components/Input';
import colors from '../../config/colors';
import useOrientation from '../../config/useOrientation';

export default function SignUpScreen({navigation}) {
  const orientation = useOrientation();
  const ScreenHeight = orientation.height;
  const ScreenWidth = orientation.width;
  const [Loading, setLoading] = useState(false);

  const scheme = useColorScheme() === 'dark' ? 'dark' : false;
  const [inputs, SetInputs] = useState({
    Name: '',
    phone: '',
    Address: '',
    email: '',
    password: '',
  });

  function ChangeValue(value, input) {
    SetInputs(curInput => {
      return {...curInput, [input]: value};
    });
  }

  const validate = () => {
    console.log('VALidation');
    console.log(inputs);
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.Name) {
      isValid = false;
      return Alert.alert('Invalid Name', 'Please input fullname');
    }

    if (!inputs.phone) {
      isValid = false;
      return Alert.alert('Invalid Number', 'Please input phone number');
    }
    if (!inputs.Address) {
      isValid = false;
      return Alert.alert('Invalid Address', 'Please input Address');
    }
    if (!inputs.email) {
      isValid = false;
      return Alert.alert('Invalid Email', 'Please input email');
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      isValid = false;
      return Alert.alert('Invalid Email', 'Please input a valid email');
    }

    if (!inputs.password) {
      isValid = false;
      return Alert.alert('Password inValid', 'Please input password');
    } else if (inputs.password.length < 6) {
      isValid = false;
      return Alert.alert('Password inValid', 'Min password length of 5');
    }

    if (isValid) {
      SignUp();
      console.log('USER SIGNUP');
    }
  };

  async function SignUp() {
    console.log('CALLED SIgnup');
    setLoading(true);
    try {
      const token = await SignUpUser(inputs);
      Alert.alert('SignUp successfully');
      console.log(token);
    } catch (e) {
      console.log(e?.response?.data);
      setLoading(false);
      // Alert.alert('ALERT', 'User Already Registered');
      return;
    }
    setLoading(false);
    // Alert.alert('SignUp Successfully', ' 🎉 You can Login Now... 🎉');
  }

  return (
    <ScrollView style={{flex: 1, width: '100%'}}>
      <View style={[styles.container, scheme && {backgroundColor: 'black'}]}>
        <Image
          style={{
            width: ScreenWidth,
            height: ScreenHeight / 2,
            resizeMode: 'center',
          }}
          resizeMode={'contain'}
          source={require('../../../assets/icon.png')}
        />

        <Input
          type="Name"
          TextValues={value => ChangeValue(value, 'Name')}
          BColor={scheme && 'black'}
        />
        <Input
          type={'Mobile'}
          KeyPad={'number-pad'}
          TextValues={value => ChangeValue(value, 'phone')}
          BColor={scheme && 'black'}
        />
        <Input
          type={'Address'}
          TextValues={value => ChangeValue(value, 'Address')}
          BColor={scheme && 'black'}
        />
        <Input
          type={'Email'}
          TextValues={value => ChangeValue(value, 'email')}
          BColor={scheme && 'black'}
        />
        <Input
          type={'Password'}
          secure={true}
          BColor={scheme && 'black'}
          TextValues={value => ChangeValue(value, 'password')}
        />

        {/* BUTTON */}
        <AButton type={'REGISTER'} onPress={validate} />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 15,
          }}>
          <Text style={{margin: 8, textAlign: 'center'}}>
            Already have an Account?{'  '}
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
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
                Login
              </Text>
            </TouchableOpacity>
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
            <Text style={styles.underlineText}>Terms&Conditions</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

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
