import { useContext } from 'react';
import { Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { Icon } from './Icons';
import { AuthContext } from '../../store/AuthContext';

export const Logo = ({ props }) => {
  const { lang } = useContext(AuthContext);
  const isArabic = lang === 'ar';

  return (
    <Link to="/">
      {isArabic ? (
        <Icon name="logo" w={24} h={14} {...props} />
      ) : (
        <Heading letterSpacing={-1}>RAWAA</Heading>
      )}
    </Link>
  );
};
