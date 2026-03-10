import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const SITE_URL = 'https://scoopo.com.au';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#00b4d8',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'ScooPo – Professional Pet Waste Removal & Cat Litter Cleaning | Melbourne',
    template: '%s | ScooPo',
  },
  description:
    "Melbourne's only pet cleaning service that scoops, removes waste AND vacuums. Serving Box Hill, Blackburn & surrounds. Cat litter cleaning, sanitization & deodorizing from $10/visit.",
  keywords: [
    'pet waste removal Melbourne',
    'cat litter cleaning Melbourne',
    'cat litter box cleaning service',
    'pet poop scooping Melbourne',
    'pet cleaning service Box Hill',
    'pet cleaning service Blackburn',
    'cat waste removal',
    'pet hygiene service',
    'ScooPo',
    '猫砂清理',
    '宠物清洁服务墨尔本',
  ],
  authors: [{ name: 'ScooPo' }],
  creator: 'ScooPo',
  publisher: 'ScooPo',
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
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: SITE_URL,
    siteName: 'ScooPo',
    title: 'ScooPo – Professional Pet Waste Removal & Cat Litter Cleaning | Melbourne',
    description:
      "Melbourne's only pet cleaning service that scoops, removes waste AND vacuums. Cat litter cleaning, sanitization & deodorizing from $10/visit.",
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'ScooPo Logo – Pet Waste Removal Melbourne',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'ScooPo – Pet Waste Removal & Cat Litter Cleaning | Melbourne',
    description:
      "Melbourne's only service that scoops, removes waste AND vacuums. From $10/visit.",
    images: ['/logo.png'],
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: '/favicon.png',
    apple: '/logo.png',
  },
};

// JSON-LD Structured Data for LocalBusiness
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'ScooPo',
  description:
    'Professional pet waste removal, cat litter cleaning, sanitization and vacuuming service in Melbourne.',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/logo.png`,
  telephone: '',
  areaServed: {
    '@type': 'City',
    name: 'Melbourne',
    containedInPlace: {
      '@type': 'State',
      name: 'Victoria',
    },
  },
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: -37.8136,
      longitude: 145.0981,
    },
    geoRadius: '15000',
  },
  priceRange: '$10 - $20 per visit',
  currenciesAccepted: 'AUD',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Pet Cleaning Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Essential – Cat Litter Removal & Vacuum',
        },
        price: '10.00',
        priceCurrency: 'AUD',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Premium – Full Care with Food & Water Refill',
        },
        price: '15.00',
        priceCurrency: 'AUD',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Ultimate – Complete Hygiene Management',
        },
        price: '20.00',
        priceCurrency: 'AUD',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
