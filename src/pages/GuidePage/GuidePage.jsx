import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import Icon from '../../components/Icon/Icon';
import './GuidePage.css';

const FEATURES = [
  { icon: <Icon name="search" size={24} color="var(--accent)" />, title: 'Smart Search Bar', desc: 'Ketik preferensi — tanpa scroll panjang' },
  { icon: <Icon name="scale" size={24} color="var(--accent)" />, title: 'Porsi Terukur', desc: 'Berat gram & jumlah potong objektif' },
  { icon: <Icon name="alertTriangle" size={24} color="var(--accent)" />, title: 'Peringatan Alergen', desc: 'Komposisi bumbu transparan & aman' },
  { icon: <Icon name="clock" size={24} color="var(--accent)" />, title: 'Antrean Dapur', desc: 'Estimasi durasi dalam menit' },
];

const COLOR_GUIDE = [
  { key: 'green', swatch: 'var(--health-green)', title: 'Aman & Ramah Lansia', desc: 'Rendah natrium, tekstur lembut, mudah dicerna' },
  { key: 'orange', swatch: 'var(--health-orange)', title: 'Perlu Perhatian Medis', desc: 'Tinggi gula/natrium atau tekstur keras' },
  { key: 'blue', swatch: 'var(--health-blue)', title: 'Opsi Diet Khusus', desc: 'Keto, Vegan, dan Plant-Based' },
  { key: 'pink', swatch: 'var(--health-pink)', title: 'Peringatan Alergen', desc: 'Mengandung alergen — periksa sebelum pesan' },
];

const GuidePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  
  const tableNo = searchParams.get('table') || 'Dine In';

  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(localStorage.getItem('theme') || 'light');
    };
    window.addEventListener('theme-change', handleThemeChange);
    return () => window.removeEventListener('theme-change', handleThemeChange);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handlePilihTenant = () => {
    navigate(`/order?table=${encodeURIComponent(tableNo)}`);
  };

  const dismissBanner = () => {
    setShowBanner(false);
  };

  return (
    <div className="guide-page">
      <header className="top-navbar">
        <button className="back-to-landing-btn" onClick={() => navigate('/')}>
          <Icon name="back" size={16} />
        </button>

        <div className="flow-stepper">
          <div className="flow-step done">
            <span className="step-circle">1</span>
            <span className="step-label">Tipe</span>
          </div>
          <div className="flow-line done"></div>
          <div className="flow-step active">
            <span className="step-circle">2</span>
            <span className="step-label">Panduan</span>
          </div>
          <div className="flow-line"></div>
          <div className="flow-step">
            <span className="step-circle">3</span>
            <span className="step-label">Tenant</span>
          </div>
          <div className="flow-line"></div>
          <div className="flow-step">
            <span className="step-circle">4</span>
            <span className="step-label">Pesan</span>
          </div>
        </div>

        <div className="home-theme-toggle-wrap">
          <ThemeToggle />
        </div>
      </header>

      <div className="hero-section">
        <div className="hero-bg"></div>
        <div className="hero-content reveal reveal-active">
          <h1 className="hero-logo">
            <img 
              src={theme === 'dark' ? '/images/logo-dark.png' : '/images/logo-light.png'} 
              alt="ClearDine Logo" 
              className="hero-logo-img" 
            />
            <span>ClearDine</span>
          </h1>
          <div className="hero-subtitle">
            <span className="line"></span>
            <span>Kitchen Avenue</span>
            <span className="line"></span>
          </div>
          <p className="hero-tagline">Menu Transparan, Pesanan Nyaman.</p>
          
          <div className="table-badge">
            {tableNo === 'Take Away' ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Icon name="takeaway" size={16} /> Take Away
              </span>
            ) : (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <Icon name="utensils" size={16} /> Meja: <strong>{tableNo}</strong>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="content-container">
        {showBanner && (
          <div className="guide-welcome-banner reveal reveal-active">
            <div className="guide-welcome-icon">
              <Icon name="clipboard" size={28} color="var(--accent)" />
            </div>
            <div className="guide-welcome-content">
              <strong>Sebelum Memesan</strong>
              <p>Pelajari panduan berikut — khususnya jika Anda lansia, sedang diet, atau punya alergi makanan.</p>
            </div>
            <button type="button" className="guide-welcome-dismiss" onClick={dismissBanner}>
              Mengerti
            </button>
          </div>
        )}

        <section className="feature-section reveal">
          <h2 className="section-title">Fitur Unggulan</h2>
          <p className="section-desc">Empat pilar inovasi ClearDine untuk pengalaman pemesanan yang aman dan jujur.</p>
          <div className="feature-grid">
            {FEATURES.map(f => (
              <div key={f.title} className="feature-card">
                <span className="feature-icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="color-guide-section reveal">
          <h2 className="section-title">Panduan Warna Kesehatan</h2>
          <p className="section-desc">Label pastel ramah mata — bantu pilih menu aman tanpa harus bertanya ke pramusaji.</p>
          <div className="color-guide-grid">
            {COLOR_GUIDE.map(item => (
              <div key={item.key} className={`color-guide-item health-${item.key}`}>
                <div className="cg-header">
                  <span className="cg-swatch" style={{ background: item.swatch }}></span>
                  <h4>{item.title}</h4>
                </div>
                <p className="cg-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="guide-cta-section">
        <button className="guide-cta-btn" onClick={handlePilihTenant}>
          <span>Pilih Tenant</span>
          <span className="guide-cta-arrow">
            <Icon name="arrowRight" size={20} />
          </span>
        </button>
        <p className="guide-cta-hint">Lanjutkan untuk memilih restoran favorit Anda</p>
      </div>

      <footer className="footer reveal">
        <p>© 2026 ClearDine — Kitchen Avenue</p>
      </footer>
    </div>
  );
};

export default GuidePage;
