import React from 'react';
import './post.scss';

interface PostHeaderProps {
  user: string;
  id: string;
  postKey: string;
  deletePost: (id: string, key: string) => void;
}

const PostHeader: React.FC<PostHeaderProps> = ({
  user,
  id,
  postKey,
  deletePost,
}: PostHeaderProps) => {
  return (
    <div
      className='postHeader'
    >
      {user}
      <button className='deletePost' onClick={() => deletePost(id, postKey)}>
        X
      </button>
    </div>
  );
};

export default PostHeader;
