import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TenantCard from '../../components/TenantCard/TenantCard';
import CartBar from '../../components/CartBar/CartBar';
import CartDrawer from '../../components/CartDrawer/CartDrawer';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import Icon from '../../components/Icon/Icon';
import { fetchRestaurants } from '../../api/api';
import './HomePage.css';

const HomePage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  
  const tableNo = searchParams.get('table') || 'Dine In';

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(localStorage.getItem('theme') || 'light');
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
      <header className="top-navbar">
        <button className="back-to-landing-btn" onClick={() => navigate(`/guide?table=${encodeURIComponent(tableNo)}`)} >
          <Icon name="back" size={16} />
        </button>

        <div className="flow-stepper">
          <div className="flow-step done">
            <span className="step-circle">1</span>
            <span className="step-label">Tipe</span>
          </div>
          <div className="flow-line done"></div>
          <div className="flow-step done">
            <span className="step-circle">2</span>
            <span className="step-label">Panduan</span>
          </div>
          <div className="flow-line done"></div>
          <div className="flow-step active">
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
        <section className="tenants-section reveal">
          <h2 className="section-title">Pilih Tenant</h2>
          <p className="section-desc">Perhatikan status dapur (hijau/kuning/merah) sebelum memilih restoran.</p>
          <div className="tenants-grid">
            {loading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="tenant-skeleton skeleton-shimmer"></div>
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
