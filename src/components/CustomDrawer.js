import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  useColorScheme,
  Switch,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../config/colors';
import {AuthContext} from '../../store/context/Auth-Contex';

const CustomDrawer = props => {
  // const [isDarkMode, setIsDarkMode] = useState(true);
  const AuthContx = useContext(AuthContext);
  const scheme = useColorScheme();
  const UpperColor = scheme === 'dark' ? 'white' : 'black';
  const BackColor = scheme === 'dark' ? 'black' : 'white';

  const login = AuthContx.User.name;
  return (
    <View style={{flex: 1, backgroundColor: BackColor}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: BackColor}}>
        <ImageBackground
          source={require('../../assets/gradient.jpg')}
          style={{padding: 18}}>
          <Image
            source={require('../../assets/user-profile.jpg')}
            style={{
              height: 80,
              width: 80,
              borderRadius: 40,
              marginBottom: 10,
            }}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: 18,
              marginBottom: 5,
            }}>
            {login}
          </Text>
        </ImageBackground>
        <View style={{flex: 1, backgroundColor: BackColor, paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity
          onPress={() => AuthContx.logout()}
          style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} color={UpperColor} />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
                color: UpperColor,
              }}>
              {login == 'guest' ? 'SignIn' : 'Sign Out'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
