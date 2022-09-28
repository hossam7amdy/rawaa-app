import { Flex, Heading, VStack } from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from '../../context/auth';

import { ProductItem } from './ProductItem';

const data = [
  { title: 'coffee' },
  { title: 'coffee' },
  { title: 'coffee' },
  { title: 'coffee' },
];

export const MostOrdered = () => {
  const { token } = useContext(AuthContext);
  const { mostOrdered } = token.translation.home;

  return (
    <VStack as="section" minW="full" my={10}>
      <Heading size="md">{mostOrdered}</Heading>
      <Flex as="ul" wrap="wrap" gap={2} rowGap={3} justify="center">
        {data.map((item, idx) => (
          <ProductItem key={idx} item={item} />
        ))}
      </Flex>
    </VStack>
  );
};
