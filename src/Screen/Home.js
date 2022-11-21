import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import ProductBox from '../components/ProductCard';
import {showPost} from '../../util/http';

export default function Home({navigation}) {
  const [Data, SetData] = useState();
  useEffect(() => {
    async function GetData() {
      const APIDATA = await showPost();
      SetData(prev => (prev = APIDATA));
    }
    GetData();
  }, []);

  function ProductRender({item}) {
    // console.log(item);
    const Price = item?.Cost.price;
    const neg = item?.Cost.negotiable;
    const image = item?.images;
    const sellerAdress = item?.seller.selleraddress;
    const date = item?.createdAt;

    return (
      <ProductBox
        id={item._id}
        itemtittle={item.name}
        imageUrl={image}
        price={Price}
        range={'2018-57,775km'}
        location={sellerAdress}
        date={date}
        onPress={() => navigation.navigate('ProductDetails', {data: item})}
      />
    );
  }
  return (
    <View
      style={{
        backgroundColor: 'white',
        // paddingTop: '10%',
        // justifyContent: 'center',
        // alignItems: 'center',
      }}>
      <View
        style={{
          paddingTop: '20%',
        }}>
        <FlatList
          data={Data}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={ProductRender}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
