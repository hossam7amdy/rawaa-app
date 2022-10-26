import { Flex, Divider, IconButton, useDisclosure } from '@chakra-ui/react';

import { LaguageSwitcher } from './LaguageSwitcher';
import { HeaderMenuList } from './HeaderMenuList';
import { AuthContext } from '../../../store/AuthContext';
import { useContext } from 'react';
import { SearchBox } from './SearchBox';
import { Navbar } from '../Navbar/Navbar';
import { Drawer } from '../../UI/Drawer';
import { Logo } from '../../UI/Logo';
import { Icon } from '../../UI/Icons';
import { Cart } from './Cart';
import { Link } from './Link';

export const MobileHeader = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { isLoggedIn, token } = useContext(AuthContext);
  const { user } = token.translation.header;

  const header = (
    <>
      {isLoggedIn && <HeaderMenuList />}
      {!isLoggedIn && <Link to="user" name={user} />}
      <Divider orientation="horizontal" my={1} />
    </>
  );
  const body = <Navbar ignore={true} />;
  const footer = <LaguageSwitcher />;

  return (
    <>
      <Drawer
        header={header}
        body={body}
        footer={footer}
        isOpen={isOpen}
        onClose={onClose}
        color="red"
      />
      <Flex
        as="header"
        w="full"
        h="50px"
        shadow="md"
        align="center"
        color="brand.500"
        bg="secondary.700"
        justify="space-between"
      >
        <IconButton
          icon={<Icon name="menu" />}
          aria-label="menu"
          variant="none"
          onClick={onOpen}
        />
        <Logo />
        <Flex align="center">
          <SearchBox />
          <Cart />
        </Flex>
      </Flex>
    </>
  );
};
