import React, { useState, useEffect } from 'react';
import AllergenBadge from '../AllergenBadge/AllergenBadge';
import { useCart } from '../../context/CartContext';
import './DetailModal.css';

const DetailModal = ({ item, isOpen, onClose, restaurantName, restaurantIcon }) => {
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

  const getHealthExplanation = (category) => {
    switch(category) {
      case 'green': return 'Menu ini aman, rendah kalori, mudah dicerna, dan bebas alergen — cocok untuk semua kalangan termasuk lansia.';
      case 'orange': return 'Mengandung gula/lemak/natrium sedang-tinggi atau alergen tertentu. Konsumsi dengan bijak.';
      case 'blue': return 'Pilihan tepat untuk program diet khusus seperti Keto, Vegan, atau Plant-Based.';
      case 'pink': return 'Perhatian: Mengandung beberapa alergen sekaligus. Periksa daftar alergen dengan seksama sebelum memesan.';
      default: return '';
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
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
              <span>Belum Ada Gambar</span>
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

          <div className="modal-section-grid">
            <div className="modal-info-box">
              <span className="info-box-label">PORSI</span>
              <div className="info-box-value">
                {item.weight} • {item.servingSize} {item.pieces && `(${item.pieces})`}
              </div>
            </div>
            
            <div className="modal-info-box">
              <span className="info-box-label">WAKTU</span>
              <div className="info-box-value">
                {item.prepSpeed === 'fast' ? '⚡' : '🕐'} {item.prepTime} menit
              </div>
            </div>
            
            <div className="modal-info-box">
              <span className="info-box-label">NUTRISI</span>
              <div className="info-box-value">
                🔥 {item.calories} kkal
              </div>
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
