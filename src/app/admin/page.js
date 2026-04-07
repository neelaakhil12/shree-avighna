"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { 
  PlusIcon, 
  PencilSquareIcon, 
  TrashIcon, 
  ChartBarIcon, 
  ArrowLeftOnRectangleIcon, 
  ArchiveBoxIcon,
  CurrencyRupeeIcon,
  CalendarIcon,
  ShoppingBagIcon,
  DocumentTextIcon,
  TruckIcon
} from '@heroicons/react/24/outline';

const hardcodedProducts = [
  {
    id: "groundnut-oil",
    name: "Groundnut Oil",
    prices: { "250ml": 95, "500ml": 185, "1lt": 370, "5lts": 1850, "10lts": 3700, "15lts": 5550 },
    caption: "Carefully Selected Groundnuts, Wood Cold Pressed for Purity",
    description: "Our Groundnut Wood Cold Pressed Oil is made from carefully selected farm-fresh groundnuts, extracted using the traditional wooden ghani (wood cold press) method at low temperatures. This slow and natural process helps retain the oil’s natural nutrients, aroma, and authentic flavor without using heat, chemicals, or preservatives.",
    image_url: "/products/groundnut.png",
    category: "Wood Pressed",
    benefits: [
      "Supports Heart Health: Rich in monounsaturated and polyunsaturated fats.",
      "Natural Source of Antioxidants: Contains Vitamin E.",
      "Nourishes Skin: Support healthy and glowing skin.",
      "Provides Natural Energy: Sustained energy for daily activities.",
      "Supports Healthy Metabolism: Helps support digestion.",
      "Enhances Nutrient Absorption: Assist absorbing fat-soluble vitamins.",
      "Ideal for Everyday Cooking: Suitable for sautéing, frying, and traditional cooking."
    ]
  },
  {
    id: "white-sesame-oil",
    name: "White Sesame Oil",
    prices: { "250ml": 150, "500ml": 295, "1lt": 590, "5lts": 2950, "10lts": 5900, "15lts": 8850 },
    caption: "Nature’s goodness, traditionally extracted. Cold pressed sesame oil for pure taste and healthy living.",
    description: "White Sesame Seeds (also known as White Til or Safed Til) are small, oil-rich seeds obtained from the plant Sesamum indicum. We use hulled sesame seeds, where the outer husk is removed to reveal smooth off-white seeds with a mild nutty flavor.",
    image_url: "/products/white-sesame.png",
    category: "Wood Pressed",
    benefits: [
      "Supports Heart Health: Rich in healthy fats.",
      "Rich in Antioxidants: Contains natural antioxidants like sesamol and sesamin.",
      "Improves Digestion: Traditionally used to support better digestion.",
      "Good for Skin & Hair: Nourishes skin and hair naturally.",
      "Anti-Inflammatory Properties: May help reduce inflammation.",
      "Strengthens Immunity: Packed with vitamins and minerals.",
      "Rich in Natural Nutrients: Source of Vitamin E and essential minerals."
    ]
  },
  {
    id: "black-sesame-oil",
    name: "Black Sesame Oil",
    prices: { "250ml": 150, "500ml": 295, "1lt": 590, "5lts": 2950, "10lts": 5900, "15lts": 8850 },
    caption: "Black Sesame. Wood Pressed. Naturally Powerful.",
    description: "At Shree Avighna, we use premium-quality black sesame seeds to produce pure wood cold-pressed sesame oil. Known for its deep color, strong aroma, and high nutritional value.",
    image_url: "/products/black-sesame.png",
    category: "Wood Pressed",
    benefits: [
      "Supports Heart Health: Rich in healthy fats.",
      "High in Antioxidants: Contains natural antioxidants like sesamin and sesamol.",
      "Improves Bone Strength: Naturally rich in calcium and minerals.",
      "Good for Skin & Hair: Deeply nourishes the skin and strengthens hair.",
      "Supports Digestion: Traditionally used to support digestive health.",
      "Natural Energy Booster: Supports overall wellness and vitality."
    ]
  },
  {
    id: "safflower-oil",
    name: "Safflower Oil",
    prices: { "250ml": 130, "500ml": 245, "1lt": 490, "5lts": 2450, "10lts": 4900, "15lts": 7350 },
    caption: "Premium Hulled Safflower Seeds – Pure, Clean, and Rich in Natural Oil.",
    description: "Safflower seeds are known for their high content of healthy unsaturated fats, making the oil a preferred choice for everyday cooking.",
    image_url: "/products/safflower.png",
    category: "Wood Pressed",
    benefits: [
      "Supports Heart Health: Rich in unsaturated fatty acids.",
      "Light and Healthy Cooking Oil: Light texture and mild flavor.",
      "Rich in Antioxidants: Contains Vitamin E and natural antioxidants.",
      "Helps Maintain Healthy Skin: Nourishes and keeps skin soft.",
      "Supports Weight Management: Low in saturated fats.",
      "Promotes Overall Wellness: Essential nutrients for general health."
    ]
  },
  {
    id: "sunflower-oil",
    name: "Sunflower Oil",
    prices: { "250ml": 130, "500ml": 245, "1lt": 490, "5lts": 2450, "10lts": 4900, "15lts": 7350 },
    caption: "Light, Healthy, and Naturally Nourishing – That's Sunflower Oil.",
    description: "At Shree Avighna, premium-quality sunflower seeds are used to produce pure wood cold-pressed sunflower oil. Light color, delicate taste, and nutritional benefits.",
    image_url: "/products/sunflower.png",
    category: "Wood Pressed",
    benefits: [
      "Supports Heart Health: Rich in healthy unsaturated fats.",
      "High in Vitamin E: Natural antioxidant for skin and immune health.",
      "Light and Easy to Digest: Suitable for everyday cooking.",
      "Good for Skin Health: Helps maintain natural moisture.",
      "Natural Energy Source: Essential nutrients for wellness."
    ]
  },
  {
    id: "badam-oil",
    name: "Badam Oil",
    prices: { "500ml": 0, "1lt": 0, "5lts": 0, "10lts": 0, "15lts": 0 },
    caption: "Nature's Secret for Skin and Hair",
    description: "Pure, unrefined almond oil, traditionally extracted through wood cold pressing. Nourishes skin, strengthens hair, and supports overall wellness.",
    image_url: "/products/badam.png",
    category: "Premium Oils",
    benefits: [
      "Nourishes Skin: Moisturizes deeply and improves complexion.",
      "Strengthens Hair: Promotes growth and adds shine.",
      "Rich in Nutrients: Packed with vitamin E and omega fatty acids.",
      "Supports Heart Health: Cardiovascular wellness.",
      "Boosts Immunity & Energy: Enhances overall vitality.",
      "Versatile Usage: Topical and dietary use."
    ]
  },
  {
    id: "mustard-oil",
    name: "Mustard Oil",
    prices: { "250ml": 105, "500ml": 210, "1lt": 420, "5lts": 2100, "10lts": 4200, "15lts": 6300 },
    caption: "Pure Strength, Naturally Pressed",
    description: "Mustard seeds are valued for producing pure mustard oil through natural extraction methods. Rich in oil and essential nutrients.",
    image_url: "/products/mustard.png",
    category: "Wood Pressed",
    benefits: [
      "Supports Heart Health: Balanced cholesterol levels.",
      "Rich in Natural Antioxidants: Protection from oxidative stress.",
      "Aids Digestion: Stimulate digestion.",
      "Good for Skin & Hair: Nourish and strengthen.",
      "Natural Warming Properties: Traditional wellness practices."
    ]
  },
  {
    id: "neem-oil",
    name: "Neem Oil",
    prices: { "250ml": 175, "500ml": 350, "1lt": 700, "5lts": 3500, "10lts": 7000, "15lts": 10500 },
    caption: "Nature's Shield for Skin and Hair.",
    description: "Refined Neem Oil extracted from premium quality neem seeds using traditional wood cold pressing.",
    image_url: "/products/neem.png",
    category: "Natural Extracts",
    benefits: [
      "Skin Care: Soothe irritations, acne, and rashes.",
      "Hair Care: Strengthens roots and reduces dandruff.",
      "Pest Control: Natural insect-repellent properties.",
      "Antimicrobial: Antibacterial applications.",
      "Versatile Use: External use in hair oils and lotions."
    ]
  },
  {
    id: "kuridi-oil",
    name: "Coconut Oil (Kuridi)",
    prices: { "250ml": 225, "500ml": 450, "1lt": 900, "5lts": 4500, "10lts": 9000, "15lts": 13500 },
    caption: "From Fresh Coconuts to Your Glow",
    description: "Pure, unrefined coconut oil, traditionally wood cold pressed from fresh coconuts (Kurudi). Rich in lauric acid and antioxidants.",
    image_url: "/products/kuridi.png",
    category: "Wood Pressed",
    benefits: [
      "Deeply Nourishes Skin: Moisturizes and softens.",
      "Strengthens Hair: Promotes growth and shine.",
      "Rich in Nutrients: Lauric acid and fatty acids.",
      "Supports Digestion & Immunity: Overall wellness.",
      "Natural & Chemical-Free: Traditional extraction.",
      "Soothes & Protects: Calm skin irritations.",
      "Versatile Use: Cooking and skincare."
    ]
  },
  {
    id: "flax-seeds-oil",
    name: "Flax Seed Oil",
    prices: { "500ml": 0, "1lt": 0, "5lts": 0, "10lts": 0, "15lts": 0 },
    caption: "Nature's Omega Boost in Every Drop",
    description: "Flax seed oil extracted from premium flax seeds using traditional wood cold pressing. Retains all nutrients including omega-3.",
    image_url: "/products/flax.png",
    category: "Wellness",
    benefits: [
      "Heart Health: Rich in Omega-3 fatty acids.",
      "Digestive Support: Maintain gut health.",
      "Skin & Hair Care: Nourishes and reduces dryness.",
      "Antioxidant Properties: Combat free radicals.",
      "Versatile Usage: Daily consumption and topical use."
    ]
  },
  {
    id: "castor-oil",
    name: "Castor Oil",
    prices: { "250ml": 105, "500ml": 210, "1lt": 420, "5lts": 2100, "10lts": 4200, "15lts": 6300 },
    caption: "Nature's Elixir for Hair and Skin",
    description: "Premium-quality castor seeds are used to produce pure wood cold-pressed castor oil. Thick texture and high nutritional value.",
    image_url: "/products/castor.png",
    category: "Natural Extracts",
    benefits: [
      "Promotes Hair Growth: Nourish the scalp.",
      "Deeply Moisturizes Skin: Natural moisturizer.",
      "Strengthens Hair: Improve thickness.",
      "Supports Natural Cleansing: Detoxifying properties.",
      "Rich in Natural Nutrients: Essential fatty acids."
    ]
  },
];

