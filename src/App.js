import React, { useState } from 'react';
import axios from 'axios';

function App() {

  const [payload, setPayload] = useState({
    name: '',
    price: '',
    id: ''
  });

  const [items, setItems] = useState([]);

  const handleChange = (e) => {
    setPayload({ ...payload, [e.target.name]: e.target.value });
    console.log(payload.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const item = {
      id: payload.id,
      name: payload.name,
      price: payload.price
    }
    try {
      axios.put(
        process.env.REACT_APP_API_URL,
        item
      );
      setItems([...items, item]);
    } catch (err) {
      console.log('err', err);
    }
  };


  const getItems = async () => {
    try {
      const { data } = await axios.get(process.env.REACT_APP_API_URL);
      setItems(data.Items);
    } catch (err) {
      console.log('err', err);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/${id}`);
      const filteredList = items.filter(item => item.id.toLocaleLowerCase().trim() !== id.toLocaleLowerCase().trim())
      setItems(filteredList);
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
}

export default App;
