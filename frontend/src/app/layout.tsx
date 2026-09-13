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
  title: 'A1 Properties | Property Dealer & Consultant in Agra',
  description: 'Find premium residential flats, plots, houses, and commercial office spaces for sale or rent in Agra. Best investment locations and registry guidance.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://a1properties-frontend.onrender.com'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
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
