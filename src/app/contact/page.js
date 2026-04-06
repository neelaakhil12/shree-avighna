"use client";

import React, { useState } from 'react';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';

const contactInfo = [
  {
    title: "Email Us",
    value: "shreeavighnanaturals@gmail.com",
    icon: EnvelopeIcon
  },
  {
    title: "Call Us",
    value: "9885801623 & +91 63042 18374",
    icon: PhoneIcon
  },
  {
    title: "Visit Us",
    value: "9-1-364/B/38/2, Gandhi Nagar, Bapu ghat, Golconda, Hyderabad, 500008, Telangana",
    icon: MapPinIcon
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for contacting Shree Avigna! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="pb-6 md:pb-12">
      {/* Header */}
      <section className="bg-stone-50 py-6 md:py-12 border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center" data-aos="fade-up">
          <h1 className="text-4xl md:text-6xl font-bold text-stone-900 mb-4 md:mb-6">Contact Us</h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Have questions about our pure wood-pressed oils? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 md:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Details */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, idx) => (
              <div key={info.title} className="bg-white p-8 rounded-3xl border border-stone-100 shadow-sm" data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6">
                  <info.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-stone-900 mb-2 uppercase text-xs tracking-widest">{info.title}</h3>
                <p className="text-stone-700 font-medium">{info.value}</p>
              </div>
            ))}
            
            {/* Map Placeholder */}
            <div className="h-64 rounded-3xl overflow-hidden shadow-sm border border-stone-100" data-aos="fade-up" data-aos-delay="300">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15551.4870533038!2d77.60!3d12.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzEyLjAiTiA3N8KwMzYnMDAuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
                title="Google Maps"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-3xl border border-stone-100 shadow-xl" data-aos="fade-left">
            <h2 className="text-3xl font-bold text-stone-900 mb-8">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-5 py-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-stone-50" 
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-stone-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-5 py-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-stone-50" 
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-5 py-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-stone-50" 
                  placeholder="+91 98765 43210"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-stone-700 mb-2">Your Message</label>
                <textarea 
                  required
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-5 py-4 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-stone-50 resize-none" 
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="btn-primary w-full py-5 text-lg shadow-lg shadow-yellow-500/10"
              >
                Send Enquiry
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
