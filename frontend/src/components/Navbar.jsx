import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{ padding: '1rem', background: '#eee' }}>
    <Link to="/invoices">Invoices</Link> | <Link to="/users">Users</Link> | <Link to="/">Logout</Link>
  </nav>
);

export default Navbar;
