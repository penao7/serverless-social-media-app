import React from 'react';

interface PostImageProps {
  url: string;
}

const PostImage: React.FC<PostImageProps> = ({ url }: PostImageProps) => {
  return <img className='postImage' src={`${url}`} />;
};

export default PostImage;
