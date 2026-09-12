'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/utils/api';
import Link from 'next/link';
import Image from 'next/image';
import { Edit3, Trash2, Plus, Loader2, Newspaper, Eye, Calendar } from 'lucide-react';

interface BlogItem {
  _id: string;
  title: string;
  views: number;
  createdAt: string;
  coverImage: string;
}

export default function AdminBlogsListPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await api.get('/blogs');
      setBlogs(response || []);
    } catch (error) {
      console.error('Failed to retrieve blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDeleteBlog = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this blog post?')) return;
    setDeletingId(id);
    try {
      await api.delete(`/blogs/${id}`);
      setBlogs(blogs.filter((b) => b._id !== id));
    } catch (error) {
      console.error('Failed to delete blog:', error);
      alert('Failed to delete blog post.');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <Loader2 className="h-10 w-10 text-primary-600 animate-spin" />
        <p className="text-slate-500 text-sm font-semibold">Loading blog articles index...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-dark-900">Manage Blogs</h1>
          <p className="text-slate-500 text-xs font-semibold">Publish, edit or remove SEO articles for UP registry and Agra property rates.</p>
        </div>
        <Link
          href="/admin/dashboard/blogs/add"
          className="inline-flex items-center space-x-2 bg-primary-700 hover:bg-primary-850 text-white font-bold py-2.5 px-5 rounded-xl text-xs shadow-sm transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Write New Article</span>
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center shadow-sm space-y-4">
          <Newspaper className="h-10 w-10 text-slate-300 mx-auto" />
          <p className="text-slate-500 text-sm">No blog posts listed in database.</p>
          <Link
            href="/admin/dashboard/blogs/add"
            className="inline-block px-5 py-2.5 bg-primary-750 hover:bg-primary-800 text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer"
          >
            Create First Post
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs select-none">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase">
                  <th className="p-4">Cover</th>
                  <th className="p-4">Article Title</th>
                  <th className="p-4">Page Views</th>
                  <th className="p-4">Date Published</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700 font-semibold">
                {blogs.map((blog) => {
                  const defaultImage = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80';
                  const cover = blog.coverImage || defaultImage;

                  return (
                    <tr key={blog._id} className="hover:bg-slate-50/50">
                      
                      {/* Image cover */}
                      <td className="p-4">
                        <div className="relative h-12 w-16 rounded-lg overflow-hidden border border-slate-100 bg-slate-100 shrink-0">
                          <Image src={cover} alt={blog.title} fill className="object-cover" />
                        </div>
                      </td>

                      {/* Title */}
                      <td className="p-4 max-w-xs md:max-w-md">
                        <span className="font-bold text-dark-900 line-clamp-1">{blog.title}</span>
                      </td>

                      {/* Views */}
                      <td className="p-4">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3.5 w-3.5 text-slate-450 shrink-0" />
                          <span>{blog.views || 0}</span>
                        </div>
                      </td>

                      {/* Date */}
                      <td className="p-4">
                        <div className="flex items-center space-x-1 text-slate-500">
                          <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          {/* Edit Link */}
                          <Link
                            href={`/admin/dashboard/blogs/edit/${blog._id}`}
                            className="p-1.5 text-slate-400 hover:text-primary-700 bg-white border border-slate-200 hover:border-primary-500 rounded-lg transition-colors"
                          >
                            <Edit3 className="h-4 w-4" />
                          </Link>

                          {/* Delete */}
                          <button
                            onClick={() => handleDeleteBlog(blog._id)}
                            disabled={deletingId === blog._id}
                            className="p-1.5 text-slate-400 hover:text-red-600 bg-white border border-slate-200 hover:border-red-500 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
