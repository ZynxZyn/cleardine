import React from 'react';
import Icon from '../Icon/Icon';
import './AllergenBadge.css';

const allergenMap = {
  'Kacang Tanah': <Icon name="peanut" size={14} />,
  'Seafood': <Icon name="fish" size={14} />,
  'Susu': <Icon name="milk" size={14} />,
  'Gluten': <Icon name="wheat" size={14} />,
  'Kedelai': <Icon name="alertTriangle" size={14} />
};

const AllergenBadge = ({ allergens = [], compact = false }) => {
  if (!allergens || allergens.length === 0) return null;

  return (
    <div className={`allergen-container ${compact ? 'compact' : ''}`}>
      {allergens.map((allergen, index) => (
        <span key={index} className="allergen-badge" title={allergen}>
          <span className="allergen-icon">
            {allergenMap[allergen] || <Icon name="alertTriangle" size={14} />}
          </span>
          {!compact && <span className="allergen-label">{allergen}</span>}
        </span>
      ))}
    </div>
  );
};

export default AllergenBadge;
