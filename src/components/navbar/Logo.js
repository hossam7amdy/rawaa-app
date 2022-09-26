import { Link } from 'react-router-dom';
import React, { useContext } from 'react';

import { getIconByName } from '../../utils/IconsFactory';
import { AuthContext } from '../../context/auth';
import { Heading } from '@chakra-ui/react';

export const Logo = () => {
  const { token } = useContext(AuthContext);
  const isArabic = token.locale === 'ar-EG';

  return (
    <Link href="/">
      {isArabic ? (
        getIconByName('logo', { h: '40px' })
      ) : (
        <Heading letterSpacing={-1}>RAWAA</Heading>
      )}
    </Link>
  );
};
