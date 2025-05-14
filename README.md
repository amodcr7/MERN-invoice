# MERN Invoice Management System

A full-stack invoice management system built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- User authentication and authorization
- Create, read, update, and delete invoices
- Filter invoices by:
  - Financial year
  - Invoice number
  - Date range
- User-specific invoice management
- Responsive design

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mern-invoice-test
```

2. Install dependencies for both frontend and backend:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Create a `.env` file in the frontend directory:
```
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Invoices
- GET `/api/invoices` - Get all invoices (filtered by user)
- POST `/api/invoices` - Create a new invoice
- PUT `/api/invoices/:id` - Update an invoice
- DELETE `/api/invoices/:id` - Delete an invoice

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 