"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, DocumentTextIcon, ScaleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const Section = ({ title, icon: Icon, children }) => (
  <div className="mb-8 md:mb-12">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 bg-stone-100 rounded-xl flex items-center justify-center text-secondary">
        <Icon className="w-6 h-6" />
      </div>
      <h2 className="text-2xl font-bold text-stone-900">{title}</h2>
    </div>
    <div className="text-stone-600 leading-relaxed space-y-4 pl-13">
      {children}
    </div>
  </div>
);

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-stone-50 border-b border-stone-100 py-10 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors mb-8 font-medium">
            <ArrowLeftIcon className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-stone-900 mb-4 uppercase tracking-tight">Terms of Service</h1>
          <p className="text-stone-500 text-lg">By using Shree Avigna, you agree to these conditions.</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-20">
        <Section title="Acceptance of Terms" icon={ScaleIcon}>
          <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. Our products are 100% natural, and their shelf life is dependent on proper storage as indicated on the labels.</p>
        </Section>

        <Section title="Product Accuracy" icon={DocumentTextIcon}>
          <p>We strive to provide accurate descriptions and images of our natural oils. However, as our oils are wood cold-pressed and minimally processed, slight variations in color and aroma between batches are normal and a sign of purity.</p>
        </Section>

        <Section title="Limitation of Liability" icon={ExclamationTriangleIcon}>
          <p>Shree Avigna shall not be liable for any damages that result from the use of, or the inability to use, our products or the services provided on this website.</p>
        </Section>

        <div className="border-t border-stone-100 pt-8 md:pt-12 flex items-center justify-between">
          <div>
            <p className="text-sm text-stone-400">© 2024 Shree Avigna Natural Oils</p>
          </div>
          <Link href="/products" className="text-secondary font-bold hover:underline">
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
}
