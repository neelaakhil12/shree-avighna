"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, ShieldCheckIcon, LockClosedIcon, EyeIcon } from '@heroicons/react/24/outline';

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

export default function PrivacyPage() {
  const points = [
    { title: "Data Collection", desc: "We collect only essential details like your name, email, and shipping address to fulfill your orders efficiently." },
    { title: "Secure Payments", desc: "All transactions are handled through trusted third-party gateways like Razorpay. We never see or store your card details." },
    { title: "Financial Privacy", desc: "No sensitive financial information or credit card numbers are ever stored on our servers." },
    { title: "Service Communication", desc: "Your contact details are used solely for order status updates and essential service-related messages." },
    { title: "Marketing Preferences", desc: "You will only receive promotional updates if you explicitly opt-in to our newsletter." },
    { title: "Data Protection", desc: "We maintain absolute non-disclosure. Your personal data is never shared with third-party marketing companies." },
    { title: "Encryption Standards", desc: "We implement industry-standard SSL encryption to ensure your data remains secure during transmission." },
    { title: "Cookie Usage", desc: "We use cookies only to enhance website performance, remember your preferences, and improve your shopping experience." },
    { title: "User Rights", desc: "You have the full right to request access to, correction of, or deletion of your personal data at any time." },
    { title: "Policy Updates", desc: "This policy is reviewed periodically to ensure it meets the latest security and legal standards." }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-stone-100 py-6 md:py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors mb-8 font-medium">
            <ArrowLeftIcon className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-stone-900 mb-4 uppercase tracking-tight">Privacy Policy</h1>
          <p className="text-stone-500 text-lg">Our commitment to your security in 10 clear points.</p>
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
          <h3 className="text-3xl font-bold mb-4">Have Questions?</h3>
          <p className="text-stone-400 mb-10 max-w-md mx-auto">If you need more details about our privacy practices, our support team is happy to help.</p>
          <Link href="/contact" className="btn-primary py-4 px-12 text-lg">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
