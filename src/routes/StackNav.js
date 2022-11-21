import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignUpScreen from '../Screen/Auth/SignUpScreen';
import LoginScreen from '../Screen/Auth/LoginScreen';
import Forget from '../Screen/Auth/Forget';
import TermCond from '../Screen/Auth/TermCond';
import colors from '../config/colors';
import DrawerNav from './DrawerNav';

const Stack = createNativeStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Terms"
        component={TermCond}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="HomeStack"
        component={DrawerNav}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Forget"
        component={Forget}
        options={{
          headerStyle: {backgroundColor: colors.primary},
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}
