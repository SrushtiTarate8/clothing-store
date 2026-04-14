import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import './OrdersPage.css';

const OrdersPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetch(`http://localhost:8080/api/orders/${user.userId}`)
      .then(res => res.json())
      .then(data => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        // If backend orders API doesn't exist yet, just show empty state
        setOrders([]);
        setLoading(false);
      });
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="orders-wrapper">
      <div className="orders-container">

        {/* Header */}
        <div className="orders-header">
          <button className="orders-back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <h2 className="orders-title">My Orders</h2>
        </div>

        {loading ? (
          <div className="orders-loading">Loading your orders...</div>
        ) : orders.length === 0 ? (
          /* ── Empty State ── */
          <div className="orders-empty">
            <div className="orders-empty-icon">🛍️</div>
            <h3>No orders yet</h3>
            <p>Looks like you haven't placed any orders. Start shopping!</p>
            <button className="orders-shop-btn" onClick={() => navigate('/')}>
              Shop Now
            </button>
          </div>
        ) : (
          /* ── Orders List ── */
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.orderId} className="order-card">

                {/* Order Meta */}
                <div className="order-card-header">
                  <div>
                    <span className="order-id">Order #{order.orderId}</span>
                    <span className="order-date">
                      {order.date
                        ? new Date(order.date).toLocaleDateString('en-IN', {
                            day: 'numeric', month: 'short', year: 'numeric'
                          })
                        : '—'}
                    </span>
                  </div>
                  <span className={`order-status order-status--${(order.status || 'pending').toLowerCase()}`}>
                    {order.status || 'Pending'}
                  </span>
                </div>

                {/* Order Items */}
                <div className="order-items">
                  {(order.items || []).map((item, idx) => (
                    <div key={idx} className="order-item">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="order-item-img" />
                      )}
                      <div className="order-item-info">
                        <p className="order-item-name">{item.name}</p>
                        {item.size && <p className="order-item-meta">Size: {item.size}</p>}
                        <p className="order-item-meta">Qty: {item.quantity}</p>
                      </div>
                      <p className="order-item-price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  ))}
                </div>

                {/* Order Total */}
                <div className="order-card-footer">
                  <span className="order-total-label">Total Paid</span>
                  <span className="order-total-amount">
                    ₹{(order.totalAmount || 0).toLocaleString('en-IN')}
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;