import { useContext, useState } from 'react';
import { Heading, VStack, Link, useDisclosure, Button } from '@chakra-ui/react';

import { Modal } from '../../UI/Modal';
import { AuthContext } from '../../../context/AuthContext';

export const ExploreSection = () => {
  const [modalData, setModalData] = useState();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { token } = useContext(AuthContext);
  const { footer, closeBtn, privacy, termsConditions } = token.translation;

  const handleClick = data => {
    onOpen();
    setModalData(data);
  };

  const modalFooter = (
    <Button variant="outline" colorScheme="brand" onClick={onClose}>
      {closeBtn}
    </Button>
  );

  return (
    <>
      <Modal
        {...modalData}
        isOpen={isOpen}
        onClose={onClose}
        footer={modalFooter}
        size="lg"
      />
      <VStack flex={1}>
        <VStack h="full" align="start">
          <Heading size="sm">{footer.explore}</Heading>
          <VStack h="full" justify="space-evenly" align="start">
            <Link
              fontSize="xs"
              fontWeight="bold"
              onClick={() => handleClick({ header: footer.ourPromise })}
            >
              {footer.ourPromise}
            </Link>
            <Link
              fontSize="xs"
              fontWeight="bold"
              onClick={() => handleClick({ header: footer['about-us'] })}
            >
              {footer['about-us']}
            </Link>
            <Link
              fontSize="xs"
              fontWeight="bold"
              onClick={() =>
                handleClick({ header: footer.policy, body: privacy })
              }
            >
              {footer.policy}
            </Link>
            <Link
              fontSize="xs"
              fontWeight="bold"
              onClick={() =>
                handleClick({
                  header: footer.conditions,
                  body: termsConditions,
                })
              }
            >
              {footer.conditions}
            </Link>
          </VStack>
        </VStack>
      </VStack>
    </>
  );
};
