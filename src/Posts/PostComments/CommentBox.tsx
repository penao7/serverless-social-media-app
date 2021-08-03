import React from 'react';
import { Comment as TypeComment } from '../../Types';
import Comment from './Comment';
import './comments.scss';

interface CommentBoxProps {
  comments: TypeComment[];
}

const CommentBox: React.FC<CommentBoxProps> = ({
  comments,
}: CommentBoxProps) => {
  return (
    <div
      className='commentBoxContainer'
    >
      {
        <div className='commentBox' style={{ margin: 5 }}>
          {comments?.map((comment) => (
            <Comment
              key={comment.id}
              id={comment.id}
              user={comment.user}
              message={comment.message}
            />
          ))}
        </div>
      }
    </div>
  );
};

export default CommentBox;
