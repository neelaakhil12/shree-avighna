"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on init
  useEffect(() => {
    const savedCart = localStorage.getItem('shree_avighna_cart') || localStorage.getItem('shree_avigna_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    localStorage.setItem('shree_avighna_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, selectedSize) => {
    const price = product.prices[selectedSize];
    const cartItemId = `${product.id}-${selectedSize}`;
    
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.cartItemId === cartItemId);
      if (existingItem) {
        return prevCart.map(item =>
          item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, cartItemId, selectedSize, price, quantity: 1 }];
    });
  };
  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => prevCart.filter(item => item.cartItemId !== cartItemId));
  };
  const updateQuantity = (cartItemId, quantity) => {
    if (quantity < 1) return;
    setCart((prevCart) =>
      prevCart.map(item =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      cartTotal, 
      cartCount 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
