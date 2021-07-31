import React, { useState } from 'react';
import axios from 'axios';
import { Payload } from '../Types';

type Props = {
  items: any;
  setItems: any
};

const PostList: React.FC<Props> = ({ items, setItems }: Props) => {

  const [showComments, setShowComments] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;

  const deletePhoto = async (key: string) => {
    try {
      await axios.delete(`${API_URL}/photos/${key}`);
    } catch (err) {
      console.log('delete photo error', err);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/posts/${id}`);
      const filteredList = items.filter((item: Payload) => item.id.toLocaleLowerCase().trim() !== id.toLocaleLowerCase().trim());
      setItems(filteredList);
    } catch (err) {
      console.log('delete item error', err);
    }
  };

  const deletePost = async (id: string, key: string) => {
    await deletePhoto(key);
    await deleteItem(id);
  };

  const handleLike = (id: string) => {
    const newArray = items.map((item: Payload) => {
      if (item.id === id && item.likes) {
        item.likes++;
      }
      return item;
    });
    console.log(newArray);
    setItems(newArray);
  };

  return (
    <div>
      {items.map((item: Payload) => (
        <div key={item.id} className='post'>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1vh' }}>
            {item.user}
            <button style={{ fontSize: 10 }} onClick={() => deletePost(item.id, item.key)}>X</button>
          </div>
          <img src={`${item.url}`} />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              {`Likes: ${item.likes}`}
            </div>
            <div>
              {`Comments: ${item.comments?.length}`}
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
            {
              showComments &&
              <div className='commentBox'>
                {item.comments?.map(comment => (
                  <div key={comment.id}>
                    <div>{`${comment.user}: ${comment.message}`}</div>
                  </div>
                ))}
              </div>
            }
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '4px', marginTop: showComments ? 4 : 0 }}>
              <div style={{ marginRight: 10 }}>
                <button onClick={() => handleLike(item.id)}>LIKE</button>
              </div>
              <div>
                <button onClick={() => setShowComments(!showComments)}>COMMENTS</button>
              </div>
            </div>
          </div>
        </div>
      ))}
      )
    </div>
  );
};

export default PostList;
