import { MetadataRoute } from 'next';

const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://a1properties-frontend.onrender.com').replace(/\/+$/, '');

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/admin/*',
        '/api/',
      ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
