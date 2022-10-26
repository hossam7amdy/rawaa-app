import { Flex, Skeleton } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { NavLink } from './NavLink';
import { AuthContext } from '../../../store/AuthContext';
import { useFetchById } from '../../../hooks/useFetchById';

export const Navbar = ({ ignore }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang } = useContext(AuthContext);

  const { isLoading, data: categories } = useFetchById({
    lang,
    id: 'all',
    key: 'categories',
  });

  useEffect(() => {
    if (id || ignore) return;
    if (categories) {
      navigate(`/menu/${categories[0].id}`);
    }
  });

  return (
    <Skeleton isLoaded={!isLoading}>
      <Flex
        as="nav"
        my={4}
        gap={4}
        overflowX="hidden"
        w={{ base: 'max-content', lg: '100vw' }}
        flexDir={{ base: 'column', lg: 'row' }}
      >
        {categories?.map(item => (
          <NavLink
            key={item.id}
            name={item.title}
            to={`/menu/${item.id}`}
            isActive={+id === item.id}
          />
        ))}
      </Flex>
    </Skeleton>
  );
};
