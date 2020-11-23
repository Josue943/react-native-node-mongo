import React from 'react';
import { StyleSheet, View, ImageBackground, Image } from 'react-native';

import { CustomButton, CustomText } from '../../components/ui';
import routes from '../../navigation/routes';

const StartupScreen = ({ navigation }) => {
  return (
    <ImageBackground
      style={styles.image}
      source={require('../../assets/background.jpg')}
    >
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/icon.png')} style={styles.icon} />
        <CustomText style={styles.text}>Sell What You Don't Need</CustomText>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          title='Login'
          onPress={() => navigation.navigate(routes.AUTH)}
        />
        <CustomButton
          title='Register'
          onPress={() => navigation.navigate(routes.AUTH, { login: false })}
        />
      </View>
    </ImageBackground>
  );
};

export default StartupScreen;

const styles = StyleSheet.create({
  image: { flex: 1, justifyContent: 'space-between' },
  logoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  text: { fontFamily: 'open-sans-bold' },
  icon: { width: 50, height: 50, margin: 20 },
  buttonContainer: { padding: 10 },
});
