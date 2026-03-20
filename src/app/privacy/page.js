"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, ShieldCheckIcon, LockClosedIcon, EyeIcon } from '@heroicons/react/24/outline';

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

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-stone-50 border-b border-stone-100 py-10 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors mb-8 font-medium">
            <ArrowLeftIcon className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-stone-900 mb-4 uppercase tracking-tight">Privacy Policy</h1>
          <p className="text-stone-500 text-lg">Last updated: March 2024. Your privacy is our priority.</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-20">
        <Section title="Information We Collect" icon={ShieldCheckIcon}>
          <p>We collect information you provide directly to us when you make a purchase, create an account, or contact us. This includes your name, email address, shipping address, and phone number.</p>
          <p>We do not store your credit card information. All payments are processed through secure, third-party payment gateways like Razorpay or Stripe.</p>
        </Section>

        <Section title="How We Use Your Info" icon={EyeIcon}>
          <p>Your information is used solely to process orders, improve our service, and communicate with you about your purchases. We may also use your contact details to send you occasional updates about our natural oils, but only if you've opted in.</p>
        </Section>

        <Section title="Security & Protection" icon={LockClosedIcon}>
          <p>We implement a variety of security measures to maintain the safety of your personal information. Your data is stored on secure servers and is never shared with third parties for marketing purposes.</p>
        </Section>

        <div className="bg-stone-900 rounded-3xl p-8 md:p-10 text-white text-center mt-12 md:mt-20">
          <h3 className="text-2xl font-bold mb-4">Questions about your privacy?</h3>
          <p className="text-stone-400 mb-8 max-w-md mx-auto">Our team is here to help you understand how we protect your data at Shree Avigna.</p>
          <Link href="/contact" className="btn-primary py-4 px-10">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
