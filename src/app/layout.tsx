import type { Metadata, Viewport } from 'next';
import { Inter, Fredoka } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SITE_URL, SERVICE_AREAS, SERVICE_AREA_FULL_EN } from '@/lib/constants';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fredoka',
  display: 'swap',
});

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
    "Cat litter cleaning & pet waste removal in Melbourne's eastern suburbs. We scoop, sanitize, deodorize & vacuum from $28/visit. No lock-in contracts.",
  keywords: [
    'pet waste removal Melbourne',
    'cat litter cleaning Melbourne',
    'cat litter cleaning service Melbourne',
    'cat litter box cleaning service',
    'pet poop scooping Melbourne',
    ...SERVICE_AREAS.map((s) => `pet cleaning service ${s.name}`),
    // Dog waste removal — pilot in Box Hill & Blackburn only
    'dog waste removal Box Hill',
    'dog waste removal Blackburn',
    'pooper scooper Box Hill',
    'pooper scooper Blackburn',
    'dog poo removal Box Hill',
    'dog poo removal Blackburn',
    'dog waste removal Melbourne eastern suburbs',
    'pooper scooper Melbourne eastern suburbs',
    'cat waste removal',
    'pet hygiene service',
    'ScooPo',
    // Chinese-language local search terms
    '猫砂清理',
    '宠物清洁服务墨尔本',
    '墨尔本上门喂猫',
    '上门铲屎 墨尔本',
    '墨尔本铲屎官',
    '墨尔本东区宠物服务',
    '博士山上门喂猫',
    '墨尔本宠物上门服务',
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
      "Melbourne's only pet cleaning service that scoops, removes waste AND vacuums. Cat litter cleaning, sanitization & deodorizing from $28/visit.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pet Waste Removal & Cat Litter Cleaning Melbourne | ScooPo',
    description:
      "Melbourne's only pet cleaning service that scoops, removes waste AND vacuums. From $28/visit.",
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
  description: `Professional pet waste removal, cat litter cleaning, sanitization and vacuuming service in Melbourne. Serving ${SERVICE_AREA_FULL_EN} and surrounding suburbs.`,
  url: SITE_URL,
  telephone: '+61415840168',
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/opengraph-image`,
  areaServed: [
    {
      '@type': 'City',
      name: 'Melbourne',
      containedInPlace: { '@type': 'State', name: 'Victoria' },
    },
    ...SERVICE_AREAS.map((s) => ({ '@type': 'AdministrativeArea', name: s.name })),
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
  priceRange: '$28 - $42 per visit',
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
        price: '28.00',
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
        price: '35.00',
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
        price: '42.00',
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
    <html lang="en" className={`${inter.variable} ${fredoka.variable}`}>
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
      <body className="antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
