import { Flex } from '@chakra-ui/react';

import { LogoSection } from './LogoSection';
import { ExploreSection } from './ExploreSection';
import { FeaturesSection } from './FeaturesSection';
import { ComunicationSection } from './ComunicationSection';

export const Footer = () => {
  return (
    <Flex as="footer" pt={5} pb={10} h="200px" bg="secondary.50">
      <LogoSection />
      <ExploreSection />
      <ComunicationSection />
      <FeaturesSection />
    </Flex>
  );
};
