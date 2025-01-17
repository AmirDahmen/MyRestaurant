import React from 'react';
import './navfoot.css';
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-item">
        <img src="src/img/dish.svg" alt="Dish Icon" />
        <h3>Excellent food</h3>
        <p>We offer our clients excellent quality services for many years.</p>
      </div>
      <div className="footer-item">
        <img src="src/img/pizza.svg" alt="Pizza Icon" />
        <h3>Fast food</h3>
        <p>We serve the best and delicious food in the city.</p>
      </div>
      <div className="footer-item">
        <img src="src/img/truck.svg" alt="Truck Icon" />
        <h3>Delivery</h3>
        <p>We deliver your food quickly and safely to your location.</p>
      </div>
    </footer>
  );
};

export default Footer;