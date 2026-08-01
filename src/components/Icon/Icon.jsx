import React from 'react';

/**
 * ClearDine SVG Icon Library
 * Referensi: McDonald's Indonesia menggunakan SVG icons alih-alih emoji
 * untuk tampilan profesional yang konsisten di semua device.
 */

const iconPaths = {
  // Navigation & UI
  search: (
    <path d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" strokeLinecap="round" strokeLinejoin="round"/>
  ),
  close: (
    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
  ),
  back: (
    <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
  ),
  chevronRight: (
    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
  ),
  arrowRight: (
    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
  ),
  
  // Food & Restaurant
  utensils: (
    <>
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 2v20" strokeLinecap="round"/>
      <path d="M21 15V2v0a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),
  takeaway: (
    <>
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 6h18" strokeLinecap="round"/>
      <path d="M16 10a4 4 0 01-8 0" strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),
  cart: (
    <>
      <circle cx="9" cy="21" r="1" fill="currentColor"/>
      <circle cx="20" cy="21" r="1" fill="currentColor"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),
  trash: (
    <>
      <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 11v6M14 11v6" strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),
  
  // Features
  scale: (
    <>
      <path d="M16 3l-4 4-4-4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 7v14" strokeLinecap="round"/>
      <path d="M5 21h14" strokeLinecap="round"/>
      <path d="M3 11l4 6h-8l4-6zM17 11l4 6h-8l4-6z" strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),
  alertTriangle: (
    <>
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 9v4M12 17h.01" strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),
  palette: (
    <>
      <circle cx="12" cy="12" r="10"/>
      <circle cx="12" cy="8" r="1.5" fill="currentColor" stroke="none"/>
      <circle cx="8.5" cy="13" r="1.5" fill="currentColor" stroke="none"/>
      <circle cx="15.5" cy="13" r="1.5" fill="currentColor" stroke="none"/>
      <circle cx="12" cy="17" r="1.5" fill="currentColor" stroke="none"/>
    </>
  ),
  
  // Health & Safety
  checkCircle: (
    <>
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),
  alertCircle: (
    <>
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 8v4M12 16h.01" strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),
  diamond: (
    <path d="M12 2l9 10-9 10-9-10z" strokeLinecap="round" strokeLinejoin="round"/>
  ),
  shield: (
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
  ),
  
  // Kitchen Status
  flame: (
    <path d="M12 22c-4-2.5-7-6-7-10 0-5 3-7 5-9 .5-.5 1-.9 1.5-1.2.3-.2.7 0 .7.4 0 2 1 3 2.5 4.5C16 8 18 10 18 13c0 4-3 7.5-6 9z" strokeLinecap="round" strokeLinejoin="round"/>
  ),
  circleGreen: (
    <circle cx="12" cy="12" r="6" fill="#4caf50" stroke="none"/>
  ),
  circleYellow: (
    <circle cx="12" cy="12" r="6" fill="#f59e0b" stroke="none"/>
  ),
  circleRed: (
    <circle cx="12" cy="12" r="6" fill="#ef4444" stroke="none"/>
  ),
  
  // Allergens
  peanut: (
    <>
      <ellipse cx="12" cy="10" rx="4" ry="6" strokeLinecap="round"/>
      <path d="M12 4v12M8 10h8" strokeLinecap="round"/>
      <path d="M12 16v4" strokeLinecap="round"/>
    </>
  ),
  fish: (
    <>
      <path d="M6.5 12c3-6 11-6 14 0-3 6-11 6-14 0z" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="16" cy="12" r="1" fill="currentColor" stroke="none"/>
      <path d="M2 10l4 2-4 2" strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),
  milk: (
    <>
      <path d="M8 2h8v4l2 2v10a2 2 0 01-2 2H8a2 2 0 01-2-2V8l2-2V2z" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 12h12" strokeLinecap="round"/>
    </>
  ),
  wheat: (
    <>
      <path d="M12 22V10" strokeLinecap="round"/>
      <path d="M7 8c2 0 4 1 5 3M17 8c-2 0-4 1-5 3" strokeLinecap="round"/>
      <path d="M7 4c2 0 4 1 5 3M17 4c-2 0-4 1-5 3" strokeLinecap="round"/>
      <path d="M7 12c2 0 4 1 5 3M17 12c-2 0-4 1-5 3" strokeLinecap="round"/>
    </>
  ),
  
  // Payment
  bank: (
    <>
      <path d="M3 21h18M3 10h18M5 6l7-3 7 3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 10v8M8 10v8M12 10v8M16 10v8M20 10v8" strokeLinecap="round"/>
    </>
  ),
  cash: (
    <>
      <rect x="2" y="6" width="20" height="12" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="3"/>
      <path d="M6 12h.01M18 12h.01" strokeLinecap="round"/>
    </>
  ),
  
  // UI Elements
  sun: (
    <>
      <circle cx="12" cy="12" r="5"/>
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round"/>
    </>
  ),
  moon: (
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeLinecap="round" strokeLinejoin="round"/>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 16v-4M12 8h.01" strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),
  clipboard: (
    <>
      <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="8" y="2" width="8" height="4" rx="1" strokeLinecap="round" strokeLinejoin="round"/>
    </>
  ),
  nutrition: (
    <>
      <path d="M12 2a7 7 0 00-7 7c0 3.5 2 6.5 5 8v3h4v-3c3-1.5 5-4.5 5-8a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 12h6M9 15h4" strokeLinecap="round"/>
    </>
  ),
};

const Icon = ({ name, size = 20, color = 'currentColor', strokeWidth = 2, className = '', style = {} }) => {
  const path = iconPaths[name];
  if (!path) return null;
  
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      className={`cd-icon ${className}`}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      aria-hidden="true"
    >
      {path}
    </svg>
  );
};

export default Icon;
