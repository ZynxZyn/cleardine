import React from 'react';
import './TenantCard.css';

const TenantCard = ({ tenant, onClick }) => {
  return (
    <div className="tenant-card" onClick={onClick}>
      <div className="tenant-icon-container">
        <span className="tenant-icon">{tenant.icon || '🍽️'}</span>
      </div>
      <div className="tenant-info">
        <h3 className="tenant-name">{tenant.name}</h3>
        <p className="tenant-cuisine">{tenant.cuisine}</p>
        
        <div className="tenant-meta">
          <span className="tenant-menu-count">{tenant.menuCount} menu</span>
          <div className={`tenant-status-dot ${tenant.kitchenStatus}`}></div>
        </div>
      </div>
    </div>
  );
};

export default TenantCard;
