import React from 'react';
import { StyleSheet, View } from 'react-native';

const ListItemSeparator = () => {
  return <View style={styles.separator} />;
};

export default ListItemSeparator;

const styles = StyleSheet.create({
  separator: { height: 15, width: '100%', backgroundColor: '#F6F2F4' },
});
