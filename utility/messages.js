import { axios } from '../config/axios';

const send = async (message, userId, targetToken) => {
  await axios.post('messages', {
    message,
    userId,
    targetToken,
  });
};

export default {
  send,
};
