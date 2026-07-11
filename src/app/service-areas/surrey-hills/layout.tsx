import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pet Waste Removal & Cat Litter Cleaning – Surrey Hills',
  description:
    'Professional pet waste removal and cat litter cleaning in Surrey Hills, Melbourne. Scoop, vacuum and sanitize from $28/visit. Weekly visits available, no contracts.',
  alternates: {
    canonical: '/service-areas/surrey-hills',
  },
  openGraph: {
    title: 'ScooPo – Pet Cleaning in Surrey Hills, Melbourne',
    description:
      'Reliable, eco-friendly cat litter cleaning and pet waste removal serving Surrey Hills residents. From $28/visit.',
    url: '/service-areas/surrey-hills',
  },
};

export default function SurreyHillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
