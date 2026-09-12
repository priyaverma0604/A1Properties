import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import StickyContact from '@/components/ui/StickyContact';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* Spacer to prevent content overlapping with fixed navbar */}
      <main className="flex-grow pt-[80px] md:pt-[90px]">{children}</main>
      <Footer />
      <StickyContact />
    </div>
  );
}
