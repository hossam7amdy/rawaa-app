import { useContext } from 'react';
import { Button, Flex, HStack, ListItem, Text } from '@chakra-ui/react';

import { CURRENCY_FORMATER } from '../../utils/helpers';
import { AuthContext } from '../../context/AuthContext';
import useMutateData from '../../hooks/useMutateData';
import { PATH } from '../../data/constants';

import { useDispatch, useSelector } from 'react-redux';
import { CartActions } from '../../context/CartSlice';

export const CartItem = props => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  const { token } = useContext(AuthContext);
  const { mutate } = useMutateData({ key: 'cart' });

  const locale = token.locale;
  const { productId, title, quantity, price, amount, taste, itemSize } = props;

  const onAddToCartHandler = () => {
    const { quantity, ...rest } = props;
    dispatch(CartActions.addItemToCart({ quantity: 1, ...rest }));
    const mutateItem = cart.items.find(item => item.productId === productId);

    const config = {
      method: 'post',
      data: {
        quantity: quantity + 1,
        customerId: token.user.id,
        ...mutateItem,
      },
    };

    mutate(config);
  };

  const onRemoveItemHandler = () => {
    dispatch(CartActions.removeItemFromCart(productId));
    const mutateItem = cart.items.find(item => item.productId === productId);

    let config;
    if (mutateItem.quantity > 1) {
      config = {
        method: 'post',
        data: {
          quantity: mutateItem.quantity - 1,
          customerId: token.user.id,
          ...mutateItem,
        },
      };
    } else {
      config = {
        method: 'delete',
        url: `ar/${PATH.CART}/${token.user.id}/${productId}`,
      };
    }
    mutate(config);
  };

  return (
    <ListItem bg="gray.100" mb={2} p={2}>
      <Flex flexDir="column" gap={3}>
        <Flex justify="space-between">
          <Text as="b">{title}</Text>
          <Text as="b">
            {CURRENCY_FORMATER(locale, amount)}{' '}
            <Text as="i" fontWeight="normal" fontSize="sm">
              ({CURRENCY_FORMATER(locale, price)}/{quantity})
            </Text>
          </Text>
        </Flex>
        <Flex justify="space-between">
          <span>
            x
            <Text as="b" fontSize="md">
              {quantity}
            </Text>
            <span>
              {' '}
              ({itemSize} - {taste})
            </span>
          </span>
          <HStack>
            <Button variant="brand" size="xs" onClick={onRemoveItemHandler}>
              -
            </Button>
            <Button
              isDisabled={quantity === 15}
              variant="brand"
              size="xs"
              onClick={onAddToCartHandler}
            >
              +
            </Button>
          </HStack>
        </Flex>
      </Flex>
    </ListItem>
  );
};
