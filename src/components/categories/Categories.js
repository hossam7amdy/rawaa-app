import { Flex, Heading, VStack } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';

import { CategoryItem } from './CategoryItem';
import { AuthContext } from '../../context/auth';
import { PATH } from '../../utils/config';
import { request } from '../../utils/axios-utils';

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const { token } = useContext(AuthContext);
  const { ourMenu } = token.translation.home;

  useEffect(() => {
    const lang = token.locale.split('-');

    request({ url: lang[0] + PATH.CATEGORY })
      .then(res => setCategories(res.data))
      .catch(err => console.log(err));
  }, [token]);

  return (
    <VStack as="section" minW="full" my={10}>
      <Heading size="md" textAlign="center">
        {ourMenu.title}
      </Heading>
      <Flex as="ul" wrap="wrap" gap={2} justify="center">
        {categories.map(item => (
          <CategoryItem key={item.id} item={item} />
        ))}
      </Flex>
    </VStack>
  );
};
