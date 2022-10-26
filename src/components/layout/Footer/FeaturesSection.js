import { useContext } from 'react';
import { Flex, Heading } from '@chakra-ui/react';

import { AuthContext } from '../../../store/AuthContext';
import { AndroidBadge } from '../../UI/AndroidBadge';

export const FeaturesSection = () => {
  const { token } = useContext(AuthContext);
  const { onYourMobile } = token.translation.footer;

  return (
    <Flex flexDir="column" align="center">
      <Heading size="sm">{onYourMobile}</Heading>
      <AndroidBadge />
    </Flex>
  );
};
