import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

const SUBURB_SLUGS = [
  'box-hill',
  'blackburn',
  'mont-albert',
  'surrey-hills',
  'doncaster',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/book`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/pricing-cn`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...SUBURB_SLUGS.map((slug) => ({
      url: `${SITE_URL}/service-areas/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
