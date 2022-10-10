import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Container,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

import { Login } from './Login';
import { Register } from './Register';

export const User = () => {
  const { token } = useContext(AuthContext);
  const { login, register } = token.translation.user;

  return (
    <Container bg="gray.50" rounded="md" my={20}>
      <Tabs isFitted colorScheme="brand" align="end">
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
