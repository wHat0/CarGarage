import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  ScrollView,
  Keyboard,
  Alert,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {ActivityIndicator, Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../../store/context/Auth-Contex';
import colors from '../config/colors';
import {LINK} from '../../util/http';

function Posting({navigation}) {
  const [image, SetImage] = useState();

  const ContxAuth = useContext(AuthContext);
  const token = ContxAuth.token;

  // const event = new Date();

  const [inputs, setInputData] = useState({
    description: '',
    name: '',
    address: '',
    price: '',
  });

  const [errors, setErrors] = useState({});
  const [Loading, setLoading] = useState(false);

  async function Post() {
    setLoading(true);
    const formData = new FormData();
    formData.append('image', {
      name: `pic ${new Date()} `,
      uri: image.path,
      type: image.mime,
    });

    formData.append('name', inputs.name);
    formData.append('description', inputs.description);
    formData.append('address', inputs.address);
    formData.append('category', 'New Car');
    formData.append('price', inputs.price);
    formData.append('token', token);
    const date = new Date().getTime();
    console.log(date);

    console.log(formData);
    const res = await fetch(LINK, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        authorization: token,
      },
      body: formData,
    });
    console.log(res);
    const newRes = await res?.json();
    console.log(newRes);
    Alert.alert('Post Successfully', ` 🎉 ${newRes?.message}... 🎉`);
    setInputData();
    setLoading(false);
  }

  function ChangeValue(value, input) {
    setInputData(curInput => {
      return {...curInput, [input]: value};
    });
  }

  const validate = () => {
    console.log('VALidation');
    Keyboard.dismiss();
    let isValid = true;
    setErrors({});

    if (!inputs.name) {
      handleError('Please name your Pet', 'Short Name');
      isValid = false;
    }
    if (!inputs.price) {
      Alert.alert('Warning', 'Please enter Price');
      isValid = false;
    }

    if (isValid) {
      console.log(JSON.stringify(inputs));
      Post();
    }
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  if (Loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  async function ImageGetter() {
    ImagePicker.openPicker({
      compressImageMaxWidth: 600,
      compressImageMaxHeight: 400,
      compressImageQuality: 0.7,
      cropping: true,
    })
      .then(image => {
        SetImage(image);
      })
      .catch(err => console.log(err, 'out'));
    console.log('Imagegot');
    // console.log(image);
  }

  return (
    <SafeAreaView style={{flex: 1, color: colors.primary}}>
      <View style={styles.header}>
        <Icon name="list" size={28} onPress={() => navigation.toggleDrawer()} />
      </View>
      <ScrollView
        style={{
          borderRadius: 100,
          backgroundColor: 'white',
          paddingVertical: 20,
        }}
        contentContainerStyle={{
          justifyContent: 'center',
        }}>
        <View style={styles.header}></View>

        {/* <Text>Posting</Text> */}
        <View
          style={{
            marginHorizontal: 10,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 60,
          }}>
          <TouchableOpacity onPress={() => ImageGetter()}>
            {!image ? (
              <View
                style={{
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 100,
                  width: 380,
                  height: 300,
                  overflow: 'hidden',

                  // marginBottom: 8,
                }}>
                <Icon name="images-outline" size={100} color={'grey'} />
              </View>
            ) : (
              <View
                style={{
                  padding: 15,
                  backgroundColor: colors.background,
                  borderRadius: 100,
                  width: 380,
                  height: 300,
                  overflow: 'hidden',
                }}>
                <Image
                  style={{
                    borderRadius: 10,
                    width: '100%',
                    height: '100%',
                    backgroundColor: colors.background,

                    resizeMode: 'contain',
                  }}
                  source={{uri: image.path}}
                  resizeMode={'contain'}
                />
              </View>
            )}
          </TouchableOpacity>

          <TextInput
            placeholder="Name"
            placeholderTextColor={'grey'}
            style={styles.input}
            value={inputs?.name}
            onChangeText={value => ChangeValue(value, 'name')}
          />
          <TextInput
            placeholder="address"
            placeholderTextColor={'grey'}
            style={styles.input}
            value={inputs?.address}
            onChangeText={value => ChangeValue(value, 'address')}
          />

          <TextInput
            placeholder="price"
            placeholderTextColor={'grey'}
            style={styles.input}
            keyboardType="numeric"
            value={inputs?.price}
            onChangeText={value => ChangeValue(value, 'price')}
          />

          <TextInput
            placeholder="description"
            placeholderTextColor={'grey'}
            multiline={true}
            style={[styles.input, {width: '90%'}]}
            value={inputs?.description}
            onChangeText={value => ChangeValue(value, 'description')}
          />
          <TouchableOpacity
            onPress={validate}
            style={[
              styles.Button,
              {
                borderColor: colors.primary,
                borderWidth: 1,
                marginTop: 15,
              },
            ]}>
            <Text
              style={[
                styles.textButton,
                {
                  color: colors.primary,
                },
              ]}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Posting;

const styles = StyleSheet.create({
  input: {
    // height: ,
    width: '80%',
    marginTop: 18,
    borderWidth: 0.5,
    borderRadius: 8,
    color: 'black',
  },
  Button: {
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textButton: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
