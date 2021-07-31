import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './app.scss';
import { SignUrl, Item, Items, Payload } from './Types';
import PostList from './Posts/PostList';
import mockItems from './util/mockItems';

const App: React.FC = () => {

  const [payload, setPayload] = useState<Item>({
    image: undefined
  });

  const [items, setItems] = useState<Payload[]>([]);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    setItems(mockItems);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setPayload({ ...payload, [e.target.name]: file });
  };

  // react dropzone for drag & drop

  const uploadFile = async () => {
    // When the upload file button is clicked,
    // first we need to get the presigned URL
    // URL is the one you get from AWS API Gateway

    try {
      const { data } = await axios.get<SignUrl>(`${API_URL}/photos/initialPhotoUpload?fileName=${payload?.image?.name}`);

      // Getting the url from response
      const url = data.fileUploadURL;

      // Initiating the PUT request to upload file
      const { config } = await axios.put(url, payload.image, {
        headers: {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      });

      return config.data.name;

    } catch (err) {
      console.log('uploadFileErr: ', err);
      return { error: 'Error uploading file' };
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const bucketUrl = process.env.REACT_APP_BUCKET_URL;
    const imageUrl = `${bucketUrl}/${payload.image?.name}`;
    try {
      const imageKey = await uploadFile();
      const item: Payload = {
        id: uuidv4(),
        url: imageUrl,
        key: imageKey
      };

      const data = await axios.put(
        `${API_URL}/posts`,
        item
      );
      console.log(data.data);
      setItems([...items, item]);
    } catch (err) {
      console.log('submit error', err);
    }
  };

  const getItems = async () => {
    try {
      const { data } = await axios.get<Items>(`${API_URL}/posts`);
      console.log('itemdata', data);
      setItems(data.Items);
    } catch (err) {
      console.log('get items error', err);
    }
  };

  return (
    <div className='grid-container'>
      <div className='grid left'>
        <form onSubmit={handleSubmit}>
          <input
            type='file'
            name='image'
            onChange={handleFileChange}
          />
          <button type="submit">submit</button>
        </form>
      </div>
      <div className='grid middle'>
        <PostList items={items} setItems={setItems} />
      </div>
      <div className='grid right'>
        <button onClick={getItems}>get items</button>
      </div>
    </div >
  );
};

export default App;
