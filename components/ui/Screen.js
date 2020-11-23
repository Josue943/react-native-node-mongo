import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, SafeAreaView } from 'react-native';

const Screen = ({ children, style }) => {
  return (
    <SafeAreaView style={{ ...styles.screen, ...style }}>
      {children}
    </SafeAreaView>
  );
};

export default Screen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    padding: 20,
    backgroundColor: '#F6F2F4',
  },
});
