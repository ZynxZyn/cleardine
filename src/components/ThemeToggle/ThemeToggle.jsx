import React, { useState, useEffect } from 'react';
import Icon from '../Icon/Icon';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
    window.dispatchEvent(new Event('theme-change'));
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <button 
      className="theme-toggle-btn" 
      onClick={toggleTheme}
      aria-label="Toggle Mode Gelap/Terang"
      title={isDarkMode ? 'Mode Terang' : 'Mode Gelap'}
    >
      <span className="theme-icon">
        {isDarkMode ? (
          <Icon name="moon" size={18} color="#f59e0b" />
        ) : (
          <Icon name="sun" size={18} color="#ea580c" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
