'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface FooterProps {
  t: any;
  lang: 'en' | 'cn';
}

export default function Footer({ t, lang }: FooterProps) {
  const getLink = (path: string) => {
    const [base, hash] = path.split('#');
    return `${base}?lang=${lang}${hash ? '#' + hash : ''}`;
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="flex justify-center mb-8">
          <Link href={getLink('/')} className="flex items-center gap-2 group">
            <div className="bg-white p-2 rounded-full shadow-lg group-hover:scale-110 transition-transform">
              <Image src="/logo.png" alt="ScooPo Logo" width={40} height={40} className="w-10 h-10 object-contain" />
            </div>
            <span className="text-2xl font-bold">{t.nav.logo}</span>
          </Link>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-8 mb-8 text-gray-400 font-medium">
          <Link href={getLink('/')} className="hover:text-white transition-colors">{t.nav.home}</Link>
          <Link href={getLink('/about')} className="hover:text-white transition-colors">{t.nav.about}</Link>
          <Link href={getLink('/services')} className="hover:text-white transition-colors">{t.nav.services}</Link>
          <Link href={getLink('/book')} className="hover:text-white transition-colors font-bold text-brand-blue">{t.nav.book}</Link>
        </div>
        <p className="text-lg font-medium">{t.footer.contact}</p>
        <p className="text-gray-500 mt-4 text-sm">{t.footer.rights}</p>
        <div className="mt-6 flex justify-center gap-4 text-xs text-gray-600">
          <Link href={getLink('/privacy')} className="hover:text-gray-400">{t.footer.privacy}</Link>
          <span>•</span>
          <Link href={getLink('/terms')} className="hover:text-gray-400">{t.footer.terms}</Link>
        </div>
      </div>
    </footer>
  );
}
