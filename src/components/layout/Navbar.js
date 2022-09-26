import React from 'react';
import { HStack, Flex, Divider } from '@chakra-ui/react';

import { HeaderCartButton } from '../navbar/HeaderCartButton';
import { LaguageSwitcher } from '../navbar/LaguageSwitcher';
import { HeaderMenuList } from '../navbar/HeaderMenuList';
import { SearchBox } from '../navbar/SearchBox';
import { Logo } from '../navbar/Logo';

const Navbar = () => {
  return (
    <HStack h="60px" w="full" bg="brand.400" px={5} spacing={10}>
      <Flex flex={1} justify="end">
        <Logo />
      </Flex>

      <Flex flexGrow={2}>
        <SearchBox />
      </Flex>

      <HStack flex={2} h="50%">
        <HeaderMenuList />

        <Divider orientation="vertical" />
        <HeaderCartButton />

        <Divider orientation="vertical" />
        <LaguageSwitcher />
      </HStack>
    </HStack>
  );
};

export default Navbar;
