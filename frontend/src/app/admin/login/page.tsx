'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Building2, AlertCircle, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const { user, login, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (user && !loading) {
      router.push('/admin/dashboard');
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErr('Please enter both email and password.');
      return;
    }

    setSubmitting(true);
    setErr('');

    try {
      await login(email, password);
    } catch (error: any) {
      setErr(error.message || 'Login failed. Please verify credentials.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-3">
          <Loader2 className="h-10 w-10 text-primary-600 animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-500">Checking session status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100/60 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl border border-slate-200/50 shadow-xl animate-fade-in">
        
        {/* Branding header */}
        <div className="text-center space-y-2">
          <div className="mx-auto h-12 w-12 bg-gradient-to-br from-primary-700 to-primary-900 text-white rounded-xl flex items-center justify-center shadow-md">
            <Building2 className="h-7 w-7" />
          </div>
          <h2 className="text-2xl font-black text-dark-900 tracking-tight">Admin Console Login</h2>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Agra Properties Management</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {err && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3.5 rounded-xl text-xs flex items-center space-x-2 animate-fade-in">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{err}</span>
            </div>
          )}

          {/* Email input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Admin Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-5 w-5 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. admin@agraproperties.com"
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:bg-white text-slate-800 transition-all font-semibold"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Security Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-5 w-5 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:bg-white text-slate-800 transition-all"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-primary-700 to-primary-850 hover:from-primary-800 hover:to-primary-950 text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center space-x-2 shadow-md cursor-pointer transition-all disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4.5 w-4.5 animate-spin" />
                <span>Authenticating console...</span>
              </>
            ) : (
              <span>Verify and Login</span>
            )}
          </button>
        </form>

        <div className="pt-2 text-center">
          <Link href="/" className="text-xs text-primary-700 hover:text-primary-850 font-bold hover:underline">
            ← Return to public website
          </Link>
        </div>
      </div>
    </div>
  );
}
// We import Link from next/link for public navigation
import Link from 'next/link';
