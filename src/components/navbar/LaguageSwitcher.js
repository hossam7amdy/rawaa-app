import React, { useContext } from 'react';
import { Button, HStack } from '@chakra-ui/react';

import { AuthContext } from '../../context/auth';

export const LaguageSwitcher = () => {
  const { token, setLocale } = useContext(AuthContext);
  const isArabic = token.locale === 'ar-EG';

  return (
    <HStack bg="brand.600" p={1} rounded="lg" spacing={0}>
      <Button
        size="xs"
        rounded="lg"
        bg="brand.600"
        color="current"
        colorScheme="brand"
        isActive={!isArabic}
        _hover={{ backgroundColor: 'brand.500' }}
        _active={{ backgroundColor: 'brand.500' }}
        onClick={() => setLocale('en-US')}
      >
        ENG
      </Button>
      <Button
        size="xs"
        rounded="lg"
        bg="brand.600"
        color="current"
        colorScheme="brand"
        isActive={isArabic}
        _hover={{ backgroundColor: 'brand.500' }}
        _active={{ backgroundColor: 'brand.500' }}
        onClick={() => setLocale('ar-EG')}
      >
        عربى
      </Button>
    </HStack>
  );
};
