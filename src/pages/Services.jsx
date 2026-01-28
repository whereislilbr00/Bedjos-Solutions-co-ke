import React, { useState } from 'react';
import './Services.css';


const services = [
  {
    title: 'Graphic Design',
    icon: '🎨',
    desc: 'Logos, flyers, posters, and more.',
    price: 'From KES 2,000',
    images: [
      'images/photo%2011.jpg',
      'images/photo%2012.jpg',
      'images/photo%2017.jpg'
    ]
  },
  {
    title: 'Branding',
    icon: '🏷️',
    desc: 'Custom branding packages.',
    price: 'From KES 5,000',
    images: [
      'images/photo%2013.jpg',
      'images/photo%2016.jpg',
      'images/photo%2018.jpg',
      'images/branding%20photo%201.jpg',
      'images/branding%20photo%202.jpg',
      'images/branding%20photo%203.jpg',
      'images/branding%20photo%204.jpg',
      'images/branding%20photo%205.jpg',
      'images/branding%20photo%206.jpg',
      'images/branding%20photo%207.jpg'
    ]
  },
  {
    title: 'Printing & Signage',
    icon: '🖨️',
    desc: 'Business cards, banners, signage.',
    price: 'From KES 1,500',
    images: [
      'images/photo%201.jpg',
      'images/photo%203.jpg',
      'images/photo%205.jpg',
      'images/photo%2011.jpg',
      'images/photo%2012.jpg',
      'images/banner%20photo%201.jpg',
      'images/banner%20photo%202.jpg',
      'images/banner%20photo%203.jpg',
      'images/banner%20photo%204.jpg',
      'images/banner%20photo%205.jpg',
      'images/signage%20photo%201.jpg',
      'images/signage%20photo%202.jpg',
      'images/signage%20photo%203.jpg',
      'images/signage%20photo%204.jpg',
      'images/signage%20photo%205.jpg',
      'images/business%20card%20photo%201.jpg'
    ]
  },
  {
    title: 'DTF Printing Technology',
    icon: '🖨️',
    desc: 'High-quality direct-to-film printing for custom designs.',
    price: 'From KES 1,000',
    images: [
      'images/WhatsApp Image 2026-01-23 at 8.25.11 AM (1).jpeg',
      'images/WhatsApp Image 2026-01-23 at 8.25.11 AM.jpeg'
    ]
  },
  {
    title: 'Custom Apparel',
    icon: '👕',
    desc: 'T-shirts, uniforms, promo wear, and embroidery services.',
    price: 'From KES 1,200',
    images: [
      'images/photo%207.jpg',
      'images/photo%208.jpg',
      'images/photo%2014.jpg',
      'images/custom%20jersery%20photo%201.jpg',
      'images/custom%20jersey%20photo%202.jpg',
      'images/custom%20jersey%20photo%203.jpg',
      'images/custom%20jersey%20photo%204.jpg',
      'images/custom%20jersey%20photo%205.jpg',
      'images/shirt%20photo%201.jpg',
      'images/shirt%20photo%202.jpg',
      'images/shirt%20photo%203.jpg',
      'images/shirt%20photo%204.jpg',
      'images/shirt%20photo%205.jpg'
    ]
  },
  {
    title: 'Bedjos Sports House',
    icon: '🏆',
    desc: 'Selling high-quality sports goods and equipment.',
    price: 'From KES 500',
    images: [
      'images/custom%20jersery%20photo%201.jpg',
      'images/custom%20jersey%20photo%202.jpg',
      'images/custom%20jersey%20photo%203.jpg',
      'images/custom%20jersey%20photo%204.jpg',
      'images/custom%20jersey%20photo%205.jpg'
    ]
  }
];

export default function Services() {
  const [selectedIdx, setSelectedIdx] = useState(null);

  return (
    <section className="services-section">
      <h2 className="services-title">Our Business Services</h2>
      <div className="services-list">
        {services.map((service, idx) => (
          <div
            className={`service-card glass${selectedIdx === idx ? ' active' : ''}`}
            key={idx}
            onClick={() => setSelectedIdx(idx)}
            style={{ cursor: 'pointer' }}
          >
            <div className="service-icon">{service.icon}</div>
            <div className="service-info">
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <p className="service-price">{service.price}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedIdx !== null && (
        <div className="service-gallery">
          <h3 style={{ color: '#1565c0' }}>Gallery: {services[selectedIdx].title}</h3>
          <div className="gallery-images">
            {services[selectedIdx].images.map((img, i) => (
              <img
                src={`${import.meta.env.BASE_URL}${img}`}
                alt={`${services[selectedIdx].title} ${i + 1}`}
                key={i}
                className="service-img"
                style={{ maxWidth: '200px', margin: '0.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 8px rgba(21,101,192,0.15)' }}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}