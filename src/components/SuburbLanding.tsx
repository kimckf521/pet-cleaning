'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { CheckCircle2, MapPin, Sparkles, ShieldCheck, Wind, Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CONTENT } from '@/content';

const SITE_URL = 'https://www.scooposervice.com';

export interface SuburbProps {
  name: string;
  slug: string;
  postcode: string;
  introEn: string;
  introCn: string;
  nearby: Array<{ name: string; slug: string }>;
}

function buildBreadcrumbJsonLd(name: string, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Service Areas', item: `${SITE_URL}/service-areas/${slug}` },
      { '@type': 'ListItem', position: 3, name, item: `${SITE_URL}/service-areas/${slug}` },
    ],
  };
}

function buildServiceJsonLd(name: string, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Pet Waste Removal & Cat Litter Cleaning',
    provider: { '@id': `${SITE_URL}/#localbusiness` },
    areaServed: {
      '@type': 'AdministrativeArea',
      name,
      containedInPlace: {
        '@type': 'City',
        name: 'Melbourne',
        containedInPlace: { '@type': 'State', name: 'Victoria' },
      },
    },
    name: `Pet Cleaning Service in ${name}`,
    description: `Professional cat litter cleaning, pet waste removal, sanitization and vacuuming for households in ${name}, Melbourne.`,
    url: `${SITE_URL}/service-areas/${slug}`,
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '10',
      highPrice: '20',
      priceCurrency: 'AUD',
    },
  };
}

