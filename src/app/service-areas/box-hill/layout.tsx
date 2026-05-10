import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pet Waste Removal & Cat Litter Cleaning – Box Hill',
  description:
    "Professional pet waste removal and cat litter cleaning in Box Hill, Melbourne. Scoop, vacuum and sanitize from $10/visit. Weekly visits available, no contracts.",
  alternates: {
    canonical: '/service-areas/box-hill',
  },
  openGraph: {
    title: 'ScooPo – Pet Cleaning in Box Hill, Melbourne',
    description:
      'Reliable, eco-friendly cat litter cleaning and pet waste removal serving Box Hill residents. From $10/visit.',
    url: '/service-areas/box-hill',
  },
};

export default function BoxHillLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
