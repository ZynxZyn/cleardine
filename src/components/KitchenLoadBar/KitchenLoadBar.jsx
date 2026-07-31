import React from 'react';
import { useCart } from '../../context/CartContext';
import Icon from '../Icon/Icon';
import './KitchenLoadBar.css';

const KitchenLoadBar = ({ restaurant }) => {
  const { cart } = useCart();

  if (!restaurant) return null;

  const maxCapacity = restaurant.maxCapacity || 3;

  // Hitung total porsi yang dipesan dari tenant ini
  const currentLoad = cart
    .filter(item => item.restaurantId === restaurant.id)
    .reduce((sum, item) => sum + item.quantity, 0);

  const loadPercentage = Math.min((currentLoad / maxCapacity) * 100, 100);
  const overflowCount = Math.max(currentLoad - maxCapacity, 0);

  // Tentukan status berdasarkan persentase beban
  const getLoadStatus = () => {
    if (currentLoad === 0) return { level: 'idle', label: 'Siap Menerima Pesanan', color: 'var(--health-green)' };
    if (currentLoad > maxCapacity) return { level: 'overflow', label: `Slot Penuh — ${overflowCount} porsi mengantre`, color: 'var(--health-pink)' };
    if (loadPercentage <= 50) return { level: 'low', label: 'Kapasitas Longgar', color: 'var(--health-green)' };
    if (loadPercentage <= 75) return { level: 'medium', label: 'Kapasitas Sedang', color: 'var(--health-orange)' };
    if (loadPercentage < 100) return { level: 'high', label: 'Mendekati Batas', color: 'var(--health-pink)' };
    return { level: 'full', label: 'Slot Masak Penuh', color: 'var(--health-pink)' };
  };

  const status = getLoadStatus();

  return (
    <div className={`kitchen-load-bar ${status.level}`}>
      <div className="klb-header">
        <div className="klb-title">
          <span className="klb-icon">
            <Icon name="flame" size={16} color="var(--accent)" />
          </span>
          <span>Kapasitas Produksi Dapur</span>
        </div>
        <div className="klb-count" style={{ color: status.color }}>
          {currentLoad}/{maxCapacity} Porsi
        </div>
      </div>

      <div className="klb-track">
        <div
          className={`klb-fill ${status.level === 'overflow' || status.level === 'full' ? 'klb-fill-danger' : ''}`}
          style={{
            width: `${loadPercentage}%`,
            background: status.color,
            boxShadow: `0 0 12px ${status.color}40`
          }}
        >
          {loadPercentage > 20 && (
            <div className="klb-fill-glow"></div>
          )}
        </div>

        {/* Capacity segment markers */}
        {Array.from({ length: maxCapacity - 1 }, (_, i) => (
          <div
            key={i}
            className="klb-marker"
            style={{ left: `${((i + 1) / maxCapacity) * 100}%` }}
          ></div>
        ))}
      </div>

      <div className="klb-status-row">
        <span className="klb-status-dot" style={{ background: status.color }}></span>
        <span className="klb-status-label">{status.label}</span>
      </div>

      {/* Warning card — tampil terpisah dari status row */}
      {(status.level === 'high' || status.level === 'full' || status.level === 'overflow') && (
        <div className={`klb-warning-card ${status.level}`}>
          <div className="klb-warning-icon">
            {status.level === 'high' ? (
              <Icon name="alertTriangle" size={16} color="var(--health-orange)" />
            ) : (
              <Icon name="alertCircle" size={16} color="var(--health-pink)" />
            )}
          </div>
          <div className="klb-warning-text">
            {status.level === 'high' && 'Mendekati batas slot kompor. Waktu tunggu bisa bertambah.'}
            {status.level === 'full' && 'Slot kompor penuh. Porsi berikutnya harus mengantre.'}
            {status.level === 'overflow' && (
              <>
                <strong>{overflowCount} porsi</strong> melebihi kapasitas slot masak.
                Porsi berlebih menunggu giliran kompor kosong.
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default KitchenLoadBar;
