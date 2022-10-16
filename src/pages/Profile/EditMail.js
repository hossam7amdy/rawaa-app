import { useContext } from 'react';
import { Formik, Form } from 'formik';
import { Button, Container, Divider, Heading, Stack } from '@chakra-ui/react';

import CustomInput from '../../components/form/CustomInput';
import { AuthContext } from '../../context/AuthContext';

export const EditMail = () => {
  const { token } = useContext(AuthContext);

  const initials = {
    email: token.user.email,
    password: token.user.password,
  };

  return (
    <Stack w="full">
      <Heading size="md">Email address</Heading>
      <Divider />
      <Formik initialValues={initials}>
        <Form>
          <Container>
            <Stack>
              <CustomInput
                isDisabled
                name="email"
                type="email"
                label="E-mail"
              />
              <CustomInput
                isDisabled
                name="password"
                type="password"
                label="Password"
              />
              <Button isDisabled type="submit" variant="brand">
                Save
              </Button>
            </Stack>
          </Container>
        </Form>
      </Formik>
    </Stack>
  );
};
