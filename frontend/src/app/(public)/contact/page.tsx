import React from 'react';
import type { Metadata } from 'next';
import ContactClientContent from '@/components/contact/ContactClientContent';

export const metadata: Metadata = {
  title: 'Contact Us | A1 Properties - Mr. Vishal Verma, Sanjay Place Agra',
  description: 'Get in touch with Mr. Vishal Verma. Visit our office in Sanjay Place, Agra, or call us for transparent property deals and circle registry support.',
};

export default function ContactPage() {
  return <ContactClientContent />;
}
