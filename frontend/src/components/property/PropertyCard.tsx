'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, BedDouble, Expand, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface PropertyData {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  propertyType: 'buy' | 'rent' | 'plot' | 'flat' | 'house' | 'commercial';
  bhk?: number;
  plotSize: string;
  address: string;
  locality: string;
  city: string;
  state: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  nearbySchools?: string[];
  nearbyHospitals?: string[];
  nearbyMarkets?: string[];
  parking?: boolean;
  waterSupply?: string;
  contactNumber?: string;
  whatsappNumber?: string;
  images: string[];
  status: 'available' | 'sold' | 'rented';
  featured: boolean;
  views: number;
  createdAt?: string;
  updatedAt?: string;
}

import { formatIndianPrice } from '@/utils/formatters';
export { formatIndianPrice };

interface PropertyCardProps {
  property: PropertyData;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { t, language } = useLanguage();
  const {
    title,
    slug,
    price,
    propertyType,
    bhk,
    plotSize,
    locality,
    images,
    status,
    featured,
  } = property;

  const defaultImage = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80';
  const coverImage = images && images.length > 0 ? images[0] : defaultImage;

  // Render readable label for propertyType
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'flat': return language === 'hi' ? 'फ्लैट / अपार्टमेंट' : 'Flat/Apartment';
      case 'house': return language === 'hi' ? 'मकान / विला' : 'House/Villa';
      case 'plot': return language === 'hi' ? 'प्लॉट / जमीन' : 'Plot/Land';
      case 'commercial': return language === 'hi' ? 'कमर्शियल / वेयरहाउस' : 'Commercial/Warehouse';
      case 'rent': return language === 'hi' ? 'किराए पर' : 'For Rent';
      case 'buy': return language === 'hi' ? 'बिक्री के लिए' : 'For Sale';
      default: return type;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col h-full group">
      {/* Property Image & Status Badges */}
      <div className="relative h-56 w-full overflow-hidden shrink-0">
        <Image
          src={coverImage}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Featured Badge */}
        {featured && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[10px] uppercase font-black px-2.5 py-1 rounded-md shadow-md tracking-wider">
            ★ {t('featured_badge')}
          </span>
        )}

        {/* Availability Badge */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          {status === 'available' ? (
            <span className="bg-emerald-600/90 backdrop-blur-sm text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-md shadow-sm tracking-wider">
              {t('available_badge')}
            </span>
          ) : status === 'sold' ? (
            <span className="bg-red-600/90 backdrop-blur-sm text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-md shadow-sm tracking-wider">
              {t('sold_badge')}
            </span>
          ) : (
            <span className="bg-indigo-600/90 backdrop-blur-sm text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-md shadow-sm tracking-wider">
              {t('rented_badge')}
            </span>
          )}
        </div>

        {/* Property Type Badge Overlay */}
        <div className="absolute bottom-3 left-3 bg-dark-900/75 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-lg">
          {getTypeLabel(propertyType)}
        </div>
      </div>

      {/* Property Details */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Locality & Address */}
        <div className="flex items-center space-x-1.5 text-slate-400 text-xs font-semibold mb-2 uppercase tracking-wide">
          <MapPin className="h-4 w-4 text-primary-600" />
          <span>{locality}, {language === 'hi' ? 'आगरा' : 'Agra'}</span>
        </div>

        {/* Title */}
        <h4 className="text-base font-bold text-dark-900 line-clamp-1 mb-2 group-hover:text-primary-700 transition-colors">
          {title}
        </h4>

        {/* Price Tag */}
        <div className="text-xl font-extrabold text-primary-800 mb-4">
          {formatIndianPrice(price, propertyType, language)}
        </div>

        {/* Specs: BHK / Area */}
        <div className="grid grid-cols-2 gap-2 pt-4 border-t border-slate-100 mt-auto text-xs text-slate-500 font-semibold">
          <div className="flex items-center space-x-2">
            <Expand className="h-4 w-4 text-slate-400" />
            <span>{plotSize}</span>
          </div>
          {bhk ? (
            <div className="flex items-center space-x-2">
              <BedDouble className="h-4 w-4 text-slate-400" />
              <span>{bhk} {language === 'hi' ? 'बीएचके' : 'BHK'}</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="h-4 w-4 text-slate-400" />
              <span className="capitalize">{getTypeLabel(propertyType)}</span>
            </div>
          )}
        </div>

        {/* View Details CTA */}
        <div className="pt-4 mt-4 border-t border-slate-50">
          <Link
            href={`/properties/${slug}`}
            className="block text-center w-full py-2.5 bg-slate-50 hover:bg-primary-50 hover:text-primary-700 text-slate-700 font-bold text-xs rounded-xl tracking-wider uppercase transition-colors cursor-pointer"
          >
            {t('view_details')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
