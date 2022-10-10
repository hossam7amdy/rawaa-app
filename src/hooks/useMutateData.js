import { useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from 'react-query';

import { PATH } from '../data/constants';
import { request } from '../utils/axios-utils';

const queryFn = Object.freeze({
  cart: options => request({ url: `ar/${PATH.CART}`, ...options }),
  user: options => request({ url: PATH.USER, ...options }),
  order: options => request({ url: `ar/${PATH.ORDER}`, ...options }),
  address: options => request({ url: PATH.ADDRESS, ...options }),
});
const useMutateData = ({ key }) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation(queryFn[key], {
    onError: error =>
      toast({
        title: 'Failed',
        description: `Error Occurred: ${error.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      }),
    onSettled: () => queryClient.invalidateQueries(key),
  });
};

export default useMutateData;
