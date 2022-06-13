import * as SecureStore from 'expo-secure-store';
import jwt_decode from 'jwt-decode';

const key = 'userToken';
const storeToken = async (token) => {
  try {
    const response = await SecureStore.setItemAsync(key, token);
    // console.log(response, 'response?');
  } catch (error) {
    console.log(error);
  }
};

const getUser = async () => {
  // console.log('get user from cache?');
  try {
    const token = await SecureStore.getItemAsync(key);
    if (!token) return null;
    const user = jwt_decode(token);
    return user;
  } catch (error) {
    console.log(error);
  }
};

const getToken = async () => {
  try {
    const response = await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log(error);
  }
};

const removeToken = async () => {
  try {
    const response = await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log(error);
  }
};

export default {
  storeToken,
  getToken,
  removeToken,
  getUser,
};
