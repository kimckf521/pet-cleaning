import SuburbLanding from '@/components/SuburbLanding';

export default function DoncasterPage() {
  return (
    <SuburbLanding
      name="Doncaster"
      slug="doncaster"
      postcode="3108"
      introEn="Hilly residential area just north of Box Hill, covering properties around Westfield Doncaster, Doncaster East and Doncaster Hill. We handle apartments, townhouses and family homes with weekly cat litter cleaning from $28/visit."
      introCn="位于 Box Hill 北侧的丘陵住宅区，覆盖 Westfield Doncaster、Doncaster East 和 Doncaster Hill 周边的房产。我们为公寓、联排别墅和独立屋提供每周猫砂清理服务，$28/次起。"
      nearby={[
        { name: 'Box Hill', slug: 'box-hill' },
        { name: 'Mont Albert', slug: 'mont-albert' },
        { name: 'Blackburn', slug: 'blackburn' },
      ]}
    />
  );
}
