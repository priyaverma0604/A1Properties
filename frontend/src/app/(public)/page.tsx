import React from 'react';
import HomeClientContent from '@/components/home/HomeClientContent';
import { PropertyData } from '@/components/property/PropertyCard';
import { mockProperties } from '@/utils/mockData';

const mockFeaturedProperties: PropertyData[] = mockProperties;

async function getFeaturedProperties(): Promise<PropertyData[]> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  try {
    const res = await fetch(`${API_URL}/properties?featured=true&limit=6`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return mockFeaturedProperties;
    const data = await res.json();
    return data.properties && data.properties.length > 0 ? data.properties : mockFeaturedProperties;
  } catch (error) {
    console.warn('Error fetching featured properties, fallback to mockData:', error);
    return mockFeaturedProperties;
  }
}

export default async function HomePage() {
  const featuredProperties = await getFeaturedProperties();

  return <HomeClientContent featuredProperties={featuredProperties} />;
}
