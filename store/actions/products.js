export const GET_PRODUCTS = 'GET_PRODUCTS';
export const USER_PRODUCTS = 'USER_PRODUCTS';
export const GET_PRODUCT = 'GET_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const SET_ERROR = 'SET_ERROR';

import { axios } from '../../config/axios';
import cache from '../../utility/cache';

const endPoint = 'products';

export const getProduct = id => {
  return async dispatch => {
    try {
      const { data } = await axios.get('products/' + id);
      dispatch({
        type: GET_PRODUCT,
        payload: data.product,
      });
    } catch (error) {}
  };
};

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get(endPoint);
      cache.store(endPoint, data);
      //const res = await cache.get(endPoint);
      console.log(data.products);
      dispatch({
        type: GET_PRODUCTS,
        payload: data.products,
      });
    } catch (error) {
      dispatch({
        type: SET_ERROR,
      });
    }
  };
};

export const createProduct = ({
  category,
  description,
  images,
  title,
  price,
}) => {
  return async dispatch => {
    try {
      //al mandar esto el ya sabe que es multipart/form-data
      const form = new FormData();
      //por default debe ir uri o no sirve
      images.forEach((image, i) => {
        form.append('images', {
          name: 'image' + i,
          type: 'image/jpeg',
          uri: image,
        });
      });

      form.append(
        'product',
        JSON.stringify({ description, title, price, category: category.value })
      );
      const res = await axios({
        method: 'post',
        url: endPoint,
        data: form,
      });
      console.log(res);
      //ver progreso
      /*  onUploadProgress: progress => console.log(progress), */
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserProducts = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get(endPoint + '/me');
      dispatch({
        type: USER_PRODUCTS,
        payload: data.products,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
