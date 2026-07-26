import React, { useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import AllergenBadge from '../AllergenBadge/AllergenBadge';
import './CartDrawer.css';

const CartDrawer = ({ isOpen, onClose, onCheckout }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartEstTime, cartCapacityWarnings, cartAllergens } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Group by restaurant
  const groupedCart = cart.reduce((acc, item) => {
    if (!acc[item.restaurantName]) {
      acc[item.restaurantName] = {
        icon: item.restaurantIcon,
        items: []
      };
    }
    acc[item.restaurantName].items.push(item);
    return acc;
  }, {});

  const renderEmptyState = () => (
    <div className="cart-empty">
      <div className="cart-empty-icon">🍽️</div>
      <h3 className="cart-empty-title">Keranjang masih kosong</h3>
      <p className="cart-empty-desc">Silakan pilih menu dari tenant yang tersedia.</p>
      <button className="cart-empty-btn" onClick={onClose}>Mulai Pesan</button>
    </div>
  );

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer-content" onClick={e => e.stopPropagation()}>
        <div className="drawer-header">
          <h2 className="drawer-title">Keranjang</h2>
          <button className="drawer-close" onClick={onClose}>✕</button>
        </div>

        <div className="drawer-body">
          {cart.length === 0 ? renderEmptyState() : (
            <>
              {Object.entries(groupedCart).map(([restName, data]) => (
                <div key={restName} className="cart-tenant-group">
                  <div className="cart-tenant-header">
                    {data.icon} {restName}
                  </div>
                  
                  <div className="cart-items-list">
                    {data.items.map(item => (
                      <div key={item.id} className="cart-item">
                        <img src={item.image || 'https://via.placeholder.com/80'} alt={item.name} className="cart-item-image" />
                        
                        <div className="cart-item-info">
                          <h4 className="cart-item-name">{item.name}</h4>
                          <div className="cart-item-price">Rp {item.price.toLocaleString('id-ID')}</div>
                          
                          <div className="cart-item-actions">
                            <div className="cart-qty-control">
                              <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                              <span>{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                            </div>
                            
                            <button className="cart-item-delete" onClick={() => removeFromCart(item.id)}>
                              🗑️
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="cart-summary">
                <div className="summary-row">
                  <span className="summary-label">⏱️ Estimasi Waktu</span>
                  <span className="summary-value">{cartEstTime} menit</span>
                </div>
                
                {cartCapacityWarnings && cartCapacityWarnings.length > 0 && (
                  <div className="summary-row capacity-warning">
                    <span className="summary-label">⏱️ Catatan Waktu Dapur</span>
                    {cartCapacityWarnings.map((warn, i) => (
                      <div key={i} className="capacity-warning-detail">
                        <strong>{warn.tenantName}</strong>: {
                          warn.kitchenStatus === 'very-busy' 
                            ? '🔴 Dapur Sangat Sibuk (+15-20m)' 
                            : warn.kitchenStatus === 'busy' 
                            ? '🟠 Dapur Sibuk (+5-10m)' 
                            : '🟢 Dapur Normal (±0m)'
                        }
                        {warn.rounds > 1 && ` • Antrean porsi (${warn.totalQty}/${warn.maxCapacity} per slot)`}
                        . Est: ~{warn.tenantTotalTime} menit.
                      </div>
                    ))}
                  </div>
                )}

                {cartAllergens.length > 0 && (
                  <div className="summary-row allergens-warning">
                    <span className="summary-label">⚠️ Peringatan Alergen</span>
                    <AllergenBadge allergens={cartAllergens} compact={false} />
                  </div>
                )}
                
                <div className="summary-row total">
                  <span className="summary-label">Total Pesanan</span>
                  <span className="summary-value">Rp {cartTotal.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer-footer">
            <button className="checkout-btn" onClick={onCheckout}>
              Pesan Sekarang - Rp {cartTotal.toLocaleString('id-ID')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
