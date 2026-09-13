import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import { AuthProvider } from '../context/AuthContext';
import { LanguageProvider } from '../context/LanguageContext';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Properties in Agra | Real Estate Consultant & Property Dealer - A1 Properties',
    template: '%s | A1 Properties Agra'
  },
  description: 'Looking for properties in Agra? Find verified independent houses, residential plots, duplex villas, commercial office spaces & industrial warehouses for sale and rent in Sanjay Place, Avas Vikas, Shastripuram, Dayalbagh & Fatehabad Road.',
  keywords: [
    'properties in agra',
    'property in agra',
    'property dealer in agra',
    'real estate in agra',
    'buy property in agra',
    'house for sale in agra',
    'plots in agra',
    'duplex villa in agra',
    'commercial space in sanjay place agra',
    'avas vikas agra property',
    'shastripuram agra property',
    'dayalbagh agra property',
    'a1 properties agra',
    'vishal verma property consultant agra'
  ],
  authors: [{ name: 'Vishal Verma', url: 'https://a1properties-frontend.onrender.com' }],
  creator: 'A1 Properties Agra',
  publisher: 'A1 Properties Agra',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://a1properties-frontend.onrender.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Properties in Agra | A1 Properties - Trusted Real Estate Consultant',
    description: 'Explore verified residential and commercial properties in Agra with clear legal title, ADA approval, and registry assistance. Sanjay Place, Agra.',
    url: 'https://a1properties-frontend.onrender.com',
    siteName: 'A1 Properties Agra',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Properties in Agra | A1 Properties Agra',
    description: 'Find verified houses, plots, and commercial properties in Agra. Consult Mr. Vishal Verma.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const globalRealEstateSchema = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  'name': 'A1 Properties',
  'alternateName': 'A1 Properties Agra Real Estate Consultant',
  'image': 'https://a1properties-frontend.onrender.com/images/vishal-verma.png',
  '@id': 'https://a1properties-frontend.onrender.com/#realestateagent',
  'url': 'https://a1properties-frontend.onrender.com',
  'telephone': '+919756535933',
  'email': 'a1.properties.vishalverma@gmail.com',
  'priceRange': '₹₹ - ₹₹₹₹',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'Sanjay Place',
    'addressLocality': 'Agra',
    'addressRegion': 'Uttar Pradesh',
    'postalCode': '282002',
    'addressCountry': 'IN'
  },
  'geo': {
    '@type': 'GeoCoordinates',
    'latitude': 27.2001,
    'longitude': 78.0081
  },
  'openingHoursSpecification': {
    '@type': 'OpeningHoursSpecification',
    'dayOfWeek': [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ],
    'opens': '09:00',
    'closes': '21:00'
  },
  'founder': {
    '@type': 'Person',
    'name': 'Vishal Verma',
    'jobTitle': 'Founder & Senior Property Consultant',
    'telephone': '+919756535933'
  },
  'areaServed': [
    { '@type': 'AdministrativeArea', 'name': 'Agra' },
    { '@type': 'AdministrativeArea', 'name': 'Sanjay Place, Agra' },
    { '@type': 'AdministrativeArea', 'name': 'Avas Vikas Colony, Agra' },
    { '@type': 'AdministrativeArea', 'name': 'Shastripuram, Agra' },
    { '@type': 'AdministrativeArea', 'name': 'Dayalbagh, Agra' },
    { '@type': 'AdministrativeArea', 'name': 'Kamla Nagar, Agra' },
    { '@type': 'AdministrativeArea', 'name': 'Fatehabad Road, Agra' },
    { '@type': 'AdministrativeArea', 'name': 'Kuberpur, Agra' }
  ],
  'description': 'Premier property dealer and real estate consultant in Agra specializing in residential houses, villas, plots, commercial offices in Sanjay Place, and industrial warehouses.'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalRealEstateSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans">
        <LanguageProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
