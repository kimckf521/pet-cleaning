'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface NavbarProps {
  lang: 'en' | 'cn';
  setLang: (lang: 'en' | 'cn') => void;
  t: any;
}

export default function Navbar({ lang, setLang, t }: NavbarProps) {
  const router = useRouter();

  const getLink = (path: string) => {
    const [base, hash] = path.split('#');
    return `${base}?lang=${lang}${hash ? '#' + hash : ''}`;
  };

  const handleBookClick = () => {
    router.push(getLink('/book'));
  };

  return (
    <nav className="fixed w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={getLink('/')} className="text-2xl font-bold text-brand-blue flex items-center gap-2">
          <ShieldCheck className="w-8 h-8" />
          {t.nav.logo}
        </Link>
        <div className="hidden md:flex items-center gap-8 font-medium text-gray-600">
          <Link href={getLink('/')} className="hover:text-brand-blue transition-colors">{t.nav.home}</Link>
          <Link href={getLink('/about')} className="hover:text-brand-blue transition-colors">{t.nav.about}</Link>
          <Link href={getLink('/services')} className="hover:text-brand-blue transition-colors">{t.nav.services}</Link>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setLang(lang === 'en' ? 'cn' : 'en')}
            className="w-10 h-10 flex items-center justify-center font-bold text-lg text-brand-blue border-2 border-brand-blue rounded-full hover:bg-brand-blue hover:text-white transition-all underline-none"
          >
            {lang === 'en' ? '中' : 'EN'}
          </button>
          <button
            onClick={handleBookClick}
            className="bg-brand-blue text-white px-6 py-2 rounded-full font-semibold hover:bg-cyan-600 transition-colors"
          >
            {t.nav.book}
          </button>
        </div>
      </div>
    </nav>
  );
}
