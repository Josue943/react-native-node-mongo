import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image } from 'react-native';
import * as Yup from 'yup';

import { AppButton, Input, Form, ErrorMessage } from '../../components/form';
import { CustomButton, Screen } from '../../components/ui';
import { onLogin, signUp } from '../../store/actions/auth';
import useApi from '../../hooks/useApi';
import Spinner from '../../components/Spinner';

const initialState = {
  name: '',
  email: '',
  password: '',
};

const AuthScreen = ({ onLogin, route, navigation, signUp }) => {
  const [loginMode, setloginMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const { request } = useApi(onLogin);

  useEffect(() => {
    if (route.params) setloginMode(route.params.login);
  }, [route.params]);

  useEffect(() => {
    navigation.setOptions({ headerTitle: loginMode ? 'Login' : 'Register' });
  }, [loginMode]);

  const validationSchema = Yup.object().shape({
    name: !loginMode ? Yup.string().required().label('Name') : Yup.string(),
    email: Yup.string().email().required().label('Email'),
    password: Yup.string().required().label('Password'),
  });

  const onSubmit = (values, { resetForm }) => {
    // resetForm();
    /*  if (loginMode) {
      onLogin(values.email, values.password);
      setLoading(true);
      return;
    }
    signUp(values.name, values.email, values.password); */
    request(values.email, values.password);
  };

  return (
    <>
      <Spinner visible={loading} />
      <Screen style={styles.container}>
        <Form
          initialValues={initialState}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Image
            style={styles.icon}
            source={require('../../assets/icon.png')}
          />
          {!loginMode && (
            <Input
              icon='account'
              placeholder='Name'
              name='name'
              autoCapitalize='words'
              keyboardType='default'
            />
          )}
          <Input
            icon='email'
            placeholder='Email'
            name='email'
            autoCapitalize='none'
            keyboardType='email-address'
          />
          <Input
            icon='lock'
            placeholder='Password'
            name='password'
            secureTextEntry
          />
          <View style={styles.buttonContainer}>
            <AppButton title={loginMode ? 'Login' : 'Register'} />
            <CustomButton
              title={loginMode ? 'Register' : 'Login'}
              color='white'
              onPress={() => setloginMode(state => !state)}
            />
          </View>
        </Form>
      </Screen>
    </>
  );
};

export default connect(null, { onLogin, signUp })(AuthScreen);

const styles = StyleSheet.create({
  icon: { width: 50, height: 50, alignSelf: 'center', marginVertical: 30 },
  container: { padding: 25 },
  buttonContainer: { marginVertical: 20 },
});
