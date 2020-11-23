import { AsyncStorage } from 'react-native';
import moment from 'moment';

const store = async (key, value) => {
  try {
    const item = {
      value,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.log(error);
  }
};

const isExpired = item => {
  //si fue hace mas de 5 minutos ya expiro
  const now = moment(Date.now());
  const storedTime = moment(item.timestamp);
  return now.diff(storedTime, 'minutes') > 100;
};

const get = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    const item = JSON.parse(value);
    if (!item) return null;
    if (isExpired(item)) {
      console.log('dentro');
      await AsyncStorage.removeItem(key);
      return null;
    }
    return item.value;
  } catch (error) {}
};

export default {
  store,
  get,
};
