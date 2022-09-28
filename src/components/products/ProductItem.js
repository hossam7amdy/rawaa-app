import { Text, Image, VStack, HStack, IconButton } from '@chakra-ui/react';

import { getIconByName } from '../../utils/IconsFactory';

export const ProductItem = ({ item }) => {
  return (
    <HStack as="li" h={32} w={64} shadow="md" rounded="md">
      <Image
        fit="cover"
        boxSize={32}
        roundedRight="md"
        src={item?.src}
        alt={item?.title}
        fallbackSrc="https://via.placeholder.com/150"
      />
      <VStack align="start">
        <Text as="b" fontSize="xs">
          {item.title}
        </Text>
        <Text size="md" fontWeight="bold">
          125L.E
        </Text>
        <HStack>
          <IconButton variant="brand" size="sm" icon={getIconByName('cart')} />
          <IconButton variant="brand" size="sm" icon={getIconByName('view')} />
        </HStack>
      </VStack>
    </HStack>
  );
};
