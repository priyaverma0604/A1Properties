'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HeroSearch from '@/components/home/HeroSearch';
import ContactForm from '@/components/home/ContactForm';
import PropertyCard, { PropertyData } from '@/components/property/PropertyCard';
import { useLanguage } from '@/context/LanguageContext';
import {
  Building2,
  Award,
  Landmark,
  ShieldCheck,
  HeartHandshake,
  PhoneCall,
  ArrowRight,
  Star,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronDown,
  HelpCircle
} from 'lucide-react';

interface HomeClientContentProps {
  featuredProperties: PropertyData[];
}

const agraLocalities = [
  { name: 'Sanjay Place', tag: 'Commercial & Offices', count: '12+ Listings', query: 'Sanjay Place' },
  { name: 'Avas Vikas Colony', tag: 'Duplex & Houses', count: '18+ Listings', query: 'Avas Vikas' },
  { name: 'Shastripuram', tag: 'Gated Societies & Plots', count: '15+ Listings', query: 'Shastripuram' },
  { name: 'Dayalbagh', tag: 'Villas & Residential', count: '10+ Listings', query: 'Dayalbagh' },
  { name: 'Kamla Nagar', tag: 'Independent Houses', count: '8+ Listings', query: 'Kamla Nagar' },
  { name: 'Fatehabad Road', tag: 'Luxury & Commercial', count: '14+ Listings', query: 'Fatehabad Road' },
  { name: 'Kuberpur (NH-19)', tag: 'Warehouses & Industrial', count: '6+ Listings', query: 'Kuberpur' },
  { name: 'Sikandra', tag: 'Plots & Budget Homes', count: '9+ Listings', query: 'Sikandra' },
];

const faqs = [
  {
    qEn: 'Which are the best localities to buy residential property in Agra?',
    qHi: 'आगरा में आवासीय संपत्ति खरीदने के लिए सबसे अच्छे क्षेत्र कौन से हैं?',
    aEn: 'The most popular residential areas in Agra include Avas Vikas Colony (Sector 7 & 12), Shastripuram, Dayalbagh, and Kamla Nagar. These areas feature wide roads, 24-hour water supply, security, and close proximity to top schools and hospitals.',
    aHi: 'आगरा में आवास विकास कॉलोनी (सेक्टर 7 व 12), शास्त्रीपुरम, दयालबाग और कमला नगर सबसे प्रमुख आवासीय क्षेत्र हैं। यहां चौड़ी सड़कें, स्वच्छ पानी और स्कूल-अस्पताल की बेहतरीन सुविधाएं उपलब्ध हैं।'
  },
  {
    qEn: 'What is the average circle rate for residential plots in Agra?',
    qHi: 'आगरा में आवासीय प्लॉट का औसत सर्किल रेट क्या है?',
    aEn: 'Circle rates in Agra vary by micro-market: Avas Vikas (₹35,000–₹55,000/sq.yd), Shastripuram (₹40,000–₹60,000/sq.yd), Dayalbagh (₹30,000–₹50,000/sq.yd), and Sanjay Place commercial rates start from ₹1,50,000/sq.yd. A1 Properties assists with government circle rate valuation and stamp duty calculation.',
    aHi: 'आगरा में आवास विकास में ₹35,000–₹55,000/गज, शास्त्रीपुरम में ₹40,000–₹60,000/गज और संजय प्लेस में कमर्शियल दरें ₹1,50,000/गज से शुरू होती हैं। ए1 प्रॉपर्टीज सर्किल रेट व स्टांप शुल्क में पूरी सहायता प्रदान करता है।'
  },
  {
    qEn: 'How can I verify ADA approval and registry documents before buying?',
    qHi: 'संपत्ति खरीदने से पहले एडीए (ADA) अप्रूवल और रजिस्ट्री दस्तावेजों की जांच कैसे करें?',
    aEn: 'Our senior consultant Mr. Vishal Verma conducts rigorous legal title verification, including ADA approval check, 30-year non-encumbrance certificate, registry verification, and mutation (dakhil kharij) records before recommending any property.',
    aHi: 'हमारे वरिष्ठ कंसल्टेंट श्री विशाल वर्मा हर प्रॉपर्टी का एडीए अप्रूवल, 30 साल की भारमुक्त (Non-encumbrance) जांच, रजिस्ट्री और दाखिल-खारिज रिकॉर्ड सत्यापित करने के बाद ही डील करवाते हैं।'
  },
  {
    qEn: 'Are commercial offices and industrial warehouses available for rent in Agra?',
    qHi: 'क्या आगरा में कमर्शियल ऑफिस और वेयरहाउस किराये पर उपलब्ध हैं?',
    aEn: 'Yes, A1 Properties has verified prime office spaces in Sanjay Place (Civil Lines) and high-ceiling industrial warehouses/sheds on Kanpur-Agra Highway (Kuberpur) with direct 3-phase electricity and water connections included.',
    aHi: 'जी हाँ, हमारे पास संजय प्लेस में प्रीमियम ऑफिस स्पेस और कुबेरपुर (कानपुर-आगरा हाईवे) पर बिजली-पानी कनेक्शन सहित इंडस्ट्रियल वेयरहाउस व शेड किराये पर उपलब्ध हैं।'
  }
];

