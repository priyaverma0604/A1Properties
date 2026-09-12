'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, Landmark, MapPin, Scale, ShieldCheck, UserCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const AboutClientContent: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="bg-slate-50 py-16 space-y-20">
      
      {/* 1. Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs font-black tracking-widest text-primary-700 uppercase">
          {language === 'hi' ? 'भरोसेमंद स्थानीय रियल एस्टेट पार्टनर' : 'Trusted Local Partner'}
        </span>
        <h1 className="text-3xl font-extrabold text-dark-900 md:text-5xl leading-tight">
          {language === 'hi'
            ? 'आगरा में 15+ वर्षों का अटूट विश्वास और पारदर्शी सौदे'
            : 'Over 15 Years of Real Estate Trust in Agra'}
        </h1>
        <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          {language === 'hi'
            ? 'हम परिवारों, निवेशकों और व्यापारियों को आगरा भर में स्पष्ट रजिस्ट्री वाले आवासीय प्लॉट, मकान, विला और कमर्शियल संपत्तियां प्राप्त करने में मार्गदर्शन करते हैं।'
            : 'We guide families, investors, and businesses to safe, clear-titled residential plots, luxury flats, and commercial shops across the Taj City.'}
        </p>
      </section>

      {/* 2. Visual Split & Narrative */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 relative h-[450px] w-full rounded-3xl overflow-hidden shadow-xl border border-slate-100">
          <Image
            src="/images/vishal-verma.png"
            alt="Mr. Vishal Verma Property Consultant"
            fill
            className="object-cover"
          />
        </div>

        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-dark-900">{t('founder_name')}</h2>
          <p className="text-xs text-primary-700 font-bold uppercase tracking-wider -mt-4">{t('founder_role')}</p>
          
          <p className="text-slate-600 text-sm leading-relaxed">
            {language === 'hi'
              ? 'संजय प्लेस, आगरा में स्थानीय प्रॉपर्टी कंसल्टेंसी की शुरुआत करते हुए, मिस्टर विशाल वर्मा ने पूर्ण सत्यता और कानूनी पारदर्शिता के लिए प्रतिष्ठा स्थापित की। पिछले डेढ़ दशक में, उन्होंने सैकड़ों परिवारों को दयालबाग, शास्त्रीपुरम, आवास विकास और फतेहाबाद रोड पर स्पष्ट रजिस्ट्री वाली प्रॉपर्टीज दिलाने में मदद की है।'
              : 'Starting as a local property dealer in Sanjay Place, Mr. Vishal Verma established a reputation for absolute truthfulness and registry compliance. Over the last decade and a half, he has helped hundreds of Agra families acquire clear residential plots, build villas, and set up commercial facilities.'}
          </p>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xs space-y-2">
            <p className="text-slate-700 text-sm leading-relaxed italic">
              {language === 'hi'
                ? '“मेरा सिद्धांत बहुत सीधा है: मैं हर ग्राहक के पैसे को अपना पैसा समझता हूं। मैं व्यक्तिगत रूप से हर सीमा रेखा का निरीक्षण करता हूं, 30 साल की रजिस्ट्री चेन पढ़ता हूं, बिजली-पानी की व्यवस्था जांचता हूं, और सब-रजिस्ट्रार कार्यालय में रजिस्ट्री के समय स्वयं उपस्थित रहता हूं। रियल एस्टेट विश्वास और रिश्तों का काम है।”'
                : '“My philosophy is simple: I treat every buyer\'s money as my own. I personally inspect every boundary wall, read the registry deeds from 30-year chains, verify electricity feasibility, and stand next to the client at the Sub-Registrar\'s Office during signature verification. Real estate is about relationships, not speed.”'}
            </p>
            <span className="block text-xs font-bold text-primary-700">— {t('founder_name')}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 text-sm text-dark-900 font-bold">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-primary-600 shrink-0" />
              <span>{language === 'hi' ? 'संजय प्लेस कार्यालय' : 'Sanjay Place Office'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <UserCheck className="h-5 w-5 text-primary-600 shrink-0" />
              <span>{language === 'hi' ? 'सीधा व्यक्तिगत परामर्श' : 'Direct Consultations'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values Grid */}
      <section className="bg-slate-100/50 py-16 border-y border-slate-200/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-black tracking-widest text-primary-700 uppercase">
              {language === 'hi' ? 'नैतिक मूल्य' : 'Ethical Values'}
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-dark-900">
              {language === 'hi' ? 'हमारी कार्यप्रणाली' : 'How We Stand Apart'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Title Clearances */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-sm space-y-3.5">
              <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center text-primary-700">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-dark-900 text-base">
                {language === 'hi' ? 'सत्यापित टाइटल चेन' : 'Verified Title Chains'}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                {language === 'hi'
                  ? 'हम किसी भी विवादित प्रॉपर्टी में सौदा नहीं करते। हम केवल वही संपत्तियां दिखाते हैं जिनकी 30 साल की रजिस्ट्री और दाखिल खारिज पूर्णतः स्पष्ट हो।'
                  : 'We refuse to deal in disputed property. We thoroughly trace registry chains, mutation certificates, and municipal tax logs before adding any property to our list.'}
              </p>
            </div>

            {/* Direct negotiation */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-sm space-y-3.5">
              <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center text-primary-700">
                <Scale className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-dark-900 text-base">
                {language === 'hi' ? 'पारदर्शी व निष्पक्ष मूल्य' : 'Fair & Open Pricing'}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                {language === 'hi'
                  ? 'कोई छिपा हुआ शुल्क नहीं। हम खरीदार और विक्रेता को सीधे आमने-सामने बिठाकर पारदर्शी बातचीत कराते हैं।'
                  : 'No hidden markups or back-channel fees. We connect buyers directly with property owners, facilitating clear, open negotiations.'}
              </p>
            </div>

            {/* UP Registry Facilitation */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-sm space-y-3.5">
              <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center text-primary-700">
                <Landmark className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-dark-900 text-base">
                {language === 'hi' ? 'उत्तर प्रदेश रजिस्ट्री विशेषज्ञ' : 'IGRSUP Registration Experts'}
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                {language === 'hi'
                  ? 'हम ऑनलाइन स्लॉट बुकिंग, स्टांप शुल्क की गणना, ड्राफ्ट तैयार करने और बायोमेट्रिक सत्यापन में पूरी सहायता करते हैं।'
                  : 'We take care of the entire online appointment process, stamp paper purchases, deed formatting, and sub-registrar filings in Agra.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Locality Expertise */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-center">
        <div className="space-y-2">
          <span className="text-xs font-black tracking-widest text-primary-700 uppercase">
            {language === 'hi' ? 'आगरा के प्रमुख क्षेत्र' : 'Geographical Focus'}
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-dark-900">
            {language === 'hi' ? 'विशेषज्ञता वाले इलाके' : 'Agra Areas of Specialization'}
          </h2>
          <p className="text-slate-500 text-sm max-w-lg mx-auto">
            {language === 'hi'
              ? 'हम आगरा के प्रमुख रिहायशी और व्यावसायिक क्षेत्रों का अद्यतन रिकॉर्ड रखते हैं।'
              : 'We hold micro-market database records for several prime Agra localities.'}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-bold text-dark-900">
          {[
            { name: language === 'hi' ? 'आवास विकास' : 'Avas Vikas', desc: language === 'hi' ? 'पार्क फेसिंग स्वतंत्र मकान' : 'Park Facing Independent Houses' },
            { name: language === 'hi' ? 'शास्त्रीपुरम' : 'Shastripuram', desc: language === 'hi' ? 'गेटेड सोसाइटी डुप्लेक्स विला' : 'Gated Society Duplex Villas' },
            { name: language === 'hi' ? 'कुबेरपुर (कानपुर हाईवे)' : 'Kuberpur (Kanpur Highway)', desc: language === 'hi' ? 'औद्योगिक वेयरहाउस व शेड' : 'Industrial Warehouses & Sheds' },
            { name: language === 'hi' ? 'बमरौली कटारा (फतेहाबाद रोड)' : 'Bamrauli Katara (Fatehabad Rd)', desc: language === 'hi' ? 'कॉलेज कैंपस व बड़े संस्थान' : 'Approved College Campuses' }
          ].map((area) => (
            <div key={area.name} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-center space-y-1">
              <span className="block text-primary-700 font-extrabold">{area.name}</span>
              <span className="block text-[11px] text-slate-400 font-semibold uppercase tracking-wider">{area.desc}</span>
            </div>
          ))}
        </div>

        <div className="pt-10">
          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-700 to-primary-850 hover:from-primary-800 hover:to-primary-950 text-white font-bold px-8 py-3.5 rounded-xl text-sm shadow-md cursor-pointer"
          >
            <span>
              {language === 'hi'
                ? 'मिस्टर विशाल वर्मा से परामर्श बुक करें'
                : 'Book Consultation With Mr. Vishal Verma'}
            </span>
            <Award className="h-4.5 w-4.5" />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default AboutClientContent;
