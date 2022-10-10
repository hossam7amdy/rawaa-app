import { Container } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useContext, useEffect, useState } from 'react';

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

export default function App() {
  const dispatch = useDispatch();
  const qty = useSelector(state => state.cart.totalQuantity);
  const [langIsChanged, setLangIsChanged] = useState(null);
  const { token, isLoggedIn, lang } = useContext(AuthContext);

  const hasItems = qty !== 0;

  const { data: cartItems } = useFetchById({
    lang,
    key: 'cart',
    id: token.user?.id,
  });

  useEffect(() => {
    if (cartItems && lang !== langIsChanged) {
      setLangIsChanged(lang);
      dispatch(CartActions.replaceCartItems({ cartItems }));
    }
  }, [cartItems, dispatch, langIsChanged, lang]);

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
          {hasItems && <Route path="checkout" element={<Checkout />} />}
          <Route path="not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </ScrollToTopWrapper>
  );
}
