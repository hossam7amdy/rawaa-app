import React from 'react';
import { HStack, Flex, Divider } from '@chakra-ui/react';

import { LaguageSwitcher } from '../header/LaguageSwitcher';
import { NavMenuList } from '../header/HeaderMenuList';
import { CartButton } from '../header/CartButton';
import { SearchBox } from '../header/SearchBox';
import { Logo } from '../UI/Logo';

export const Header = () => {
  return (
    <HStack
      as="header"
      px={5}
      w="full"
      h="60px"
      top={0}
      shadow="md"
      pos="sticky"
      zIndex={100}
      spacing={10}
      bg="brand.400"
    >
      <Flex flex={1}>
        <Logo />
      </Flex>

      <Flex flexGrow={2}>
        <SearchBox />
      </Flex>

      <HStack flex={2} justify="space-between">
        <HStack>
          <NavMenuList />

          <Divider orientation="vertical" />
          <CartButton />
        </HStack>

        <LaguageSwitcher />
      </HStack>
    </HStack>
  );
};
