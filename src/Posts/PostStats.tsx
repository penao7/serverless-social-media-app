import React from 'react';

interface PostStatsProps {
  likes: number;
  commentsTotal: number;
}

const PostStats: React.FC<PostStatsProps> = ({
  likes,
  commentsTotal,
}: PostStatsProps) => {
  return (
    <div className='postStats'>
      <div>{`Likes: ${likes}`}</div>
      <div>{`Comments: ${commentsTotal}`}</div>
    </div>
  );
};

export default PostStats;
