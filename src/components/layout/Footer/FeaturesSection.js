import { useContext } from 'react';
import { Heading, VStack } from '@chakra-ui/react';

import { AuthContext } from '../../../context/AuthContext';
import { AndroidBadge } from '../../UI/AndroidBadge';

export const FeaturesSection = () => {
  const { token } = useContext(AuthContext);
  const { onYourMobile } = token.translation.footer;

  return (
    <VStack flex={1} justify="center">
      <Heading size="sm">{onYourMobile}</Heading>
      <AndroidBadge />
    </VStack>
  );
};
