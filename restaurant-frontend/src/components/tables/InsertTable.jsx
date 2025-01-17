import React, { useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import './InsertTable.css';

const InsertTable = () => {
  const [table, setTable] = useState({
    number: '',
    capacity: '',
    status: 'available'
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTable({ ...table, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/tables', table);
      alert('Table added successfully!');
      console.log(response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding table:', error.response?.data || error.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Insert Table</h2>
        <input name="number" type="number" placeholder="Table Number" onChange={handleChange} required />
        <input name="capacity" type="number" placeholder="Capacity" onChange={handleChange} required />
        <select name="status" onChange={handleChange} required>
          <option value="available">Available</option>
          <option value="occupied">Occupied</option>
          <option value="out_of_service">Out of Service</option>
        </select>
        <button type="submit">Add Table</button>
      </form>
    </div>
  );
};

export default InsertTable;