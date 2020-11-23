import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { connect } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';

import { HeaderButton } from '../../components/ui';
import { updateLocation, updateProfile } from '../../store/actions/auth';

const PickLocationScreen = ({ navigation, user, updateLocation }) => {
  const [pickedLocation, setPickedLocation] = useState();

  const mapRegion = {
    latitude: user.coordinates ? user.coordinates.latitude : 9.9333,
    longitude: user.coordinates ? user.coordinates.longitude : -84.0833,
    latitudeDelta: 0.922,
    longitudeDelta: 0.421,
  };

  const selectLocationHandler = event => {
    setPickedLocation({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });
  };

  let markerCoordinates = user.coordinates ? user.coordinates : undefined;

  if (pickedLocation) {
    markerCoordinates = pickedLocation;
  }

  const onSubmit = useCallback(() => {
    if (!pickedLocation) {
      Alert.alert('Error', 'Pick a location', [{ text: 'Okay' }]);
      return;
    }
    updateLocation(pickedLocation.latitude, pickedLocation.longitude);
    navigation.navigate('Account');
  }, [pickedLocation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item title='Checkmart' iconName='ios-save' onPress={onSubmit} />
        </HeaderButtons>
      ),
    });
  }, [onSubmit]);

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title='Picked Location' coordinate={markerCoordinates} />
      )}
    </MapView>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { updateLocation })(PickLocationScreen);

const styles = StyleSheet.create({
  map: { flex: 1 },
});
