import { Metadata } from 'next';
import { SERVICE_AREA_FULL_EN } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Book Your Service',
  description:
    'Book a professional cat litter cleaning service in Melbourne. Choose from Essential, Premium, or Ultimate plans. Schedule online in minutes.',
  alternates: {
    canonical: '/book',
  },
  openGraph: {
    title: 'Book ScooPo – Pet Cleaning Service Melbourne',
    description:
      `Choose your plan and schedule a professional cat litter cleaning visit online. Serving ${SERVICE_AREA_FULL_EN}.`,
    url: '/book',
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
