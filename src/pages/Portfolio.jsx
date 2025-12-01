import React, { useState } from 'react';
import './Portfolio.css';

const projects = [
  {
    title: 'Company Logo',
    images: ['/images/bedjos%20logo.png'],
    desc: 'Bedjos Solutions official logo and branding.'
  },
  {
    title: 'Custom Signage',
    images: ['/images/signage%20photo%201.jpg'],
    desc: 'Eye-catching signage solutions for businesses and events.'
  },
  {
    title: 'Branded Apparel',
    images: ['/images/shirt%20photo%201.jpg'],
    desc: 'Custom printed apparel for teams and promotions.'
  },
  {
    title: 'Event Printing',
    images: ['images/banner%20photo%203.jpg'],
    desc: 'Professional printing services for events and marketing.'
  },
  {
    title: 'Logo Design',
    images: ['/images/bedjos%20logo.png'],
    desc: 'Creative logo design for brand identity.'
  },
  {
    title: 'Shop Branding',
    images: ['images/branding%20photo%206.jpg'],
    desc: 'Complete shop branding and visual identity.'
  },
  {
    title: 'Promotional Materials',
    images: ['/images/photo%2022.jpeg'],
    desc: 'Flyers, brochures, and promotional print materials.'
  },
  {
    title: 'Ceramic Printing',
    images: ['images/branding%20photo%205.jpg'],
    desc: 'Custom ceramic printing for mugs and tiles.'
  },
  {
    title: 'Banner Design',
    images: ['/images/banner%20photo%201.jpg'],
    desc: 'Large format banners for advertising and events.'
  },
  {
    title: 'Digital Graphics',
    images: ['/images/branding%20photo%201.jpg'],
    desc: 'Digital graphics for online and print media.'
  },
  {
    title: 'Poster Creation',
    images: ['images/photo%2017.jpg'],
    desc: 'Creative posters for events and promotions.'
  },
  {
    title: 'Business Cards',
    images: ['images/business%20card%20photo%201.jpg'],
    desc: 'Professional business card design and printing.'
  },
  {
    title: 'T-shirt Printing',
    images: ['images/shirt%20photo%202.jpg'],
    desc: 'Custom t-shirt printing with vibrant colors.'
  },
  {
    title: 'Custom Apparel',
    images: ['/images/shirt%20photo%203.jpg',
      '/images/custom%20jersey%20photo%201.jpg',
      '/images/custom%20jersey%20photo%202.jpg'
    ],
    desc: 'T-shirts, uniforms, promo wear.'
  }
];

export default function Portfolio() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (img) => setSelectedImage(img);
  const closeModal = () => setSelectedImage(null);

  return (
    <section className="portfolio-section">
      <h2 className="portfolio-title">Our Portfolio</h2>
      <p className="portfolio-desc">Dive into our creative universe! Discover stunning branding masterpieces, eye-catching signage solutions, vibrant apparel designs, and innovative printing projects that bring brands to life. 🚀 Follow our journey on <a href="https://share.google/SskNyA8oXi15XzLWK" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i> Instagram</a>, catch our behind-the-scenes on <a href="https://www.youtube.com/@bedjossolutionslimited6992" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i> YouTube</a>, and join the fun on <a href="https://share.google/oCcMNOlb4CNBdRLJL" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok"></i> TikTok</a>. Explore our full gallery on <a href="https://www.facebook.com/BedjosSolutionsLtd" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i> Facebook</a>!</p>
      <div className="portfolio-grid">
        {projects.map((project, idx) => (
          <div className="portfolio-card glass" key={idx}>
            <img src={project.images[0]} alt={`Image of ${project.title}`} className="portfolio-img" onClick={() => openModal(project.images[0])} />
            <div className="portfolio-info">
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedImage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            <img src={selectedImage} alt="Full size" className="modal-img" />
          </div>
        </div>
      )}
      <div className="portfolio-gallery">
        <iframe
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FBedjosSolutionsLtd&tabs=timeline%2Cphotos%2Cvideos&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
          width="340"
          height="500"
          style={{ border: 'none', overflow: 'hidden', borderRadius: '1rem', marginTop: '2rem' }}
          scrolling="no"
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          title="Bedjos Solutions Facebook Gallery"
        ></iframe>
      </div>
    </section>
  );
}
