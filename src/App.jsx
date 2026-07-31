import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';
import GuidePage from './pages/GuidePage/GuidePage';
import HomePage from './pages/HomePage/HomePage';
import MenuPage from './pages/MenuPage/MenuPage';
import OrderConfirmPage from './pages/OrderConfirmPage/OrderConfirmPage';

function App() {
  return (
    <div className="app-wrapper" style={{ maxWidth: '480px', margin: '0 auto', minHeight: '100vh', position: 'relative' }}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/order" element={<HomePage />} />
        <Route path="/restaurant/:id" element={<MenuPage />} />
        <Route path="/order-confirm" element={<OrderConfirmPage />} />
      </Routes>
    </div>
  );
}

export default App;

