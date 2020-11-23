import { LOGIN, LOGOUT, UPDATE_PROFILE } from '../actions/auth';

const initialState = {
  user: null,
  token: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
      return {
        user: payload.user,
        token: payload.token,
      };

    case UPDATE_PROFILE:
      return {
        ...state,
        user: payload,
      };

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};
