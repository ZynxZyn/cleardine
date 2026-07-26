import React, { createContext, useContext, useState, useMemo } from 'react';
import { restaurants } from '../api/data';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item, quantity, restaurantName, restaurantIcon) => {
    setCart((prev) => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { ...item, quantity, restaurantName, restaurantIcon }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prev) => prev.filter(i => i.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) => prev.map(i => i.id === itemId ? { ...i, quantity: newQuantity } : i));
  };

  const clearCart = () => setCart([]);

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cart]);
  
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const capacityAnalysis = useMemo(() => {
    if (cart.length === 0) return { estTime: 0, capacityWarnings: [] };
    
    const timeDetailsByRestaurant = {};
    
    cart.forEach(item => {
      const rId = item.restaurantId;
      if (!timeDetailsByRestaurant[rId]) {
        const rest = restaurants.find(r => r.id === rId);
        const maxCapacity = rest ? rest.maxCapacity : 3;
        const kitchenStatus = rest ? rest.kitchenStatus : 'normal';
        const name = item.restaurantName || (rest ? rest.name : `Tenant #${rId}`);
        
        timeDetailsByRestaurant[rId] = {
          name,
          maxCapacity,
          kitchenStatus,
          maxPrepTime: 0,
          totalQty: 0,
        };
      }
      
      const res = timeDetailsByRestaurant[rId];
      res.totalQty += item.quantity;
      if (item.prepTime > res.maxPrepTime) {
        res.maxPrepTime = item.prepTime;
      }
    });
    
    const capacityWarnings = [];
    let totalEstTime = 0;

    Object.values(timeDetailsByRestaurant).forEach(res => {
      // Jumlah putaran/giliran kompor yang dibutuhkan
      const rounds = Math.ceil(res.totalQty / res.maxCapacity);
      
      // Delay tambahan dari status dapur
      let statusDelay = 0;
      let statusLabel = '±0m (Normal)';
      if (res.kitchenStatus === 'busy') {
        statusDelay = 8; // Dapur Sibuk (+5-10m)
        statusLabel = '+5-10m (Dapur Sibuk)';
      } else if (res.kitchenStatus === 'very-busy') {
        statusDelay = 18; // Dapur Sangat Sibuk (+15-20m)
        statusLabel = '+15-20m (Dapur Sangat Sibuk)';
      }

      const baseRoundsTime = rounds * res.maxPrepTime;
      const tenantTime = baseRoundsTime + statusDelay;
      
      if (rounds > 1 || statusDelay > 0) {
        capacityWarnings.push({
          tenantName: res.name,
          totalQty: res.totalQty,
          maxCapacity: res.maxCapacity,
          rounds,
          baseTime: res.maxPrepTime,
          kitchenStatus: res.kitchenStatus,
          statusLabel,
          statusDelay,
          tenantTotalTime: tenantTime
        });
      }
      
      totalEstTime += tenantTime;
    });

    return { estTime: totalEstTime, capacityWarnings };
  }, [cart]);

  const cartEstTime = capacityAnalysis.estTime;
  const cartCapacityWarnings = capacityAnalysis.capacityWarnings;

  const cartAllergens = useMemo(() => {
    const allergens = new Set();
    cart.forEach(item => {
      if (item.allergens) {
        item.allergens.forEach(a => allergens.add(a));
      }
    });
    return Array.from(allergens);
  }, [cart]);

  const getItemQuantity = (itemId) => {
    const item = cart.find(i => i.id === itemId);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      cartTotal, cartCount, cartEstTime, cartCapacityWarnings, cartAllergens, getItemQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
