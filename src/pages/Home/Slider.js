import {
  Flex,
  Text,
  Image,
  Button,
  HStack,
  VStack,
  Heading,
  IconButton,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

// images
import slide1 from '../../assets/slide-1.png';
import slide2 from '../../assets/slide-2.png';
import slide3 from '../../assets/slide-3.jpg';
import slide4 from '../../assets/slide-4.jpg';
import slide5 from '../../assets/slide-5.jpg';

import { Icon } from '../../components/UI/Icons';
import { AndroidBadge } from '../../components/UI/AndroidBadge';

const slidesData = [
  {
    id: 1,
    img: slide1,
    title: 'A healthy meal delivered to your door, every single day',
    desc: 'The smart 365-days-per-year food subscription that will make you eat healthy again. Tailored to your personal tastes and nutritional needs.',
    btn: (
      <Button variant="brand" size="lg">
        Start Eating Well
      </Button>
    ),
  },
  {
    id: 2,
    img: slide2,
    title: 'On the Go',
    desc: 'The smart 365-days-per-year food subscription that will make you eat healthy again. Tailored to your personal tastes and nutritional needs.',
    btn: <AndroidBadge w="250px" opacity="85%" />,
  },
  {
    id: 3,
    img: slide3,
    title: '',
    desc: '',
    btn: '',
  },
  {
    id: 4,
    img: slide4,
    title: '',
    desc: '',
    btn: '',
  },
  {
    id: 5,
    img: slide5,
    title: '',
    desc: '',
    btn: '',
  },
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
      h="100vh"
      dir="ltr"
      position="relative"
      overflow="hidden"
      bg="brand.50"
    >
      <IconButton
        top={0}
        bottom={0}
        zIndex={100}
        margin="auto"
        rounded="full"
        variant="ghost"
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
          <Flex w="100vw" key={item.id}>
            <Flex flex={1} justify="center" align="center">
              <Image
                h="95vh"
                rounded="md"
                loading="lazy"
                src={item.img}
                objectFit="cover"
                fallbackSrc="https://via.placeholder.com/150"
              />
            </Flex>
            {item.title && (
              <VStack flex={1} justify="center" spacing={10} pr={20}>
                <Heading size="3xl" letterSpacing={-0.5}>
                  {item.title}
                </Heading>
                <Text fontSize="xl">{item.desc}</Text>
                <HStack>{item.btn}</HStack>
              </VStack>
            )}
          </Flex>
        ))}
      </Flex>

      <IconButton
        top={0}
        right={0}
        bottom={0}
        margin="auto"
        rounded="full"
        variant="ghost"
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
