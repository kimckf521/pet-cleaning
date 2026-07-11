'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { FileText, Loader2, ChevronLeft, Scale } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CONTENT } from '@/content';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function TermsContent() {
  const [lang, setLang] = useState<'en' | 'cn'>('en');
  const searchParams = useSearchParams();

  useEffect(() => {
    const l = searchParams.get('lang');
    if (l === 'en' || l === 'cn') {
      setLang(l as 'en' | 'cn');
    }
  }, [searchParams]);

  const t = CONTENT[lang];
  const p = t.terms_content;

  const getLink = (path: string) => {
    const [base, hash] = path.split('#');
    return `${base}?lang=${lang}${hash ? '#' + hash : ''}`;
  };

  return (
    <main className="min-h-screen bg-cream">
      <Navbar lang={lang} setLang={setLang} t={t} />

      <div className="pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-[40px] shadow-soft border border-peach/40 overflow-hidden">
          {/* Header */}
          <div className="bg-coral-50 p-8 md:p-12 border-b border-peach/40">
            <Link
              href={getLink('/')}
              className="inline-flex items-center gap-2 text-coral font-bold mb-6 hover:gap-3 transition-all"
            >
              <ChevronLeft size={20} />
              {lang === 'en' ? 'Back to Home' : '点击返回'}
            </Link>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-coral text-white rounded-2xl flex items-center justify-center">
                <Scale size={24} />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-ink">{p.title}</h1>
            </div>
            <p className="text-gray-400 italic text-sm">{p.lastUpdated}</p>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 space-y-10">
            <p className="text-lg text-gray-700 font-medium border-l-4 border-coral pl-6 italic">
                "{p.intro}"
            </p>
            
            {p.sections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h2 className="text-xl font-bold text-gray-800">{section.title}</h2>
                <div className="text-gray-600 leading-relaxed whitespace-pre-line bg-cream p-6 rounded-2xl border border-peach/30">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer t={t} lang={lang} />
    </main>
  );
}

export default function TermsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-coral" />
      </div>
    }>
      <TermsContent />
    </Suspense>
  );
}
