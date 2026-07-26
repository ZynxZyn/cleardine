import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import KitchenStatus from '../../components/KitchenStatus/KitchenStatus';
import SearchBar from '../../components/SearchBar/SearchBar';
import ColorFilter from '../../components/ColorFilter/ColorFilter';
import MenuCard from '../../components/MenuCard/MenuCard';
import DetailModal from '../../components/DetailModal/DetailModal';
import CartBar from '../../components/CartBar/CartBar';
import CartDrawer from '../../components/CartDrawer/CartDrawer';
import KitchenLoadBar from '../../components/KitchenLoadBar/KitchenLoadBar';
import { fetchRestaurant, fetchMenusByRestaurant } from '../../api/api';
import './MenuPage.css';

const MenuPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tableParam = searchParams.get('table');
  const backUrl = tableParam ? `/order?table=${encodeURIComponent(tableParam)}` : '/order';
  
  const [restaurant, setRestaurant] = useState(null);
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeColorFilter, setActiveColorFilter] = useState('all');
  const [activeCategory, setActiveCategory] = useState('Semua');
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [restData, menuData] = await Promise.all([
          fetchRestaurant(id),
          fetchMenusByRestaurant(id)
        ]);
        setRestaurant(restData);
        setMenus(menuData);
      } catch (error) {
        console.error("Failed to load restaurant data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [id]);

  const categories = ['Semua', ...new Set(menus.map(m => m.category))].map(cat => {
    if (cat === 'Semua') return cat;
    return cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  });

  const getFilteredMenus = () => {
    return menus.filter(menu => {
      // 1. Color Filter
      if (activeColorFilter !== 'all' && menu.healthCategory !== activeColorFilter) {
        return false;
      }
      
      // 2. Category Filter
      if (activeCategory !== 'Semua') {
        const formattedMenuCat = menu.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        if (formattedMenuCat !== activeCategory) {
          return false;
        }
      }
      
      // 3. Search Filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        
        // Smart search logic: "tanpa kacang"
        if (query.startsWith('tanpa ')) {
          const excludeTerm = query.replace('tanpa ', '').trim();
          if (excludeTerm) {
            const hasExcludeTerm = 
              (menu.allergens && menu.allergens.some(a => a.toLowerCase().includes(excludeTerm))) ||
              (menu.ingredients && menu.ingredients.some(i => i.toLowerCase().includes(excludeTerm)));
            if (hasExcludeTerm) return false;
          }
        } else {
          const matchName = menu.name.toLowerCase().includes(query);
          const matchIngredient = menu.ingredients && menu.ingredients.some(i => i.toLowerCase().includes(query));
          const matchAllergen = menu.allergens && menu.allergens.some(a => a.toLowerCase().includes(query));
          
          if (!matchName && !matchIngredient && !matchAllergen) {
            return false;
          }
        }
      }
      
      return true;
    });
  };

  const filteredMenus = getFilteredMenus();

  const handleOpenDetail = (item) => {
    setSelectedItem(item);
    setIsDetailOpen(true);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate(`/order-confirm${tableParam ? `?table=${encodeURIComponent(tableParam)}` : ''}`);
  };

  if (loading) {
    return (
      <div className="menu-page">
        <Header title="Memuat..." showBack backTo={backUrl} />
        <div className="menu-content-wrap">
          <div className="skeleton-box pulsing" style={{height: 48, marginBottom: 16, borderRadius: 24}}></div>
          <div className="skeleton-box pulsing" style={{height: 48, marginBottom: 16, borderRadius: 24}}></div>
          <div className="skeleton-box pulsing" style={{height: 40, marginBottom: 24}}></div>
          
          <div className="menu-grid">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="skeleton-box pulsing" style={{height: 250, borderRadius: 12}}></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="menu-page">
        <Header title="Tenant Tidak Ditemukan" showBack backTo={backUrl} />
        <div className="empty-state">
          <h2>Tenant tidak tersedia</h2>
          <button onClick={() => navigate('/')} className="back-home-btn">Kembali ke Beranda</button>
        </div>
      </div>
    );
  }

  return (
    <div className="menu-page">
      <Header 
        title={`${restaurant.icon} ${restaurant.name}`} 
        subtitle={restaurant.cuisine}
        showBack 
        backTo={backUrl} 
      />
      
      <div className="menu-content-wrap">
        <KitchenStatus status={restaurant.kitchenStatus} />
        <KitchenLoadBar restaurant={restaurant} />
        
        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery} 
          placeholder="Cari menu, cth: 'Nasi' atau 'tanpa kacang'" 
        />
        
        <ColorFilter 
          activeFilter={activeColorFilter} 
          onFilterChange={setActiveColorFilter} 
        />
        
        <div className="category-tabs">
          {categories.map(cat => (
            <button 
              key={cat}
              className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        
        {filteredMenus.length > 0 ? (
          <div className="menu-grid">
            {filteredMenus.map((menu, idx) => (
              <div key={menu.id} className="menu-card-wrapper" style={{animationDelay: `${idx * 0.05}s`}}>
                <MenuCard 
                  item={menu} 
                  onViewDetail={handleOpenDetail} 
                  restaurantName={restaurant.name}
                  restaurantIcon={restaurant.icon}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-results">
            <div className="empty-icon">🍽️</div>
            <h3>Tidak ada menu yang cocok</h3>
            <p>Coba ubah kata kunci atau hapus filter.</p>
            <button className="reset-filter-btn" onClick={() => {
              setSearchQuery('');
              setActiveColorFilter('all');
              setActiveCategory('Semua');
            }}>
              Reset Filter
            </button>
          </div>
        )}
      </div>

      <DetailModal 
        item={selectedItem}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        restaurantName={restaurant.name}
        restaurantIcon={restaurant.icon}
        kitchenStatus={restaurant.kitchenStatus}
      />
      
      <CartBar onViewCart={() => setIsCartOpen(true)} />
      
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default MenuPage;
