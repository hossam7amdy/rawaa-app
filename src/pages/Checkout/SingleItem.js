import {
  Flex,
  Text,
  Image,
  Stack,
  VStack,
  Heading,
  ListItem,
  AspectRatio,
} from '@chakra-ui/react';
import { useContext } from 'react';

import { AuthContext } from '../../store/AuthContext';
import {
  CURRENCY_FORMATER,
  DATE_FORMATER,
  NUMBER_FORMATER,
} from '../../utils/helpers';

export const SingleItem = ({ title, image, quantity, amount, createOn }) => {
  const { token } = useContext(AuthContext);
  const { locale } = token;
  const { item } = token.translation.checkout;

  return (
    <ListItem bg="gray.50" rounded="md" p={2}>
      <Flex gap={5}>
        <VStack spacing={0}>
          <AspectRatio ratio={1} w={20}>
            <Image src={image} />
          </AspectRatio>
          <Text color="gray.600">
            {NUMBER_FORMATER(locale, quantity)} {item}
          </Text>
        </VStack>
        <Stack w="full">
          <Heading size="md">{title}</Heading>
          <Text as="b">{CURRENCY_FORMATER(locale, amount)}</Text>
          <Text as="b" color="green">
            {DATE_FORMATER(locale, createOn)}
          </Text>
        </Stack>
      </Flex>
    </ListItem>
  );
};
