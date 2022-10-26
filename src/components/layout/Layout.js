import React from 'react';
import { Container, useMediaQuery } from '@chakra-ui/react';

import { ScrollToTopWrapper } from '../UI/ScrollToTopWrapper';

import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import { MobileHeader } from './Header/MobileHeader';

export const Layout = ({ children }) => {
  const [isMobile] = useMediaQuery('(max-width: 905px)');

  return (
    <ScrollToTopWrapper>
      {isMobile ? <MobileHeader /> : <Header />}
      <Container
        as="main"
        p={0}
        minW="100vw"
        minH="70vh"
        overflowX="hidden"
        my={isMobile ? '0' : '70px'}
      >
        {children}
      </Container>
      <Footer />
    </ScrollToTopWrapper>
  );
};
