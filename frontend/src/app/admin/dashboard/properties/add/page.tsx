'use client';

import React, { useState } from 'react';
import { api } from '@/utils/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Save, ChevronLeft, Image as ImageIcon, Plus, X, Loader2, Landmark, Check } from 'lucide-react';

export default function AddPropertyPage() {
  const router = useRouter();

  // Text Inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [propertyType, setPropertyType] = useState('flat');
  const [bhk, setBhk] = useState('');
  const [plotSize, setPlotSize] = useState('');
  const [address, setAddress] = useState('');
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('Agra');
  const [state, setState] = useState('Uttar Pradesh');
  const [lat, setLat] = useState('27.1767');
  const [lng, setLng] = useState('78.0081');
  const [waterSupply, setWaterSupply] = useState('24 Hours');
  const [contactNumber, setContactNumber] = useState('+91 98765 43210');
  const [whatsappNumber, setWhatsappNumber] = useState('+91 98765 43210');
  
  // Lists (Parsed from comma-separated inputs)
  const [schoolsInput, setSchoolsInput] = useState('');
  const [hospitalsInput, setHospitalsInput] = useState('');
  const [marketsInput, setMarketsInput] = useState('');

  // Booleans
  const [parking, setParking] = useState(false);
  const [featured, setFeatured] = useState(false);

  // Uploading State
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  // Handle selected files for previewing
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const updatedFiles = [...imageFiles, ...filesArray];
      setImageFiles(updatedFiles);

      const objectUrls = updatedFiles.map((file) => URL.createObjectURL(file));
      setPreviews(objectUrls);
    }
  };

  const removeFile = (idx: number) => {
    const updatedFiles = imageFiles.filter((_, i) => i !== idx);
    setImageFiles(updatedFiles);

    const updatedPreviews = previews.filter((_, i) => i !== idx);
    URL.revokeObjectURL(previews[idx]);
    setPreviews(updatedPreviews);
  };

  const handleUploadImages = async () => {
    if (imageFiles.length === 0) return [];
    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      imageFiles.forEach((file) => {
        formData.append('images', file);
      });

      const response = await api.post('/properties/upload', formData, true);
      if (response && response.urls) {
        setUploadedUrls(response.urls);
        return response.urls;
      }
      throw new Error('Image upload response was missing URLs.');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Image upload failed. Cloudinary setup warning?');
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
      // 1. Upload Images if selected and not yet uploaded
      let imageUrls = [...uploadedUrls];
      if (imageFiles.length > 0 && imageUrls.length === 0) {
        imageUrls = await handleUploadImages();
      }

      // 2. Format Payload
      const payload = {
        title,
        description,
        price: Number(price),
        propertyType,
        bhk: bhk ? Number(bhk) : undefined,
        plotSize,
        address,
        locality,
        city,
        state,
        coordinates: {
          lat: Number(lat),
          lng: Number(lng),
        },
        nearbySchools: schoolsInput.split(',').map((s) => s.trim()).filter(Boolean),
        nearbyHospitals: hospitalsInput.split(',').map((h) => h.trim()).filter(Boolean),
        nearbyMarkets: marketsInput.split(',').map((m) => m.trim()).filter(Boolean),
        parking,
        waterSupply,
        contactNumber,
        whatsappNumber,
        featured,
        images: imageUrls,
        status: 'available',
      };

      // 3. Save Property
      await api.post('/properties', payload);
      router.push('/admin/dashboard/properties');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to create property. Verify entries.');
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      
      {/* Header Bar */}
      <div className="flex items-center space-x-3 pb-4 border-b border-slate-200">
        <Link
          href="/admin/dashboard/properties"
          className="p-2 border border-slate-200 hover:border-primary-500 hover:text-primary-700 bg-white rounded-lg text-slate-500 transition-colors"
        >
          <ChevronLeft className="h-4.5 w-4.5" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-dark-900">Add Property</h1>
          <p className="text-slate-500 text-xs font-semibold">Publish a new available listing to the homepage.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm font-semibold animate-fade-in">
          {error}
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
        
        {/* Core details */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-dark-900 border-b pb-2">Listing Header</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Property Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Premium 3 BHK Villa near Taj Mahal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:bg-white text-slate-850"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Price (INR) *</label>
              <input
                type="number"
                required
                placeholder="e.g. 6500000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:bg-white text-slate-850"
              />
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-dark-900 border-b pb-2">Specifications</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Listing Status *</label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:bg-white text-slate-700 cursor-pointer appearance-none"
              >
                <option value="flat">Flat / Apartment</option>
                <option value="house">Independent House / Villa</option>
                <option value="plot">Plot / Land</option>
                <option value="commercial">Commercial Space</option>
                <option value="rent">Rent Listing</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">BHK Config (Optional)</label>
              <input
                type="number"
                placeholder="e.g. 3 (leave empty if Plot)"
                value={bhk}
                onChange={(e) => setBhk(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:bg-white text-slate-850"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Plot / Floor Size *</label>
              <input
                type="text"
                required
                placeholder="e.g. 150 Sq Yards or 1200 Sq Ft"
                value={plotSize}
                onChange={(e) => setPlotSize(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:bg-white text-slate-850"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Water Supply *</label>
              <input
                type="text"
                required
                placeholder="e.g. 24 Hours, Connection Ready"
                value={waterSupply}
                onChange={(e) => setWaterSupply(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:bg-white text-slate-855"
              />
            </div>
          </div>
        </div>

        {/* Location details */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-dark-900 border-b pb-2">Geographical Address</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Full Street Address *</label>
              <input
                type="text"
                required
                placeholder="e.g. Villa 12, Radhasoami Enclave, Dayalbagh Road"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:bg-white text-slate-850"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Locality / Sector Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Dayalbagh"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:bg-white text-slate-850"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Latitude (Google Coordinates) *</label>
              <input
                type="text"
                required
                value={lat}
                onChange={(e) => setLat(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:bg-white text-slate-850"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Longitude (Google Coordinates) *</label>
              <input
                type="text"
                required
                value={lng}
                onChange={(e) => setLng(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:bg-white text-slate-850"
              />
            </div>
          </div>
        </div>

        {/* Nearby places */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-dark-900 border-b pb-2">Nearby Amenities (Comma Separated)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nearby Schools</label>
              <input
                type="text"
                placeholder="School A, School B..."
                value={schoolsInput}
                onChange={(e) => setSchoolsInput(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:bg-white text-slate-850"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nearby Hospitals</label>
              <input
                type="text"
                placeholder="Hospital A, Hospital B..."
                value={hospitalsInput}
                onChange={(e) => setHospitalsInput(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:bg-white text-slate-850"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nearby Markets</label>
              <input
                type="text"
                placeholder="Market A, Mall B..."
                value={marketsInput}
                onChange={(e) => setMarketsInput(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:bg-white text-slate-850"
              />
            </div>
          </div>
        </div>

        {/* Contact info */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-dark-900 border-b pb-2">Contact Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Direct Call Number *</label>
              <input
                type="text"
                required
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:bg-white text-slate-850"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">WhatsApp Mobile Number *</label>
              <input
                type="text"
                required
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:bg-white text-slate-850"
              />
            </div>
          </div>
        </div>

        {/* Description textarea */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Full Markdown/HTML Description *</label>
          <textarea
            required
            rows={5}
            placeholder="Describe the property layout, age of construction, flooring quality, neighborhood details, etc..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:bg-white text-slate-800 resize-none font-semibold"
          />
        </div>

        {/* Toggles */}
        <div className="flex space-x-8 pt-2 select-none text-xs font-bold text-dark-900">
          <label className="flex items-center space-x-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={parking}
              onChange={(e) => setParking(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-primary-700 focus:ring-primary-500"
            />
            <span>Has Reserved Parking Slot</span>
          </label>

          <label className="flex items-center space-x-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-primary-700 focus:ring-primary-500"
            />
            <span>Mark Listing as Featured (Homepage Slider)</span>
          </label>
        </div>

        {/* Image upload section */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-dark-900 border-b pb-2">Listing Images</h3>
          
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-250 rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100/50">
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-400 text-xs">
                <ImageIcon className="w-8 h-8 mb-1" />
                <p className="font-bold">Select property images (up to 10)</p>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Previews */}
          {previews.length > 0 && (
            <div className="grid grid-cols-5 gap-3 pt-2">
              {previews.map((preview, idx) => (
                <div key={idx} className="relative h-20 w-20 md:h-24 md:w-24 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                  <img src={preview} alt="Preview" className="object-cover w-full h-full" />
                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-0.5 shadow hover:bg-red-750"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="pt-4 border-t">
          <button
            type="submit"
            disabled={submitting || uploading}
            className="w-full bg-gradient-to-r from-primary-700 to-primary-850 hover:from-primary-800 hover:to-primary-950 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center space-x-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4.5 w-4.5 animate-spin" />
                <span>Saving property registry files...</span>
              </>
            ) : uploading ? (
              <>
                <Loader2 className="h-4.5 w-4.5 animate-spin" />
                <span>Uploading pictures to Cloudinary...</span>
              </>
            ) : (
              <>
                <Save className="h-4.5 w-4.5" />
                <span>Publish Listing</span>
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
}
