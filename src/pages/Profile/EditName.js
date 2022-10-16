import { useContext } from 'react';
import { Form, Formik } from 'formik';
import { Button, Container, Divider, Heading, Stack } from '@chakra-ui/react';

import { VALIDATE_TEXT } from '../../utils/validations';
import { AuthContext } from '../../context/AuthContext';
import useMutateData from '../../hooks/useMutateData';
import CustomInput from '../../components/form/CustomInput';

export const EditName = () => {
  const { token } = useContext(AuthContext);
  const { isLoading, mutate } = useMutateData({ key: 'user' });

  const editNameHandler = (values, actions) => {
    const config = {
      url: token.user.id,
      method: 'put',
      data: {
        ...token.user,
        ...values,
      },
    };

    mutate(config);
  };

  const initialValues = {
    fullName: token.user.fullName,
  };

  return (
    <Stack w="full">
      <Heading size="md">Personal Information</Heading>
      <Divider />
      <Formik initialValues={initialValues} onSubmit={editNameHandler}>
        {({ values }) => (
          <Form>
            <Container>
              <Stack>
                <CustomInput
                  type="text"
                  name="fullName"
                  label="Full Name"
                  validate={VALIDATE_TEXT}
                />
                <Button
                  type="submit"
                  variant="brand"
                  isLoading={isLoading}
                  spinnerPlacement="end"
                  loadingText="submitting"
                  isDisabled={values.fullName === initialValues.fullName}
                >
                  Save
                </Button>
              </Stack>
            </Container>
          </Form>
        )}
      </Formik>
    </Stack>
  );
};
