import { Text, VStack, Heading, Container } from '@chakra-ui/react';

import { EditName } from './EditName';
import { EditMail } from './EditMail';
import { ChangePassword } from './ChangePassword';

export const Profile = () => {
  return (
    <Container minW="container.lg" mt={10}>
      <Heading size="xl">Profile</Heading>
      <Text>
        Manage your details, view your tier status and change your password
      </Text>
      <VStack p={3} my={3} spacing={10} rounded="md" bg="gray.50">
        <EditName />
        <EditMail />
        <ChangePassword />
      </VStack>
    </Container>
  );
};
