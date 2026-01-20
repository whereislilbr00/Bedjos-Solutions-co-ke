import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import './Products.css';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // For now, using mock data. Replace with actual API call later
      const mockProducts = [
        { id: 1, name: 'Custom Logo Design', description: 'Professional logo design service', price: 2000, stock: 10, image_url: '/images/bedjos logo.png' },
        { id: 2, name: 'Business Card Printing', description: 'High-quality business cards', price: 1500, stock: 50, image_url: '/images/business card photo 1.jpg' },
        { id: 3, name: 'Banner Design', description: 'Eye-catching banners for events', price: 3000, stock: 20, image_url: '/images/banner photo 1.jpg' },
        { id: 4, name: 'T-shirt Printing', description: 'Custom t-shirt printing', price: 1200, stock: 30, image_url: '/images/shirt photo 1.jpg' },
        { id: 5, name: 'Signage Installation', description: 'Professional signage services', price: 5000, stock: 5, image_url: '/images/signage photo 1.jpg' },
        { id: 6, name: 'Sports Jersey', description: 'Custom sports jerseys', price: 2500, stock: 15, image_url: '/images/custom jersey photo 1.jpg' }
      ];
      setProducts(mockProducts);
      setLoading(false);
    } catch (err) {
      setError('Failed to load products');
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <section className="products-section">
      <h2 className="products-title">Our Products</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card glass">
            <img src={product.image_url || '/images/placeholder.jpg'} alt={product.name} className="product-img" />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="product-price">KES {product.price}</p>
              <p className="product-stock">Stock: {product.stock}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="add-to-cart-btn"
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
