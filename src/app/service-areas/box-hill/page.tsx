import SuburbLanding from '@/components/SuburbLanding';

export default function BoxHillPage() {
  return (
    <SuburbLanding
      name="Box Hill"
      slug="box-hill"
      postcode="3128"
      introEn="Reliable, eco-friendly cleaning visits for cat owners across Box Hill. We scoop, remove, sanitize and vacuum – from just $10 per visit."
      introCn="为 Box Hill 各地养猫家庭提供可靠、环保的上门清洁服务。我们清理、带走粪便、消毒并吸尘 —— 每次仅需 $10 起。"
      nearby={[
        { name: 'Blackburn', slug: 'blackburn' },
        { name: 'Mont Albert', slug: 'mont-albert' },
        { name: 'Surrey Hills', slug: 'surrey-hills' },
        { name: 'Doncaster', slug: 'doncaster' },
      ]}
    />
  );
}
