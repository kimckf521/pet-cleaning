import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blackburn Dog Waste Removal & Cat Litter Cleaning',
  description:
    'Dog waste removal & cat litter cleaning in Blackburn. We scoop, vacuum, sanitize & deodorize from $28/visit. Weekly pooper scooper visits, no contracts.',
  keywords: [
    'dog waste removal Blackburn',
    'dog poo removal Blackburn',
    'pooper scooper Blackburn',
    'dog poo pick up Blackburn',
    'pet waste removal Blackburn',
    'cat litter cleaning service Blackburn',
    'litter box cleaning service Blackburn',
    'cat litter tray cleaning Blackburn',
    'weekly dog poo removal Blackburn',
    'backyard dog poo cleaning Blackburn',
  ],
  alternates: {
    canonical: '/service-areas/blackburn',
  },
  openGraph: {
    title: 'ScooPo – Dog Waste Removal & Cat Cleaning, Blackburn',
    description:
      'Dog waste removal & cat litter cleaning for Blackburn homes. Scoop, vacuum & sanitize from $28/visit.',
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
