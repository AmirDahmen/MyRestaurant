import React, { useState } from 'react';
import axios from '../Api/axios';
import './ReservationForm.css';

const ReservationForm = ({ onReservationCreated, onClose }) => {
  const [formData, setFormData] = useState({
    reservation_date: '',
    reservation_time: '',
    number_of_guests: 1
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    try {
      const response = await axios.post('/reservations', formData);
      setMessage('Reservation successful!');
      setMessageType('success');
      onReservationCreated(response.data);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error making reservation. Please try again.');
      setMessageType('error');
    }
  };

  return (
    <form className="reservation-form" onSubmit={handleSubmit}>
      <h2>Book Your Table</h2>
      <div className="form-group">
        <label htmlFor="reservation_date">Date:</label>
        <input
          type="date"
          id="reservation_date"
          name="reservation_date"
          value={formData.reservation_date}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="reservation_time">Time:</label>
        <input
          type="time"
          id="reservation_time"
          name="reservation_time"
          value={formData.reservation_time}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="number_of_guests">Number of Guests:</label>
        <input
          type="number"
          id="number_of_guests"
          name="number_of_guests"
          value={formData.number_of_guests}
          onChange={handleChange}
          min="1"
          required
        />
      </div>
      <button type="submit" className="submit-button">
        Make Reservation
      </button>
      {message && <p className={`message ${messageType}`}>{message}</p>}
    </form>
  );
};

export default ReservationForm;