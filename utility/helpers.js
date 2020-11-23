export const verifyAvatar = avatar => {
  if (!avatar) return require('../assets/profile.jpg');
  return { uri: `data:image/gif;base64,${avatar}` };
};
