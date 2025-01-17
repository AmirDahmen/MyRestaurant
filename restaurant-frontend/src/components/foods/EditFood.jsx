import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { useParams, useNavigate } from 'react-router-dom';
import './InsertFood.css'; 

const EditFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState({
    name: '',
    image: '',
    description: '',
    price: '',
    category_id: ''
  });

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const response = await axios.get(`/foods/${id}`);
        setFood(response.data);
      } catch (error) {
        console.error('Error fetching food:', error.response?.data || error.message);
      }
    };

    fetchFood();
  }, [id]);

  const handleChange = (e) => {
    setFood({ ...food, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/foods/${id}`, food);
      alert('Food updated successfully!');
      console.log(response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating food:', error.response?.data || error.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Edit Food</h2>
        <input name="name" type="text" value={food.name} placeholder="Name" onChange={handleChange} required />
        <input name="image" type="text" value={food.image} placeholder="Image URL" onChange={handleChange} />
        <textarea name="description" value={food.description} placeholder="Description" onChange={handleChange}></textarea>
        <input name="price" type="number" value={food.price} placeholder="Price" onChange={handleChange} required />
        <input name="category_id" type="number" value={food.category_id} placeholder="Category ID" onChange={handleChange} required />
        <button type="submit">Update Food</button>
      </form>
    </div>
  );
};

export default EditFood;