import React from 'react';
import { StyleSheet } from 'react-native';

import colors from '../../constants/colors';
import { CustomText } from '../ui';

const ErrorMessage = ({ error }) => {
  return <CustomText style={styles.error}>{error}</CustomText>;
};

export default ErrorMessage;

const styles = StyleSheet.create({
  error: { color: colors.primary },
});
