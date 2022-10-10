import { useContext } from 'react';
import { Button, Heading, HStack, IconButton, VStack } from '@chakra-ui/react';

import { AuthContext } from '../../../context/AuthContext';
import { getIconByName } from '../../../utils/IconsFactory';

export const ComunicationSection = () => {
  const { token } = useContext(AuthContext);
  const { footer } = token.translation;

  return (
    <HStack flex={1} flexDir="column" justify="space-around">
      <Button
        fontSize="xl"
        variant="unstyled"
        leftIcon={getIconByName('location')}
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
            children={getIconByName('phone', { boxSize: '24px' })}
          />
          <IconButton
            variant="unstyled"
            _hover={{
              opacity: '70%',
              transition: 'opacity 250ms ease-in-out 0s',
            }}
            children={getIconByName('facebook', { boxSize: '24px' })}
          />
          <IconButton
            variant="unstyled"
            _hover={{
              opacity: '70%',
              transition: 'opacity 250ms ease-in-out 0s',
            }}
            children={getIconByName('whatsapp', { boxSize: '24px' })}
          />
        </HStack>
      </VStack>
    </HStack>
  );
};
