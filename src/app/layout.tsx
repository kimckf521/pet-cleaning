import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SITE_URL } from '@/lib/constants';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#00b4d8',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Pet Waste Removal & Cat Litter Cleaning Melbourne | ScooPo',
    template: '%s | ScooPo',
  },
  description:
    'Pet waste removal & cat litter cleaning in Melbourne. Scoop, sanitize, deodorize & vacuum from $10/visit. Serving Box Hill, Blackburn & surrounds.',
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
    alternateLocale: ['zh_CN'],
    url: SITE_URL,
    siteName: 'ScooPo',
    title: 'Pet Waste Removal & Cat Litter Cleaning Melbourne | ScooPo',
    description:
      "Melbourne's only pet cleaning service that scoops, removes waste AND vacuums. Cat litter cleaning, sanitization & deodorizing from $10/visit.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pet Waste Removal & Cat Litter Cleaning Melbourne | ScooPo',
    description:
      "Melbourne's only pet cleaning service that scoops, removes waste AND vacuums. From $10/visit.",
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-AU': '/',
      'zh-CN': '/pricing-cn',
      'x-default': '/',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '400x400', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#localbusiness`,
  name: 'ScooPo',
  description:
    'Professional pet waste removal, cat litter cleaning, sanitization and vacuuming service in Melbourne. Serving Box Hill, Blackburn and surrounding suburbs.',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/opengraph-image`,
  areaServed: [
    {
      '@type': 'City',
      name: 'Melbourne',
      containedInPlace: { '@type': 'State', name: 'Victoria' },
    },
    { '@type': 'AdministrativeArea', name: 'Box Hill' },
    { '@type': 'AdministrativeArea', name: 'Blackburn' },
  ],
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
  paymentAccepted: 'Cash, Credit Card, Bank Transfer',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '20:00',
    },
  ],
  sameAs: [
    'https://www.facebook.com/share/1ArdBZ5Ft6/?mibextid=wwXIfr',
    'https://www.instagram.com/scoopoau',
    'https://www.tiktok.com/@scoopoau',
    'https://xhslink.com/m/64cpBmXeB5q',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Pet Cleaning Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Essential – Cat Litter Removal & Vacuum',
          provider: { '@id': `${SITE_URL}/#localbusiness` },
          areaServed: 'Melbourne',
        },
        price: '10.00',
        priceCurrency: 'AUD',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Premium – Full Care with Food & Water Refill',
          provider: { '@id': `${SITE_URL}/#localbusiness` },
          areaServed: 'Melbourne',
        },
        price: '15.00',
        priceCurrency: 'AUD',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Ultimate – Complete Hygiene Management',
          provider: { '@id': `${SITE_URL}/#localbusiness` },
          areaServed: 'Melbourne',
        },
        price: '20.00',
        priceCurrency: 'AUD',
      },
    ],
  },
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'ScooPo',
  description: 'Professional pet waste removal and cat litter cleaning in Melbourne.',
  publisher: { '@id': `${SITE_URL}/#localbusiness` },
  inLanguage: ['en-AU', 'zh-CN'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E182X95P9E"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-E182X95P9E');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
