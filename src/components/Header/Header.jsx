import React from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import Icon from '../Icon/Icon';
import './Header.css';

const Header = ({ title, subtitle, showBack, backTo, children }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  return (
    <header className={`header${children ? ' header--with-search' : ''}`}>
      <div className="header-top-row">
        {showBack && (
          <button className="back-button" onClick={handleBack} aria-label="Kembali">
            <Icon name="back" size={18} />
          </button>
        )}
        <div className="header-content">
          <h1 className="header-title">{title}</h1>
          {subtitle && <span className="header-subtitle">{subtitle}</span>}
        </div>
        <div className="header-right-action">
          <ThemeToggle />
        </div>
      </div>
      {children && (
        <div className="header-search-slot">
          {children}
        </div>
      )}
    </header>
  );
};

export default Header;
