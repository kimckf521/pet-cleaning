'use client';

import React, { useState } from 'react';
import { Trash2, Wind, ShieldCheck, Check, X, Minus, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { CONTENT } from '@/content';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type Lang = 'en' | 'cn';

export default function Home() {
  const [lang, setLang] = useState<Lang>('en');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', address: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  const [enquiryData, setEnquiryData] = useState({ name: '', email: '', message: '' });
  const [enquiryStatus, setEnquiryStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const [frequency, setFrequency] = useState<number | 'custom'>(1);
  const [numCats, setNumCats] = useState(1);
  const router = useRouter();

  const t = CONTENT[lang];

  const handleBookClick = (planName?: string) => {
    router.push('/book');
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setStatus('idle');
    setFormData({ name: '', phone: '', email: '', address: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/send-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: formData.name,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          plan_name: selectedPlan,
          num_cats: numCats,
          language: lang === 'en' ? 'English' : 'Chinese',
        }),
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Email sending error:', error);
      setStatus('error');
    }
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnquiryStatus('loading');

    try {
      const response = await fetch('/api/send-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: enquiryData.name,
          email: enquiryData.email,
          message: enquiryData.message,
          language: lang === 'en' ? 'English' : 'Chinese',
        }),
      });

      if (response.ok) {
        setEnquiryStatus('success');
        setTimeout(() => {
          setEnquiryStatus('idle');
          setEnquiryData({ name: '', email: '', message: '' });
        }, 3000);
      } else {
        setEnquiryStatus('error');
      }
    } catch (error) {
      console.error('Email sending error:', error);
      setEnquiryStatus('error');
    }
  };

  const calculateEssentialPrice = (freq: number | 'custom') => {
    if (freq === 'custom') return lang === 'en' ? 'Quote' : '联系定制';
    
    // 1. Calculate Subtotal Per Visit (Base + Extra Cats)
    const basePricePerVisit = 10;
    const extraCatFee = (Math.max(1, numCats) - 1) * 5;
    const subtotalPerVisit = basePricePerVisit + extraCatFee;

    // 2. Apply Discount Rate based on frequency
    let discountRate = 1.0;
    if (typeof freq === 'number') {
      if (freq >= 4 && freq <= 5) discountRate = 0.95; // 5% OFF
      if (freq >= 6) discountRate = 0.90; // 10% OFF
    }

    const finalPricePerVisit = subtotalPerVisit * discountRate;

    const total = (finalPricePerVisit * (typeof freq === 'number' ? freq : 1)).toFixed(2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1'); 
    return `$${total}${lang === 'en' ? '/Week' : '/周'}`;
  };

  const calculateStandardPrice = (basePrice: number, freq: number | 'custom') => {
     if (freq === 'custom') return lang === 'en' ? 'Quote' : '联系定制';

     const extraCatFee = (Math.max(1, numCats) - 1) * 5;
     const subtotalPerVisit = basePrice + extraCatFee;

     // Apply Discount Rate based on frequency (Same as Essential)
     let discountRate = 1.0;
     if (typeof freq === 'number') {
       if (freq >= 4 && freq <= 5) discountRate = 0.95; // 5% OFF
       if (freq >= 6) discountRate = 0.90; // 10% OFF
     }

     const finalPricePerVisit = subtotalPerVisit * discountRate;
     
     const total = (finalPricePerVisit * (typeof freq === 'number' ? freq : 1)).toFixed(2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1');
     return `$${total}${lang === 'en' ? '/Week' : '/周'}`;
  };

  const getDiscountBadge = (freq: number | 'custom') => {
    if (freq === 'custom') return null;
    if (typeof freq === 'number') {
      if (freq >= 4 && freq <= 5) return lang === 'en' ? '5% OFF' : '5%优惠';
      if (freq >= 6) return lang === 'en' ? '10% OFF' : '10%优惠';
    }
    return null;
  };

  const getFormattedPlan = (planName: string) => {
    if (frequency === 'custom') {
       return `${planName} (${t.pricing.custom})`;
    }
    const discount = getDiscountBadge(frequency);
    const discountStr = discount ? ` (${discount})` : '';
    
    if (lang === 'cn') {
      return `${planName} - ${frequency} 次/周${discountStr}`;
    }
    const unit = frequency === 1 ? 'Time' : 'Times';
    return `${planName} - ${frequency} ${unit}${discountStr}`;
  };

  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans">
      <Navbar lang={lang} setLang={setLang} t={t} />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-blue-50 to-white text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
            {t.hero.headline}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.hero.subhead}
          </p>
          <button
            onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-8 bg-brand-green text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl hover:bg-green-600 transition-all transform hover:-translate-y-1"
          >
            {t.hero.cta}
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-12 text-center">
          <div className="p-6 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors">
            <Trash2 className="w-12 h-12 text-brand-blue mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">{t.features.trash.title}</h3>
            <p className="text-gray-600">{t.features.trash.desc}</p>
          </div>
          <div className="p-6 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors">
            <Wind className="w-12 h-12 text-brand-blue mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">{t.features.vacuum.title}</h3>
            <p className="text-gray-600">{t.features.vacuum.desc}</p>
          </div>
          <div className="p-6 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors">
            <ShieldCheck className="w-12 h-12 text-brand-green mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">{t.features.shield.title}</h3>
            <p className="text-gray-600">{t.features.shield.desc}</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="plans" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Essential */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative">
              {getDiscountBadge(frequency) && (
                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-lg">
                  {getDiscountBadge(frequency)}
                </div>
              )}
              <h3 className="text-xl font-bold text-gray-900 text-center">{t.pricing.essential.name}</h3>
              <div className="text-4xl font-extrabold text-brand-blue my-4 text-center">
                {calculateEssentialPrice(frequency)}
              </div>
              <ul className="space-y-3 mb-8">
                {t.pricing.essential.features.map((f: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-gray-600">
                    <Check className="w-5 h-5 text-brand-green" /> {f}
                  </li>
                ))}
              </ul>
              
              <div className="mb-6 space-y-4">
                <div>
                   <label className="block text-sm font-medium text-center text-gray-700 mb-2">{t.pricing.cats_label}</label>
                   <div className="flex items-center justify-between w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 rounded-xl">
                     <button
                       onClick={() => setNumCats(Math.max(1, numCats - 1))}
                       className={`p-1 rounded-full text-brand-blue hover:bg-white transition-colors ${numCats <= 1 ? 'invisible' : ''}`}
                       disabled={numCats <= 1}
                     >
                       <Minus size={20} />
                     </button>
                     <span className="font-medium text-lg w-12 text-center">{numCats}</span>
                     <button
                       onClick={() => setNumCats(numCats + 1)}
                       className="p-1 rounded-full text-brand-blue hover:bg-white transition-colors"
                     >
                       <Plus size={20} />
                     </button>
                   </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-center text-gray-700 mb-2">{t.pricing.frequency_label}</label>
                  <div className="relative">
                    <select
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value === 'custom' ? 'custom' : Number(e.target.value))}
                      className="w-full appearance-none bg-gray-50 border border-gray-200 text-center text-gray-700 py-3 px-4 pr-8 rounded-xl leading-tight focus:outline-none focus:bg-white focus:border-brand-blue"
                    >
                      {[1, 2, 3, 4, 5, 6, 7].map(num => (
                        <option key={num} value={num}>
                          {num} {lang === 'en' ? (num === 1 ? 'Time' : 'Times') : t.pricing.times_unit}{getDiscountBadge(num) ? ` (${getDiscountBadge(num)})` : ''}
                        </option>
                      ))}
                      <option value="custom">{t.pricing.custom}</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleBookClick(getFormattedPlan(t.pricing.essential.name))}
                className="w-full py-3 rounded-xl border-2 border-brand-blue text-brand-blue font-bold hover:bg-brand-blue hover:text-white transition-colors"
                title={`${t.pricing.essential.name} Pricing`}
              >
                {frequency === 'custom' ? t.pricing.contact_btn : t.pricing.btn}
              </button>
            </div>

            {/* Care Plus */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-brand-blue relative transform md:-translate-y-4 hover:shadow-2xl hover:md:-translate-y-6 transition-all duration-300">
              <div className="absolute top-0 left-0 bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-br-xl rounded-tl-lg">
                {t.pricing.care.popular}
              </div>
              {getDiscountBadge(frequency) && (
                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-lg">
                  {getDiscountBadge(frequency)}
                </div>
              )}
              <h3 className="text-xl font-bold text-gray-900 text-center">{t.pricing.care.name}</h3>
              <div className="text-4xl font-extrabold text-brand-blue my-4 text-center">
                 {calculateStandardPrice(15, frequency)}
              </div>
              <ul className="space-y-3 mb-8">
                {t.pricing.care.features.map((f: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-gray-600">
                    <Check className="w-5 h-5 text-brand-green" /> {f}
                  </li>
                ))}
              </ul>

              <div className="mb-6 space-y-4">
                <div>
                   <label className="block text-sm font-medium text-center text-gray-700 mb-2">{t.pricing.cats_label}</label>
                   <div className="flex items-center justify-between w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 rounded-xl">
                     <button
                       onClick={() => setNumCats(Math.max(1, numCats - 1))}
                       className={`p-1 rounded-full text-brand-blue hover:bg-white transition-colors ${numCats <= 1 ? 'invisible' : ''}`}
                       disabled={numCats <= 1}
                     >
                       <Minus size={20} />
                     </button>
                     <span className="font-medium text-lg w-12 text-center">{numCats}</span>
                     <button
                       onClick={() => setNumCats(numCats + 1)}
                       className="p-1 rounded-full text-brand-blue hover:bg-white transition-colors"
                     >
                       <Plus size={20} />
                     </button>
                   </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-center text-gray-700 mb-2">{t.pricing.frequency_label}</label>
                  <div className="relative">
                    <select
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value === 'custom' ? 'custom' : Number(e.target.value))}
                      className="w-full appearance-none bg-gray-50 border border-gray-200 text-center text-gray-700 py-3 px-4 pr-8 rounded-xl leading-tight focus:outline-none focus:bg-white focus:border-brand-blue"
                    >
                      {[1, 2, 3, 4, 5, 6, 7].map(num => (
                        <option key={num} value={num}>
                          {num} {lang === 'en' ? (num === 1 ? 'Time' : 'Times') : t.pricing.times_unit}{getDiscountBadge(num) ? ` (${getDiscountBadge(num)})` : ''}
                        </option>
                      ))}
                      <option value="custom">{t.pricing.custom}</option>
                    </select>
                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>
              </div>

              <button
                 onClick={() => handleBookClick(getFormattedPlan(t.pricing.care.name))}
                className="w-full py-3 rounded-xl bg-brand-blue text-white font-bold hover:bg-cyan-600 transition-colors shadow-lg"
                 title={`${t.pricing.care.name} Pricing`}
              >
                {frequency === 'custom' ? t.pricing.contact_btn : t.pricing.btn}
              </button>
            </div>

            {/* Ultimate */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative">
              {getDiscountBadge(frequency) && (
                <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-lg">
                  {getDiscountBadge(frequency)}
                </div>
              )}
              <h3 className="text-xl font-bold text-gray-900 text-center">{t.pricing.ultimate.name}</h3>
              <div className="text-4xl font-extrabold text-brand-blue my-4 text-center">
                {calculateStandardPrice(20, frequency)}
              </div>
              <ul className="space-y-3 mb-8">
                {t.pricing.ultimate.features.map((f: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-gray-600">
                    <Check className="w-5 h-5 text-brand-green" /> {f}
                  </li>
                ))}
              </ul>

              <div className="mb-6 space-y-4">
                 <div>
                   <label className="block text-sm font-medium text-center text-gray-700 mb-2">{t.pricing.cats_label}</label>
                   <div className="flex items-center justify-between w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 rounded-xl">
                     <button
                       onClick={() => setNumCats(Math.max(1, numCats - 1))}
                       className={`p-1 rounded-full text-brand-blue hover:bg-white transition-colors ${numCats <= 1 ? 'invisible' : ''}`}
                       disabled={numCats <= 1}
                     >
                       <Minus size={20} />
                     </button>
                     <span className="font-medium text-lg w-12 text-center">{numCats}</span>
                     <button
                       onClick={() => setNumCats(numCats + 1)}
                       className="p-1 rounded-full text-brand-blue hover:bg-white transition-colors"
                     >
                       <Plus size={20} />
                     </button>
                   </div>
                </div>

                 <div>
                   <label className="block text-sm font-medium text-center text-gray-700 mb-2">{t.pricing.frequency_label}</label>
                   <div className="relative">
                    <select
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value === 'custom' ? 'custom' : Number(e.target.value))}
                      className="w-full appearance-none bg-gray-50 border border-gray-200 text-center text-gray-700 py-3 px-4 pr-8 rounded-xl leading-tight focus:outline-none focus:bg-white focus:border-brand-blue"
                    >
                      {[1, 2, 3, 4, 5, 6, 7].map(num => (
                        <option key={num} value={num}>
                          {num} {lang === 'en' ? (num === 1 ? 'Time' : 'Times') : t.pricing.times_unit}{getDiscountBadge(num) ? ` (${getDiscountBadge(num)})` : ''}
                        </option>
                      ))}
                      <option value="custom">{t.pricing.custom}</option>
                    </select>
                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>
              </div>

              <button
                 onClick={() => handleBookClick(getFormattedPlan(t.pricing.ultimate.name))}
                className="w-full py-3 rounded-xl border-2 border-brand-blue text-brand-blue font-bold hover:bg-brand-blue hover:text-white transition-colors"
                 title={`${t.pricing.ultimate.name} Pricing`}
              >
                {frequency === 'custom' ? t.pricing.contact_btn : t.pricing.btn}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.contact_form.title}</h2>
            <p className="text-xl text-gray-600">{t.contact_form.subhead}</p>
          </div>
          <form onSubmit={handleEnquirySubmit} className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="enquiry-name">
                  {t.contact_form.name}
                </label>
                <input
                  type="text"
                  id="enquiry-name"
                  value={enquiryData.name}
                  onChange={(e) => setEnquiryData({ ...enquiryData, name: e.target.value })}
                  className="w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 rounded-xl leading-tight focus:outline-none focus:border-brand-blue transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="enquiry-email">
                  {t.contact_form.email}
                </label>
                <input
                  type="email"
                  id="enquiry-email"
                  value={enquiryData.email}
                  onChange={(e) => setEnquiryData({ ...enquiryData, email: e.target.value })}
                  className="w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 rounded-xl leading-tight focus:outline-none focus:border-brand-blue transition-colors"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="enquiry-message">
                {t.contact_form.message}
              </label>
              <textarea
                id="enquiry-message"
                value={enquiryData.message}
                onChange={(e) => setEnquiryData({ ...enquiryData, message: e.target.value })}
                className="w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 rounded-xl leading-tight focus:outline-none focus:border-brand-blue transition-colors h-32 resize-none"
                required
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                disabled={enquiryStatus === 'loading' || enquiryStatus === 'success'}
                className={`w-full md:w-auto px-8 py-3 rounded-xl font-bold text-white transition-all transform hover:-translate-y-1 ${
                  enquiryStatus === 'success' ? 'bg-green-500 hover:bg-green-600' : 'bg-brand-blue hover:bg-cyan-600 shadow-lg hover:shadow-xl'
                }`}
              >
                {enquiryStatus === 'loading' ? t.contact_form.loading : enquiryStatus === 'success' ? t.contact_form.success : t.contact_form.submit}
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer t={t} />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <button
               onClick={handleClose}
               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold mb-6 text-gray-900">{t.modal.title}</h2>

            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8" />
                </div>
                <p className="text-xl font-semibold text-green-600">{t.modal.success}</p>
              </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.modal.plan}</label>
                    <input
                    type="text"
                    readOnly
                    value={selectedPlan}
                    className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.modal.name}</label>
                    <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.modal.phone}</label>
                    <input
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                    placeholder="0400 000 000"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.modal.email}</label>
                    <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                    placeholder="john@example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.modal.address}</label>
                    <textarea
                    required
                    rows={3}
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                    placeholder="123 Example St, Blackburn"
                    />
                </div>

                {status === 'error' && (
                    <p className="text-red-500 text-sm">{t.modal.error}</p>
                )}

                <button
                    disabled={status === 'loading'}
                    type="submit"
                    className="w-full bg-brand-blue text-white py-3 rounded-xl font-bold hover:bg-cyan-600 transition-colors disabled:opacity-50"
                >
                    {status === 'loading' ? t.modal.loading : t.modal.submit}
                </button>
                </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
