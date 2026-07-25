import { restaurants, menus } from './data';

export const fetchRestaurants = async () => {
  return restaurants;
};

export const fetchRestaurant = async (id) => {
  return restaurants.find(r => r.id === Number(id)) || null;
};

export const fetchMenusByRestaurant = async (restaurantId) => {
  return menus.filter(m => m.restaurantId === Number(restaurantId));
};

export const fetchMenuItem = async (id) => {
  return menus.find(m => m.id === Number(id)) || null;
};

export const searchMenus = async (restaurantId, query) => {
  const restaurantMenus = menus.filter(m => m.restaurantId === Number(restaurantId));
  if (!query) return restaurantMenus;
  return restaurantMenus.filter(m => m.name.toLowerCase().includes(query.toLowerCase()));
};
