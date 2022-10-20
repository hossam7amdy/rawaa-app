import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Flex, Skeleton } from '@chakra-ui/react';

import { useFetchById } from '../../hooks/useFetchById';
import { AuthContext } from '../../store/AuthContext';
import { MealItem } from './MealItem';
import { Navbar } from '../../components/layout/Navbar/Navbar';

export const Meals = () => {
  const { id } = useParams();
  const { lang } = useContext(AuthContext);
  const { isLoading, data: products } = useFetchById({
    key: 'products', // all products within categoryId
    id,
    lang,
  });

  return (
    <Container minW="95vw" minH="70vh">
      <Navbar />
      <Skeleton w="95vw" h="70vh" isLoaded={!isLoading} fadeDuration={1}>
        <Flex as="section" wrap="wrap" gap={2} rowGap={3}>
          {products?.map((item, idx) => (
            <MealItem key={idx} item={item} />
          ))}
        </Flex>
      </Skeleton>
    </Container>
  );
};
