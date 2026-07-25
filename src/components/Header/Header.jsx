import React from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Header.css';

const Header = ({ title, subtitle, showBack, backTo }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="header">
      {showBack && (
        <button className="back-button" onClick={handleBack} aria-label="Go back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
      )}
      <div className="header-content">
        <h1 className="header-title">{title}</h1>
        {subtitle && <span className="header-subtitle">{subtitle}</span>}
      </div>
      <div className="header-right-action">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
