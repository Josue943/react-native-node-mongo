import React from 'react';
import LottieView from 'lottie-react-native';
import { View, StyleSheet } from 'react-native';

const Spinner = ({ visible = true }) => {
  if (!visible) return null;
  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        loop
        source={require('../assets/animation/spinner.json')}
      />
    </View>
  );
};

export default Spinner;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'white',
    height: '100%',
    opacity: 0.8,
    width: '100%',
    zIndex: 1,
  },
});
