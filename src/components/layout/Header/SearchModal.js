import { Input, HStack, Heading, Box } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useFetchById } from '../../../hooks/useFetchById';
import { ImagePreview } from '../../UI/ImagePreview';
import { AuthContext } from '../../../store/AuthContext';
import { PATH } from '../../../data/constants';
import { Modal } from '../../UI/Modal';

export const SearchModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const { token, lang } = useContext(AuthContext);

  const { search } = token.translation.header;

  const { data } = useFetchById({
    lang,
    key: 'search',
    id: searchQuery,
  });

  const content = data?.map(item => (
    <HStack
      key={item.id}
      p={2}
      my={2}
      rounded="md"
      bg="gray.100"
      cursor="pointer"
      justify="space-between"
      _hover={{ bg: 'brand.400' }}
      onClick={() => {
        onClose();
        setSearchQuery('');
        navigate(`/meal/${item.title}-${item.id}`);
      }}
    >
      <Heading size="md">{item.title}</Heading>
      <ImagePreview
        boxSize={12}
        src={PATH.FILE + item?.image}
        alt={item?.title}
      />
    </HStack>
  ));

  const header = (
    <Box pe={5}>
      <Input
        type="search"
        name="search"
        placeholder={search.placeholder}
        onChange={event => setSearchQuery(event.target.value)}
      />
    </Box>
  );
  return (
    <Modal header={header} body={content} isOpen={isOpen} onClose={onClose} />
  );
};
