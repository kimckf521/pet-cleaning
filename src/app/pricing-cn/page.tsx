'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { 
  CheckCircle, 
  ArrowRight, 
  Printer, 
  Smartphone, 
  MapPin, 
  Check,
  Star,
  Quote,
  ShieldCheck,
  Zap,
  Leaf,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CONTENT } from '@/content';
import { SITE_URL } from '@/lib/constants';

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: '首页', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: '收费方案', item: `${SITE_URL}/pricing-cn` },
  ],
};

const pricingData = [
  {
    name: 'Essential (基础版)',
    price: '$28',
    unit: '/次',
    description: '适合希望保持环境整洁的基本需求。',
    features: [
      '专业猫砂带离清理',
      '猫砂盆周边及底部吸尘',
      '宠物安全除臭喷雾',
      '排泄物异常状态监测',
    ],
    cta: '立即预约',
    popular: false,
    color: 'bg-cyan-50',
    borderColor: 'border-cyan-100',
    iconColor: 'text-brand-blue'
  },
  {
    name: 'Premium (优享版)',
    price: '$35',
    unit: '/次',
    description: '最受欢迎的选择，提供更全面的关怀。',
    features: [
      '包含基础版所有服务',
      '添粮换水及碗具简单清洁',
      '室内异味深度中和',
      '入户安全检查及照片反馈',
    ],
    cta: '立即预约',
    popular: true,
    color: 'bg-coral-50',
    borderColor: 'border-coral/20',
    iconColor: 'text-coral'
  },
  {
    name: 'Ultimate (尊享版)',
    price: '$42',
    unit: '/次',
    description: '极致卫生的首选，全方位的托管服务。',
    features: [
      '包含优享版所有服务',
      '每周猫砂盆深度清洗消毒',
      '饮水及喂食具体系化清洁',
      '专业级别的卫生环境管理',
    ],
    cta: '联系我们',
    popular: false,
    color: 'bg-green-50',
    borderColor: 'border-green-100',
    iconColor: 'text-brand-green'
  }
];

