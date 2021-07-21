import React, { useState } from 'react';
import axios from 'axios';

interface Item {
  name: string,
  price: string,
  id: string
}

const App: React.FC = () => {

  const [payload, setPayload] = useState<Item>({
    id: '',
    name: '',
    price: ''
  });

  const [items, setItems] = useState<Item[]>([]);

  const API_URL = process.env.REACT_APP_API_URL;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const item: Item = {
      id: payload?.id,
      name: payload?.name,
      price: payload?.price
    };

    console.log('item', item);

    try {
      axios.put(
        `${API_URL}`,
        item
      );
      setItems([...items, item]);
    } catch (err) {
      console.log('err', err);
    }
  };


  const getItems = async () => {
    try {
      const { data } = await axios.get(`${API_URL}`);
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
        <label>ID:</label>
        <input
          type="text"
          name="id"
          onChange={handleChange}
          value={payload.id}
        />

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
