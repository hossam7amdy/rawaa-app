import React, { useContext } from 'react';
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';

import { AuthContext } from '../../context/auth';
import { getIconByName } from '../../utils/IconsFactory';

export const SearchBox = () => {
  const { token } = useContext(AuthContext);
  const isArabic = token.locale === 'ar-EG';
  const { header } = token.translation;

  return (
    <InputGroup>
      {!isArabic && (
        <InputLeftElement
          pointerEvents="none"
          children={getIconByName('search')}
        />
      )}
      <Input
        pr={8}
        rounded="md"
        type="search"
        name="search"
        placeholder={header.search.placeholder}
      />
      {isArabic && (
        <InputRightElement
          pointerEvents="none"
          children={getIconByName('search')}
        />
      )}
    </InputGroup>
  );
};
