import React from 'react';
import { useCart } from '../../context/CartContext';
import './CartBar.css';

const CartBar = ({ onViewCart }) => {
  const { cartCount, cartTotal } = useCart();

  if (cartCount === 0) return null;

  return (
    <div className="cart-bar-wrapper">
      <div className="cart-bar" onClick={onViewCart}>
        <div className="cart-info">
          <div className="cart-icon-container">
            🛒
            <span className="cart-badge">{cartCount}</span>
          </div>
          <div className="cart-total">
            Rp {cartTotal.toLocaleString('id-ID')}
          </div>
        </div>
        <button className="cart-view-btn">Lihat Keranjang</button>
      </div>
    </div>
  );
};

export default CartBar;
