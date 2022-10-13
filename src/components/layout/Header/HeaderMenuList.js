import {
  Text,
  Menu,
  Button,
  MenuList,
  MenuItem,
  MenuButton,
  MenuDivider,
  useDisclosure,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';

import { Icon } from '../../UI/Icons';
import { AuthContext } from '../../../context/AuthContext';
import { CartActions } from '../../../context/CartSlice';
import { OrdersModal } from '../../orders/OrdersModal';

export const HeaderMenuList = () => {
  // modals
  const {
    onOpen: onOpenOrders,
    isOpen: isOrdersOpen,
    onClose: onCloseOrders,
  } = useDisclosure();
  const { onOpen, isOpen, onClose } = useDisclosure();

  // context
  const dispatch = useDispatch();
  const { token, logout } = useContext(AuthContext);

  const { menu } = token.translation.header;
  const firstName = token.user.fullName.split(' ')[0];

  return (
    <>
      <OrdersModal isOpen={isOpen} onClose={onClose} />
      <OrdersModal isOpen={isOrdersOpen} onClose={onCloseOrders} />
      <Menu isLazy>
        <MenuButton
          as={Button}
          variant="brand"
          rounded="md"
          rightIcon={<Icon name="dropdownMenu" />}
        >
          <Text fontSize="sm">{`${menu.buttonText} ${firstName}`}</Text>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={onOpen}>{menu.list[0]}</MenuItem>
          <MenuItem onClick={onOpenOrders}>{menu.list[1]}</MenuItem>
          <MenuItem>{menu.list[2]}</MenuItem>
          <MenuDivider />
          <MenuItem
            onClick={() => {
              dispatch(CartActions.clearCart());
              logout();
            }}
          >
            <Text w="full" textAlign="center">
              {menu.logout}
            </Text>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
