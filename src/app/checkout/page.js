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

import { supabase } from '@/lib/supabase';
import { jsPDF } from 'jspdf';
import { useAuth } from '@/context/AuthContext';

export default function CheckoutPage() {
  const { cartTotal, cart, clearCart } = useCart();
  const { user } = useAuth();
  const [isOrdered, setIsOrdered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [orderSnapshot, setOrderSnapshot] = useState(null);
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    locationLink: '',
    address: '',
    city: ''
  });

  // Pre-fill email if user is logged in
  useEffect(() => {
    if (user?.email && !shippingData.email) {
      setShippingData(prev => ({ ...prev, email: user.email }));
    }
  }, [user]);

  const generatePDF = (orderData) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(5, 91, 65); // Shree Avigna Green
    doc.text('SHREE AVIGHNA', 105, 20, { align: 'center' });
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Natural Wood Cold Pressed Oils', 105, 27, { align: 'center' });
    
    doc.setDrawColor(200);
    doc.line(20, 35, 190, 35);
    
    // Order Info
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text('Order Details', 20, 50);
    doc.setFontSize(10);
    doc.text(`Order ID: ${orderData.order_id}`, 20, 60);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 67);
    doc.text(`Payment Status: Paid (Razorpay)`, 20, 74);
    
    // Shipping Info
    doc.text('Shipping To:', 120, 60);
    doc.text(`${orderData.full_name}`, 120, 67);
    doc.text(`${orderData.phone}`, 120, 74);
    doc.text(`${orderData.address}`, 120, 81, { maxWidth: 70 });
    doc.text(`${orderData.city}`, 120, 95);
    
    // Table Header
    doc.setFillColor(245, 245, 245);
    doc.rect(20, 110, 170, 10, 'F');
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Item', 25, 117);
    doc.text('Size', 100, 117);
    doc.text('Qty', 140, 117);
    doc.text('Price', 170, 117);
    
    // Items
    let y = 130;
    doc.setFont('helvetica', 'normal');
    orderData.items.forEach(item => {
      doc.text(item.name || 'Product', 25, y);
      doc.text(item.selectedSize || '-', 100, y);
      doc.text((item.quantity || 1).toString(), 140, y);
      doc.text(`Rs. ${item.price * item.quantity}`, 170, y);
      y += 10;
    });
    
    // Total
    doc.line(20, y, 190, y);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total Amount: Rs. ${orderData.total_amount}`, 190, y + 15, { align: 'right' });
    
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.setFont('helvetica', 'normal');
    doc.text('Visit us again at www.shreeavigna.com', 105, 280, { align: 'center' });
    
    doc.save(`shree-avigna-order-${orderData.order_id}.pdf`);
  };

  const sendWhatsAppNotification = (orderData) => {
    const itemsList = orderData.items.map(i => `${i.name} (${i.selectedSize}) x ${i.quantity}`).join('%0A- ');
    const message = `*NEW ORDER RECEIVED!*%0A%0A*Order:* ${orderData.order_id}%0A*Customer:* ${orderData.full_name}%0A*Phone:* ${orderData.phone}%0A*Total:* ₹${orderData.total_amount}%0A%0A*Items:*%0A- ${itemsList}%0A%0A*Address:* ${orderData.address}, ${orderData.city}%0A*Location:* ${orderData.location_link}`;
    
    // Admin WhatsApp
    const adminWhatsApp = "916304218374"; 
    const waUrl = `https://wa.me/${adminWhatsApp}?text=${message}`;
    window.open(waUrl, '_blank');
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const link = `https://maps.google.com/?q=${latitude},${longitude}`;
        setShippingData({ ...shippingData, locationLink: link });
        setIsLocating(false);
      },
      (error) => {
        alert('Unable to retrieve your location. Please check browser permissions.');
        setIsLocating(false);
      }
    );
  };

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
      const orderData = await orderRes.json();

      if (orderData.error) throw new Error(orderData.error);

      // 2. Open Razorpay Widget
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: "INR",
        name: "Shree Avigna Natural Oils",
        description: "Pure Wood-Pressed Oils Purchase",
        image: "/splash-logo.png",
        order_id: orderData.id,
        handler: async function (response) {
          // Payment Successful
          const finalOrderData = {
            order_id: orderData.id,
            full_name: `${shippingData.firstName} ${shippingData.lastName}`,
            email: shippingData.email,
            phone: shippingData.phone,
            address: shippingData.address,
            city: shippingData.city,
            location_link: shippingData.locationLink,
            total_amount: cartTotal,
            items: cart,
            payment_id: response.razorpay_payment_id,
            user_id: user?.id || null,
            status: 'Processing'
          };

          // Save to Supabase
          const { error: dbError } = await supabase.from('orders').insert([finalOrderData]);
          if (dbError) {
            console.error("Supabase Save Error:", dbError.message);
            alert("Order placed, but we encountered a database error: " + dbError.message);
          }

          setOrderSnapshot(finalOrderData);
          setOrderId(orderData.id);
          setIsOrdered(true);
          
          // Trigger WhatsApp
          sendWhatsAppNotification(finalOrderData);
          
          // Auto-download PDF
          generatePDF(finalOrderData);
          
          clearCart();
          setLoading(false);
        },
        prefill: {
          name: `${shippingData.firstName} ${shippingData.lastName}`,
          contact: shippingData.phone,
          email: shippingData.email,
        },
        theme: {
          color: "#055b41",
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
          <h2 className="text-4xl font-bold text-stone-900 mb-4">Your order was successful!</h2>
          <p className="text-stone-500 mb-6 max-w-sm mx-auto">Thank you for choosing Shree Avigna. Your pure wood-pressed oils are being prepared for dispatch.</p>
          
          <div className="bg-stone-50 p-6 rounded-2xl mb-10 w-full max-w-md border border-stone-100">
             <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">Order ID</p>
             <p className="text-xl font-black text-stone-900 mb-4">{orderId}</p>
             <div className="flex flex-col gap-3">
                <button 
                  onClick={() => generatePDF(orderSnapshot)}
                  className="w-full py-3 bg-white border border-stone-200 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-stone-100"
                >
                  Download Receipt (PDF)
                </button>
                <button 
                  onClick={() => sendWhatsAppNotification(orderSnapshot)}
                  className="w-full py-3 bg-green-600 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-green-700"
                >
                  Send Details to WhatsApp
                </button>
             </div>
          </div>

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
            
            {/* Online Payment Required Alert */}
            <div className="bg-yellow-50 border-l-4 border-accent p-4 mb-8 rounded-r-xl">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-accent" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3 text-sm text-yellow-800">
                  <p className="font-bold text-[15px] mb-0.5">Online Payment Required</p>
                  <p>In order to process your request securely, we currently only accept 100% online payments. Cash on Delivery (COD) is not available.</p>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-bold mb-8 flex items-center gap-2">
              <span className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center text-stone-900 text-sm">1</span>
              Shipping Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">First Name</label>
                <input type="text" required value={shippingData.firstName} onChange={(e) => setShippingData({...shippingData, firstName: e.target.value})} className="w-full px-5 py-4 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="John" />
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">Last Name</label>
                <input type="text" required value={shippingData.lastName} onChange={(e) => setShippingData({...shippingData, lastName: e.target.value})} className="w-full px-5 py-4 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Doe" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-stone-700 mb-2">Email Address</label>
                <input type="email" required value={shippingData.email} onChange={(e) => setShippingData({...shippingData, email: e.target.value})} className="w-full px-5 py-4 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="john.doe@email.com" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-stone-700 mb-2">Phone Number</label>
                <input type="tel" required value={shippingData.phone} onChange={(e) => setShippingData({...shippingData, phone: e.target.value})} className="w-full px-5 py-4 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="+91 98765 43210" />
              </div>
              <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-bold text-stone-700">Current Location Link (Google Maps)</label>
                  <button 
                    type="button" 
                    onClick={handleLocateMe}
                    disabled={isLocating}
                    className="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-green-700 transition-colors uppercase tracking-widest disabled:opacity-50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {isLocating ? 'Locating...' : 'Locate Me'}
                  </button>
                </div>
                <input type="url" required value={shippingData.locationLink} onChange={(e) => setShippingData({...shippingData, locationLink: e.target.value})} className="w-full px-5 py-4 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="https://maps.app.goo.gl/..." />
                <p className="text-xs text-stone-500 mt-1">Click &quot;Locate Me&quot; or paste a Google Maps link for accurate delivery.</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-stone-700 mb-2">Full Address</label>
                <textarea required rows="3" value={shippingData.address} onChange={(e) => setShippingData({...shippingData, address: e.target.value})} className="w-full px-5 py-4 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Apt, Street, Area..."></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-stone-700 mb-2">City / Pin Code</label>
                <input type="text" required value={shippingData.city} onChange={(e) => setShippingData({...shippingData, city: e.target.value})} className="w-full px-5 py-4 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Bangalore, 560001" />
              </div>
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
                <>Proceed to Pay <RocketLaunchIcon className="w-5 h-5" /></>
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
