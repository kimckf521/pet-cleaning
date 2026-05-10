import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us – Our Mission & Values',
  description:
    "Learn about ScooPo – Melbourne's trusted pet waste removal and cat litter cleaning service. Eco-friendly, health-focused, and reliable scoopers serving Box Hill & Blackburn.",
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About ScooPo – Melbourne Pet Cleaning Experts',
    description:
      "Discover our mission to keep your pet's area clean and odor-free with eco-friendly, pet-safe products.",
    url: '/about',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
