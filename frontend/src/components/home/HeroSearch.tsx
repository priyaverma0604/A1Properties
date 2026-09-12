'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Building, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const HeroSearch: React.FC = () => {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [search, setSearch] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [type, setType] = useState('buy'); // buy or rent

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (propertyType) params.append('propertyType', propertyType);
    if (type) params.append('type', type);
    
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl md:rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden animate-slide-up">
      {/* Type Toggle Tabs */}
      <div className="flex border-b border-slate-100">
        <button
          type="button"
          onClick={() => setType('buy')}
          className={`flex-1 py-4 text-center font-bold text-sm tracking-wide uppercase transition-colors ${
            type === 'buy'
              ? 'text-primary-700 bg-primary-50/20 border-b-2 border-primary-600'
              : 'text-slate-500 hover:text-dark-800'
          }`}
        >
          {t('buy_tab')}
        </button>
        <button
          type="button"
          onClick={() => setType('rent')}
          className={`flex-1 py-4 text-center font-bold text-sm tracking-wide uppercase transition-colors ${
            type === 'rent'
              ? 'text-primary-700 bg-primary-50/20 border-b-2 border-primary-600'
              : 'text-slate-500 hover:text-dark-800'
          }`}
        >
          {t('rent_tab')}
        </button>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSearch} className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Locality Search Input */}
        <div className="md:col-span-5 relative">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            {t('locality_landmark')}
          </label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder={t('search_placeholder')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:bg-white transition-all text-slate-800"
            />
          </div>
        </div>

        {/* Property Type Dropdown */}
        <div className="md:col-span-4 relative">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            {t('property_type_label')}
          </label>
          <div className="relative">
            <Building className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:bg-white transition-all text-slate-700 appearance-none cursor-pointer"
            >
              <option value="">{t('all_types')}</option>
              <option value="flat">{t('flat_type')}</option>
              <option value="house">{t('house_type')}</option>
              <option value="plot">{t('plot_type')}</option>
              <option value="commercial">{t('commercial_type')}</option>
            </select>
          </div>
        </div>

        {/* Search Submit Button */}
        <div className="md:col-span-3 pt-4 md:pt-6">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary-700 to-primary-850 hover:from-primary-800 hover:to-primary-950 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
          >
            <Search className="h-4 w-4" />
            <span>{t('search_btn')}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeroSearch;
