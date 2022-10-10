import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { getIconByName } from '../../utils/IconsFactory';
import { AuthContext } from '../../context/AuthContext';
import { Heading } from '@chakra-ui/react';

export const Logo = () => {
  const { token } = useContext(AuthContext);
  const isArabic = token.locale === 'ar-EG';

  return (
    <Link to="/">
      {isArabic ? (
        getIconByName('logo', { h: '40px' })
      ) : (
        <Heading letterSpacing={-1}>RAWAA</Heading>
      )}
    </Link>
  );
};
