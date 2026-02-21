'use client';

import React from 'react';
import Link from 'next/link';

interface FooterProps {
  t: any;
}

export default function Footer({ t }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="flex flex-col md:flex-row justify-center gap-8 mb-8 text-gray-400 font-medium">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
          <Link href="/services" className="hover:text-white transition-colors">Services</Link>
          <Link href="/book" className="hover:text-white transition-colors font-bold text-brand-blue">Book Now</Link>
        </div>
        <p className="text-lg font-medium">{t.footer.contact}</p>
        <p className="text-gray-500 mt-4 text-sm">© 2026 ScooPo. All rights reserved.</p>
        <div className="mt-6 flex justify-center gap-4 text-xs text-gray-600">
          <a href="#" className="hover:text-gray-400">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:text-gray-400">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
