'use client';

import React from 'react';
import Link from 'next/link';
import { RotateCcw, Home } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4 py-16">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-slate-100 shadow-xl text-center space-y-6 animate-fade-in">
        <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-700 mx-auto font-black text-2xl">
          !
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-dark-900">Something went wrong</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            We couldn't load this property details right now. Please reload or browse our other verified properties in Agra.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="flex-1 inline-flex items-center justify-center space-x-2 py-3 bg-primary-700 hover:bg-primary-800 text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/properties"
            className="flex-1 inline-flex items-center justify-center space-x-2 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all"
          >
            <Home className="h-4 w-4" />
            <span>All Properties</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
