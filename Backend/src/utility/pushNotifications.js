const { Expo } = require('expo-server-sdk');

module.exports = async (name, targetExpoPushToken, message) => {
  const expo = new Expo();
  const chunks = expo.chunkPushNotifications([
    {
      to: targetExpoPushToken,
      sound: 'default',
      body: `${name} says:${message}`,
    },
  ]);
  const sendChunks = async () => {
    chunks.forEach(async chunk => {
      try {
        const tickets = await expo.sendPushNotificationsAsync(chunk);
      } catch (error) {
        console.log(error);
      }
    });
  };
  /*   const checkNotification = async () => {
    let receiptIdChunks = expo.chunkPushNotificationReceiptIds(
      targetExpoPushToken
    );
  }; */

  /*  await checkNotification(); */
  await sendChunks();
};
