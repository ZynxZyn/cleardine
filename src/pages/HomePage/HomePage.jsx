import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TenantCard from '../../components/TenantCard/TenantCard';
import CartBar from '../../components/CartBar/CartBar';
import CartDrawer from '../../components/CartDrawer/CartDrawer';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import { fetchRestaurants } from '../../api/api';
import './HomePage.css';

const HomePage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  
  const tableNo = searchParams.get('table') || 'Dine In';

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(localStorage.getItem('theme') || 'dark');
    };
    window.addEventListener('theme-change', handleThemeChange);
    return () => window.removeEventListener('theme-change', handleThemeChange);
  }, []);

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const data = await fetchRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error("Failed to load restaurants:", error);
      } finally {
        setLoading(false);
      }
    };
    
    // Setup scroll observer for reveal animations
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
    
    loadRestaurants();
    
    return () => observer.disconnect();
  }, []);

  const handleCheckout = (paymentMethod) => {
    setIsCartOpen(false);
    navigate(`/order-confirm?table=${tableNo}`, { state: { paymentMethod } });
  };

  const handleTenantClick = (restId) => {
    navigate(`/restaurant/${restId}?table=${encodeURIComponent(tableNo)}`);
  };

  return (
    <div className="home-page">
      <button className="back-to-landing-btn" onClick={() => navigate('/')} title="Kembali ke Beranda">
        ← Beranda
      </button>

      <div className="home-theme-toggle-wrap">
        <ThemeToggle />
      </div>

      <div className="hero-section">
        <div className="hero-bg"></div>
        <div className="hero-content reveal reveal-active">
          <h1 className="hero-logo">
            <img 
              src={theme === 'light' ? '/images/logo-light.png' : '/images/logo-dark.png'} 
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
            Meja: <strong>{tableNo}</strong>
          </div>
        </div>
      </div>

      <div className="content-container">
        <section className="feature-section reveal">
          <h2 className="section-title">Fitur Unggulan</h2>
          <div className="feature-scroll">
            <div className="feature-card">
              <h3>Visual Porsi Terukur</h3>
              <p>Lihat berat & jumlah porsi sebelum pesan</p>
            </div>
            <div className="feature-card">
              <h3>Peringatan Alergen</h3>
              <p>Kenali kandungan alergen di setiap menu</p>
            </div>
            <div className="feature-card">
              <h3>Kode Warna Kesehatan</h3>
              <p>Pilih menu sesuai kebutuhan kesehatanmu</p>
            </div>
            <div className="feature-card">
              <h3>Status Dapur Real-time</h3>
              <p>Ketahui estimasi waktu penyajian</p>
            </div>
          </div>
        </section>

        <section className="color-guide-section reveal">
          <h2 className="section-title">Panduan Warna Kesehatan</h2>
          <div className="color-guide-grid">
            <div className="color-guide-item health-green">
              <div className="cg-header">
                <span className="cg-icon">🟢</span>
                <h4>Aman & Ramah Lansia</h4>
              </div>
              <p className="cg-desc">Rendah kalori, mudah dicerna, tanpa alergen</p>
            </div>
            <div className="color-guide-item health-orange">
              <div className="cg-header">
                <span className="cg-icon">🟠</span>
                <h4>Perlu Perhatian Medis</h4>
              </div>
              <p className="cg-desc">Gula/natrium tinggi atau tekstur keras</p>
            </div>
            <div className="color-guide-item health-blue">
              <div className="cg-header">
                <span className="cg-icon">🔵</span>
                <h4>Opsi Diet Khusus</h4>
              </div>
              <p className="cg-desc">Pilihan Keto, Vegan, dan Plant-Based</p>
            </div>
            <div className="color-guide-item health-pink">
              <div className="cg-header">
                <span className="cg-icon">🔴</span>
                <h4>Peringatan Alergen</h4>
              </div>
              <p className="cg-desc">Mengandung alergen, periksa sebelum pesan</p>
            </div>
          </div>
        </section>

        <section className="tenants-section reveal">
          <h2 className="section-title">Pilih Tenant</h2>
          <div className="tenants-grid">
            {loading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="tenant-skeleton pulsing"></div>
              ))
            ) : (
              restaurants.map(rest => (
                <TenantCard 
                  key={rest.id} 
                  tenant={rest} 
                  onClick={() => handleTenantClick(rest.id)} 
                />
              ))
            )}
          </div>
        </section>
      </div>

      <footer className="footer reveal">
        <p>© 2026 ClearDine — Kitchen Avenue</p>
      </footer>

      <CartBar onViewCart={() => setIsCartOpen(true)} />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onCheckout={handleCheckout} 
      />
    </div>
  );
};

export default HomePage;
