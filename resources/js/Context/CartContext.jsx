import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);
const CART_STORAGE_KEY = 'g4_cart';

function normalizeCartItem(item) {
  const parsedPrice = typeof item.price === 'number'
    ? item.price
    : Number(String(item.price ?? 0).replace(/[^0-9.-]/g, ''));

  return {
    id: String(item.id),
    name: String(item.name ?? item.title ?? 'Vehicle'),
    price: Number.isFinite(parsedPrice) ? parsedPrice : 0,
    image: item.image ?? item.img ?? '',
    specs: item.specs ?? item.subtitle ?? '',
    quantity: Math.max(1, Math.min(20, Number(item.quantity ?? 1))),
  };
}

function loadCart() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const savedItems = JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) ?? '[]');

    return Array.isArray(savedItems)
      ? savedItems.filter((item) => item && item.id !== undefined).map(normalizeCartItem)
      : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(loadCart);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (vehicle) => {
    const normalizedVehicle = normalizeCartItem(vehicle);

    setCartItems((currentItems) => {
      const existingIndex = currentItems.findIndex((item) => item.id === normalizedVehicle.id);

      if (existingIndex === -1) {
        return [...currentItems, { ...normalizedVehicle, quantity: 1 }];
      }

      return currentItems.map((item, index) => index === existingIndex
        ? { ...item, quantity: Math.min(20, item.quantity + 1) }
        : item);
    });
  };

  const updateQuantity = (id, quantity) => {
    const safeQuantity = Math.max(1, Math.min(20, Number(quantity) || 1));

    setCartItems((currentItems) => currentItems.map((item) => item.id === String(id)
      ? { ...item, quantity: safeQuantity }
      : item));
  };

  const removeFromCart = (id) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== String(id)));
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, cartCount, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    return {
      cartItems: [],
      cartCount: 0,
      addToCart: () => {},
      updateQuantity: () => {},
      removeFromCart: () => {},
    };
  }

  return context;
}