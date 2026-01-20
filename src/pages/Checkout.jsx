import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const [formData, setFormData] = useState({ customer_name: '', email: '', phone: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: formData.customer_name,
          phone: formData.phone,
          email: formData.email,
          total: total
        }),
      });
      if (response.ok) {
        clearCart();
        alert('Order placed successfully!');
        navigate('/');
      } else {
        const errorData = await response.json();
        alert(`Error placing order: ${errorData.error || 'Unknown error'}`);
      }
    } catch (err) {
      alert('Error placing order. Please check your connection.');
    }
  };

  return (
    <section className="checkout-section">
      <h2 className="checkout-title">Checkout</h2>
      <form onSubmit={handleSubmit} className="checkout-form glass">
        <input name="customer_name" placeholder="Full Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" onChange={handleChange} />
        <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
        <p>Total: KES {total}</p>
        <button type="submit" className="place-order-btn">Place Order</button>
      </form>
    </section>
  );
}
