import { HStack, Skeleton } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { NavLink } from './NavLink';
import { AuthContext } from '../../../store/AuthContext';
import { useFetchById } from '../../../hooks/useFetchById';

export const Navbar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang } = useContext(AuthContext);

  const { isLoading, data: categories } = useFetchById({
    lang,
    id: 'all',
    key: 'categories',
  });

  useEffect(() => {
    if (id) return;
    if (categories) {
      navigate(`/menu/${categories[0].id}`);
    }
  });

  return (
    <Skeleton isLoaded={!isLoading}>
      <HStack as="nav" h="50px" w="95vw" spacing={5} overflowX="hidden">
        {categories?.map(item => (
          <NavLink
            key={item.id}
            name={item.title}
            to={`/menu/${item.id}`}
            isActive={+id === item.id}
          />
        ))}
      </HStack>
    </Skeleton>
  );
};
