import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleMenuToggle = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    if (token && role) {
      setIsLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserRole('');
    navigate('/');
    closeMenu();
  };

  const isAuth = isLoggedIn && userRole;

  return (
    <nav className="navbar glass">
      <div className="navbar-brand">
        <img src={`${import.meta.env.BASE_URL}images/bedjos logo.png`} alt="Bedjos Solutions Logo" style={{ height: '40px', marginRight: '1rem', verticalAlign: 'middle' }} />
        Bedjos Solutions
      </div>
      <button
        className={`navbar-toggle ${menuOpen ? 'active' : ''}`}
        onClick={handleMenuToggle}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <li><Link to="/" className="nav-link" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/services" className="nav-link" onClick={closeMenu}>Services</Link></li>
        <li><Link to="/portfolio" className="nav-link" onClick={closeMenu}>Portfolio</Link></li>
        <li><Link to="/products" className="nav-link" onClick={closeMenu}>Products</Link></li>
        <li><Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link></li>
        <li>
          <Link to="/cart" className="nav-link cart-link" onClick={closeMenu}>
            Cart ({cart.length})
          </Link>
        </li>

        {/* Authentication Links */}
        {isAuth ? (
          <>
            {userRole === 'admin' && (
              <li><Link to="/admin" className="nav-link admin-dashboard-link" onClick={closeMenu}>Admin Dashboard</Link></li>
            )}
            <li>
              <button onClick={handleLogout} className="nav-link logout-btn">
                Logout
              </button>
            </li>
          </>
        ) : (
          <li><Link to="/login" className="nav-link auth-link" onClick={closeMenu}>Login</Link></li>
        )}
      </ul>
    </nav>
  );
}

