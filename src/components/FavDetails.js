import React from 'react';
import {Image, Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function FavDetails({onPress, itemtittle, affordability, imageUrl, Phone}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.MealContainer}>
        <Image
          source={{uri: imageUrl}}
          style={{width: '100%', height: 200, borderRadius: 8}}
        />
        <Text style={styles.imagetittle}>{itemtittle}</Text>
        <Text style={{color: 'white', fontSize: 15}}>Rs.{affordability}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icon name="phone" color={'white'} size={15} />
          <Text style={{color: 'white', fontSize: 15, paddingHorizontal: 10}}>
            {Phone}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default FavDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  MealContainer: {
    borderWidth: 1,
    borderRadius: 8,
    width: '90%',
    borderColor: 'white',
    alignItems: 'center',
    padding: 7,
    justifyContent: 'center',
    elevation: 4,
  },
  imagetittle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
