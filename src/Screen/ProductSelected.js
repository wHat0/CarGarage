import React, {useContext, useLayoutEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

import call from 'react-native-phone-call';
import {FavContext} from '../../store/context/fav-context';

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 350;

const ProductSelected = ({route, navigation}) => {
  const [Display, setDisplay] = useState(false);
  const itemData = route.params.data;
  const seler = itemData.seller;
  const phone = seler.phoneNo.mobile;

  const args = {
    number: `${phone}`, // String value with the number to call
    prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call
    skipCanOpen: true, // Skip the canOpenURL check
  };

  const navTitleView = useRef(null);

  const favMealCntx = useContext(FavContext);
  const fav = favMealCntx.ids;
  const Id = itemData._id;

  const isMealFav = fav.includes(itemData._id);
  // console.log(isMealFav);

  function Rightheader() {
    console.log('called me', Id);
    if (isMealFav) {
      favMealCntx.removeFav(Id);
    } else {
      favMealCntx.addFav(Id);
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <View
            style={{
              flexDirection: 'row',
              padding: 15,
              backgroundColor: 'black',
              borderBottomLeftRadius: 15,
              justifyContent: 'center',
            }}>
            <Icon
              name={isMealFav ? 'heart' : 'heart'}
              color={isMealFav ? 'red' : 'white'}
              size={25}
              onPress={() => Rightheader()}
            />
          </View>
        );
      },
    });
  }, [navigation, Rightheader]);

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{uri: itemData.images}}
        style={styles.image}
        resizeMode={'contain'}
      />
      <View
        style={styles.section}
        onHide={() => navTitleView.current.fadeInUp(200)}
        onDisplay={() => navTitleView.current.fadeOut(100)}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.title}>{itemData.name}</Text>
          <Text style={styles.title}>
            {itemData.Cost.price}
            <Text style={{fontSize: 14}}>Rs</Text>
          </Text>
        </View>
      </View>
      <View style={[styles.section, styles.sectionLarge]}>
        <Text style={styles.sectionContent}>{itemData.description}</Text>
      </View>
      {Display && (
        <View style={[styles.section, {paddingBottom: '5%'}]}>
          <Text style={{color: 'grey'}}>
            Name:{' '}
            <Text style={{color: 'black'}}>{`${seler.sellername}\n`}</Text>
          </Text>
          <Text style={{color: 'grey'}}>
            SellerAddress:{' '}
            <Text style={{color: 'black'}}>{`${seler.selleraddress}\n`}</Text>
          </Text>
          <Text style={{color: 'grey'}}>
            Email:{' '}
            <Text style={{color: 'black'}}>{`${seler.selleremail}\n`}</Text>
          </Text>
        </View>
      )}
      <View style={styles.Icsection}>
        <Icon
          name="phone"
          color={'#FF6347'}
          style={{marginRight: 160}}
          size={40}
          onPress={() => {
            call(args).catch(console.error), console.log('Number pressed');
          }}
        />
        <Icon
          name="map"
          color={'#FF6347'}
          size={40}
          onPress={() => setDisplay(!Display)}
        />
      </View>
    </ScrollView>
  );
};

export default ProductSelected;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: MAX_HEIGHT,
    width: Dimensions.get('window').width,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
    alignContent: 'center',
    color: 'black',
  },
  Icsection: {
    padding: 20,
    justifyContent: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    borderBottomColor: '#cccccc',
    backgroundColor: 'white',
    alignContent: 'center',
    color: 'black',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  sectionContent: {
    fontSize: 16,
    textAlign: 'justify',
    color: 'black',
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  categoryContainer: {
    flexDirection: 'row',
    backgroundColor: '#FF6347',
    borderRadius: 20,
    margin: 10,
    padding: 10,
    paddingHorizontal: 15,
  },
  category: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 10,
  },
  titleContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 24,
  },
  navTitleView: {
    height: MIN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 40 : 5,
    opacity: 0,
  },
  navTitle: {
    color: 'white',
    fontSize: 18,
    backgroundColor: 'transparent',
  },
  sectionLarge: {
    minHeight: 250,
  },
});
