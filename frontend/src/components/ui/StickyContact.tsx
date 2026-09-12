'use client';

import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

const StickyContact: React.FC = () => {
  const phoneNumber = '+919756535933';
  const whatsappNumber = '919756535933';
  const whatsappMessage = encodeURIComponent(
    'Hello, I am visiting your website and would like to inquire about available properties in Agra.'
  );

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3 md:space-y-4">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 group relative"
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7 animate-pulse" />
        
        {/* Tooltip */}
        <span className="absolute right-14 bg-dark-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-md">
          Chat on WhatsApp
        </span>
      </a>

      {/* Call Button (Mobile Only or Mobile Prioritized) */}
      <a
        href={`tel:${phoneNumber}`}
        className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-200 group relative"
        aria-label="Call Broker"
      >
        <Phone className="w-5 h-5 md:w-6 md:h-6" />

        {/* Tooltip */}
        <span className="absolute right-14 bg-dark-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-md">
          Call Now
        </span>
      </a>
    </div>
  );
};

export default StickyContact;
