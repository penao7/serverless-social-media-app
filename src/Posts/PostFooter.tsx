import React from 'react';

interface PostFooterProps {
  id: string;
  showComments: () => void;
  handleLike: (id: string) => void;
  commentsVisible: boolean;
}

const PostFooter: React.FC<PostFooterProps> = ({ id, showComments, handleLike, commentsVisible }: PostFooterProps) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '4px', marginTop: commentsVisible ? 4 : 0 }}>
      <div style={{ marginRight: 10 }}>
        <button onClick={() => handleLike(id)}>LIKE</button>
      </div>
      <div>
        <button onClick={showComments}>COMMENTS</button>
      </div>
    </div>
  );
};

export default PostFooter;