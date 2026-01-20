import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({});
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    loadDashboardData();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
  };

  const loadDashboardData = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const headers = { 'Authorization': `Bearer ${token}` };

      // Load stats
      const statsResponse = await fetch('/api/admin/stats', { headers });
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }

      // Load products
      const productsResponse = await fetch('/api/products');
      if (productsResponse.ok) {
        const productsData = await productsResponse.json();
        setProducts(productsData);
      }

      // Load orders
      const ordersResponse = await fetch('/api/admin/orders', { headers });
      if (ordersResponse.ok) {
        const ordersData = await ordersResponse.json();
        setOrders(ordersData);
      }

      // Load messages
      const messagesResponse = await fetch('/api/admin/messages', { headers });
      if (messagesResponse.ok) {
        const messagesData = await messagesResponse.json();
        setMessages(messagesData);
      }

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
    setLoading(false);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...newProduct,
          price: parseFloat(newProduct.price)
        })
      });

      if (response.ok) {
        setNewProduct({ name: '', price: '', category: '', description: '', image: '' });
        loadDashboardData(); // Reload products
        alert('Product added successfully!');
      } else {
        alert('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        loadDashboardData(); // Reload products
        alert('Product deleted successfully!');
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        loadDashboardData(); // Reload orders
        alert('Order status updated!');
      } else {
        alert('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Error updating order status');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_info');
    navigate('/admin/login');
  };

  if (loading) {
    return <div className="admin-dashboard loading">Loading dashboard...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <div className="admin-content">
        <div className="admin-sidebar">
          <button
            className={activeTab === 'overview' ? 'active' : ''}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={activeTab === 'products' ? 'active' : ''}
            onClick={() => setActiveTab('products')}
          >
            Products ({products.length})
          </button>
          <button
            className={activeTab === 'orders' ? 'active' : ''}
            onClick={() => setActiveTab('orders')}
          >
            Orders ({orders.length})
          </button>
          <button
            className={activeTab === 'messages' ? 'active' : ''}
            onClick={() => setActiveTab('messages')}
          >
            Messages ({messages.length})
          </button>
          <button
            className={activeTab === 'add-product' ? 'active' : ''}
            onClick={() => setActiveTab('add-product')}
          >
            Add Product
          </button>
        </div>

        <div className="admin-main">
          {activeTab === 'overview' && (
            <div className="overview-section">
              <h2>Dashboard Overview</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Total Orders</h3>
                  <p className="stat-number">{stats.total_orders || 0}</p>
                </div>
                <div className="stat-card">
                  <h3>Total Revenue</h3>
                  <p className="stat-number">KES {stats.total_revenue?.toLocaleString() || 0}</p>
                </div>
                <div className="stat-card">
                  <h3>Pending Orders</h3>
                  <p className="stat-number">{stats.pending_orders || 0}</p>
                </div>
                <div className="stat-card">
                  <h3>Total Products</h3>
                  <p className="stat-number">{stats.total_products || 0}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="products-section">
              <h2>Product Management</h2>
              <div className="products-grid">
                {products.map(product => (
                  <div key={product.id} className="product-card">
                    <h3>{product.name}</h3>
                    <p>KES {product.price}</p>
                    <p>{product.category}</p>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="orders-section">
              <h2>Order Management</h2>
              <div className="orders-list">
                {orders.map(order => (
                  <div key={order.id} className="order-card">
                    <div className="order-info">
                      <h3>Order #{order.id}</h3>
                      <p><strong>Customer:</strong> {order.customer_name}</p>
                      <p><strong>Phone:</strong> {order.phone}</p>
                      <p><strong>Email:</strong> {order.email}</p>
                      <p><strong>Total:</strong> KES {order.total}</p>
                      <p><strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="order-actions">
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                        className="status-select"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="messages-section">
              <h2>Contact Messages</h2>
              <div className="messages-list">
                {messages.map(message => (
                  <div key={message.id} className="message-card">
                    <div className="message-header">
                      <h3>{message.name}</h3>
                      <span>{new Date(message.created_at).toLocaleDateString()}</span>
                    </div>
                    <p><strong>Email:</strong> {message.email}</p>
                    {message.phone && <p><strong>Phone:</strong> {message.phone}</p>}
                    <p><strong>Message:</strong></p>
                    <p className="message-content">{message.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'add-product' && (
            <div className="add-product-section">
              <h2>Add New Product</h2>
              <form onSubmit={handleAddProduct} className="add-product-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Product Name</label>
                    <input
                      type="text"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Price (KES)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Printing">Printing</option>
                      <option value="Branding">Branding</option>
                      <option value="Digital Services">Digital Services</option>
                      <option value="Design Services">Design Services</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Image URL (optional)</label>
                    <input
                      type="url"
                      value={newProduct.image}
                      onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    rows="4"
                    required
                  />
                </div>
                <button type="submit" className="add-product-btn">Add Product</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
