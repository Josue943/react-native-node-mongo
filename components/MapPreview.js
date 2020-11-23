import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';

import ENV from '../env';

const MapPreview = ({ location, style, children }) => {
  let imgPreview;
  if (location) {
    console.log(ENV);
    const { lat, lng } = location;
    imgPreview = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${lat},${lng}&key=${ENV.googleApiKey}`;
  }
  return (
    <TouchableOpacity style={{ ...styles.container, ...style }}>
      {location ? (
        <Image source={{ uri: imgPreview }} style={styles.img} />
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

export default MapPreview;

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  img: { width: '100%', height: '100%' },
});
