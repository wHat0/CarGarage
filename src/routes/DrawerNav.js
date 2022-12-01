import React, {useContext} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, Text, Alert} from 'react-native';

import colors from '../config/colors';
import CustomDrawer from '../components/CustomDrawer';

import Home from '../Screen/Home';
import ProductSelected from '../Screen/ProductSelected';

import Favourite from '../Screen/Favourite';
import ProfileScreen from '../Screen/ProfileScreen';
import Posting from '../Screen/Posting';
import EditProfile from '../Screen/EditProfile';
import {FavContext} from '../../store/context/fav-context';
import CompaireScreen from '../Screen/CompaireScreen';

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  const fav = useContext(FavContext);
  const Items = fav.ids;

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={({navigation, route}) => ({
        drawerPosition: 'right',
        headerTitle: '',
        headerTransparent: true,
        drawerActiveBackgroundColor: '#e4b1',

        headerLeft: () =>
          route.name != 'Home' ? (
            <View
              style={{
                flexDirection: 'row',
                padding: 15,
                backgroundColor: 'black',
                borderBottomRightRadius: 15,
                justifyContent: 'center',
              }}>
              <Ionicons
                name={'arrow-back'}
                size={25}
                color={'white'}
                onPress={() => navigation.goBack()}
              />
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                padding: 15,
                backgroundColor: 'black',
                borderBottomRightRadius: 15,
                justifyContent: 'center',
              }}>
              <Ionicons
                name={'list'}
                size={25}
                color={'white'}
                onPress={() => navigation.openDrawer()}
              />
            </View>
          ),
        //
      })}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={({navigation, route}) => ({
          drawerIcon: (color, size) => (
            <Ionicons name="home" size={20} color={color} />
          ),
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                padding: 15,
                backgroundColor: 'black',
                borderBottomLeftRadius: 15,
                justifyContent: 'center',
              }}>
              <Ionicons
                name={'heart'}
                size={25}
                color={'white'}
                onPress={() => navigation.navigate('Favourite')}
              />
              <Text
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  height: 18,
                  width: '8%',
                  borderRadius: 7,
                  borderWidth: 0.15,
                  elevation: 18,
                  shadowColor: 'black',
                  shadowOpacity: 15,
                  shadowRadius: 5,
                }}>
                {Items.length}
              </Text>
            </View>
          ),
        })}
      />
      <Drawer.Screen
        name="Favourite"
        component={Favourite}
        options={{
          drawerIcon: (color, size) => (
            <Ionicons name="heart" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: (color, size) => (
            <Ionicons name="md-person" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Post"
        component={Posting}
        options={{
          drawerIcon: (color, size) => (
            <Ionicons name="add-circle" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Compare"
        component={CompaireScreen}
        options={{
          // headerTransparent: false,
          drawerIcon: (color, size) => (
            <Ionicons name="add-circle" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          drawerItemStyle: {height: 0},
        }}
      />
      <Drawer.Screen
        name="ProductDetails"
        component={ProductSelected}
        options={{
          drawerItemStyle: {height: 0},
        }}
      />
    </Drawer.Navigator>
  );
};
export default DrawerNav;
