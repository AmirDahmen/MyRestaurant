import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import './InsertReservation.css';

const InsertReservation = () => {
  const [reservation, setReservation] = useState({
    user_id: '',
    table_id: '',
    reservation_date: '',
    reservation_time: '',
    number_of_guests: '',
  });
  const [users, setUsers] = useState([]);
  const [tables, setTables] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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

    fetchUsers();
    fetchTables();
  }, []);

  const handleChange = (e) => {
    setReservation({ ...reservation, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/reservations', reservation);
      alert('Reservation added successfully!');
      console.log(response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding reservation:', error.response?.data || error.message);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Insert Reservation</h2>
        <select name="user_id" onChange={handleChange} required>
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <select name="table_id" onChange={handleChange} required>
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
          onChange={handleChange}
          required
        />
        <input
          name="reservation_time"
          type="time"
          onChange={handleChange}
          required
        />
        <input
          name="number_of_guests"
          type="number"
          placeholder="Number of Guests"
          onChange={handleChange}
          required
        />
      
        <button type="submit">Add Reservation</button>
      </form>
    </div>
  );
};

export default InsertReservation;