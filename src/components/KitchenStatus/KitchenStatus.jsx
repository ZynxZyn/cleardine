import React from 'react';
import './KitchenStatus.css';

const KitchenStatus = ({ status }) => {
  let colorVar = '';
  let label = '';
  let description = '';

  switch (status) {
    case 'busy':
      colorVar = 'var(--status-busy)';
      label = 'Dapur Sibuk';
      description = 'Waktu penyajian +5-10 menit dari estimasi';
      break;
    case 'very-busy':
      colorVar = 'var(--status-very-busy)';
      label = 'Dapur Sangat Sibuk';
      description = 'Waktu penyajian +15-20 menit';
      break;
    case 'normal':
    default:
      colorVar = 'var(--status-normal)';
      label = 'Dapur Normal';
      description = 'Waktu penyajian sesuai estimasi';
      break;
  }

  return (
    <div className="kitchen-status">
      <div className="status-indicator">
        <span className="status-dot" style={{ backgroundColor: colorVar }}></span>
        <span className="status-ping" style={{ backgroundColor: colorVar }}></span>
      </div>
      <div className="status-text">
        <span className="status-label" style={{ color: colorVar }}>{label}</span>
        <span className="status-desc">{description}</span>
      </div>
    </div>
  );
};

export default KitchenStatus;
