import { Formik, Form } from 'formik';
import { useContext, useState } from 'react';
import { Text, VStack, Button } from '@chakra-ui/react';

import { VALIDATE_EMAIL, VALIDATE_PASSWORD } from '../../utils/validations';
import { AuthContext } from '../../context/AuthContext';
import CustomInput from '../../components/form/CustomInput';
import { request } from '../../utils/axios-utils';
import { PATH } from '../../data/constants';

export const Login = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { token, login } = useContext(AuthContext);

  const { email, password, login: loginBtn, errorMsg } = token.translation.user;

  const formSubmitHandler = enteredValues => {
    setIsLoading(true);
    const config = {
      url: `${PATH.USER}/login`,
      method: 'post',
      data: enteredValues,
    };
    request(config)
      .then(res => login(res.data))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  };
  return (
    <VStack>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={formSubmitHandler}
      >
        <Form onChange={() => setError(false)}>
          <VStack spacing={4} w="400px">
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
            {error && <Text color="red.500">{errorMsg}</Text>}
            <Button
              type="submit"
              variant="brand"
              isLoading={isLoading}
              loadingText="Loading"
              spinnerPlacement="end"
            >
              {loginBtn}
            </Button>
          </VStack>
        </Form>
      </Formik>
    </VStack>
  );
};
