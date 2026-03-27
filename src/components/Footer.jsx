import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer glass" style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--charcoal) 100%)', color: 'var(--white)', marginTop: '4rem' }}>
      <div className="container" style={{ padding: '3rem 1rem 2rem' }}>
        <div className="grid grid-cols-4" style={{ gap: '2rem' }}>
          {/* Company */}
          <div className="footer-section">
            <div className="navbar-brand" style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>
              Bedjos Solutions
            </div>
            <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.6' }}>
              We Think. We Create. We Deliver. 
              <br />Your trusted partner for signage, branding, printing & creative services.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 style={{ color: 'var(--gold)', marginBottom: '1.5rem', fontSize: '1.125rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.75rem' }}><Link to="/" style={{ color: 'rgba(255,255,255,0.8)' }}>🏠 Home</Link></li>
              <li style={{ marginBottom: '0.75rem' }}><Link to="/services" style={{ color: 'rgba(255,255,255,0.8)' }}>🛠️ Services</Link></li>
              <li style={{ marginBottom: '0.75rem' }}><Link to="/portfolio" style={{ color: 'rgba(255,255,255,0.8)' }}>📁 Portfolio</Link></li>
              <li style={{ marginBottom: '0.75rem' }}><Link to="/products" style={{ color: 'rgba(255,255,255,0.8)' }}>🛒 Products</Link></li>
              <li><Link to="/contact" style={{ color: 'rgba(255,255,255,0.8)' }}>📞 Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h4 style={{ color: 'var(--gold)', marginBottom: '1.5rem', fontSize: '1.125rem' }}>Services</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.75rem' }}><span style={{ color: 'rgba(255,255,255,0.8)' }}>🏷️ Signage</span></li>
              <li style={{ marginBottom: '0.75rem' }}><span style={{ color: 'rgba(255,255,255,0.8)' }}>🎨 Branding</span></li>
              <li style={{ marginBottom: '0.75rem' }}><span style={{ color: 'rgba(255,255,255,0.8)' }}>🖨️ Printing</span></li>
              <li style={{ marginBottom: '0.75rem' }}><span style={{ color: 'rgba(255,255,255,0.8)' }}>👕 Apparel</span></li>
              <li><span style={{ color: 'rgba(255,255,255,0.8)' }}>📣 Banners</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-section">
            <h4 style={{ color: 'var(--gold)', marginBottom: '1.5rem', fontSize: '1.125rem' }}>Contact Info</h4>
            <div style={{ color: 'rgba(255,255,255,0.8)' }}>
              <p><strong>📍 Location:</strong> Nairobi, Kenya</p>
              <p><strong>📧 Email:</strong> info@bedjos.co.ke</p>
              <p><strong>📱 Phone:</strong> +254 700 000 000</p>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                <a href="#" style={{ color: 'var(--gold)', fontSize: '1.5rem' }}>📘</a>
                <a href="#" style={{ color: 'var(--gold)', fontSize: '1.5rem' }}>📷</a>
                <a href="#" style={{ color: 'var(--gold)', fontSize: '1.5rem' }}>📺</a>
                <a href="#" style={{ color: 'var(--gold)', fontSize: '1.5rem' }}>🎵</a>
              </div>
            </div>
          </div>
        </div>

        <div style={{ 
          borderTop: '1px solid rgba(255,255,255,0.1)', 
          paddingTop: '2rem', 
          marginTop: '2rem', 
          textAlign: 'center',
          color: 'rgba(255,255,255,0.6)',
          fontSize: '0.9rem'
        }}>
          <p>&copy; {new Date().getFullYear()} Bedjos Solutions Ltd. All rights reserved. | We Think. We Create. We Deliver.</p>
        </div>
      </div>
    </footer>
  );
}
