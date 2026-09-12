'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Languages } from 'lucide-react';

interface LanguageToggleProps {
  variant?: 'compact' | 'full';
  className?: string;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ variant = 'compact', className = '' }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`inline-flex items-center bg-slate-100/80 p-1 rounded-xl border border-slate-200/80 shadow-xs ${className}`}>
      <div className="flex items-center space-x-1">
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
            language === 'en'
              ? 'bg-white text-primary-700 shadow-sm ring-1 ring-slate-900/5'
              : 'text-slate-500 hover:text-dark-900'
          }`}
          aria-label="Switch to English"
        >
          <span>English</span>
        </button>

        <button
          type="button"
          onClick={() => setLanguage('hi')}
          className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
            language === 'hi'
              ? 'bg-primary-700 text-white shadow-sm'
              : 'text-slate-500 hover:text-dark-900'
          }`}
          aria-label="Switch to Hindi"
        >
          <span>हिंदी</span>
        </button>
      </div>
    </div>
  );
};

export default LanguageToggle;
