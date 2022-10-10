import { useContext, useEffect } from 'react';
import { HStack, Link, Skeleton } from '@chakra-ui/react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

import { AuthContext } from '../../context/AuthContext';
import { useFetchData } from '../../hooks/useFetchData';

export const Navbar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang } = useContext(AuthContext);

  const { isLoading, data: categories } = useFetchData({
    lang,
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
          <Link
            key={item.id}
            as={NavLink}
            to={`/menu/${item.id}`}
            fontWeight="bold"
            borderBottom={+id === item.id ? '2px' : ''}
            borderColor={+id === item.id ? 'brand.500' : ''}
            color={+id === item.id ? 'current' : 'gray'}
            _hover={{
              borderBottom: '2px',
              borderColor: 'brand.500',
            }}
          >
            {item.title}
          </Link>
        ))}
      </HStack>
    </Skeleton>
  );
};
