import React from 'react';
import { StyleSheet, View, Image, TouchableHighlight } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import CustomText from './CustomText';

const ListItem = ({
  title,
  subtitle,
  image,
  IconComponent,
  onPress,
  renderRightActions,
  arrow = false,
}) => {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight
        onPress={onPress}
        underlayColor='#fff'
        activeOpacity={0.8}
      >
        <View style={styles.container}>
          {IconComponent}
          {image && <Image style={styles.image} source={image} />}
          <View style={styles.details}>
            <CustomText style={styles.mainText}>{title}</CustomText>
            {subtitle && <CustomText>{subtitle}</CustomText>}
          </View>
          {arrow && (
            <MaterialCommunityIcons
              name='chevron-right'
              style={styles.icon}
              size={25}
            />
          )}
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  image: { width: 50, height: 50, borderRadius: 25 },
  details: { flex: 1, marginLeft: 10, justifyContent: 'center' },
  mainText: {
    fontFamily: 'open-sans-bold',
    textTransform: 'capitalize',
  },
  icon: { alignSelf: 'center' },
});
