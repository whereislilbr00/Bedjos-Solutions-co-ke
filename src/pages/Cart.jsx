import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

export default function Cart() {
  const { cart, total, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <section className="cart-section">
      <h2 className="cart-title">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item glass">
                <img src={item.image_url || '/images/placeholder.jpg'} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p className="cart-item-price">KES {item.price}</p>
                </div>
                <div className="cart-item-controls">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  <button onClick={() => removeFromCart(item.id)} className="remove-btn">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary glass">
            <h3>Total: KES {total}</h3>
            <button onClick={clearCart} className="clear-cart-btn">Clear Cart</button>
            <button onClick={handleCheckout} className="checkout-btn">Checkout</button>
          </div>
        </>
      )}
    </section>
  );
}