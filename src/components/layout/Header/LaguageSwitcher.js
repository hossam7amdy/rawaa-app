import { Button, Flex } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';

import { AuthContext } from '../../../context/AuthContext';

export const LaguageSwitcher = () => {
  const { lang, setLocale } = useContext(AuthContext);
  const isArabic = lang === 'ar';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
  }, [isArabic, lang]);

  return (
    <Flex align="center" h={7} bg="brand.600" p={1} rounded="lg">
      <Button
        size="xs"
        rounded="lg"
        bg="brand.600"
        color="current"
        fontSize="10px"
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
        fontSize="10px"
        colorScheme="brand"
        isActive={isArabic}
        _hover={{ backgroundColor: 'brand.500' }}
        _active={{ backgroundColor: 'brand.500' }}
        onClick={() => setLocale('ar-EG')}
      >
        عربى
      </Button>
    </Flex>
  );
};
