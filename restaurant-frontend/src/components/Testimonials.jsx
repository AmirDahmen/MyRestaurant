import React, { useState, useEffect } from 'react';
import axios from '../Api/axios';
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ReactLoading from 'react-loading'; 
import './Testimonials.css';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [newTestimonial, setNewTestimonial] = useState({ content: '', rating: 5 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    fetchTestimonials();
    checkAuthStatus();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true); 
      const response = await axios.get('/testimonials');
      setTestimonials(response.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setIsLoading(false); 
    }
  };

  const checkAuthStatus = () => {
    const token = localStorage.getItem('CC_Token');
    setIsAuthenticated(!!token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/testimonials', newTestimonial);
      setTestimonials([response.data, ...testimonials]);
      setNewTestimonial({ content: '', rating: 5 });
    } catch (error) {
      console.error('Error submitting testimonial:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/testimonials/${id}`);
      setTestimonials(testimonials.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  };

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  if (isLoading) {
    return (
      <center>
        <ReactLoading type="bubbles" color="green" height={'8%'} width={'8%'} />
      </center>
    );
  }

  return (
    <div className="testimonials-container">
      <h2 className="testimonials-title">Our Clients Reviews about us</h2>
      {testimonials.length > 0 && (
        <div className="testimonial-carousel">
          <button className="carousel-button prev" onClick={prevTestimonial}>
            <FaChevronLeft />
          </button>
          <div className="testimonial-card">
            <FaQuoteLeft className="quote-icon" />
            <div className="testimonial-content">
              <p>{testimonials[currentIndex].content}</p>
            </div>
            <div className="testimonial-author">
              <img src={testimonials[currentIndex].user.avatar} alt={testimonials[currentIndex].user.name} className="avatar" />
              <div className="author-info">
                <h3>{testimonials[currentIndex].user.name}</h3>
                <div className="rating">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <FaStar key={i} className="star" />
                  ))}
                </div>
              </div>
            </div>
            {isAuthenticated && testimonials[currentIndex].user_id === parseInt(localStorage.getItem('user_id')) && (
              <button onClick={() => handleDelete(testimonials[currentIndex].id)} className="delete-btn">
                Delete
              </button>
            )}
          </div>
          <button className="carousel-button next" onClick={nextTestimonial}>
            <FaChevronRight />
          </button>
        </div>
      )}
      {isAuthenticated ? (
        <form onSubmit={handleSubmit} className="testimonial-form">
          <h3>Share your experience</h3>
          <textarea
            value={newTestimonial.content}
            onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
            placeholder="What do you think about our restaurant..."
            required
          />
          <div className="rating-input">
            <label>Note :</label>
            {[5, 4, 3, 2, 1].map((num) => (
              <label key={num} className="star-label">
                <input
                  type="radio"
                  name="rating"
                  value={num}
                  checked={newTestimonial.rating === num}
                  onChange={() => setNewTestimonial({ ...newTestimonial, rating: num })}
                />
                <FaStar className={num <= newTestimonial.rating ? 'star active' : 'star'} />
              </label>
            ))}
          </div>
          <button type="submit" className="submit-btn"> Send</button>
        </form>
      ) : (
        <div className="login-prompt">
          <p>Log in in order to share you experience !</p>
          <a href="/login" className="login-btn">Login</a>
        </div>
      )}
    </div>
  );
};

export default Testimonials;
