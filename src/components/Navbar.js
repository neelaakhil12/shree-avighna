"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { user, signOut } = useAuth();
  const pathname = usePathname();

  // Hide navbar on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-stone-100 shadow-sm py-2 md:py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center -ml-4 md:ml-0">
            <Image
              src="/splash-logo.png"
              alt="Shree Avighna Logo"
              width={160}
              height={80}
              priority
              className="h-14 md:h-20 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-stone-700 hover:text-secondary font-bold transition-all duration-300 hover:scale-105"
              >
                {link.name}
              </Link>
            ))}
            
            <Link href="/cart" className="relative p-2 text-stone-700 hover:text-secondary transition-all">
              <ShoppingCartIcon className="w-7 h-7" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-[11px] font-black px-2 py-0.5 rounded-full border-2 border-white shadow-md">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <Link 
                  href="/account"
                  className="text-stone-700 hover:text-secondary font-bold transition-all duration-300 hover:scale-105 mr-2"
                >
                  Order History
                </Link>
                <Link 
                  href="/account"
                  className="bg-stone-50 border border-stone-100 text-stone-900 px-5 py-2.5 rounded-full font-bold text-sm hover:bg-stone-100 transition-all flex items-center gap-2"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  User Account
                </Link>
                <button 
                  onClick={() => signOut()}
                  className="text-stone-400 hover:text-red-500 text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="btn-primary px-8 py-2.5 text-sm"
              >
                Sign In
              </Link>
            )}

          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            {user && (
               <Link href="/account" className="p-2 text-primary">
                 <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                 </div>
               </Link>
            )}
            <Link href="/cart" className="relative p-2 text-stone-700">
              <ShoppingCartIcon className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-stone-700"
            >
              {isMobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 animate-fade-in shadow-xl rounded-b-3xl mx-2 mt-2">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-lg font-bold text-stone-700 hover:text-secondary hover:bg-stone-50 rounded-2xl transition-all"
              >
                {link.name}
              </Link>
            ))}
            {user && (
              <>
                <Link
                  href="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-lg font-bold text-stone-700 hover:text-secondary hover:bg-stone-50 rounded-2xl transition-all"
                >
                  Order History
                </Link>
                <Link
                  href="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-lg font-bold text-stone-700 hover:text-secondary hover:bg-stone-50 rounded-2xl transition-all"
                >
                  User Account
                </Link>
                <button
                  onClick={() => { setIsMobileMenuOpen(false); signOut(); }}
                  className="block w-full text-left px-4 py-3 text-lg font-bold text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
