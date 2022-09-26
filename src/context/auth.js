import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import translationAR from '../locale/ar.json';
import translationEN from '../locale/en.json';

export const AuthContext = createContext({
  token: { user: '', locale: '', translation: '' },
  login: user => {},
  logout: () => {},
  setLocale: locale => {},
});

const getTranslation = locale => {
  if (locale === 'ar-EG') {
    return translationAR;
  }
  if (locale === 'en-US') {
    return translationEN;
  }

  // default
  return translationAR;
};

const retriveStoredToken = () => {
  const storedUser = localStorage.getItem('userToken');
  const storedLocale = localStorage.getItem('localeToken');

  return {
    user: storedUser,
    locale: storedLocale || 'ar-EG',
    translation: getTranslation(storedLocale),
  };
};

const AuthProvider = props => {
  const navigate = useNavigate();
  const storedToken = retriveStoredToken();
  const initialToken = storedToken;
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token?.user;

  const loginHandler = user => {
    // TODO: use logout timer
    setToken(prevState => {
      return {
        user,
        locale: prevState.locale,
        translation: prevState.translation,
      };
    });
    localStorage.setItem('userToken', user);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('userToken');
    navigate('/', { replace: true });
  };

  const setLocaleHandler = locale => {
    setToken(prevState => {
      return {
        locale,
        user: prevState?.user,
        translation: getTranslation(locale),
      };
    });

    localStorage.setItem('localeToken', locale);
  };

  const authContext = {
    token,
    isLoggedin: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    setLocale: setLocaleHandler,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
