import React, { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setSubmitted(true);
        setForm({ name: '', email: '', message: '' }); // Clear form
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (err) {
      alert('Network error. Please check your connection.');
    }
  };
  return (
    <section className="contact-section">
      <h2 className="contact-title">Contact Us</h2>
      <div className="contact-info glass">
        <p><strong>Email:</strong> info@bedjossolutions.co.ke</p>
        <p><strong>Phone:</strong> +254 110 041758</p>
        <p><strong>Location:</strong> 6062 - 0300, Bondo, Kenya</p>
        <p><strong>Website:</strong> <a href="https://bedjossolutions.co.ke" target="_blank" rel="noopener noreferrer">bedjossolutions.co.ke</a></p>
        <p><strong>Facebook:</strong> <a href="https://www.facebook.com/BedjosSolutionsLtd" target="_blank" rel="noopener noreferrer">Bedjos Solutions</a></p>
        <p><strong>Instagram:</strong> <a href="https://share.google/SskNyA8oXi15XzLWK" target="_blank" rel="noopener noreferrer">Bedjos Solutions</a></p>
        <p><strong>YouTube:</strong> <a href="https://www.youtube.com/@bedjossolutionslimited6992" target="_blank" rel="noopener noreferrer">Bedjos Solutions</a></p>
        <p><strong>TikTok:</strong> <a href="https://share.google/oCcMNOlb4CNBdRLJL" target="_blank" rel="noopener noreferrer">Bedjos Solutions</a></p>
      </div>
      <form className="contact-form glass" onSubmit={handleSubmit}>
        <h3>Send Us a Message</h3>
        <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
        <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} required rows={4}></textarea>
        <button type="submit">Send</button>
        {submitted && <p className="success-msg">Thank you for contacting us! We'll get back to you soon.</p>}
      </form>
      <div className="contact-map glass">
        <h3>Find Us</h3>
        <iframe
          src="https://www.google.com/maps?q=Bondo,+Kenya&output=embed"
          width="100%"
          height="200"
          style={{ border: 'none', borderRadius: '1rem' }}
          allowFullScreen=""
          loading="lazy"
          title="Bedjos Solutions Location"
        ></iframe>
      </div>
      <div className="contact-footer">
        <p>&copy; 2025 Bedjos Solutions. We Think. We Create. We Deliver.</p>
      </div>
    </section>
  );
}