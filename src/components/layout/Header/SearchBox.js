import { useContext } from 'react';
import { useDisclosure, Button, Flex, Text } from '@chakra-ui/react';

import { AuthContext } from '../../../store/AuthContext';
import { SearchModal } from './SearchModal';
import { Icon } from '../../UI/Icons';

export const SearchBox = () => {
  const { onClose, isOpen, onOpen } = useDisclosure();
  const { token } = useContext(AuthContext);
  const { search } = token.translation.header;

  return (
    <>
      <SearchModal isOpen={isOpen} onClose={onClose} />
      <Button w="full" minW="min-content" bg="secondary.50" onClick={onOpen}>
        <Flex
          gap={2}
          w="full"
          h="full"
          align="center"
          color="secondary.300"
          fontWeight="normal"
        >
          <Icon name="search" />
          <Text>{search.placeholder}</Text>
        </Flex>
      </Button>
    </>
  );
};
