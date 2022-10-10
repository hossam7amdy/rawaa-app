import { Spinner } from '@chakra-ui/react';

export const LoadingSpinner = props => {
  return (
    <Spinner
      {...props}
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="brand.400"
      size="xl"
    />
  );
};
