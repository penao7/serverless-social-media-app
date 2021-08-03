import React from 'react';
import './post.scss';

interface PostFooterProps {
  id: string;
  showComments: () => void;
  handleLike: (id: string) => void;
}

const PostFooter: React.FC<PostFooterProps> = ({
  id,
  showComments,
  handleLike
}: PostFooterProps) => {
  return (
    <div
      className='postFooter'
    >
      <div className='likeButton'>
        <button onClick={() => handleLike(id)}>LIKE</button>
      </div>
      <div className='commentsButton'>
        <button onClick={showComments}>COMMENTS</button>
      </div>
    </div>
  );
};

export default PostFooter;
