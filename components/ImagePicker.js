import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useFormikContext } from 'formik';

import { ErrorMessage } from './form';
import ImageInputList from './ImageInputList';

const ImagePicker = () => {
  const { setFieldValue, values, errors } = useFormikContext();
  const imagesUris = values.images;

  const handleAdd = uri => {
    setFieldValue('images', [...imagesUris, uri]);
  };

  const handleRemove = uri => {
    setFieldValue(
      'images',
      imagesUris.filter(i => i !== uri)
    );
  };

  return (
    <>
      <View style={styles.container}>
        <ImageInputList
          imageUris={imagesUris}
          onAddImage={handleAdd}
          onRemoveImage={handleRemove}
        />
      </View>
      {errors.images && <ErrorMessage error={errors['images']} />}
    </>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 15,
  },
});
