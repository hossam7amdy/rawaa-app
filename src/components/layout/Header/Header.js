import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { Flex, Divider, Link } from '@chakra-ui/react';

import { LaguageSwitcher } from './LaguageSwitcher';
import { HeaderMenuList } from './HeaderMenuList';
import { AuthContext } from '../../../context/AuthContext';
import { CartButton } from './CartButton';
import { SearchBox } from './SearchBox';
import { Logo } from '../../UI/Logo';

export const Header = () => {
  const { token, isLoggedIn } = useContext(AuthContext);
  const { foodMenu, user } = token.translation.header;

  return (
    <Flex
      as="header"
      gap={10}
      px={5}
      w="full"
      h="60px"
      top={0}
      shadow="md"
      pos="fixed"
      zIndex={200}
      spacing={10}
      align="center"
      bg="brand.400"
    >
      <Flex flex={1} align="center" gap={10}>
        <Logo />
        <Link
          to="menu"
          fontWeight="bold"
          _hover={{ color: 'blackAlpha.700' }}
          as={props => (
            <NavLink
              {...props}
              style={({ isActive }) => {
                return { opacity: isActive ? '50%' : '100%' };
              }}
            />
          )}
        >
          {foodMenu}
        </Link>
      </Flex>

      <Flex flexGrow={1}>
        <SearchBox />
      </Flex>

      <Flex flex={1} gap={2} align="center" justify="space-between">
        <Flex gap={5} align="center">
          {isLoggedIn && <HeaderMenuList />}
          {!isLoggedIn && (
            <Link
              to="user"
              fontWeight="bold"
              _hover={{ color: 'blackAlpha.700' }}
              as={props => (
                <NavLink
                  {...props}
                  style={({ isActive }) => {
                    return { opacity: isActive ? '50%' : '100%' };
                  }}
                />
              )}
            >
              {user}
            </Link>
          )}

          <Divider orientation="vertical" />
          <CartButton />
        </Flex>

        <LaguageSwitcher />
      </Flex>
    </Flex>
  );
};
