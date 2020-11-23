import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import colors from '../../constants/colors';
import CustomText from './CustomText';

const CustomButton = ({ title, onPress, color }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.button,
        backgroundColor: color ? color : colors.primary,
      }}
      activeOpacity={0.8}
    >
      <CustomText style={{ ...styles.text, color: color ? 'black' : 'white' }}>
        {title}
      </CustomText>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: { borderRadius: 25, padding: 10, marginVertical: 10 },
  text: { textAlign: 'center', fontFamily: 'open-sans-bold' },
});
