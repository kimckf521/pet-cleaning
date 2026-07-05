'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Trash2, Wind, ShieldCheck, Check, X, Plus, Loader2, MapPin, ArrowRight, AlertCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CONTENT } from '@/content';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PricingCard from '@/components/PricingCard';
import { PlanKey } from '@/lib/pricing';
import { SERVICE_AREA_FULL_EN, SERVICE_AREA_FULL_CN } from '@/lib/constants';

const SITE_URL = 'https://www.scooposervice.com';
const MAX_ENQUIRY_MESSAGE_LENGTH = 1000;

const FAQS_EN = [
  {
    q: 'Which areas do you service in Melbourne?',
    a: `We currently serve ${SERVICE_AREA_FULL_EN} and the surrounding suburbs within about 15 km of Box Hill. If you're unsure whether we cover your address, send us a message and we'll confirm same-day.`,
  },
  {
    q: 'How often do you visit?',
    a: 'You can choose anywhere from 1 visit per week up to daily visits. Most customers go with 2–3 visits a week. Frequencies of 4+ visits get an automatic discount (5–10% off).',
  },
  {
    q: 'Do I need to be home during the visit?',
    a: 'No. We just need a reliable way to access your cat\'s litter area – a key, code or side gate. After every visit we send you a photo confirming the area is clean and the entry is secure.',
  },
  {
    q: 'What products do you use? Are they safe for my cat?',
    a: 'We only use pet-safe, biodegradable enzyme cleaners and deodorizers. No harsh chemicals, no fragrances that could irritate your cat – safe to use around food bowls and bedding.',
  },
  {
    q: 'Do you provide the cat litter?',
    a: 'No. To keep your cat on the litter they\'re used to, we use the supply you provide. Just make sure there\'s enough on hand before our visit.',
  },
  {
    q: 'Can I cancel or pause anytime?',
    a: 'Yes. There are no contracts. You can pause or cancel future visits at any time with 24 hours notice. Used visits aren\'t refundable.',
  },
  {
    q: 'What if I\'m not happy with a visit?',
    a: 'We have a satisfaction guarantee. Tell us within 24 hours with a photo and we\'ll come back and re-clean the area at no extra charge.',
  },
];

const FAQS_CN = [
  {
    q: '你们服务墨尔本的哪些区域？',
    a: `我们目前服务 ${SERVICE_AREA_FULL_CN} 以及 Box Hill 周边约 15 公里范围内的郊区。如果不确定您的地址是否在范围内，请发消息给我们，我们会当天确认。`,
  },
  {
    q: '可以多频繁上门？',
    a: '从每周 1 次到每天上门都可以。大多数客户选择每周 2–3 次。每周 4 次以上自动享受 5–10% 折扣。',
  },
  {
    q: '上门服务时我需要在家吗？',
    a: '不需要。我们只需要一个进入猫砂区域的方式 — 钥匙、密码或侧门。每次服务后我们会发送照片，确认区域已清洁且门已锁好。',
  },
  {
    q: '你们用什么产品？对猫安全吗？',
    a: '我们只使用对宠物安全的可降解酶清洁剂和除臭剂。不含刺激性化学物质，不含可能刺激猫咪的香精 — 在食盆和猫窝周围使用也很安全。',
  },
  {
    q: '你们提供猫砂吗？',
    a: '不提供。为了让您的猫继续使用它习惯的猫砂，我们会使用您准备的猫砂。请确保上门前家中有充足的猫砂。',
  },
  {
    q: '可以随时取消或暂停吗？',
    a: '可以。无需签约。提前 24 小时通知，可随时暂停或取消后续服务。已使用的服务费用不予退还。',
  },
  {
    q: '如果对某次服务不满意怎么办？',
    a: '我们提供满意保证。请在 24 小时内告知我们并附上照片，我们将免费重新清洁该区域。',
  },
];

