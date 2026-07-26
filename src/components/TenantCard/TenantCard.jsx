import React from 'react';
import './TenantCard.css';

const TenantCard = ({ tenant, onClick }) => {
  const isBusy = tenant.kitchenStatus === 'busy' || tenant.kitchenStatus === 'very-busy';
  const icon = isBusy ? '🕒' : '⚡';
  
  let timeText = '±0m';
  if (tenant.kitchenStatus === 'very-busy') {
    timeText = '+15-20m';
  } else if (tenant.kitchenStatus === 'busy') {
    timeText = '+5-10m';
  } else {
    timeText = tenant.avgTime || '±0m';
  }

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
          <div 
            className={`tenant-speed-pill ${tenant.kitchenStatus || 'normal'}`} 
            title={
              tenant.kitchenStatus === 'very-busy' 
                ? "Dapur sangat sibuk (penambahan +15-20m)" 
                : tenant.kitchenStatus === 'busy' 
                ? "Dapur sibuk (penambahan +5-10m)" 
                : "Dapur normal (penyajian sesuai estimasi ±0m)"
            }
          >
            <span className="speed-icon">{icon}</span>
            <span className="speed-time">{timeText}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantCard;
