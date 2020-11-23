import colors from '../constants/colors';
import { Platform } from 'react-native';
import { CardStyleInterpolators } from '@react-navigation/stack';
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

export default {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? colors.primary : '',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerTitleAlign: 'center',
  headerTintColor: Platform.OS === 'android' ? 'white' : colors.primary,
  gestureDirection: 'horizontal',
  gestureEnabled: true,
  transitionSpec: {
    open: config,
    close: config,
  },
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};
