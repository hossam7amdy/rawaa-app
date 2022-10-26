import { useContext } from 'react';
import { AuthContext } from '../../../store/AuthContext';
import { Flex, Text } from '@chakra-ui/react';

import { Logo } from '../../UI/Logo';

export const LogoSection = () => {
  const { token } = useContext(AuthContext);
  const { footer } = token.translation;

  return (
    <Flex
      flexDir="column"
      h="full"
      justify={{ base: 'start', md: 'space-between' }}
      align={{ base: 'center', md: 'start' }}
    >
      <Logo />
      <Flex flexDir="column" align={{ base: 'center', md: 'start' }}>
        <Text fontSize={{ base: 'x-small', md: 'xs' }} fontWeight="bold">
          {footer.motto}
        </Text>
        <Text fontSize={{ base: 'x-small', md: 'xs' }} fontWeight="bold">
          {footer['CR-No']} 1010143207
        </Text>
        <Text fontSize={{ base: 'x-small', md: 'xs' }} fontWeight="bold">
          {footer['VAT-No']} 300056049100002
        </Text>
      </Flex>
    </Flex>
  );
};
