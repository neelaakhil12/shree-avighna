"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { CheckCircleIcon, CreditCardIcon, BuildingLibraryIcon, RocketLaunchIcon } from '@heroicons/react/24/solid';

export default function CheckoutPage() {
  const { cartTotal, clearCart } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      setIsOrdered(true);
      clearCart();
    }, 2000);
  };

  if (isOrdered) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-xl border border-stone-100 flex flex-col items-center" data-aos="zoom-in">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 text-green-600">
            <CheckCircleIcon className="w-16 h-16" />
          </div>
          <h2 className="text-4xl font-bold text-stone-900 mb-4">Order Confirmed!</h2>
          <p className="text-stone-500 mb-10 max-w-sm mx-auto">Thank you for choosing Shree Avigna. Your pure wood-pressed oils are being prepared for dispatch.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="btn-secondary py-4 px-10">
              Return Home
            </Link>
            <Link href="/products" className="btn-primary py-4 px-10">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-stone-900 mb-12">Checkout</h1>
      
      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Shipping Form */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm" data-aos="fade-up">
            <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
              <span className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center text-stone-900 text-sm">1</span>
              Shipping Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">First Name</label>
                <input type="text" required className="w-full px-5 py-4 rounded-xl border border-stone-200 bg-stone-50" placeholder="John" />
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">Last Name</label>
                <input type="text" required className="w-full px-5 py-4 rounded-xl border border-stone-200 bg-stone-50" placeholder="Doe" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-stone-700 mb-2">Full Address</label>
                <textarea required rows="3" className="w-full px-5 py-4 rounded-xl border border-stone-200 bg-stone-50" placeholder="Apt, Street, Area..."></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">City</label>
                <input type="text" required className="w-full px-5 py-4 rounded-xl border border-stone-200 bg-stone-50" placeholder="Bangalore" />
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">Phone</label>
                <input type="tel" required className="w-full px-5 py-4 rounded-xl border border-stone-200 bg-stone-50" placeholder="+91 98765 43210" />
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm" data-aos="fade-up">
            <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
              <span className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center text-stone-900 text-sm">2</span>
              Payment Method
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="relative border-2 border-stone-100 rounded-2xl p-6 cursor-pointer hover:border-secondary transition-all has-[:checked]:border-secondary has-[:checked]:bg-green-50/50">
                <input type="radio" name="payment" className="absolute opacity-0" defaultChecked />
                <div className="flex flex-col gap-4">
                  <CreditCardIcon className="w-8 h-8 text-secondary" />
                  <div>
                    <p className="font-bold text-stone-900">Card Payment</p>
                    <p className="text-xs text-stone-500">Stripe / Razorpay Secure</p>
                  </div>
                </div>
              </label>
              <label className="relative border-2 border-stone-100 rounded-2xl p-6 cursor-pointer hover:border-secondary transition-all has-[:checked]:border-secondary has-[:checked]:bg-green-50/50">
                <input type="radio" name="payment" className="absolute opacity-0" />
                <div className="flex flex-col gap-4">
                  <BuildingLibraryIcon className="w-8 h-8 text-stone-400" />
                  <div>
                    <p className="font-bold text-stone-900">Net Banking</p>
                    <p className="text-xs text-stone-500">Supports all major banks</p>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Payment Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[2rem] p-8 border border-stone-100 shadow-xl sticky top-28" data-aos="fade-left">
            <h2 className="text-2xl font-bold text-stone-900 mb-8">Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-stone-500">
                <span>Subtotal</span>
                <span className="font-bold text-stone-900">₹{cartTotal}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Shipping</span>
                <span className="text-green-600 font-bold uppercase text-xs">Free</span>
              </div>
              <div className="border-t border-stone-100 pt-6 flex justify-between text-2xl font-black text-secondary">
                <span>Total</span>
                <span>₹{cartTotal}</span>
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="btn-secondary w-full py-5 text-lg shadow-lg flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <>Place Order <RocketLaunchIcon className="w-5 h-5" /></>
              )}
            </button>
            <p className="text-[10px] text-stone-400 text-center mt-6 uppercase tracking-widest font-bold">
              SSL Encrypted Checkout
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