import { jsPDF } from 'jspdf';

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
  const [revenueDate, setRevenueDate] = useState(new Date().toISOString().split('T')[0]);
  const [managingTrackingOrder, setManagingTrackingOrder] = useState(null);
  const [trackingUpdateData, setTrackingUpdateData] = useState({ status: '', tracking_id: '', tracking_link: '' });

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
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setOrders(data);
    } else {
      console.error("Fetch orders error:", error?.message);
      if (error?.code === '42P01') {
        alert("CRITICAL: The 'orders' table was not found in Supabase. Please check your SQL Editor and run the table creation script I provided.");
      } else if (error) {
        alert("Error fetching orders: " + error.message);
      }
    }
    setLoading(false);
  };

  const generateOrderPDF = (orderData) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(5, 91, 65);
    doc.text('SHREE AVIGHNA INVOICE', 105, 20, { align: 'center' });
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text('Premium Wood Cold Pressed Oils', 105, 27, { align: 'center' });
    
    doc.line(20, 35, 190, 35);
    
    // Summary
    doc.setFontSize(12);
    doc.setTextColor(0);
    doc.text(`Order ID: ${orderData.order_id}`, 20, 50);
    doc.text(`Date: ${new Date(orderData.created_at).toLocaleDateString()}`, 20, 57);
    doc.text(`Payment ID: ${orderData.payment_id}`, 20, 64);
    
    doc.text('Customer Details:', 120, 50);
    doc.setFontSize(10);
    doc.text(`Name: ${orderData.full_name}`, 120, 57);
    doc.text(`Phone: ${orderData.phone}`, 120, 64);
    doc.text(`Email: ${orderData.email}`, 120, 71);
    doc.text(`Address: ${orderData.address}`, 120, 78, { maxWidth: 70 });
    doc.text(`City: ${orderData.city}`, 120, 92);
    
    // Items
    doc.setFillColor(245, 245, 245);
    doc.rect(20, 110, 170, 10, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text('Product', 25, 117);
    doc.text('Size', 100, 117);
    doc.text('Qty', 140, 117);
    doc.text('Subtotal', 170, 117);
    
    let y = 130;
    doc.setFont('helvetica', 'normal');
    if (orderData.items && Array.isArray(orderData.items)) {
      orderData.items.forEach(item => {
        doc.text(item.name || 'Product', 25, y);
        doc.text(item.selectedSize || '-', 100, y);
        doc.text((item.quantity || 1).toString(), 140, y);
        doc.text(`Rs. ${item.price * item.quantity}`, 170, y);
        y += 10;
      });
    }
    
    doc.line(20, y, 190, y);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`Total Paid: Rs. ${orderData.total_amount}`, 190, y + 15, { align: 'right' });
    
    doc.save(`invoice-${orderData.order_id}.pdf`);
  };

  const handleUpdateTracking = async (orderId) => {
    setLoading(true);
    const { error } = await supabase
      .from('orders')
      .update({ 
        status: trackingUpdateData.status, 
        tracking_id: trackingUpdateData.tracking_id,
        tracking_link: trackingUpdateData.tracking_link 
      })
      .eq('id', orderId);

    if (error) {
      alert('Error updating tracking: ' + error.message);
    } else {
      setOrders(orders.map(o => o.id === orderId ? { ...o, ...trackingUpdateData } : o));
      setManagingTrackingOrder(null);
      alert('Tracking updated successfully!');
    }
    setLoading(false);
  };

  // Form State for Adding/Editing
  const [formData, setFormData] = useState({
    name: '',
    category: 'Wood Pressed',
    price_1lt: '',
    price_250grms: '',
    price_500grms: '',
    price_1000grms: '',
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
      price_10lts: '',
      price_15lts: '',
      price_250grms: '',
      price_500grms: '',
      price_1000grms: '',
      inStock: true, 
      description: '', 
      caption: '',
      benefits: '',
      image: '', 
      imageFile: null, 
      imagePreview: null,
      useLiquidPricing: true,
      useSolidPricing: false
    });
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    const hasLiquid = Object.keys(product.prices || {}).some(k => k.includes('ml') || k.includes('lt'));
    const hasSolid = Object.keys(product.prices || {}).some(k => k.includes('grms'));

    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price_250ml: product.prices?.["250ml"] || '',
      price_500ml: product.prices?.["500ml"] || '',
      price_1lt: product.prices?.["1lt"] || '',
      price_5lts: product.prices?.["5lts"] || '',
      price_10lts: product.prices?.["10lts"] || '',
      price_15lts: product.prices?.["15lts"] || '',
      price_250grms: product.prices?.["250grms"] || '',
      price_500grms: product.prices?.["500grms"] || '',
      price_1000grms: product.prices?.["1000grms"] || '',
      inStock: product.in_stock !== false,
      description: product.description || '',
      caption: product.caption || '',
      benefits: Array.isArray(product.benefits) ? product.benefits.join('\n') : '',
      image: product.image_url || '',
      imageFile: null,
      imagePreview: product.image_url || null,
      useLiquidPricing: hasLiquid || (!hasLiquid && !hasSolid), 
      useSolidPricing: hasSolid
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
      prices: Object.fromEntries(
        Object.entries({
          "250ml": formData.useLiquidPricing ? (Number(formData.price_250ml) || 0) : 0,
          "500ml": formData.useLiquidPricing ? (Number(formData.price_500ml) || 0) : 0,
          "1lt": formData.useLiquidPricing ? (Number(formData.price_1lt) || 0) : 0,
          "5lts": formData.useLiquidPricing ? (Number(formData.price_5lts) || 0) : 0,
          "10lts": formData.useLiquidPricing ? (Number(formData.price_10lts) || 0) : 0,
          "15lts": formData.useLiquidPricing ? (Number(formData.price_15lts) || 0) : 0,
          "250grms": formData.useSolidPricing ? (Number(formData.price_250grms) || 0) : 0,
          "500grms": formData.useSolidPricing ? (Number(formData.price_500grms) || 0) : 0,
          "1000grms": formData.useSolidPricing ? (Number(formData.price_1000grms) || 0) : 0
        }).filter(([_, v]) => v > 0)
      ),
      in_stock: formData.inStock !== false,
      description: formData.description,
      caption: formData.caption,
      benefits: formData.benefits.split('\n').filter(b => b.trim() !== ''),
      image_url: imageUrl
    };

    const isRealDBProduct = editingProduct && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(editingProduct.id);

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


  // Calculate Today's Revenue using LOCAL date (IST timezone)
  const todayLocal = new Date().toLocaleDateString('en-CA'); // 'en-CA' gives YYYY-MM-DD in local time
  const dailyRevenue = orders
    .filter(o => {
      if (!o.created_at || !o.payment_id) return false;
      const orderLocalDate = new Date(o.created_at).toLocaleDateString('en-CA');
      return orderLocalDate === todayLocal;
    })
    .reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0);

  // Calculate Custom Date Revenue
  const customDateRevenue = orders
    .filter(o => {
      if (!o.created_at || !o.payment_id || !revenueDate) return false;
      const orderLocalDate = new Date(o.created_at).toLocaleDateString('en-CA');
      return orderLocalDate === revenueDate;
    })
    .reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0);

  // Total Revenue (all time)
  const totalRevenue = orders
    .filter(o => o.payment_id)
    .reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0);

  const stats = {
    totalProducts: products.length,
    pendingOrders: orders.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length,
    completedOrders: orders.filter(o => o.status === 'Delivered').length,
    dailyRevenue: dailyRevenue,
    totalRevenue: totalRevenue,
    customDateRevenue: customDateRevenue
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
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {[
                { label: 'Total Products', val: stats.totalProducts, icon: ArchiveBoxIcon, color: 'bg-blue-50 text-blue-600' },
                { label: 'Pending Orders', val: stats.pendingOrders, icon: ChartBarIcon, color: 'bg-amber-50 text-amber-600' },
                { label: 'Completed Orders', val: stats.completedOrders, icon: ShoppingBagIcon, color: 'bg-indigo-50 text-indigo-600' },
                { label: "Today's Revenue", val: `₹${stats.dailyRevenue.toLocaleString('en-IN')}`, icon: CurrencyRupeeIcon, color: 'bg-green-50 text-green-600' },
                { label: 'Total Revenue', val: `₹${stats.totalRevenue.toLocaleString('en-IN')}`, icon: CurrencyRupeeIcon, color: 'bg-emerald-50 text-emerald-700' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-stone-100 shadow-sm flex flex-col items-center text-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black tracking-widest text-stone-400 mb-1">{stat.label}</p>
                    <p className="text-2xl font-black text-stone-900">{stat.val}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Custom Date Revenue Checker */}
            <div className="bg-stone-900 rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center">
                  <CalendarIcon className="w-10 h-10 text-primary" />
                </div>
                <div>
                   <p className="text-[10px] uppercase font-black tracking-widest text-stone-400 mb-1">Check Revenue By Date</p>
                   <h3 className="text-4xl font-black text-white tracking-tighter">₹{stats.customDateRevenue}</h3>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 w-full md:w-auto">
                <label className="text-[10px] uppercase font-black tracking-widest text-stone-400 ml-1">Select Custom Date</label>
                <div className="flex bg-white/5 border border-white/10 rounded-2xl p-2 pr-4 items-center gap-4">
                  <input 
                    type="date" 
                    value={revenueDate}
                    onChange={(e) => setRevenueDate(e.target.value)}
                    className="bg-transparent text-white font-bold outline-none px-4 py-2 cursor-pointer [color-scheme:dark]"
                  />
                  <div className="w-px h-8 bg-white/10" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary">Sales Report</p>
                </div>
              </div>
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
                    <th className="px-8 py-6">Customer</th>
                    <th className="px-8 py-6">Status</th>
                    <th className="px-8 py-6 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {orders.length > 0 ? orders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="hover:bg-stone-50/50 transition-colors">
                      <td className="px-8 py-6 font-black text-stone-900 text-xs">{order.order_id || order.id.slice(0,8)}</td>
                      <td className="px-8 py-6">
                        <p className="font-bold text-stone-900 text-sm">{order.full_name}</p>
                        <p className="text-[10px] text-stone-400">{order.phone}</p>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${['Delivered', 'Shipped'].includes(order.status) ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                           {order.status || (order.payment_id ? 'Processing' : 'Pending')}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right font-black text-secondary">₹{order.total_amount || order.total}</td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="4" className="px-8 py-10 text-center text-stone-400 italic">No recent orders found.</td>
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
                        <span className="text-secondary font-black text-sm">₹{p.prices?.["1lt"] || p.prices?.["1000grms"] || 0}</span>
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
        ) : activeTab === 'orders' ? (
          <div className="bg-white rounded-[2.5rem] border border-stone-100 shadow-sm overflow-hidden mt-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 text-stone-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-stone-100">
                  <th className="px-8 py-6">Order Info</th>
                  <th className="px-8 py-6">Customer & Address</th>
                  <th className="px-8 py-6">Items</th>
                  <th className="px-8 py-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-stone-50/50 transition-colors">
                    <td className="px-8 py-6">
                      <p className="font-black text-stone-900 text-xs mb-1 uppercase tracking-tighter">{order.order_id || order.id.slice(0,10)}</p>
                      <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">{new Date(order.created_at).toLocaleDateString()}</p>
                      <span className={`inline-block mt-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${['Delivered', 'Shipped'].includes(order.status) ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                        {order.status || (order.payment_id ? 'Paid (Processing)' : 'Pending')}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-black text-stone-900 mb-1">{order.full_name}</p>
                      <p className="text-xs text-stone-500 mb-2">{order.email} | {order.phone}</p>
                      <p className="text-[10px] text-stone-400 max-w-[200px] leading-relaxed uppercase font-bold tracking-tight">{order.address}, {order.city}</p>
                      {order.location_link && (
                        <a href={order.location_link} target="_blank" rel="noopener noreferrer" className="text-[10px] text-secondary font-black underline mt-1 block uppercase">View Location Map</a>
                      )}
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        {order.items && Array.isArray(order.items) ? order.items.map((item, i) => (
                          <p key={i} className="text-xs font-medium text-stone-700">
                            <span className="font-bold">{item.quantity}x</span> {item.name} ({item.selectedSize})
                          </p>
                        )) : <p className="text-xs text-stone-400 italic">No items data</p>}
                      </div>
                      <p className="mt-3 font-black text-secondary">₹{order.total_amount}</p>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex flex-col gap-2 items-end">
                        <button 
                          onClick={() => generateOrderPDF(order)}
                          className="p-3 bg-stone-100 rounded-xl text-stone-600 hover:bg-stone-200 transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest w-fit"
                        >
                          <DocumentTextIcon className="w-4 h-4" /> PDF Invoice
                        </button>
                        
                        {managingTrackingOrder === order.id ? (
                          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-3 mt-2 animate-fade-in text-left">
                            <div>
                               <label className="block text-[9px] font-black uppercase tracking-widest text-stone-400 mb-1">Update Status</label>
                               <select 
                                 value={trackingUpdateData.status} 
                                 onChange={(e) => setTrackingUpdateData({...trackingUpdateData, status: e.target.value})}
                                 className="w-full text-xs font-bold p-2 rounded-lg border border-stone-200 outline-none"
                               >
                                 <option value="Processing">Processing</option>
                                 <option value="Shipped">Shipped</option>
                                 <option value="Delivered">Delivered</option>
                                 <option value="Cancelled">Cancelled</option>
                               </select>
                            </div>
                            <div>
                               <label className="block text-[9px] font-black uppercase tracking-widest text-stone-400 mb-1">DTDC Tracking ID</label>
                               <input 
                                 type="text" 
                                 value={trackingUpdateData.tracking_id} 
                                 onChange={(e) => setTrackingUpdateData({...trackingUpdateData, tracking_id: e.target.value})}
                                 placeholder="e.g. D12345678"
                                 className="w-full text-xs font-bold p-2 rounded-lg border border-stone-200 outline-none"
                               />
                            </div>
                            <div>
                               <label className="block text-[9px] font-black uppercase tracking-widest text-stone-400 mb-1 mt-2">DTDC Tracking Link (Optional)</label>
                               <input 
                                 type="url" 
                                 value={trackingUpdateData.tracking_link || ''} 
                                 onChange={(e) => setTrackingUpdateData({...trackingUpdateData, tracking_link: e.target.value})}
                                 placeholder="https://tdtc.in/tracking/..."
                                 className="w-full text-xs font-bold p-2 rounded-lg border border-stone-200 outline-none"
                               />
                            </div>
                            <div className="flex gap-2">
                               <button onClick={() => setManagingTrackingOrder(null)} className="flex-grow py-2 bg-white border border-stone-200 rounded-lg text-[9px] font-black uppercase">Cancel</button>
                               <button onClick={() => handleUpdateTracking(order.id)} className="flex-[2] py-2 bg-secondary text-white rounded-lg text-[9px] font-black uppercase">Save</button>
                            </div>
                          </div>
                        ) : (
                          <button 
                            onClick={() => {
                              setManagingTrackingOrder(order.id);
                              setTrackingUpdateData({ status: order.status || 'Processing', tracking_id: order.tracking_id || '', tracking_link: order.tracking_link || '' });
                            }}
                            className="p-3 bg-secondary/10 rounded-xl text-secondary hover:bg-secondary/20 transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest w-fit"
                          >
                            <TruckIcon className="w-4 h-4" /> Manage Tracking
                          </button>
                        )}
                        
                        {order.tracking_id && (
                          <p className="text-[10px] font-bold text-stone-400 mt-1 italic uppercase">Tracking: {order.tracking_id}</p>
                        )}
                      </div>
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

                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                   <h4 className="text-xs font-bold text-stone-900 uppercase tracking-widest pt-2">⚙️ Liquid Pricing (ML/LT)</h4>
                   <label className="flex items-center gap-2 cursor-pointer group">
                      <span className="text-[10px] font-black uppercase text-stone-400 group-hover:text-stone-600">Enable Liquid</span>
                      <input 
                        type="checkbox" 
                        checked={formData.useLiquidPricing} 
                        onChange={(e) => setFormData({...formData, useLiquidPricing: e.target.checked})}
                        className="w-5 h-5 accent-secondary rounded"
                      />
                   </label>
                </div>
                
                <div className={`grid grid-cols-4 gap-4 transition-all ${!formData.useLiquidPricing ? 'opacity-30 pointer-events-none grayscale' : ''}`}>
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
                        if (val) {
                          setFormData({
                            ...formData, 
                            price_1lt: val,
                            price_250ml: Math.round(num * 0.25).toString(),
                            price_500ml: Math.round(num * 0.5).toString(),
                            price_5lts: Math.round(num * 5).toString(),
                            price_10lts: Math.round(num * 10).toString(),
                            price_15lts: Math.round(num * 15).toString()
                          });
                        } else {
                          setFormData({ ...formData, price_1lt: val });
                        }
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-black text-stone-400 mb-2">10LTS (₹)</label>
                    <input type="number" value={formData.price_10lts} onChange={(e) => setFormData({...formData, price_10lts: e.target.value})} className="w-full px-4 py-4 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-secondary font-bold text-sm" placeholder="3600" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-black text-stone-400 mb-2">15LTS (₹)</label>
                    <input type="number" value={formData.price_15lts} onChange={(e) => setFormData({...formData, price_15lts: e.target.value})} className="w-full px-4 py-4 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-secondary font-bold text-sm" placeholder="5400" />
                  </div>
                </div>

                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                   <h4 className="text-xs font-bold text-stone-900 uppercase tracking-widest pt-2">📦 Solid Pricing (Grams)</h4>
                   <label className="flex items-center gap-2 cursor-pointer group">
                      <span className="text-[10px] font-black uppercase text-stone-400 group-hover:text-stone-600">Enable Solid</span>
                      <input 
                        type="checkbox" 
                        checked={formData.useSolidPricing} 
                        onChange={(e) => setFormData({...formData, useSolidPricing: e.target.checked})}
                        className="w-5 h-5 accent-secondary rounded"
                      />
                   </label>
                </div>

                <div className={`grid grid-cols-3 gap-4 transition-all ${!formData.useSolidPricing ? 'opacity-30 pointer-events-none grayscale' : ''}`}>
                  <div>
                    <label className="block text-[10px] uppercase font-black text-stone-400 mb-2">250GRMS (₹)</label>
                    <input type="number" value={formData.price_250grms} onChange={(e) => setFormData({...formData, price_250grms: e.target.value})} className="w-full px-4 py-4 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-secondary font-bold text-sm" placeholder="150" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-black text-stone-400 mb-2">500GRMS (₹)</label>
                    <input type="number" value={formData.price_500grms} onChange={(e) => setFormData({...formData, price_500grms: e.target.value})} className="w-full px-4 py-4 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-secondary font-bold text-sm" placeholder="280" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-black text-stone-400 mb-2">1000GRMS (₹)</label>
                    <input 
                      type="number" 
                      value={formData.price_1000grms} 
                      onChange={(e) => {
                        const val = e.target.value;
                        const num = Number(val);
                        if (val) {
                          setFormData({
                            ...formData, 
                            price_1000grms: val,
                            price_250grms: Math.round(num * 0.25).toString(),
                            price_500grms: Math.round(num * 0.5).toString()
                          });
                        } else {
                          setFormData({ ...formData, price_1000grms: val });
                        }
                      }} 
                      className="w-full px-4 py-4 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-secondary font-bold text-sm" 
                      placeholder="500" 
                    />
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
