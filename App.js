import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Provider } from 'react-redux';
import { store } from './store/config';

import AppNavigator from './navigation/AppNavigator';
import authStorage from './utility/auth/storage';
import { loadUser } from './store/actions/auth';
import { setHeaders } from './config/axios';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const autoLogin = async () => {
    const token = await authStorage.getToken();
    if (token) {
      setHeaders(token);
      store.dispatch(loadUser(token));
    }
  };
  //cada vez que cambia
  const unsubscribe = store.subscribe(() => {
    console.log('State changed');
  });

  unsubscribe();

  const startApp = async () => {
    await Promise.all([autoLogin(), fetchFonts()]);
  };
  const [isReady, setisReady] = useState(false);
  if (!isReady) {
    return (
      <AppLoading
        startAsync={startApp}
        onFinish={() => {
          setisReady(true);
        }}
      />
    );
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