function PricingContent() {
  const [lang, setLang] = useState<'en' | 'cn'>('cn');
  const t = CONTENT[lang];

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-cream selection:bg-coral selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="print:hidden">
        <Navbar lang={lang} setLang={setLang} t={t} />
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-peach/40 via-coral-50 to-cream overflow-hidden relative">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-coral/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-brand-green/5 rounded-full blur-3xl" />
        <span aria-hidden className="print:hidden pointer-events-none select-none absolute top-28 left-[8%] text-5xl opacity-20 animate-float">🐾</span>
        <span aria-hidden className="print:hidden pointer-events-none select-none absolute bottom-14 right-[10%] text-6xl opacity-20 animate-float" style={{ animationDelay: '1.5s' }}>🐾</span>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-white/70 text-coral-700 font-semibold px-5 py-2 rounded-full shadow-soft mb-6">
              🐾 透明收费，无隐藏费用
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-extrabold text-ink mb-6 tracking-tight leading-tight">
              简单清晰的<span className="text-coral">收费方案</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              无隐藏费用，无注册费。专业宠物清洁专家，为您打造清新无味的家居环境。
            </p>
            
            {/* Discounts Section */}
            <div className="flex flex-col md:flex-row gap-6 mb-12 max-w-4xl mx-auto">
              {/* First Time Offer */}
              <div className="flex-1 flex items-center gap-4 p-6 bg-brand-green/10 border-2 border-brand-green/20 rounded-[30px] animate-pulse">
                <div className="w-12 h-12 bg-brand-green text-white rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Star size={24} fill="currentColor" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-ink text-lg">新客户优惠</h4>
                  <p className="text-brand-green font-semibold">首单满 $50 立减 $10</p>
                </div>
              </div>

              {/* Frequency Discounts */}
              <div className="flex-1 flex items-center gap-4 p-6 bg-coral-100/60 border-2 border-coral/20 rounded-[30px]">
                <div className="w-12 h-12 bg-coral text-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-warm">
                  <Zap size={24} fill="currentColor" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-ink text-lg">高频服务优惠</h4>
                  <div className="flex flex-col text-sm text-gray-700">
                    <span>4-5 次/周: <span className="text-coral font-bold">95折 (5% OFF)</span></span>
                    <span>6-7 次/周: <span className="text-coral font-bold">9折 (10% OFF)</span></span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 print:hidden">
              <button 
                onClick={handlePrint}
                className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-coral rounded-full font-semibold text-coral hover:bg-coral hover:text-white transition-all shadow-soft active:scale-95"
              >
                <Printer size={20} />
                打印/保存报价单
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingData.map((plan, idx) => (
              <div 
                key={idx}
                className={`relative group flex flex-col p-8 md:p-10 rounded-[40px] border-2 transition-all duration-500 hover:shadow-warm hover:-translate-y-1 ${
                  plan.popular
                    ? 'border-coral bg-white scale-105 z-20 shadow-soft'
                    : `${plan.borderColor} ${plan.color} scale-100`
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-coral text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-warm uppercase tracking-wider">
                    🐾 最受欢迎
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-ink mb-2">{plan.name}</h3>
                  <p className="text-gray-500 text-sm">{plan.description}</p>
                </div>

                <div className="mb-8 flex items-baseline gap-1">
                  <span className="text-5xl font-extrabold text-ink">{plan.price}</span>
                  <span className="text-gray-500 font-medium">{plan.unit}</span>
                </div>

                <ul className="space-y-4 mb-10 flex-1">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-white flex items-center justify-center border border-peach/40 shadow-soft ${plan.iconColor}`}>
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="text-gray-600 text-sm md:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/book?lang=cn&plan=${plan.name}`}
                  className={`w-full py-5 rounded-full font-bold text-lg text-center transition-all duration-300 active:scale-[0.98] ${
                    plan.popular
                      ? 'bg-coral text-white hover:bg-coral-600 shadow-warm hover:scale-105'
                      : 'bg-white text-ink border-2 border-peach/60 hover:border-coral hover:text-coral'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-cream-dark">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-ink mb-4">为什么选择 ScooPo? 🐾</h2>
            <p className="text-gray-500">最贴心的宠物管家服务</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-coral-100 text-coral rounded-3xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck size={32} />
              </div>
              <h4 className="text-xl font-bold mb-3">安全放心</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                所有服务人员经过严格背景调查。提供入户反馈照片，确保门窗锁好。
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 text-brand-green rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Leaf size={32} />
              </div>
              <h4 className="text-xl font-bold mb-3">宠物友好</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                坚持使用宠物安全等级的消毒除臭剂，不含强刺激性化学物质。
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-cyan-100 text-brand-blue rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Quote size={32} />
              </div>
              <h4 className="text-xl font-bold mb-3">异常告知</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                我们会帮您留意猫咪排泄物是否存在异常（软便、虫子等），并及时告知。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Info & Contact */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-coral rounded-[40px] p-10 md:p-16 text-white relative overflow-hidden shadow-warm">
            <div className="absolute top-0 right-0 opacity-10 -translate-y-1/2 translate-x-1/2">
              <Smartphone size={400} />
            </div>
            
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">不仅是清理，<br />更是全方位的呵护。</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 w-6 h-6 flex-shrink-0 bg-white/20 rounded-full flex items-center justify-center">
                      <Zap size={14} />
                    </div>
                    <div>
                      <h5 className="font-bold mb-1">灵活定制</h5>
                      <p className="text-white/90 text-sm">有多只猫砂盆？或者需要更高频次的服务？联系我们，获取专属报价。</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 text-ink shadow-warm border border-peach/40">
                <h4 className="text-2xl font-bold mb-6 text-center">开始咨询</h4>
                <div className="space-y-4">
                  <Link 
                    href="/#contact?lang=cn"
                    className="flex items-center justify-between p-4 bg-cream rounded-2xl hover:bg-cream-dark transition-colors"
                  >
                    <span className="font-medium">发送留言</span>
                    <ArrowRight size={20} className="text-coral" />
                  </Link>
                  <p className="text-center text-xs text-gray-400 pt-4">© 2026 ScooPo - 专业宠物服务</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="print:hidden">
        <Footer t={t} lang={lang} />
      </div>

      <style jsx global>{`
        @media print {
          .print\:hidden {
            display: none !important;
          }
          body {
            background: white !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          main {
            padding: 0 !important;
          }
          section {
            padding: 2rem 0 !important;
            page-break-inside: avoid;
          }
          .container {
            max-width: 100% !important;
            width: 100% !important;
            padding: 0 1rem !important;
          }
          h1 {
            font-size: 2.5rem !important;
          }
          .rounded-\\[40px\\] {
            border-radius: 1.5rem !important;
          }
        }
      `}</style>
    </main>
  );
}

export default function PricingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-coral" />
      </div>
    }>
      <PricingContent />
    </Suspense>
  );
}
