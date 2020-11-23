import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export default UseLocation = () => {
  const [location, setLocation] = useState({});
  const getLocation = async () => {
    try {
      const { granted } = await Location.requestPermissionsAsync();
      if (!granted) return;
      //por razones de rendimiento tomamos esta
      const {
        coords: { latitude, longitude },
      } = await Location.getLastKnownPositionAsync();
    } catch (error) {}
  };

  useEffect(() => {
    getLocation();
  }, []);
  return location;
};
