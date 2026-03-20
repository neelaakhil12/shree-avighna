"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { TrashIcon, PlusIcon, MinusIcon, ArrowRightIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="bg-stone-50 rounded-3xl p-12 md:p-20 flex flex-col items-center border border-stone-200" data-aos="zoom-in">
          <div className="w-20 h-20 bg-stone-200 rounded-full flex items-center justify-center mb-6 text-stone-400">
            <ShoppingBagIcon className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-stone-900 mb-4">Your cart is empty</h2>
          <p className="text-stone-500 mb-10 max-w-sm">Looks like you haven't added any pure wood-pressed oils to your cart yet.</p>
          <Link href="/products" className="btn-primary py-4 px-10 text-lg">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-stone-900 mb-12">Your Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item.cartItemId} className="bg-white rounded-2xl p-4 sm:p-6 border border-stone-100 shadow-sm flex flex-col sm:flex-row items-center gap-6" data-aos="fade-up">
              <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-stone-100 flex-shrink-0">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              
              <div className="flex-grow text-center sm:text-left">
                <h3 className="font-bold text-lg text-stone-900 mb-1">{item.name}</h3>
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
                  <p className="text-xs text-stone-500">{item.category}</p>
                  <span className="w-1 h-1 bg-stone-300 rounded-full" />
                  <p className="text-xs font-bold text-secondary uppercase tracking-wider">{item.selectedSize}</p>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-4">
                  <button 
                    onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                    className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors"
                  >
                    <MinusIcon className="w-4 h-4" />
                  </button>
                  <span className="font-bold w-4 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                    className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-50 transition-colors"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col items-center sm:items-end gap-2">
                <span className="font-bold text-lg text-secondary">₹{item.price * item.quantity}</span>
                <button 
                  onClick={() => removeFromCart(item.cartItemId)}
                  className="text-stone-400 hover:text-accent transition-colors p-2"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-stone-900 text-white rounded-[2rem] p-8 sticky top-28" data-aos="fade-left">
            <h2 className="text-2xl font-bold mb-8">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-stone-400">
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="flex justify-between text-stone-400">
                <span>Delivery Fee</span>
                <span className="text-green-400">FREE</span>
              </div>
              <div className="border-t border-stone-800 pt-4 flex justify-between text-xl font-bold">
                <span>Total Amount</span>
                <span className="text-primary font-bold">₹{cartTotal}</span>
              </div>
            </div>
            
            <Link 
              href="/checkout" 
              className="btn-primary w-full py-5 text-lg shadow-lg shadow-yellow-500/10 mb-6"
            >
              Checkout Now <ArrowRightIcon className="w-5 h-5" />
            </Link>
            
            <p className="text-[10px] text-stone-500 text-center uppercase tracking-widest font-bold">
              Secure Payments via Stripe/Razorpay
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
