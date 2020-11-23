import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';

import colors from '../constants/colors';
import { CustomText } from '../components/ui';

const OfflineNotice = () => {
  const netInfo = useNetInfo();
  //solo se muestra si no hay internet
  if (netInfo.type !== 'unknown' && netInfo.isInternetReachable === false)
    return (
      <View style={styles.container}>
        <CustomText style={styles.text}> No Internet Connection</CustomText>
      </View>
    );
  return null;
};

export default OfflineNotice;
//zindex no sirve en android hay que usar elevacion
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    elevation: 3,
    height: 50,
    justifyContent: 'center',
    position: 'absolute',
    top: Constants.statusBarHeight,
    width: '100%',
    zIndex: 1,
  },
  text: { color: 'white' },
});
