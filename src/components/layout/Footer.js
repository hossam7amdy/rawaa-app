import React, { useContext } from 'react';
import {
  Flex,
  Link,
  Text,
  Button,
  VStack,
  HStack,
  Heading,
  IconButton,
} from '@chakra-ui/react';

import { getIconByName } from '../../utils/IconsFactory';
import { AndroidBadge } from '../mobileBadge/androidBadge';
import { AuthContext } from '../../context/auth';
import { Logo } from '../UI/Logo';

export const Footer = () => {
  const { token } = useContext(AuthContext);
  const { footer } = token.translation;

  return (
    <Flex
      pt={5}
      pb={10}
      h="200px"
      minW="full"
      as="footer"
      bg="brand.200"
      color="blackAlpha.700"
    >
      {/* section 1 */}
      <VStack flex={1} justify="space-between">
        <Logo />
        <Flex flexDir="column">
          <Text fontSize="xs" fontWeight="bold">
            {footer.motto}
          </Text>
          <Text fontSize="xs" fontWeight="bold">
            {footer['CR-No']} 1010143207
          </Text>
          <Text fontSize="xs" fontWeight="bold">
            {footer['VAT-No']} 300056049100002
          </Text>
        </Flex>
      </VStack>

      {/* section 2 */}
      <VStack flex={1}>
        <VStack h="full" align="start">
          <Heading size="sm">{footer.explore}</Heading>
          <VStack h="full" justify="space-evenly" align="start">
            <Link as="b" href="#" fontSize="xs">
              {footer.ourPromise}
            </Link>
            <Link as="b" href="#" fontSize="xs">
              {footer['about-us']}
            </Link>
            <Link as="b" href="#" fontSize="xs">
              {footer.policy}
            </Link>
            <Link as="b" href="#" fontSize="xs">
              {footer.conditions}
            </Link>
          </VStack>
        </VStack>
      </VStack>

      {/* section 3 */}
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

      {/* section 4 */}
      <VStack flex={1} justify="center">
        <Heading size="sm">{footer.onYourMobile}</Heading>
        <AndroidBadge />
      </VStack>
    </Flex>
  );
};
