import React from 'react';
import './ColorFilter.css';

const filters = [
  { id: 'all', label: 'Semua', color: 'var(--text-primary)', bg: 'var(--glass-bg)', border: 'var(--glass-border)' },
  { id: 'green', label: '🟢 Aman', color: 'var(--health-green)', bg: 'var(--health-green-bg)', border: 'var(--health-green-border)' },
  { id: 'orange', label: '🟠 Peringatan', color: 'var(--health-orange)', bg: 'var(--health-orange-bg)', border: 'var(--health-orange-border)' },
  { id: 'blue', label: '🔵 Diet', color: 'var(--health-blue)', bg: 'var(--health-blue-bg)', border: 'var(--health-blue-border)' },
  { id: 'pink', label: '🔴 Alergen', color: 'var(--health-pink)', bg: 'var(--health-pink-bg)', border: 'var(--health-pink-border)' }
];

const ColorFilter = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="color-filter-container">
      {filters.map(filter => {
        const isActive = activeFilter === filter.id;
        return (
          <button
            key={filter.id}
            className={`color-filter-chip ${isActive ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.id)}
            style={{
              '--chip-color': filter.color,
              '--chip-bg': filter.bg,
              '--chip-border': filter.border
            }}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
};

export default ColorFilter;
