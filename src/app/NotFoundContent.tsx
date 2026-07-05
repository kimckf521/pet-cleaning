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
    <main className="min-h-screen bg-white text-gray-800">
      <Navbar lang={lang} setLang={setLang} t={t} />

      <div className="flex items-center justify-center px-4 pt-32 pb-16">
        <div className="max-w-xl text-center space-y-6">
          <p className="text-sm font-bold tracking-widest uppercase text-brand-blue">
            {lang === 'en' ? '404 Error' : '404 错误'}
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
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
              className="bg-brand-blue text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-cyan-600 transition-colors"
            >
              {lang === 'en' ? 'Back to Home' : '返回首页'}
            </Link>
            <Link
              href={getLink('/services')}
              className="border-2 border-brand-blue text-brand-blue px-8 py-3 rounded-full font-bold hover:bg-brand-blue hover:text-white transition-colors"
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
