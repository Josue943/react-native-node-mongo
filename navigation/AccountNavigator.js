import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from '../screens/user/AccountScreen';
import defaultNavOptions from './DefaultNavOptions';
import MessagesScreen from '../screens/user/MessagesScreen';
import PickLocationScreen from '../screens/user/PickLocationScreen';
import UpdateProfileScreen from '../screens/user/UpdateProfileScreen';
import MyListingsScreen from '../screens/user/MyListingsScreen';

const Stack = createStackNavigator();
export default () => (
  <Stack.Navigator screenOptions={defaultNavOptions}>
    <Stack.Screen
      name='Account'
      component={AccountScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen name='Messages' component={MessagesScreen} />
    <Stack.Screen name='My Listing' component={MyListingsScreen} />
    <Stack.Screen name='Update Profile' component={UpdateProfileScreen} />
    <Stack.Screen name='Pick Location' component={PickLocationScreen} />
  </Stack.Navigator>
);
