import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { connect } from 'react-redux';

import { DefaultTheme } from '@react-navigation/native';
import OfflineNotice from '../components/OfflineNotice';
import { navigationRef } from './rootNavigation';
import StartNavigator from './StartNavigator';
import TabNavigator from './TabNavigator';

const AppNavigator = ({ isAuth }) => {
  return (
    <>
      <OfflineNotice />
      <NavigationContainer ref={navigationRef} theme={DefaultTheme}>
        {isAuth ? <TabNavigator /> : <StartNavigator />}
      </NavigationContainer>
    </>
  );
};

const mapStateToProps = state => ({
  isAuth: state.auth.token,
});

export default connect(mapStateToProps)(AppNavigator);
