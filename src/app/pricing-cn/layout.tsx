import { Metadata } from 'next';
import { SERVICE_AREA_FULL_CN } from '@/lib/constants';

export const metadata: Metadata = {
  title: '墨尔本上门喂猫·铲屎·猫砂清理收费方案',
  description: `ScooPo 墨尔本上门喂猫、铲屎与猫砂清理服务收费方案。透明定价，无隐藏费用。基础版 $28/次起，服务${SERVICE_AREA_FULL_CN}地区。`,
  keywords: [
    '墨尔本上门喂猫',
    '上门铲屎 墨尔本',
    '墨尔本猫砂清理',
    '猫砂盆清洁',
    '墨尔本铲屎官',
    '墨尔本东区宠物服务',
    '博士山上门喂猫',
    'Box Hill 猫砂清理',
    'Blackburn 上门喂猫',
    '墨尔本宠物上门服务',
  ],
  alternates: {
    canonical: '/pricing-cn',
    languages: {
      'en-AU': '/',
      'zh-CN': '/pricing-cn',
      'x-default': '/',
    },
  },
  openGraph: {
    title: 'ScooPo 墨尔本上门喂猫·铲屎·猫砂清理',
    description:
      '专业上门喂猫、铲屎与猫砂清理服务，透明定价。基础版、优享版、尊享版三种方案可选。',
    locale: 'zh_CN',
    url: '/pricing-cn',
  },
};

export default function PricingCnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
