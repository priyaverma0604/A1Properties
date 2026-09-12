import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PropertyGallery from '@/components/property/PropertyGallery';
import PropertyMap from '@/components/property/PropertyMap';
import PropertyInquiryForm from '@/components/property/PropertyInquiryForm';
import PropertyCard, { PropertyData, formatIndianPrice } from '@/components/property/PropertyCard';
import { Phone, Calendar, Heart, Share2, Sparkles, School, ShieldAlert, ShoppingBag, Eye, ShieldCheck, Check } from 'lucide-react';
import type { Metadata } from 'next';
import { mockProperties } from '@/utils/mockData';

type Props = {
  params: Promise<{ slug: string }>;
};

async function getProperty(slug: string): Promise<PropertyData | null> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  try {
    const res = await fetch(`${API_URL}/properties/slug/${slug}`, {
      cache: 'no-store' // Keep it dynamic to update view count
    });
    if (!res.ok) {
      return mockProperties.find((p) => p.slug === slug) || null;
    }
    return await res.json();
  } catch (error) {
    console.warn('Error fetching property, falling back to local mocks:', error);
    return mockProperties.find((p) => p.slug === slug) || null;
  }
}

async function getRelatedProperties(locality: string, currentId: string): Promise<PropertyData[]> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  try {
    const res = await fetch(`${API_URL}/properties?locality=${encodeURIComponent(locality)}&limit=4`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) {
      return mockProperties.filter((p) => p._id !== currentId).slice(0, 3);
    }
    const data = await res.json();
    return (data.properties || []).filter((p: PropertyData) => p._id !== currentId).slice(0, 3);
  } catch (error) {
    console.warn('Error fetching related properties, falling back to local mocks:', error);
    return mockProperties.filter((p) => p._id !== currentId).slice(0, 3);
  }
}

