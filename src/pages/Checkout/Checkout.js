import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { Flex, Button, useToast, Stack, Spacer } from '@chakra-ui/react';

import { CartPreview } from './CartPreview';
import { AuthContext } from '../../context/AuthContext';
import { AddressList } from './AddressList';
import useMutateData from '../../hooks/useMutateData';
import { useDispatch, useSelector } from 'react-redux';
import { CartActions } from '../../context/CartSlice';

export const Checkout = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const { token } = useContext(AuthContext);
  const [addressId, setAddressId] = useState(null);
  const { items, totalAmount } = useSelector(state => state.cart);
  const { isLoading: submitting, mutate } = useMutateData({ key: 'order' });

  const dispatch = useDispatch();

  const canPlaceOrder = !!addressId && items.length !== 0;
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

    mutate(config, {
      onSuccess: () => {
        dispatch(CartActions.clearCart());
        toast({
          title: 'Success',
          description: 'order placed successfully, stay tuned',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
        navigate('/', { replace: true });
      },
    });
  };

  return (
    <Flex w="full" h="full">
      <Stack w="full" h="full">
        <AddressList onAddressId={setAddressId} />
        <Spacer />
        <Button
          w="full"
          variant="brand"
          isLoading={submitting}
          loadingText={'submitting'}
          isDisabled={!canPlaceOrder}
          onClick={placeOrderHandler}
        >
          {actionBtn}
        </Button>
      </Stack>
      <CartPreview />
    </Flex>
  );
};
