import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, Eye, Clock, ChevronLeft } from 'lucide-react';
import { BlogData } from '@/components/blog/BlogCard';
import type { Metadata } from 'next';

const mockBlogs: BlogData[] = [
  {
    _id: '1',
    title: 'Best Areas to Buy Property in Agra',
    slug: 'best-areas-to-buy-property-in-agra',
    excerpt: 'Planning to invest in Agra real estate? Read this comprehensive guide highlighting the top residential and commercial areas in Avas Vikas, Shastripuram, Dayalbagh, and Fatehabad Road.',
    content: `Agra's real estate market offers high growth potential across both residential and commercial sectors.

### 1. Avas Vikas Colony (Sector 7 & 12)
Known for wide 30ft ADA-approved roads, serene central parks, and reliable civic infrastructure. Ideal for independent houses and duplex villas.

### 2. Shastripuram
Fast-growing prime residential hub with secured gated societies, modern clubhouse amenities, and close connectivity to the highway.

### 3. Kuberpur (Kanpur-Agra Highway)
Industrial corridor with massive demand for logistics warehousing and transport terminals.

### 4. Fatehabad Road & Bamrauli Katara
Prime location for institutional campuses, hospitality, and luxury developments with direct access to Ramada Plaza and Yamuna Expressway.`,
    coverImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
    views: 150,
    createdAt: new Date().toISOString()
  },
  {
    _id: '2',
    title: 'Property Rates in Agra (2026 Guide)',
    slug: 'property-rates-in-agra-2026-guide',
    excerpt: 'A detailed overview of real estate circle rates in Agra. Know the average prices per square yard and square foot in major Agra localities.',
    content: `Understanding property rates and circle rates is essential for transparent real estate transactions.

### Circle Rates in Major Localities:
- **Avas Vikas Colony**: ₹35,000 - ₹55,000 / Sq Yard
- **Shastripuram**: ₹40,000 - ₹60,000 / Sq Yard
- **Dayalbagh**: ₹30,000 - ₹50,000 / Sq Yard
- **Sanjay Place**: Commercial office spaces from ₹1,50,000 / Sq Yard

Consult **Mr. Vishal Verma** (+91 97565 35933) for verified valuation and registry guidance.`,
    coverImage: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=800&q=80',
    views: 230,
    createdAt: new Date().toISOString()
  }
];

type Props = {
  params: Promise<{ slug: string }> | { slug: string };
};

async function getBlog(slug: string): Promise<BlogData | null> {
  if (!slug) return null;
  const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  const baseUrl = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl}/api`;
  try {
    const res = await fetch(`${baseUrl}/blogs/slug/${encodeURIComponent(slug)}`, {
      cache: 'no-store'
    });
    if (res.ok) {
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        if (data && data._id) return data;
      }
    }
  } catch (error) {
    console.warn('Error fetching blog post, falling back to mock:', error);
  }
  return mockBlogs.find((b) => b.slug === slug || decodeURIComponent(slug) === b.slug) || mockBlogs[0];
}

// Generate dynamic metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams?.slug || '';
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: 'Article | A1 Properties Agra',
    };
  }

  return {
    title: `${blog.title} | Agra Real Estate Blog`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: 'article',
      url: `https://www.a1properties.com/blogs/${blog.slug}`,
      images: [{ url: blog.coverImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt,
      images: [blog.coverImage],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams?.slug || '';
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
        
        {/* Back Link */}
        <Link
          href="/blogs"
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-primary-700 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to all articles</span>
        </Link>

        {/* Article Header */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-dark-900 leading-tight">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400 border-b border-slate-200 pb-4">
            <span className="flex items-center space-x-1.5">
              <Calendar className="h-4 w-4 text-primary-600" />
              <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Clock className="h-4 w-4 text-primary-600" />
              <span>4 min read</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Eye className="h-4 w-4 text-primary-600" />
              <span>{blog.views || 100} Views</span>
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative h-72 md:h-[400px] w-full rounded-2xl overflow-hidden shadow-md">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="bg-white p-6 md:p-10 rounded-2xl border border-slate-100 shadow-sm space-y-6 text-slate-700 leading-relaxed text-sm md:text-base whitespace-pre-line">
          {blog.content || blog.excerpt}
        </div>

        {/* Author Callout */}
        <div className="bg-primary-50 p-6 rounded-2xl border border-primary-100 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-dark-900 text-sm">Consultant Advisory</h4>
            <p className="text-xs text-slate-500">Need specific micro-market guidance on properties in Agra? Contact Mr. Vishal Verma.</p>
          </div>
          <Link
            href="/contact"
            className="px-4 py-2 bg-primary-700 hover:bg-primary-800 text-white font-bold rounded-xl text-xs shadow-sm transition-all"
          >
            Contact
          </Link>
        </div>

      </div>
    </div>
  );
}
