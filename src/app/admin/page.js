"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { 
  PlusIcon, 
  PencilSquareIcon, 
  TrashIcon, 
  ChartBarIcon, 
  ShoppingBagIcon, 
  ArrowLeftOnRectangleIcon, 
  ArchiveBoxIcon 
} from '@heroicons/react/24/outline';

const hardcodedProducts = [
  { id: 'hn-1', name: "Groundnut Oil", prices: { "250ml": 95, "500ml": 185, "1lt": 370, "5lts": 1850 }, stock: 120, category: "Wood Pressed", image_url: "/products/groundnut.png" },
  { id: 'ws-1', name: "White Sesame Oil", prices: { "250ml": 150, "500ml": 295, "1lt": 590, "5lts": 2950 }, stock: 85, category: "Wood Pressed", image_url: "/products/white-sesame.png" },
  { id: 'bs-1', name: "Black Sesame Oil", prices: { "250ml": 150, "500ml": 295, "1lt": 590, "5lts": 2950 }, stock: 45, category: "Wood Pressed", image_url: "/products/black-sesame.png" },
  { id: 'sf-1', name: "Safflower Oil", prices: { "250ml": 130, "500ml": 245, "1lt": 490, "5lts": 2450 }, stock: 65, category: "Wood Pressed", image_url: "/products/safflower.png" },
  { id: 'sn-1', name: "Sunflower Oil", prices: { "250ml": 130, "500ml": 245, "1lt": 490, "5lts": 2450 }, stock: 80, category: "Wood Pressed", image_url: "/products/sunflower.png" },
  { id: 'bm-1', name: "Badam Oil", prices: { "1lt": 1200 }, stock: 25, category: "Wood Pressed", image_url: "/products/badam.png" },
  { id: 'mu-1', name: "Mustard Oil", prices: { "250ml": 105, "500ml": 210, "1lt": 420, "5lts": 2100 }, stock: 40, category: "Wood Pressed", image_url: "/products/mustard.png" },
  { id: 'nm-1', name: "Neem Oil", prices: { "250ml": 175, "500ml": 350, "1lt": 700, "5lts": 3500 }, stock: 55, category: "Wood Pressed", image_url: "/products/neem.png" },
  { id: 'cr-1', name: "Coconut Oil (Kuridi)", prices: { "250ml": 225, "500ml": 450, "1lt": 900, "5lts": 4500 }, stock: 30, category: "Wood Pressed", image_url: "/products/kuridi.png" },
  { id: 'fl-1', name: "Flax Seed Oil", prices: { "1lt": 800 }, stock: 15, category: "Wood Pressed", image_url: "/products/flax.png" },
  { id: 'ct-1', name: "Castor Oil", prices: { "250ml": 105, "500ml": 210, "1lt": 420, "5lts": 2100 }, stock: 20, category: "Wood Pressed", image_url: "/products/castor.png" },
];

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  // Database States
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState(['Wood Pressed']);

  // Fetch data on load
  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
      fetchOrders();
    }
  }, [isAuthenticated]);

  const fetchProducts = async () => {
    setLoading(true);
    const { data: dbData, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    
    if (!error && dbData) {
      // Merge: Show ALL from DB + only hardcoded ones NOT in DB
      const dbNames = new Set(dbData.map(p => p.name.toLowerCase()));
      const merged = [
        ...dbData,
        ...hardcodedProducts.filter(hp => !dbNames.has(hp.name.toLowerCase()))
      ];
      setProducts(merged);
    } else {
      setProducts(hardcodedProducts);
    }
    setLoading(false);
  };

  const fetchOrders = async () => {
    // Orders would come from a similar fetch
    setOrders([
      { id: 'ORD001', status: 'pending', total: 1200 },
      { id: 'ORD002', status: 'completed', total: 850 },
    ]);
  };

  // Form State for Adding/Editing
  const [formData, setFormData] = useState({
    name: '',
    category: 'Wood Pressed',
    price_1lt: '',
    stock: '',
    image: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'shreeavighna@gmail.com' && password === 'avighna123') { 
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials!');
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormData({ 
      name: '', 
      category: categories[0], 
      price_250ml: '',
      price_500ml: '',
      price_1lt: '', 
      price_5lts: '',
      inStock: true, 
      description: '', 
      caption: '',
      benefits: '',
      image: '', 
      imageFile: null, 
      imagePreview: null 
    });
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price_250ml: product.prices?.["250ml"] || '',
      price_500ml: product.prices?.["500ml"] || '',
      price_1lt: product.prices?.["1lt"] || '',
      price_5lts: product.prices?.["5lts"] || '',
      inStock: product.in_stock !== false,
      description: product.description || '',
      caption: product.caption || '',
      benefits: Array.isArray(product.benefits) ? product.benefits.join('\n') : '',
      image: product.image_url || '',
      imageFile: null,
      imagePreview: product.image_url || null
    });
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Delete this product permanently?')) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (!error) {
        setProducts(products.filter(p => p.id !== id));
      } else {
        alert('Error deleting product');
      }
    }
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    let imageUrl = formData.image;

    if (formData.imageFile) {
      const file = formData.imageFile;
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file);

      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);
        imageUrl = publicUrlData.publicUrl;
      } else {
        alert('Error uploading image');
        setLoading(false);
        return;
      }
    }

    const productPayload = {
      name: formData.name,
      category: formData.category,
      prices: { 
        "250ml": Number(formData.price_250ml) || 0,
        "500ml": Number(formData.price_500ml) || 0,
        "1lt": Number(formData.price_1lt) || 0,
        "5lts": Number(formData.price_5lts) || 0
      },
      in_stock: formData.inStock !== false,
      description: formData.description,
      caption: formData.caption,
      benefits: formData.benefits.split('\n').filter(b => b.trim() !== ''),
      image_url: imageUrl
    };

    const isRealDBProduct = editingProduct && editingProduct.id.toString().length > 10;

    if (isRealDBProduct) { 
      // If it's a real UUID from the DB
      const { data, error } = await supabase
        .from('products')
        .update(productPayload)
        .eq('id', editingProduct.id)
        .select();
      
      if (error) {
        console.error("Supabase Update Error:", error);
        alert(`Update Failed: ${error.message}`);
      } else {
        setProducts(products.map(p => p.id === editingProduct.id ? data[0] : p));
        alert('Product updated successfully!');
      }
    } else {
      // It's a brand new product OR a hardcoded one being "upgraded" to the live DB
      const { data, error } = await supabase
        .from('products')
        .insert([productPayload])
        .select();
      
      if (error) {
        console.error("Supabase Insert Error:", error);
        alert(`Save Failed: ${error.message}`);
      } else {
        // If it was a hardcoded product, remove it from the list and replace with the DB version
        const newProductList = editingProduct 
          ? [data[0], ...products.filter(p => p.id !== editingProduct.id)]
          : [data[0], ...products];
        
        setProducts(newProductList);
        alert('Product added and saved to cloud database!');
      }
    }
    
    setLoading(false);
    setIsModalOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        imageFile: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  const handleAddCategory = () => {
    const newCat = window.prompt('Enter new category name:');
    if (newCat && !categories.includes(newCat)) {
      setCategories([...categories, newCat]);
    }
  };

  const stats = {
    totalProducts: products.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    completedOrders: orders.filter(o => o.status === 'completed').length
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 border border-stone-100 flex flex-col gap-8" data-aos="zoom-in">
          <div className="text-center">
            <Link href="/" className="inline-block mb-8 hover:scale-105 transition-transform">
              <img 
                src="/splash-logo.png?v=1" 
                alt="Shree Avigna Logo" 
                className="h-12 md:h-16 w-auto object-contain mx-auto"
              />
            </Link>
            <h1 className="text-3xl font-black text-stone-900 uppercase tracking-tighter mb-2">Admin Portal</h1>
            <p className="text-stone-500 text-sm font-medium">Log in to manage your premium store inventory.</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-black text-stone-400 mb-2 ml-1">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl border border-stone-200 focus:outline-none focus:ring-4 focus:ring-secondary/10 focus:border-secondary transition-all bg-stone-50 text-stone-900 font-medium placeholder:text-stone-300" 
                placeholder="shreeavighna@gmail.com"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest font-black text-stone-400 mb-2 ml-1">Secure Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl border border-stone-200 focus:outline-none focus:ring-4 focus:ring-secondary/10 focus:border-secondary transition-all bg-stone-50 text-stone-900 font-medium placeholder:text-stone-300" 
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit" 
              className="btn-secondary w-full py-4 text-lg font-black uppercase tracking-widest shadow-xl shadow-secondary/20 mt-4 rounded-2xl"
            >
              Sign In
            </button>
          </form>
          <div className="text-center">
            <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Authorized Personnel Only</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-stone-900 text-white p-6 flex flex-col pt-12">
        <div className="mb-12 px-2">
          <img 
            src="/splash-logo.png?v=1" 
            alt="Logo" 
            className="h-20 md:h-32 w-auto object-contain mx-auto"
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
          className="mt-10 flex items-center gap-3 px-4 py-3 text-stone-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5" /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-12 overflow-y-auto pt-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-4xl font-black text-stone-900 capitalize tracking-tighter">{activeTab}</h2>
            <p className="text-stone-500 text-sm font-medium">Welcome back, Admin.</p>
          </div>
          {activeTab === 'products' && (
            <div className="flex gap-4">
              <button onClick={handleAddCategory} className="btn-outline py-3 px-6 text-xs uppercase font-black tracking-widest border-stone-200">
                + Add Category
              </button>
              <button onClick={handleAddProduct} className="btn-primary py-3 px-6 text-xs uppercase font-black tracking-widest">
                <PlusIcon className="w-4 h-4" /> Add Product
              </button>
            </div>
          )}
        </header>

        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: 'Total Products', val: stats.totalProducts, icon: ArchiveBoxIcon, color: 'bg-blue-50 text-blue-600' },
                { label: 'Pending Orders', val: stats.pendingOrders, icon: ChartBarIcon, color: 'bg-amber-50 text-amber-600' },
                { label: 'Completed Orders', val: stats.completedOrders, icon: ShoppingBagIcon, color: 'bg-green-50 text-green-600' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black tracking-widest text-stone-400 mb-1">{stat.label}</p>
                    <p className="text-3xl font-black text-stone-900">{stat.val}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Orders List */}
            <div className="bg-white rounded-[2.5rem] border border-stone-100 shadow-sm overflow-hidden">
              <div className="bg-stone-50/50 px-8 py-6 border-b border-stone-100 flex justify-between items-center">
                <h3 className="text-lg font-black text-stone-900 tracking-tighter uppercase">Recent Orders</h3>
                <button onClick={() => setActiveTab('orders')} className="text-[10px] font-black uppercase tracking-widest text-secondary hover:underline">View All</button>
              </div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-50 text-stone-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-stone-100">
                    <th className="px-8 py-6">Order ID</th>
                    <th className="px-8 py-6">Status</th>
                    <th className="px-8 py-6 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {orders.length > 0 ? orders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="hover:bg-stone-50/50 transition-colors">
                      <td className="px-8 py-6 font-black text-stone-900">{order.id}</td>
                      <td className="px-8 py-6">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${order.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-green-50 text-green-600'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right font-black text-stone-900">₹{order.total}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="3" className="px-8 py-10 text-center text-stone-400 italic">No recent orders found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'products' ? (
          <div className="bg-white rounded-[2.5rem] border border-stone-100 shadow-sm overflow-hidden mt-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 text-stone-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-stone-100">
                  <th className="px-8 py-6">Image</th>
                  <th className="px-8 py-6">Product Details</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {products.map((p) => (
                  <tr key={p.id} className="group hover:bg-stone-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="w-16 h-16 rounded-2xl bg-stone-100 overflow-hidden border border-stone-200">
                        {(p.image || p.image_url) ? (
                          <img 
                            src={p.image || p.image_url} 
                            className="w-full h-full object-cover" 
                            alt={p.name} 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-stone-300 font-bold text-xs leading-none">NO-IMG</div>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-black text-stone-900 text-lg leading-tight mb-1">{p.name}</p>
                      <div className="flex gap-4 items-center">
                        <span className="text-[10px] font-bold bg-stone-100 px-3 py-1 rounded-full uppercase tracking-widest text-stone-500">{p.category}</span>
                        <span className="text-secondary font-black text-sm">₹{p.prices["1lt"]} (1LT)</span>
                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${p.in_stock !== false ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                          {p.in_stock !== false ? 'Available' : 'Out of Stock'}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right space-x-2">
                      <button onClick={() => handleEditProduct(p)} className="p-3 bg-stone-100 rounded-xl text-stone-400 hover:text-stone-900 hover:bg-stone-200 transition-all">
                        <PencilSquareIcon className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDeleteProduct(p.id)} className="p-3 bg-stone-100 rounded-xl text-stone-400 hover:text-red-600 hover:bg-red-50 transition-all">
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : activeTab !== 'overview' && (
          <div className="bg-white rounded-[2.5rem] p-20 text-center border-2 border-dashed border-stone-200 mt-8">
            <p className="text-stone-400 italic font-medium uppercase tracking-widest text-xs">Order management system coming soon.</p>
          </div>
        )}

        {/* Modal for Add/Edit */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl p-10 max-h-[90vh] overflow-y-auto">
              <h3 className="text-3xl font-black text-stone-900 mb-8 tracking-tighter">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <form onSubmit={handleSaveProduct} className="p-8 md:p-10 space-y-8 overflow-y-auto max-h-[80vh]">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase font-black text-stone-400 mb-2">Product Name</label>
                    <input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-secondary font-bold" placeholder="Groundnut Oil" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-black text-stone-400 mb-2">Short Tagline (Caption)</label>
                    <input value={formData.caption} onChange={(e) => setFormData({...formData, caption: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-secondary font-bold" placeholder="Pure & Fresh..." />
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-black text-stone-400 mb-2">250ML (₹)</label>
                    <input type="number" value={formData.price_250ml} onChange={(e) => setFormData({...formData, price_250ml: e.target.value})} className="w-full px-4 py-4 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-secondary font-bold text-sm" placeholder="100" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-black text-stone-400 mb-2">500ML (₹)</label>
                    <input type="number" value={formData.price_500ml} onChange={(e) => setFormData({...formData, price_500ml: e.target.value})} className="w-full px-4 py-4 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-secondary font-bold text-sm" placeholder="200" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-black text-stone-400 mb-2">1LT (₹)</label>
                    <input 
                      type="number" 
                      value={formData.price_1lt} 
                      onChange={(e) => {
                        const val = e.target.value;
                        const num = Number(val);
                        setFormData({
                          ...formData, 
                          price_1lt: val,
                          price_250ml: val ? Math.round(num * 0.25).toString() : formData.price_250ml,
                          price_500ml: val ? Math.round(num * 0.5).toString() : formData.price_500ml,
                          price_5lts: val ? Math.round(num * 5).toString() : formData.price_5lts
                        });
                      }} 
                      className="w-full px-4 py-4 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-secondary font-bold text-sm" 
                      placeholder="400" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-black text-stone-400 mb-2">5LTS (₹)</label>
                    <input type="number" value={formData.price_5lts} onChange={(e) => setFormData({...formData, price_5lts: e.target.value})} className="w-full px-4 py-4 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-secondary font-bold text-sm" placeholder="1800" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 items-end">
                  <div>
                    <label className="block text-[10px] uppercase font-black text-stone-400 mb-2">Category</label>
                    <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-secondary font-bold appearance-none">
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col h-full">
                    <label className="block text-[10px] uppercase font-black text-stone-400 mb-2">Availability</label>
                    <button 
                      type="button"
                      onClick={() => setFormData({...formData, inStock: !formData.inStock})}
                      className={`flex items-center gap-3 px-6 py-4 rounded-2xl border-2 transition-all font-bold ${
                        formData.inStock 
                          ? 'bg-green-50 border-green-200 text-green-700' 
                          : 'bg-red-50 border-red-200 text-red-700'
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full ${formData.inStock ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                      {formData.inStock ? 'IN STOCK' : 'OUT OF STOCK'}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                   <div>
                    <label className="block text-[10px] uppercase font-black text-stone-400 mb-2">Product Description</label>
                    <textarea 
                      value={formData.description} 
                      onChange={(e) => setFormData({...formData, description: e.target.value})} 
                      className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-secondary font-medium text-xs h-32 resize-none" 
                      placeholder="General description..."
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-black text-stone-400 mb-2">Health Benefits (One per line)</label>
                    <textarea 
                      value={formData.benefits} 
                      onChange={(e) => setFormData({...formData, benefits: e.target.value})} 
                      className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-secondary font-medium text-xs h-32 resize-none" 
                      placeholder="Benefit 1&#10;Benefit 2&#10;Benefit 3..."
                    />
                  </div>
                </div>

                <div>
                    <label className="block text-[10px] uppercase font-black text-stone-400 mb-2">Product Image</label>
                    <div className="flex gap-4 items-center">
                      <div className="w-20 h-20 rounded-2xl bg-stone-100 border border-stone-200 overflow-hidden flex items-center justify-center">
                        {formData.imagePreview ? (
                          <img src={formData.imagePreview} className="w-full h-full object-cover" alt="Preview" />
                        ) : (
                          <PlusIcon className="w-8 h-8 text-stone-300" />
                        )}
                      </div>
                      <label className="flex-grow">
                        <span className="inline-block w-full py-5 px-4 bg-stone-100 rounded-[1.5rem] text-center text-[10px] font-black uppercase tracking-widest text-stone-600 cursor-pointer hover:bg-stone-200 transition-colors border border-dashed border-stone-300">
                          {formData.imageFile ? 'Change Selected File' : 'Upload Premium Product Image'}
                        </span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                      </label>
                    </div>
                </div>

                <div className="flex gap-4 pt-4 pb-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="flex-grow py-5 rounded-[1.5rem] bg-stone-100 text-stone-600 font-black text-[10px] uppercase tracking-widest hover:bg-stone-200 transition-all">Cancel</button>
                  <button type="submit" disabled={loading} className="flex-[2] py-5 rounded-[1.5rem] bg-secondary text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-secondary/20 hover:bg-green-800 transition-all active:scale-95 disabled:opacity-50">
                    {loading ? 'Processing...' : (editingProduct ? 'Update Product Details' : 'Save New Product')}
                  </button>
                </div>
              </div>
            </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
