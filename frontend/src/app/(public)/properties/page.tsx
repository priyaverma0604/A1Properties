import React, { Suspense } from 'react';
import PropertiesContainer from '@/components/property/PropertiesContainer';
import { Loader2 } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Properties for Sale & Rent in Agra | Residential & Commercial Listings',
  description: 'Search verify listing of homes, flats, independent villas, commercial spaces and land plots for sale in Agra. Filter by locality, budget and sizes.',
};

export default function PropertiesPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="space-y-2">
          <span className="text-xs font-black tracking-widest text-primary-700 uppercase">Brokerage Showcase</span>
          <h1 className="text-3xl font-extrabold text-dark-900 md:text-4xl">Available Properties in Agra</h1>
          <p className="text-slate-500 text-sm max-w-xl">
            Explore our curated list of active properties. Each listing is verified, has clear titles, and circle rate maps available on request.
          </p>
        </div>

        {/* Filters and Grid Container wrapped in Suspense for Next.js App Router query reading */}
        <Suspense
          fallback={
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <Loader2 className="h-10 w-10 text-primary-600 animate-spin" />
              <p className="text-slate-500 text-sm font-semibold">Initializing search filter...</p>
            </div>
          }
        >
          <PropertiesContainer />
        </Suspense>

      </div>
    </div>
  );
}
