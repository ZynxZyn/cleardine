import React from 'react';
import './AllergenBadge.css';

const allergenMap = {
  'Kacang Tanah': '🥜',
  'Seafood': '🦐',
  'Susu': '🥛',
  'Gluten': '🌾',
  'Kedelai': '🫘'
};

const AllergenBadge = ({ allergens = [], compact = false }) => {
  if (!allergens || allergens.length === 0) return null;

  return (
    <div className={`allergen-container ${compact ? 'compact' : ''}`}>
      {allergens.map((allergen, index) => (
        <span key={index} className="allergen-badge" title={allergen}>
          <span className="allergen-icon">{allergenMap[allergen] || '⚠️'}</span>
          {!compact && <span className="allergen-label">{allergen}</span>}
        </span>
      ))}
    </div>
  );
};

export default AllergenBadge;
