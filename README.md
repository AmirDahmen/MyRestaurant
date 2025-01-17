# Restaurant Management System  

A web application for managing a restaurant's operations. Built using **Laravel** (backend) and **React** (frontend).

---  

## Features  

### Client-Side  
- **Reserve a Table**: Clients can book tables online.  
- **View Menu**: Explore the restaurant's menu with detailed descriptions and pricing.  
- **Submit Testimonials**: Share dining experiences directly on the platform.  

### Admin-Side  
- **Manage Food Items and Categories**: Add, update, and delete food items by category in the menu.  
- **Handle Tables**: Manage table configurations (e.g., table numbers, capacity).  
- **View and Manage Reservations**:  
  - **View Reservations**: View all client reservations.  
  - **Update or Cancel Reservations**: Modify or cancel reservations as needed.  
- **Manage Testimonials**: View and delete inappropriate or irrelevant testimonials.  

---  

## Installation  

### Prerequisites  
Ensure you have the following installed:  
- **PHP** (v8.2.12)  
- **Composer** (v2.7.9)  
- **Node.js** (v20.18.0)  
- **npm** (v10.8.2)  
- **MySQL**  
- **XAMPP**

### Steps  
1. **Clone the Repository**:  
   ```bash  
   git clone https://github.com/AmirDahmen/MyRestaurant.git
   ```  

2. **Install Backend Dependencies**:  
   ```bash  
   cd restaurant-backend  
   composer install  
   ```  

3. **Install Frontend Dependencies**:  
   ```bash  
   cd restaurant-frontend  
   npm install  
   ```  

4. **Configure Environment**:  
   - Update database credentials and other configurations in `.env`.  

5. **Run Migrations**:  
   - **Backend**:  
     ```bash  
     php artisan migrate  
     ```  

6. **Start the Development Servers**:  
   - **Backend**:  
     ```bash  
     php artisan serve  
     ```  
   - **Frontend**:  
     ```bash  
     npm run dev  
     ```  

---  

## Usage  

### Client  
1. Visit the home page.  
2. Browse the menu, make reservations, or submit testimonials.  

### Admin  
1. Log in to the admin dashboard.  
2. Perform tasks such as:  
   - Managing menu items and food categories (add, update, delete).  
   - Configuring tables (set up table numbers, capacities, availability).  
   - Viewing and updating/canceling reservations.  
   - Managing client testimonials.  

---  

## Technologies Used  
- **Backend**: Laravel  
- **Frontend**: React  
- **Database**: MySQL  

---  

## Contributing  
Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.  

