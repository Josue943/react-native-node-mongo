import React, { useState } from 'react';
import { Keyboard, StyleSheet, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import {
  AppButton,
  CategoryPickerItem,
  Input,
  FormPicker,
  Form,
} from '../../components/form';
import { CustomButton, Screen } from '../../components/ui';
import { createProduct } from '../../store/actions/products';
import { ImagePicker } from '../../components';
import UploadScreen from '../user/UploadScreen';
import routes from '../../navigation/routes';

//label es para mostrar el error saldra como el label
const validationSchema = Yup.object().shape({
  title: Yup.string().required().label('Title'),
  price: Yup.number().required().min(1).max(100000).label('Price'),
  description: Yup.string().label('Description'),
  category: Yup.object().required().nullable().label('Category'),
  images: Yup.array().min(1, 'Please select at least one image'), //asi mandamos el error
});

const categories = [
  {
    label: 'Furniture',
    value: 'furniture',
    backgroundColor: 'red',
    icon: 'apps',
  },
  {
    label: 'Clothing',
    value: 'clothing',
    backgroundColor: 'green',
    icon: 'email',
  },
  { label: 'Camera', value: 'camera', backgroundColor: 'blue', icon: 'lock' },
];

const initialState = {
  title: '',
  price: '',
  category: null,
  description: '',
  images: [],
};

//asi le indicamos que no puede ir null
const NewListingScreen = ({ navigation, createProduct }) => {
  const [uploadVisible, setUploadVisible] = useState(false);

  const [progress, setProgress] = useState(0);
  const onSubmit = (values, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    setTimer();
    createProduct(values);
    //resetForm();
    Keyboard.dismiss();
  };

  const setTimer = () => {
    setUploadVisible(true);
    const interval = setInterval(() => {
      setProgress(seconds => seconds + 4);
    }, 100);
    setTimeout(() => {
      clearInterval(interval);
    }, 3200);
  };
  return (
    <Screen>
      <UploadScreen
        visible={uploadVisible}
        progress={progress}
        onDone={() => setUploadVisible(false)}
      />
      <ScrollView style={styles.screen}>
        <Form
          initialValues={initialState}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <ImagePicker />
          <Input
            icon='grease-pencil'
            placeholder='Title'
            name='title'
            autoCorrect={false}
            autoCapitalize='none'
          />
          <Input
            icon='currency-usd'
            placeholder='Price'
            name='price'
            keyboardType='numeric'
            maxLength={6}
          />
          <FormPicker
            items={categories}
            name='category'
            placeholder='Category'
            PickerItemComponent={CategoryPickerItem}
            icon='apps'
          />
          <Input
            icon='folder-edit'
            placeholder='Description'
            name='description'
            multiline={true}
          />
          <View style={styles.buttonContainer}>
            <AppButton title='Post' />
            <CustomButton
              title='Cancel'
              color='white'
              onPress={() => navigation.navigate(routes.ACCOUNT)}
            />
          </View>
        </Form>
      </ScrollView>
    </Screen>
  );
};

export default connect(null, { createProduct })(NewListingScreen);

const styles = StyleSheet.create({
  buttonContainer: { marginVertical: 20 },
});
