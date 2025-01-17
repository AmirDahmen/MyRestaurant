import React, { useState } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import './InsertCategory.css'; 

const InsertCategory = () => {
  const [category, setCategory] = useState({
    name: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/categories', category);
      alert('Category added successfully!');
      console.log(response.data);
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Error adding category:', error.response?.data || error.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Insert Category</h2>
        <input name="name" type="text" placeholder="Name" onChange={handleChange} required />
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
};

export default InsertCategory;