import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditCategory.css'; 

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: ''
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`/categories/${id}`);
        setCategory(response.data);
      } catch (error) {
        console.error('Error fetching category:', error.response?.data || error.message);
      }
    };

    fetchCategory();
  }, [id]);

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/categories/${id}`, category);
      alert('Category updated successfully!');
      console.log(response.data);
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Error updating category:', error.response?.data || error.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Edit Category</h2>
        <input name="name" type="text" value={category.name} placeholder="Name" onChange={handleChange} required />
        <button type="submit">Update Category</button>
      </form>
    </div>
  );
};

export default EditCategory;