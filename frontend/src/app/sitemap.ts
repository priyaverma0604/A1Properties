import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.a1properties.com';

async function getProperties(): Promise<any[]> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  try {
    const res = await fetch(`${API_URL}/properties?limit=100`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.properties || [];
  } catch (error) {
    console.error('Sitemap: Failed to load properties', error);
    return [];
  }
}

async function getBlogs(): Promise<any[]> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  try {
    const res = await fetch(`${API_URL}/blogs`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error('Sitemap: Failed to load blogs', error);
    return [];
  }
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
    lastModified: new Date(property.updatedAt || property.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // 3. Dynamic Blog Routes
  const blogs = await getBlogs();
  const blogRoutes = blogs.map((blog) => ({
    url: `${BASE_URL}/blogs/${blog.slug}`,
    lastModified: new Date(blog.updatedAt || blog.createdAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...propertyRoutes, ...blogRoutes];
}