function SuburbContent({ name, slug, postcode, introEn, introCn, nearby }: SuburbProps) {
  const [lang, setLang] = useState<'en' | 'cn'>('en');
  const searchParams = useSearchParams();

  useEffect(() => {
    const l = searchParams.get('lang');
    if (l === 'en' || l === 'cn') {
      setLang(l as 'en' | 'cn');
    }
  }, [searchParams]);

  const t = CONTENT[lang];
  const intro = lang === 'en' ? introEn : introCn;

  const checklistItems = lang === 'en'
    ? [
        'Complete litter box scoop and waste haul-away',
        'Vacuuming of scattered litter around the box area',
        'Pet-safe enzyme sanitizing spray',
        'Deodorizer to eliminate odors',
        'Photo confirmation of secured entry',
        'Stool anomaly monitoring (Premium / Ultimate)',
      ]
    : [
        '猫砂盆彻底清理，粪便带离',
        '猫砂盆周边区域吸尘',
        '对宠物安全的酶类消毒喷雾',
        '除臭处理，消除异味',
        '门禁锁好的照片确认',
        '排泄物异常监测（优享版 / 尊享版）',
      ];

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbJsonLd(name, slug)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildServiceJsonLd(name, slug)) }}
      />

      <Navbar lang={lang} setLang={setLang} t={t} />

      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-brand-blue text-sm font-bold rounded-full">
            <MapPin size={16} /> {name} VIC {postcode}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
            {lang === 'en' ? (
              <>Pet Waste Removal &amp; Cat Litter Cleaning in <span className="text-brand-blue">{name}</span></>
            ) : (
              <><span className="text-brand-blue">{name}</span> 宠物粪便清理与猫砂清洁服务</>
            )}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {intro}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/book"
              className="bg-brand-blue text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-cyan-600 transition-colors"
            >
              {lang === 'en' ? `Book a ${name} Visit` : `预约 ${name} 上门服务`}
            </Link>
            <Link
              href="/services"
              className="border-2 border-brand-blue text-brand-blue px-8 py-3 rounded-full font-bold hover:bg-brand-blue hover:text-white transition-colors"
            >
              {lang === 'en' ? 'See Our Services' : '查看我们的服务'}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {lang === 'en' ? `Why ${name} cat owners choose ScooPo` : `为什么 ${name} 的养猫家庭选择 ScooPo`}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-gray-50 text-center">
              <Sparkles className="w-10 h-10 text-brand-blue mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">{lang === 'en' ? 'Local & Reliable' : '本地可靠'}</h3>
              <p className="text-gray-600 text-sm">
                {lang === 'en'
                  ? `${name} sits within our core service radius. Same-week scheduling and consistent weekly visits.`
                  : `${name} 位于我们的核心服务范围内。可当周安排，每周稳定上门。`}
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 text-center">
              <Wind className="w-10 h-10 text-brand-blue mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">{lang === 'en' ? 'Scoop + Vacuum' : '清理 + 吸尘'}</h3>
              <p className="text-gray-600 text-sm">
                {lang === 'en'
                  ? "We're the only Melbourne service that scoops, hauls away waste AND vacuums scattered litter around the box."
                  : '我们是墨尔本唯一一家既清理、带走粪便，又会吸走猫砂盆周边散落猫砂的服务。'}
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-gray-50 text-center">
              <ShieldCheck className="w-10 h-10 text-brand-green mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">{lang === 'en' ? 'Pet-Safe Sanitizer' : '宠物安全消毒'}</h3>
              <p className="text-gray-600 text-sm">
                {lang === 'en'
                  ? "100% pet-safe enzyme deodorizers. No harsh chemicals around your cat's living space."
                  : '100% 对宠物安全的酶类除臭剂。猫咪生活空间周边不使用刺激性化学物质。'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {lang === 'en' ? `What's included in a ${name} visit` : `${name} 上门服务包含哪些内容`}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {checklistItems.map((item, i) => (
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
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {lang === 'en' ? `Pricing for ${name}` : `${name} 服务定价`}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {lang === 'en'
              ? `Same transparent pricing as the rest of our service area. No travel fees within ${name}.`
              : `与我们其他服务区域相同的透明定价。${name} 范围内无额外路费。`}
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-left">
            <div className="border rounded-2xl p-6 bg-gray-50">
              <h3 className="font-bold text-lg">{lang === 'en' ? 'Essential' : '基础版'}</h3>
              <p className="text-3xl font-extrabold text-brand-blue my-2">
                $10<span className="text-base font-medium text-gray-500">/visit</span>
              </p>
              <p className="text-sm text-gray-600">
                {lang === 'en' ? 'Scoop, haul-away & vacuum.' : '清理、带走粪便并吸尘。'}
              </p>
            </div>
            <div className="border-2 border-brand-blue rounded-2xl p-6 bg-white shadow">
              <h3 className="font-bold text-lg">{lang === 'en' ? 'Premium' : '优享版'}</h3>
              <p className="text-3xl font-extrabold text-brand-blue my-2">
                $15<span className="text-base font-medium text-gray-500">/visit</span>
              </p>
              <p className="text-sm text-gray-600">
                {lang === 'en' ? 'Essential + food & water refill.' : '基础版 + 添粮换水。'}
              </p>
            </div>
            <div className="border rounded-2xl p-6 bg-gray-50">
              <h3 className="font-bold text-lg">{lang === 'en' ? 'Ultimate' : '尊享版'}</h3>
              <p className="text-3xl font-extrabold text-brand-blue my-2">
                $20<span className="text-base font-medium text-gray-500">/visit</span>
              </p>
              <p className="text-sm text-gray-600">
                {lang === 'en' ? 'Premium + weekly box deep clean.' : '优享版 + 每周猫砂盆深度清洁。'}
              </p>
            </div>
          </div>
          <Link
            href="/book"
            className="inline-block mt-10 bg-brand-blue text-white px-10 py-4 rounded-full text-lg font-bold shadow-lg hover:bg-cyan-600 transition-colors"
          >
            {lang === 'en' ? `Book a ${name} Visit` : `预约 ${name} 上门服务`}
          </Link>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {lang === 'en' ? 'Nearby suburbs we service' : '附近的服务区域'}
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {nearby.map((n) => (
              <Link
                key={n.slug}
                href={`/service-areas/${n.slug}`}
                className="group p-5 rounded-2xl bg-white border border-gray-100 hover:border-brand-blue/40 hover:shadow transition-all"
              >
                <div className="text-xs font-bold uppercase tracking-wider text-brand-blue mb-1">
                  {lang === 'en' ? 'Service Area' : '服务区域'}
                </div>
                <div className="font-bold text-gray-900">
                  {lang === 'en' ? `${n.name} pet cleaning` : `${n.name} 宠物清洁`}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer t={t} lang={lang} />
    </main>
  );
}

export default function SuburbLanding(props: SuburbProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-brand-blue" />
        </div>
      }
    >
      <SuburbContent {...props} />
    </Suspense>
  );
}
