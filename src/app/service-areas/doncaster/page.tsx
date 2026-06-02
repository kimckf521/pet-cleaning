import SuburbLanding from '@/components/SuburbLanding';

export default function DoncasterPage() {
  return (
    <SuburbLanding
      name="Doncaster"
      slug="doncaster"
      postcode="3108"
      intro="Hilly residential area just north of Box Hill, covering properties around Westfield Doncaster, Doncaster East and Doncaster Hill. We handle apartments, townhouses and family homes with weekly cat litter cleaning from $10/visit."
      nearby={[
        { name: 'Box Hill', slug: 'box-hill' },
        { name: 'Mont Albert', slug: 'mont-albert' },
        { name: 'Blackburn', slug: 'blackburn' },
      ]}
    />
  );
}
