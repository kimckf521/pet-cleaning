'use client';

import React, { useState } from 'react';
import { Leaf, Heart, ShieldCheck, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { CONTENT } from '@/content';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const [lang, setLang] = useState<'en' | 'cn'>('en');
  const t = CONTENT[lang];

  return (
    <main className="min-h-screen bg-white">
      <Navbar lang={lang} setLang={setLang} t={t} />
      
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-blue rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-green rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-brand-blue text-sm font-bold rounded-full mb-6 uppercase tracking-wider">
            {lang === 'en' ? 'Our Story' : '我们的故事'}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            {lang === 'en' ? (
              <>Scooping for a <span className="text-brand-blue">Cleaner</span>,<br /> <span className="text-brand-green">Happier</span> Community</>
            ) : (
              <>为社区创造 <span className="text-brand-blue">更清洁</span>、<br /><span className="text-brand-green">更快乐</span> 的环境</>
            )}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            {lang === 'en' 
              ? "At ScooPo, we believe that pet ownership should be all about the joy, not the mess. We're dedicated to keeping your yard safe and clean."
              : "在 ScooPo，我们认为养宠应当充满乐趣，而非烦恼。我们致力于保持您的院子安全、整洁。"}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                {lang === 'en' ? 'Our Mission & Values' : '我们的使命与价值观'}
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center flex-shrink-0 text-brand-blue">
                    <Leaf />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">{lang === 'en' ? 'Eco-Friendly First' : '环保至上'}</h3>
                    <p className="text-gray-600">
                      {lang === 'en' 
                        ? "We use 100% biodegradable materials and pet-safe sanitizers to protect your lawn and the planet."
                        : "我们使用 100% 可降解材料和对宠物安全的消毒剂，保护您的草坪和地球。"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center flex-shrink-0 text-brand-green">
                    <Heart />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">{lang === 'en' ? 'Health Focused' : '专注于健康'}</h3>
                    <p className="text-gray-600">
                      {lang === 'en'
                        ? "Regular waste removal prevents the spread of bacteria and parasites, keeping your family and pets safe."
                        : "定期清理粪便可防止细菌和寄生虫传播，保护您家人和宠物的安全。"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center flex-shrink-0 text-brand-blue">
                    <ShieldCheck />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">{lang === 'en' ? 'Reliable Service' : '可靠的服务'}</h3>
                    <p className="text-gray-600">
                      {lang === 'en'
                        ? "Our professional \"Scoopers\" are background-checked and committed to showing up on time, every time."
                        : "我们的专业清理员都经过背景调查，承诺每次都准时到达。"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-white rounded-[40px] shadow-2xl p-8 flex flex-col justify-center items-center text-center space-y-6 border border-gray-100">
                <div className="w-24 h-24 bg-blue-50 text-brand-blue rounded-full flex items-center justify-center">
                  <Award size={48} />
                </div>
                <h3 className="text-3xl font-bold">{lang === 'en' ? 'The ScooPo Standard' : 'ScooPo 标准'}</h3>
                <p className="text-gray-500 leading-relaxed">
                  {lang === 'en'
                    ? '"We don\'t just pick it up. We deep-clean your outdoor space, ensuring every visit leaves your yard pristine and smelling fresh."'
                    : "“我们不仅仅是把粪便捡走。我们会对您的户外空间进行深度清洁，确保每次服务后，您的院子都整洁如新、气味清新。”"}
                </p>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-green rounded-3xl -z-10 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-16">{lang === 'en' ? 'Why Homeowners Love Us' : '为什么业主选择我们'}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-2">
              <CheckCircle2 className="text-brand-blue mb-4 mx-auto" size={40} />
              <h3 className="text-xl font-bold mb-3">{lang === 'en' ? 'No Contracts' : '无需签约'}</h3>
              <p className="text-gray-600 text-sm">
                {lang === 'en' ? "Pause or cancel your service anytime. We earn your business with every visit." : "随时暂停或取消服务。我们用每一次的服务赢得您的信任。"}
              </p>
            </div>
            <div className="p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-2">
              <CheckCircle2 className="text-brand-blue mb-4 mx-auto" size={40} />
              <h3 className="text-xl font-bold mb-3">{lang === 'en' ? 'Photo Updates' : '照片更新'}</h3>
              <p className="text-gray-600 text-sm">
                {lang === 'en' ? "Receive a photo of your secured gate and clean yard after every service." : "每次服务后都会收到门禁锁好和院子清洁的照片。"}
              </p>
            </div>
            <div className="p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-2">
              <CheckCircle2 className="text-brand-blue mb-4 mx-auto" size={40} />
              <h3 className="text-xl font-bold mb-3">{lang === 'en' ? 'Satisfaction Guaranteed' : '满意保证'}</h3>
              <p className="text-gray-600 text-sm">
                {lang === 'en' ? "Not happy with a scoop? We'll come back and re-clean your yard for free." : "对清理不满意？我们将免费为您重新清洁院子。"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-brand-blue rounded-[40px] p-12 text-center text-white relative overflow-hidden shadow-2xl">
            <h2 className="text-4xl font-bold mb-6">{lang === 'en' ? 'Ready for a Cleaner Yard?' : '准备好迎接更整洁的院子了吗？'}</h2>
            <Link 
              href="/book"
              className="inline-flex items-center gap-2 bg-white text-brand-blue px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all shadow-lg"
            >
              {lang === 'en' ? 'Get Started Now' : '立即开始'} <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <Footer t={t} />
    </main>
  );
}

