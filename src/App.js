import React, { useState } from 'react';
import axios from 'axios';

function App() {

  const [payload, setPayload] = useState({
    name: '',
    message: ''
  });

  const handleChange = (e) => {
    setPayload({...payload, [e.target.name]: e.target.value});
    console.log(payload.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.post(
        process.env.REACT_APP_API_URL,
        { 'key1': `${payload.name}, ${payload.message}` }
      );
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={payload.name}
        />

        <label>Message:</label>
        <input
          type="text"
          name="message"
          onChange={handleChange}
          value={payload.message}
        />

        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
