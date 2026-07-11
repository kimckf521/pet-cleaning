'use client';

import React from 'react';
import Image from 'next/image';
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
    <nav aria-label="Main navigation" className="fixed w-full bg-cream/85 backdrop-blur-md border-b border-peach/40 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={getLink('/')} className="text-2xl font-display font-bold text-brand-blue flex items-center gap-2">
          <Image src="/logo.png" alt="ScooPo – Melbourne pet waste removal & cat litter cleaning" width={40} height={40} className="w-10 h-10 object-contain" priority />
          {t.nav.logo}
        </Link>
        <div className="hidden md:flex items-center gap-8 font-medium text-gray-600">
          <Link href={getLink('/')} className="hover:text-coral transition-colors">{t.nav.home}</Link>
          <Link href={getLink('/about')} className="hover:text-coral transition-colors">{t.nav.about}</Link>
          <Link href={getLink('/services')} className="hover:text-coral transition-colors">{t.nav.services}</Link>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setLang(lang === 'en' ? 'cn' : 'en')}
            className="w-10 h-10 flex items-center justify-center font-bold text-lg text-coral border-2 border-coral rounded-full hover:bg-coral hover:text-white transition-all"
          >
            {lang === 'en' ? '中' : 'EN'}
          </button>
          <button
            onClick={handleBookClick}
            className="bg-coral text-white px-6 py-2 rounded-full font-semibold shadow-warm hover:bg-coral-600 hover:scale-105 transition-all"
          >
            {t.nav.book}
          </button>
        </div>
      </div>
    </nav>
  );
}
