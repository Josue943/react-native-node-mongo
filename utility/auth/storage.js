import * as SecureStore from 'expo-secure-store';
import { setHeaders } from '../../config/axios';

const key = 'token';

const storeToken = async authToken => {
  try {
    await SecureStore.setItemAsync(key, authToken);
    setHeaders(authToken);
  } catch (error) {}
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {}
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
    setHeaders();
  } catch (error) {}
};

export default {
  storeToken,
  getToken,
  removeToken,
};
