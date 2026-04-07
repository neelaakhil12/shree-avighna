"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { EnvelopeIcon, ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function LoginPage() {
  const { sendOtp, verifyOtp, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Email, 2: OTP
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await sendOtp(email);
      if (res?.error) {
        setError(res.error);
      } else {
        setStep(2); // Move to OTP step
      }
    } catch (err) {
      setError("Failed to send OTP. Please check your SMTP settings.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await verifyOtp(email, otp);
      if (res?.error) {
        setError(res.error);
      } else {
        // Successful login! Redirect logic is handled by NextAuth or AuthGuard
        window.location.href = '/';
      }
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    console.log("Starting Google Login...");
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err) {
      console.error("Google Login Error:", err);
      setError("Failed to initialize Google login.");
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-stone-100 animate-fade-in">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-8">
            <Image
              src="/splash-logo.png"
              alt="Shree Avighna"
              width={180}
              height={90}
              className="h-20 w-auto mx-auto object-contain"
            />
          </Link>
          <h1 className="text-3xl font-black text-stone-900 mb-2">
            {step === 1 ? "Welcome Back" : "Verify OTP"}
          </h1>
          <p className="text-stone-500">
            {step === 1 
              ? "Sign in to track your orders and checkout faster." 
              : `Enter the 6-digit code sent to ${email}`
            }
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-xl">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {step === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                <div className="relative">
                  <EnvelopeIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" />
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-5 py-4 rounded-2xl border border-stone-200 focus:outline-none focus:ring-4 focus:ring-secondary/10 focus:border-secondary transition-all bg-stone-50 text-stone-900 font-medium placeholder:text-stone-300"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full btn-secondary py-4 text-lg shadow-lg flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? (
                  <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>Send 6-Digit OTP <ArrowRightIcon className="w-5 h-5" /></>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-2 ml-1">Enter Code</label>
                <input 
                  type="text" 
                  maxLength={6}
                  required 
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full text-center text-4xl font-black tracking-[1rem] py-4 rounded-2xl border border-stone-200 focus:outline-none focus:ring-4 focus:ring-secondary/10 focus:border-secondary transition-all bg-stone-50 text-stone-900 placeholder:text-stone-100"
                  placeholder="000000"
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full btn-secondary py-4 text-lg shadow-lg flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? (
                  <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>Verify & Sign In <ArrowRightIcon className="w-5 h-5" /></>
                )}
              </button>
              <div className="text-center">
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-bold text-stone-400 hover:text-primary uppercase tracking-widest transition-colors"
                >
                  Change Email Address
                </button>
              </div>
            </form>
          )}

          {step === 1 && (
            <>
              <div className="relative py-4 flex items-center justify-center">
                <div className="absolute left-0 right-0 h-[1px] bg-stone-100"></div>
                <span className="relative px-4 bg-white text-stone-400 text-xs font-bold uppercase tracking-widest">OR</span>
              </div>

              <button 
                onClick={handleGoogleLogin}
                className="w-full py-4 px-6 border-2 border-stone-100 rounded-2xl flex items-center justify-center gap-3 font-bold text-stone-700 hover:bg-stone-50 transition-all active:scale-[0.98]"
              >
                <svg className="w-6 h-6" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
                Continue with Google
              </button>
            </>
          )}
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="text-stone-400 text-sm hover:text-stone-900 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
