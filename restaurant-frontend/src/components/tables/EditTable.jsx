import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { useParams, useNavigate } from 'react-router-dom';
import './InsertTable.css';

const EditTable = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [table, setTable] = useState({
    number: '',
    capacity: '',
    status: ''
  });

  useEffect(() => {
    const fetchTable = async () => {
      try {
        const response = await axios.get(`/tables/${id}`);
        setTable(response.data);
      } catch (error) {
        console.error('Error fetching table:', error.response?.data || error.message);
      }
    };

    fetchTable();
  }, [id]);

  const handleChange = (e) => {
    setTable({ ...table, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/tables/${id}`, table);
      alert('Table updated successfully!');
      console.log(response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating table:', error.response?.data || error.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Edit Table</h2>
        <input name="number" type="number" value={table.number} placeholder="Table Number" onChange={handleChange} required />
        <input name="capacity" type="number" value={table.capacity} placeholder="Capacity" onChange={handleChange} required />
        <select name="status" value={table.status} onChange={handleChange} required>
          <option value="available">Available</option>
          <option value="occupied">Occupied</option>
          <option value="out_of_service">Out of Service</option>
        </select>
        <button type="submit">Update Table</button>
      </form>
    </div>
  );
};

export default EditTable;