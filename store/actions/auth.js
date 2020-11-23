import { axios, setHeaders } from '../../config/axios';
import { Alert } from 'react-native';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const SET_ERROR = 'SET_ERROR';
import authStorage from '../../utility/auth/storage';

export const onLogin = (email, password) => {
  return async dispatch => {
    try {
      const { data } = await axios.post('users/login', {
        email: email,
        password: password,
      });
      dispatch({
        type: LOGIN,
        payload: {
          token: data.token,
          user: data.user,
        },
      });
      authStorage.storeToken(data.token);
    } catch (error) {
      throw new Error('');
    }
  };
};

export const signUp = (name, email, password) => {
  return async dispatch => {
    try {
      const { data } = await axios.post('users', {
        name,
        email,
        password,
      });
      dispatch({
        type: LOGIN,
        payload: {
          token: data.token,
          user: data.user,
        },
      });
      authStorage.storeToken(data.token);
    } catch (error) {
      Alert.alert('Unable To Connect', 'Invalid Data', [{ text: 'Okay' }]);
    }
  };
};

export const logout = () => {
  authStorage.removeToken();
  setHeaders();
  return {
    type: LOGOUT,
  };
};

export const updateLocation = (latitude, longitude) => {
  return async dispatch => {
    try {
      const { data } = await axios.patch('users/location', {
        latitude,
        longitude,
      });
      dispatch({
        type: UPDATE_PROFILE,
        payload: data.user,
      });
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Cannot update, please try again later', [
        { text: 'Okay' },
      ]);
    }
  };
};

export const loadUser = token => {
  return async dispatch => {
    try {
      const { data } = await axios.get('users/me');
      dispatch({
        type: LOGIN,
        payload: {
          token,
          user: data.user,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateProfile = img => {
  return async dispatch => {
    try {
      const form = new FormData();
      form.append('avatar', img);
      const { data } = await axios({
        method: 'patch',
        url: 'users/me',
        data: form,
      });
      dispatch({
        type: UPDATE_PROFILE,
        payload: data.user,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
