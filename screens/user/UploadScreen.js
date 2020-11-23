import React from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import LottieView from 'lottie-react-native';
import * as Progress from 'react-native-progress';

import colors from '../../constants/colors';

const UploadScreen = ({ onDone, progress = 0, visible = false }) => {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        {progress < 100 ? (
          <Progress.Bar
            color={colors.primary}
            progress={progress / 100}
            width={200}
          />
        ) : (
          <LottieView
            autoPlay
            loop={false}
            onAnimationFinish={onDone}
            style={styles.animation}
            source={require('../../assets/animation/animation.json')}
          />
        )}
      </View>
    </Modal>
  );
};

export default UploadScreen;

const styles = StyleSheet.create({
  animation: {
    width: 150,
    height: 150,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
