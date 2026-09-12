'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import PropertyCard, { PropertyData } from './PropertyCard';
import { api } from '../../utils/api';
import { Filter, SlidersHorizontal, Search, RotateCcw, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { mockProperties } from '@/utils/mockData';

interface PaginationInfo {
  page: number;
  limit: number;
  totalPages: number;
  totalProperties: number;
}

interface FetchResponse {
  properties: PropertyData[];
  pagination: PaginationInfo;
}

const PropertiesContainer: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, language } = useLanguage();

  // Load initial states from URL query parameters
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 9,
    totalPages: 1,
    totalProperties: 0,
  });
  const [loading, setLoading] = useState(true);

  // Form Filter States
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [type, setType] = useState(searchParams.get('type') || ''); // buy or rent
  const [propertyType, setPropertyType] = useState(searchParams.get('propertyType') || '');
  const [locality, setLocality] = useState(searchParams.get('locality') || '');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');
  const [sort, setSort] = useState(searchParams.get('sort') || '');
  const [page, setPage] = useState(Number(searchParams.get('page')) || 1);

  // Fetch properties from the backend API
  const fetchProperties = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('limit', '9');
      params.append('page', page.toString());
      if (search) params.append('search', search);
      if (type) params.append('type', type);
      if (propertyType) params.append('propertyType', propertyType);
      if (locality) params.append('locality', locality);
      if (minPrice) params.append('minPrice', minPrice);
      if (maxPrice) params.append('maxPrice', maxPrice);
      if (sort) params.append('sort', sort);

      const response = await api.get<FetchResponse>(`/properties?${params.toString()}`);
      if (response && response.properties) {
        setProperties(response.properties);
        setPagination(response.pagination);
      }
    } catch (error) {
      console.warn('Failed to fetch properties, falling back to local mocks:', error);
      let filtered = [...mockProperties];
      if (search) {
        const query = search.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.title.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.locality.toLowerCase().includes(query)
        );
      }
      if (type) {
        filtered = filtered.filter((p) => {
          if (type === 'buy') return p.propertyType !== 'rent';
          if (type === 'rent') return p.propertyType === 'rent';
          return true;
        });
      }
      if (propertyType) {
        filtered = filtered.filter((p) => p.propertyType === propertyType);
      }
      if (locality) {
        filtered = filtered.filter((p) => p.locality.toLowerCase() === locality.toLowerCase());
      }
      if (minPrice) {
        filtered = filtered.filter((p) => p.price >= Number(minPrice));
      }
      if (maxPrice) {
        filtered = filtered.filter((p) => p.price <= Number(maxPrice));
      }
      if (sort === 'price_asc') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sort === 'price_desc') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (sort === 'views') {
        filtered.sort((a, b) => b.views - a.views);
      }
      setProperties(filtered);
      setPagination({
        page: 1,
        limit: 9,
        totalPages: 1,
        totalProperties: filtered.length,
      });
    } finally {
      setLoading(false);
    }
  }, [page, search, type, propertyType, locality, minPrice, maxPrice, sort]);

  // Trigger fetch when parameters or page changes
  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  // Sync URL search params
  const updateUrlParams = useCallback(() => {
    const params = new URLSearchParams();
    if (page > 1) params.append('page', page.toString());
    if (search) params.append('search', search);
    if (type) params.append('type', type);
    if (propertyType) params.append('propertyType', propertyType);
    if (locality) params.append('locality', locality);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);
    if (sort) params.append('sort', sort);

    router.push(`/properties?${params.toString()}`, { scroll: false });
  }, [page, search, type, propertyType, locality, minPrice, maxPrice, sort, router]);

  // Apply filters and reset to page 1
  const handleApplyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    updateUrlParams();
    fetchProperties();
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearch('');
    setType('');
    setPropertyType('');
    setLocality('');
    setMinPrice('');
    setMaxPrice('');
    setSort('');
    setPage(1);
    
    router.push('/properties', { scroll: false });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* 1. Sidebar Filters */}
      <aside className="lg:col-span-3 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm sticky top-[110px]">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center space-x-2 text-dark-900 font-bold">
            <SlidersHorizontal className="h-5 w-5 text-primary-700" />
            <span>{t('filters_title')}</span>
          </div>
          <button
            onClick={handleResetFilters}
            className="flex items-center space-x-1 text-slate-400 hover:text-primary-700 text-xs font-bold transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" />
            <span>{t('reset_filters')}</span>
          </button>
        </div>

        <form onSubmit={handleApplyFilters} className="space-y-5">
          {/* Keyword Search */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              {language === 'hi' ? 'कीवर्ड से खोजें' : 'Keyword Search'}
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder={language === 'hi' ? 'उदा. विला, आवास विकास...' : 'e.g. villa, avas vikas...'}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-600 focus:bg-white text-slate-800"
              />
            </div>
          </div>

          {/* Buy or Rent Tab toggles */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              {language === 'hi' ? 'लिस्टिंग प्रकार' : 'Listing Status'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: language === 'hi' ? 'सभी' : 'All', value: '' },
                { label: language === 'hi' ? 'खरीदें' : 'Buy', value: 'buy' },
                { label: language === 'hi' ? 'किराया' : 'Rent', value: 'rent' },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setType(item.value)}
                  className={`py-2 text-center text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                    type === item.value
                      ? 'bg-primary-700 border-primary-700 text-white shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-primary-700 hover:text-primary-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Property Type Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              {t('property_type_label')}
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-600 focus:bg-white text-slate-700 cursor-pointer"
            >
              <option value="">{t('all_types')}</option>
              <option value="flat">{t('flat_type')}</option>
              <option value="house">{t('house_type')}</option>
              <option value="plot">{t('plot_type')}</option>
              <option value="commercial">{t('commercial_type')}</option>
            </select>
          </div>

          {/* Locality Input */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              {t('locality_label')}
            </label>
            <select
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-600 focus:bg-white text-slate-700 cursor-pointer"
            >
              <option value="">{t('all_localities')}</option>
              <option value="avas vikas">Avas Vikas (आवास विकास)</option>
              <option value="bamrauli katara">Bamrauli Katara - Fatehabad Rd (बमरौली कटारा)</option>
              <option value="fatehabad road">Fatehabad Road (फतेहाबाद रोड)</option>
              <option value="shastripuram">Shastripuram (शास्त्रीपुरम)</option>
              <option value="kuberpur">Kuberpur - Kanpur Highway (कुबेरपुर)</option>
              <option value="dayalbagh">Dayalbagh (दयालबाग)</option>
              <option value="sanjay place">Sanjay Place (संजय प्लेस)</option>
              <option value="taj ganj">Taj Ganj (ताजगंज)</option>
              <option value="kamla nagar">Kamla Nagar (कमला नगर)</option>
              <option value="sikandra">Sikandra (सिकंदरा)</option>
            </select>
          </div>

          {/* Budget Range */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              {t('budget_label')}
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder={language === 'hi' ? 'न्यूनतम' : 'Min Price'}
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-600 focus:bg-white text-slate-800"
              />
              <input
                type="number"
                placeholder={language === 'hi' ? 'अधिकतम' : 'Max Price'}
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-600 focus:bg-white text-slate-800"
              />
            </div>
          </div>

          {/* Sort Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              {t('sort_by')}
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-600 focus:bg-white text-slate-700 cursor-pointer"
            >
              <option value="">{t('newest_first')}</option>
              <option value="price_asc">{t('price_low_high')}</option>
              <option value="price_desc">{t('price_high_low')}</option>
              <option value="views">{t('most_popular')}</option>
            </select>
          </div>

          {/* Apply Filter Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary-700 to-primary-850 hover:from-primary-800 hover:to-primary-950 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-sm transition-all cursor-pointer"
          >
            <Filter className="h-3.5 w-3.5" />
            <span>{t('apply_filters')}</span>
          </button>
        </form>
      </aside>

      {/* 2. Properties Grid */}
      <section className="lg:col-span-9 space-y-8">
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="h-10 w-10 text-primary-600 animate-spin" />
            <p className="text-slate-500 text-sm font-semibold">
              {language === 'hi' ? 'प्रॉपर्टीज लोड हो रही हैं...' : 'Loading available listings...'}
            </p>
          </div>
        ) : properties.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-2xl p-16 text-center shadow-sm space-y-4">
            <p className="text-slate-500 text-base">{t('no_properties')}</p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 bg-primary-700 hover:bg-primary-800 text-white text-xs font-bold rounded-xl shadow-sm transition-colors cursor-pointer"
            >
              {language === 'hi' ? 'सभी फ़िल्टर साफ़ करें' : 'Clear All Filters'}
            </button>
          </div>
        ) : (
          <>
            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>

            {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 pt-6">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="p-2 border border-slate-200 hover:border-primary-600 hover:text-primary-700 bg-white text-slate-600 rounded-xl disabled:opacity-50 disabled:hover:border-slate-200 disabled:hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                
                {[...Array(pagination.totalPages)].map((_, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        page === pageNum
                          ? 'bg-primary-700 border-primary-700 text-white shadow-sm'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-primary-700 hover:text-primary-700'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === pagination.totalPages}
                  className="p-2 border border-slate-200 hover:border-primary-600 hover:text-primary-700 bg-white text-slate-600 rounded-xl disabled:opacity-50 disabled:hover:border-slate-200 disabled:hover:text-slate-600 transition-colors cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default PropertiesContainer;
