import {
  List,
  Stack,
  Button,
  Heading,
  SkeletonText,
  useDisclosure,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';

import { NewAddressModal } from './NewAddressModal';
import { SingleAddress } from './SingleAddress';
import { useFetchById } from '../../hooks/useFetchById';
import { AuthContext } from '../../context/AuthContext';

export const AddressList = ({ onAddressId }) => {
  const [addressId, setAddressId] = useState(null);
  const [addressList, setAddressList] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { lang, token } = useContext(AuthContext);
  const { isLoading, data } = useFetchById({
    lang,
    key: 'address',
    id: token.user.id,
  });

  useEffect(() => {
    if (data) {
      setAddressList(data);
      onAddressId(data[0].id);
      setAddressId(data[0].id);
    }
  }, [data, onAddressId, setAddressId]);

  const setAddressIdHandler = id => {
    onAddressId(id);
    setAddressId(id);
  };

  const { addressBtn, address } = token.translation.checkout;

  return (
    <>
      <NewAddressModal isOpen={isOpen} onClose={onClose} />
      <Stack h="full" w="full" align="start">
        <Heading size="md">{address}</Heading>

        <Stack as={List} w="full" h="full">
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
    </>
  );
};
