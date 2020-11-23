import React, { useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import PickPreview from './PickPreview';

const ImageInputList = ({ imageUris = [], onAddImage, onRemoveImage }) => {
  //creamos la referencia
  const scrollview = useRef();
  //cuando cambie el tamaño se ejecutara oncontent size change
  //entonces con current llamamos la funcion
  return (
    <ScrollView
      ref={scrollview}
      horizontal
      onContentSizeChange={() => scrollview.current.scrollToEnd()}
    >
      <View style={styles.container}>
        {imageUris.map(uri => (
          <PickPreview
            imageUri={uri}
            key={uri}
            onChangeImage={() => onRemoveImage(uri)}
          />
        ))}
        <PickPreview onChangeImage={uri => onAddImage(uri)} />
      </View>
    </ScrollView>
  );
};

export default ImageInputList;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
});
