import { useNavigate } from 'react-router-dom';
import { Flex, Image, ListItem, Text } from '@chakra-ui/react';
import { PATH } from '../../data/constants';

export const MenuItem = ({ item }) => {
  const navigate = useNavigate();

  return (
    <Flex
      as={ListItem}
      shadow="md"
      rounded="md"
      pos="relative"
      cursor="pointer"
      overflow="hidden"
      onClick={() => navigate(`/menu/${item.id}`)}
    >
      <Text
        as="b"
        pt={5}
        w="full"
        fontSize={20}
        pos="absolute"
        display="flex"
        justifyContent="center"
      >
        {item.title}
      </Text>
      <Image
        fit="cover"
        rounded="md"
        boxSize="sm"
        zIndex={2}
        src={PATH.FILE + item?.image}
        alt={item.title}
        _hover={{
          opacity: '30%',
          transform: 'scale(1.1)',
          transition: 'all 0.4s',
        }}
        fallbackSrc="https://via.placeholder.com/150"
      />
    </Flex>
  );
};
