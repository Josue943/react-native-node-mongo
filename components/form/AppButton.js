import React from 'react';
import { useFormikContext } from 'formik';

import { CustomButton } from '../ui';

const AppButton = ({ title }) => {
  //formik context nos permite hacer esto
  const { handleSubmit } = useFormikContext();
  return <CustomButton title={title} onPress={handleSubmit} />;
};

export default AppButton;
