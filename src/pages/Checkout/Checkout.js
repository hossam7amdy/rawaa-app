import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Button, useToast, Stack, Spacer } from '@chakra-ui/react';

import { CartPreview } from './CartPreview';
import { AddressList } from './AddressList';
import { AuthContext } from '../../store/AuthContext';
import { CartActions } from '../../store/CartSlice';
import useMutateData from '../../hooks/useMutateData';
import { OrdersActions } from '../../store/OrdersSlice';

export const Checkout = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);
  const cart = useSelector(state => state.cart);
  const [addressId, setAddressId] = useState(null);
  const { isLoading, request } = useMutateData({ key: 'order' });

  const { items, totalAmount, totalQuantity } = cart;
  const canPlaceOrder = !!addressId && !!totalQuantity && totalAmount < 1000;
  const { actionBtn } = token.translation.checkout;

  const placeOrderHandler = () => {
    const userId = token.user.id;
    const orderDetails = items.map(item => {
      return {
        drinkId: 1,
        size: item.size,
        taste: item.taste,
        quantity: item.quantity,
        productId: item.productId,
      };
    });

    const config = {
      method: 'post',
      data: {
        orderDetails,
        orderStatus: 1,
        pymentMethod: 1,
        restaurantId: 1,
        deliveryFee: 14,
        total: totalAmount,
        customerId: userId,
        deliveryAddressId: addressId,
      },
    };

    request(config).then(data => {
      dispatch(CartActions.clearCart());
      dispatch(OrdersActions.addNewOrder(data));

      toast({
        title: 'Success',
        description: 'order placed successfully, stay tuned',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      navigate('/', { replace: true });
    });
  };

  return (
    <Flex w="full" h="full" gap={2} px={2} mt={5}>
      <Stack flex={3} h="full">
        <AddressList onAddressId={setAddressId} />
        <Spacer />
        <Button
          w="full"
          variant="brand"
          isLoading={isLoading}
          loadingText={'submitting'}
          isDisabled={!canPlaceOrder}
          onClick={placeOrderHandler}
        >
          {actionBtn}
        </Button>
      </Stack>
      <Flex flex={2} h="full">
        <CartPreview />
      </Flex>
    </Flex>
  );
};
