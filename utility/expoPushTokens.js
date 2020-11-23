import { axios } from '../config/axios';

const register = pushToken =>
  axios.put('users/expoToken', { token: pushToken });

export default {
  register,
};
