import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AccountNavigator from './AccountNavigator';
import colors from '../constants/colors';
import FeedNavigator from './FeedNavigator';
import NewListingScreen from '../screens/user/NewListingScreen';
import NewListingButton from './NewListingButton';
import routes from './routes';
import useNotifications from '../hooks/useNotifications';

const Stack = createBottomTabNavigator();
const TabNavigator = () => {
  useNotifications();
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ size, color }) => {
          let iconName;
          if (route.name === 'Feed') {
            iconName = 'home';
          } else if (route.name === 'Account') {
            iconName = 'account';
          }
          return (
            <MaterialCommunityIcons name={iconName} color={color} size={size} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.primary,
        inactiveTintColor: 'gray',
        labelStyle: {
          fontFamily: 'open-sans-bold',
        },
      }}
    >
      <Stack.Screen name='Feed' component={FeedNavigator} />
      <Stack.Screen
        name='New Listing'
        component={NewListingScreen}
        options={({ navigation }) => ({
          tabBarVisible: false,
          tabBarButton: () => (
            <NewListingButton
              onPress={() => navigation.navigate(routes.NEW_LISTING)}
            />
          ),
          tabBarLabel: () => null,
        })}
      />
      <Stack.Screen name='Account' component={AccountNavigator} />
    </Stack.Navigator>
  );
};

export default TabNavigator;
