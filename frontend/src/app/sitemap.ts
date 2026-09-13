import { MetadataRoute } from 'next';
import { mockProperties } from '@/utils/mockData';

const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://a1properties-frontend.onrender.com').replace(/\/+$/, '');

const mockBlogs = [
  {
    slug: 'best-areas-to-buy-property-in-agra',
    updatedAt: new Date().toISOString()
  },
  {
    slug: 'property-rates-in-agra-2026-guide',
    updatedAt: new Date().toISOString()
  }
];

async function getProperties(): Promise<any[]> {
  const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  const baseUrl = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl}/api`;
  try {
    const res = await fetch(`${baseUrl}/properties?limit=100`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.properties) && data.properties.length > 0) {
        return data.properties;
      }
    }
  } catch (error) {
    console.warn('Sitemap: Backend properties fetch fallback to mocks:', error);
  }
  return mockProperties;
}

async function getBlogs(): Promise<any[]> {
  const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  const baseUrl = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl}/api`;
  try {
    const res = await fetch(`${baseUrl}/blogs`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  } catch (error) {
    console.warn('Sitemap: Backend blogs fetch fallback to mocks:', error);
  }
  return mockBlogs;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Static Routes
  const staticRoutes = [
    '',
    '/properties',
    '/sell',
    '/blogs',
    '/about',
    '/contact',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Dynamic Property Routes
  const properties = await getProperties();
  const propertyRoutes = properties.map((property) => ({
    url: `${BASE_URL}/properties/${property.slug}`,
    lastModified: new Date(property.updatedAt || property.createdAt || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // 3. Dynamic Blog Routes
  const blogs = await getBlogs();
  const blogRoutes = blogs.map((blog) => ({
    url: `${BASE_URL}/blogs/${blog.slug}`,
    lastModified: new Date(blog.updatedAt || blog.createdAt || new Date()),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...propertyRoutes, ...blogRoutes];
}
