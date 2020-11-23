import React from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const icon = ({ icon, size = 38, backgroundColor, iconColor = '#fff' }) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor,
      }}
    >
      <MaterialCommunityIcons name={icon} size={size * 0.5} color={iconColor} />
    </View>
  );
};

export default icon;
