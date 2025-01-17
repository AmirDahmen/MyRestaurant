import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navfoot.css';

const Navbar = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user'); 

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    navigate('/'); 
  };

  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="navbar">
        <img src="src/img/home.png" alt="Home" className="home-logo" />
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/reservations">Reservations</Link></li> {/* Reservations link when logged in */}

          <li><Link to="/testimonials">Testimonials</Link></li> {/* Testimonials link */}
          {/* Conditional rendering based on user login status */}
          {!user ? (
            <>
              <li><Link to="/login">Login</Link></li>
            </>
          ) : (
            <>

              <li><Link to="/logout" onClick={handleLogout}>Logout</Link></li> {/* Logout link */}
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
