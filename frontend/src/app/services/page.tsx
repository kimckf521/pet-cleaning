'use client';

import React, { useState } from 'react';
import { Layers, Sparkles, Sprout, Wind, MousePointer2, ListChecks, CalendarRange, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { CONTENT } from '@/content';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ServicesPage() {
  const [lang, setLang] = useState<'en' | 'cn'>('en');
  const t = CONTENT[lang];

  const processSteps = [
    {
      icon: <CalendarRange size={32} />,
      title: lang === 'en' ? "Schedule" : "预约计划",
      desc: lang === 'en' ? "Choose your frequency and pick a convenient day for your first clean." : "选择服务频率，并为您的第一次清洁挑选一个方便的日期。"
    },
    {
      icon: <MousePointer2 size={32} />,
      title: lang === 'en' ? "We Arrive" : "我们到达",
      desc: lang === 'en' ? "Our professional team arrives and safely enters your yard, checking all gates." : "我们的专业团队到达后安全进入您的院子，并检查所有门锁。"
    },
    {
      icon: <ListChecks size={32} />,
      title: lang === 'en' ? "Thorough Scoop" : "彻底清理",
      desc: lang === 'en' ? "We scan the entire area in a grid pattern to ensure no spot is missed." : "我们以网格模式扫描整个区域，确保不遗漏任何角落。"
    },
    {
      icon: <Sparkles size={32} />,
      title: lang === 'en' ? "Sanitize & Spray" : "消毒喷洒",
      desc: lang === 'en' ? "We apply pet-safe deodorizer and sanitizer to keep your lawn fresh." : "我们喷洒对宠物安全的除臭剂和消毒剂，保持草坪清新。"
    }
  ];

  const serviceOffers = [
    {
      title: lang === 'en' ? "Waste Removal" : "粪便清理",
      icon: <Layers className="text-brand-blue" />,
      details: lang === 'en' 
        ? ["Complete yard scan", "Waste bagged and hauled away", "Gate security check", "Photo confirmation"]
        : ["全院扫描", "粪便装袋并带离", "门禁安全检查", "照片确认"]
    },
    {
      title: lang === 'en' ? "Sanitization & Deodorizing" : "消毒与除臭",
      icon: <Sparkles className="text-brand-green" />,
      details: lang === 'en'
        ? ["Pet-safe enzyme treatment", "Eliminates urine & waste odors", "Kills bacteria & parasites", "Fresh scent finish"]
        : ["宠物安全酶处理", "消除尿液和粪便异味", "杀灭细菌和寄生虫", "持久留香"]
    },
    {
      title: lang === 'en' ? "Garden & Lawn Care" : "花园与草坪护理",
      icon: <Sprout className="text-brand-blue" />,
      details: lang === 'en'
        ? ["Lawn health assessment", "Eco-friendly fertilizers", "Leaf removal (Optional)", "Small brush cleanup"]
        : ["草坪健康评估", "环保肥料", "落叶清理（可选）", "小型灌木清理"]
    },
    {
      title: lang === 'en' ? "Indoor/Outdoor Litter" : "室内/室外猫砂服务",
      icon: <Wind className="text-brand-green" />,
      details: lang === 'en'
        ? ["Full litter box dump & scrub", "Sanitary refill", "Odor control treatment", "Weekly or bi-weekly"]
        : ["猫砂盆彻底清空与刷洗", "卫生猫砂填充", "异味控制处理", "每周或每两周一次"]
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar lang={lang} setLang={setLang} t={t} />

      {/* Header */}
      <section className="pt-40 pb-16 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">{lang === 'en' ? 'Our Deep Cleaning Services' : '我们的深度清洁服务'}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {lang === 'en' 
              ? "Professional pet waste management tailored to your home and lifestyle."
              : "为您家的生活方式定制的专业宠物粪便管理。"}
          </p>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">{lang === 'en' ? 'How It Works' : '服务流程'}</h2>
            <div className="w-20 h-1.5 bg-brand-blue mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, idx) => (
              <div key={idx} className="relative group">
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all h-full text-center hover:-translate-y-2">
                  <div className="w-16 h-16 bg-blue-50 text-brand-blue rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {serviceOffers.map((service, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[40px] shadow-sm flex flex-col md:flex-row gap-8 items-start hover:shadow-md transition-shadow">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                  {React.cloneElement(service.icon as React.ReactElement, { size: 32 })}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">{service.title}</h3>
                  <ul className="space-y-4">
                    {service.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-center gap-3 text-gray-600">
                        <CheckCircle size={18} className="text-brand-green flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h2 className="text-4xl font-bold mb-10 text-gray-900">{lang === 'en' ? 'Simple, Transparent Pricing' : '简单、透明的定价'}</h2>
          <p className="text-gray-600 mb-12">
            {lang === 'en'
              ? "No registration fees. No hidden costs. Just professional service and a clean yard. All our plans include thorough scoping, waste disposal, and pet-safe sanitizing sprays."
              : "无注册费。无隐藏费用。只有专业的服务和整洁的院子。我们所有的方案都包括彻底的清理、垃圾处理和对宠物安全的消毒喷雾。"}
          </p>
          <Link 
              href="/#plans"
              className="inline-flex items-center gap-3 bg-brand-blue text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-cyan-600 transition-all shadow-xl hover:-translate-y-1"
            >
              {lang === 'en' ? 'Check Pricing Plans' : '查看定价方案'}
            </Link>
        </div>
      </section>

      <Footer t={t} />
    </main>
  );
}

