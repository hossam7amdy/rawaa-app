import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Flex, List, Skeleton, Stack, useMediaQuery } from '@chakra-ui/react';

import { useFetchById } from '../../hooks/useFetchById';
import { AuthContext } from '../../store/AuthContext';
import { MealItem } from './MealItem';
import { Navbar } from '../../components/layout/Navbar/Navbar';

export const Meals = () => {
  const { id } = useParams();
  const { lang } = useContext(AuthContext);
  const [isMobile] = useMediaQuery('(max-width: 905px)');
  const { isLoading, data: products } = useFetchById({
    key: 'products', // all products within categoryId
    id,
    lang,
  });

  return (
    <Stack px={5} my={2}>
      {!isMobile && <Navbar />}
      <Skeleton isLoaded={!isLoading} fadeDuration={1}>
        <Flex as={List} wrap="wrap" gap={2} rowGap={3}>
          {products?.map((item, idx) => (
            <MealItem key={idx} item={item} />
          ))}
        </Flex>
      </Skeleton>
    </Stack>
  );
};
