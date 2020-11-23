import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AccountScreen from '../screens/user/AccountScreen';
import AuthScreen from '../screens/start/AuthScreen';
import colors from '../constants/colors';
import NewListingScreen from '../screens/user/NewListingScreen';
import Icon from '../components/Icon';
import FeedScreen from '../screens/app/FeedScreen';
import MessagesScreen from '../screens/user/MessagesScreen';
import PickLocationScreen from '../screens/user/PickLocationScreen';
import ProductDetailsScreen from '../screens/app/ProductDetailsScreen';
import StartupScreen from '../screens/start/StartupScreen';
import UpdateProfileScreen from '../screens/user/UpdateProfileScreen';
import NewListingButton from './NewListingButton';
import icon from '../components/Icon';

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? colors.primary : '',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerTitleAlign: 'center',
  headerTintColor: Platform.OS === 'android' ? 'white' : colors.primary,
  gestureDirection: 'horizontal',
  gestureEnabled: true,
  transitionSpec: {
    open: config,
    close: config,
  },
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

//
const StartStackNavigator = createStackNavigator();
export const StartNavigator = () => (
  <StartStackNavigator.Navigator
    screenOptions={{ ...defaultNavOptions, headerShown: false }}
  >
    <StartStackNavigator.Screen name='Start' component={StartupScreen} />
    <StartStackNavigator.Screen name='Auth' component={AuthScreen} />
  </StartStackNavigator.Navigator>
);

//
const UserStackNavigator = createStackNavigator();
export const UserNavigator = () => (
  <UserStackNavigator.Navigator screenOptions={defaultNavOptions}>
    <UserStackNavigator.Screen
      name='Account'
      component={AccountScreen}
      options={{
        headerShown: false,
      }}
    />
    <UserStackNavigator.Screen name='Messages' component={MessagesScreen} />
    <UserStackNavigator.Screen
      name='Pick Location'
      component={PickLocationScreen}
    />
    <UserStackNavigator.Screen
      name='Update Profile'
      component={UpdateProfileScreen}
    />
  </UserStackNavigator.Navigator>
);

const ProductsStackNavigator = createStackNavigator();
export const ProductsNavigator = () => (
  <ProductsStackNavigator.Navigator
    screenOptions={{ ...defaultNavOptions, headerShown: false }}
    /*    mode='modal' */
  >
    <ProductsStackNavigator.Screen name='Feed' component={FeedScreen} />
    <ProductsStackNavigator.Screen
      name='ProductDetails'
      component={ProductDetailsScreen}
    />
  </ProductsStackNavigator.Navigator>
);

const ListingStackNavigator = createStackNavigator();
export const ListingNavigator = () => (
  <ListingStackNavigator.Navigator
    screenOptions={{ ...defaultNavOptions, headerTitleAlign: 'left' }}
  >
    <ListingStackNavigator.Screen
      name='New Listing'
      component={NewListingScreen}
    />
  </ListingStackNavigator.Navigator>
);

const TabNavigatorStack = createBottomTabNavigator();
export const TabNavigator = () => (
  <TabNavigatorStack.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Feed') {
          iconName = 'home';
        } else if (route.name === 'New Listing') {
          /*  return (
            <Icon
              icon='plus-circle'
              backgroundColor={colors.primary}
              size={size}
              iconColor={color}
            />
            
          ); */
          iconName = 'plus-circle';
        } else {
          iconName = 'account';
        }

        return (
          <MaterialCommunityIcons
            name={iconName}
            color={focused ? colors.primary : 'gray'}
            size={30}
          />
        );
      },
    })}
    tabBarOptions={
      {
        /*  activeTintColor: colors.primary,
      labelStyle: {
        fontFamily: 'open-sans-bold',
        marginTop: -5,
      },
      tabStyle: {
        marginTop: -5,
      }, */
      }
    }
  >
    <TabNavigatorStack.Screen name='Feed' component={ProductsNavigator} />
    <TabNavigatorStack.Screen
      name='New Listing'
      component={ListingNavigator}
      options={({ navigation }) => ({
        tabBarVisible: false,
        tabBarButton: () => (
          <NewListingButton
            onPress={() => navigation.navigate('New Listing')}
          />
        ),
        tabBarLabel: () => null,
      })}
    />
    <TabNavigatorStack.Screen name='Account' component={UserNavigator} />
  </TabNavigatorStack.Navigator>
);
