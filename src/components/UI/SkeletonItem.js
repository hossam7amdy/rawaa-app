import { Stack, HStack, Skeleton, SkeletonText, Box } from '@chakra-ui/react';

export const SkeletonItem = ({ isLoading, children, ...props }) => {
  return (
    <Box position="relative" {...props}>
      <Box transition="all ease 1s" opacity={isLoading ? '0' : '1'}>
        {children}
      </Box>
      <Stack
        p={2}
        top={0}
        left={0}
        right={0}
        position="absolute"
        transition="all ease 1s"
        opacity={isLoading ? '1' : '0'}
      >
        <HStack>
          <Skeleton minW={20} h={20} rounded="md" />
          <SkeletonText w="full" spacing="4" noOfLines={3} />
        </HStack>
        <HStack>
          <Skeleton minW={20} h={20} rounded="md" />
          <SkeletonText w="full" spacing="4" noOfLines={3} />
        </HStack>
      </Stack>
    </Box>
  );
};
