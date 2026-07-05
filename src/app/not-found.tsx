import type { Metadata } from 'next';
import NotFoundContent from './NotFoundContent';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: "The page you're looking for doesn't exist. Browse ScooPo's pet cleaning services in Melbourne.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundContent />;
}
