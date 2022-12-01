import {Alert} from 'react-native';
import axios from 'axios';

export const LINK = `http://192.168.171.253:5000/api/products`;

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
