import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pet Waste Removal & Cat Litter Cleaning – Doncaster',
  description:
    'Professional pet waste removal and cat litter cleaning in Doncaster, Melbourne. Scoop, vacuum and sanitize from $10/visit. Weekly visits available, no contracts.',
  alternates: {
    canonical: '/service-areas/doncaster',
  },
  openGraph: {
    title: 'ScooPo – Pet Cleaning in Doncaster, Melbourne',
    description:
      'Reliable, eco-friendly cat litter cleaning and pet waste removal serving Doncaster residents. From $10/visit.',
    url: '/service-areas/doncaster',
  },
};

export default function DoncasterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
