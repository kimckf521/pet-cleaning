import SuburbLanding from '@/components/SuburbLanding';

export default function BlackburnPage() {
  return (
    <SuburbLanding
      name="Blackburn"
      slug="blackburn"
      postcode="3130"
      introEn="Trusted, eco-friendly cleaning visits for cat owners across Blackburn. We scoop, remove, sanitize and vacuum – from just $10 per visit."
      introCn="为 Blackburn 各地养猫家庭提供值得信赖的环保上门清洁服务。我们清理、带走粪便、消毒并吸尘 —— 每次仅需 $10 起。"
      nearby={[
        { name: 'Box Hill', slug: 'box-hill' },
        { name: 'Mont Albert', slug: 'mont-albert' },
        { name: 'Surrey Hills', slug: 'surrey-hills' },
        { name: 'Doncaster', slug: 'doncaster' },
      ]}
    />
  );
}
