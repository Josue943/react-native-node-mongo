import React, { useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  StyleSheet,
  Image,
  Alert,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as ImgPicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const PickPreview = ({ imageUri, onChangeImage }) => {
  //se ejecute apenas entre 1 vez
  useEffect(() => {
    verifyPermission();
  }, []);

  const verifyPermission = async () => {
    //tambien podriamos hacerlo asi
    //ImgPicker.requestCameraPermissionsAsync
    //si mandamos 2 solo va estar granted si  le dio a todos
    const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufient permissions!',
        'You need to grant camera permissions to use this app',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const onHandlePress = () => {
    if (!imageUri) onSelectImage();
    else
      Alert.alert('Delete', 'Are you sure you wanto to delete this picture', [
        //se hace pq si no se puede borrar del cel
        { text: 'Yes', onPress: () => onChangeImage(null) },
        { text: 'No' },
      ]);
  };

  const onSelectImage = async () => {
    try {
      const hasPermissions = await verifyPermission();
      if (!hasPermissions) return;
      let result = await ImgPicker.launchImageLibraryAsync({
        mediaTypes: ImgPicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled)
        //setFieldValue
        onChangeImage(result.uri);
    } catch (error) {
      Alert.alert('Error', 'Error reading the image', [{ text: 'Okay' }]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={onHandlePress}>
      <View style={styles.card}>
        {imageUri ? (
          <Image style={styles.img} source={{ uri: imageUri }} />
        ) : (
          <MaterialCommunityIcons
            style={styles.icon}
            name='camera'
            size={30}
            color='gray'
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PickPreview;

const styles = StyleSheet.create({
  card: {
    height: 100,
    width: 100,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
  },
  img: {
    height: '100%',
    width: '100%',
  },
  icon: {
    position: 'absolute',
    top: 30,
  },
});
