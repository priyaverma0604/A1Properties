'use client';

import React, { useState } from 'react';
import { api } from '@/utils/api';
import { FileText, User, Phone, MapPin, Building, Image as ImageIcon, Send, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function SellPropertyPage() {
  const { t, language } = useLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('flat');
  const [description, setDescription] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle image selections
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      
      // Limit to max 5 images
      const totalFiles = [...selectedFiles, ...filesArray].slice(0, 5);
      setSelectedFiles(totalFiles);

      // Create object URLs for previews
      const newPreviews = totalFiles.map((file) => URL.createObjectURL(file));
      
      // Revoke old previews to prevent memory leaks
      previews.forEach((p) => URL.revokeObjectURL(p));
      setPreviews(newPreviews);
    }
  };

  // Remove a selected image
  const removeFile = (idx: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== idx);
    setSelectedFiles(updatedFiles);

    const updatedPreviews = previews.filter((_, i) => i !== idx);
    URL.revokeObjectURL(previews[idx]);
    setPreviews(updatedPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !location || !description) {
      setSubmitStatus('error');
      setErrorMessage(language === 'hi' ? 'कृपया सभी आवश्यक फ़ील्ड भरें।' : 'Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Build FormData for multer parsing on backend
      const formData = new FormData();
      formData.append('type', 'seller');
      formData.append('name', name);
      formData.append('phone', phone);
      formData.append('location', location);
      formData.append('propertyType', propertyType);
      formData.append('description', description);

      // Append files
      selectedFiles.forEach((file) => {
        formData.append('images', file);
      });

      // Format WhatsApp message
      const formattedWaText = encodeURIComponent(
        `*A1 Properties - New Seller Listing Submission*\n\n` +
        `👤 *Seller Name:* ${name}\n` +
        `📞 *Phone:* ${phone}\n` +
        `📍 *Location:* ${location}\n` +
        `🏠 *Property Type:* ${propertyType}\n` +
        `📝 *Details & Price:* ${description}`
      );
      const waLink = `https://wa.me/919756535933?text=${formattedWaText}`;

      // Submit to backend
      try {
        await api.post('/leads', formData, true);
      } catch (e) {
        console.warn('Backend note:', e);
      }

      setSubmitStatus('success');
      setName('');
      setPhone('');
      setLocation('');
      setDescription('');
      setSelectedFiles([]);
      setPreviews([]);

      // Open on WhatsApp
      window.open(waLink, '_blank');
    } catch (err: any) {
      console.error(err);
      setSubmitStatus('error');
      setErrorMessage(err.message || (language === 'hi' ? 'सबमिशन विफल रहा। कृपया पुनः प्रयास करें।' : 'Failed to submit property details. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-black tracking-widest text-primary-700 uppercase">
            {language === 'hi' ? 'प्रॉपर्टी विक्रेता पोर्टल' : 'Seller Dashboard'}
          </span>
          <h1 className="text-3xl font-extrabold text-dark-900 md:text-5xl">
            {t('nav_sell')}
          </h1>
          <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
            {language === 'hi'
              ? 'अपना प्लॉट, मकान, विला या कमर्शियल स्पेस सबमिट करें। हम कागजात सत्यापित कर इसे सीधे सत्यापित खरीदारों को दिखाएंगे।'
              : 'Submit your plot, house, or commercial space. We verify the records and showcase it directly to active buyers.'}
          </p>
        </div>

        {submitStatus === 'success' ? (
          <div className="bg-white border border-slate-100 rounded-3xl p-12 text-center shadow-xl space-y-6 max-w-xl mx-auto animate-slide-up">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-dark-900">
                {language === 'hi' ? 'विवरण सफलतापूर्वक सबमिट हुआ!' : 'Details Submitted!'}
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                {language === 'hi'
                  ? 'आपकी प्रॉपर्टी का विवरण प्राप्त हो गया है। मिस्टर विशाल वर्मा 24 घंटे के भीतर आपसे संपर्क कर साइट निरीक्षण और रजिस्ट्री जांच का समय तय करेंगे।'
                  : 'Thank you for submitting your property. Mr. Vishal Verma will call you within 24 hours to schedule a site inspection and verify the registry files.'}
              </p>
            </div>
            <button
              onClick={() => setSubmitStatus('idle')}
              className="px-6 py-2.5 bg-primary-700 hover:bg-primary-800 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer"
            >
              {language === 'hi' ? 'एक और प्रॉपर्टी जोड़ें' : 'List Another Property'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-3xl border border-slate-100 shadow-md space-y-6 animate-slide-up">
            
            {submitStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm flex items-center space-x-3">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {t('your_name')} *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder={language === 'hi' ? 'अपना नाम दर्ज करें' : 'Your name'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:bg-white text-slate-800 transition-all"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {t('phone_number')} *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3 h-5 w-5 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:bg-white text-slate-800 transition-all"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {language === 'hi' ? 'प्रॉपर्टी का पता / इलाका *' : 'Property Locality / Address *'}
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3 h-5 w-5 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder={language === 'hi' ? 'उदा. आवास विकास, शास्त्रीपुरम, आगरा' : 'e.g. Avas Vikas, Shastripuram, Agra'}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:bg-white text-slate-800 transition-all"
                  />
                </div>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {t('property_type_label')} *
                </label>
                <div className="relative">
                  <Building className="absolute left-3.5 top-3 h-5 w-5 text-slate-400" />
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:bg-white text-slate-700 cursor-pointer appearance-none"
                  >
                    <option value="flat">{t('flat_type')}</option>
                    <option value="house">{t('house_type')}</option>
                    <option value="plot">{t('plot_type')}</option>
                    <option value="commercial">{t('commercial_type')}</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                {language === 'hi' ? 'प्रॉपर्टी का विवरण और मांगी गई कीमत *' : 'Property Description & Asking Price *'}
              </label>
              <div className="relative">
                <FileText className="absolute left-3.5 top-3 h-5 w-5 text-slate-400" />
                <textarea
                  required
                  rows={4}
                  placeholder={
                    language === 'hi'
                      ? 'साइज (उदा. 100 गज), कमरों की संख्या, अनुमानित कीमत और अन्य सुविधाएं (पार्किंग, फेसिंग, पानी कनेक्शन आदि) लिखें...'
                      : 'Provide size details (e.g. 100 Sq Yards), number of bedrooms, price expectation, and other features (e.g., parking, facing, water connection)...'
                  }
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:bg-white text-slate-800 transition-all resize-none"
                />
              </div>
            </div>

            {/* Upload Images */}
            <div className="space-y-4">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                {language === 'hi' ? 'फ़ोटो अपलोड करें (अधिकतम 5, वैकल्पिक)' : 'Upload Images (Max 5, optional)'}
              </label>
              
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100/50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 space-y-1 text-slate-400">
                    <ImageIcon className="w-8 h-8 text-slate-400 mb-1" />
                    <p className="text-xs font-bold">
                      {language === 'hi' ? 'फ़ाइल चुनने के लिए क्लिक करें' : 'Click to select files'}
                    </p>
                    <p className="text-[10px]">PNG, JPG or WEBP (Max 5MB)</p>
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

              {/* Previews Grid */}
              {previews.length > 0 && (
                <div className="grid grid-cols-5 gap-3 pt-2">
                  {previews.map((preview, idx) => (
                    <div key={idx} className="relative h-20 w-20 md:h-24 md:w-24 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 shrink-0">
                      <img src={preview} alt="Selected preview" className="object-cover w-full h-full" />
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 shadow-md hover:bg-red-700 focus:outline-none transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-primary-700 to-primary-850 hover:from-primary-800 hover:to-primary-950 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center space-x-2 shadow-md transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
              >
                <Send className="h-4 w-4" />
                <span>
                  {isSubmitting
                    ? (language === 'hi' ? 'सबमिट किया जा रहा है...' : 'Submitting Details...')
                    : (language === 'hi' ? 'सत्यापन के लिए प्रॉपर्टी सबमिट करें' : 'Submit Property for Verification')}
                </span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
