import { useContext, useState } from 'react';
import {
  List,
  Stack,
  Button,
  Heading,
  SkeletonText,
  useDisclosure,
} from '@chakra-ui/react';

import { NewAddressModal } from './NewAddressModal';
import { SCROLLBAR_STYLE } from '../../data/constants';
import { SingleAddress } from './SingleAddress';
import { useFetchById } from '../../hooks/useFetchById';
import { AuthContext } from '../../context/AuthContext';

export const AddressList = ({ onAddressId }) => {
  const [addressId, setAddressId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { lang, token } = useContext(AuthContext);
  const { isLoading, data: addressList } = useFetchById({
    lang,
    key: 'address',
    id: token.user.id,
  });

  const setAddressIdHandler = id => {
    onAddressId(id);
    setAddressId(id);
  };

  const { addressBtn, address } = token.translation.checkout;

  return (
    <Stack h="full" w="60vw" align="start" p={4}>
      <NewAddressModal isOpen={isOpen} onClose={onClose} />
      <Heading size="md">{address}</Heading>

      <Stack as={List} w="full" h="full" overflowY="auto" sx={SCROLLBAR_STYLE}>
        <SkeletonText
          spacing={3}
          noOfLines={3}
          fadeDuration={1}
          isLoaded={!isLoading}
        >
          {addressList?.map(address => (
            <SingleAddress
              id={address.id}
              key={address.id}
              city={address.city}
              notes={address.notes}
              shortName={address.shortName}
              governorate={address.governorate}
              isActive={address.id === addressId}
              onClick={() => setAddressIdHandler(address.id)}
            />
          ))}
        </SkeletonText>
      </Stack>

      <Button color="brand.600" variant="unstyled" onClick={onOpen}>
        {addressBtn}
      </Button>
    </Stack>
  );
};
