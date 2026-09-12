'use client';

import React, { useState } from 'react';
import { api } from '../../utils/api';
import { Send, CheckCircle2, AlertCircle, Phone, User, MessageSquare, MessageSquareCode } from 'lucide-react';
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
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      setSubmitStatus('error');
      setErrorMessage(language === 'hi' ? 'नाम और फ़ोन नंबर आवश्यक हैं।' : 'Name and Phone number are required.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Build formatted message for WhatsApp inquiry number (+91 97565 35933)
    const formattedWaText = encodeURIComponent(
      `*A1 Properties - New Property Inquiry*\n\n` +
      `📌 *Property:* ${propertyTitle}\n` +
      `👤 *Name:* ${name}\n` +
      `📞 *Phone:* ${phone}\n` +
      `💬 *Message:* ${message}`
    );
    const waLink = `https://wa.me/919756535933?text=${formattedWaText}`;
    setWhatsappUrl(waLink);

    try {
      // 1. Submit to Backend API
      await api.post('/leads', {
        type: 'inquiry',
        name,
        phone,
        description: message,
        propertyId,
      });
    } catch (err: any) {
      console.warn('Backend API note:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitStatus('success');

      // 2. Automatically redirect inquiry directly to WhatsApp inquiry number
      window.open(waLink, '_blank');
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 space-y-4">
      <h3 className="text-base font-bold text-dark-900">{t('inquire_title')}</h3>
      
      {submitStatus === 'success' ? (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-5 rounded-xl text-center space-y-3 animate-fade-in">
          <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto" />
          <h4 className="font-bold text-sm">
            {language === 'hi' ? 'पूछताछ सीधे व्हाट्सएप पर भेज दी गई है!' : 'Inquiry Sent Directly to WhatsApp!'}
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            {language === 'hi'
              ? 'आपकी पूछताछ सीधे मिस्टर विशाल वर्मा (+91 97565 35933) के नंबर पर पहुंच गई है।'
              : 'Your inquiry has been forwarded directly to Mr. Vishal Verma (+91 97565 35933).'}
          </p>

          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-sm transition-all"
            >
              <MessageSquareCode className="h-4 w-4" />
              <span>{language === 'hi' ? 'व्हाट्सएप चैट खोलें' : 'Open WhatsApp Chat'}</span>
            </a>
          )}

          <button
            onClick={() => {
              setSubmitStatus('idle');
              setName('');
              setPhone('');
            }}
            className="text-[11px] font-bold text-primary-700 underline block mx-auto cursor-pointer pt-1"
          >
            {language === 'hi' ? 'एक और पूछताछ भेजें' : 'Send another inquiry'}
          </button>
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
            <span>
              {isSubmitting
                ? (language === 'hi' ? 'भेजा जा रहा है...' : 'Sending...')
                : (language === 'hi' ? 'पूछताछ भेजें (+91 97565 35933)' : 'Send Inquiry to +91 97565 35933')}
            </span>
          </button>
        </form>
      )}
    </div>
  );
};

export default PropertyInquiryForm;
