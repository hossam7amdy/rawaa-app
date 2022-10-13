import { useContext } from 'react';
import { useDisclosure, Button, Flex, Text } from '@chakra-ui/react';

import { AuthContext } from '../../../context/AuthContext';
import { SearchModal } from './SearchModal';
import { Icon } from '../../UI/Icons';

export const SearchBox = () => {
  const { onClose, isOpen, onOpen } = useDisclosure();
  const { token } = useContext(AuthContext);
  const { search } = token.translation.header;

  return (
    <>
      <SearchModal isOpen={isOpen} onClose={onClose} />
      <Button
        w="full"
        bg="gray.50"
        variant="ghost"
        onClick={onOpen}
        colorScheme="gray"
      >
        <Flex
          gap={2}
          w="full"
          h="full"
          align="center"
          color="gray.500"
          fontWeight="normal"
        >
          <Icon name="search" />
          <Text>{search.placeholder}</Text>
        </Flex>
      </Button>
    </>
  );
};
