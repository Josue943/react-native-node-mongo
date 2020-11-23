import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { useFormikContext } from 'formik';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ErrorMessage from './ErrorMessage';
import colors from '../../constants/colors';

const Input = ({ name, icon, placeholder, ...rest }) => {
  const {
    setFieldTouched,
    setFieldValue,
    errors,
    touched,
    values,
  } = useFormikContext();
  //lo de blur se pone para poner error si ya lo toco
  return (
    <>
      <View style={styles.form}>
        <MaterialCommunityIcons name={icon} size={16} color='gray' />
        <TextInput
          onBlur={() => setFieldTouched(name)}
          onChangeText={text => setFieldValue(name, text)}
          style={styles.input}
          placeholder={placeholder}
          value={values[name]}
          {...rest}
        />
      </View>
      {errors[name] && touched[name] && <ErrorMessage error={errors[name]} />}
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  form: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginLeft: 10,
    fontSize: 14,
    fontFamily: 'open-sans',
  },
});
