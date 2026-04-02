"use client";

import React from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { PlusIcon, EyeIcon, XMarkIcon, CheckCircleIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { cart, addToCart } = useCart();
  
  const availableSizes = Object.keys(product?.prices || {});
  const [selectedSize, setSelectedSize] = React.useState(availableSizes.includes('1lt') ? '1lt' : (availableSizes[0] || ''));
  const [showDetails, setShowDetails] = React.useState(false);
  
  const cartItemId = `${product.id}-${selectedSize}`;
  const isInCart = cart.some(item => item.cartItemId === cartItemId);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const modalContent = (
    <AnimatePresence>
      {showDetails && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDetails(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white shadow-2xl flex flex-col md:flex-row overflow-hidden"
            style={{ 
              width: '95%', 
              maxWidth: '1100px', 
              maxHeight: '90vh',
              borderRadius: '8px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowDetails(false)}
              className="absolute top-4 right-4 z-50 p-2 text-stone-400 hover:text-stone-900 transition-colors bg-white/80 rounded-full"
              aria-label="Close"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            {/* Left Side: Image */}
            <div className="w-full md:w-1/2 p-6 md:p-10 flex items-center justify-center bg-stone-50">
              <div className="relative w-full aspect-square md:h-full max-h-[500px] shadow-2xl rounded-sm overflow-hidden">
                <Image
                  src={product.image || product.image_url || 'https://via.placeholder.com/600x600?text=Premium+Oil'}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Right Side: Content */}
            <div className="w-full md:w-1/2 flex flex-col p-8 md:p-12 overflow-y-auto bg-white">
              <div className="mb-8">
                <h2 className="text-3xl md:text-5xl font-black text-stone-900 uppercase tracking-tight mb-3">
                  {product.name}
                </h2>
                <div className="w-16 h-1.5 bg-primary mb-10" />
                
                {product.caption && (
                  <p className="text-stone-600 text-xl font-medium leading-relaxed italic border-l-4 border-primary pl-6 mb-8">
                    {product.caption}
                  </p>
                )}
              </div>

              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4 group">
                  <CheckCircleIcon className="w-6 h-6 text-primary shrink-0 mt-0.5 transition-transform group-hover:scale-110" />
                  <p className="text-stone-700 text-lg leading-relaxed font-medium">
                    {product.description}
                  </p>
                </div>

                {product.benefits && product.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <CheckCircleIcon className="w-6 h-6 text-primary shrink-0 mt-0.5 transition-transform group-hover:scale-110" />
                    <p className="text-stone-700 text-lg leading-relaxed font-medium">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>

              {availableSizes.length > 1 && (
                <div className="mb-8">
                  <h4 className="text-sm font-bold text-stone-500 uppercase tracking-widest mb-4">Select Size</h4>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {availableSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 md:px-6 md:py-3 rounded-xl font-bold transition-all border-2 text-sm md:text-base ${
                          selectedSize === size 
                            ? 'border-secondary bg-secondary text-white shadow-lg' 
                            : 'border-stone-100 bg-stone-50 text-stone-600 hover:border-stone-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-auto flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-stone-100">
                <div className="text-4xl font-black text-stone-900">
                  ₹{product?.prices?.[selectedSize] || '0'}
                </div>
                <button 
                  onClick={() => {
                    if (isInCart) {
                      window.location.href = '/cart';
                    } else {
                      addToCart(product, selectedSize);
                      setShowDetails(false);
                    }
                  }}
                  className="w-full sm:w-auto btn-primary py-4 px-12 text-xl shadow-xl hover:shadow-primary/20 active:scale-95 transition-all"
                >
                  {isInCart ? "View in Cart" : "Add to Cart"}
                </button>
                {isInCart && (
                  <button 
                    onClick={() => {
                        addToCart(product, selectedSize);
                        setShowDetails(false);
                    }}
                    className="w-full sm:w-auto text-stone-500 font-bold hover:text-secondary text-sm underline"
                  >
                    Add More
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div className="organic-card group flex flex-col h-full overflow-hidden">
        <div className="relative h-56 w-full overflow-hidden bg-stone-100">
          <Image
            src={product.image || product.image_url || 'https://via.placeholder.com/400x400?text=Premium+Oil'}
            alt={product.name}
            fill
            className="object-cover"
          />
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-bold text-stone-900 shadow-sm border border-stone-100 uppercase tracking-widest z-10">
            {product.category || 'Wood Pressed'}
          </div>
        </div>
        
        <div className="p-5 flex flex-col flex-grow bg-white">
          {product.caption && (
            <p className="text-secondary font-medium text-xs mb-3 italic leading-relaxed line-clamp-2 min-h-[2rem]">
              "{product.caption}"
            </p>
          )}

          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-lg text-stone-900 group-hover:text-secondary transition-colors leading-tight">
              {product.name}
            </h3>
            <span className="font-bold text-lg text-stone-900">
              ₹{product?.prices?.[selectedSize] || '0'}
            </span>
          </div>

          {availableSizes.length > 1 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSize(size);
                  }}
                  className={`px-1.5 py-1 rounded-md text-[9px] font-bold transition-all border ${
                    selectedSize === size 
                      ? 'border-secondary bg-secondary text-white' 
                      : 'border-stone-100 bg-stone-50 text-stone-500 hover:border-stone-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
          
          <div className="mt-auto flex items-center gap-2 pt-2">
            <button 
              onClick={() => setShowDetails(true)}
              className="flex-grow flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border-2 border-stone-100 text-stone-600 font-bold text-sm hover:bg-stone-50 hover:border-secondary transition-all"
            >
              <EyeIcon className="w-4 h-4" />
              View
            </button>
            <button 
              onClick={() => {
                addToCart(product, selectedSize);
              }}
              className={`${isInCart ? 'bg-accent' : 'bg-secondary'} text-white p-2.5 rounded-xl shadow-lg hover:brightness-110 transition-all hover:scale-105 active:scale-95 flex items-center justify-center relative`}
              aria-label="Add to cart"
            >
              {isInCart ? (
                <>
                  <ShoppingCartIcon className="w-5 h-5" />
                  <span className="absolute -top-2 -right-2 bg-stone-900 border-2 border-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                    {cart.find(i => i.cartItemId === `${product.id}-${selectedSize}`)?.quantity || 0}
                  </span>
                </>
              ) : (
                <PlusIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {mounted && createPortal(modalContent, document.body)}
    </>
  );
};

export default ProductCard;
