import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pet Waste Removal & Cat Litter Cleaning – Blackburn',
  description:
    "Professional pet waste removal and cat litter cleaning in Blackburn, Melbourne. Scoop, vacuum and sanitize from $10/visit. Weekly visits available, no contracts.",
  alternates: {
    canonical: '/service-areas/blackburn',
  },
  openGraph: {
    title: 'ScooPo – Pet Cleaning in Blackburn, Melbourne',
    description:
      'Reliable, eco-friendly cat litter cleaning and pet waste removal serving Blackburn residents. From $10/visit.',
    url: '/service-areas/blackburn',
  },
};

export default function BlackburnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
