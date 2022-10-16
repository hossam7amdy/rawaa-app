import { useToast } from '@chakra-ui/react';
import { useQuery } from 'react-query';

import { request } from '../utils/axios-utils';
import { PATH } from '../data/constants';

const queryFn = Object.freeze({
  categories: ({ queryKey }) => {
    const [, , lang] = queryKey;
    return request({ url: `${lang}/${PATH.CATEGORY}/all` });
  },
});

export const useFetchData = ({ key, id, lang }) => {
  const toast = useToast();

  return useQuery([key, id, lang], queryFn[key], {
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
  });
};
