import { GET_MESSAGES, DELETE_MESSAGE } from '../actions/messages';

const initialState = {
  messages: [],
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_MESSAGES:
      return {
        messages: payload,
      };

    case DELETE_MESSAGE:
      return {
        messages: state.messages.filter(m => m._id !== payload),
      };

    default:
      return state;
  }
};
