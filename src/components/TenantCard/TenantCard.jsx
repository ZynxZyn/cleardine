import React from 'react';
import { getKitchenQueue } from '../../utils/kitchenStatus';
import Icon from '../Icon/Icon';
import './TenantCard.css';

const TenantCard = ({ tenant, onClick }) => {
  const status = tenant.kitchenStatus || 'normal';
  const queue = getKitchenQueue(status);

  return (
    <div className="tenant-card" onClick={onClick}>
      <div className="tenant-icon-container">
        <span className="tenant-icon">{tenant.icon ? tenant.icon : tenant.name?.charAt(0) || ''}</span>
      </div>
      <div className="tenant-info">
        <h3 className="tenant-name">{tenant.name}</h3>
        <p className="tenant-cuisine">{tenant.cuisine}</p>
        
        <div className="tenant-meta">
          <span className="tenant-menu-count">{tenant.menuCount} menu</span>
          <div 
            className={`tenant-speed-pill ${queue.className}`}
            title={queue.desc}
          >
            <span className="speed-dot-indicator"></span>
            <span className="speed-text">
              <span className="speed-status">{queue.statusLabel}</span>
              <span className="speed-sep">·</span>
              <span className="speed-time">{queue.timeLabel}</span>
            </span>
          </div>
        </div>
      </div>
      <span className="tenant-chevron" aria-hidden="true">
        <Icon name="chevronRight" size={18} color="var(--text-muted)" />
      </span>
    </div>
  );
};

export default TenantCard;
