import { Link } from '@chakra-ui/react';
import { NavLink as RouterLink } from 'react-router-dom';

export const NavLink = ({ to, name, isActive }) => {
  return (
    <Link
      as={RouterLink}
      to={to}
      fontWeight="bold"
      _hover={{
        borderBottomWidth: '2px',
        borderBottomColor: 'brand.500',
      }}
      borderBottom={isActive ? '2px' : ''}
      color={isActive ? 'current' : 'gray'}
      borderColor={isActive ? 'brand.500' : ''}
    >
      {name}
    </Link>
  );
};
