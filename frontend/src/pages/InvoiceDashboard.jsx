import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const InvoiceDashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [form, setForm] = useState({ invoiceNumber: '', invoiceDate: '', invoiceAmount: '' });
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ financialYear: '', number: '', from: '', to: '' });

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      const queryParams = new URLSearchParams();
      if (filters.financialYear) queryParams.append('financialYear', filters.financialYear);
      if (filters.number) queryParams.append('number', filters.number);
      if (filters.from) queryParams.append('from', filters.from);
      if (filters.to) queryParams.append('to', filters.to);
      const res = await axios.get(`${API_BASE_URL}/invoices?${queryParams}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInvoices(res.data);
    } catch (err) {
      setError(err.message || 'Failed to fetch invoices');
      console.error('Error fetching invoices:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchInvoices(); }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const createInvoice = async () => {
    try {
      setError(null);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      await axios.post(`${API_BASE_URL}/invoices`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchInvoices();
      setForm({ invoiceNumber: '', invoiceDate: '', invoiceAmount: '' });
    } catch (err) {
      setError(err.message || 'Failed to create invoice');
      console.error('Error creating invoice:', err);
    }
  };

  const updateInvoice = async () => {
    try {
      setError(null);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      await axios.put(`${API_BASE_URL}/invoices/${editingInvoice._id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchInvoices();
      setForm({ invoiceNumber: '', invoiceDate: '', invoiceAmount: '' });
      setEditingInvoice(null);
    } catch (err) {
      setError(err.message || 'Failed to update invoice');
      console.error('Error updating invoice:', err);
    }
  };

  const deleteInvoice = async (id) => {
    if (!window.confirm('Are you sure you want to delete this invoice?')) {
      return;
    }
    try {
      setError(null);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      await axios.delete(`${API_BASE_URL}/invoices/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchInvoices();
    } catch (err) {
      setError(err.message || 'Failed to delete invoice');
      console.error('Error deleting invoice:', err);
    }
  };

  const startEditing = (invoice) => {
    setEditingInvoice(invoice);
    setForm({
      invoiceNumber: invoice.invoiceNumber,
      invoiceDate: new Date(invoice.invoiceDate).toISOString().split('T')[0],
      invoiceAmount: invoice.invoiceAmount
    });
  };

  const cancelEditing = () => {
    setEditingInvoice(null);
    setForm({ invoiceNumber: '', invoiceDate: '', invoiceAmount: '' });
  };

  if (loading) {
    return <div>Loading invoices...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Invoices</h2>
      {error && (
        <div style={{ 
          color: 'red', 
          marginBottom: '10px',
          padding: '10px',
          backgroundColor: '#ffebee',
          borderRadius: '4px',
          border: '1px solid #ffcdd2'
        }}>
          {error}
        </div>
      )}
      <div style={{ marginBottom: '20px' }}>
        <input 
          placeholder="Financial Year (e.g., 2023-2024)" 
          name="financialYear"
          value={filters.financialYear}
          onChange={handleFilterChange}
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <input 
          placeholder="Invoice Number" 
          name="number"
          value={filters.number}
          onChange={handleFilterChange}
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <input 
          type="date" 
          name="from"
          value={filters.from}
          onChange={handleFilterChange}
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <input 
          type="date" 
          name="to"
          value={filters.to}
          onChange={handleFilterChange}
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <button 
          onClick={fetchInvoices}
          style={{ 
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Apply Filters
        </button>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <input 
          placeholder="Number" 
          value={form.invoiceNumber}
          onChange={(e) => setForm({ ...form, invoiceNumber: e.target.value })}
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <input 
          type="date" 
          value={form.invoiceDate}
          onChange={(e) => setForm({ ...form, invoiceDate: e.target.value })}
          style={{ marginRight: '10px', padding: '8px' }}
        />
        <input 
          placeholder="Amount" 
          value={form.invoiceAmount}
          onChange={(e) => setForm({ ...form, invoiceAmount: e.target.value })}
          style={{ marginRight: '10px', padding: '8px' }}
        />
        {editingInvoice ? (
          <>
            <button 
              onClick={updateInvoice}
              style={{ 
                padding: '8px 16px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '10px'
              }}
            >
              Update Invoice
            </button>
            <button 
              onClick={cancelEditing}
              style={{ 
                padding: '8px 16px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <button 
            onClick={createInvoice}
            style={{ 
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Add Invoice
          </button>
        )}
      </div>

      <div style={{ 
        display: 'grid', 
        gap: '20px',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'
      }}>
        {invoices.length === 0 ? (
          <p>No invoices found</p>
        ) : (
          invoices.map((inv) => (
            <div 
              key={inv._id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                backgroundColor: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <h3>Invoice #{inv.invoiceNumber}</h3>
              <p>Date: {new Date(inv.invoiceDate).toLocaleDateString()}</p>
              <p>Amount: ₹{inv.invoiceAmount}</p>
              <div style={{ marginTop: '10px' }}>
                <button 
                  onClick={() => startEditing(inv)}
                  style={{ 
                    padding: '6px 12px',
                    backgroundColor: '#ffc107',
                    color: '#000',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    marginRight: '10px'
                  }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => deleteInvoice(inv._id)}
                  style={{ 
                    padding: '6px 12px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InvoiceDashboard;
