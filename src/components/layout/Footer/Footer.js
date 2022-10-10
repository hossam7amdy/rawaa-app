import { Flex } from '@chakra-ui/react';

import { LogoSection } from './LogoSection';
import { ExploreSection } from './ExploreSection';
import { FeaturesSection } from './FeaturesSection';
import { ComunicationSection } from './ComunicationSection';

export const Footer = () => {
  return (
    <>
      <Flex
        pt={5}
        pb={10}
        mt={14}
        h="200px"
        as="footer"
        bg="brand.200"
        color="blackAlpha.700"
      >
        {/* section 1 */}
        <LogoSection />

        {/* section 2 */}
        <ExploreSection />
        {/* section 3 */}
        <ComunicationSection />

        {/* section 4 */}
        <FeaturesSection />
      </Flex>
    </>
  );
};
