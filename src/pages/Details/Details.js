import { useNavigate, useParams } from 'react-router-dom';
import {
  Text,
  Flex,
  Image,
  Radio,
  VStack,
  Spacer,
  Select,
  HStack,
  Button,
  Heading,
  Skeleton,
  FormLabel,
  Container,
  IconButton,
  RadioGroup,
  FormControl,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useContext, useEffect, useReducer, useState } from 'react';

import { CURRENCY_FORMATER, DISCOUNT_CALCULATOR } from '../../utils/helpers';
import { PATH, SIZE_PRICE_MAPPER } from '../../data/constants';
import { useFetchById } from '../../hooks/useFetchById';
import { AuthContext } from '../../context/AuthContext';
import { CartActions } from '../../context/CartSlice';
import QuantityButton from './QuantityButton';
import useMutateData from '../../hooks/useMutateData';
import { Icon } from '../../components/UI/Icons';

const initialState = {
  size: 1,
  price: 0,
  taste: '1', // coz Radio like it as a string
  quantity: 1,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SIZE':
      return { ...state, size: action.value };
    case 'PRICE':
      return { ...state, price: action.value };
    case 'TASTE':
      return { ...state, taste: action.value };
    case 'QUANTITY':
      return { ...state, quantity: action.value };
    default:
      return initialState;
  }
};

export const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFavorite, toggleIsFavorite] = useState(false);
  const { token, isLoggedIn, lang } = useContext(AuthContext);
  const [orderState, dispatchOrder] = useReducer(reducer, initialState);

  const locale = token.locale;
  const translation = token.translation.productDetails;
  const productId = id.split('-')[1];

  const { mutate } = useMutateData({ key: 'cart' });
  const {
    isError,
    isLoading,
    data: product,
  } = useFetchById({
    lang,
    key: 'product',
    id: productId,
  });

  useEffect(() => {
    if (isError || !productId) {
      navigate('/not-found', { replace: true });
    }
  }, [isError, productId, navigate]);

  useEffect(() => {
    if (product) {
      dispatchOrder({
        type: 'PRICE',
        value: product[SIZE_PRICE_MAPPER[orderState.size]],
      });
    }
  }, [product, orderState.size]);

  const orderSubmitHandler = () => {
    const price = DISCOUNT_CALCULATOR(orderState.price, product.discountValue);
    const createOn = new Date();

    const itemData = {
      price,
      drinkId: 1,
      title: product.title,
      image: product.image,
      size: orderState.size,
      productId: product.id,
      taste: orderState.taste,
      customerId: token.user.id,
      createOn: createOn.toISOString(),
      quantity: orderState.quantity,
      amount: price * orderState.quantity,
    };

    dispatch(CartActions.addItemToCart(itemData));

    const config = { method: 'post', data: itemData };
    mutate(config);
  };

  return (
    <Skeleton isLoaded={!isLoading} fadeDuration={1}>
      <Container
        mt={10}
        as={Flex}
        minH="70vh"
        minW="container.lg"
        justifyContent="space-around"
      >
        <Flex flexDir="column" gap={5}>
          <Heading>{product?.title}</Heading>
          <Text as="i" fontSize="sm">
            {product?.calories} {translation.kcal}
          </Text>

          <HStack>
            <Text
              as={product?.discountValue ? 'del' : 'b'}
              fontSize={product?.discountValue ? 'sm' : 'lg'}
            >
              {CURRENCY_FORMATER(locale, orderState.price)}
            </Text>
            {product?.discountValue && (
              <Text as="b" fontSize="lg">
                {CURRENCY_FORMATER(
                  locale,
                  DISCOUNT_CALCULATOR(orderState.price, product?.discountValue)
                )}
              </Text>
            )}
          </HStack>

          <FormControl as={VStack} align="start" spacing={-2}>
            <FormLabel fontSize="xs">{translation.sizeLabel}</FormLabel>
            <Select
              dir="ltr"
              onChange={event =>
                dispatchOrder({ type: 'SIZE', value: +event.target.value })
              }
            >
              <option value={1}>{translation.sizeMapper[0]}</option>
              {product?.mediumSizePrice && (
                <option value={2}>{translation.sizeMapper[1]}</option>
              )}
              {product?.bigSizePrice && (
                <option value={3}>{translation.sizeMapper[2]}</option>
              )}
            </Select>
          </FormControl>

          <RadioGroup
            colorScheme="brand"
            value={orderState.taste}
            onChange={value => dispatchOrder({ type: 'TASTE', value })}
          >
            <HStack>
              <Radio value="1">{translation.tasteMapper[0]}</Radio>
              {product?.hasTaste > 0 && (
                <Radio value="2">{translation.tasteMapper[1]}</Radio>
              )}
            </HStack>
          </RadioGroup>

          <FormControl as={VStack} align="start" spacing={-2}>
            <FormLabel fontSize="xs">{translation.quantityLabel}</FormLabel>
            <QuantityButton
              min={1}
              max={15}
              defaultValue={1}
              onChange={value =>
                dispatchOrder({ type: 'QUANTITY', value: +value })
              }
            />
          </FormControl>

          <HStack w="full">
            <Button
              variant="brand"
              isDisabled={
                !isLoggedIn || orderState.price * orderState.quantity > 999
              }
              onClick={orderSubmitHandler}
            >
              {translation.button}
            </Button>
            <IconButton
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
            <Spacer />
            <Text as="b">
              {CURRENCY_FORMATER(
                locale,
                orderState.price * orderState.quantity
              )}
            </Text>
          </HStack>
        </Flex>

        <Image
          fit="cover"
          shadow="md"
          rounded="md"
          boxSize="md"
          alt={product?.title}
          src={product ? PATH.FILE + product.image : ''}
          fallbackSrc="https://via.placeholder.com/150"
        />
      </Container>
    </Skeleton>
  );
};
