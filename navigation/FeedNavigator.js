import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import defaultNavOptions from './DefaultNavOptions';
import FeedScreen from '../screens/app/FeedScreen';
import ProductDetailsScreen from '../screens/app/ProductDetailsScreen';

const Stack = createStackNavigator();
const FeedNavigator = () => (
  <Stack.Navigator screenOptions={{ ...defaultNavOptions, headerShown: false }}>
    <Stack.Screen name='Feed' component={FeedScreen} />
    <Stack.Screen name='ProductDetails' component={ProductDetailsScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
