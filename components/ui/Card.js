import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';

import CustomText from './CustomText';

const Card = ({ title, subtitle, image, onPress, style }) => {
  return (
    <View style={{ ...styles.card, ...style }}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <Image
          style={styles.image}
          source={{ uri: `data:image/jpeg;base64,${image}` }}
        />
      </TouchableOpacity>
      <View style={styles.details}>
        <View style={styles.info}>
          <CustomText style={styles.bold}>{title}</CustomText>
          <CustomText style={styles.price}>{subtitle}</CustomText>
        </View>
        <View style={styles.buttonContainer}>
          <Button title='Mark as Sold' color='red' />
        </View>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  image: {
    height: 200,
    width: '100%',
  },
  details: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  bold: {
    fontFamily: 'open-sans-bold',
  },
  info: {
    flex: 1,
  },
  buttonContainer: {
    flexBasis: 130,
  },
  price: { color: '#6FB8D7', fontFamily: 'open-sans-bold' },
});
