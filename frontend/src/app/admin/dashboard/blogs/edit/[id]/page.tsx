'use client';

import React, { useState, useEffect, use } from 'react';
import { api } from '@/utils/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Save, ChevronLeft, Image as ImageIcon, Loader2 } from 'lucide-react';

interface EditBlogProps {
  params: Promise<{ id: string }>;
}

export default function EditBlogPage({ params }: EditBlogProps) {
  const { id } = use(params);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [existingCover, setExistingCover] = useState('');
  
  const [newCoverFile, setNewCoverFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const blog = await api.get(`/blogs/${id}`);
        if (blog) {
          setTitle(blog.title || '');
          setExcerpt(blog.excerpt || '');
          setContent(blog.content || '');
          setExistingCover(blog.coverImage || '');
        }
      } catch (err: any) {
        console.error(err);
        setError('Failed to retrieve blog article details.');
      } finally {
        setLoading(false);
      }
    };

    loadBlog();
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewCoverFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUploadCover = async (): Promise<string> => {
    if (!newCoverFile) return existingCover;
    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('images', newCoverFile);

      const response = await api.post('/properties/upload', formData, true);
      if (response && response.urls && response.urls.length > 0) {
        return response.urls[0];
      }
      throw new Error('Image upload failed.');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to upload cover image.');
      throw err;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      // 1. Upload cover image if a new one is selected
      const coverUrl = await handleUploadCover();

      // 2. Submit Payload
      await api.put(`/blogs/${id}`, {
        title,
        excerpt,
        content,
        coverImage: coverUrl,
      });

      router.push('/admin/dashboard/blogs');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to update blog post.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4 animate-fade-in">
        <Loader2 className="h-10 w-10 text-primary-600 animate-spin" />
        <p className="text-slate-500 text-sm font-semibold">Retrieving article details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      
      {/* Header Bar */}
      <div className="flex items-center space-x-3 pb-4 border-b border-slate-200">
        <Link
          href="/admin/dashboard/blogs"
          className="p-2 border border-slate-200 hover:border-primary-500 hover:text-primary-700 bg-white rounded-lg text-slate-500 transition-colors"
        >
          <ChevronLeft className="h-4.5 w-4.5" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-dark-900">Edit Blog</h1>
          <p className="text-slate-500 text-xs font-semibold">Modify content structure and publish update changes.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm font-semibold animate-fade-in">
          {error}
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        
        {/* Title */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Article Title *</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:bg-white text-slate-850 font-bold"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Short Summary (Excerpt) *</label>
          <input
            type="text"
            required
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:bg-white text-slate-850 font-semibold"
          />
        </div>

        {/* Markdown Content Area */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Body Content (Markdown format supported) *
          </label>
          <textarea
            required
            rows={12}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:bg-white text-slate-800 font-semibold"
          />
        </div>

        {/* Cover image select */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 items-end">
          
          {/* Existing Cover Image */}
          {existingCover && !preview && (
            <div className="space-y-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Current Cover Image</span>
              <div className="relative h-28 w-44 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                <img src={existingCover} alt="Current Cover" className="object-cover w-full h-full" />
              </div>
            </div>
          )}

          {/* New Preview */}
          {preview && (
            <div className="space-y-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">New Cover Preview</span>
              <div className="relative h-28 w-44 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                <img src={preview} alt="New Cover Preview" className="object-cover w-full h-full" />
              </div>
            </div>
          )}

          {/* File input */}
          <div className="space-y-2 flex-grow">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Replace Cover Image
            </label>
            <label className="flex flex-col items-center justify-center h-28 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100/50">
              <div className="flex flex-col items-center justify-center pt-4 pb-5 text-slate-400 text-xs">
                <ImageIcon className="w-7 h-7 mb-1" />
                <p className="font-bold">Select replacement picture</p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

        </div>

        {/* Submit */}
        <div className="pt-4 border-t">
          <button
            type="submit"
            disabled={submitting || uploading}
            className="w-full bg-gradient-to-r from-primary-700 to-primary-850 hover:from-primary-800 hover:to-primary-950 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center space-x-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4.5 w-4.5 animate-spin" />
                <span>Saving updates...</span>
              </>
            ) : uploading ? (
              <>
                <Loader2 className="h-4.5 w-4.5 animate-spin" />
                <span>Uploading cover image to Cloudinary...</span>
              </>
            ) : (
              <>
                <Save className="h-4.5 w-4.5" />
                <span>Save Blog Updates</span>
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
}
