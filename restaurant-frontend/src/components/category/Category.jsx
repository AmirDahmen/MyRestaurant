import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import CategoryFoodList from '../foods/CategoryFoodList';
import './Category.css'; 

const Category = () => {
  const [categories, setCategories] = useState([]);

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

  return (
    <div className="category-container">
      <h2>Category List</h2>
      <table className="category-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="category-food-lists">
        {categories.map((category) => (
          <CategoryFoodList key={category.id} category={category.name} />
        ))}
      </div>
    </div>
  );
};

export default Category;