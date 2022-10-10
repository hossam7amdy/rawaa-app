import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Flex, List, Button, Heading, ListItem } from '@chakra-ui/react';

import { CURRENCY_FORMATER } from '../../utils/helpers';
import { AuthContext } from '../../context/AuthContext';
import { CartItem } from './CartItem';
import { Modal } from '../UI/Modal';

export const CartModal = ({ onClose, isOpen }) => {
  const navigate = useNavigate();
  const cart = useSelector(state => state.cart);
  const { token } = useContext(AuthContext);

  const hasItems = cart.items.length > 0;
  const { cartModal, closeBtn } = token.translation;
  const { tasteMapper, sizeMapper } = token.translation.productDetails;

  const header = cartModal.title;
  const body = (
    <List>
      {cart.items.map(item => (
        <CartItem
          {...item}
          key={item.productId}
          taste={tasteMapper[item.taste - 1]}
          itemSize={sizeMapper[item.size - 1]}
        />
      ))}
      <ListItem>
        <Flex justify="space-between">
          <Heading size="md">{cartModal.total}</Heading>
          <Heading size="md">
            {CURRENCY_FORMATER(token.locale, cart.totalAmount)}
          </Heading>
        </Flex>
      </ListItem>
    </List>
  );

  const footer = (
    <Flex gap={2}>
      <Button variant="outline" colorScheme="brand" mr={3} onClick={onClose}>
        {closeBtn}
      </Button>

      {hasItems && (
        <Button
          isDisabled={cart.totalAmount > 999}
          variant="brand"
          onClick={() => {
            onClose();
            navigate('/checkout', { replace: true });
          }}
        >
          {cartModal.actionBtn}
        </Button>
      )}
    </Flex>
  );

  return (
    <Modal
      header={header}
      body={body}
      footer={footer}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};
