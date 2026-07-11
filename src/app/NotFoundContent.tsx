'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CONTENT } from '@/content';

export default function NotFoundContent() {
  const [lang, setLang] = useState<'en' | 'cn'>('en');
  const t = CONTENT[lang];

  const getLink = (path: string) => `${path}?lang=${lang}`;

  return (
    <main className="min-h-screen bg-cream text-gray-700">
      <Navbar lang={lang} setLang={setLang} t={t} />

      <div className="relative flex items-center justify-center px-4 pt-32 pb-16 bg-gradient-to-b from-peach/40 via-coral-50 to-cream overflow-hidden">
        <span aria-hidden className="pointer-events-none select-none absolute top-28 left-[8%] text-5xl opacity-25 animate-float">🐾</span>
        <span aria-hidden className="pointer-events-none select-none absolute bottom-16 right-[10%] text-6xl opacity-20 animate-float" style={{ animationDelay: '1.5s' }}>🐾</span>
        <div className="relative max-w-xl text-center space-y-6">
          <p className="inline-flex items-center gap-2 bg-white/70 text-coral-700 text-sm font-bold tracking-widest uppercase px-5 py-2 rounded-full shadow-soft">
            🐾 {lang === 'en' ? '404 Error' : '404 错误'}
          </p>
          <h1 className="text-5xl md:text-6xl font-display font-extrabold text-ink tracking-tight">
            {lang === 'en' ? 'Page not found' : '页面未找到'}
          </h1>
          <p className="text-lg text-gray-600">
            {lang === 'en'
              ? "The page you're looking for doesn't exist or has moved. Let's get you back on track."
              : '您查找的页面不存在或已被移动。让我们带您回到正轨。'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href={getLink('/')}
              className="bg-coral text-white px-8 py-3 rounded-full font-bold shadow-warm hover:bg-coral-600 hover:scale-105 transition-all"
            >
              {lang === 'en' ? 'Back to Home 🐾' : '返回首页 🐾'}
            </Link>
            <Link
              href={getLink('/services')}
              className="border-2 border-coral text-coral px-8 py-3 rounded-full font-bold hover:bg-coral hover:text-white transition-colors"
            >
              {lang === 'en' ? 'View Services' : '查看服务'}
            </Link>
          </div>
        </div>
      </div>

      <Footer t={t} lang={lang} />
    </main>
  );
}
