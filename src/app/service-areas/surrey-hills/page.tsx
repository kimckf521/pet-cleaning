import SuburbLanding from '@/components/SuburbLanding';

export default function SurreyHillsPage() {
  return (
    <SuburbLanding
      name="Surrey Hills"
      slug="surrey-hills"
      postcode="3127"
      introEn="Heritage homes and tree-lined streets between Box Hill and Camberwell. We serve houses, units and apartment buildings across Surrey Hills with reliable weekly cat litter cleaning from $28/visit."
      introCn="位于 Box Hill 和 Camberwell 之间，历史风貌的房屋和林荫街道。我们为 Surrey Hills 各类独立屋、公寓和公寓楼提供可靠的每周猫砂清理服务，$28/次起。"
      nearby={[
        { name: 'Box Hill', slug: 'box-hill' },
        { name: 'Mont Albert', slug: 'mont-albert' },
        { name: 'Blackburn', slug: 'blackburn' },
      ]}
    />
  );
}
