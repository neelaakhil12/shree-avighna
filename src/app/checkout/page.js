"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { CheckCircleIcon, CreditCardIcon, BuildingLibraryIcon, RocketLaunchIcon } from '@heroicons/react/24/solid';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function CheckoutPage() {
  const { cartTotal, clearCart } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    phone: ''
  });

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Check your internet connection.");
      setLoading(false);
      return;
    }

    try {
      // 1. Create order on server
      const orderRes = await fetch("/api/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: cartTotal }),
      });
      const order = await orderRes.json();

      if (order.error) throw new Error(order.error);

      // 2. Open Razorpay Widget
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "Shree Avigna Natural Oils",
        description: "Pure Wood-Pressed Oils Purchase",
        image: "/splash-logo.png",
        order_id: order.id,
        handler: function (response) {
          // Payment Successful
          setLoading(false);
          setIsOrdered(true);
          clearCart();
        },
        prefill: {
          name: `${shippingData.firstName} ${shippingData.lastName}`,
          contact: shippingData.phone,
        },
        theme: {
          color: "#055b41", // Shree Avigna Primary Green
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error(err);
      alert("Something went wrong with the payment. Please try again.");
      setLoading(false);
    }
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
                <input type="text" required value={shippingData.firstName} onChange={(e) => setShippingData({...shippingData, firstName: e.target.value})} className="w-full px-5 py-4 rounded-xl border border-stone-200 bg-stone-50" placeholder="John" />
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">Last Name</label>
                <input type="text" required value={shippingData.lastName} onChange={(e) => setShippingData({...shippingData, lastName: e.target.value})} className="w-full px-5 py-4 rounded-xl border border-stone-200 bg-stone-50" placeholder="Doe" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-stone-700 mb-2">Full Address</label>
                <textarea required rows="3" value={shippingData.address} onChange={(e) => setShippingData({...shippingData, address: e.target.value})} className="w-full px-5 py-4 rounded-xl border border-stone-200 bg-stone-50" placeholder="Apt, Street, Area..."></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">City</label>
                <input type="text" required value={shippingData.city} onChange={(e) => setShippingData({...shippingData, city: e.target.value})} className="w-full px-5 py-4 rounded-xl border border-stone-200 bg-stone-50" placeholder="Bangalore" />
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">Phone</label>
                <input type="tel" required value={shippingData.phone} onChange={(e) => setShippingData({...shippingData, phone: e.target.value})} className="w-full px-5 py-4 rounded-xl border border-stone-200 bg-stone-50" placeholder="+91 98765 43210" />
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm" data-aos="fade-up">
            <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
              <span className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center text-stone-900 text-sm">2</span>
              Payment Method
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="relative border-2 border-primary rounded-2xl p-6 cursor-pointer bg-green-50/50">
                <input type="radio" name="payment" className="absolute opacity-0" defaultChecked />
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <img src="https://razorpay.com/favicon.ico" className="w-6 h-6" alt="Razorpay" />
                    <p className="font-bold text-stone-900 leading-none">Instant Payment</p>
                  </div>
                  <div>
                    <p className="text-xs text-stone-500">Google Pay, PhonePe, Cards, Netbanking</p>
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
              disabled={loading || cartTotal === 0}
              className="btn-secondary w-full py-5 text-lg shadow-lg flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <>Pay & Order <RocketLaunchIcon className="w-5 h-5" /></>
              )}
            </button>
            <p className="text-[10px] text-stone-400 text-center mt-6 uppercase tracking-widest font-bold">
              Secure Transaction by Razorpay
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
