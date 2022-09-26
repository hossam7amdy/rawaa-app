import {
  Text,
  Menu,
  Button,
  MenuList,
  MenuItem,
  MenuButton,
  MenuDivider,
} from '@chakra-ui/react';
import React, { useContext } from 'react';

import { AuthContext } from '../../context/auth';
import { getIconByName } from '../../utils/IconsFactory';

export const HeaderMenuList = () => {
  const { token } = useContext(AuthContext);
  const { menu } = token.translation.navbar;
  const icon = getIconByName('dropdownMenu');

  return (
    <Menu isLazy>
      <MenuButton as={Button} variant="brand" rounded="md" rightIcon={icon}>
        <Text fontSize="sm">{`${menu.buttonText} حسام`}</Text>
      </MenuButton>
      <MenuList>
        {menu.list.map((item, idx) => (
          <MenuItem key={idx}>{item}</MenuItem>
        ))}
        <MenuDivider />
        <MenuItem>
          <Text w="full" textAlign="center">
            {menu.logout}
          </Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
