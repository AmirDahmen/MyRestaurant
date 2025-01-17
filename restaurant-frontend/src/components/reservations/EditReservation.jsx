import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { useParams, useNavigate } from 'react-router-dom';
import './InsertReservation.css';

const EditReservation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState({
    user_id: '',
    table_id: '',
    reservation_date: '',
    reservation_time: '',
    number_of_guests: '',
  });
  const [users, setUsers] = useState([]);
  const [tables, setTables] = useState([]);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await axios.get(`/reservations/${id}`);
        setReservation(response.data);
      } catch (error) {
        console.error('Error fetching reservation:', error.response?.data || error.message);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchTables = async () => {
      try {
        const response = await axios.get('/tables');
        setTables(response.data);
      } catch (error) {
        console.error('Error fetching tables:', error);
      }
    };

    fetchReservation();
    fetchUsers();
    fetchTables();
  }, [id]);

  const handleChange = (e) => {
    setReservation({ ...reservation, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/reservations/${id}`, reservation);
      alert('Reservation updated successfully!');
      console.log(response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating reservation:', error.response?.data || error.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Edit Reservation</h2>
        <select name="user_id" value={reservation.user_id} onChange={handleChange} required>
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <select name="table_id" value={reservation.table_id} onChange={handleChange} required>
          <option value="">Select Table</option>
          {tables.map((table) => (
            <option key={table.id} value={table.id}>
              Table {table.number} (Capacity: {table.capacity})
            </option>
          ))}
        </select>
        <input
          name="reservation_date"
          type="date"
          value={reservation.reservation_date}
          onChange={handleChange}
          required
        />
        <input
          name="reservation_time"
          type="time"
          value={reservation.reservation_time}
          onChange={handleChange}
          required
        />
        <input
          name="number_of_guests"
          type="number"
          value={reservation.number_of_guests}
          placeholder="Number of Guests"
          onChange={handleChange}
          required
        />
        
        <button type="submit">Update Reservation</button>
      </form>
    </div>
  );
};

export default EditReservation;