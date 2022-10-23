import { Text, VStack, Heading, Container } from '@chakra-ui/react';

import { EditName } from './EditName';
import { EditMail } from './EditMail';
import { ChangePassword } from './ChangePassword';
import { useContext } from 'react';
import { AuthContext } from '../../store/AuthContext';

export const Profile = () => {
  const { token } = useContext(AuthContext);
  const { title, text } = token.translation.edit.profile;

  return (
    <Container minW="container.lg" mt={10}>
      <Heading size="xl">{title}</Heading>
      <Text>{text}</Text>
      <VStack p={3} my={3} spacing={10} rounded="md" bg="gray.50">
        <EditName />
        <EditMail />
        <ChangePassword />
      </VStack>
    </Container>
  );
};
