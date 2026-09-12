'use client';

import React from 'react';
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
  MapPin
} from 'lucide-react';

interface HomeClientContentProps {
  featuredProperties: PropertyData[];
}

const HomeClientContent: React.FC<HomeClientContentProps> = ({ featuredProperties }) => {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-20 pb-16">
      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-b from-slate-100 via-emerald-50/20 to-slate-50 overflow-hidden py-24">
        {/* Background Image overlay - Light & Bright Luxury Daylight Villa */}
        <div className="absolute inset-0 z-0 opacity-25 pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=80"
            alt="Agra Premium Homes Background"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-slate-100/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-dark-900 space-y-8">
          <span className="inline-block bg-primary-50 border border-primary-200/80 text-primary-800 text-xs font-bold tracking-widest px-4.5 py-2 rounded-full uppercase shadow-sm animate-fade-in">
            {t('hero_badge')}
          </span>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight md:leading-none text-dark-900">
            {t('hero_title_prefix')}{' '}
            <span className="text-secondary-600">{t('hero_title_city')}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            {t('hero_subtitle')}
          </p>

          {/* Quick Trust Pillars */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-xs font-semibold text-slate-700">
            <span className="flex items-center space-x-1.5 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/90 shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{t('clear_titles')}</span>
            </span>
            <span className="flex items-center space-x-1.5 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/90 shadow-sm">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>{t('experience_years')}</span>
            </span>
            <span className="flex items-center space-x-1.5 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200/90 shadow-sm">
              <MapPin className="w-4 h-4 text-secondary-600" />
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
