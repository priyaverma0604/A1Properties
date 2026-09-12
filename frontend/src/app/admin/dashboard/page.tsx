'use client';

import React, { useState, useEffect } from 'react';
import { api } from '../../../utils/api';
import Link from 'next/link';
import { LayoutDashboard, Building2, Newspaper, Mail, Eye, Calendar, ArrowRight, Loader2, UserCheck, PhoneCall } from 'lucide-react';

interface Stats {
  properties: number;
  available: number;
  blogs: number;
  leads: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({ properties: 0, available: 0, blogs: 0, leads: 0 });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOverviewData = async () => {
      try {
        const [propsRes, blogsRes, leadsRes] = await Promise.all([
          api.get('/properties'),
          api.get('/blogs'),
          api.get('/leads'),
        ]);

        const allProps = propsRes.properties || [];
        const availableProps = allProps.filter((p: any) => p.status === 'available');

        setStats({
          properties: allProps.length,
          available: availableProps.length,
          blogs: blogsRes.length || 0,
          leads: leadsRes.length || 0,
        });

        // Slice the 3 most recent leads
        setRecentLeads(leadsRes.slice(0, 3));
      } catch (error) {
        console.error('Failed to load overview statistics:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOverviewData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4 animate-fade-in">
        <Loader2 className="h-10 w-10 text-primary-600 animate-spin" />
        <p className="text-slate-500 text-sm font-semibold">Loading dashboard stats...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-black text-dark-900">Dashboard Console</h1>
        <p className="text-slate-500 text-xs font-semibold">Real-time stats and customer queries summary.</p>
      </div>

      {/* Grid Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Properties */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1.5">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block">Showcased</span>
            <span className="text-3xl font-extrabold text-dark-900 block">{stats.properties}</span>
            <span className="text-[10px] font-bold text-slate-400 block">{stats.available} active listings</span>
          </div>
          <div className="p-3 bg-teal-50 text-teal-700 rounded-xl">
            <Building2 className="w-6 h-6" />
          </div>
        </div>

        {/* Total Leads */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1.5">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block">Customer Leads</span>
            <span className="text-3xl font-extrabold text-dark-900 block">{stats.leads}</span>
            <span className="text-[10px] font-bold text-slate-400 block">Form inquiries & sellers</span>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-700 rounded-xl">
            <Mail className="w-6 h-6" />
          </div>
        </div>

        {/* Total Blogs */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1.5">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block">Real Estate Blogs</span>
            <span className="text-3xl font-extrabold text-dark-900 block">{stats.blogs}</span>
            <span className="text-[10px] font-bold text-slate-400 block">SEO Article posts</span>
          </div>
          <div className="p-3 bg-amber-50 text-amber-700 rounded-xl">
            <Newspaper className="w-6 h-6" />
          </div>
        </div>

        {/* Direct WhatsApp leads counter placeholder / Quick Consult */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="space-y-1.5">
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider block">Consultation Status</span>
            <span className="text-3xl font-extrabold text-dark-900 block">Active</span>
            <span className="text-[10px] font-bold text-slate-400 block">Local Agent Support</span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Leads Table & Fast Links */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Inquiries Panel */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-dark-900">Recent Customer Leads</h3>
            <Link
              href="/admin/dashboard/leads"
              className="text-xs font-bold text-primary-700 hover:text-primary-850 flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentLeads.length === 0 ? (
            <p className="text-slate-400 text-xs py-8 text-center">No inquiries received yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="text-slate-400 font-bold uppercase border-b border-slate-100">
                    <th className="pb-3">Sender</th>
                    <th className="pb-3">Contact</th>
                    <th className="pb-3">Type</th>
                    <th className="pb-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-semibold text-slate-700">
                  {recentLeads.map((lead) => (
                    <tr key={lead._id}>
                      <td className="py-3.5 font-bold text-dark-900">{lead.name}</td>
                      <td className="py-3.5">{lead.phone}</td>
                      <td className="py-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                          lead.type === 'seller' ? 'bg-amber-50 text-amber-700 border border-amber-250' : 'bg-primary-50 text-primary-750'
                        }`}>
                          {lead.type}
                        </span>
                      </td>
                      <td className="py-3.5">{new Date(lead.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Links / Dashboard Panel */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-dark-900 pb-3 border-b border-slate-100">Quick Actions</h3>
          
          <div className="flex flex-col gap-2.5">
            <Link
              href="/admin/dashboard/properties/add"
              className="block text-center py-3 bg-primary-700 hover:bg-primary-850 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
            >
              + Add New Property Listing
            </Link>
            
            <Link
              href="/admin/dashboard/blogs/add"
              className="block text-center py-3 bg-slate-150 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors"
            >
              + Write New Blog Post
            </Link>
            
            <Link
              href="/admin/dashboard/properties"
              className="block text-center py-3 bg-white border border-slate-200 text-slate-600 hover:border-primary-700 hover:text-primary-700 font-bold text-xs rounded-xl transition-colors"
            >
              Manage Properties Inventory
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
