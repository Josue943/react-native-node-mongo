import Axios from 'axios';

export const axios = Axios.create({
  baseURL: 'http://192.168.100.30:5000/',
});

export const setHeaders = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
