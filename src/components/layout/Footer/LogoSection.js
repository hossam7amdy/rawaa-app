import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { Flex, Text, VStack } from '@chakra-ui/react';

import { Logo } from '../../UI/Logo';

export const LogoSection = () => {
  const { token } = useContext(AuthContext);
  const { footer } = token.translation;

  return (
    <VStack flex={1} justify="space-between">
      <Logo />
      <Flex flexDir="column">
        <Text fontSize="xs" fontWeight="bold">
          {footer.motto}
        </Text>
        <Text fontSize="xs" fontWeight="bold">
          {footer['CR-No']} 1010143207
        </Text>
        <Text fontSize="xs" fontWeight="bold">
          {footer['VAT-No']} 300056049100002
        </Text>
      </Flex>
    </VStack>
  );
};
