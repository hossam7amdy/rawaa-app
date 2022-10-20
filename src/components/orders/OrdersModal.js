import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect } from 'react';
import { Button } from '@chakra-ui/react';

import { LoadingSpinner } from '../UI/LoadingSpinner';
import { OrdersActions } from '../../store/OrdersSlice';
import { useFetchById } from '../../hooks/useFetchById';
import { AuthContext } from '../../store/AuthContext';
import { OrderItem } from './OrderItem';
import { Modal } from '../UI/Modal';

export const OrdersModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { token, lang } = useContext(AuthContext);
  const { orders } = useSelector(state => state.orders);
  const { isLoading, data } = useFetchById({
    lang,
    key: 'orders',
    id: token.user.id,
  });

  useEffect(() => {
    if (data) {
      dispatch(OrdersActions.replaceOrders(data));
    }
  }, [dispatch, data]);

  const { list } = token.translation.header.menu;
  const { closeBtn } = token.translation;

  const header = list[1];
  const body = isLoading ? (
    <LoadingSpinner />
  ) : (
    orders.map(order => (
      <OrderItem
        id={order.id}
        key={order.id}
        total={order.total}
        date={order.orderDate}
        fee={order.deliveryFee}
        status={order.orderStatus}
        number={order.orderNumber}
      />
    ))
  );
  const footer = (
    <Button variant="outline" colorScheme="brand" mr={3} onClick={onClose}>
      {closeBtn}
    </Button>
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
