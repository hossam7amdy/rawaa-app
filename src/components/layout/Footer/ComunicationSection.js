import { useContext } from 'react';
import { Button, Heading, HStack, IconButton, VStack } from '@chakra-ui/react';

import { Icon } from '../../UI/Icons';
import { AuthContext } from '../../../context/AuthContext';

export const ComunicationSection = () => {
  const { token } = useContext(AuthContext);
  const { footer } = token.translation;

  return (
    <HStack flex={1} flexDir="column" justify="space-around">
      <Button
        fontSize="xl"
        variant="unstyled"
        leftIcon={<Icon name="location" />}
        _hover={{
          opacity: '70%',
          transition: 'opacity 250ms ease-in-out 0s',
        }}
      >
        {footer.locations}
      </Button>

      <VStack>
        <Heading size="sm">{footer['contact-us']}</Heading>
        <HStack spacing={5}>
          <IconButton
            variant="unstyled"
            _hover={{
              opacity: '70%',
              transition: 'opacity 250ms ease-in-out 0s',
            }}
            children={<Icon name="phone" boxSize={6} />}
          />
          <IconButton
            variant="unstyled"
            _hover={{
              opacity: '70%',
              transition: 'opacity 250ms ease-in-out 0s',
            }}
            children={<Icon name="facebook" boxSize={6} />}
          />
          <IconButton
            variant="unstyled"
            _hover={{
              opacity: '70%',
              transition: 'opacity 250ms ease-in-out 0s',
            }}
            children={<Icon name="whatsapp" boxSize={6} />}
          />
        </HStack>
      </VStack>
    </HStack>
  );
};
