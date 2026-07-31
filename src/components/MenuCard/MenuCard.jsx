import React, { useState } from 'react';
import AllergenBadge from '../AllergenBadge/AllergenBadge';
import { useCart } from '../../context/CartContext';
import Icon from '../Icon/Icon';
import './MenuCard.css';

const MenuCard = ({ item, onViewDetail, restaurantName, restaurantIcon }) => {
  const { getItemQuantity, addToCart, updateQuantity } = useCart();
  const quantity = getItemQuantity(item.id);
  const [imageError, setImageError] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(item, 1, restaurantName, restaurantIcon);
  };

  const handleIncrease = (e) => {
    e.stopPropagation();
    updateQuantity(item.id, quantity + 1);
  };

  const handleDecrease = (e) => {
    e.stopPropagation();
    updateQuantity(item.id, quantity - 1);
  };

  return (
    <div className={`menu-card health-${item.healthCategory}`} onClick={() => onViewDetail(item)}>
      <div className="menu-image-container">
        {!imageError && item.image ? (
          <img 
            src={item.image} 
            alt={item.name} 
            className="menu-image" 
            onError={() => setImageError(true)} 
          />
        ) : (
          <div className="menu-image-fallback">
            <Icon name="utensils" size={32} color="var(--text-muted)" />
          </div>
        )}
        
        <div className="menu-badges-top">
          {item.isPopular && <span className="menu-badge popular">Populer</span>}
          {item.isNew && <span className="menu-badge new">Baru</span>}
        </div>
      </div>
      
      <div className="menu-content">
        <h4 className="menu-name">{item.name}</h4>
        
        <div className="menu-meta">
          <span className="menu-weight">{item.weight}</span>
          <span className="menu-time">
            {item.prepTime}m
          </span>
        </div>
        
        {item.allergens && item.allergens.length > 0 && (
          <div className="menu-allergens">
            <AllergenBadge allergens={item.allergens} compact={true} />
          </div>
        )}
        
        <div className="menu-footer">
          <span className="menu-price">Rp {item.price.toLocaleString('id-ID')}</span>
          
          <div className="menu-action">
            {quantity === 0 ? (
              <button className="menu-add-btn" onClick={handleAdd} aria-label="Add to cart">
                +
              </button>
            ) : (
              <div className="menu-qty-control">
                <button onClick={handleDecrease} className="qty-btn">-</button>
                <span className="qty-value">{quantity}</span>
                <button onClick={handleIncrease} className="qty-btn">+</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
