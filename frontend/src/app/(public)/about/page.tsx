import React from 'react';
import type { Metadata } from 'next';
import AboutClientContent from '@/components/about/AboutClientContent';

export const metadata: Metadata = {
  title: 'About Us | Real Estate Broker & Consultant in Agra - Mr. Vishal Verma',
  description: 'Learn more about A1 Properties and Mr. Vishal Verma, a trusted local property consultant in Agra. Over 15 years facilitating transparent property registry deals.',
};

export default function AboutPage() {
  return <AboutClientContent />;
}
