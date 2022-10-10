import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Button, HStack, Text, useDisclosure } from '@chakra-ui/react';

import { NUMBER_FORMATER } from '../../../utils/helpers';
import { getIconByName } from '../../../utils/IconsFactory';
import { AuthContext } from '../../../context/AuthContext';
import { CartModal } from '../../cart/CartModal';

export const CartButton = () => {
  const qty = useSelector(state => state.cart.totalQuantity);
  const { token } = useContext(AuthContext);
  const { onOpen, isOpen, onClose } = useDisclosure();

  const { locale } = token;
  const { cartButton } = token.translation.header;

  return (
    <>
      <CartModal onClose={onClose} isOpen={isOpen} />
      <Button variant="brand" bg="brand.600" rounded="xl" onClick={onOpen}>
        <HStack justify="center" spacing={1}>
          {getIconByName('cart', { h: '24px', w: '24px' })}
          <Text>{cartButton}</Text>
          <Text bg="brand.500" px={2} py={1} rounded="full">
            {NUMBER_FORMATER(locale, qty)}
          </Text>
        </HStack>
      </Button>
    </>
  );
};
