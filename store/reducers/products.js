import {
  GET_PRODUCT,
  GET_PRODUCTS,
  USER_PRODUCTS,
  CREATE_PRODUCT,
} from '../actions/products';

const initialState = {
  products: [],
  userProducts: [],
  selectedProduct: null,
};

export default (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case GET_PRODUCTS:
      return {
        products: payload,
        selectedProduct: null,
      };

    case USER_PRODUCTS:
      return {
        ...state,
        userProducts: payload,
      };

    case GET_PRODUCT:
      return {
        ...state,
        selectedProduct: payload,
      };

    case CREATE_PRODUCT:
      return {
        ...state,
        products: [payload, ...state.products],
      };

    default:
      return state;
  }
};
