'use client';

import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface PropertyMapProps {
  coordinates?: {
    lat: number;
    lng: number;
  };
  address: string;
  locality: string;
}

const PropertyMap: React.FC<PropertyMapProps> = ({ coordinates, address, locality }) => {
  // Default Agra coordinates if missing
  const lat = coordinates?.lat || 27.1767;
  const lng = coordinates?.lng || 78.0081;

  // Google Maps navigation link
  const directionUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  // Embedded iframe URL
  const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-dark-900 font-bold">
          <MapPin className="h-5 w-5 text-primary-700" />
          <span>Property Location</span>
        </div>
        <a
          href={directionUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-1.5 bg-primary-50 text-primary-700 hover:bg-primary-100 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
        >
          <Navigation className="h-3 w-3" />
          <span>Get Directions</span>
        </a>
      </div>

      <p className="text-slate-500 text-xs leading-relaxed font-semibold">
        {address}, {locality}, Agra, Uttar Pradesh
      </p>

      {/* Embedded Map */}
      <div className="relative h-64 w-full rounded-xl overflow-hidden border border-slate-100 bg-slate-100">
        <iframe
          title="Google Map Location"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          src={embedUrl}
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default PropertyMap;
