import { Formik, Form } from 'formik';
import { useContext } from 'react';
import { VStack, Button, useToast } from '@chakra-ui/react';

import {
  PHONE_NUMBER,
  VALIDATE_EMAIL,
  VALIDATE_PASSWORD,
  VALIDATE_TEXT,
} from '../../utils/validations';
import useMutateData from '../../hooks/useMutateData';
import { AuthContext } from '../../context/AuthContext';
import CustomInput from '../../components/form/CustomInput';

export const Register = () => {
  const toast = useToast();
  const { token } = useContext(AuthContext);
  const { isLoading, mutate } = useMutateData({ key: 'user' });
  const { fullname, phone, email, password, register } = token.translation.user;

  const formSubmitHandler = (enteredValues, actions) => {
    const config = {
      method: 'post',
      data: enteredValues,
    };
    mutate(config, {
      onSuccess: () => {
        actions.resetForm();
        toast({
          title: 'Success',
          description: "We've created an account for you. Happy eating",
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
      },
    });
  };
  return (
    <VStack w="full">
      <Formik
        initialValues={{ fullname: '', phone: '', email: '', password: '' }}
        onSubmit={formSubmitHandler}
      >
        <Form>
          <VStack spacing={4} w="450px">
            <CustomInput
              type="text"
              name="fullname"
              label={fullname.text}
              placeholder={fullname.placeholder}
              validate={VALIDATE_TEXT}
            />
            <CustomInput
              type="phone"
              name="phone"
              label={phone.text}
              placeholder={phone.placeholder}
              validate={PHONE_NUMBER}
            />
            <CustomInput
              type="email"
              name="email"
              label={email.text}
              placeholder={email.placeholder}
              validate={VALIDATE_EMAIL}
            />
            <CustomInput
              type="password"
              name="password"
              label={password.text}
              placeholder={password.placeholder}
              validate={VALIDATE_PASSWORD}
            />
            <Button
              type="submit"
              variant="brand"
              isLoading={isLoading}
              loadingText="submitting"
              spinnerPlacement="end"
            >
              {register}
            </Button>
          </VStack>
        </Form>
      </Formik>
    </VStack>
  );
};
