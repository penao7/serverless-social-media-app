import React from 'react';

interface PostHeaderProps {
  user: string;
  id: string;
  postKey: string;
  deletePost: (id: string, key: string) => void;
}

const PostHeader: React.FC<PostHeaderProps> = ({ user, id, postKey, deletePost }: PostHeaderProps) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1vh' }}>
      {user}
      <button style={{ fontSize: 10 }} onClick={() => deletePost(id, postKey)}>X</button>
    </div>
  );
};

export default PostHeader;