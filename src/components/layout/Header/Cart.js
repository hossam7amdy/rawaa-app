import React from 'react';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Text, useDisclosure, Button } from '@chakra-ui/react';

import { NUMBER_FORMATER } from '../../../utils/helpers';
import { AuthContext } from '../../../store/AuthContext';
import { CartModal } from '../../cart/CartModal';
import { Icon } from '../../UI/Icons';

export const Cart = () => {
  const qty = useSelector(state => state.cart.totalQuantity);
  const { token } = useContext(AuthContext);
  const { onOpen, isOpen, onClose } = useDisclosure();

  const { locale } = token;
  const hasItems = qty !== 0;

  return (
    <>
      <CartModal onClose={onClose} isOpen={isOpen} />
      <Button variant="none" pos="relative" onClick={onOpen}>
        <Icon name="cart" />
        {hasItems && (
          <Text
            h={4}
            w={4}
            top={1}
            bg="red"
            right={1}
            fontSize="xs"
            color="black"
            pos="absolute"
            rounded="full"
            fontWeight="bold"
            textAlign="center"
          >
            {NUMBER_FORMATER(locale, qty)}
          </Text>
        )}
      </Button>
    </>
  );
};
