import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Flex, List, Stack } from '@chakra-ui/react';

import { OrderItem } from './OrderItem';
import { Filter } from './Filter';

const Orders = () => {
  const { orders } = useSelector(state => state.orders);
  const [ordersList, setOrdersList] = useState(orders);

  const filterChangeHandler = event => {
    const stateId = +event.target.value;
    if (!stateId) {
      setOrdersList(orders);
      return;
    }
    setOrdersList(orders.filter(item => item.orderStatus === stateId));
  };

  return (
    <Stack maxW="512px" margin="auto" mt={5}>
      <Flex justify="space-between">
        <Filter onChange={filterChangeHandler} />
      </Flex>
      <List>
        {ordersList.map(order => (
          <OrderItem
            id={order.id}
            key={order.id}
            total={order.total}
            date={order.orderDate}
            fee={order.deliveryFee}
            status={order.orderStatus}
            number={order.orderNumber}
          />
        ))}
      </List>
    </Stack>
  );
};

export default Orders;
