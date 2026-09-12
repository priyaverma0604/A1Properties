import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Eye, ArrowRight } from 'lucide-react';

export interface BlogData {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  views: number;
  createdAt: string;
}

interface BlogCardProps {
  blog: BlogData;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const { title, slug, excerpt, coverImage, views, createdAt } = blog;

  const defaultImage = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80';
  const displayImage = coverImage || defaultImage;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col h-full group">
      
      {/* Cover Image */}
      <div className="relative h-48 w-full overflow-hidden shrink-0">
        <Image
          src={displayImage}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-103 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Details */}
      <div className="p-5 flex flex-col flex-grow space-y-3">
        {/* Meta details */}
        <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
          <span className="flex items-center space-x-1">
            <Calendar className="h-3.5 w-3.5 text-primary-600" />
            <span>{new Date(createdAt).toLocaleDateString()}</span>
          </span>
          <span className="flex items-center space-x-1">
            <Eye className="h-3.5 w-3.5 text-primary-600" />
            <span>{views || 0} views</span>
          </span>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-dark-900 line-clamp-2 group-hover:text-primary-700 transition-colors">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
          {excerpt}
        </p>

        {/* Action Link */}
        <div className="pt-4 border-t border-slate-50 mt-auto flex justify-end">
          <Link
            href={`/blogs/${slug}`}
            className="inline-flex items-center space-x-1.5 text-primary-700 hover:text-primary-850 font-bold text-xs uppercase tracking-wider transition-colors"
          >
            <span>Read Article</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

      </div>

    </div>
  );
};

export default BlogCard;
