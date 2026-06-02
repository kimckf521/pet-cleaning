'use client';

import React, { useState, Suspense } from 'react';
import { CheckCircle2, MapPin, Sparkles, ShieldCheck, Wind, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CONTENT } from '@/content';

const SITE_URL = 'https://www.scooposervice.com';

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Service Areas', item: `${SITE_URL}/service-areas/blackburn` },
    { '@type': 'ListItem', position: 3, name: 'Blackburn', item: `${SITE_URL}/service-areas/blackburn` },
  ],
};

const serviceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Pet Waste Removal & Cat Litter Cleaning',
  provider: { '@id': `${SITE_URL}/#localbusiness` },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Blackburn',
    containedInPlace: {
      '@type': 'City',
      name: 'Melbourne',
      containedInPlace: { '@type': 'State', name: 'Victoria' },
    },
  },
  name: 'Pet Cleaning Service in Blackburn',
  description:
    'Professional cat litter cleaning, pet waste removal, sanitization and vacuuming for households in Blackburn, Melbourne.',
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '10',
    highPrice: '20',
    priceCurrency: 'AUD',
  },
};

function BlackburnContent() {
  const [lang, setLang] = useState<'en' | 'cn'>('en');
  const t = CONTENT[lang];

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <Navbar lang={lang} setLang={setLang} t={t} />

      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-brand-blue text-sm font-bold rounded-full">
            <MapPin size={16} /> Service Area
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
            Pet Waste Removal & Cat Litter Cleaning in <span className="text-brand-blue">Blackburn</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trusted, eco-friendly cleaning visits for cat owners across Blackburn. We scoop, remove,
            sanitize and vacuum – from just $10 per visit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/book"
              className="bg-brand-blue text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-cyan-600 transition-colors"
            >
              Book a Blackburn Visit
            </Link>
            <Link
              href="/services"
              className="border-2 border-brand-blue text-brand-blue px-8 py-3 rounded-full font-bold hover:bg-brand-blue hover:text-white transition-colors"
            >
              See Our Services
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Blackburn cat owners choose ScooPo
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-gray-50 text-center">
              <Sparkles className="w-10 h-10 text-brand-blue mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">Local & Reliable</h3>
              <p className="text-gray-600 text-sm">
                Blackburn sits within our core service radius. Same-week scheduling and consistent
                weekly visits.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 text-center">
              <Wind className="w-10 h-10 text-brand-blue mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">Scoop + Vacuum</h3>
              <p className="text-gray-600 text-sm">
                We&apos;re the only Melbourne service that scoops, hauls away waste AND vacuums
                scattered litter around the box.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 text-center">
              <ShieldCheck className="w-10 h-10 text-brand-green mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">Pet-Safe Sanitizer</h3>
              <p className="text-gray-600 text-sm">
                100% pet-safe enzyme deodorizers. No harsh chemicals around your cat&apos;s living
                space.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            What&apos;s included in a Blackburn visit
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              'Complete litter box scoop and waste haul-away',
              'Vacuuming of scattered litter around the box area',
              'Pet-safe enzyme sanitizing spray',
              'Deodorizer to eliminate odors',
              'Photo confirmation of secured entry',
              'Stool anomaly monitoring (Premium / Ultimate)',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-sm">
                <CheckCircle2 className="text-brand-green flex-shrink-0 mt-0.5" size={20} />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Pricing for Blackburn</h2>
          <p className="text-lg text-gray-600 mb-8">
            Same transparent pricing as the rest of our service area. No travel fees within
            Blackburn.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-left">
            <div className="border rounded-2xl p-6 bg-gray-50">
              <h3 className="font-bold text-lg">Essential</h3>
              <p className="text-3xl font-extrabold text-brand-blue my-2">$10<span className="text-base font-medium text-gray-500">/visit</span></p>
              <p className="text-sm text-gray-600">Scoop, haul-away & vacuum.</p>
            </div>
            <div className="border-2 border-brand-blue rounded-2xl p-6 bg-white shadow">
              <h3 className="font-bold text-lg">Premium</h3>
              <p className="text-3xl font-extrabold text-brand-blue my-2">$15<span className="text-base font-medium text-gray-500">/visit</span></p>
              <p className="text-sm text-gray-600">Essential + food & water refill.</p>
            </div>
            <div className="border rounded-2xl p-6 bg-gray-50">
              <h3 className="font-bold text-lg">Ultimate</h3>
              <p className="text-3xl font-extrabold text-brand-blue my-2">$20<span className="text-base font-medium text-gray-500">/visit</span></p>
              <p className="text-sm text-gray-600">Premium + weekly box deep clean.</p>
            </div>
          </div>
          <Link
            href="/book"
            className="inline-block mt-10 bg-brand-blue text-white px-10 py-4 rounded-full text-lg font-bold shadow-lg hover:bg-cyan-600 transition-colors"
          >
            Book a Blackburn Visit
          </Link>
        </div>
      </section>

      <Footer t={t} lang={lang} />
    </main>
  );
}

export default function BlackburnPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-blue" />
      </div>
    }>
      <BlackburnContent />
    </Suspense>
  );
}
