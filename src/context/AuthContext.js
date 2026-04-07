"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSession, signIn, signOut as nextAuthSignOut } from 'next-auth/react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') {
      setLoading(true);
    } else {
      setUser(session?.user ?? null);
      setLoading(false);
    }
  }, [session, status]);

  // NextAuth methods
  const sendOtp = async (email) => {
    const res = await fetch('/api/auth/otp/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    return res.json();
  };

  const verifyOtp = async (email, otp) => {
    return signIn('credentials', { 
      email, 
      otp, 
      redirect: false,
      callbackUrl: '/' 
    });
  };

  const signInWithGoogle = () => signIn('google', { callbackUrl: '/' });
  const signOut = () => nextAuthSignOut({ callbackUrl: '/' });

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      sendOtp,
      verifyOtp,
      signInWithGoogle, 
      signOut 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
