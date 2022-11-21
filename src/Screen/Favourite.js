import React, {useContext, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {FavContext} from '../../store/context/fav-context';
import {showPost} from '../../util/http';

import FavDetails from '../components/FavDetails';

function Favourite({navigation}) {
  // useContext
  const fav = useContext(FavContext).ids;
  console.log(fav);

  const [Data, setfav] = useState();
  const [favMealDetails, setItem] = useState();
  // Data.filter(pid => fav.includes(pid._id));

  //showing Data of ARRAY we have to FLATLIST the DAta
  // console.info(JSON.stringify(favMealDetails));

  useEffect(() => {
    async function GetData() {
      const APIDATA = await showPost();

      setItem(prev => (prev = APIDATA.filter(pid => fav.includes(pid._id))));
    }
    GetData();
  }, []);

  function renderItem(itemData) {
    const item = itemData.item;
    console.log(item);
    const ProductProp = {
      itemtittle: item.name,
      affordability: item.Cost.price,
      imageUrl: item.images,
      Phone: item.seller.phoneNo.mobile,
      duration: item.seller.selleraddress,
    };
    return <FavDetails {...ProductProp} onPress={() => DetailShow(item)} />;
  }

  const DetailShow = Detail => {
    navigation.navigate('ProductDetails', {data: Detail});
  };

  if (!favMealDetails) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: 'white', fontSize: 15}}>
          You have{' '}
          <Text style={{color: 'red', fontWeight: 'bold', fontSize: 18}}>
            No Favourites
          </Text>{' '}
          Right Now
        </Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <FlatList
        data={favMealDetails}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

export default Favourite;
