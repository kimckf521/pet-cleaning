import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Box Hill Dog Waste Removal & Cat Litter Cleaning',
  description:
    'Dog waste removal & cat litter cleaning in Box Hill. We scoop, vacuum, sanitize & deodorize from $28/visit. Weekly pooper scooper visits, no contracts.',
  keywords: [
    'dog waste removal Box Hill',
    'dog poo removal Box Hill',
    'pooper scooper Box Hill',
    'dog poo pick up Box Hill',
    'pet waste removal Box Hill',
    'cat litter cleaning service Box Hill',
    'litter box cleaning service Box Hill',
    'cat litter tray cleaning Box Hill',
    'weekly dog poo removal Box Hill',
    'backyard dog poo cleaning Box Hill',
  ],
  alternates: {
    canonical: '/service-areas/box-hill',
  },
  openGraph: {
    title: 'ScooPo – Dog Waste Removal & Cat Cleaning, Box Hill',
    description:
      'Dog waste removal & cat litter cleaning for Box Hill homes. Scoop, vacuum & sanitize from $28/visit.',
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
