import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services – Deep Cleaning & Sanitization',
  description:
    "Explore ScooPo's professional pet cleaning services: waste removal, litter box sanitization, deodorizing, and pet health monitoring in Melbourne.",
  openGraph: {
    title: 'ScooPo Services – Professional Pet Waste Management',
    description:
      'Complete pet waste removal, sanitization, deodorizing, and litter box maintenance tailored to your home.',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
