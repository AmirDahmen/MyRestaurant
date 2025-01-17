import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Footer from './Footer';
import Navbar from './Navbar';

import InsertFood from './components/foods/Insertfood';
import EditFood from './components/foods/Editfood';
import Category from './components/category/Category';
import InsertCategory from './components/category/InsertCategory';
import EditCategory from './components/category/EditCategory';
import ProtectedRoutes from './ProtectedRoute';
import Login from './components/authentification/Login';
import Dashboard from './components/admin/Dashboard';
import Logout from './components/authentification/Logout';
import Register from './components/client/authentification/Register';
import Menu from './components/menu';
import Reservations from './components/Reservations';
import InsertTable from './components/tables/InsertTable';
import EditTable from './components/tables/EditTable';
import InsertReservation from './components/reservations/InsertReservation';
import EditReservation from './components/reservations/EditReservation';
import Contact from './ContactPage';
import About from './AboutPage';
import Testimonials from './components/Testimonials';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route element={<ProtectedRoutes />}>
          <Route path="/reservations" element={<Reservations />} />
                    </Route>
          

          <Route path="/" element={<Home />} />
       
          <Route path="dashboard/insert" element={<InsertFood />} /> 
          <Route path="dashboard/edit/:id" element={<EditFood />} /> 
          <Route path="/categories" element={<Category />} />
          <Route path="/dashboard/insert-category" element={<InsertCategory />} />
          <Route path="/dashboard/edit-category/:id" element={<EditCategory />} />
          <Route path="/dashboard/insert-table" element={<InsertTable />} />
          <Route path="/dashboard/edit-table/:id" element={<EditTable />} />

          {/* Reservation Routes */}
          <Route path="/dashboard/insert-reservation" element={<InsertReservation />} />
          <Route path="/dashboard/edit-reservation/:id" element={<EditReservation />} />
          <Route path="/menu" element={<Menu />} />

          {/* Routes for Contact and About pages */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/testimonials" element={<Testimonials />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

