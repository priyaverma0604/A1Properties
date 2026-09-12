'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Building2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import LanguageToggle from '@/components/ui/LanguageToggle';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { t, language } = useLanguage();

  const navItems = [
    { name: t('nav_home'), href: '/' },
    { name: t('nav_properties'), href: '/properties' },
    { name: t('nav_sell'), href: '/sell' },
    { name: t('nav_blogs'), href: '/blogs' },
    { name: t('nav_about'), href: '/about' },
    { name: t('nav_contact'), href: '/contact' },
  ];

  // Handle transparent to solid transition on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass shadow-md py-3 bg-white/95 backdrop-blur-md'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Branding */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-br from-primary-700 to-primary-900 text-white p-2 rounded-lg shadow-md group-hover:scale-105 transition-transform duration-200">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-dark-900 group-hover:text-primary-700 transition-colors">
                A1<span className="text-secondary-600 font-extrabold">Properties</span>
              </span>
              <span className="block text-[10px] tracking-widest text-primary-800 uppercase font-semibold -mt-1">
                {t('consultant')}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-primary-700 bg-primary-50/50 font-bold'
                    : 'text-dark-800 hover:text-primary-700 hover:bg-slate-100/50'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary-600 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Action Area: Language Toggle & Contact CTA */}
          <div className="hidden md:flex items-center space-x-3">
            <LanguageToggle />
            <a
              href="tel:+919756535933"
              className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-primary-700 to-primary-800 hover:from-primary-800 hover:to-primary-950 text-white px-4.5 py-2.5 rounded-xl text-xs font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              <Phone className="h-4 w-4" />
              <span>{t('call_now')}</span>
            </a>
          </div>

          {/* Mobile Menu Trigger & Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageToggle className="scale-90" />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-dark-800 hover:bg-slate-100 focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6 text-primary-700" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Drawer */}
      <div
        className={`md:hidden fixed inset-0 top-[62px] z-40 bg-white border-t border-slate-100 transition-all duration-300 ${
          isOpen
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        <div className="px-4 py-6 space-y-3 h-full overflow-y-auto bg-slate-50/50">
          <div className="pb-3 border-b border-slate-200 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase">
              {language === 'hi' ? 'भाषा चुनें' : 'Choose Language'}
            </span>
            <LanguageToggle />
          </div>

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-4 px-4 py-3 rounded-xl text-base font-bold transition-all ${
                isActive(item.href)
                  ? 'text-primary-700 bg-primary-50'
                  : 'text-dark-800 hover:bg-slate-50'
              }`}
            >
              <span>{item.name}</span>
            </Link>
          ))}
          
          <div className="pt-6 border-t border-slate-100">
            <a
              href="tel:+919756535933"
              className="flex items-center justify-center space-x-3 w-full bg-gradient-to-r from-primary-700 to-primary-800 text-white py-3.5 rounded-xl text-base font-bold shadow-md"
            >
              <Phone className="h-5 w-5" />
              <span>{language === 'hi' ? 'कॉल करें: +91 97565 35933' : 'Call +91 97565 35933'}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
