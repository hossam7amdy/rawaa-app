import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Text,
  Flex,
  Image,
  HStack,
  Heading,
  ListItem,
  IconButton,
} from '@chakra-ui/react';

import { CURRENCY_FORMATER, DISCOUNT_CALCULATOR } from '../../utils/helpers';
import { CartActions } from '../../store/CartSlice';
import { AuthContext } from '../../store/AuthContext';
import useMutateData from '../../hooks/useMutateData';
import { PATH } from '../../data/constants';
import { Icon } from '../../components/UI/Icons';

export const MealItem = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { request } = useMutateData({ key: 'cart' });
  const { token, isLoggedIn } = useContext(AuthContext);
  const { locale } = token;
  const isArabic = locale === 'ar-EG';
  const rounded = isArabic ? { roundedEnd: 'md' } : { roundedStart: 'md' };

  const orderSubmitHandler = () => {
    const createOn = new Date();
    const price = DISCOUNT_CALCULATOR(item.smallSizePrice, item.discountValue);

    const data = {
      ...item,
      price,
      size: 1,
      taste: 1,
      drinkId: 1,
      quantity: 1,
      amount: price,
      productId: item.id,
      createOn: createOn.toISOString(),
      customerId: token.user.id,
    };

    request({ method: 'post', data });
    dispatch(CartActions.addItemToCart(data));
  };

  return (
    <Flex
      as={ListItem}
      w={{ base: 'full', md: '2xs' }}
      shadow="md"
      rounded="md"
    >
      <Flex flex={1}>
        <Image
          fit="cover"
          {...rounded}
          boxSize="full"
          cursor="pointer"
          alt={item?.title}
          src={PATH.FILE + item?.image}
          fallbackSrc="https://via.placeholder.com/150"
          onClick={() => navigate(`/meal/${item.title}-${item.id}`)}
        />
      </Flex>
      <Flex
        flex={1}
        p={2}
        align="start"
        flexDir="column"
        justify={{ base: 'space-evenly', md: 'space-between' }}
      >
        <Heading size="md">{item.title}</Heading>
        <Text fontWeight="medium" fontSize={{ base: 'md', md: 'xl' }}>
          {CURRENCY_FORMATER(locale, item.smallSizePrice)}
        </Text>
        <HStack>
          <IconButton
            variant="brand"
            aria-label="cart icon"
            size={{ base: 'sm', md: 'md' }}
            icon={<Icon name="cart" />}
            isDisabled={!isLoggedIn}
            onClick={orderSubmitHandler}
          />
          <IconButton
            variant="brand"
            aria-label="view icon"
            size={{ base: 'sm', md: 'md' }}
            icon={<Icon name="view" />}
            onClick={() => navigate(`/meal/${item.title}-${item.id}`)}
          />
        </HStack>
      </Flex>
    </Flex>
  );
};
