import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [showTableModal, setShowTableModal] = useState(false);
  const [tableInput, setTableInput] = useState('');
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(localStorage.getItem('theme') || 'dark');
    };
    window.addEventListener('theme-change', handleThemeChange);
    return () => window.removeEventListener('theme-change', handleThemeChange);
  }, []);

  const handleOrderNow = () => {
    setShowTableModal(true);
  };

  const handleGoWithTable = () => {
    const table = tableInput.trim() || 'Dine In';
    navigate(`/order?table=${encodeURIComponent(table)}`);
  };

  const handleTakeAway = () => {
    navigate('/order?table=Take+Away');
  };

  return (
    <div className="landing-page">
      {/* Hero Section Only */}
      <section className="lp-hero">
        <div className="lp-theme-toggle-wrap">
          <ThemeToggle />
        </div>

        <div className="lp-hero-bg">
          <div className="lp-orb lp-orb-1"></div>
          <div className="lp-orb lp-orb-2"></div>
          <div className="lp-orb lp-orb-3"></div>
        </div>

        <div className="lp-hero-content">
          <div className="lp-badge">Kitchen Avenue</div>
          <h1 className="lp-title">
            <img 
              src={theme === 'light' ? '/images/logo-light.png' : '/images/logo-dark.png'} 
              alt="ClearDine Logo" 
              className="lp-logo-img" 
            />
            ClearDine
          </h1>
          <p className="lp-tagline">Menu Transparan, Pesanan Nyaman.</p>
          <p className="lp-desc">
            Platform digital menu yang mengutamakan transparansi porsi, keamanan alergen, 
            dan inklusivitas untuk semua kalangan — dari anak-anak hingga lansia.
          </p>

          <button className="lp-cta-button" onClick={handleOrderNow}>
            <span>Pesan Sekarang</span>
            <span className="lp-cta-arrow">→</span>
          </button>

          <p className="lp-qr-note">
            💡 Scan QR code di meja Anda untuk pengalaman lebih cepat
          </p>
        </div>
      </section>

      {/* Table Selection Modal */}
      {showTableModal && (
        <div className="lp-modal-overlay" onClick={() => setShowTableModal(false)}>
          <div className="lp-modal" onClick={e => e.stopPropagation()}>
            <button className="lp-modal-close" onClick={() => setShowTableModal(false)}>✕</button>
            
            <h2 className="lp-modal-title">Pilih Tipe Pesanan</h2>
            <p className="lp-modal-desc">Makan di tempat atau bawa pulang?</p>

            <div className="lp-modal-options">
              <div className="lp-modal-option" onClick={handleTakeAway}>
                <span className="lp-modal-option-icon">🛍️</span>
                <strong>Take Away</strong>
                <span>Bawa pulang</span>
              </div>

              <div className="lp-modal-divider">atau</div>

              <div className="lp-modal-table-input">
                <label>Nomor Meja</label>
                <div className="lp-modal-input-row">
                  <input
                    type="text"
                    placeholder="Contoh: 12"
                    value={tableInput}
                    onChange={e => setTableInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleGoWithTable()}
                  />
                  <button onClick={handleGoWithTable}>
                    Lanjut →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
