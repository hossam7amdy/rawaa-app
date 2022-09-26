import * as React from 'react';
import { Container } from '@chakra-ui/react';

import Home from './pages/Home';
import { AuthContext } from './context/auth';

export default function App() {
  const { token } = React.useContext(AuthContext);
  const isArabic = token.locale === 'ar-EG';

  return (
    <Container minW="full" p={0} dir={isArabic ? 'rtl' : 'ltr'}>
      <Home />
    </Container>
  );
}
