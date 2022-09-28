import React, { useContext } from 'react';
import { Button, HStack, Text } from '@chakra-ui/react';

import { getIconByName } from '../../utils/IconsFactory';
import { AuthContext } from '../../context/auth';

export const CartButton = () => {
  const { token } = useContext(AuthContext);
  const { cartButton } = token.translation.header;

  return (
    <Button variant="brand" bg="brand.600" rounded="xl">
      <HStack justify="center" spacing={1}>
        {getIconByName('cart', { h: '24px', w: '24px' })}
        <Text>{cartButton}</Text>
        <Text bg="brand.500" px={2} py={1} rounded="full">
          10
        </Text>
      </HStack>
    </Button>
  );
};
