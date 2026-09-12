'use client';

import React, { useState } from 'react';
import { api } from '../../utils/api';
import { Send, CheckCircle2, AlertCircle, Phone, User, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface PropertyInquiryFormProps {
  propertyId: string;
  propertyTitle: string;
}

const PropertyInquiryForm: React.FC<PropertyInquiryFormProps> = ({ propertyId, propertyTitle }) => {
  const { t, language } = useLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(
    language === 'hi'
      ? `मुझे इस प्रॉपर्टी में रुचि है: "${propertyTitle}"। कृपया अधिक जानकारी के लिए मुझसे संपर्क करें।`
      : `I am interested in: "${propertyTitle}". Please contact me with more information.`
  );
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      setSubmitStatus('error');
      setErrorMessage(language === 'hi' ? 'नाम और फ़ोन नंबर आवश्यक हैं।' : 'Name and Phone number are required.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await api.post('/leads', {
        type: 'inquiry',
        name,
        phone,
        description: message,
        propertyId,
      });

      setSubmitStatus('success');
      setName('');
      setPhone('');
    } catch (err: any) {
      console.error(err);
      setSubmitStatus('error');
      setErrorMessage(err.message || (language === 'hi' ? 'सबमिशन विफल रहा। पुनः प्रयास करें।' : 'Submission failed. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 space-y-4">
      <h3 className="text-base font-bold text-dark-900">{t('inquire_title')}</h3>
      
      {submitStatus === 'success' ? (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-center space-y-2 animate-fade-in">
          <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto" />
          <h4 className="font-bold text-sm">
            {language === 'hi' ? 'पूछताछ दर्ज हो गई' : 'Submission Successful'}
          </h4>
          <p className="text-xs">
            {language === 'hi'
              ? 'आपकी रुचि प्राप्त हो गई है। मिस्टर विशाल वर्मा शीघ्र ही आपसे संपर्क करेंगे।'
              : 'We have received your interest. Mr. Vishal Verma will call you back shortly.'}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {submitStatus === 'error' && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-xs flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">
              {t('your_name')} *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
              <input
                type="text"
                required
                placeholder={language === 'hi' ? 'अपना नाम दर्ज करें' : 'Enter name'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-600 focus:bg-white text-slate-800"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">
              {t('phone_number')} *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
              <input
                type="tel"
                required
                placeholder="e.g. +91 99999 99999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-600 focus:bg-white text-slate-800"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-wider mb-1">
              {t('message_label')}
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-primary-600 focus:bg-white text-slate-800 resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-primary-700 to-primary-850 hover:from-primary-800 hover:to-primary-950 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-sm transition-all cursor-pointer"
          >
            <Send className="h-3.5 w-3.5" />
            <span>{isSubmitting ? (language === 'hi' ? 'भेजा जा रहा है...' : 'Sending...') : t('send_inquiry')}</span>
          </button>
        </form>
      )}
    </div>
  );
};

export default PropertyInquiryForm;
