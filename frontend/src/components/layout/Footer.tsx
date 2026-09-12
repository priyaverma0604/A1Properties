'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, Phone, Mail, MapPin, MessageSquareCode } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import LanguageToggle from '@/components/ui/LanguageToggle';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { t, language } = useLanguage();

  return (
    <footer className="bg-dark-950 text-slate-300 pt-16 pb-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="bg-primary-600 text-white p-2 rounded-lg">
                <Building2 className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                A1<span className="text-secondary-600 font-extrabold">Properties</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              {t('footer_tagline')}
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://wa.me/919756535933"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquareCode className="w-5 h-5" />
              </a>
              <LanguageToggle />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 tracking-wide">{t('quick_links')}</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-primary-400 hover:translate-x-1 inline-block transition-all">
                  {t('nav_home')}
                </Link>
              </li>
              <li>
                <Link href="/properties" className="hover:text-primary-400 hover:translate-x-1 inline-block transition-all">
                  {t('nav_properties')}
                </Link>
              </li>
              <li>
                <Link href="/sell" className="hover:text-primary-400 hover:translate-x-1 inline-block transition-all">
                  {t('nav_sell')}
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-primary-400 hover:translate-x-1 inline-block transition-all">
                  {t('nav_blogs')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary-400 hover:translate-x-1 inline-block transition-all">
                  {t('nav_about')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-400 hover:translate-x-1 inline-block transition-all">
                  {t('nav_contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 tracking-wide">{t('categories_title')}</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/properties?type=buy" className="hover:text-primary-400 hover:translate-x-1 inline-block transition-all">
                  {language === 'hi' ? 'बिक्री के लिए प्रॉपर्टीज' : 'Properties for Sale'}
                </Link>
              </li>
              <li>
                <Link href="/properties?type=rent" className="hover:text-primary-400 hover:translate-x-1 inline-block transition-all">
                  {language === 'hi' ? 'किराए के लिए प्रॉपर्टीज' : 'Properties for Rent'}
                </Link>
              </li>
              <li>
                <Link href="/properties?propertyType=plot" className="hover:text-primary-400 hover:translate-x-1 inline-block transition-all">
                  {language === 'hi' ? 'प्लॉट व भूमि' : 'Plots & Land'}
                </Link>
              </li>
              <li>
                <Link href="/properties?propertyType=house" className="hover:text-primary-400 hover:translate-x-1 inline-block transition-all">
                  {language === 'hi' ? 'मकान व डुप्लेक्स विला' : 'Houses & Luxury Villas'}
                </Link>
              </li>
              <li>
                <Link href="/properties?propertyType=commercial" className="hover:text-primary-400 hover:translate-x-1 inline-block transition-all">
                  {language === 'hi' ? 'कमर्शियल व वेयरहाउस' : 'Commercial & Warehouses'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 tracking-wide">{t('get_in_touch')}</h3>
            <ul className="space-y-3.5 text-sm text-slate-400">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary-500 shrink-0 mt-0.5" />
                <span>{t('office_address')}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-500 shrink-0" />
                <a href="tel:+919756535933" className="hover:text-white transition-colors">
                  +91 97565 35933
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-500 shrink-0" />
                <a href="mailto:a1.properties.vishalverma@gmail.com" className="hover:text-white transition-colors">
                  a1.properties.vishalverma@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© {currentYear} A1 Properties. {t('all_rights_reserved')}</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/about" className="hover:text-white transition-colors">
              {language === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}
            </Link>
            <span className="text-slate-800">|</span>
            <Link href="/admin/login" className="hover:text-white transition-colors font-medium">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
