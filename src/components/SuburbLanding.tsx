'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { CheckCircle2, MapPin, Sparkles, ShieldCheck, Wind, Loader2, Dog } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CONTENT } from '@/content';
import { DOG_BASE_PRICE, DOG_EXTRA_PET_FEE } from '@/lib/pricing';

const SITE_URL = 'https://www.scooposervice.com';

export interface SuburbProps {
  name: string;
  slug: string;
  postcode: string;
  introEn: string;
  introCn: string;
  nearby: Array<{ name: string; slug: string }>;
  offersDogService?: boolean;
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
      lowPrice: '28',
      highPrice: '42',
      priceCurrency: 'AUD',
    },
  };
}

function buildDogServiceJsonLd(name: string, slug: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Dog Waste Removal',
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
    name: `Dog Waste Removal in ${name}`,
    description: `Weekly dog yard waste removal for households in ${name}, Melbourne.`,
    url: `${SITE_URL}/service-areas/${slug}`,
    offers: {
      '@type': 'Offer',
      price: String(DOG_BASE_PRICE),
      priceCurrency: 'AUD',
    },
  };
}

function SuburbContent({ name, slug, postcode, introEn, introCn, nearby, offersDogService }: SuburbProps) {
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
    <main className="min-h-screen bg-cream text-gray-700">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbJsonLd(name, slug)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildServiceJsonLd(name, slug)) }}
      />
      {offersDogService && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildDogServiceJsonLd(name, slug)) }}
        />
      )}

      <Navbar lang={lang} setLang={setLang} t={t} />

      <section className="relative pt-32 pb-16 px-4 bg-gradient-to-b from-peach/40 via-coral-50 to-cream overflow-hidden">
        <span aria-hidden className="pointer-events-none select-none absolute top-28 left-[8%] text-5xl opacity-20 animate-float">🐾</span>
        <span aria-hidden className="pointer-events-none select-none absolute bottom-12 right-[10%] text-5xl opacity-20 animate-float" style={{ animationDelay: '1.5s' }}>🐾</span>
        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/70 text-coral-700 text-sm font-semibold rounded-full shadow-soft">
            <MapPin size={16} /> {name} VIC {postcode}
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-ink tracking-tight">
            {lang === 'en' ? (
              <>Pet Waste Removal &amp; Cat Litter Cleaning in <span className="text-coral">{name}</span></>
            ) : (
              <><span className="text-coral">{name}</span> 宠物粪便清理与猫砂清洁服务</>
            )}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {intro}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/book"
              className="bg-coral text-white px-8 py-3 rounded-full font-bold shadow-warm hover:bg-coral-600 hover:scale-105 transition-all"
            >
              {lang === 'en' ? `Book a ${name} Visit` : `预约 ${name} 上门服务`}
            </Link>
            <Link
              href="/services"
              className="border-2 border-coral text-coral px-8 py-3 rounded-full font-bold hover:bg-coral hover:text-white transition-all"
            >
              {lang === 'en' ? 'See Our Services' : '查看我们的服务'}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-ink text-center mb-12">
            {lang === 'en' ? `Why ${name} cat owners choose ScooPo` : `为什么 ${name} 的养猫家庭选择 ScooPo`}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white shadow-soft hover:shadow-warm hover:-translate-y-1 transition-all text-center">
              <div className="w-14 h-14 rounded-2xl bg-coral-100 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-7 h-7 text-coral" />
              </div>
              <h3 className="font-bold text-lg mb-2">{lang === 'en' ? 'Local & Reliable' : '本地可靠'}</h3>
              <p className="text-gray-600 text-sm">
                {lang === 'en'
                  ? `${name} sits within our core service radius. Same-week scheduling and consistent weekly visits.`
                  : `${name} 位于我们的核心服务范围内。可当周安排，每周稳定上门。`}
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white shadow-soft hover:shadow-warm hover:-translate-y-1 transition-all text-center">
              <div className="w-14 h-14 rounded-2xl bg-cyan-100 flex items-center justify-center mx-auto mb-4">
                <Wind className="w-7 h-7 text-brand-blue" />
              </div>
              <h3 className="font-bold text-lg mb-2">{lang === 'en' ? 'Scoop + Vacuum' : '清理 + 吸尘'}</h3>
              <p className="text-gray-600 text-sm">
                {lang === 'en'
                  ? "We're the only Melbourne service that scoops, hauls away waste AND vacuums scattered litter around the box."
                  : '我们是墨尔本唯一一家既清理、带走粪便，又会吸走猫砂盆周边散落猫砂的服务。'}
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-white shadow-soft hover:shadow-warm hover:-translate-y-1 transition-all text-center">
              <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-7 h-7 text-brand-green" />
              </div>
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

      <section className="py-20 bg-cream-dark">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-ink text-center mb-12">
            {lang === 'en' ? `What's included in a ${name} visit` : `${name} 上门服务包含哪些内容`}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {checklistItems.map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-white p-4 rounded-3xl shadow-soft border border-peach/40">
                <CheckCircle2 className="text-brand-green flex-shrink-0 mt-0.5" size={20} />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-ink mb-6">
            {lang === 'en' ? `Pricing for ${name}` : `${name} 服务定价`}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {lang === 'en'
              ? `Same transparent pricing as the rest of our service area. No travel fees within ${name}.`
              : `与我们其他服务区域相同的透明定价。${name} 范围内无额外路费。`}
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-left">
            <div className="border border-peach/40 rounded-3xl p-6 bg-white shadow-soft">
              <h3 className="font-bold text-lg">{lang === 'en' ? 'Essential' : '基础版'}</h3>
              <p className="text-3xl font-extrabold text-coral my-2">
                $28<span className="text-base font-medium text-gray-500">/visit</span>
              </p>
              <p className="text-sm text-gray-600">
                {lang === 'en' ? 'Scoop, haul-away & vacuum.' : '清理、带走粪便并吸尘。'}
              </p>
            </div>
            <div className="border-2 border-coral rounded-3xl p-6 bg-white shadow-warm">
              <h3 className="font-bold text-lg">{lang === 'en' ? 'Premium' : '优享版'}</h3>
              <p className="text-3xl font-extrabold text-coral my-2">
                $35<span className="text-base font-medium text-gray-500">/visit</span>
              </p>
              <p className="text-sm text-gray-600">
                {lang === 'en' ? 'Essential + food & water refill.' : '基础版 + 添粮换水。'}
              </p>
            </div>
            <div className="border border-peach/40 rounded-3xl p-6 bg-white shadow-soft">
              <h3 className="font-bold text-lg">{lang === 'en' ? 'Ultimate' : '尊享版'}</h3>
              <p className="text-3xl font-extrabold text-coral my-2">
                $42<span className="text-base font-medium text-gray-500">/visit</span>
              </p>
              <p className="text-sm text-gray-600">
                {lang === 'en' ? 'Premium + weekly box deep clean.' : '优享版 + 每周猫砂盆深度清洁。'}
              </p>
            </div>
          </div>
          <Link
            href="/book"
            className="inline-block mt-10 bg-coral text-white px-10 py-4 rounded-full text-lg font-bold shadow-warm hover:bg-coral-600 hover:scale-105 transition-all"
          >
            {lang === 'en' ? `Book a ${name} Visit` : `预约 ${name} 上门服务`}
          </Link>
        </div>
      </section>

      {offersDogService && (
        <section className="py-20 bg-gradient-to-b from-green-50 to-cream">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-green/10 text-brand-green text-xs font-bold uppercase tracking-wider rounded-full mb-4">
              {t.dogService.badge}
            </span>
            <h2 className="text-3xl font-bold text-ink mb-4 flex items-center justify-center gap-3">
              <Dog className="w-8 h-8 text-brand-green" />
              {t.dogService.name}
            </h2>
            <p className="text-lg text-gray-600 mb-8">{t.dogService.description}</p>
            <div className="inline-block border-2 border-brand-green rounded-3xl p-8 bg-white shadow-soft text-left">
              <p className="text-4xl font-extrabold text-brand-green mb-1">
                {t.dogService.price}
                <span className="text-base font-medium text-gray-500 ml-1">
                  ({t.dogService.extraFee})
                </span>
              </p>
              <ul className="mt-4 space-y-2">
                {t.dogService.features.map((f: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="text-brand-green flex-shrink-0 mt-0.5" size={18} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-sm text-gray-500 mt-6 italic">{t.dogService.areaNote}</p>
            <Link
              href={`/book?service=dog&lang=${lang}`}
              className="inline-block mt-6 bg-brand-green text-white px-10 py-4 rounded-full text-lg font-bold shadow-soft hover:bg-green-600 hover:scale-105 transition-all"
            >
              {t.dogService.cta}
            </Link>
          </div>
        </section>
      )}

      <section className="py-16 bg-cream-dark">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-ink mb-6 text-center">
            {lang === 'en' ? 'Nearby suburbs we service' : '附近的服务区域'}
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {nearby.map((n) => (
              <Link
                key={n.slug}
                href={`/service-areas/${n.slug}`}
                className="group p-5 rounded-3xl bg-white border border-peach/40 shadow-soft hover:border-coral/40 hover:shadow-warm hover:-translate-y-1 transition-all"
              >
                <div className="text-xs font-bold uppercase tracking-wider text-coral mb-1">
                  {lang === 'en' ? 'Service Area' : '服务区域'}
                </div>
                <div className="font-bold text-ink">
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
