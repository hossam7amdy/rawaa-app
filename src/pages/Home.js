import React from 'react';
import { Box } from '@chakra-ui/react';

import { Header } from '../components/layout/Header';
import { Slider } from '../components/UI/Slider';
import { Categories } from '../components/categories/Categories';
import { MostOrdered } from '../components/products/MostOrdered';
import { Footer } from '../components/layout/Footer';
import { Navbar } from '../components/layout/Navbar';

const Home = () => {
  return (
    <Box>
      <Header />
      <Navbar />
      <Slider />
      <Categories />
      <MostOrdered />
      <Footer />
    </Box>
  );
};

export default Home;
