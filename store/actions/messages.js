export const GET_MESSAGES = 'GET_MESSAGES';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';

import { axios } from '../../config/axios';
const endPoint = 'messages';

export const getMessages = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get(endPoint);
      dispatch({
        type: GET_MESSAGES,
        payload: data.messages,
      });
    } catch (error) {
      throw new Error('');
    }
  };
};

export const deleteMessage = id => {
  return async dispatch => {
    try {
      await axios.delete(`${endPoint}/${id}`);
      dispatch({
        type: DELETE_MESSAGE,
        payload: id,
      });
    } catch (error) {}
  };
};