const SUBURBS = [
  {
    slug: 'box-hill',
    name: 'Box Hill',
    nameCn: 'Box Hill',
    blurbEn: 'Weekly cat litter cleaning and pet waste removal across Box Hill, Box Hill North & Box Hill South.',
    blurbCn: '为 Box Hill、Box Hill North 和 Box Hill South 提供每周猫砂清理和宠物粪便清理服务。',
  },
  {
    slug: 'blackburn',
    name: 'Blackburn',
    nameCn: 'Blackburn',
    blurbEn: 'Reliable scoop, vacuum and sanitize visits for Blackburn cat owners. No contracts, no travel fees.',
    blurbCn: '为 Blackburn 养猫家庭提供可靠的清理、吸尘和消毒上门服务。无合约，无路费。',
  },
  {
    slug: 'mont-albert',
    name: 'Mont Albert',
    nameCn: 'Mont Albert',
    blurbEn: 'Leafy residential streets bordering Box Hill. Discreet drop-in cleaning, weekly from $10.',
    blurbCn: '紧邻 Box Hill 的安静住宅区。低调上门清洁，每周 $10 起。',
  },
  {
    slug: 'surrey-hills',
    name: 'Surrey Hills',
    nameCn: 'Surrey Hills',
    blurbEn: 'Heritage homes between Box Hill and Camberwell. Houses, units and apartments all served.',
    blurbCn: '位于 Box Hill 和 Camberwell 之间的历史社区。独立屋、公寓、公寓楼均可上门服务。',
  },
  {
    slug: 'doncaster',
    name: 'Doncaster',
    nameCn: 'Doncaster',
    blurbEn: 'North of Box Hill, covering Westfield Doncaster, Doncaster East and Doncaster Hill.',
    blurbCn: '位于 Box Hill 北侧，覆盖 Westfield Doncaster、Doncaster East 和 Doncaster Hill。',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS_EN.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

type Lang = 'en' | 'cn';

function HomeContent() {
  const [lang, setLang] = useState<Lang>('en');
  const searchParams = useSearchParams();

  useEffect(() => {
    const l = searchParams.get('lang');
    if (l === 'en' || l === 'cn') {
      setLang(l as Lang);
    }
  }, [searchParams]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', address: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  const [enquiryData, setEnquiryData] = useState({ name: '', email: '', phone: '', message: '' });
  const [enquiryStatus, setEnquiryStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [enquiryErrors, setEnquiryErrors] = useState<Record<string, boolean>>({});
  const [enquiryWebsite, setEnquiryWebsite] = useState('');
  const [enquiryFormRenderedAt, setEnquiryFormRenderedAt] = useState(0);

  useEffect(() => {
    setEnquiryFormRenderedAt(Date.now());
  }, []);

  const [frequency, setFrequency] = useState<number | 'custom'>(1);
  const [numCats, setNumCats] = useState(1);
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const t = CONTENT[lang];

  const handleBookClick = (planKey: PlanKey) => {
    const params = new URLSearchParams();
    params.set('cats', numCats.toString());
    params.set('freq', frequency.toString());
    params.set('plan', planKey);
    params.set('lang', lang);
    router.push(`/book?${params.toString()}`);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setStatus('idle');
    setFormData({ name: '', phone: '', email: '', address: '' });
  };

  useEffect(() => {
    if (isModalOpen) {
      previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
      modalRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose();
          return;
        }

        if (e.key === 'Tab' && modalRef.current) {
          const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements.length === 0) return;

          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        if (previouslyFocusedRef.current && document.body.contains(previouslyFocusedRef.current)) {
          previouslyFocusedRef.current.focus();
        }
      };
    }
  }, [isModalOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/send-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: formData.name,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          plan_name: selectedPlan,
          num_cats: numCats,
          language: lang === 'en' ? 'English' : 'Chinese',
        }),
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Email sending error:', error);
      setStatus('error');
    }
  };

  const validateEnquiry = () => {
    const newErrors: Record<string, boolean> = {};
    if (!enquiryData.name) newErrors.name = true;
    if (!enquiryData.email) newErrors.email = true;
    if (!enquiryData.message) newErrors.message = true;
    setEnquiryErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEnquiry()) return;
    setEnquiryStatus('loading');

    try {
      const response = await fetch('/api/send-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: enquiryData.name,
          email: enquiryData.email,
          phone: enquiryData.phone,
          message: enquiryData.message,
          language: lang === 'en' ? 'English' : 'Chinese',
          website: enquiryWebsite,
          formRenderedAt: enquiryFormRenderedAt,
        }),
      });

      if (response.ok) {
        setEnquiryStatus('success');
        setTimeout(() => {
          setEnquiryStatus('idle');
          setEnquiryData({ name: '', email: '', phone: '', message: '' });
          setEnquiryErrors({});
        }, 3000);
      } else {
        setEnquiryStatus('error');
      }
    } catch (error) {
      console.error('Email sending error:', error);
      setEnquiryStatus('error');
    }
  };

  const faqs = lang === 'en' ? FAQS_EN : FAQS_CN;

  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar lang={lang} setLang={setLang} t={t} />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-blue-50 to-white text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
            {t.hero.headline}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.hero.subhead}
          </p>
          <button
            onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-8 bg-brand-green text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl hover:bg-green-600 transition-all transform hover:-translate-y-1"
          >
            {t.hero.cta}
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-12 text-center">
          <div className="p-6 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors">
            <Trash2 className="w-12 h-12 text-brand-blue mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">{t.features.trash.title}</h3>
            <p className="text-gray-600">{t.features.trash.desc}</p>
          </div>
          <div className="p-6 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors">
            <Wind className="w-12 h-12 text-brand-blue mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">{t.features.vacuum.title}</h3>
            <p className="text-gray-600">{t.features.vacuum.desc}</p>
          </div>
          <div className="p-6 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors">
            <ShieldCheck className="w-12 h-12 text-brand-green mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">{t.features.shield.title}</h3>
            <p className="text-gray-600">{t.features.shield.desc}</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="plans" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard
              planKey="essential"
              lang={lang}
              t={t}
              numCats={numCats}
              onNumCatsChange={setNumCats}
              frequency={frequency}
              onFrequencyChange={setFrequency}
              onChoosePlan={handleBookClick}
            />
            <PricingCard
              planKey="care"
              lang={lang}
              t={t}
              numCats={numCats}
              onNumCatsChange={setNumCats}
              frequency={frequency}
              onFrequencyChange={setFrequency}
              onChoosePlan={handleBookClick}
              popular
            />
            <PricingCard
              planKey="ultimate"
              lang={lang}
              t={t}
              numCats={numCats}
              onNumCatsChange={setNumCats}
              frequency={frequency}
              onFrequencyChange={setFrequency}
              onChoosePlan={handleBookClick}
            />
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {lang === 'en' ? 'Service Areas' : '服务区域'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {lang === 'en'
                ? 'Local Melbourne pet cleaning. See plans and pricing for your suburb.'
                : '本地墨尔本宠物清洁服务。查看您所在郊区的方案和价格。'}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {SUBURBS.map((s) => (
              <Link
                key={s.slug}
                href={`/service-areas/${s.slug}?lang=${lang}`}
                className="group p-8 rounded-3xl border border-gray-100 bg-gray-50 hover:bg-blue-50 hover:border-brand-blue/30 transition-all hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-3 text-brand-blue">
                  <MapPin size={24} />
                  <span className="text-sm font-bold uppercase tracking-wider">
                    {lang === 'en' ? 'Service Area' : '服务区域'}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {lang === 'en' ? s.name : s.nameCn}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {lang === 'en' ? s.blurbEn : s.blurbCn}
                </p>
                <span className="inline-flex items-center gap-2 font-bold text-brand-blue group-hover:gap-3 transition-all">
                  {lang === 'en' ? `View ${s.name} plans` : `查看 ${s.name} 方案`} <ArrowRight size={18} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {lang === 'en' ? 'Frequently Asked Questions' : '常见问题'}
            </h2>
            <p className="text-lg text-gray-600">
              {lang === 'en'
                ? 'Everything you need to know before booking your first clean.'
                : '预订前需要了解的所有信息。'}
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-2xl border border-gray-100 p-6 open:shadow-md transition-shadow"
              >
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-bold text-gray-900 text-lg">
                  <span>{faq.q}</span>
                  <Plus
                    size={20}
                    className="text-brand-blue flex-shrink-0 group-open:rotate-45 transition-transform"
                  />
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.contact_form.title}</h2>
            <p className="text-xl text-gray-600">{t.contact_form.subhead}</p>
          </div>
          <form onSubmit={handleEnquirySubmit} className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100">
            {/* Honeypot field: hidden from real users, but a plausible target for bot autofill */}
            <input
              type="text"
              name="website"
              value={enquiryWebsite}
              onChange={(e) => setEnquiryWebsite(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden"
            />
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-gray-700 text-sm font-bold" htmlFor="enquiry-name">
                    {t.contact_form.name}
                  </label>
                  {enquiryErrors.name && (
                    <span className="text-red-500 text-[10px] font-bold uppercase">{t.contact_form.required}</span>
                  )}
                </div>
                <input
                  type="text"
                  id="enquiry-name"
                  value={enquiryData.name}
                  onChange={(e) => {
                    setEnquiryData({ ...enquiryData, name: e.target.value });
                    if (enquiryErrors.name) setEnquiryErrors({ ...enquiryErrors, name: false });
                  }}
                  placeholder="John Doe"
                  className={`w-full border py-3 px-4 rounded-xl leading-tight focus:outline-none transition-colors ${
                    enquiryErrors.name ? 'border-red-300 bg-red-50' : 'bg-white border-gray-200 focus:border-brand-blue'
                  }`}
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-gray-700 text-sm font-bold" htmlFor="enquiry-email">
                    {t.contact_form.email}
                  </label>
                  {enquiryErrors.email && (
                    <span className="text-red-500 text-[10px] font-bold uppercase">{t.contact_form.required}</span>
                  )}
                </div>
                <input
                  type="email"
                  id="enquiry-email"
                  value={enquiryData.email}
                  onChange={(e) => {
                    setEnquiryData({ ...enquiryData, email: e.target.value });
                    if (enquiryErrors.email) setEnquiryErrors({ ...enquiryErrors, email: false });
                  }}
                  placeholder="you@example.com"
                  className={`w-full border py-3 px-4 rounded-xl leading-tight focus:outline-none transition-colors ${
                    enquiryErrors.email ? 'border-red-300 bg-red-50' : 'bg-white border-gray-200 focus:border-brand-blue'
                  }`}
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="enquiry-phone">
                {t.contact_form.phone}
              </label>
              <input
                type="tel"
                id="enquiry-phone"
                value={enquiryData.phone}
                onChange={(e) => setEnquiryData({ ...enquiryData, phone: e.target.value })}
                placeholder="0400 000 000"
                className="w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 rounded-xl leading-tight focus:outline-none focus:border-brand-blue transition-colors"
              />
            </div>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-gray-700 text-sm font-bold" htmlFor="enquiry-message">
                  {t.contact_form.message}
                </label>
                {enquiryErrors.message && (
                  <span className="text-red-500 text-[10px] font-bold uppercase">{t.contact_form.required}</span>
                )}
              </div>
              <textarea
                id="enquiry-message"
                value={enquiryData.message}
                onChange={(e) => {
                  setEnquiryData({ ...enquiryData, message: e.target.value.slice(0, MAX_ENQUIRY_MESSAGE_LENGTH) });
                  if (enquiryErrors.message) setEnquiryErrors({ ...enquiryErrors, message: false });
                }}
                maxLength={MAX_ENQUIRY_MESSAGE_LENGTH}
                placeholder={t.contact_form.messagePlaceholder}
                className={`w-full border py-3 px-4 rounded-xl leading-tight focus:outline-none transition-colors h-32 resize-none ${
                  enquiryErrors.message ? 'border-red-300 bg-red-50' : 'bg-white border-gray-200 focus:border-brand-blue'
                }`}
              />
              <div className="text-right text-xs text-gray-400 mt-1">
                {enquiryData.message.length}/{MAX_ENQUIRY_MESSAGE_LENGTH}
              </div>
            </div>
            {enquiryStatus === 'error' && (
              <div className="flex items-center justify-center gap-2 mb-4 text-red-500 font-semibold text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {t.contact_form.error}
              </div>
            )}
            <div className="text-center">
              <button
                type="submit"
                disabled={enquiryStatus === 'loading' || enquiryStatus === 'success'}
                className={`w-full md:w-auto px-8 py-3 rounded-xl font-bold text-white transition-all transform hover:-translate-y-1 inline-flex items-center justify-center gap-2 disabled:hover:translate-y-0 ${
                  enquiryStatus === 'success' ? 'bg-green-500 hover:bg-green-600' : 'bg-brand-blue hover:bg-cyan-600 shadow-lg hover:shadow-xl'
                }`}
              >
                {enquiryStatus === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {t.contact_form.loading}
                  </>
                ) : enquiryStatus === 'success' ? (
                  <>
                    <Check className="w-4 h-4" />
                    {t.contact_form.success}
                  </>
                ) : (
                  t.contact_form.submit
                )}
              </button>
              <p className="text-xs text-gray-400 mt-4">
                {t.contact_form.privacyPrefix}
                <Link href={`/privacy?lang=${lang}`} className="underline hover:text-brand-blue">
                  {t.contact_form.privacyLink}
                </Link>
                {t.contact_form.privacySuffix}
              </p>
            </div>
          </form>
        </div>
      </section>

      <Footer t={t} lang={lang} />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            tabIndex={-1}
            className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-2xl animate-in fade-in zoom-in duration-200"
          >
            <button
               onClick={handleClose}
               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 id="booking-modal-title" className="text-2xl font-bold mb-6 text-gray-900">{t.modal.title}</h2>

            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8" />
                </div>
                <p className="text-xl font-semibold text-green-600">{t.modal.success}</p>
              </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.modal.plan}</label>
                    <input
                    type="text"
                    readOnly
                    value={selectedPlan}
                    className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.modal.name}</label>
                    <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.modal.phone}</label>
                    <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                    placeholder="0400 000 000"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.modal.email}</label>
                    <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                    placeholder="john@example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.modal.address}</label>
                    <textarea
                    required
                    rows={3}
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                    placeholder="123 Example St, Blackburn"
                    />
                </div>

                {status === 'error' && (
                    <p className="text-red-500 text-sm">{t.modal.error}</p>
                )}

                <button
                    disabled={status === 'loading'}
                    type="submit"
                    className="w-full bg-brand-blue text-white py-3 rounded-xl font-bold hover:bg-cyan-600 transition-colors disabled:opacity-50"
                >
                    {status === 'loading' ? t.modal.loading : t.modal.submit}
                </button>
                </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-blue" />
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
