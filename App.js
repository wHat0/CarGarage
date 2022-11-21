import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useContext} from 'react';
import DrawerNav from './src/routes/DrawerNav';
import {AuthStack} from './src/routes/StackNav';
import AuthContextProvider, {AuthContext} from './store/context/Auth-Contex';
import SplashScreen from 'react-native-splash-screen';
import {DarkTheme, DefaultTheme} from 'react-native-paper';
import {useColorScheme} from 'react-native';
import FavContextProvider from './store/context/fav-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  return (
    <AuthContextProvider>
      <FavContextProvider>
        <Navigation />
      </FavContextProvider>
    </AuthContextProvider>
  );
}

function Navigation() {
  const scheme = useColorScheme();
  // console.log(scheme);
  const ContxAuth = useContext(AuthContext);
  useEffect(() => {
    async function getToken() {
      const token = await AsyncStorage.getItem('token');
      const email = JSON.parse(await AsyncStorage.getItem('email'));

      if (token) {
        console.log(email, 'FROM APP');
        ContxAuth.authenticate(token, email.name, email);
      }
      return;
    }

    getToken();
  }, []);

  return (
    <NavigationContainer
      theme={scheme === 'dark' ? DarkTheme : DefaultTheme}
      onReady={() => SplashScreen.hide()}>
      {ContxAuth.isTokenValide ? <DrawerNav /> : <AuthStack />}
    </NavigationContainer>
  );
}
// onReady={() => RNBootSplash.hide()} add in NavigationContainer for splash
