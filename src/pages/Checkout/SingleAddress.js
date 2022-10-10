import { useContext } from 'react';
import { Button, Flex, Heading, Text, ListItem, Stack } from '@chakra-ui/react';

import { PATH } from '../../data/constants';
import useMutateData from '../../hooks/useMutateData';
import { AuthContext } from '../../context/AuthContext';

export const SingleAddress = props => {
  const { id, city, notes, shortName, governorate, isActive, ...rest } = props;

  const { token } = useContext(AuthContext);
  const { deleteBtn } = token.translation;

  const { isLoading, mutate } = useMutateData({ key: 'address' });
  const deleteAddressHandler = id => {
    mutate({ method: 'delete', url: `${PATH.ADDRESS}/${id}` });
  };

  return (
    <Stack
      as={ListItem}
      p={2}
      mb={2}
      w="full"
      bg="gray.50"
      rounded="md"
      cursor="pointer"
      borderWidth="2px"
      borderColor={isActive ? 'brand.500' : 'transparent'}
      {...rest}
    >
      <Flex align="center" justify="space-between">
        <Heading size="sm">{shortName}</Heading>
        <Button
          size="xs"
          variant="link"
          color="red.500"
          isLoading={isLoading}
          onClick={() => deleteAddressHandler(id)}
        >
          {deleteBtn}
        </Button>
      </Flex>
      <Text>
        {city}, {governorate}, {shortName}
      </Text>
      <Text>{notes}</Text>
    </Stack>
  );
};
