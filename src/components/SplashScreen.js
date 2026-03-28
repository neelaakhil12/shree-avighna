"use client";
import React from 'react';
import { motion } from 'framer-motion';

const SplashScreen = ({ onEnter }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 1.2, ease: [0.45, 0, 0.55, 1] }}
      className="fixed inset-0 z-[100] bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 splash-bg-animate flex flex-col items-center justify-center p-4 overflow-hidden"
    >
      <div className="max-w-xl w-full text-center space-y-12" data-aos="fade-up">
        {/* Logo and Branding Area */}
        <div className="space-y-8">


          <div className="space-y-4">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold tracking-tight text-[#b91c1c]"
              style={{ fontFamily: 'var(--font-geist-sans), serif' }}
            >
              Welcome to <br />
              <span className="italic block mt-2">Shree Avighna Oils</span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="flex items-center justify-center gap-4"
            >
              <div className="h-[1px] w-8 bg-stone-800"></div>
              <p className="text-stone-800 text-sm md:text-base font-medium tracking-[0.2em] uppercase">
                Crafted by Tradition • Trusted by Families
              </p>
              <div className="h-[1px] w-8 bg-stone-800"></div>
            </motion.div>
          </div>
        </div>

        {/* Enter Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="pt-8"
        >
          <button
            onClick={onEnter}
            className="group relative inline-flex items-center justify-center px-12 py-5 font-bold text-white transition-all duration-300 bg-secondary rounded-full hover:bg-green-800 hover:shadow-[0_0_40px_rgba(21,128,61,0.3)] active:scale-95 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2 text-xl">
              Enter Website
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
