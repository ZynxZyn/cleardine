import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import Icon from '../../components/Icon/Icon';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [showTableModal, setShowTableModal] = useState(false);
  const [tableInput, setTableInput] = useState('');
  const [orderMode, setOrderMode] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(localStorage.getItem('theme') || 'light');
    };
    window.addEventListener('theme-change', handleThemeChange);
    return () => window.removeEventListener('theme-change', handleThemeChange);
  }, []);

  const handleOrderNow = () => {
    setOrderMode(null);
    setShowTableModal(true);
  };

  const handleGoWithTable = () => {
    const table = tableInput.trim();
    if (!table) return;
    navigate(`/guide?table=${encodeURIComponent(table)}`);
  };

  const handleTakeAway = () => {
    navigate('/guide?table=Take+Away');
  };

  return (
    <div className="landing-page">
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
          <div className="lp-badge">Kitchen Avenue · Food Court</div>
          <h1 className="lp-title">
            <img 
              src={theme === 'dark' ? '/images/logo-dark.png' : '/images/logo-light.png'} 
              alt="ClearDine Logo" 
              className="lp-logo-img" 
            />
            ClearDine
          </h1>
          <p className="lp-tagline">Menu Transparan, Pesanan Nyaman.</p>
          <p className="lp-desc">
            Platform menu digital inklusif — transparansi porsi, peringatan alergen, 
            panduan kesehatan, dan estimasi antrean dapur untuk semua kalangan.
          </p>

          <button className="lp-cta-button" onClick={handleOrderNow}>
            <span>Pesan Sekarang</span>
            <span className="lp-cta-arrow">
              <Icon name="arrowRight" size={20} />
            </span>
          </button>

          <p className="lp-qr-note">
            Scan QR code di meja Anda untuk mulai memesan
          </p>
        </div>
      </section>

      {showTableModal && (
        <div className="lp-modal-overlay" onClick={() => setShowTableModal(false)}>
          <div className="lp-modal" onClick={e => e.stopPropagation()} role="dialog" aria-labelledby="order-modal-title">
            <button className="lp-modal-close" onClick={() => setShowTableModal(false)} aria-label="Tutup">
              <Icon name="close" size={20} />
            </button>
            
            <h2 id="order-modal-title" className="lp-modal-title">Pilih Tipe Pesanan</h2>
            <p className="lp-modal-desc">Sesuai skenario penggunaan ClearDine — pilih cara Anda ingin menikmati makanan.</p>

            <div className="lp-order-type-grid">
              <button
                type="button"
                className={`lp-order-type ${orderMode === 'takeaway' ? 'selected' : ''}`}
                onClick={() => { setOrderMode('takeaway'); handleTakeAway(); }}
              >
                <span className="lp-order-type-icon">
                  <Icon name="takeaway" size={28} color="var(--accent)" />
                </span>
                <strong>Take Away</strong>
                <span>Bawa pulang</span>
              </button>

              <button
                type="button"
                className={`lp-order-type ${orderMode === 'dinein' ? 'selected' : ''}`}
                onClick={() => setOrderMode('dinein')}
              >
                <span className="lp-order-type-icon">
                  <Icon name="utensils" size={28} color="var(--accent)" />
                </span>
                <strong>Dine-In</strong>
                <span>Makan di tempat</span>
              </button>
            </div>

            {orderMode === 'dinein' && (
              <div className="lp-modal-table-input">
                <label htmlFor="table-number">Nomor Meja</label>
                <p className="lp-table-hint">Lihat nomor meja di depan Anda, lalu ketik di sini.</p>
                <div className="lp-modal-input-row">
                  <input
                    id="table-number"
                    type="text"
                    inputMode="numeric"
                    placeholder="Contoh: 12"
                    value={tableInput}
                    onChange={e => setTableInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleGoWithTable()}
                    autoFocus
                  />
                  <button type="button" onClick={handleGoWithTable} disabled={!tableInput.trim()}>
                    Lanjut →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
