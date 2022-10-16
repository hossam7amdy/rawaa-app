import { useContext } from 'react';
import { Form, Formik } from 'formik';
import {
  Button,
  Container,
  Divider,
  Heading,
  HStack,
  Stack,
} from '@chakra-ui/react';

import { VALIDATE_PASSWORD } from '../../utils/validations';
import { AuthContext } from '../../context/AuthContext';
import useMutateData from '../../hooks/useMutateData';
import CustomInput from '../../components/form/CustomInput';

export const ChangePassword = () => {
  const { token } = useContext(AuthContext);
  const { isLoading, mutate } = useMutateData({ key: 'user' });

  const changePasswordHandler = (values, actions) => {
    const config = {
      url: token.user.id,
      method: 'put',
      data: {
        ...token.user,
        password: values.confirmPassword,
      },
    };

    console.log(config);
    mutate(config, {
      onSuccess: () => actions.resetForm(),
    });
  };

  const matchPassword = values => {
    if (values.newPassword !== values.confirmPassword) {
      return 'Password does not match';
    }
    if (values.oldPassword === values.confirmPassword) {
      return 'Please choose different password';
    }
  };

  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  return (
    <Stack w="full">
      <Heading size="md">Security</Heading>
      <Divider />
      <Formik initialValues={initialValues} onSubmit={changePasswordHandler}>
        {({ values }) => (
          <Form>
            <Container>
              <Stack>
                <CustomInput
                  type="password"
                  name="oldPassword"
                  label="Old Password"
                  placeholder="Enter old password"
                />
                <CustomInput
                  type="password"
                  name="newPassword"
                  label="New Password"
                  placeholder="Enter new password"
                  validate={VALIDATE_PASSWORD}
                />
                <CustomInput
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Confirm new password"
                  validate={() => matchPassword(values)}
                />
                <HStack w="full">
                  <Button
                    type="submit"
                    variant="brand"
                    isLoading={isLoading}
                    spinnerPlacement="end"
                    loadingText="submitting"
                  >
                    Confirm
                  </Button>
                  <Button size="sm" variant="link" colorScheme="red">
                    Delete account
                  </Button>
                </HStack>
              </Stack>
            </Container>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};
