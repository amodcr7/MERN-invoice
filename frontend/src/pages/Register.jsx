import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = async () => {
    try {
      setError('');
      setLoading(true);

      // Validate form
      if (!form.name || !form.email || !form.password) {
        throw new Error('Please fill in all fields');
      }

      if (form.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      if (!form.email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      const response = await axios.post(`${API_BASE_URL}/auth/register`, form);
      
      if (response.data) {
        alert('Registration successful! Please login.');
        navigate('/');
      }
    } catch (err) {
      console.error('Registration error:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Register</h2>
      {error && (
        <div style={{ 
          color: 'red', 
          marginBottom: '15px', 
          padding: '10px',
          backgroundColor: '#ffebee',
          borderRadius: '4px',
          border: '1px solid #ffcdd2'
        }}>
          {error}
        </div>
      )}
      <div style={{ marginBottom: '15px' }}>
        <input 
          placeholder="Name" 
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <input 
          placeholder="Email" 
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <input 
          placeholder="Password" 
          type="password" 
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <button 
          onClick={register}
          disabled={loading}
          style={{ 
            width: '100%', 
            padding: '10px', 
            backgroundColor: loading ? '#cccccc' : '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '10px'
          }}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        <p style={{ textAlign: 'center' }}>
          Already have an account?{' '}
          <Link to="/" style={{ color: '#007bff', textDecoration: 'none' }}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register; 