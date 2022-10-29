import { AspectRatio, Image } from '@chakra-ui/react';

export const ImagePreview = ({ src, alt, rounded, ...props }) => {
  return (
    <AspectRatio {...props}>
      <Image
        src={src}
        alt={alt}
        fit="cover"
        {...rounded}
        loading="lazy"
        rounded={rounded ? null : 'md'}
        fallbackSrc="https://via.placeholder.com/150"
      />
    </AspectRatio>
  );
};