// Generate dynamic SEO metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const property = await getProperty(slug);

  if (!property) {
    return {
      title: 'Property Not Found | Agra Properties',
    };
  }

  const cleanTitle = `${property.title} in ${property.locality}, Agra | Agra Properties`;
  const cleanDesc = `Verified Listing: ${property.title} for ${property.propertyType === 'rent' ? 'rent' : 'sale'} in ${property.locality}, Agra. Size: ${property.plotSize}. Price: ${formatIndianPrice(property.price, property.propertyType)}. Verified legal documentation.`;

  return {
    title: cleanTitle,
    description: cleanDesc,
    openGraph: {
      title: cleanTitle,
      description: cleanDesc,
      type: 'website',
      url: `https://www.agraproperties.com/properties/${property.slug}`,
      images: property.images.length > 0 ? [{ url: property.images[0] }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: cleanTitle,
      description: cleanDesc,
      images: property.images.length > 0 ? [property.images[0]] : [],
    },
  };
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const property = await getProperty(slug);

  if (!property) {
    notFound();
  }

  const relatedProperties = await getRelatedProperties(property.locality, property._id);

  // Setup dynamic schemas
  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'RealEstateAgent',
        '@id': 'https://www.agraproperties.com/#agent',
        'name': 'A1 Properties',
        'telephone': '+919756535933',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Sanjay Place',
          'addressLocality': 'Agra',
          'addressRegion': 'Uttar Pradesh',
          'postalCode': '282002',
          'addressCountry': 'IN'
        }
      },
      {
        '@type': 'SingleFamilyResidence',
        '@id': `https://www.agraproperties.com/properties/${property.slug}/#residence`,
        'name': property.title,
        'description': property.description,
        'numberOfRooms': property.bhk || undefined,
        'floorSize': {
          '@type': 'QuantitativeValue',
          'value': property.plotSize
        },
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': property.address,
          'addressLocality': property.locality,
          'addressRegion': 'Uttar Pradesh',
          'addressCountry': 'IN'
        },
        'offers': {
          '@type': 'Offer',
          'price': property.price,
          'priceCurrency': 'INR',
          'priceSpecification': {
            '@type': 'UnitPriceSpecification',
            'priceType': property.propertyType === 'rent' ? 'https://schema.org/RentalPrice' : 'https://schema.org/SalePrice'
          },
          'availability': 'https://schema.org/InStock',
          'validFrom': property.createdAt
        }
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://www.agraproperties.com'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Properties',
            'item': 'https://www.agraproperties.com/properties'
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': property.title,
            'item': `https://www.agraproperties.com/properties/${property.slug}`
          }
        ]
      }
    ]
  };

  const whatsappMessage = encodeURIComponent(
    `Hello, I would like to inquire about the property: "${property.title}" listed in ${property.locality}, Agra.`
  );

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
        
        {/* Breadcrumb nav links */}
        <div className="flex items-center space-x-2 text-slate-400 text-xs font-semibold uppercase tracking-wider">
          <Link href="/" className="hover:text-primary-700">Home</Link>
          <span>/</span>
          <Link href="/properties" className="hover:text-primary-700">Properties</Link>
          <span>/</span>
          <span className="text-slate-500 line-clamp-1">{property.title}</span>
        </div>

        {/* Property Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-3">
            {/* Status & Featured badges */}
            <div className="flex flex-wrap gap-2">
              {property.featured && (
                <span className="bg-amber-500 text-white text-[10px] uppercase font-black px-2.5 py-1 rounded-md shadow-sm">
                  ★ Featured
                </span>
              )}
              {property.status === 'available' ? (
                <span className="bg-emerald-600 text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-md shadow-sm">
                  Available
                </span>
              ) : (
                <span className="bg-red-600 text-white text-[10px] uppercase font-bold px-2.5 py-1 rounded-md shadow-sm">
                  {property.status}
                </span>
              )}
              <span className="bg-slate-200 text-slate-700 text-[10px] uppercase font-bold px-2.5 py-1 rounded-md">
                {property.propertyType}
              </span>
            </div>

            <h1 className="text-2xl md:text-4xl font-extrabold text-dark-900 leading-tight">
              {property.title}
            </h1>
            
            <p className="text-slate-500 text-xs md:text-sm font-semibold">
              {property.address}, {property.locality}, Agra, Uttar Pradesh
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-slate-400 text-xs flex items-center space-x-1.5 shrink-0">
              <Eye className="h-4.5 w-4.5" />
              <span>{property.views || 0} Views</span>
            </span>
          </div>
        </div>

        {/* Main Contents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Media + Info */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Gallery */}
            <PropertyGallery images={property.images} title={property.title} />

            {/* Description */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-dark-900 border-b border-slate-50 pb-3">Property Overview</h3>
              <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{property.description}</p>
            </div>

            {/* Technical Specifications Table */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-dark-900 border-b border-slate-50 pb-3">Property Details Table</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3.5 text-sm text-slate-700">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-400 font-semibold">Locality</span>
                  <span className="font-bold text-dark-900 capitalize">{property.locality}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-400 font-semibold">Listing For</span>
                  <span className="font-bold text-dark-900 capitalize">{property.propertyType}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-400 font-semibold">Plot / Floor Size</span>
                  <span className="font-bold text-dark-900">{property.plotSize}</span>
                </div>
                {property.bhk && (
                  <div className="flex justify-between py-2 border-b border-slate-100">
                    <span className="text-slate-400 font-semibold">BHK Config</span>
                    <span className="font-bold text-dark-900">{property.bhk} BHK</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-400 font-semibold">Parking</span>
                  <span className="font-bold text-dark-900 flex items-center space-x-1">
                    {property.parking ? (
                      <>
                        <Check className="h-4.5 w-4.5 text-emerald-600" />
                        <span>Available</span>
                      </>
                    ) : (
                      <span>Not Available</span>
                    )}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-400 font-semibold">Water Supply</span>
                  <span className="font-bold text-dark-900">{property.waterSupply}</span>
                </div>
              </div>
            </div>

            {/* Nearby places */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-dark-900 border-b border-slate-50 pb-3">Nearby Places</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Schools */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-emerald-700 font-bold text-sm">
                    <School className="h-4.5 w-4.5 text-primary-600" />
                    <span>Nearby Schools</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-500 font-medium pl-6 list-disc">
                    {property.nearbySchools && property.nearbySchools.length > 0 ? (
                      property.nearbySchools.map((item, idx) => <li key={idx}>{item}</li>)
                    ) : (
                      <li>Local public institutions</li>
                    )}
                  </ul>
                </div>

                {/* Hospitals */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-emerald-700 font-bold text-sm">
                    <ShieldCheck className="h-4.5 w-4.5 text-primary-600" />
                    <span>Nearby Hospitals</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-500 font-medium pl-6 list-disc">
                    {property.nearbyHospitals && property.nearbyHospitals.length > 0 ? (
                      property.nearbyHospitals.map((item, idx) => <li key={idx}>{item}</li>)
                    ) : (
                      <li>Multi-speciality medical centers</li>
                    )}
                  </ul>
                </div>

                {/* Markets */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-emerald-700 font-bold text-sm">
                    <ShoppingBag className="h-4.5 w-4.5 text-primary-600" />
                    <span>Nearby Markets</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-500 font-medium pl-6 list-disc">
                    {property.nearbyMarkets && property.nearbyMarkets.length > 0 ? (
                      property.nearbyMarkets.map((item, idx) => <li key={idx}>{item}</li>)
                    ) : (
                      <li>Retail centers & grocery stores</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Location Map */}
            <PropertyMap
              coordinates={property.coordinates}
              address={property.address}
              locality={property.locality}
            />

          </div>

          {/* Right Column: Pricing, Call details & Form */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-[110px]">
            
            {/* Price Box */}
            <div className="bg-gradient-to-br from-primary-850 to-primary-700 text-white p-6 rounded-2xl shadow-md space-y-4">
              <span className="text-xs uppercase tracking-wider opacity-80 font-bold">Total Asking Price</span>
              <h2 className="text-3xl md:text-4xl font-extrabold">
                {formatIndianPrice(property.price, property.propertyType)}
              </h2>
              
              <div className="flex items-center space-x-2 pt-2 border-t border-primary-600/30 text-xs text-slate-100 font-semibold">
                <Calendar className="h-4 w-4 shrink-0" />
                <span>Listed: {property.createdAt ? new Date(property.createdAt).toLocaleDateString() : 'Recently'}</span>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md space-y-4">
              <h3 className="text-base font-bold text-dark-900">Direct Broker Contact</h3>
              
              <div className="space-y-3">
                {/* Phone Link */}
                <a
                  href={`tel:${property.contactNumber || '+919756535933'}`}
                  className="flex items-center justify-center space-x-3 w-full bg-primary-700 hover:bg-primary-800 text-white font-bold py-3 rounded-xl text-sm shadow-sm transition-all"
                >
                  <Phone className="h-4 w-4" />
                  <span>Call +91 97565 35933</span>
                </a>

                {/* WhatsApp Link */}
                <a
                  href={`https://wa.me/${(property.whatsappNumber || '+919756535933').replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-3 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl text-sm shadow-sm transition-all"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Inquiry Form */}
            <PropertyInquiryForm
              propertyId={property._id}
              propertyTitle={property.title}
            />

          </div>

        </div>

        {/* Related Properties */}
        {relatedProperties.length > 0 && (
          <div className="pt-12 border-t border-slate-200 space-y-8">
            <h2 className="text-2xl font-extrabold text-dark-900">Related Properties in {property.locality}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProperties.map((p) => (
                <PropertyCard key={p._id} property={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
