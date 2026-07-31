import React from 'react';
import { getKitchenQueue } from '../../utils/kitchenStatus';
import './KitchenStatus.css';

const KitchenStatus = ({ status }) => {
  const queue = getKitchenQueue(status);

  return (
    <div className={`kitchen-status ${queue.className}`}>
      <div className="status-indicator">
        <span className="status-dot"></span>
        <span className="status-ping"></span>
      </div>
      <div className="status-text">
        <span className="status-label">{queue.statusLabel} · {queue.timeLabel}</span>
        <span className="status-desc">{queue.desc}</span>
      </div>
    </div>
  );
};

export default KitchenStatus;
