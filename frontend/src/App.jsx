import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import InvoiceDashboard from './pages/InvoiceDashboard';
import UserDashboard from './pages/UserDashboard';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const token = localStorage.getItem('token');

  return (
    <div style={{ padding: '20px' }}>
      <nav style={{ 
        marginBottom: '20px', 
        padding: '10px', 
        backgroundColor: '#f0f0f0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          {!token ? (
            <>
              <Link to="/" style={{ marginRight: '10px', textDecoration: 'none', color: '#333' }}>Login</Link>
              <Link to="/register" style={{ marginRight: '10px', textDecoration: 'none', color: '#333' }}>Register</Link>
            </>
          ) : (
            <button 
              onClick={() => {
                localStorage.removeItem('token');
                window.location.href = '/';
              }}
              style={{ 
                background: 'none',
                border: 'none',
                color: '#333',
                cursor: 'pointer',
                textDecoration: 'none'
              }}
            >
              Logout
            </button>
          )}
        </div>
        {token && (
          <div>
            <Link to="/invoices" style={{ marginRight: '10px', textDecoration: 'none', color: '#333' }}>Invoices</Link>
            <Link to="/users" style={{ textDecoration: 'none', color: '#333' }}>Users</Link>
          </div>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/invoices" 
          element={
            <ProtectedRoute>
              <InvoiceDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/users" 
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
