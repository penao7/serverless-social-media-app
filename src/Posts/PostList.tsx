import React from 'react';
import { Payload } from '../Types';
import Post from './Post';

type Props = {
  items: Payload[];
  handleLike: (id: string) => void;
  deletePost: (id: string, key: string) => void;
};

const PostList: React.FC<Props> = ({
  items,
  handleLike,
  deletePost,
}: Props) => {
  return (
    <>
      {items.map((item: Payload) => (
        <Post
          item={item}
          handleLike={handleLike}
          deletePost={deletePost}
          key={item.key}
        />
      ))}
    </>
  );
};

export default PostList;
