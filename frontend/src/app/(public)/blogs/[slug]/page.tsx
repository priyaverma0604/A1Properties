import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, Eye, Clock, ChevronLeft } from 'lucide-react';
import { BlogData } from '@/components/blog/BlogCard';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

async function getBlog(slug: string): Promise<BlogData | null> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  try {
    const res = await fetch(`${API_URL}/blogs/slug/${slug}`, {
      cache: 'no-store' // dynamic to increment views on render
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

// Generate dynamic metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return {
      title: 'Article Not Found | Agra Properties',
    };
  }

  return {
    title: `${blog.title} | Agra Real Estate Blog`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: 'article',
      url: `https://www.agraproperties.com/blogs/${blog.slug}`,
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
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  // Setup BlogPosting Schema
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': blog.title,
    'description': blog.excerpt,
    'image': blog.coverImage,
    'datePublished': blog.createdAt,
    'dateModified': blog.createdAt,
    'author': {
      '@type': 'Person',
      'name': 'Mr. Vishal Verma',
      'jobTitle': 'Real Estate Consultant & Founder'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Agra Properties',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://www.agraproperties.com/logo.png'
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://www.agraproperties.com/blogs/${blog.slug}`
    }
  };

  // Estimate read time (assuming 200 words/min)
  const wordCount = blog.content ? blog.content.split(/\s+/).length : 50;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
        
        {/* Back Link */}
        <Link
          href="/blogs"
          className="inline-flex items-center space-x-1.5 text-primary-700 hover:text-primary-850 text-xs font-bold uppercase tracking-wider transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Blogs</span>
        </Link>

        {/* Blog Header */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-dark-900 leading-tight">
            {blog.title}
          </h1>

          {/* Meta details */}
          <div className="flex flex-wrap gap-4 text-slate-400 text-xs font-semibold pt-2 border-y border-slate-200/50 py-3.5">
            <span className="flex items-center space-x-1.5">
              <Calendar className="h-4 w-4 text-primary-600" />
              <span>{new Date(blog.createdAt).toLocaleDateString('en-IN', { dateStyle: 'long' })}</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Clock className="h-4 w-4 text-primary-600" />
              <span>{readTime} min read</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <Eye className="h-4 w-4 text-primary-600" />
              <span>{blog.views || 0} views</span>
            </span>
          </div>
        </div>

        {/* Cover Image */}
        <div className="relative h-64 md:h-[400px] w-full rounded-2xl overflow-hidden shadow-md">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Blog Body Content */}
        <article className="bg-white p-6 md:p-10 rounded-2xl border border-slate-100 shadow-sm prose prose-slate max-w-none">
          {/* Simple formatting render for markdown-like body content */}
          <div className="space-y-6 text-slate-700 text-sm md:text-base leading-relaxed">
            {blog.content ? (
              blog.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={idx} className="text-lg md:text-xl font-bold text-dark-900 mt-6 mb-2">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={idx} className="text-xl md:text-2xl font-extrabold text-dark-900 mt-8 mb-3 border-b pb-2">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('- ')) {
                  return (
                    <ul key={idx} className="list-disc pl-5 space-y-1.5 my-3">
                      {paragraph.split('\n').map((li, lIdx) => (
                        <li key={lIdx}>{li.replace('- ', '')}</li>
                      ))}
                    </ul>
                  );
                }
                // Check if it's a markdown table
                if (paragraph.includes('|')) {
                  const rows = paragraph.split('\n').filter(Boolean);
                  return (
                    <div key={idx} className="overflow-x-auto my-6 border border-slate-100 rounded-xl">
                      <table className="min-w-full divide-y divide-slate-200 text-xs md:text-sm">
                        <tbody className="divide-y divide-slate-100">
                          {rows.map((row, rIdx) => {
                            const cells = row.split('|').filter((_, cIdx) => cIdx > 0 && cIdx < row.split('|').length - 1);
                            const isHeader = rIdx === 0 || row.includes('---');
                            if (row.includes('---')) return null;
                            return (
                              <tr key={rIdx} className={isHeader ? 'bg-slate-50 font-bold text-dark-900' : 'text-slate-600'}>
                                {cells.map((cell, cellIdx) => (
                                  <td key={cellIdx} className="px-4 py-3 text-left">
                                    {cell.trim()}
                                  </td>
                                ))}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  );
                }
                return <p key={idx}>{paragraph}</p>;
              })
            ) : (
              <p>No content available.</p>
            )}
          </div>
        </article>

      </div>
    </div>
  );
}
