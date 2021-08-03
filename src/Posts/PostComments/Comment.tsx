import React from 'react';
import { Comment as CommentProps } from '../../Types';
import './comments.scss';

const Comment: React.FC<CommentProps> = ({
  id,
  user,
  message,
}: CommentProps) => {
  return (
    <div key={id} style={{ margin: 5 }}>
      <div className='commentUser'>{user}</div>
      <div>{message}</div>
    </div>
  );
};

export default Comment;
