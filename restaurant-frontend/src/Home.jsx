import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">


      {/* Body */}
      <div className="body-section">
        {/* Intro Section */}
        <section className="intro">
          <div className="intro-text">
            <h1>Tasty food</h1>
            <p>Try the best food of the week.</p>
            <button><Link to="/menu">View Menu</Link></button>
          </div>
          <img src="src/img/salade.webp" alt="Salad" className="intro-image" />
        </section>

        {/* About Section */}
        <section className="about">
          <img src="src/img/about.webp" alt="About Us" className="about-image" />
          <div className="about-text">
            <h2>We cook the best tasty food</h2>
            <p>
              We cook the best food in the entire city, with excellent customer service,
              the best meals, and at the best price. Visit us.
            </p>
            <button><Link to="/about">Explore more</Link></button>

          </div>
        </section>
      </div>

     
    </div>
  );
};

export default Home;