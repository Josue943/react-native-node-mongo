import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Modal,
  Button,
  FlatList,
} from 'react-native';
import { useFormikContext } from 'formik';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { CustomText } from '../ui';
import ErrorMessage from './ErrorMessage';

const FormPicker = ({
  items,
  name,
  placeholder,
  PickerItemComponent,
  icon,
}) => {
  const { errors, values, setFieldValue, touched } = useFormikContext();
  const [visible, setVisible] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setVisible(true)}>
        <View>
          <View style={styles.container}>
            {icon && (
              <MaterialCommunityIcons
                style={styles.icon}
                name={icon}
                size={20}
                color='gray'
              />
            )}
            <CustomText style={styles.placeholder}>
              {values[name] ? values[name].label : placeholder}
            </CustomText>
            <MaterialCommunityIcons
              name='chevron-down'
              size={20}
              color='grey'
              style={styles.icon}
            />
          </View>
          {errors[name] && touched[name] && (
            <ErrorMessage error={errors[name]} />
          )}
        </View>
      </TouchableWithoutFeedback>

      <Modal visible={visible} animationType='fade'>
        <View style={styles.buttonContainer}>
          <Button title='Close' color='red' onPress={setVisible.bind(false)} />
        </View>
        <FlatList
          data={items}
          keyExtractor={item => item.value.toString()}
          numColumns={3}
          renderItem={({ item }) => (
            <PickerItemComponent
              item={item}
              onPress={() => {
                setVisible(false);
                setFieldValue(name, item);
              }}
            />
          )}
        />
      </Modal>
    </>
  );
};

export default FormPicker;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 8,
  },
  placeholder: { paddingLeft: 8, flex: 1, color: 'gray' },
  buttonContainer: { width: 100, alignSelf: 'center', marginBottom: 10 },
});
