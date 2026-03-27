import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  
  // Form state variables as specified
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const normalizeKenyanPhone = (phone) => {
    let clean = phone.replace(/\D/g, '');
    if (clean.startsWith('07')) {
      clean = '254' + clean.substring(1);
    }
    if (clean.startsWith('2547') && clean.length === 12) {
      return clean;
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (paymentMethod === 'mpesa') {
        const normalizedPhone = normalizeKenyanPhone(phone);
        if (!normalizedPhone) {
          throw new Error('Please enter valid Kenyan phone (07XXXXXXXX or 2547XXXXXXXX)');
        }
        
        const res = await fetch('http://localhost:5000/api/stkpush', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone: normalizedPhone,
            amount: total,
            order_id: Date.now().toString()
          })
        });
        const data = await res.json();
        if (res.ok) {
          setSuccess('✅ Check your phone for M-Pesa prompt. Enter your PIN.');
          clearCart();
        } else {
          setError(data.error || 'M-Pesa request failed');
        }
      } else {
        const res = await fetch('http://localhost:5000/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer_name: name,
            phone: phone,
            email: email,
            total: total,
            payment_method: 'cod',
            status: 'Pending - Cash on Delivery'
          })
        });
        const data = await res.json();
        if (res.ok) {
          setSuccess('✅ Order placed! Our team will contact you for delivery.');
          clearCart();
          navigate('/');
        } else {
          setError(data.error || 'Failed to place order');
        }
      }
    } catch (err) {
      setError('Connection error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (total === 0) {
    return (
      <section className="checkout-section">
        <h2 className="checkout-title">Checkout</h2>
        <p>Your cart is empty. <a href="/products">Continue shopping</a></p>
      </section>
    );
  }

  return (
    <section className="checkout-section">
      <h2 className="checkout-title">Checkout</h2>
      <form onSubmit={handleSubmit} className="checkout-form glass">
        <input 
          placeholder="Full Name *" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required 
        />
        <input 
          placeholder="Email" 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          placeholder="Phone Number *" 
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required 
        />
        
        <div className="payment-options">
          <label className="payment-radio">
            <input 
              type="radio" 
              value="mpesa"
              checked={paymentMethod === 'mpesa'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            M-Pesa (Recommended)
          </label>
          <label className="payment-radio">
            <input 
              type="radio" 
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>
        </div>

        {paymentMethod === 'mpesa' && (
          <p className="phone-note">Use Kenyan number format: 07XXXXXXXX or 2547XXXXXXXX</p>
        )}

        <p className="total">Total: KES {total.toLocaleString()}</p>
        
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        
        <button type="submit" className="place-order-btn" disabled={loading}>
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </form>
    </section>
  );
}

