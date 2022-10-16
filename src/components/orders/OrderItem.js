import { useContext } from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';

import { CURRENCY_FORMATER, DATE_FORMATER } from '../../utils/helpers';
import { AuthContext } from '../../context/AuthContext';
import useMutateData from '../../hooks/useMutateData';
import { PATH } from '../../data/constants';

const statusBgColor = {
  1: 'orange.50',
  2: 'teal.50',
  3: 'red.50',
  4: 'green.50',
  5: 'gray.100',
};
const statusColor = {
  1: 'orange.500',
  2: 'teal.500',
  3: 'red.500',
  4: 'green.500',
  5: 'gray.500',
};
export const OrderItem = props => {
  const { token, lang } = useContext(AuthContext);
  const { isLoading: isDeleting, mutate } = useMutateData({ key: 'order' });

  const { locale } = token;
  const { cancelBtn } = token.translation;
  const { states } = token.translation.orders;
  const { id, number, date, status, total, fee } = props;

  const cancelOrderHandler = id => {
    const config = {
      method: 'put',
      url: `${lang}/${PATH.ORDER}/orderstatus`,
      data: { id, orderStatus: 5, customerId: token.user.id },
    };
    mutate(config);
  };

  return (
    <Flex
      p={2}
      mb={2}
      rounded="md"
      bg="gray.50"
      align="center"
      justify="space-between"
    >
      <Flex flexDir="column">
        <Text as="b">{number}</Text>
        <Text as="em">{DATE_FORMATER(locale, date)}</Text>
        <Text
          as="b"
          py={1}
          px={2}
          fontSize="xs"
          rounded="full"
          w="max-content"
          bg={statusBgColor[status]}
          color={statusColor[status]}
        >
          {states[status]}
        </Text>
      </Flex>
      <Flex flexDir="column" gap={2}>
        <Text as="b" fontSize={18}>
          {CURRENCY_FORMATER(locale, total + fee)}
        </Text>
        {status === 1 && (
          <Button
            size="xs"
            variant="link"
            colorScheme="blue"
            isLoading={isDeleting}
            onClick={() => cancelOrderHandler(id)}
          >
            {cancelBtn}
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
