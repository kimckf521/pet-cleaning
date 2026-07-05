import SuburbLanding from '@/components/SuburbLanding';

export default function MontAlbertPage() {
  return (
    <SuburbLanding
      name="Mont Albert"
      slug="mont-albert"
      postcode="3127"
      introEn="Leafy residential streets bordering Box Hill, with heritage homes and tucked-away side gates that are perfect for our discreet drop-in service. Weekly cat litter cleaning from $10/visit, no contracts."
      introCn="紧邻 Box Hill 的绿荫住宅街道，历史风格的房屋和隐蔽的侧门，非常适合我们低调的上门服务。每周猫砂清理，$10/次起，无需签约。"
      nearby={[
        { name: 'Box Hill', slug: 'box-hill' },
        { name: 'Surrey Hills', slug: 'surrey-hills' },
        { name: 'Blackburn', slug: 'blackburn' },
      ]}
    />
  );
}
