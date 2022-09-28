import { Flex, Heading, Image } from '@chakra-ui/react';

import { PATH } from '../../utils/config';

export const CategoryItem = ({ item }) => {
  return (
    <Flex
      as="li"
      shadow="md"
      boxSize={48}
      rounded="md"
      justify="center"
      align="center"
      cursor="pointer"
      pos="relative"
      overflow="hidden"
    >
      <Heading
        as="b"
        pt={5}
        top={0}
        left={0}
        w="full"
        h="full"
        size="md"
        margin="auto"
        display="flex"
        pos="absolute"
        justifyContent="center"
      >
        {item.title}
      </Heading>
      <Image
        fit="cover"
        rounded="md"
        boxSize="full"
        zIndex={2}
        src={PATH.FILE + item.image}
        alt={item.title}
        _hover={{
          opacity: '30%',
          transform: 'scale(1.1)',
          transition: 'opacity 250ms ease-in-out 0s',
        }}
        fallbackSrc="https://via.placeholder.com/150"
      />
    </Flex>
  );
};
