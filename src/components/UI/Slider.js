import React, { useState } from 'react';
import { Flex, IconButton } from '@chakra-ui/react';

import { getIconByName } from '../../utils/IconsFactory';

const data = [{ id: 1 }, { id: 2 }, { id: 3 }];

export const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const btnClickHandler = direction => {
    if (direction === 'left') {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Flex
      h="50vh"
      dir="ltr"
      minW="full"
      bg="red.300"
      overflow="hidden"
      position="relative"
    >
      <IconButton
        top={0}
        bg="none"
        bottom={0}
        zIndex={2}
        left="10px"
        margin="auto"
        rounded="full"
        position="absolute"
        colorScheme="whiteAlpha"
        onClick={() => btnClickHandler('left')}
      >
        {getIconByName('arrowLeft', { boxSize: '50px' })}
      </IconButton>

      <Flex
        h="full"
        transition="all 1s ease"
        transform={`translateX(${slideIndex * -100}vw)`}
      >
        {data.map(item => (
          <Flex
            h="full"
            minW="100vw"
            key={item.id}
            justify="center"
            bg={`gray.${item.id * 100}`}
          ></Flex>
        ))}
      </Flex>

      <IconButton
        top={0}
        right="10px"
        bg="none"
        bottom={0}
        margin="auto"
        rounded="full"
        position="absolute"
        colorScheme="whiteAlpha"
        onClick={() => btnClickHandler('right')}
      >
        {getIconByName('arrowRight', { boxSize: '50px' })}
      </IconButton>
    </Flex>
  );
};
