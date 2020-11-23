import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AuthScreen from '../screens/start/AuthScreen';
import defaultNavOptions from './DefaultNavOptions';
import StartupScreen from '../screens/start/StartupScreen';

const Stack = createStackNavigator();
const StartNavigator = () => (
  <Stack.Navigator screenOptions={{ ...defaultNavOptions }}>
    <Stack.Screen
      name='Start'
      component={StartupScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name='Auth' component={AuthScreen} />
  </Stack.Navigator>
);

export default StartNavigator;
