import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleMenuToggle = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    // Check login status
    const customerToken = localStorage.getItem('customer_token');
    const adminToken = localStorage.getItem('admin_token');
    setIsLoggedIn(!!customerToken);
    setIsAdminLoggedIn(!!adminToken);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
    localStorage.removeItem('customer_token');
    localStorage.removeItem('customer_info');
    setIsLoggedIn(false);
    navigate('/');
    closeMenu();
  };

  const handleAdminLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_info');
    setIsAdminLoggedIn(false);
    navigate('/');
    closeMenu();
  };

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
        <div className="auth-links">
          {!isLoggedIn && !isAdminLoggedIn ? (
            <>
              <li><Link to="/login" className="nav-link auth-link" onClick={closeMenu}>Login</Link></li>
              <li><Link to="/admin/login" className="nav-link admin-link" onClick={closeMenu}>Admin</Link></li>
            </>
          ) : (
            <>
              {isLoggedIn && (
                <li>
                  <button onClick={() => { handleLogout(); closeMenu(); }} className="nav-link logout-btn">
                    Logout
                  </button>
                </li>
              )}
              {isAdminLoggedIn && (
                <>
                  <li><Link to="/admin/dashboard" className="nav-link admin-dashboard-link" onClick={closeMenu}>Dashboard</Link></li>
                  <li>
                    <button onClick={() => { handleAdminLogout(); closeMenu(); }} className="nav-link logout-btn">
                      Admin Logout
                    </button>
                  </li>
                </>
              )}
            </>
          )}
        </div>
      </ul>
    </nav>
  );
}
