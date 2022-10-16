import { useToast } from '@chakra-ui/react';
import { useQuery, useQueryClient } from 'react-query';

import { request } from '../utils/axios-utils';
import { PATH } from '../data/constants';

const queryFn = Object.freeze({
  orders: ({ queryKey }) => {
    const [, id, lang] = queryKey;
    return request({ url: `${lang}/${PATH.ORDER}/all/${id}` }); // useId
  },
  order: ({ queryKey }) => {
    const [, id, lang] = queryKey;
    return request({ url: `${lang}/${PATH.ORDER}/${id}` }); // orderId
  },

  products: ({ queryKey }) => {
    const [, id, lang] = queryKey;
    return request({ url: `${lang}/${PATH.PRODUCTS}/all/${id}` }); // userId
  },
  product: ({ queryKey }) => {
    const [, id, lang] = queryKey;
    return request({ url: `${lang}/${PATH.PRODUCTS}/${id}` }); // productId
  },

  search: ({ queryKey }) => {
    const [, id, lang] = queryKey;
    return request({ url: `${lang}/${PATH.SEARCH}/${id}` });
  },

  address: ({ queryKey }) => {
    const [, id] = queryKey;
    return request({ url: `${PATH.ADDRESS}/all/user/${id}` });
  },

  cart: ({ queryKey }) => {
    const [, id, lang] = queryKey;
    return request({ url: `${lang}/${PATH.CART}/all/${id}` });
  },
});

export const useFetchById = ({ key, id, lang }) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useQuery([key, id, lang], queryFn[key], {
    enabled: Boolean(id),
    onError: error => {
      const message = error?.response?.data?.message || error.message;
      toast({
        title: 'Failed',
        description: message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    },
    select: data => {
      return data.data;
    },
    initialData: () => {
      const data = queryClient
        .getQueryData(key)
        ?.data?.find(item => item.id === parseInt(id));

      return data ? data : undefined;
    },
  });
};
