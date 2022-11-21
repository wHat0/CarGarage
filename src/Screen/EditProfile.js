import React, {useState} from 'react';
import {
  View,
  Button,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';

const EditProfile = ({navigation}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [image, SetImage] = useState();

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
    <View
      style={{
        flex: 1,
        backgroundColor: '#1776BA',
        alignItems: 'center',
        borderBottomLeftRadius: 150,
        borderBottomRightRadius: 150,
        paddingTop: '20%',
      }}>
      <TouchableOpacity onPress={() => ImageGetter()}>
        {!image ? (
          <View
            style={{
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 100,
              width: 160,
              height: 160,
              overflow: 'hidden',

              // marginBottom: 8,
            }}>
            <Ionicon name="images-outline" size={70} color={'grey'} />
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
      <View
        style={{
          borderWidth: 3,
          borderRadius: 10,
          // marginTop: -45,
          marginLeft: 65,
          borderColor: '#1776BA',
          marginBottom: 30,
        }}>
        <Ionicon name="add" size={25} style={{color: '#1776BA'}} />
      </View>

      <View style={styles.input}>
        <Ionicon name="person-outline" size={20} style={{marginRight: 5}} />
        <TextInput style={styles.inputfield} placeholder="Username" />
      </View>
      <View style={styles.input}>
        <Ionicon name="call-outline" size={20} style={{marginRight: 5}} />
        <TextInput style={styles.inputfield} placeholder="Contact Number" />
      </View>
      <View style={styles.input}>
        <Ionicon name="person-outline" size={20} style={{marginRight: 5}} />
        <TextInput
          style={styles.inputfield}
          placeholder="Password"
          secureTextEntry={isPasswordVisible ? false : true}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Ionicon
            name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            style={{marginRight: 5}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.input}>
        <Ionicon name="person-outline" size={20} style={{marginRight: 5}} />
        <TextInput
          style={styles.inputfield}
          placeholder="Confirm Password"
          secureTextEntry={isPasswordVisible ? false : true}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Ionicon
            name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            style={{marginRight: 5}}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{
          marginTop: 20,
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: 'white',
          borderRadius: 10,
          width: 200,
          borderWidth: 0.5,
          alignItems: 'center',
          borderColor: 'grey',
        }}
        onPress={() => navigation.navigate('Profile')}>
        <Text
          style={{
            color: '#1776BA',
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          Confirm
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 0.3,
    width: 300,
    height: 50,
    padding: 8,
    margin: 6,
  },
  inputfield: {width: '80%'},
});

export default EditProfile;
