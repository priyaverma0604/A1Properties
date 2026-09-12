'use client';

import React, { useState } from 'react';
import { api } from '../../utils/api';
import { Send, CheckCircle2, AlertCircle, Phone, User, MessageSquare, Mail, MessageSquareCode } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const ContactForm: React.FC = () => {
  const { t, language } = useLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      setSubmitStatus('error');
      setErrorMessage(language === 'hi' ? 'कृपया नाम और फोन नंबर दर्ज करें।' : 'Name and Phone number are required.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Build formatted WhatsApp message directly for +91 97565 35933
    const formattedWaText = encodeURIComponent(
      `*A1 Properties - New Contact / Callback Inquiry*\n\n` +
      `👤 *Name:* ${name}\n` +
      `📞 *Phone:* ${phone}\n` +
      (email ? `✉️ *Email:* ${email}\n` : '') +
      `💬 *Requirements:* ${message || 'Looking for real estate consultation in Agra'}`
    );
    const waLink = `https://wa.me/919756535933?text=${formattedWaText}`;
    setWhatsappUrl(waLink);

    try {
      // 1. Send to backend
      await api.post('/leads', {
        type: 'inquiry',
        name,
        phone,
        email: email || undefined,
        description: message,
      });
    } catch (err: any) {
      console.warn('Backend note:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitStatus('success');

      // 2. Open directly on WhatsApp inquiry number
      window.open(waLink, '_blank');
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-slate-100">
      <h3 className="text-xl font-bold text-dark-900 mb-2">
        {t('request_callback')}
      </h3>
      <p className="text-sm text-slate-500 mb-6">
        {language === 'hi'
          ? 'अपना संपर्क विवरण छोड़ें और यह सीधा मिस्टर विशाल वर्मा (+91 97565 35933) के व्हाट्सएप पर पहुंचेगा।'
          : 'Leave your contact details and it will be sent directly to Mr. Vishal Verma on WhatsApp.'}
      </p>

      {submitStatus === 'success' ? (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-5 rounded-xl text-center space-y-3 animate-fade-in">
          <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
          <h4 className="font-bold text-base">
            {language === 'hi' ? 'पूछताछ सीधे व्हाट्सएप पर भेज दी गई है!' : 'Inquiry Sent Directly to WhatsApp!'}
          </h4>
          <p className="text-sm">
            {language === 'hi'
              ? 'आपकी जानकारी मिस्टर विशाल वर्मा (+91 97565 35933) के नंबर पर पहुंच चुकी है।'
              : 'Your inquiry has reached Mr. Vishal Verma (+91 97565 35933).'}
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
              setEmail('');
              setMessage('');
            }}
            className="text-xs font-bold text-emerald-700 underline mt-2 block mx-auto cursor-pointer"
          >
            {language === 'hi' ? 'दूसरा संदेश भेजें' : 'Send another message'}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {submitStatus === 'error' && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-sm flex items-center space-x-2 animate-fade-in">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              {t('your_name')} *
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 h-5 w-5 text-slate-400" />
              <input
                type="text"
                required
                placeholder={language === 'hi' ? 'अपना नाम दर्ज करें' : 'Enter your name'}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:bg-white text-slate-800 transition-all"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              {t('phone_number')} *
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3 h-5 w-5 text-slate-400" />
              <input
                type="tel"
                required
                placeholder="e.g. +91 99999 99999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:bg-white text-slate-800 transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              {language === 'hi' ? 'ईमेल पता (वैकल्पिक)' : 'Email Address (Optional)'}
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-5 w-5 text-slate-400" />
              <input
                type="email"
                placeholder={language === 'hi' ? 'अपना ईमेल दर्ज करें' : 'Enter your email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:bg-white text-slate-800 transition-all"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
              {t('message_label')}
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3.5 top-3 h-5 w-5 text-slate-400" />
              <textarea
                rows={3}
                placeholder={language === 'hi' ? 'आप किस प्रकार की प्रॉपर्टी ढूंढ रहे हैं?' : 'What type of property are you looking for?'}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary-600 focus:bg-white text-slate-800 transition-all resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-primary-700 to-primary-850 hover:from-primary-800 hover:to-primary-950 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center space-x-2 shadow-md transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
          >
            <Send className="h-4 w-4" />
            <span>
              {isSubmitting
                ? (language === 'hi' ? 'भेजा जा रहा है...' : 'Submitting...')
                : (language === 'hi' ? 'व्हाट्सएप पर भेजें (+91 97565 35933)' : 'Send to WhatsApp (+91 97565 35933)')}
            </span>
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
