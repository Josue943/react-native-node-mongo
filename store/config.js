import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

import auth from './reducers/auth';
import products from './reducers/products';
import messages from './reducers/messages';

const rootReducer = combineReducers({
  auth,
  products,
  messages,
});
//  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
