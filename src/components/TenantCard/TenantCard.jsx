import React from 'react';
import './TenantCard.css';

const TenantCard = ({ tenant, onClick }) => {
  const isBusy = tenant.kitchenStatus === 'busy' || tenant.kitchenStatus === 'very-busy';
  const icon = isBusy ? '🕒' : '⚡';
  const avgTime = tenant.avgTime || (isBusy ? '15m' : '8m');

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
          <div className={`tenant-speed-pill ${isBusy ? 'busy' : 'normal'}`} title={isBusy ? "Dapur padat (estimasi ~15m)" : "Dapur lancar (estimasi ~8m)"}>
            <span className="speed-icon">{icon}</span>
            <span className="speed-time">±{avgTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantCard;
