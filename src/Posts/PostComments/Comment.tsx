import React from 'react';
import { Comment as CommentProps } from '../../Types';

const Comment: React.FC<CommentProps> = ({ id, user, message }: CommentProps) => {
  return (
    <div key={id} style={{ margin: 5 }}>
      <div style={{ fontWeight: 600 }}>{user}</div>
      <div>{message}</div>
    </div>
  );
};

export default Comment;