import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Text, Image, VStack, HStack, IconButton } from '@chakra-ui/react';

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
    <HStack as="li" h={32} w={64} shadow="md" rounded="md">
      <Image
        fit="cover"
        {...rounded}
        boxSize={32}
        src={PATH.FILE + item?.image}
        alt={item?.title}
        fallbackSrc="https://via.placeholder.com/150"
      />
      <VStack align="start">
        <Text as="b" fontSize="xs">
          {item.title}
        </Text>
        <Text size="md" fontWeight="bold">
          {CURRENCY_FORMATER(locale, item.smallSizePrice)}
        </Text>
        <HStack>
          <IconButton
            variant="brand"
            size="sm"
            icon={<Icon name="cart" />}
            isDisabled={!isLoggedIn}
            onClick={orderSubmitHandler}
          />
          <IconButton
            variant="brand"
            size="sm"
            icon={<Icon name="view" />}
            onClick={() => navigate(`/meal/${item.title}-${item.id}`)}
          />
        </HStack>
      </VStack>
    </HStack>
  );
};
