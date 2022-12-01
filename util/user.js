import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const url = `http://192.168.171.253:5000/api/users`;

export async function LoginUser(email, password) {
  //RestAPI for Login And SignUp User
  console.log('FROMLOGIN', email, password);

  const response = await axios
    .post(url + '/login', {
      email: email,
      password: password,
    })
    .then(res => {
      return res.data;
    })
    .catch(e => console.log('error', e));

  return response;
}

export async function SignUpUser(input) {
  console.log(input, 'from url');
  const response = await axios
    .post(url, {
      email: input.email,
      password: input.password,
      name: input.Name,
      contact: input.phone,
      address: input.Address,
    })
    .then(res => console.log('Result', res.response.data))
    .catch(e => console.log('error', e.response.data));
  return response;
}
