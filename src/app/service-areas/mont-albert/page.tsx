import SuburbLanding from '@/components/SuburbLanding';

export default function MontAlbertPage() {
  return (
    <SuburbLanding
      name="Mont Albert"
      slug="mont-albert"
      postcode="3127"
      intro="Leafy residential streets bordering Box Hill, with heritage homes and tucked-away side gates that are perfect for our discreet drop-in service. Weekly cat litter cleaning from $10/visit, no contracts."
      nearby={[
        { name: 'Box Hill', slug: 'box-hill' },
        { name: 'Surrey Hills', slug: 'surrey-hills' },
        { name: 'Blackburn', slug: 'blackburn' },
      ]}
    />
  );
}
