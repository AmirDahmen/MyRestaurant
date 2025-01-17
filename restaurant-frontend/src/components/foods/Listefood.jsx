import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './list.css';

const ListFood = ({ category }) => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    console.log('Category prop:', category); 
    if (category) {
      fetchFoods();
    } else {
      console.log('Category is not defined');
    }
  }, [category]);

  const fetchFoods = async () => {
    try {
      console.log(`Fetching foods for category: ${category}`);
      const res = await axios.get(`http://127.0.0.1:8000/api/foods/category/${category}`);
      console.log('Fetched foods:', res.data);
      setFoods(res.data); 
    } catch (error) {
      console.error('Error fetching foods:', error);
    }
  };

  return (
    <main className="card-container">
      
      {foods.length > 0 ? (
        foods.map((food, index) => (
          <div className="card" key={index}>
            <img src={food.image} alt={food.name} className="card-image" />
            <div className="card-body">
              <h1 className="card-title">{food.name}</h1>
              <p className="card-price">${food.price}</p>
              <p className="card-description">{food.description}</p>
              <Link to={`/foods/${food.id}`} className="btn">
                View Details
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No foods available</p>
      )}
    </main>
  );
};

export default ListFood;