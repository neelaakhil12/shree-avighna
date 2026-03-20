"use client";

import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SplashScreen from '@/components/SplashScreen';
import { AnimatePresence } from 'framer-motion';

export default function ClientLayout({ children }) {
  const [hasEntered, setHasEntered] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user has already entered in this session
    const entered = sessionStorage.getItem('hasEntered');
    if (entered) {
      setHasEntered(true);
    }
    setLoading(false);

    AOS.init({
      duration: 800,
      once: false,
      easing: 'ease-out-quad',
    });
  }, []);

  const handleEnter = () => {
    setHasEntered(true);
    sessionStorage.setItem('hasEntered', 'true');
    // Refresh AOS after entering to ensure animations on the home page trigger correctly
    setTimeout(() => {
      AOS.refresh();
    }, 100);
  };

  if (loading) return null;

  return (
    <CartProvider>
      <AnimatePresence mode="wait">
        {!hasEntered && (
          <SplashScreen key="splash" onEnter={handleEnter} />
        )}
      </AnimatePresence>
      
      <div className={hasEntered ? "opacity-100" : "opacity-0 pointer-events-none"}>
        <Navbar />
        <main className="min-h-screen pt-28">
          {children}
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
