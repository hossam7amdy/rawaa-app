import { useContext } from 'react';
import { useDisclosure, Button, Flex, Text } from '@chakra-ui/react';

import { AuthContext } from '../../../context/AuthContext';
import { getIconByName } from '../../../utils/IconsFactory';
import { SearchModal } from './SearchModal';

export const SearchBox = () => {
  const { onClose, isOpen, onOpen } = useDisclosure();
  const { token } = useContext(AuthContext);
  const { search } = token.translation.header;

  return (
    <>
      <SearchModal isOpen={isOpen} onClose={onClose} />
      <Button
        variant="ghost"
        colorScheme="gray"
        bg="gray.50"
        onClick={onOpen}
        w="full"
      >
        <Flex
          w="full"
          gap={2}
          align="center"
          fontWeight="normal"
          color="gray.500"
        >
          <span>{getIconByName('search')}</span>
          <Text>{search.placeholder}</Text>
        </Flex>
      </Button>
    </>
  );
};
