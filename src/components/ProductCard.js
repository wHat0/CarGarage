import {useTheme} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import {
  Image,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import colors from '../config/colors';
import useOrientation from '../config/useOrientation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {FavContext} from '../../store/context/fav-context';

function ProductBox({
  onPress,
  itemtittle,
  imageUrl,
  price,
  id,
  range,
  location,
  date,
}) {
  // const {colors} = useTheme();

  const orientation = useOrientation();
  const ScreenHeight = orientation.height;
  const ScreenWidth = orientation.width;

  const favMealCntx = useContext(FavContext);
  const fav = favMealCntx.ids;

  const isMealFav = fav.includes(id);

  const scheme = useColorScheme() === 'dark' ? 'dark' : false;

  FavPress;

  function FavPress() {
    console.log('called me', id);
    if (isMealFav) {
      favMealCntx.removeFav(id);
    } else {
      favMealCntx.addFav(id);
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.DataContainer,
          scheme && {
            borderColor: colors.text,
            borderWidth: 0.1,
            borderBottomWidth: 0.5,
          },
          {
            width: ScreenWidth / 2.2,
            height: ScreenHeight * 0.32,
            overflow: 'hidden',
          },
        ]}>
        <Image
          source={{uri: imageUrl}}
          style={{
            width: '100%',
            height: '50%',
            // alignSelf: 'center',
          }}
        />
        <View
          style={{
            width: 35,
            height: 35,
            borderRadius: 17,
            position: 'absolute',
            right: 5,
            top: 5,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            // alignSelf: 'flex-end',
          }}>
          <Icon
            name="favorite"
            size={22}
            color={isMealFav ? 'red' : 'black'}
            onPress={() => FavPress()}
          />
        </View>

        <Text
          style={[
            styles.imagetittle,
            {
              paddingTop: 8,
              color: colors.text,
              paddingVertical: 5,
              fontSize: ScreenWidth * 0.037,
            },
          ]}>
          {itemtittle}
        </Text>
        <Text
          style={[
            styles.imagetittle,
            {color: colors.text, fontSize: ScreenWidth * 0.048},
          ]}>
          Rs{price}
        </Text>
        <Text
          style={[
            styles.imagetittle,
            {color: colors.text, fontSize: ScreenWidth * 0.03},
          ]}>
          {range}
        </Text>
        <View
          style={{
            width: '80%',
            alignItems: 'center',
            paddingTop: 5,
            flexDirection: 'row',
          }}>
          <Text
            style={[
              styles.imagetittle,
              {color: colors.text, fontSize: ScreenWidth * 0.028},
            ]}>
            {location}
          </Text>
          <Text
            style={[
              styles.imagetittle,
              {color: colors.text, fontSize: ScreenWidth * 0.025},
            ]}>
            {}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default ProductBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // paddingTop: '10%',

    paddingBottom: 20,
  },
  DataContainer: {
    elevation: 3,
    borderRadius: 8,
    borderBottomWidth: 0.1,
    shadowColor: 'black',
    backgroundColor: 'white',
    shadowOpacity: 0.5,
    justifyContent: 'flex-start',
    shadowRadius: 5,
  },
  imagetittle: {
    color: 'black',
    fontWeight: 'bold',
    padding: 2,
  },
});
