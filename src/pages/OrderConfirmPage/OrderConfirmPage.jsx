import React, { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './OrderConfirmPage.css';

const OrderConfirmPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { cart, cartTotal, cartEstTime, clearCart } = useCart();
  
  const orderNumberRef = useRef('');
  
  if (!orderNumberRef.current) {
    const randomNum = Math.floor(Math.random() * 900) + 100;
    orderNumberRef.current = `#KA-${randomNum}`;
  }
  
  const tableNo = searchParams.get('table') || 'Dine In';
  
  // Group by restaurant
  const groupedCart = cart.reduce((acc, item) => {
    if (!acc[item.restaurantName]) {
      acc[item.restaurantName] = [];
    }
    acc[item.restaurantName].push(item);
    return acc;
  }, {});

  const tenantCount = Object.keys(groupedCart).length;
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Snapshot data before clearing so UI doesn't crash on unmount if it flashes
  const snapshotTotal = cartTotal;
  const snapshotEstTime = cartEstTime;

  useEffect(() => {
    // We don't clear cart immediately on mount so the user can see what they ordered.
    // We will clear it when they click 'Kembali ke Beranda'.
  }, []);

  const handleBackHome = () => {
    clearCart();
    navigate('/');
  };

  return (
    <div className="order-confirm-page">
      <div className="confetti-container">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`confetti c-${i}`}></div>
        ))}
      </div>

      <div className="success-animation">
        <svg className="checkmark-svg" viewBox="0 0 100 100">
          <circle className="checkmark-bg" cx="50" cy="50" r="45" />
          <circle className="checkmark-circle" cx="50" cy="50" r="45" />
          <polyline className="checkmark-check" points="30,52 45,65 72,38" />
        </svg>
        <div className="sparkle-ring"></div>
        <div className="sparkle-container">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="sparkle-particle"></div>
          ))}
        </div>
      </div>

      <h1 className="success-title">Pesanan Berhasil!</h1>
      <p className="success-subtitle">Dapur sedang menyiapkan pesanan Anda.</p>

      <div className="order-card">
        <div className="order-header">
          <div className="order-number">
            <span>Nomor Pesanan</span>
            <strong>{orderNumberRef.current}</strong>
          </div>
          <div className="order-table">
            <span>Meja</span>
            <strong>{tableNo}</strong>
          </div>
        </div>

        <div className="order-summary-box">
          <div className="os-item">
            <span className="os-icon">🍽️</span>
            <div className="os-text">
              <span className="os-val">{itemCount} Menu</span>
              <span className="os-lbl">dari {tenantCount} tenant</span>
            </div>
          </div>
          <div className="os-item">
            <span className="os-icon">⏱️</span>
            <div className="os-text">
              <span className="os-val">{snapshotEstTime} Menit</span>
              <span className="os-lbl">estimasi waktu</span>
            </div>
          </div>
        </div>

        <div className="order-items-preview">
          {Object.entries(groupedCart).map(([restName, items]) => (
            <div key={restName} className="oi-tenant">
              <div className="oi-tenant-name">{restName}</div>
              {items.map(item => (
                <div key={item.id} className="oi-row">
                  <span className="oi-qty">{item.quantity}x</span>
                  <span className="oi-name">{item.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="order-total-row">
          <span>Total Dibayar</span>
          <strong>Rp {snapshotTotal.toLocaleString('id-ID')}</strong>
        </div>
      </div>

      <button className="back-home-button" onClick={handleBackHome}>
        Kembali ke Beranda
      </button>
    </div>
  );
};

export default OrderConfirmPage;
