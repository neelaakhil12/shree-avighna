"use client";

import React, { useState } from 'react';
import { 
  PlusIcon, 
  PencilSquareIcon, 
  TrashIcon, 
  ChartBarIcon, 
  ShoppingBagIcon, 
  ArrowLeftOnRectangleIcon, 
  ArchiveBoxIcon 
} from '@heroicons/react/24/outline';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('products');

  // Hardcoded default products for the dashboard view
  const [products, setProducts] = useState([
    { id: 1, name: "Groundnut Oil", prices: { "1lt": 370 }, stock: 120, category: "Wood Pressed" },
    { id: 2, name: "White Sesame Oil", prices: { "1lt": 590 }, stock: 85, category: "Wood Pressed" },
    { id: 3, name: "Black Sesame Oil", prices: { "1lt": 590 }, stock: 45, category: "Wood Pressed" },
    { id: 4, name: "Safflower Oil", prices: { "1lt": 490 }, stock: 65, category: "Wood Pressed" },
    { id: 5, name: "Sunflower Oil", prices: { "1lt": 490 }, stock: 80, category: "Wood Pressed" },
    { id: 6, name: "Badam Oil", prices: { "1lt": 0 }, stock: 25, category: "Premium Oils" },
  ]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple mock password
      setIsAuthenticated(true);
    } else {
      alert('Invalid password! Try "admin123"');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 border border-stone-100" data-aos="zoom-in">
          <div className="text-center mb-8">
            <div className="mb-6">
              <img 
                src="/logo.png?v=2" 
                alt="Shree Avigna Logo" 
                className="mx-auto h-10 md:h-12 w-auto object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-stone-900 uppercase tracking-tight">Admin Portal</h1>
            <p className="text-stone-500 text-sm mt-2">Please login to manage your store.</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">Admin Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all bg-stone-50" 
                placeholder="Enter password"
              />
            </div>
            <button 
              type="submit" 
              className="btn-secondary w-full py-4 text-lg shadow-lg shadow-green-500/10"
            >
              Access Dashboard
            </button>
            <p className="text-[10px] text-center text-stone-400">Demo password: admin123</p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-stone-900 text-white p-6 flex flex-col pt-12">
        <div className="mb-10 px-2">
          <img 
            src="/logo.png?v=2" 
            alt="Logo" 
            className="h-8 md:h-10 w-auto object-contain"
          />
        </div>

        <nav className="flex-grow space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'overview' ? 'bg-primary text-stone-900 font-bold' : 'hover:bg-white/5 text-stone-400'}`}
          >
            <ChartBarIcon className="w-5 h-5" /> Overview
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'products' ? 'bg-primary text-stone-900 font-bold' : 'hover:bg-white/5 text-stone-400'}`}
          >
            <ArchiveBoxIcon className="w-5 h-5" /> Products
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'orders' ? 'bg-primary text-stone-900 font-bold' : 'hover:bg-white/5 text-stone-400'}`}
          >
            <ShoppingBagIcon className="w-5 h-5" /> Orders
          </button>
        </nav>

        <button 
          onClick={() => setIsAuthenticated(false)}
          className="mt-10 flex items-center gap-3 px-4 py-3 text-stone-500 hover:text-white transition-colors text-sm"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5" /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-12 overflow-y-auto pt-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold text-stone-900 capitalize">{activeTab}</h2>
            <p className="text-stone-500 text-sm">Manage your Shree Avigna store inventory and orders.</p>
          </div>
          {activeTab === 'products' && (
            <button className="btn-primary py-3 px-6 text-sm">
              <PlusIcon className="w-4 h-4" /> Add New Product
            </button>
          )}
        </header>

        {activeTab === 'products' ? (
          <div className="bg-white rounded-[2rem] border border-stone-100 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 text-stone-500 text-xs font-bold uppercase tracking-widest border-b border-stone-100">
                  <th className="px-6 py-4">Product Name</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-stone-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-stone-900">{p.name}</td>
                    <td className="px-6 py-4 text-stone-500 text-sm">{p.category}</td>
                    <td className="px-6 py-4 font-medium text-secondary text-sm">₹{p.prices["1lt"]} (1lt)</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${p.stock < 50 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                        {p.stock} units
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button className="p-2 text-stone-400 hover:text-stone-900 transition-colors">
                        <PencilSquareIcon className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-stone-400 hover:text-accent transition-colors">
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-[2rem] p-20 text-center border-2 border-dashed border-stone-200">
            <p className="text-stone-400 italic">This section is under development for your premium store.</p>
          </div>
        )}
      </main>
    </div>
  );
}
