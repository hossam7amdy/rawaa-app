import { useContext } from 'react';
import { Heading, VStack, Flex, List, Skeleton } from '@chakra-ui/react';

import { MenuItem } from './MenuItem';
import { AuthContext } from '../../store/AuthContext';
import { useFetchById } from '../../hooks/useFetchById';

export const Menu = () => {
  const { token, lang } = useContext(AuthContext);
  const { isLoading, data: categories } = useFetchById({
    lang,
    id: 'all',
    key: 'categories',
  });

  const { ourMenu } = token.translation.home;

  return (
    <VStack as="section" spacing={5} my={20}>
      <Heading>{ourMenu.title}</Heading>

      <Skeleton minH="100vh" isLoaded={!isLoading} fadeDuration={1}>
        <Flex as={List} flexWrap="wrap" justifyContent="center" gap={3}>
          {categories?.map(item => (
            <MenuItem key={item.id} item={item} />
          ))}
        </Flex>
      </Skeleton>
    </VStack>
  );
};
