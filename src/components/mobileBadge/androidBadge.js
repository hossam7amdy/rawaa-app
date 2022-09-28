import React, { useContext } from 'react';
import { Image } from '@chakra-ui/react';

import badge from './google-play-badge.png';
import badgeAR from './google-play-badge-AR.png';
import { AuthContext } from '../../context/auth';

export const AndroidBadge = () => {
  const { token } = useContext(AuthContext);
  const isArabic = token.locale === 'ar-EG';

  return (
    <Image
      w="150px"
      loading="lazy"
      src={isArabic ? badgeAR : badge}
      alt="google-play-badge"
      cursor="pointer"
      _hover={{ opacity: '80%', transition: 'opacity 250ms ease-in-out 0s' }}
    />
  );
};
