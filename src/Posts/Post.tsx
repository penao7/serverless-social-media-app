import React, { useState } from 'react';
import CommentBox from './PostComments/CommentBox';
import { Payload } from '../Types';
import PostStats from './PostStats';
import PostImage from './PostImage';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';

interface Props {
  item: Payload;
  handleLike: (id: string) => void;
  deletePost: (id: string, key: string) => void;
}

const Post: React.FC<Props> = ({ item, handleLike, deletePost }: Props) => {

  const [showComments, setShowComments] = useState<boolean>(false);

  const handleOpenComments = () => {
    setShowComments(!showComments);
  };

  return (
    <div key={item.id} className='post'>
      <PostHeader user={item.user} id={item.id} postKey={item.key} deletePost={deletePost} />
      <PostImage url={item.url} />
      <PostStats likes={item.likes} commentsTotal={item.comments.length} />
      {showComments && <CommentBox comments={item.comments} />}
      <PostFooter handleLike={handleLike} commentsVisible={showComments} showComments={handleOpenComments} id={item.id} />
    </div>

  );
};

export default Post;