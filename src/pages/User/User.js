import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Container,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from '../../store/AuthContext';

import { Login } from './Login';
import { Register } from './Register';

export const User = () => {
  const { token } = useContext(AuthContext);
  const { login, register } = token.translation.user;

  return (
    <Container minW="container.lg" mt={10} rounded="md">
      <Tabs
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
    </Container>
  );
};
