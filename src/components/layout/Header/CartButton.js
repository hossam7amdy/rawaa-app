import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Button, HStack, Text, useDisclosure } from '@chakra-ui/react';

import { NUMBER_FORMATER } from '../../../utils/helpers';
import { AuthContext } from '../../../context/AuthContext';
import { CartModal } from '../../cart/CartModal';
import { Icon } from '../../UI/Icons';

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
          <Icon name="cart" boxSize={6} />
          <Text>{cartButton}</Text>
          <Text bg="brand.500" px={2} py={1} rounded="full">
            {NUMBER_FORMATER(locale, qty)}
          </Text>
        </HStack>
      </Button>
    </>
  );
};
