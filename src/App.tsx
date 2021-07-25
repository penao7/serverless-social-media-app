import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
interface Item {
  image?: File
}

interface Payload {
  url: string,
  key: string,
  id: string
}
interface Items {
  Items: Payload[]
}

interface SignUrl {
  fileUploadURL: string,
  Key: string
}

const App: React.FC = () => {

  const [payload, setPayload] = useState<Item>({
    image: undefined
  });

  const [items, setItems] = useState<Payload[]>([]);

  const API_URL = process.env.REACT_APP_API_URL;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setPayload({ ...payload, [e.target.name]: file });
  };

  // react dropzone

  const uploadFile = async () => {
    // When the upload file button is clicked,
    // first we need to get the presigned URL
    // URL is the one you get from AWS API Gateway

    try {
      const { data } = await axios.get<SignUrl>(`${API_URL}/photos/initiate-upload?fileName=${payload?.image?.name}`);

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

      setItems([...items, item]);
    } catch (err) {
      console.log('submit error', err);
    }
  };

  const getItems = async () => {
    try {
      const { data } = await axios.get<Items>(`${API_URL}/items`);
      console.log('itemdata', data);
      setItems(data.Items);
    } catch (err) {
      console.log('get items error', err);
    }
  };

  const deletePhoto = async (key: string) => {
    try {
      await axios.delete(`${API_URL}/photos/${key}`);
    } catch (err) {
      console.log('delete photo error', err);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/items/${id}`);
      const filteredList = items.filter(item => item.id.toLocaleLowerCase().trim() !== id.toLocaleLowerCase().trim());
      setItems(filteredList);
    } catch (err) {
      console.log('delete item error', err);
    }
  };

  const deletePost = async (id: string, key: string) => {
    await deletePhoto(key);
    await deleteItem(id);
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Image:</label>
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
        />

        <button type="submit">Send</button>
      </form>
      <button onClick={getItems}>Get items</button>
      <table>
        <tbody>
          {items && items.map(item =>
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.key}</td>
              <td><img src={`http://${item.url}`} style={{ height: 250, width: 250 }} /></td>
              <td><button onClick={() => deletePost(item.id, item.key)}>delete</button></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;
