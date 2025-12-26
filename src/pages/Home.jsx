import React from 'react';
import './Home.css';

export default function Home() {
  return (
    <section className="home-landing">
      <div className="welcome-card glass" style={{ background: 'linear-gradient(135deg, #e3f2fd 0%, #fff 100%)', boxShadow: '0 8px 32px 0 rgba(21,101,192,0.12)' }}>
        <div className="navbar-brand" style={{ fontSize: '2.5rem', color: '#1565c0', marginBottom: '0.5rem', letterSpacing: '2px', textShadow: '0 2px 8px #90caf9' }}>BEDJOS SOLUTIONS</div>
        <p className="subtitle" style={{ fontSize: '1.3rem', color: '#1976d2', fontWeight: '500', marginBottom: '0.5rem' }}>Signs, Branding, Printing, and Creative Services.</p>
        <p className="desc" style={{ fontSize: '1.1rem', color: '#333', marginBottom: '1.2rem', fontStyle: 'italic', background: 'rgba(21,101,192,0.05)', padding: '0.5rem 1rem', borderRadius: '0.5rem' }}>
          <span style={{ color: '#1976d2', fontWeight: 'bold' }}>We think.</span> <span style={{ color: '#b85c38', fontWeight: 'bold' }}>We create.</span> <span style={{ color: '#1976d2', fontWeight: 'bold' }}>We deliver.</span> <br />
          <span style={{ color: '#1565c0' }}>Explore our craft and see how we bring brands to life!</span>
        </p>
        <div className="features-grid">
          <div className="feature-item">
            <img src={`${import.meta.env.BASE_URL}images/WhatsApp%20Image%202025-12-10%20at%201.54.42%20PM%20(5).jpeg`} alt="Precision & Quality" className="feature-icon-image" />
            <h4>Precision & Quality</h4>
            <p>Every project is crafted with meticulous attention to detail, ensuring top-notch results that exceed expectations.</p>
          </div>
          <div className="feature-item">
            <img src={`${import.meta.env.BASE_URL}images/WhatsApp%20Image%202025-12-10%20at%201.54.43%20PM.jpeg`} alt="Fast Turnaround" className="feature-icon-image" />
            <h4>Fast Turnaround</h4>
            <p>Quick delivery without compromising quality. We value your time and meet deadlines consistently.</p>
          </div>
          <div className="feature-item">
            <img src={`${import.meta.env.BASE_URL}images/WhatsApp%20Image%202025-12-10%20at%201.54.42%20PM%20(4).jpeg`} alt="Innovative Solutions" className="feature-icon-image" />
            <h4>Innovative Solutions</h4>
            <p>Creative thinking meets cutting-edge techniques to bring your vision to life in unique ways.</p>
          </div>
          <div className="feature-item">
            <img src={`${import.meta.env.BASE_URL}images/WhatsApp%20Image%202025-12-10%20at%201.54.42%20PM%20(3).jpeg`} alt="Customer-Centric" className="feature-icon-image" />
            <h4>Customer-Centric</h4>
            <p>Your satisfaction is our priority. We work closely with you to understand and fulfill your specific needs.</p>
          </div>
        </div>

        <div className="shop-showcase">
          <h3 style={{ color: '#b85c38', textAlign: 'center', marginBottom: '1rem', fontSize: '1.8rem' }}>🏪 Visit Our Shop Today!</h3>
          <div className="shop-content">
            <div className="shop-text">
              <p style={{ fontSize: '1.2rem', color: '#1565c0', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                Discover Premium Quality Products & Services
              </p>
              <p style={{ color: '#333', marginBottom: '1rem' }}>
                Transform your business with our expertly crafted signage, branding materials, and custom apparel.
                From eye-catching banners to professional business cards, we have everything you need to make your brand stand out!
              </p>
              <div className="shop-features">
                <span className="shop-feature">✨ Premium Materials</span>
                <span className="shop-feature">🚚 Fast Delivery</span>
                <span className="shop-feature">💯 Quality Guaranteed</span>
                <span className="shop-feature">🎨 Custom Designs</span>
              </div>
            </div>
            <div className="shop-image">
              <img src={`${import.meta.env.BASE_URL}images/bedjos%20%20shop.jpg`} alt="Bedjos Solutions Shop" />
              <div className="image-overlay">
                <span className="overlay-text">Your One-Stop Branding Solution</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="gallery">
        <img src={`${import.meta.env.BASE_URL}images/photo%201.jpg`} alt="Our Work Sample 1" className="gallery-img" />
        <img src={`${import.meta.env.BASE_URL}images/photo%208.jpg`} alt="Our Work Sample 2" className="gallery-img" />
        <img src={`${import.meta.env.BASE_URL}images/photo%203.jpg`} alt="Our Work Sample 3" className="gallery-img" />
        <img src={`${import.meta.env.BASE_URL}images/photo%205.jpg`} alt="Our Work Sample 4" className="gallery-img" />
      </div>
    </section>
  );
}