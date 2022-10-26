import { useState } from 'react';
import { IconButton } from '@chakra-ui/react';

import { Icon } from '../../components/UI/Icons';

export const FavoriteButton = () => {
  const [isFavorite, toggleIsFavorite] = useState(false);

  return (
    <IconButton
      aria-label="favorite"
      variant="outline"
      colorScheme="brand"
      icon={
        isFavorite ? (
          <Icon name="favFilled" color="red.500" />
        ) : (
          <Icon name="fav" />
        )
      }
      onClick={() => toggleIsFavorite(prev => !prev)}
    />
  );
};
