'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/utils/api';
import Link from 'next/link';
import Image from 'next/image';
import { Edit3, Trash2, Plus, Star, StarOff, Loader2, Sparkles, Building2 } from 'lucide-react';
import { formatIndianPrice } from '@/components/property/PropertyCard';

interface PropertyItem {
  _id: string;
  title: string;
  price: number;
  propertyType: string;
  locality: string;
  status: 'available' | 'sold' | 'rented';
  featured: boolean;
  images: string[];
}

export default function AdminPropertiesListPage() {
  const [properties, setProperties] = useState<PropertyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await api.get('/properties');
      setProperties(response.properties || []);
    } catch (error) {
      console.error('Failed to fetch properties:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleToggleFeatured = async (property: PropertyItem) => {
    setUpdatingId(property._id);
    try {
      const updated = await api.put(`/properties/${property._id}`, {
        featured: !property.featured,
      });
      if (updated && updated.property) {
        setProperties(
          properties.map((p) => (p._id === property._id ? { ...p, featured: updated.property.featured } : p))
        );
      }
    } catch (error) {
      console.error('Failed to toggle featured status:', error);
      alert('Failed to update featured status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleChangeStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const updated = await api.put(`/properties/${id}`, {
        status: newStatus,
      });
      if (updated && updated.property) {
        setProperties(
          properties.map((p) => (p._id === id ? { ...p, status: updated.property.status } : p))
        );
      }
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteProperty = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this property listing?')) return;
    setUpdatingId(id);
    try {
      await api.delete(`/properties/${id}`);
      setProperties(properties.filter((p) => p._id !== id));
    } catch (error) {
      console.error('Failed to delete property:', error);
      alert('Failed to delete property.');
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4 animate-fade-in">
        <Loader2 className="h-10 w-10 text-primary-600 animate-spin" />
        <p className="text-slate-500 text-sm font-semibold">Loading properties inventory...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-dark-900">Manage Properties</h1>
          <p className="text-slate-500 text-xs font-semibold">Create, modify or toggle availability status of Agra listings.</p>
        </div>
        <Link
          href="/admin/dashboard/properties/add"
          className="inline-flex items-center space-x-2 bg-primary-700 hover:bg-primary-850 text-white font-bold py-2.5 px-5 rounded-xl text-xs shadow-sm transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Property</span>
        </Link>
      </div>

      {properties.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center shadow-sm space-y-4">
          <Building2 className="h-10 w-10 text-slate-300 mx-auto" />
          <p className="text-slate-500 text-sm">No properties listed in database.</p>
          <Link
            href="/admin/dashboard/properties/add"
            className="inline-block px-5 py-2.5 bg-primary-750 hover:bg-primary-800 text-white text-xs font-bold rounded-xl shadow-sm cursor-pointer"
          >
            List First Property
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs select-none">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase">
                  <th className="p-4">Cover</th>
                  <th className="p-4">Title & Locality</th>
                  <th className="p-4">Pricing</th>
                  <th className="p-4">Featured</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-slate-700 font-semibold">
                {properties.map((property) => {
                  const defaultImage = 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80';
                  const cover = property.images && property.images.length > 0 ? property.images[0] : defaultImage;

                  return (
                    <tr key={property._id} className="hover:bg-slate-50/50">
                      
                      {/* Image cover */}
                      <td className="p-4">
                        <div className="relative h-12 w-16 rounded-lg overflow-hidden border border-slate-100 bg-slate-100 shrink-0">
                          <Image src={cover} alt={property.title} fill className="object-cover" />
                        </div>
                      </td>

                      {/* Title & Locality */}
                      <td className="p-4 max-w-xs md:max-w-sm">
                        <div className="space-y-0.5">
                          <span className="font-bold text-dark-900 line-clamp-1">{property.title}</span>
                          <span className="text-[10px] text-slate-400 tracking-wide uppercase block">{property.locality}, Agra</span>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="p-4 text-sm font-extrabold text-primary-750">
                        {formatIndianPrice(property.price, property.propertyType)}
                      </td>

                      {/* Featured Toggle */}
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleFeatured(property)}
                          disabled={updatingId === property._id}
                          className={`p-1.5 rounded-lg transition-colors border ${
                            property.featured
                              ? 'bg-amber-55/10 border-amber-300 text-amber-600'
                              : 'bg-white border-slate-200 text-slate-400 hover:text-amber-500'
                          } cursor-pointer`}
                          title={property.featured ? 'Remove from Featured' : 'Mark as Featured'}
                        >
                          {property.featured ? <Star className="h-4 w-4 fill-amber-500" /> : <StarOff className="h-4 w-4" />}
                        </button>
                      </td>

                      {/* Status Dropdown */}
                      <td className="p-4">
                        <select
                          value={property.status}
                          onChange={(e) => handleChangeStatus(property._id, e.target.value)}
                          disabled={updatingId === property._id}
                          className={`px-2 py-1 rounded-md text-[10px] font-black uppercase cursor-pointer focus:outline-none border ${
                            property.status === 'available'
                              ? 'bg-emerald-50 border-emerald-250 text-emerald-700'
                              : property.status === 'sold'
                              ? 'bg-red-50 border-red-250 text-red-700'
                              : 'bg-indigo-50 border-indigo-250 text-indigo-700'
                          }`}
                        >
                          <option value="available">Available</option>
                          <option value="sold">Sold</option>
                          <option value="rented">Rented</option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          {/* Edit Link */}
                          <Link
                            href={`/admin/dashboard/properties/edit/${property._id}`}
                            className="p-1.5 text-slate-400 hover:text-primary-700 bg-white border border-slate-200 hover:border-primary-500 rounded-lg transition-colors"
                          >
                            <Edit3 className="h-4 w-4" />
                          </Link>

                          {/* Delete */}
                          <button
                            onClick={() => handleDeleteProperty(property._id)}
                            disabled={updatingId === property._id}
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