const HomeClientContent: React.FC<HomeClientContentProps> = ({ featuredProperties }) => {
  const { t, language } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map((faq) => ({
      '@type': 'Question',
      'name': language === 'hi' ? faq.qHi : faq.qEn,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': language === 'hi' ? faq.aHi : faq.aEn
      }
    }))
  };

  return (
    <div className="space-y-20 pb-16">
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-dark-950 overflow-hidden py-24">
        {/* Background Image overlay - House clearly visible with soft light overlay */}
        <div className="absolute inset-0 z-0 opacity-65">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
            alt="Agra Premium Homes Background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950/85 via-dark-900/40 to-dark-900/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white space-y-8">
          <span className="inline-block bg-primary-600/40 border border-primary-400/50 text-primary-100 text-xs font-bold tracking-widest px-4.5 py-2 rounded-full uppercase backdrop-blur-sm shadow-sm animate-fade-in">
            {t('hero_badge')}
          </span>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight md:leading-none drop-shadow-md">
            {t('hero_title_prefix')}{' '}
            <span className="text-secondary-500 drop-shadow-md">{t('hero_title_city')}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-200 max-w-2xl mx-auto font-light drop-shadow-sm">
            {t('hero_subtitle')}
          </p>

          {/* Quick Trust Pillars */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-xs font-semibold text-slate-100">
            <span className="flex items-center space-x-1.5 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{t('clear_titles')}</span>
            </span>
            <span className="flex items-center space-x-1.5 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-sm">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>{t('experience_years')}</span>
            </span>
            <span className="flex items-center space-x-1.5 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-sm">
              <MapPin className="w-4 h-4 text-secondary-400" />
              <span>{t('local_expertise')}</span>
            </span>
          </div>

          {/* Search Component */}
          <div className="pt-4 w-full">
            <HeroSearch />
          </div>
        </div>
      </section>

      {/* 2. Featured Properties */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div className="space-y-2">
            <span className="text-xs font-black tracking-widest text-primary-700 uppercase">
              {t('featured_listings_tag')}
            </span>
            <h2 className="text-3xl font-extrabold text-dark-900">{t('featured_listings')}</h2>
            <p className="text-slate-500 text-sm max-w-lg">{t('featured_listings_desc')}</p>
          </div>
          <Link
            href="/properties"
            className="inline-flex items-center space-x-1.5 text-primary-700 hover:text-primary-850 font-bold text-sm mt-4 md:mt-0 group cursor-pointer"
          >
            <span>{t('view_all_properties')}</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>
      </section>

      {/* 2.5 Explore Properties in Top Agra Localities (SEO Hub) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-black tracking-widest text-primary-700 uppercase">
            {language === 'hi' ? 'आगरा के प्रमुख इलाके' : 'Agra Micro-Markets'}
          </span>
          <h2 className="text-3xl font-extrabold text-dark-900">
            {language === 'hi' ? 'आगरा के शीर्ष क्षेत्रों में प्रॉपर्टी देखें' : 'Explore Properties in Top Agra Localities'}
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            {language === 'hi' 
              ? 'संजय प्लेस, आवास विकास, शास्त्रीपुरम और दयालबाग में सत्यापित मकान, प्लॉट और दुकानें।'
              : 'Verified independent houses, residential plots, and commercial spaces across prime Agra hubs.'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {agraLocalities.map((loc, idx) => (
            <Link
              key={idx}
              href={`/properties?search=${encodeURIComponent(loc.query)}`}
              className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-xs hover:shadow-md hover:border-primary-500 transition-all group block"
            >
              <div className="flex items-center space-x-2 text-primary-700 mb-1">
                <MapPin className="h-4 w-4 shrink-0 group-hover:scale-110 transition-transform" />
                <h3 className="font-bold text-dark-900 text-sm group-hover:text-primary-700 transition-colors">
                  {loc.name}
                </h3>
              </div>
              <p className="text-xs text-slate-500 pl-6">{loc.tag}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Services */}
      <section className="bg-slate-100/60 py-20 border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-black tracking-widest text-primary-700 uppercase">
              {t('services_tag')}
            </span>
            <h2 className="text-3xl font-extrabold text-dark-900">{t('services_title')}</h2>
            <p className="text-slate-500 text-sm max-w-xl mx-auto">{t('services_desc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Buying Service */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/40 shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-dark-900">{t('service_1_title')}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {t('service_1_desc')}
              </p>
            </div>

            {/* Registry Service */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/40 shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600">
                <Landmark className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-dark-900">{t('service_2_title')}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {t('service_2_desc')}
              </p>
            </div>

            {/* Investment Consulting */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200/40 shadow-sm hover:shadow-md transition-shadow space-y-4">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-dark-900">{t('service_3_title')}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {t('service_3_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs font-black tracking-widest text-primary-700 uppercase">
            {t('why_us_tag')}
          </span>
          <h2 className="text-3xl font-extrabold text-dark-900">{t('why_us_title')}</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            {t('why_us_desc')}
          </p>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg shrink-0 mt-0.5">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-dark-900 text-sm">{t('why_point_1_title')}</h4>
                <p className="text-slate-500 text-xs">{t('why_point_1_desc')}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg shrink-0 mt-0.5">
                <HeartHandshake className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-dark-900 text-sm">{t('why_point_2_title')}</h4>
                <p className="text-slate-500 text-xs">{t('why_point_2_desc')}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg shrink-0 mt-0.5">
                <Landmark className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-dark-900 text-sm">{t('why_point_3_title')}</h4>
                <p className="text-slate-500 text-xs">{t('why_point_3_desc')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 relative h-[450px] w-full rounded-3xl overflow-hidden shadow-lg border border-slate-200">
          <Image
            src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80"
            alt="Verify Real Estate Property"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* 5. Testimonials */}
      <section className="bg-dark-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-black tracking-widest text-primary-400 uppercase">
              {t('testimonials_tag')}
            </span>
            <h2 className="text-3xl font-extrabold">{t('testimonials_title')}</h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">{t('testimonials_desc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-dark-800 p-8 rounded-2xl space-y-4 border border-slate-800">
              <div className="flex text-amber-500 space-x-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-500" />)}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed italic">
                {language === 'hi'
                  ? '"कमला नगर में साफ पानी और स्पष्ट रजिस्ट्री वाला मकान मिलना मुश्किल था। विशाल वर्मा जी ने हमें शानदार घर दिलवाया और 10 दिनों में रजिस्ट्री का काम पूरा कराया!"'
                  : '"Finding a house with clear water supply in Kamla Nagar was tough. Mr. Vishal Verma found us a beautiful house and helped finalize registry documentation in just 10 days!"'}
              </p>
              <div>
                <h4 className="font-bold text-sm text-white">Ramesh Chandra Sharma</h4>
                <span className="text-xs text-slate-500">Kamla Nagar, Agra</span>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-dark-800 p-8 rounded-2xl space-y-4 border border-slate-800">
              <div className="flex text-amber-500 space-x-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-500" />)}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed italic">
                {language === 'hi'
                  ? '"संजय प्लेस में ऑफिस स्पेस और कुबेरपुर में वेयरहाउस की लीज के लिए इनसे सलाह ली। बहुत ही पेशेवर और निष्पक्ष ब्रोकरेज सेवा मिली।"'
                  : '"We were looking for a commercial workspace and warehouse lease. They managed negotiations perfectly with absolute transparency."'}
              </p>
              <div>
                <h4 className="font-bold text-sm text-white">Anoop Singhal</h4>
                <span className="text-xs text-slate-500">Director, Singhal FinCorp</span>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-dark-800 p-8 rounded-2xl space-y-4 border border-slate-800">
              <div className="flex text-amber-500 space-x-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-500" />)}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed italic">
                {language === 'hi'
                  ? '"शास्त्रीपुरम में डुप्लेक्स विला खरीदा। पूरी टीम ने सर्किल रेट, दाखिल खारिज और स्टांप पेपर में पूरी सहायता की। विश्वसनीय कंसल्टेंट!"'
                  : '"Purchased a duplex villa in Shastripuram. The team guided us with circle rates, registry stamp papers, and mutation certificate filing. Highly recommended!"'}
              </p>
              <div>
                <h4 className="font-bold text-sm text-white">Dr. Kirti Saxena</h4>
                <span className="text-xs text-slate-500">Dayalbagh, Agra</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5.5 Real Estate in Agra - FAQs (SEO Rich Snippets) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-black tracking-widest text-primary-700 uppercase">
            {language === 'hi' ? 'अक्सर पूछे जाने वाले सवाल' : 'Frequently Asked Questions'}
          </span>
          <h2 className="text-3xl font-extrabold text-dark-900">
            {language === 'hi' ? 'आगरा रियल एस्टेट से जुड़े सवाल और जवाब' : 'Buying & Selling Properties in Agra - FAQ'}
          </h2>
          <p className="text-slate-500 text-sm">
            {language === 'hi' 
              ? 'आगरा में प्रॉपर्टी खरीदने, सर्किल रेट और रजिस्ट्री से जुड़े आपके सभी सवालों के जवाब।' 
              : 'Everything you need to know about Agra property rates, registry legalities, and prime localities.'}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200/70 overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full text-left p-5 flex items-center justify-between space-x-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                >
                  <span className="font-bold text-dark-900 text-sm md:text-base flex items-center space-x-2.5">
                    <HelpCircle className="h-4.5 w-4.5 text-primary-600 shrink-0" />
                    <span>{language === 'hi' ? faq.qHi : faq.qEn}</span>
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-primary-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                    {language === 'hi' ? faq.aHi : faq.aEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. About Broker - Mr. Vishal Verma */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 relative h-[420px] w-full rounded-3xl overflow-hidden shadow-xl border border-slate-100">
          <Image
            src="/images/vishal-verma.png"
            alt="Mr. Vishal Verma - Property Consultant Agra"
            fill
            className="object-cover"
          />
        </div>

        <div className="lg:col-span-7 space-y-5">
          <span className="text-xs font-black tracking-widest text-primary-700 uppercase">
            {t('founder_tag')}
          </span>
          <h2 className="text-3xl font-extrabold text-dark-900">{t('founder_title')}</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            {t('founder_desc')}
          </p>
          <div className="flex items-center space-x-4 pt-2">
            <div>
              <h4 className="font-bold text-dark-900 text-lg">{t('founder_name')}</h4>
              <p className="text-xs text-primary-700 font-bold uppercase tracking-wider">{t('founder_role')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Sell Property Banner CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-primary-850 to-primary-700 text-white rounded-3xl p-8 md:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-3xl font-extrabold">{t('sell_banner_title')}</h2>
            <p className="text-slate-200 text-sm leading-relaxed">
              {t('sell_banner_desc')}
            </p>
          </div>
          <Link
            href="/sell"
            className="bg-white hover:bg-slate-100 text-primary-850 font-bold px-8 py-4 rounded-xl text-sm tracking-wider uppercase shadow-md transition-all active:scale-95 shrink-0 cursor-pointer"
          >
            {t('sell_banner_btn')}
          </Link>
        </div>
      </section>

      {/* 8. Quick Contact Form */}
      <section id="contact-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-6">
          <span className="text-xs font-black tracking-widest text-primary-700 uppercase">
            {t('contact_tag')}
          </span>
          <h2 className="text-3xl font-extrabold text-dark-900">{t('contact_title')}</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            {t('contact_desc')}
          </p>

          <div className="space-y-4 font-semibold text-slate-600 text-sm">
            <div className="flex items-center space-x-3">
              <PhoneCall className="h-5 w-5 text-primary-600 shrink-0" />
              <span>{language === 'hi' ? 'कॉल करें: +91 97565 35933' : 'Call Us: +91 97565 35933'}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Landmark className="h-5 w-5 text-primary-600 shrink-0" />
              <span>{language === 'hi' ? 'कार्यालय: संजय प्लेस, आगरा' : 'Office: Sanjay Place, Agra'}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </section>
    </div>
  );
};

export default HomeClientContent;
