import {Alert} from 'react-native';
import axios from 'axios';

const LINK = `http://192.168.12.252:5000/api/products`;

// get	/api/products				get products
// post	/api/products				create product
// /api/products/:id

export async function showPost() {
  const response = await axios
    .get(LINK)
    .catch(err => Alert.alert('error', `${err}`));
  const dataRes = response.data;
  return dataRes.products;
}

export async function showPostByID(id) {
  const response = await axios
    .get(`LINK/${id}`)
    .catch(err => Alert.alert('error', `${err}`));
  const dataRes = response.data;
  return dataRes.products;
}
