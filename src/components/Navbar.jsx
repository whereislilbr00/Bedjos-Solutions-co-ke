import React, { useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuToggle = () => setMenuOpen(!menuOpen);
  return (
    <nav className="navbar glass">
      <div className="navbar-brand">
        <img src="/images/bedjos logo.png" alt="Bedjos Solutions Logo" style={{ height: '40px', marginRight: '1rem', verticalAlign: 'middle' }} />
        Bedjos Solutions
      </div>
      <button className="navbar-toggle" onClick={handleMenuToggle} aria-label="Toggle menu">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>
      <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <li><a href="/" className="nav-link">Home</a></li>
        <li><a href="/services" className="nav-link">Services</a></li>
        <li><a href="/portfolio" className="nav-link">Portfolio</a></li>
        <li><a href="/contact" className="nav-link">Contact</a></li>
      </ul>
    </nav>
  );
}