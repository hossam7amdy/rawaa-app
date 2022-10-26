import { useEffect, useState } from 'react';
import { Flex, Image, IconButton } from '@chakra-ui/react';

// images
import slide1 from '../../assets/slide-1.jpg';
import slide2 from '../../assets/slide-2.jpg';
import slide3 from '../../assets/slide-3.jpg';

import { Icon } from '../../components/UI/Icons';

const slidesData = [
  { id: 1, img: slide1 },
  { id: 2, img: slide2 },
  { id: 3, img: slide3 },
];

export const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const slideSize = slidesData.length - 1;

  function btnClickHandler(direction) {
    if (direction === 'left') {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : slideSize);
    } else {
      setSlideIndex(slideIndex < slideSize ? slideIndex + 1 : 0);
    }
  }

  useEffect(() => {
    const toggle = setInterval(() => {
      btnClickHandler('left');
    }, 5000);

    return () => clearInterval(toggle);
  });

  return (
    <Flex
      as="section"
      dir="ltr"
      maxH="100vh"
      position="relative"
      overflow="hidden"
      bg="secondary.50"
    >
      <IconButton
        top={0}
        bottom={0}
        zIndex={100}
        margin="auto"
        rounded="full"
        variant="ghost"
        aria-label="arrowLeft"
        color="brand.500"
        position="absolute"
        colorScheme="blackAlpha"
        onClick={() => btnClickHandler('left')}
      >
        {<Icon name="arrowLeft" boxSize={12} />}
      </IconButton>

      <Flex
        color="blackAlpha.800"
        transition="all ease 1s"
        transform={`translateX(${slideIndex * -100}vw)`}
      >
        {slidesData.map(item => (
          <Image
            key={item.id}
            w="full"
            fit="cover"
            loading="lazy"
            src={item.img}
            alt="slide image"
            fallbackSrc="https://via.placeholder.com/150"
          />
        ))}
      </Flex>

      <IconButton
        top={0}
        right={0}
        bottom={0}
        margin="auto"
        rounded="full"
        variant="ghost"
        aria-label="arrowLeft"
        color="brand.500"
        position="absolute"
        colorScheme="blackAlpha"
        onClick={() => btnClickHandler('right')}
      >
        {<Icon name="arrowRight" boxSize={12} />}
      </IconButton>
    </Flex>
  );
};
