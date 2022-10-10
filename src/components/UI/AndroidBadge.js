import { useContext } from 'react';
import { Image } from '@chakra-ui/react';

import badge from '../../assets/google-play-badge.png';
import badgeAR from '../../assets/google-play-badge-AR.png';
import { AuthContext } from '../../context/AuthContext';

export const AndroidBadge = props => {
  const { token } = useContext(AuthContext);
  const isArabic = token.locale === 'ar-EG';

  return (
    <Image
      w="150px"
      loading="lazy"
      cursor="pointer"
      alt="google-play-badge"
      src={isArabic ? badgeAR : badge}
      _hover={{ opacity: '75%', transition: 'opacity 250ms ease-in-out 0s' }}
      {...props}
    />
  );
};
