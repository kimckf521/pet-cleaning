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
    <footer aria-label="Site footer" className="bg-gray-900 text-white py-12">
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
        {/* Social Media */}
        <div className="flex justify-center gap-4 mb-8">
          {/* Facebook */}
          <a href="https://www.facebook.com/share/1ArdBZ5Ft6/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#1877F2] hover:text-white transition-all duration-300 hover:scale-110">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          {/* Instagram */}
          <a href="https://www.instagram.com/scoopoau?igsh=MTZubnpmNDl4bnhtNA%3D%3D" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gradient-to-br hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7] hover:text-white transition-all duration-300 hover:scale-110">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          {/* TikTok */}
          <a href="https://www.tiktok.com/@scoopoau?_r=1&_t=ZS-94astUWGTH2" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-black hover:text-white transition-all duration-300 hover:scale-110">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13.4a8.16 8.16 0 005.58 2.19V12.1a4.83 4.83 0 01-3.77-1.85V6.69h3.77z"/></svg>
          </a>
          {/* Xiaohongshu (小红书) */}
          <a href="https://xhslink.com/m/64cpBmXeB5q" target="_blank" rel="noopener noreferrer" aria-label="Xiaohongshu" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-[#FF2442] hover:text-white transition-all duration-300 hover:scale-110">
            <span className="text-[9px] font-black leading-none tracking-tighter">小红书</span>
          </a>
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
