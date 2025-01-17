import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import './InsertFood.css'; 

const InsertFood = () => {
  const [food, setFood] = useState({
    name: '',
    image: '',
    description: '',
    price: '',
    category_id: ''
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setFood({ ...food, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/foods', food);
      alert('Food added successfully!');
      console.log(response.data);
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Error adding food:', error.response?.data || error.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Insert Food</h2>
        <input name="name" type="text" placeholder="Name" onChange={handleChange} required />
        <input name="image" type="text" placeholder="Image URL" onChange={handleChange} />
        <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
        <input name="price" type="number" placeholder="Price" onChange={handleChange} required />
        <select name="category_id" onChange={handleChange} required>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit">Add Food</button>
      </form>
    </div>
  );
};

export default InsertFood;