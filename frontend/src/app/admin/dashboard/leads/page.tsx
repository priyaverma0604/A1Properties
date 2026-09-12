'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/utils/api';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Phone, Mail, MapPin, Building, Info, Loader2, Sparkles, Image as ImageIcon } from 'lucide-react';

interface LeadData {
  _id: string;
  type: 'seller' | 'inquiry';
  name: string;
  phone: string;
  email?: string;
  location?: string;
  propertyType?: string;
  description?: string;
  images?: string[];
  propertyId?: {
    _id: string;
    title: string;
    slug: string;
    price: number;
  };
  createdAt: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadData[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const response = await api.get<LeadData[]>('/leads');
      setLeads(response || []);
    } catch (error) {
      console.error('Failed to retrieve leads list:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDeleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead inquiry?')) return;
    setDeletingId(id);
    try {
      await api.delete(`/leads/${id}`);
      setLeads(leads.filter((lead) => lead._id !== id));
    } catch (error) {
      console.error('Failed to delete lead:', error);
      alert('Failed to delete lead.');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <Loader2 className="h-10 w-10 text-primary-600 animate-spin" />
        <p className="text-slate-500 text-sm font-semibold">Loading customer inquiries...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-black text-dark-900">Leads & Inquiries</h1>
          <p className="text-slate-500 text-xs font-semibold">Buyer requests and seller listings submitted from the front-end.</p>
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center shadow-sm">
          <Info className="h-10 w-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">No customer leads found in the database.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {leads.map((lead) => (
            <div
              key={lead._id}
              className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow relative flex flex-col md:flex-row justify-between gap-6"
            >
              {/* Left Details */}
              <div className="space-y-4 flex-grow min-w-0">
                {/* Badge Row */}
                <div className="flex items-center space-x-3.5">
                  <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                    lead.type === 'seller'
                      ? 'bg-amber-50 text-amber-700 border border-amber-250'
                      : 'bg-primary-50 text-primary-750 border border-primary-250'
                  }`}>
                    {lead.type === 'seller' ? '🏠 Seller Request' : '✉ Inquiry Callback'}
                  </span>
                  
                  <span className="text-slate-400 text-[10px] font-bold">
                    Received: {new Date(lead.createdAt).toLocaleString()}
                  </span>
                </div>

                {/* Sender Title */}
                <div className="space-y-1">
                  <h3 className="text-base font-extrabold text-dark-900 flex items-center space-x-2">
                    <span>{lead.name}</span>
                  </h3>
                  
                  {/* Contacts */}
                  <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-xs text-slate-500 font-semibold pt-1">
                    <a href={`tel:${lead.phone}`} className="flex items-center space-x-1 hover:text-primary-700">
                      <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                      <span>{lead.phone}</span>
                    </a>
                    {lead.email && (
                      <a href={`mailto:${lead.email}`} className="flex items-center space-x-1 hover:text-primary-700">
                        <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                        <span>{lead.email}</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Referenced Property (If inquiry on specific item) */}
                {lead.type === 'inquiry' && lead.propertyId && (
                  <div className="bg-primary-50/40 border border-primary-100 p-3.5 rounded-xl text-xs space-y-1">
                    <span className="text-primary-800 font-bold">Referenced Listing:</span>
                    <div className="flex justify-between items-center">
                      <Link
                        href={`/properties/${lead.propertyId.slug}`}
                        target="_blank"
                        className="font-extrabold text-dark-900 hover:text-primary-700 underline line-clamp-1"
                      >
                        {lead.propertyId.title}
                      </Link>
                      <span className="font-bold text-primary-750 shrink-0 pl-4">
                        ₹{(lead.propertyId.price / 100000).toLocaleString('en-IN')} Lakh
                      </span>
                    </div>
                  </div>
                )}

                {/* Seller Specific properties */}
                {lead.type === 'seller' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-150 text-xs">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
                      <span className="text-slate-500 font-bold">Location:</span>
                      <span className="font-extrabold text-dark-900">{lead.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-slate-400 shrink-0" />
                      <span className="text-slate-500 font-bold">Property Type:</span>
                      <span className="font-extrabold text-dark-900 capitalize">{lead.propertyType}</span>
                    </div>
                  </div>
                )}

                {/* Text query/description */}
                {lead.description && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Description / Details:</span>
                    <p className="text-xs text-slate-650 bg-slate-50/50 p-3 rounded-xl border border-slate-100/50 leading-relaxed font-semibold">
                      {lead.description}
                    </p>
                  </div>
                )}

                {/* Seller Images */}
                {lead.type === 'seller' && lead.images && lead.images.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                      <ImageIcon className="h-4 w-4" />
                      <span>Uploaded Pictures ({lead.images.length})</span>
                    </span>
                    <div className="flex gap-2.5 overflow-x-auto pb-1.5 select-none no-scrollbar">
                      {lead.images.map((url, index) => (
                        <div key={index} className="relative h-20 w-20 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                          <Image src={url} alt="Seller property" fill className="object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Action Column */}
              <div className="md:border-l md:border-slate-100 md:pl-6 flex items-center shrink-0">
                <button
                  onClick={() => handleDeleteLead(lead._id)}
                  disabled={deletingId === lead._id}
                  className="w-full md:w-auto bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 p-3 rounded-xl flex items-center justify-center transition-colors border border-red-200/40 cursor-pointer disabled:opacity-40"
                  title="Remove inquiry"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
