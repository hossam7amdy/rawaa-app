import { useContext } from 'react';
import { Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { Icon } from './Icons';
import { AuthContext } from '../../context/AuthContext';

export const Logo = () => {
  const { lang } = useContext(AuthContext);
  const isArabic = lang === 'ar';

  return (
    <Link to="/">
      {isArabic ? (
        <Icon name="logo" />
      ) : (
        <Heading letterSpacing={-1}>RAWAA</Heading>
      )}
    </Link>
  );
};
