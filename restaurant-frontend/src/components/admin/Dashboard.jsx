import React, { useState, useEffect } from 'react';
import { profile } from '../../services/authservice';
import InsertFood from '../foods/Insertfood';
import EditFood from '../foods/Editfood';
import InsertCategory from '../category/InsertCategory';
import EditCategory from '../category/EditCategory';
import InsertTable from '../tables/InsertTable';
import EditTable from '../tables/EditTable';
import InsertReservation from '../reservations/InsertReservation';
import EditReservation from '../reservations/EditReservation';
import axios from '../../Api/axios';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Button, Table, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';

function Dashboard() {
  const [name, setName] = useState('');
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    profile().then((response) => {
      console.log(response);
      if (response.data) setName(response.data.name);
    });

    fetchFoods();
    fetchCategories();
    fetchTables();
    fetchReservations();
    fetchUsers();
    fetchTestimonials();
  }, []);

  const fetchFoods = async () => {
    try {
      const res = await axios.get('/foods');
      setFoods(res.data);
    } catch (error) {
      console.error('Error fetching foods:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/categories');
      setCategories(res.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchTables = async () => {
    try {
      const res = await axios.get('/tables');
      setTables(res.data);
    } catch (error) {
      console.error('Error fetching tables:', error);
    }
  };

  const fetchReservations = async () => {
    try {
      const res = await axios.get('/reservations');
      setReservations(res.data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    }
  };

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get('/testimonials');
      setTestimonials(res.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  const handleDeleteFood = async (id) => {
    try {
      await axios.delete(`/foods/${id}`);
      setFoods(foods.filter(food => food.id !== id));
      alert('Food deleted successfully!');
    } catch (error) {
      console.error('Error deleting food:', error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`/categories/${id}`);
      setCategories(categories.filter(category => category.id !== id));
      alert('Category deleted successfully!');
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleDeleteTable = async (id) => {
    try {
      await axios.delete(`/tables/${id}`);
      setTables(tables.filter(table => table.id !== id));
      alert('Table deleted successfully!');
    } catch (error) {
      console.error('Error deleting table:', error);
    }
  };

  const handleDeleteReservation = async (id) => {
    try {
      await axios.delete(`/reservations/${id}`);
      setReservations(reservations.filter(reservation => reservation.id !== id));
      alert('Reservation deleted successfully!');
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };
  const handleDeleteTestimonial = async (id) => {
    console.log('Attempting to delete testimonial with ID:', id);
    const token = localStorage.getItem('token'); 
  
    try {
      const response = await axios.delete(`/testimonials/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      console.log('Delete response:', response);
      setTestimonials(testimonials.filter(testimonial => testimonial.id !== id));
      alert('Testimonial deleted successfully!');
    } catch (error) {
      console.error('Error deleting testimonial:', error.response || error.message);
      alert('Failed to delete testimonial. Please try again.');
    }
  };
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
      alert('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user. Please try again.');
    }
  };
  
  
  

  const getCategoryName = (categoryId) => {
    const category = categories.find(category => category.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  return (
    <Container fluid className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="dashboard-main">
        <div className="welcome-message">
          Welcome: {name}
        </div>
        <Row className="dashboard-links mb-4">
          <Col>
            <Link to="insert">
              <Button variant="primary">
                <FontAwesomeIcon icon={faPlus} /> Insert Food
              </Button>
            </Link>
          </Col>
          <Col>
            <Link to="insert-category">
              <Button variant="primary">
                <FontAwesomeIcon icon={faPlus} /> Insert Category
              </Button>
            </Link>
          </Col>
          <Col>
            <Link to="insert-table">
              <Button variant="primary">
                <FontAwesomeIcon icon={faPlus} /> Insert Table
              </Button>
            </Link>
          </Col>
          <Col>
            <Link to="insert-reservation">
              <Button variant="primary">
                <FontAwesomeIcon icon={faPlus} /> Insert Reservation
              </Button>
            </Link>
          </Col>
        </Row>
        <div className="food-list mb-5">
          <h2>Food List</h2>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.map(food => (
                <tr key={food.id}>
                  <td>{food.name}</td>
                  <td><Image src={food.image} alt={food.name} width={50} height={50} rounded /></td>
                  <td>{food.description}</td>
                  <td>{food.price}</td>
                  <td>{getCategoryName(food.category_id)}</td>
                  <td>
                    <Link to={`edit/${food.id}`}>
                      <Button variant="warning" size="sm" className="me-2">
                        <FontAwesomeIcon icon={faEdit} /> Edit
                      </Button>
                    </Link>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteFood(food.id)}>
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="user-list mb-5">
  <h2>Clients</h2>
  <Table striped bordered hover responsive>
    <thead>
      <tr>
        <th>Avatar</th>
        <th>Name</th>
        <th>Active</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {users
        .filter(user => user.role === 'user') // Filtre uniquement les utilisateurs avec le rôle "user"
        .map(user => (
          <tr key={user.id}>
            <td>
              <Image src={user.avatar || '/default-avatar.png'} alt={user.name} width={50} height={50} rounded />
            </td>
            <td>{user.name}</td>
            <td>{user.isActive === 1 ? 'Yes' : 'No'}</td>
            <td>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDeleteUser(user.id)}
              >
                <FontAwesomeIcon icon={faTrash} /> Ban
              </Button>
            </td>
          </tr>
        ))}
    </tbody>
  </Table>
</div>
        <div className="category-list mb-5">
          <h2>Category List</h2>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(category => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>
                    <Link to={`edit-category/${category.id}`}>
                      <Button variant="warning" size="sm" className="me-2">
                        <FontAwesomeIcon icon={faEdit} /> Edit
                      </Button>
                    </Link>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteCategory(category.id)}>
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="table-list mb-5">
          <h2>Table List</h2>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Number</th>
                <th>Capacity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tables.map(table => (
                <tr key={table.id}>
                  <td>{table.number}</td>
                  <td>{table.capacity}</td>
                  <td>
                    <Link to={`edit-table/${table.id}`}>
                      <Button variant="warning" size="sm" className="me-2">
                        <FontAwesomeIcon icon={faEdit} /> Edit
                      </Button>
                    </Link>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteTable(table.id)}>
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="reservation-list mb-5">
          <h2>Reservation List</h2>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>User</th>
                <th>Table</th>
                <th>Date</th>
                <th>Time</th>
                <th>Guests</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map(reservation => (
                <tr key={reservation.id}>
                  <td>{users.find((user) => user.id === reservation.user_id)?.name || 'Unknown User'}</td>
                  <td>{reservation.table_id}</td>
                  <td>{reservation.reservation_date}</td>
                  <td>{reservation.reservation_time}</td>
                  <td>{reservation.number_of_guests}</td>
                  <td>
                    <Link to={`edit-reservation/${reservation.id}`}>
                      <Button variant="warning" size="sm" className="me-2">
                        <FontAwesomeIcon icon={faEdit} /> Edit
                      </Button>
                    </Link>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteReservation(reservation.id)}>
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="testimonial-list mb-5">
          <h2>Testimonial List</h2>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>User</th>
                <th>Content</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map(testimonial => (
                <tr key={testimonial.id}>
                  <td>{users.find((user) => user.id === testimonial.user_id)?.name || 'Unknown User'}</td>
                  <td>{testimonial.content}</td>
                  <td>{testimonial.rating}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteTestimonial(testimonial.id)}>
                      <FontAwesomeIcon icon={faTrash} /> Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      

        <Routes>
          <Route path="insert" element={<InsertFood />} />
          <Route path="edit/:id" element={<EditFood />} />
          <Route path="insert-category" element={<InsertCategory />} />
          <Route path="edit-category/:id" element={<EditCategory />} />
          <Route path="insert-table" element={<InsertTable />} />
          <Route path="edit-table/:id" element={<EditTable />} />
          <Route path="insert-reservation" element={<InsertReservation />} />
          <Route path="edit-reservation/:id" element={<EditReservation />} />
        </Routes>
      </div>
    </Container>
  );
}

export default Dashboard;

