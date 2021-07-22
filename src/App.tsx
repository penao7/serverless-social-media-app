import React, { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { v4 as uuidv4 } from 'uuid';
interface Item {
  name: string,
  price: string,
  image?: File
}

interface Payload extends Item {
  id: string
}
interface Items {
  Items: Payload[]
}

interface SignUrl {
  fileUploadURL: string
}

const App: React.FC = () => {

  const [payload, setPayload] = useState<Item>({
    name: '',
    price: '',
    image: undefined
  });

  const [items, setItems] = useState<Payload[]>([]);

  const API_URL = process.env.REACT_APP_API_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
    setPayload({ ...payload, [e.target.name]: file });
  };

  // react dropzone

  const uploadFile = async (): Promise<AxiosResponse | { error: string }> => {
    // When the upload file button is clicked,
    // first we need to get the presigned URL
    // URL is the one you get from AWS API Gateway

    try {
      const { data } = await axios.get<SignUrl>(`${API_URL}/photos/initiate-upload?fileName=${payload?.image?.name}`);

      // Getting the url from response
      const url = data.fileUploadURL;

      // Initiating the PUT request to upload file
      return axios.put(url, payload.image, {
        headers: {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      });
    } catch (err) {
      console.log('uploadFileErr: ', err);
      return { error: 'Error uploading file' };
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    uploadFile();
    /* const item: Payload = {
      id: uuidv4(),
      name: payload?.name,
      price: payload?.price,
      image: payload?.image
    };

    try {
      const data = await axios.put(
        `${API_URL}`,
        item
      );
      console.log('data', data);
      setItems([...items, item]);
    } catch (err) {
      console.log('err', err);
    } */
  };

  const getItems = async () => {
    try {
      const { data } = await axios.get<Items>(`${API_URL}`);
      setItems(data.Items);
    } catch (err) {
      console.log('err', err);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/${id}`);
      const filteredList = items.filter(item => item.id.toLocaleLowerCase().trim() !== id.toLocaleLowerCase().trim());
      setItems(filteredList);
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={payload.name}
        />

        <label>Price:</label>
        <input
          type="text"
          name="price"
          onChange={handleChange}
          value={payload.price}
        />

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
          {items && items.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td><button onClick={() => deleteItem(item.id)}>delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
