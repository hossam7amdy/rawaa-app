import { useContext } from 'react';
import { Button } from '@chakra-ui/react';

import { LoadingSpinner } from '../UI/LoadingSpinner';
import { useFetchById } from '../../hooks/useFetchById';
import { AuthContext } from '../../context/AuthContext';
import { OrderItem } from './OrderItem';
import { Modal } from '../UI/Modal';

export const OrdersModal = ({ isOpen, onClose }) => {
  const { token, lang } = useContext(AuthContext);
  const { isLoading, data: orders } = useFetchById({
    lang,
    key: 'orders',
    id: token.user.id,
  });

  const { list } = token.translation.header.menu;
  const { closeBtn } = token.translation;

  const header = list[1];
  const body = isLoading ? (
    <LoadingSpinner />
  ) : (
    orders?.map(order => (
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
