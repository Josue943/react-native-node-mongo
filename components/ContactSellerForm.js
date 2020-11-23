import React from 'react';
import { Alert, Keyboard } from 'react-native';
import { Notifications } from 'expo';
import * as Yup from 'yup';

import { Form, Input, AppButton } from './form';
import messagesApi from './../utility/messages';

const validationSchema = Yup.object().shape({
  message: Yup.string().required().min(1).label('Message'),
});

const ContactSellerForm = ({ userId, targetToken }) => {
  const handleSubmit = async ({ message }, { resetForm }) => {
    Keyboard.dismiss();
    try {
      await messagesApi.send(message, userId, targetToken);
    } catch (error) {
      return Alert.alert('Error', 'Could not send the message to the seller.');
    }
    /* resetForm(); */
    Notifications.presentLocalNotificationAsync({
      title: 'Awesome!',
      body: 'Your message was sent to the seller',
    });
  };

  return (
    <Form
      initialValues={{ message: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Input
        maxLength={200}
        multiline
        name='message'
        numberOfLines={3}
        placeholder='Message...'
      />
      <AppButton title='Contact Seller' />
    </Form>
  );
};

export default ContactSellerForm;
