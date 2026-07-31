import React from 'react';
import './ColorFilter.css';

const filters = [
  { id: 'all', label: 'Semua', swatch: null },
  { id: 'green', label: 'Aman', swatch: 'var(--health-green)' },
  { id: 'orange', label: 'Peringatan', swatch: 'var(--health-orange)' },
  { id: 'blue', label: 'Diet', swatch: 'var(--health-blue)' },
  { id: 'pink', label: 'Alergen', swatch: 'var(--health-pink)' },
];

const ColorFilter = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="color-filter-container">
      <span className="color-filter-label">Filter kesehatan:</span>
      <div className="color-filter-chips">
        {filters.map(filter => {
          const isActive = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              className={`color-filter-chip ${isActive ? 'active' : ''}`}
              onClick={() => onFilterChange(filter.id)}
              style={filter.swatch ? { '--chip-swatch': filter.swatch } : undefined}
            >
              {filter.swatch && <span className="chip-swatch" style={{ background: filter.swatch }}></span>}
              {filter.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ColorFilter;
