import React from 'react';

interface PostImageProps {
  url: string;
}

const PostImage: React.FC<PostImageProps> = ({ url }: PostImageProps) => {
  return (
    <img src={`${url}`} />
  );
};

export default PostImage;