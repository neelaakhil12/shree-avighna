"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { 
  ShoppingBagIcon, 
  UserCircleIcon, 
  ArrowRightIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  TruckIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

const OrderStatusBadge = ({ status }) => {
  const styles = {
    'Processing': 'bg-blue-100 text-blue-700',
    'Shipped': 'bg-purple-100 text-purple-700',
    'Delivered': 'bg-green-100 text-green-700',
    'Cancelled': 'bg-red-100 text-red-700',
  };

  const icons = {
    'Processing': <ClockIcon className="w-4 h-4" />,
    'Shipped': <TruckIcon className="w-4 h-4" />,
    'Delivered': <CheckCircleIcon className="w-4 h-4" />,
    'Cancelled': <ArrowLeftIcon className="w-4 h-4" />,
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 w-fit ${styles[status] || 'bg-stone-100 text-stone-600'}`}>
      {icons[status] || <ClockIcon className="w-4 h-4" />}
      {status || 'Processing'}
    </span>
  );
};

export default function AccountPage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      window.location.href = '/login';
    }
  }, [user, authLoading]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .eq('email', user.email)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching orders:', error.message, error.code);
          // Don't redirect, just show empty state
        } else {
          setOrders(data || []);
        }
      } catch (err) {
        console.error('Error fetching orders (catch):', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (authLoading || (loading && user)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-stone-50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-stone-900 mb-2 uppercase tracking-tight">My Account</h1>
            <div className="flex items-center gap-3 text-stone-500 font-medium">
              <UserCircleIcon className="w-5 h-5" />
              {user.email}
            </div>
          </div>
          <button 
            onClick={() => signOut()}
            className="text-stone-400 hover:text-red-500 font-bold uppercase tracking-widest text-xs transition-colors flex items-center gap-2"
          >
            Sign Out <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content - Order History */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold text-stone-900 border-b border-stone-200 pb-4">Order History</h2>
            
            {orders.length === 0 ? (
              <div className="bg-white rounded-[2rem] p-12 text-center border border-stone-100 shadow-sm animate-fade-in">
                <ShoppingBagIcon className="w-16 h-16 text-stone-200 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-stone-900 mb-2">No orders yet</h3>
                <p className="text-stone-500 mb-8 max-w-sm mx-auto">You haven't placed any orders yet. Start shopping our 100% natural wood cold-pressed oils!</p>
                <Link href="/products" className="btn-secondary py-4 px-10 inline-block">
                  Browse Products
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden hover:shadow-md transition-all animate-fade-up">
                    <div className="p-6 md:p-8">
                      <div className="flex flex-wrap justify-between gap-4 mb-6">
                        <div>
                          <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Order Date</p>
                          <p className="font-bold text-stone-900">{new Date(order.created_at).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Order ID</p>
                          <p className="font-black text-secondary">{order.order_id}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Total Amount</p>
                          <p className="font-bold text-stone-900">₹{order.total_amount}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Status</p>
                          <OrderStatusBadge status={order.status} />
                        </div>
                      </div>

                      <div className="border-t border-stone-50 pt-6">
                        <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">Items</p>
                        <div className="space-y-3">
                          {order.items?.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center bg-stone-50 p-4 rounded-2xl">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-white rounded-xl border border-stone-100 flex items-center justify-center text-secondary font-bold text-xs">
                                  {item.selectedSize}
                                </div>
                                <span className="font-bold text-stone-800">{item.name}</span>
                              </div>
                              <span className="text-stone-500 font-medium">x{item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {(order.status === 'Shipped' || order.tracking_id) && (
                        <div className="mt-8 bg-primary/5 p-6 rounded-3xl border border-primary/10 space-y-4">
                           <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
                               <TruckIcon className="w-6 h-6" />
                             </div>
                             <div>
                                <p className="text-sm font-black text-stone-900 uppercase tracking-tight">Track Your Shipment</p>
                                <p className="text-xs text-stone-500">Your order is on the way via DTDC.</p>
                             </div>
                           </div>
                           
                           {order.tracking_id && (
                             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
                               <div>
                                 <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Tracking ID (AWB)</p>
                                 <p className="font-black text-stone-900 text-lg">{order.tracking_id}</p>
                               </div>
                               <a 
                                 href={order.tracking_link ? order.tracking_link : `https://www.dtdc.in/tracking/tracking_results.asp?SearchType=T&pagename=tracking&keyword=${order.tracking_id}`}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="btn-primary py-3 px-6 text-xs text-center"
                               >
                                 Track Shipment
                               </a>
                             </div>
                           )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar - Quick Stats */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-[2rem] p-8 border border-stone-100 shadow-xl sticky top-32">
              <h3 className="text-xl font-bold text-stone-900 mb-8">Summary</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-stone-50 p-6 rounded-2xl">
                  <p className="text-3xl font-black text-secondary mb-1">{orders.length}</p>
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Total Orders</p>
                </div>
                <div className="bg-stone-50 p-6 rounded-2xl">
                  <p className="text-3xl font-black text-primary mb-1">
                    {orders.filter(o => o.status === 'Delivered').length}
                  </p>
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Delivered</p>
                </div>
              </div>

              <div className="mt-12 space-y-6">
                 <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600 flex-shrink-0">
                       <CheckCircleIcon className="w-6 h-6" />
                    </div>
                    <div>
                       <h4 className="font-bold text-stone-900 text-sm">Quality Guaranteed</h4>
                       <p className="text-xs text-stone-500 italic mt-1">&quot;Tested for purity in every batch.&quot;</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                       <TruckIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                       <h4 className="font-bold text-stone-900 text-sm">Fast Shipping</h4>
                       <p className="text-xs text-stone-500 mt-1">Orders dispatched within 24 hours.</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
