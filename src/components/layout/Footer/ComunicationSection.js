import { useContext } from 'react';
import { Button, Flex, Heading, IconButton } from '@chakra-ui/react';

import { Icon } from '../../UI/Icons';
import { AuthContext } from '../../../store/AuthContext';

export const ComunicationSection = () => {
  const { token } = useContext(AuthContext);
  const { footer } = token.translation;

  return (
    <Flex
      flexDir="column"
      w="full"
      gap={5}
      align={{ base: 'center', md: 'start' }}
    >
      <Button
        fontSize="xl"
        variant="link"
        colorScheme="current"
        leftIcon={<Icon name="location" />}
        _hover={{
          opacity: '70%',
          transition: 'opacity 250ms ease-in-out 0s',
        }}
      >
        {footer.locations}
      </Button>

      <Flex flexDir="column" align="center">
        <Heading size="sm">{footer['contact-us']}</Heading>
        <Flex gap={5}>
          <IconButton
            aria-label="phone icon"
            variant="unstyled"
            _hover={{
              opacity: '70%',
              transition: 'opacity 250ms ease-in-out 0s',
            }}
            children={<Icon name="phone" boxSize={6} />}
          />
          <IconButton
            variant="unstyled"
            aria-label="facebook icon"
            _hover={{
              opacity: '70%',
              transition: 'opacity 250ms ease-in-out 0s',
            }}
            children={<Icon name="facebook" boxSize={6} />}
          />
          <IconButton
            variant="unstyled"
            aria-label="whatsapp icon"
            _hover={{
              opacity: '70%',
              transition: 'opacity 250ms ease-in-out 0s',
            }}
            children={<Icon name="whatsapp" boxSize={6} />}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
