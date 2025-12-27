import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuToggle = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);
  
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
        <li><Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link></li>
      </ul>
    </nav>
  );
}