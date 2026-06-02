import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pet Waste Removal & Cat Litter Cleaning – Mont Albert',
  description:
    'Professional pet waste removal and cat litter cleaning in Mont Albert, Melbourne. Scoop, vacuum and sanitize from $10/visit. Weekly visits available, no contracts.',
  alternates: {
    canonical: '/service-areas/mont-albert',
  },
  openGraph: {
    title: 'ScooPo – Pet Cleaning in Mont Albert, Melbourne',
    description:
      'Reliable, eco-friendly cat litter cleaning and pet waste removal serving Mont Albert residents. From $10/visit.',
    url: '/service-areas/mont-albert',
  },
};

export default function MontAlbertLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
