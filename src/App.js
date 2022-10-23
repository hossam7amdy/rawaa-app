import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import { useFetchById } from './hooks/useFetchById';
import { AuthContext } from './store/AuthContext';

import { CartActions } from './store/CartSlice';
import { Checkout } from './pages/Checkout/Checkout';
import { NotFound } from './pages/NotFound';
import { Profile } from './pages/Profile/Profile';
import { Details } from './pages/Details/Details';
import { Layout } from './components/layout/Layout';
import { Meals } from './pages/Meals/Meals';
import { Home } from './pages/Home/Home';
import { User } from './pages/User/User';

export default function App() {
  const dispatch = useDispatch();
  const { token, isLoggedIn, lang } = useContext(AuthContext);
  const { data } = useFetchById({ lang, key: 'cart', id: token.user?.id });

  useEffect(() => {
    if (data) {
      dispatch(CartActions.replaceCartItems(data));
    }
  }, [dispatch, data]);

  return (
    <Layout>
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
        <Route path="profile" element={<Profile />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
