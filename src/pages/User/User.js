import { useContext } from 'react';
import { Tab, Tabs, TabList, TabPanel, TabPanels } from '@chakra-ui/react';

import { Login } from './Login';
import { Register } from './Register';
import { AuthContext } from '../../store/AuthContext';

export const User = () => {
  const { token } = useContext(AuthContext);
  const { login, register } = token.translation.user;

  return (
    <Tabs
      mx={{ base: 2, md: 10 }}
      my={5}
      isFitted
      rounded="md"
      bg="gray.50"
      variant="enclosed"
      colorScheme="secondary"
    >
      <TabList mb="1em">
        <Tab>{login}</Tab>
        <Tab>{register}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Login />
        </TabPanel>
        <TabPanel>
          <Register />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
