import React from 'react';
import BlogCard, { BlogData } from '@/components/blog/BlogCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Real Estate Blog Agra | Property Circle Rates & Investment Guides',
  description: 'Read the latest updates about property rates in Dayalbagh, registry guides in Uttar Pradesh, stamp duties and best investment sectors in Agra.',
};

const mockBlogs: BlogData[] = [
  {
    _id: '1',
    title: 'Best Areas to Buy Property in Agra',
    slug: 'best-areas-to-buy-property-in-agra',
    excerpt: 'Planning to invest in Agra real estate? Read this comprehensive guide highlighting the top residential and commercial areas.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
    views: 150,
    createdAt: new Date().toISOString()
  },
  {
    _id: '2',
    title: 'Property Rates in Agra (2026 Guide)',
    slug: 'property-rates-in-agra-2026-guide',
    excerpt: 'An detailed overview of real estate rates in Agra. Know the average prices per square yard and square foot in major Agra localities.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=800&q=80',
    views: 230,
    createdAt: new Date().toISOString()
  },
  {
    _id: '3',
    title: 'Registry Process in Uttar Pradesh: A Step-by-Step Guide',
    slug: 'registry-process-in-uttar-pradesh-a-step-by-step-guide',
    excerpt: 'Understanding the property registry process in Uttar Pradesh (Agra). Learn about registry fees, stamp duty rates, and required documentation.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=800&q=80',
    views: 180,
    createdAt: new Date().toISOString()
  },
  {
    _id: '4',
    title: 'Best Investment Locations in Agra for High Returns',
    slug: 'best-investment-locations-in-agra-for-high-returns',
    excerpt: 'Looking to invest for high rental yields and capital gains? Check out these upcoming investment hubs around Agra.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80',
    views: 310,
    createdAt: new Date().toISOString()
  }
];

async function getBlogs(): Promise<BlogData[]> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  try {
    const res = await fetch(`${API_URL}/blogs`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return mockBlogs;
    const data = await res.json();
    return data && data.length > 0 ? data : mockBlogs;
  } catch (error) {
    console.error('Error fetching blogs from API:', error);
    return mockBlogs;
  }
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Page Header */}
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-black tracking-widest text-primary-700 uppercase">Guides & Insights</span>
          <h1 className="text-3xl font-extrabold text-dark-900 md:text-4xl">Agra Real Estate Blog</h1>
          <p className="text-slate-500 text-sm max-w-xl">
            Stay informed with expert circle rate details, documentation help, and registry updates in Uttar Pradesh.
          </p>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>

      </div>
    </div>
  );
}
