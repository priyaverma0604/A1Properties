'use client';

import React, { useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Building2, Newspaper, Mail, LogOut, Eye, ArrowLeft, Loader2, Menu } from 'lucide-react';

const sidebarItems = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Properties', href: '/admin/dashboard/properties', icon: Building2 },
  { name: 'Blog Articles', href: '/admin/dashboard/blogs', icon: Newspaper },
  { name: 'Leads & Inquiries', href: '/admin/dashboard/leads', icon: Mail },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Route security: redirect unauthorized users to login
  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  const isActive = (href: string) => {
    if (href === '/admin/dashboard') return pathname === '/admin/dashboard';
    return pathname.startsWith(href);
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-3">
          <Loader2 className="h-10 w-10 text-primary-600 animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-500">Securing administrator panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-100/60">
      
      {/* 1. Sidebar Container */}
      <aside className="w-64 bg-dark-950 text-slate-300 hidden md:flex flex-col border-r border-slate-900 shrink-0 select-none">
        
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-900 flex items-center space-x-2">
          <div className="bg-primary-600 text-white p-2 rounded-lg">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <span className="text-base font-bold tracking-tight text-white block">
              A1 Properties
            </span>
            <span className="text-[10px] uppercase font-bold text-primary-500 tracking-wider block">
              Admin Portal
            </span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex-grow p-4 space-y-1.5 pt-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive(item.href)
                    ? 'bg-primary-750 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                }`}
              >
                <Icon className="h-4.5 w-4.5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-900 space-y-2">
          {/* Quick link to public site */}
          <Link
            href="/"
            className="flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold text-slate-500 hover:text-white transition-all hover:bg-slate-900/30"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>View Live Website</span>
          </Link>

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-xs font-bold text-red-400 hover:text-white hover:bg-red-950/30 transition-all text-left cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* 2. Main Console Content panel */}
      <div className="flex-grow flex flex-col min-w-0">
        
        {/* Header bar */}
        <header className="bg-white border-b border-slate-200/55 h-16 flex items-center justify-between px-6 shrink-0">
          
          <div className="flex items-center space-x-3">
            {/* Mobile Sidebar menu trigger (placeholder/expansion helper) */}
            <button className="md:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-600">
              <Menu className="h-5 w-5" />
            </button>
            
            <h2 className="text-sm font-bold text-dark-900 md:text-base">
              Welcome back, <span className="text-primary-700">{user.name}</span>
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md tracking-wider">
              ✦ console connected
            </span>
          </div>

        </header>

        {/* Body content */}
        <main className="flex-grow p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>

    </div>
  );
}
