import { Container } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import { Header } from './components/layout/Header/Header';
import { Footer } from './components/layout/Footer/Footer';

import { useFetchById } from './hooks/useFetchById';
import { AuthContext } from './context/AuthContext';

import { ScrollToTopWrapper } from './components/UI/ScrollToTopWrapper';

import { CartActions } from './context/CartSlice';
import { Checkout } from './pages/Checkout/Checkout';
import { NotFound } from './pages/NotFound';
import { Details } from './pages/Details/Details';
import { Meals } from './pages/Meals/Meals';
import { Home } from './pages/Home/Home';
import { User } from './pages/User/User';

let isInitial = true;

export default function App() {
  const dispatch = useDispatch();
  const { token, isLoggedIn, lang } = useContext(AuthContext);

  const { data: cartItems } = useFetchById({
    lang,
    key: 'cart',
    id: token.user?.id,
  });

  useEffect(() => {
    isInitial = true;
  }, [lang, isLoggedIn]);

  useEffect(() => {
    if (!isInitial) return;
    if (cartItems) {
      isInitial = false;
      dispatch(CartActions.replaceCartItems({ cartItems }));
    }
  }, [dispatch, cartItems]);

  return (
    <ScrollToTopWrapper>
      <Header />
      <Container
        as="main"
        p={0}
        my="60px"
        minW="full"
        minH="100vh"
        overflowX="hidden"
      >
        <Routes>
          {!isLoggedIn && <Route path="user" element={<User />} />}
          <Route path="/" element={<Home />} />
          <Route path="menu">
            <Route index element={<Meals />} />
            <Route path=":id" element={<Meals />} />
          </Route>
          <Route path="meal">
            <Route path=":id" element={<Details />} />
          </Route>
          <Route path="checkout" element={<Checkout />} />
          <Route path="not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </ScrollToTopWrapper>
  );
}
