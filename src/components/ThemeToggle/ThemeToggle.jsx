import React, { useState, useEffect } from 'react';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const [isLightMode, setIsLightMode] = useState(() => {
    return localStorage.getItem('theme') === 'light';
  });
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    }
    window.dispatchEvent(new Event('theme-change'));
  }, [isLightMode]);

  const handleToggle = () => {
    setAnimating(true);
    setTimeout(() => {
      setIsLightMode(prev => !prev);
      setAnimating(false);
    }, 200);
  };

  return (
    <button 
      className="theme-toggle-btn" 
      onClick={handleToggle}
      aria-label="Ubah Tema"
      title={isLightMode ? "Mode Terang — Klik untuk Mode Gelap" : "Mode Gelap — Klik untuk Mode Terang"}
    >
      <span className={`theme-icon ${animating ? 'spin-out' : 'spin-in'}`}>
        {isLightMode ? '☀️' : '🌙'}
      </span>
    </button>
  );
};

export default ThemeToggle;
