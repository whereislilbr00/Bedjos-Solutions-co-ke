import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const stats = [
  { number: 500, label: 'Projects', suffix: '+' },
  { number: 100, label: 'Clients', suffix: '+' },
  { number: 10, label: 'Years', suffix: '+' },
];

const services = [
  { title: 'Signage', icon: '🏷️', desc: 'Eye-catching signs & displays' },
  { title: 'Branding', icon: '🎨', desc: 'Complete brand identity' },
  { title: 'Printing', icon: '🖨️', desc: 'High-quality print solutions' },
  { title: 'Custom Apparel', icon: '👕', desc: 'Branded uniforms & merch' },
  { title: 'Banners', icon: '📣', desc: 'Large format advertising' },
  { title: 'Business Cards', icon: '💳', desc: 'Professional stationery' },
];

const testimonials = [
  {
    quote: "Bedjos delivered exceptional signage for our store. Professional, fast, and high quality!",
    author: "John M.",
    role: "Retail Business Owner",
    rating: "⭐⭐⭐⭐⭐"
  },
  {
    quote: "From concept to completion, Bedjos delivered innovative branding that exceeded our expectations.",
    author: "Sarah K.",
    role: "Marketing Manager",
    rating: "⭐⭐⭐⭐⭐"
  },
  {
    quote: "Best printing service in Nairobi. Our banners and business cards looked amazing!",
    author: "David O.",
    role: "Event Organizer",
    rating: "⭐⭐⭐⭐⭐"
  },
];

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({});
  const statsRef = useRef([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting && !animatedStats[index]) {
          setAnimatedStats(prev => ({ ...prev, [index]: true }));
        }
      });
    });

    statsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [animatedStats]);

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getStatValue = (index) => {
    if (animatedStats[index]) {
      return stats[index].number;
    }
    return 0;
  };

  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-bg">
        <div className="container">
          <div className="section-header fade-in-up">
            <h1 className="fade-in-up">We Think. We Create. We Deliver.</h1>
            <p className="fade-in-up" style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Professional Signs, Branding, Printing & Creative Services. Elevate your business with bold, impactful solutions.
            </p>
          </div>
          
          <div className="cta-buttons fade-in-up" style={{ justifyContent: 'center', gap: '1.5rem' }}>
            <Link to="/services" className="btn cta-hero">Explore Services</Link>
            <Link to="/portfolio" className="btn cta-hero btn-gold">View Portfolio</Link>
          </div>

          {/* Stats */}
          <div className="stats-grid fade-in-up" style={{ marginTop: '4rem' }}>
            {stats.map((stat, index) => (
              <div key={stat.label} className="stat" ref={el => (statsRef.current[index] = el)}>
                <div className="stat-number">
                  {formatNumber(getStatValue(index))}{stat.suffix}
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main>
        {/* Why Us / Features */}
        <section className="section why-us-section">
          <div className="container">
            <div className="section-header">
              <h2>Why Choose Bedjos Solutions?</h2>
              <p>Expert craftsmanship backed by years of experience and unwavering commitment to excellence.</p>
            </div>
            <div className="grid grid-cols-4">
              <div className="card fade-in-up">
                <div className="feature-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <h3>Precision & Quality</h3>
                <p>Every project crafted with meticulous attention to detail, ensuring top-notch results.</p>
              </div>
              <div className="card fade-in-up" style={{ animationDelay: '0.1s' }}>
                <div className="feature-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀</div>
                <h3>Fast Turnaround</h3>
                <p>Quick delivery without compromising quality. We value your time.</p>
              </div>
              <div className="card fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="feature-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>💡</div>
                <h3>Innovative Solutions</h3>
                <p>Creative thinking meets cutting-edge techniques for unique results.</p>
              </div>
              <div className="card fade-in-up" style={{ animationDelay: '0.3s' }}>
                <div className="feature-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>❤️</div>
                <h3>Customer-Centric</h3>
                <p>Your satisfaction is our priority. Tailored solutions for your needs.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="section services-preview glass" style={{ background: 'rgba(255,255,255,0.5)' }}>
          <div className="container">
            <div className="section-header">
              <h2>Our Core Services</h2>
              <p>Comprehensive solutions for all your branding and printing needs</p>
            </div>
            <div className="grid grid-cols-3">
              {services.map((service, index) => (
                <Link key={service.title} to="/services" className="card fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="service-icon" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </Link>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Link to="/services" className="btn btn-gold">View All Services</Link>
            </div>
          </div>
        </section>

        {/* NEW Testimonials - Clean Carousel BEFORE Shop */}
        <section className="section testimonials-section">
          <div className="container">
            <div className="section-header">
              <h2>What Our Clients Say</h2>
              <p>Trusted by businesses across industries</p>
            </div>
            <div className="testimonial-wrapper" style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
              <button 
                className="nav-arrow left" 
                onClick={prevTestimonial}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '0',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.9)',
                  border: 'none',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  zIndex: 10,
                  boxShadow: 'var(--shadow-md)',
                  fontSize: '1.5rem'
                }}
              >
                ‹
              </button>
              <div className="testimonial-card glass" style={{ padding: '3rem 2.5rem', borderRadius: '1.5rem', textAlign: 'center', position: 'relative' }}>
                <div className="avatar" style={{ 
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--gold), var(--amber))',
                  margin: '0 auto 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: 'var(--navy)',
                  boxShadow: 'var(--shadow-lg)'
                }}>
                  {testimonials[currentTestimonial].author.charAt(0)}
                </div>
                <div className="rating" style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--gold)' }}>
                  {testimonials[currentTestimonial].rating}
                </div>
                <blockquote style={{ fontSize: '1.375rem', lineHeight: 1.6, color: 'var(--charcoal)', marginBottom: '2rem', fontStyle: 'italic', fontWeight: 300 }}>
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                <div className="author-info">
                  <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--navy)', marginBottom: '0.25rem' }}>
                    {testimonials[currentTestimonial].author}
                  </div>
                  <div style={{ fontSize: '1.125rem', color: 'var(--dark-gray)' }}>
                    {testimonials[currentTestimonial].role}
                  </div>
                </div>
              </div>
              <button 
                className="nav-arrow right" 
                onClick={nextTestimonial}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '0',
                  transform: 'translateY(-50%)',
                  background: 'rgba(255,255,255,0.9)',
                  border: 'none',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  zIndex: 10,
                  boxShadow: 'var(--shadow-md)',
                  fontSize: '1.5rem'
                }}
              >
                ›
              </button>
              <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '1rem' }}>
                {testimonials.map((_, index) => (
                  <button
                    key={`dot-${index}`}
                    className={`testimonial-dot ${currentTestimonial === index ? 'active' : ''}`}
                    onClick={() => setCurrentTestimonial(index)}
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      border: 'none',
                      background: currentTestimonial === index ? 'var(--gold)' : 'rgba(255,255,255,0.5)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      boxShadow: currentTestimonial === index ? '0 0 0 2px rgba(218,165,32,0.5)' : 'none'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Shop CTA */}
        <section className="section shop-cta-section glass">
          <div className="container">
            <div className="section-header">
              <h2>Visit Our Shop</h2>
              <p>Premium materials, fast delivery, quality guaranteed</p>
            </div>
            <div className="grid grid-cols-2" style={{ gap: '3rem', alignItems: 'center' }}>
              <div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>✨</span> Premium Materials
                  </li>
                  <li style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>🚚</span> Fast Delivery
                  </li>
                  <li style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>💯</span> Quality Guaranteed
                  </li>
                  <li style={{ fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>🎨</span> Custom Designs
                  </li>
                </ul>
                <Link to="/products" className="btn btn-gold" style={{ marginTop: '1rem' }}>Shop Now</Link>
              </div>
              <div className="shop-image" style={{ position: 'relative' }}>
                <img 
                  src={`${import.meta.env.BASE_URL}images/bedjos  shop.jpg`} 
                  alt="Bedjos Solutions Shop" 
                  className="img-responsive"
                  style={{ boxShadow: 'var(--shadow-xl)', borderRadius: '1.5rem' }}
                />

              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

