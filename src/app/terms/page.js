"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, DocumentTextIcon, ScaleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const Section = ({ title, icon: Icon, children }) => (
  <div className="mb-6 md:mb-12">
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
  const points = [
    { title: "Acceptance", desc: "By using our website, you agree to comply with our terms, conditions, and all applicable laws and regulations." },
    { title: "Product Standards", desc: "Our oils are 100% natural. Variations in color and aroma are inherent because they are minimally processed." },
    { title: "Shelf Life", desc: "The quality and shelf life of our products depend on proper storage in a cool, dry place as per labels." },
    { title: "Accuracy", desc: "We strive for perfect accuracy in product descriptions and images, though slight batch variations are normal." },
    { title: "Ordering", desc: "All orders are subject to availability. We reserve the right to limit quantities or refuse service." },
    { title: "Pricing", desc: "Prices are subject to change without notice, but will be clearly stated at the time of purchase." },
    { title: "Delivery", desc: "We aim for timely delivery, but are not responsible for delays caused by third-party logistics providers." },
    { title: "Usage", desc: "Our products are intended for domestic use. Commercial resale without authorization is prohibited." },
    { title: "Liability", desc: "Shree Avigna is not liable for outcomes resulting from improper product storage or usage." },
    { title: "Disputes", desc: "Any legal disputes will be governed by the laws of the jurisdiction where our company is registered." }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-stone-100 py-6 md:py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors mb-8 font-medium">
            <ArrowLeftIcon className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-stone-900 mb-4 uppercase tracking-tight">Terms of Service</h1>
          <p className="text-stone-500 text-lg">Our service agreement in 10 clear points.</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {points.map((point, idx) => (
            <div key={idx} className="bg-stone-50 p-8 rounded-3xl border border-stone-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-secondary text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
                <h2 className="text-xl font-bold text-stone-900">{point.title}</h2>
              </div>
              <p className="text-stone-600 leading-relaxed text-sm">
                {point.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-stone-900 rounded-[3rem] p-8 md:p-16 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">Questions?</h3>
          <p className="text-stone-400 mb-10 max-w-md mx-auto">We're here to clarify any part of our service agreement for you.</p>
          <Link href="/products" className="btn-primary py-4 px-12 text-lg">
            Start Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
