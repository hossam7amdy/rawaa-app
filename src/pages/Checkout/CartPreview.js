import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { Text, List, Stack, HStack, Heading, Divider } from '@chakra-ui/react';

import { PATH, SCROLLBAR_STYLE } from '../../data/constants';
import { CURRENCY_FORMATER, NUMBER_FORMATER } from '../../utils/helpers';
import { AuthContext } from '../../context/AuthContext';
import { SingleItem } from './SingleItem';

export const CartPreview = () => {
  const { items, totalQuantity, totalAmount } = useSelector(
    state => state.cart
  );
  const { token } = useContext(AuthContext);

  const deliveryFee = 14;
  const { locale } = token;
  const { summery, subtotal, shipping, total, item } =
    token.translation.checkout;

  const hasItems = items.length !== 0;

  return (
    <Stack w="full" h="full" p={5} spacing={5}>
      <HStack>
        <Heading size="md">{summery}</Heading>
        <Text as="b" fontSize="xs" color="gray.600">
          ({NUMBER_FORMATER(locale, totalQuantity)} {item})
        </Text>
      </HStack>

      <Stack as={List} overflowY="auto" sx={SCROLLBAR_STYLE}>
        {items.map(item => (
          <SingleItem
            createOn={item.createOn}
            title={item.title}
            key={item.productId}
            amount={totalAmount}
            quantity={item.quantity}
            image={PATH.FILE + item.image}
          />
        ))}
      </Stack>

      {hasItems && (
        <>
          <Divider />
          <HStack w="full" justify="space-between">
            <Text color="gray.600">{subtotal}</Text>
            <Heading size="sm">
              {CURRENCY_FORMATER(locale, totalAmount)}
            </Heading>
          </HStack>
          <HStack w="full" justify="space-between">
            <Text color="gray.600">{shipping}</Text>
            <Heading size="sm">
              {CURRENCY_FORMATER(locale, deliveryFee)}
            </Heading>
          </HStack>
          <Divider />
          <HStack justify="space-between" w="full">
            <Text color="gray.600">{total}</Text>
            <Heading size="md">
              {CURRENCY_FORMATER(locale, totalAmount + deliveryFee)}
            </Heading>
          </HStack>
        </>
      )}
    </Stack>
  );
};
