import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: "The page you're looking for doesn't exist. Browse ScooPo's pet cleaning services in Melbourne.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white text-gray-800 flex items-center justify-center px-4">
      <div className="max-w-xl text-center space-y-6">
        <p className="text-sm font-bold tracking-widest uppercase text-brand-blue">404 Error</p>
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
          Page not found
        </h1>
        <p className="text-lg text-gray-600">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/"
            className="bg-brand-blue text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-cyan-600 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/services"
            className="border-2 border-brand-blue text-brand-blue px-8 py-3 rounded-full font-bold hover:bg-brand-blue hover:text-white transition-colors"
          >
            View Services
          </Link>
        </div>
      </div>
    </main>
  );
}
