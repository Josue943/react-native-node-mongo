import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native';

import { CustomText } from '../ui';
import Icon from '../Icon';

const CategoryPicker = ({
  item: { backgroundColor, icon, label },
  onPress,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Icon backgroundColor={backgroundColor} icon={icon} size={80} />
        <CustomText style={styles.text}>{label}</CustomText>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CategoryPicker;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignItems: 'center',
    width: '33%',
  },
  text: { marginTop: 5, textAlign: 'center' },
});
