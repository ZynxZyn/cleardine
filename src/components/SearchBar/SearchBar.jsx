import React from 'react';
import Icon from '../Icon/Icon';
import './SearchBar.css';

const QUICK_CHIPS = [
  { label: 'Ayam', query: 'ayam' },
  { label: 'Tanpa Kacang', query: 'tanpa kacang' },
  { label: 'Rendah Natrium', query: 'tanpa garam' },
  { label: 'Vegetarian', query: 'sayur' },
];

const SearchBar = ({ value, onChange, placeholder = "Cari menu...", showChips = true }) => {
  return (
    <div className="search-bar-wrap">
      <div className="search-container">
        <span className="search-icon">
          <Icon name="search" size={18} color="var(--text-muted)" />
        </span>
        <input
          type="search"
          className="search-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label="Cari menu"
        />
        {value && (
          <button className="search-clear" onClick={() => onChange('')} aria-label="Hapus pencarian">
            <Icon name="close" size={16} />
          </button>
        )}
      </div>
      {showChips && (
        <div className="search-chips" role="group" aria-label="Saran pencarian cepat">
          {QUICK_CHIPS.map(chip => (
            <button
              key={chip.query}
              type="button"
              className={`search-chip ${value === chip.query ? 'active' : ''}`}
              onClick={() => onChange(value === chip.query ? '' : chip.query)}
            >
              {chip.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
