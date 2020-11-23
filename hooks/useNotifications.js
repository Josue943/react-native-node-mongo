import { useEffect } from 'react';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

import expoPushTokens from '../utility/expoPushTokens';

const useNotifications = notificationListener => {
  useEffect(() => {
    registerForPushNotifications();
    //si nos mandan el parametro nos pegamos a ese
    if (notificationListener) Notifications.addListener(notificationListener);
  }, []);

  const registerForPushNotifications = async () => {
    //permisos
    try {
      const { granted } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (!granted) return;
      //sacamos el token
      const token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      //lo guardamos
      expoPushTokens.register(token);
    } catch (error) {
      console.log(error);
    }
  };
};

export default useNotifications;
