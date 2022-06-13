import AsyncStorage from '@react-native-async-storage/async-storage';

const key = 'user';
const storeUser = async (user) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(user));
  } catch (e) {
    console.log(e);
  }
};

const getUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

const removeUser = async () => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};

export default {
  storeUser,
  getUser,
  removeUser,
};
