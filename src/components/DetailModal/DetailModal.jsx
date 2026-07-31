import React, { useState, useEffect } from 'react';
import AllergenBadge from '../AllergenBadge/AllergenBadge';
import { useCart } from '../../context/CartContext';
import { getKitchenQueue } from '../../utils/kitchenStatus';
import Icon from '../Icon/Icon';
import './DetailModal.css';

const DetailModal = ({ item, isOpen, onClose, restaurantName, restaurantIcon, kitchenStatus }) => {
  const { getItemQuantity, updateQuantity, addToCart } = useCart();
  const [localQty, setLocalQty] = useState(1);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (isOpen && item) {
      const cartQty = getItemQuantity(item.id);
      setLocalQty(cartQty > 0 ? cartQty : 1);
      setImageError(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, item, getItemQuantity]);

  if (!isOpen || !item) return null;

  const inCartQty = getItemQuantity(item.id);
  const isUpdating = inCartQty > 0;

  const handleIncrease = () => setLocalQty(prev => prev + 1);
  const handleDecrease = () => setLocalQty(prev => Math.max(1, prev - 1));

  const handleSave = () => {
    if (isUpdating) {
      updateQuantity(item.id, localQty);
    } else {
      addToCart(item, localQty, restaurantName, restaurantIcon);
    }
    onClose();
  };

  const getKitchenExtra = () => {
    if (kitchenStatus === 'very-busy') return 18;
    if (kitchenStatus === 'busy') return 8;
    return 0;
  };

  const totalPrepMinutes = item.prepTime + getKitchenExtra();
  const kitchenQueue = getKitchenQueue(kitchenStatus);

  const getHealthLabel = (category) => {
    switch(category) {
      case 'green': return { label: 'Aman & Ramah Lansia', class: 'green' };
      case 'orange': return { label: 'Perlu Perhatian Medis', class: 'orange' };
      case 'blue': return { label: 'Opsi Diet Khusus', class: 'blue' };
      case 'pink': return { label: 'Peringatan Alergen', class: 'pink' };
      default: return null;
    }
  };

  const getHealthExplanation = (category) => {
    switch(category) {
      case 'green': return 'Menu ini aman, rendah kalori, mudah dicerna, dan bebas alergen — cocok untuk semua kalangan termasuk lansia.';
      case 'orange': return 'Mengandung gula/lemak/natrium sedang-tinggi atau alergen tertentu. Konsumsi dengan bijak.';
      case 'blue': return 'Pilihan tepat untuk program diet khusus seperti Keto, Vegan, atau Plant-Based.';
      case 'pink': return 'Perhatian: Mengandung beberapa alergen sekaligus. Periksa daftar alergen dengan seksama sebelum memesan.';
      default: return '';
    }
  };

  const healthInfo = getHealthLabel(item.healthCategory);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Tutup">
          <Icon name="close" size={20} />
        </button>
        
        <div className="modal-image-container">
          {!imageError && item.image ? (
            <img 
              src={item.image} 
              alt={item.name} 
              className="modal-image" 
              onError={() => setImageError(true)} 
            />
          ) : (
            <div className="modal-image-fallback">
              <Icon name="utensils" size={40} color="var(--text-muted)" />
            </div>
          )}
        </div>

        <div className="modal-body">
          <div className="modal-header">
            <h2 className="modal-title">{item.name}</h2>
            <div className="modal-restaurant">
              {restaurantIcon} {restaurantName}
            </div>
          </div>
          
          <div className="modal-price">Rp {item.price.toLocaleString('id-ID')}</div>
          
          {item.description && <p className="modal-description">{item.description}</p>}

          {healthInfo && (
            <div className={`modal-health-badge health-badge-${healthInfo.class}`}>
              <span className="health-swatch-icon" aria-hidden="true"></span>
              {healthInfo.label}
            </div>
          )}

          <div className="modal-transparency-block">
            <h3 className="transparency-title">Transparansi Porsi</h3>
            <div className="transparency-portion">
              <div className="portion-stat">
                <span className="portion-value">{item.weight}</span>
                <span className="portion-label">Berat bersih</span>
              </div>
              <div className="portion-divider"></div>
              <div className="portion-stat">
                <span className="portion-value">{item.servingSize}</span>
                <span className="portion-label">Porsi</span>
              </div>
              {item.pieces && (
                <>
                  <div className="portion-divider"></div>
                  <div className="portion-stat">
                    <span className="portion-value">{item.pieces}</span>
                    <span className="portion-label">Potong</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className={`modal-time-block ${kitchenQueue.className}`}>
            <div className="time-block-header">
              <div className="time-block-title">
                <Icon name="clock" size={16} color="var(--accent)" />
                <span>Estimasi Penyajian</span>
              </div>
              <span className={`time-status-pill ${kitchenQueue.className}`}>
                <span className="speed-dot-indicator"></span>
                {kitchenQueue.statusLabel} ({kitchenQueue.timeLabel})
              </span>
            </div>
            
            <div className="time-block-body">
              <div className="time-big-display">
                <span className="time-big-num">~{totalPrepMinutes}</span>
                <span className="time-big-unit">menit</span>
              </div>
              <div className="time-breakdown">
                <p className="time-breakdown-main">
                  Waktu masak: <strong>{item.prepTime} menit</strong> {kitchenStatus !== 'normal' ? `+ Antrean (${kitchenQueue.timeLabel})` : '(Dapur lancar)'}
                </p>
                <p className="time-breakdown-sub">{kitchenQueue.desc}</p>
              </div>
            </div>
          </div>

          <div className="modal-info-row">
            <div className="modal-info-box compact">
              <span className="info-box-label">KALORI</span>
              <div className="info-box-value">{item.calories} kkal</div>
            </div>
          </div>

          <div className="modal-section">
            <h3 className="section-title">BAHAN BAKU</h3>
            <div className="ingredients-list">
              {item.ingredients.map((ing, i) => (
                <span key={i} className="ingredient-tag">{ing}</span>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <h3 className="section-title">ALERGEN</h3>
            {item.allergens && item.allergens.length > 0 ? (
              <AllergenBadge allergens={item.allergens} compact={false} />
            ) : (
              <div className="no-allergen-msg">✅ Tidak mengandung alergen umum</div>
            )}
          </div>
          
          <div className={`health-explanation health-bg-${item.healthCategory}`}>
            {getHealthExplanation(item.healthCategory)}
          </div>
        </div>

        <div className="modal-footer">
          <div className="modal-qty-picker">
            <button onClick={handleDecrease} className="modal-qty-btn">-</button>
            <span className="modal-qty-value">{localQty}</span>
            <button onClick={handleIncrease} className="modal-qty-btn">+</button>
          </div>
          
          <button className="modal-action-btn" onClick={handleSave}>
            {isUpdating ? 'Update Keranjang' : 'Tambah ke Keranjang'} - Rp {(item.price * localQty).toLocaleString('id-ID')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
