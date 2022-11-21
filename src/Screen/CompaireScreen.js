import React, {useContext, useLayoutEffect, useRef, useState} from 'react';

import {
  Platform,
  StyleSheet,
  Dimensions,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';

import call from 'react-native-phone-call';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../config/colors';

const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 350;

export default function CompaireScreen() {
  const image =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC5pz81wu9MSEjLVrImHhAZgxsQZFczs7KOWwYNEFa5A&s';
  const title = 'RANA';
  const price = 2556;
  const description = '2556';
  const Sellername = 'RANA';
  const address = 'Lahore';
  const contact = '033356897952';
  const email = 'email@mail.com';
  const [Display, setDisplay] = useState(true);

  const image2 =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtQ6FWpWzmN1KsoiftNDF9ADhvMtml9XOH1J8mMaBiMh13mgXSPjXJMp220Q8eiqeodM0&usqp=CAU';
  ('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3Rb4Y29bqoTJ20apIf42_h4pHBU2mB847r0a_A2bnZQ&s');
  const title2 = 'RANA';
  const price2 = 2556;
  const description2 = '2556';
  const Sellername2 = 'RANA';
  const address2 = 'Lahore';
  const email2 = 'email@mail.com';
  const contact2 = '042868952';
  const [Display2, setDisplay2] = useState(true);

  const args = {
    number: `${contact}`, // String value with the number to call
    prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call
    skipCanOpen: true, // Skip the canOpenURL check
  };
  const args2 = {
    number: `${contact2}`, // String value with the number to call
    prompt: true, // Optional boolean property. Determines if the user should be prompted prior to the call
    skipCanOpen: true, // Skip the canOpenURL check
  };

  return (
    <View
      style={{flex: 1, flexDirection: 'row', backgroundColor: colors.primary}}>
      {/* <ScrollView
        style={{flex: 1, marginRight: 6}}
        contentContainerStyle={{flex: 1}}> */}
      <View style={[styles.container, {marginRight: 6}]}>
        <Image
          source={{uri: image}}
          style={styles.image}
          resizeMode={'contain'}
        />
        <ScrollView>
          <View style={styles.section}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.title}>
                {price}
                <Text style={{fontSize: 14}}>Rs</Text>
              </Text>
            </View>
          </View>
          <View style={[styles.section, styles.sectionLarge]}>
            <Text style={styles.sectionContent}>{description}</Text>
          </View>
          {Display && (
            <View style={[styles.section, {paddingBottom: '5%'}]}>
              <Text style={{color: 'grey'}}>
                Name: <Text style={{color: 'black'}}>{`${Sellername}\n`}</Text>
              </Text>
              <Text style={{color: 'grey'}}>
                SellerAddress:{' '}
                <Text style={{color: 'black'}}>{`${address}\n`}</Text>
              </Text>
              <Text style={{color: 'grey'}}>
                Email: <Text style={{color: 'black'}}>{`${email}\n`}</Text>
              </Text>
            </View>
          )}
        </ScrollView>
        <View style={styles.Icsection}>
          <Icon
            name="phone"
            color={'#FF6347'}
            //   style={{marginRight: 160}}
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
      </View>
      {/* </ScrollView> */}
      {/* ------------------------------SECONG SCREEN------------------------------------------------- */}
      <View style={{flex: 1}}>
        <Image
          source={{uri: image2}}
          style={styles.image}
          resizeMode={'contain'}
        />

        <ScrollView>
          <View style={styles.section}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.title}>{title2}</Text>
              <Text style={styles.title}>
                {price2}
                <Text style={{fontSize: 14}}>Rs</Text>
              </Text>
            </View>
          </View>
          <View style={[styles.section, styles.sectionLarge]}>
            <Text style={styles.sectionContent}>{description2}</Text>
          </View>
          {Display2 && (
            <View style={[styles.section, {paddingBottom: '5%'}]}>
              <Text style={{color: 'grey'}}>
                Name: <Text style={{color: 'black'}}>{`${Sellername2}\n`}</Text>
              </Text>
              <Text style={{color: 'grey'}}>
                SellerAddress:{' '}
                <Text style={{color: 'black'}}>{`${address2}\n`}</Text>
              </Text>
              <Text style={{color: 'grey'}}>
                Email: <Text style={{color: 'black'}}>{`${email2}\n`}</Text>
              </Text>
            </View>
          )}
        </ScrollView>

        <View style={styles.Icsection}>
          <Icon
            name="phone"
            color={'#FF6347'}
            size={40}
            onPress={() => {
              call(args2).catch(console.error), console.log('Number pressed');
            }}
          />
          <Icon
            name="map"
            color={'#FF6347'}
            size={40}
            onPress={() => setDisplay2(!Display2)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: '40%',
    width: '100%',
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
    justifyContent: 'space-between',
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
