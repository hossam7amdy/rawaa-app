import { HStack, Link } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth';

export const Navbar = () => {
  const { token } = useContext(AuthContext);
  const { nav } = token.translation;

  return (
    <HStack
      as="nav"
      h="50px"
      minW="full"
      spacing={5}
      mx={12}
      overflowX="hidden"
    >
      {nav.map((item, idx) => (
        <Link as="b" key={idx}>
          {item}
        </Link>
      ))}
      <Link as="b" color="#de0b0b">
        العروض
      </Link>
    </HStack>
  );
};
