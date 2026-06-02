import SuburbLanding from '@/components/SuburbLanding';

export default function SurreyHillsPage() {
  return (
    <SuburbLanding
      name="Surrey Hills"
      slug="surrey-hills"
      postcode="3127"
      intro="Heritage homes and tree-lined streets between Box Hill and Camberwell. We serve houses, units and apartment buildings across Surrey Hills with reliable weekly cat litter cleaning from $10/visit."
      nearby={[
        { name: 'Box Hill', slug: 'box-hill' },
        { name: 'Mont Albert', slug: 'mont-albert' },
        { name: 'Blackburn', slug: 'blackburn' },
      ]}
    />
  );
}
