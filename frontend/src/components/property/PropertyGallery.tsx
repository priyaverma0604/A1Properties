'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface PropertyGalleryProps {
  images: string[];
  title: string;
}

const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images, title }) => {
  const defaultImage = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80';
  const displayImages = images && images.length > 0 ? images : [defaultImage];
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="space-y-4">
      {/* Active Main Image */}
      <div className="relative h-[320px] md:h-[480px] w-full rounded-2xl overflow-hidden shadow-md border border-slate-100 bg-slate-200">
        <Image
          src={displayImages[activeIdx]}
          alt={`${title} - image ${activeIdx + 1}`}
          fill
          priority
          className="object-cover transition-all duration-350"
        />
      </div>

      {/* Thumbnail Bar */}
      {displayImages.length > 1 && (
        <div className="flex space-x-3 overflow-x-auto pb-2 no-scrollbar">
          {displayImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                activeIdx === idx
                  ? 'border-primary-700 ring-2 ring-primary-500/20'
                  : 'border-transparent hover:border-slate-300'
              }`}
            >
              <Image
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                fill
                sizes="100px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyGallery;
