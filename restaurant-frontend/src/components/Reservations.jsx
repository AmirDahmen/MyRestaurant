import React, { useState, useEffect } from 'react';
import axios from '../Api/axios';
import { profile } from '../services/authservice';
import ReservationForm from './ReservationForm';
import './Reservations.css';

const Reservations = () => {
  const [showForm, setShowForm] = useState(false);
  const [userReservations, setUserReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserReservations();
    }
  }, [userId]);

  const fetchUserProfile = async () => {
    try {
      const response = await profile();
      console.log('User profile:', response.data);
      if (response.data && response.data.id) {
        setUserId(response.data.id);
      } else {
        throw new Error('User ID not found in profile data');
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setError('Failed to fetch user profile. Please try logging in again.');
      setLoading(false);
    }
  };

  const fetchUserReservations = async () => {
    try {
      console.log('Fetching reservations for user:', userId);
      const response = await axios.get(`/user/${userId}/reservations`);
      console.log('Reservations fetched successfully:', response.data);
  
      if (response.data && response.data.success && Array.isArray(response.data.reservations)) {
        setUserReservations(response.data.reservations);
      } else {
        console.error('Unexpected response format:', response.data);
        setError('Received unexpected data format from server.');
        setUserReservations([]);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching reservations:', err);
      setError(`Failed to fetch reservations. Error: ${err.message}`);
      setUserReservations([]);
      setLoading(false);
    }
  };
  

  const handleNewReservation = (newReservation) => {
    setUserReservations(prevReservations => [...prevReservations, newReservation]);
  };

  const handleCancelReservation = async (reservationId) => {
    try {
      await axios.delete(`/reservations/${reservationId}`);
      setUserReservations(prevReservations => prevReservations.filter(res => res.id !== reservationId));
    } catch (err) {
      setError('Failed to cancel reservation. Please try again.');
    }
  };

  return (
    <div className="reservations-container">
      <div className="hero-section">
        <h1>Make a Reservation</h1>
        <p>Join us for an unforgettable dining experience</p>
        <button className="cta-button" onClick={() => setShowForm(true)}>
          Book a Table
        </button>
      </div>

      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowForm(false)}>
              &times;
            </button>
            <ReservationForm onReservationCreated={handleNewReservation} onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}

      <div className="info-section">
        <div className="info-card">
          <h2>Your Reservations</h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <div className="error">
              <p>{error}</p>
              <button onClick={fetchUserProfile}>Retry</button>
            </div>
          ) : Array.isArray(userReservations) && userReservations.length > 0 ? (
            <ul className="reservation-list">
              {userReservations.map(reservation => (
                <li key={reservation.id} className="reservation-item">
                  <p>Date: {new Date(reservation.reservation_date).toLocaleDateString()}</p>
                  <p>Time: {reservation.reservation_time}</p>
                  <p>Guests: {reservation.number_of_guests}</p>
                  {reservation.status !== 'cancelled' && (
                    <button onClick={() => handleCancelReservation(reservation.id)} className="cancel-button">Cancel</button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>You have no reservations.</p>
          )}
        </div>
        <div className="info-card">
          <h2>Hours</h2>
          <p>Monday - Friday: 5:00 PM - 10:00 PM</p>
          <p>Saturday - Sunday: 4:00 PM - 11:00 PM</p>
        </div>
        <div className="info-card">
          <h2>Location</h2>
          <p>3000 Farhat Hachad Street</p>
<p>Sfax, Tunisia</p>

        </div>
      </div>
    </div>
  );
};

export default Reservations;

