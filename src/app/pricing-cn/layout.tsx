import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '收费方案 – Pricing Plans',
  description:
    'ScooPo 猫砂清理服务收费方案。透明定价，无隐藏费用。基础版 $10/次起。服务墨尔本 Box Hill 和 Blackburn 地区。',
  openGraph: {
    title: 'ScooPo 收费方案 – Cat Litter Cleaning Pricing',
    description:
      '专业猫砂清理服务，透明定价。基础版、优享版、尊享版三种方案可选。',
    locale: 'zh_CN',
  },
};

export default function PricingCnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
