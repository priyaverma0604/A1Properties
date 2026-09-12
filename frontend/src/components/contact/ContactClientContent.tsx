'use client';

import React from 'react';
import ContactForm from '../home/ContactForm';
import { Phone, Mail, MapPin, Calendar, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const ContactClientContent: React.FC = () => {
  const { t, language } = useLanguage();

  const faqsEn = [
    {
      q: 'What is your consultancy fee for buying a property in Agra?',
      a: 'We charge a standard, transparent consultancy fee depending on the property valuation. This fee covers complete property search, paperwork verification, negotiation support, and registry scheduling.',
    },
    {
      q: 'How do you verify property legal records?',
      a: 'We review the last 30 years of title records, verify the active registry deeds at the sub-registrar office, ensure there are no active bank mortgages or judicial liens, and double check municipal tax receipts.',
    },
    {
      q: 'Do you help with stamp duty payment and Uttar Pradesh Registry booking?',
      a: 'Yes. We completely manage the online deed creation on the IGRSUP portal, stamp paper verification, and schedule the appointment slot at the SRO office in Agra for biometric signatures.',
    },
    {
      q: 'What is the current stamp duty rate in Uttar Pradesh?',
      a: 'The stamp duty rate is 7% for male buyers, 6% for female buyers, and 6.5% for joint ownership (male + female), based on whichever is higher between the Circle Rate and the actual Transaction Price.',
    },
  ];

  const faqsHi = [
    {
      q: 'आगरा में प्रॉपर्टी खरीदने पर आपकी कंसल्टेंसी फीस क्या है?',
      a: 'हम एक मानक और पारदर्शी कंसल्टेंसी शुल्क लेते हैं। इसमें प्रॉपर्टी की तलाश, कागजी कार्रवाई का सत्यापन, उचित मूल्य वार्ता और रजिस्ट्री निष्पादन शामिल है।',
    },
    {
      q: 'आप प्रॉपर्टी के कानूनी रिकॉर्ड की जांच कैसे करते हैं?',
      a: 'हम 30 साल की रजिस्ट्री श्रृंखला की जांच करते हैं, सब-रजिस्ट्रार कार्यालय में मूल दस्तावेजों का मिलान करते हैं, तथा सुनिश्चित करते हैं कि प्रॉपर्टी पर कोई बैंक लोन या कानूनी विवाद न हो।',
    },
    {
      q: 'क्या आप स्टांप शुल्क और यूपी रजिस्ट्री अपॉइंटमेंट में मदद करते हैं?',
      a: 'जी हाँ, हम IGRSUP पोर्टल पर ऑनलाइन डीड ड्राफ्टिंग, स्टांप पेपर और आगरा सब-रजिस्ट्रार कार्यालय में बायोमेट्रिक हस्ताक्षर स्लॉट बुकिंग का पूरा कार्य संभालते हैं।',
    },
    {
      q: 'उत्तर प्रदेश में वर्तमान स्टांप शुल्क दर क्या है?',
      a: 'पुरुष खरीदार के लिए 7%, महिला खरीदार के लिए 6%, और संयुक्त स्वामित्व (पुरुष + महिला) के लिए 6.5% स्टांप शुल्क देय होता है।',
    },
  ];

  const faqs = language === 'hi' ? faqsHi : faqsEn;
  const embedUrl = 'https://maps.google.com/maps?q=Sanjay%20Place,%20Agra,%20UP&t=&z=15&ie=UTF8&iwloc=&output=embed';

  return (
    <div className="bg-slate-50 py-16 space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-black tracking-widest text-primary-700 uppercase">
          {t('contact_tag')}
        </span>
        <h1 className="text-3xl font-extrabold text-dark-900 md:text-5xl">
          {t('nav_contact')}
        </h1>
        <p className="text-slate-500 text-sm max-w-xl mx-auto leading-relaxed">
          {language === 'hi'
            ? 'प्लॉट, मकान, विला खरीदने या आगरा में प्रॉपर्टी रजिस्ट्री कराने के संबंध में किसी भी सवाल के लिए मिस्टर विशाल वर्मा से सीधे संपर्क करें।'
            : 'Have questions about buying a plot, renting a commercial space, or starting a property registry in Agra? Reach out to Mr. Vishal Verma today.'}
        </p>
      </section>

      {/* Main Grid: Form vs Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-5">
            <h3 className="text-lg font-bold text-dark-900 pb-3 border-b border-slate-50">
              {language === 'hi' ? 'कार्यालय विवरण' : 'Office Details'}
            </h3>
            
            <div className="space-y-4 text-sm text-slate-600 font-semibold">
              <div className="flex items-start space-x-3.5">
                <MapPin className="h-5.5 w-5.5 text-primary-600 shrink-0 mt-0.5" />
                <span>{t('office_address')}</span>
              </div>
              
              <div className="flex items-center space-x-3.5">
                <Phone className="h-5.5 w-5.5 text-primary-600 shrink-0" />
                <a href="tel:+919756535933" className="hover:text-primary-700 transition-colors">
                  +91 97565 35933
                </a>
              </div>

              <div className="flex items-center space-x-3.5">
                <Mail className="h-5.5 w-5.5 text-primary-600 shrink-0" />
                <a href="mailto:info@a1properties.com" className="hover:text-primary-700 transition-colors">
                  info@a1properties.com
                </a>
              </div>
            </div>
          </div>

          {/* Mini Schedule Info */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 text-primary-800 font-bold text-sm">
              <Calendar className="h-4.5 w-4.5 text-primary-600" />
              <span>{t('office_hours_title')}</span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed font-semibold">
              {t('office_hours_desc')}
            </p>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </section>

      {/* Map Embed */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-md">
          <div className="relative h-96 w-full rounded-2xl overflow-hidden bg-slate-100">
            <iframe
              title="Agra Office Map"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              src={embedUrl}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-black tracking-widest text-primary-700 uppercase">
            {language === 'hi' ? 'सामान्य प्रश्न' : 'Common Queries'}
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-dark-900">
            {language === 'hi' ? 'अक्सर पूछे जाने वाले सवाल (FAQ)' : 'Frequently Asked Questions'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-2">
              <h4 className="font-bold text-dark-900 text-sm md:text-base flex items-start space-x-2">
                <MessageSquare className="h-5 w-5 text-primary-600 shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed pl-7">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ContactClientContent;
