import React, { useState, useCallback, useEffect } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { Form } from '../../components/form';
import { HeaderButton } from '../../components/ui';
import { updateProfile } from '../../store/actions/auth';
import routes from '../../navigation/routes';

const UpdateProfileScreen = ({ updateProfile, user, navigation }) => {
  const [pickedImage, setPickedImage] = useState();

  const onSubmit = useCallback(() => {
    if (!pickedImage) {
      Alert.alert('Error', 'Select an Image', [{ text: 'Okay' }]);
      return;
    }
    updateProfile(pickedImage);
    navigation.navigate(routes.ACCOUNT);
  }, [pickedImage]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item title='save' iconName='ios-save' onPress={onSubmit} />
        </HeaderButtons>
      ),
    });
  }, [onSubmit]);

  return <Form></Form>;
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { updateProfile })(UpdateProfileScreen);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { fontFamily: 'open-sans-bold' },
  imgContainer: {
    height: 100,
    width: 100,
    overflow: 'hidden',
    borderRadius: 50,
    marginVertical: 10,
    alignSelf: 'center',
  },
  img: { height: '100%', width: '100%' },
  button: { width: 200 },
});
