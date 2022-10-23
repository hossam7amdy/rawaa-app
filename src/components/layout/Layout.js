import React from 'react';
import { Container } from '@chakra-ui/react';

import { ScrollToTopWrapper } from '../UI/ScrollToTopWrapper';

import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';

export const Layout = ({ children }) => {
  return (
    <ScrollToTopWrapper>
      <Header />
      <Container as="main" p={0} my="70px" minW="full" overflowX="hidden">
        {children}
      </Container>
      <Footer />
    </ScrollToTopWrapper>
  );
};
