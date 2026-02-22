'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { ShieldCheck, MapPin, User, Mail, Phone, Calendar, Check, ArrowLeft, ArrowRight, Loader2, Minus, Plus } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

const CONTENT = {
  en: {
    title: 'Book Your Service',
    steps: ['Contact Details', 'Service Details', 'Confirmation'],
    form: {
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      address: 'Property Address',
      numCats: 'Number of Cats',
      frequency: 'Visits per Week',
      customFreq: '7+ (Custom Quote)',
      preferredTime: 'Preferred Time of Day',
      notes: 'Additional Notes (Optional)',
      total: 'Weekly Total',
      priceQuote: 'Quote (Contact Us)',
      planLabel: 'Selected Package',
      plans: {
        essential: 'Essential ($10)',
        care: 'Care Plus ($15)',
        ultimate: 'Ultimate ($20)',
      }
    },
    options: {
      morning: 'Morning (8am - 12pm)',
      afternoon: 'Afternoon (12pm - 4pm)',
      evening: 'Evening (4pm - 8pm)',
    },
    buttons: {
      next: 'Next Step',
      back: 'Back',
      submit: 'Confirm Booking',
      loading: 'Processing...',
      home: 'Back to Home',
    },
      success: {
        title: 'Booking Confirmed!',
        message: 'Thank you for choosing ScooPo. We will contact you within 24 hours to finalize your schedule.',
      },
      validation: {
        required: 'This field is required',
        contact: 'Please provide either an Email or a Phone Number',
      },
      redirecting: 'Redirecting to home in',
      seconds: 's...',
      agreement: {
        prefix: 'I have read and agree to the ',
        privacy: 'Privacy Policy',
        and: ' and ',
        terms: 'Terms of Service',
      }
    },
  cn: {
    title: '预订服务',
    steps: ['联系人信息', '服务细节', '确认预约'],
    form: {
      name: '姓名',
      email: '电子邮件',
      phone: '电话号码',
      address: '详细地址',
      numCats: '猫咪数量',
      frequency: '每周服务次数',
      customFreq: '7次以上 (联系定制)',
      preferredTime: '首选服务时间段',
      notes: '备注信息（可选）',
      total: '总计 (周)',
      priceQuote: '联系定制',
      planLabel: '已选方案',
      plans: {
        essential: '基础版 ($10)',
        care: '优享版 ($15)',
        ultimate: '尊享版 ($20)',
      }
    },
    options: {
      morning: '上午 (8am - 12pm)',
      afternoon: '下午 (12pm - 4pm)',
      evening: '晚上 (4pm - 8pm)',
    },
    buttons: {
      next: '下一步',
      back: '上一步',
      submit: '确认预订',
      loading: '提交中...',
      home: '回到首页',
    },
      success: {
        title: '预约已成功！',
        message: '感谢您选择 ScooPo。我们将在 24 小时内联系您以确认最终时间表。',
      },
      validation: {
        required: '必填项',
        contact: '请至少提供电子邮件或电话号码中的一项',
      },
      redirecting: '将在',
      seconds: '秒后自动返回首页...',
      agreement: {
        prefix: '我已阅读并同意 ',
        privacy: '隐私政策',
        and: ' 和 ',
        terms: '服务条款',
      }
    }
};

type Lang = 'en' | 'cn';

function BookingContent() {
  const [lang, setLang] = useState<Lang>('en');
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [countdown, setCountdown] = useState(10);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    numCats: 1,
    frequency: 1 as number | string,
    timeOfDay: 'morning',
    notes: '',
    plan: 'Essential',
  });

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const cats = searchParams.get('cats');
    const freq = searchParams.get('freq');
    const plan = searchParams.get('plan');
    const language = searchParams.get('lang');
    
    if (cats || freq || plan || language) {
      if (language === 'en' || language === 'cn') {
        setLang(language as Lang);
      }
      setFormData(prev => ({
        ...prev,
        numCats: cats ? parseInt(cats) : prev.numCats,
        frequency: freq && freq !== 'custom' ? parseInt(freq) : (freq === 'custom' ? 'custom' : prev.frequency),
        plan: plan || prev.plan,
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === 'success' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (status === 'success' && countdown === 0) {
      router.push(`/?lang=${lang}`);
    }
    return () => clearInterval(timer);
  }, [status, countdown, router, lang]);

  const getDiscountBadge = (freq: number) => {
    if (freq >= 4 && freq <= 5) return '5% OFF';
    if (freq >= 6) return '10% OFF';
    return null;
  };

  const calculatePrice = () => {
    if (formData.frequency === 'custom') return t.form.priceQuote;

    let basePricePerVisit = 10;
    if (formData.plan.includes('Care Plus') || formData.plan.includes('优享版')) basePricePerVisit = 15;
    if (formData.plan.includes('Ultimate') || formData.plan.includes('尊享版')) basePricePerVisit = 20;

    const extraCatFee = (Math.max(1, formData.numCats) - 1) * 5;
    const subtotalPerVisit = basePricePerVisit + extraCatFee;

    let discountRate = 1.0;
    const freq = Number(formData.frequency);
    if (freq >= 4 && freq <= 5) discountRate = 0.95; 
    if (freq >= 6) discountRate = 0.90;

    const total = (subtotalPerVisit * discountRate * freq).toFixed(2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1');
    return `$${total}`;
  };

  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 5) return phoneNumber;
    if (phoneNumberLength < 8) {
      return `${phoneNumber.slice(0, 4)} ${phoneNumber.slice(4)}`;
    }
    return `${phoneNumber.slice(0, 4)} ${phoneNumber.slice(4, 7)} ${phoneNumber.slice(7, 10)}`;
  };

  const t = CONTENT[lang];

  const validateStep1 = () => {
    const newErrors: Record<string, boolean> = {};
    if (!formData.name) newErrors.name = true;
    if (!formData.address) newErrors.address = true;
    if (!formData.email && !formData.phone) {
      newErrors.email = true;
      newErrors.phone = true;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    setStep(step + 1);
  };
  const handleBack = () => {
    setErrors({});
    setStep(step - 1);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    // Safety check: only submit if we are on step 3
    if (step !== 3) return;

    // Manual Validation check for all required fields
    if (!validateStep1()) {
      setStep(1);
      return;
    }

    setStatus('loading');

    try {
      // Use the unified internal API route
      const response = await fetch('/api/send-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: formData.name,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          plan_name: formData.plan,
          num_cats: formData.numCats,
          frequency: formData.frequency,
          language: lang === 'en' ? 'English' : 'Chinese',
        }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Booking error:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-12 rounded-3xl shadow-xl max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{t.success.title}</h1>
          <p className="text-gray-600 leading-relaxed">{t.success.message}</p>
          <div className="py-2">
            <p className="text-sm text-gray-400 italic">
              {t.redirecting} {countdown}{t.seconds}
            </p>
          </div>
          <Link 
            href={`/?lang=${lang}`}
            className="inline-block bg-brand-blue text-white px-8 py-3 rounded-xl font-bold hover:bg-cyan-600 transition-all"
          >
            {t.buttons.home}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Mini Nav */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href={`/?lang=${lang}`} className="text-xl font-bold text-brand-blue flex items-center gap-2">
            <ShieldCheck className="w-6 h-6" />
            ScooPo
          </Link>
          <button
            onClick={() => setLang(lang === 'en' ? 'cn' : 'en')}
            className="text-sm font-bold text-brand-blue border border-brand-blue px-3 py-1 rounded-full hover:bg-brand-blue hover:text-white transition-all"
          >
            {lang === 'en' ? '中文' : 'EN'}
          </button>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-4 max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center">
          {t.title}
        </h1>

        {/* Progress Tracker */}
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 -z-10"></div>
          {t.steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  step > i + 1 ? 'bg-green-500 text-white' : 
                  step === i + 1 ? 'bg-brand-blue text-white' : 
                  'bg-gray-100 text-gray-400'
                }`}
              >
                {step > i + 1 ? <Check className="w-5 h-5" /> : i + 1}
              </div>
              <span className={`text-xs font-medium ${step === i + 1 ? 'text-brand-blue' : 'text-gray-400'}`}>
                {s}
              </span>
            </div>
          ))}
        </div>

        {/* Form Container */}
        <div className="bg-gray-50 p-8 rounded-3xl shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-bold text-gray-700">{t.form.name}</label>
                        {errors.name && <span className="text-red-500 text-[10px] font-bold uppercase">{t.validation.required}</span>}
                    </div>
                    <div className="relative">
                      <User className={`absolute left-4 top-3.5 w-5 h-5 ${errors.name ? 'text-red-400' : 'text-gray-400'}`} />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                            if (errors.name) setErrors({...errors, name: false});
                        }}
                        className={`w-full pl-12 pr-4 py-3 bg-white border rounded-xl focus:outline-none focus:border-brand-blue ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-bold text-gray-700">{t.form.email}</label>
                        {errors.email && !formData.phone && <span className="text-red-500 text-[10px] font-bold uppercase">{t.validation.contact}</span>}
                    </div>
                    <div className="relative">
                      <Mail className={`absolute left-4 top-3.5 w-5 h-5 ${errors.email && !formData.phone ? 'text-red-400' : 'text-gray-400'}`} />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (errors.email) setErrors({...errors, email: false, phone: false});
                        }}
                        className={`w-full pl-12 pr-4 py-3 bg-white border rounded-xl focus:outline-none focus:border-brand-blue ${errors.email && !formData.phone ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-bold text-gray-700">{t.form.phone}</label>
                        {errors.phone && !formData.email && <span className="text-red-500 text-[10px] font-bold uppercase">{t.validation.contact}</span>}
                    </div>
                    <div className="relative">
                      <Phone className={`absolute left-4 top-3.5 w-5 h-5 ${errors.phone && !formData.email ? 'text-red-400' : 'text-gray-400'}`} />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                            const formatted = formatPhoneNumber(e.target.value);
                            setFormData({ ...formData, phone: formatted });
                            if (errors.phone) setErrors({...errors, email: false, phone: false});
                        }}
                        className={`w-full pl-12 pr-4 py-3 bg-white border rounded-xl focus:outline-none focus:border-brand-blue ${errors.phone && !formData.email ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                        placeholder="0400 000 000"
                        maxLength={12}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-bold text-gray-700">{t.form.address}</label>
                        {errors.address && <span className="text-red-500 text-[10px] font-bold uppercase">{t.validation.required}</span>}
                    </div>
                    <div className="relative">
                      <MapPin className={`absolute left-4 top-3.5 w-5 h-5 ${errors.address ? 'text-red-400' : 'text-gray-400'}`} />
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => {
                            setFormData({ ...formData, address: e.target.value });
                            if (errors.address) setErrors({...errors, address: false});
                        }}
                        className={`w-full pl-12 pr-4 py-3 bg-white border rounded-xl focus:outline-none focus:border-brand-blue ${errors.address ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                        placeholder="123 Example St, Blackburn"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">{t.form.planLabel}</label>
                  <div className="grid grid-cols-3 gap-3">
                    {Object.entries(t.form.plans).map(([key, label]) => {
                      const baseName = (label as string).split(' (')[0];
                      const isActive = formData.plan.includes(baseName);
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => {
                            const discount = getDiscountBadge(Number(formData.frequency));
                            const discountStr = discount ? ` (${discount})` : '';
                            setFormData({ ...formData, plan: `${baseName}${discountStr}` });
                          }}
                          className={`flex flex-col items-center justify-center py-3 px-2 rounded-xl border-2 transition-all h-[72px] ${
                            isActive
                              ? 'border-brand-blue bg-blue-50 text-brand-blue shadow-sm' 
                              : 'border-white bg-white text-gray-400 hover:border-gray-200'
                          }`}
                        >
                          <span className={`block font-bold mb-0.5 ${isActive ? 'text-sm' : 'text-xs'}`}>{baseName}</span>
                          <span className={`${isActive ? 'text-brand-blue/70 text-xs' : 'text-gray-300 text-[10px]'} font-medium`}>
                            {key === 'essential' ? `$10/${lang === 'en' ? 'visit' : '次'}` : key === 'care' ? `$15/${lang === 'en' ? 'visit' : '次'}` : `$20/${lang === 'en' ? 'visit' : '次'}`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">{t.form.numCats}</label>
                    <div className="flex items-center justify-between w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 rounded-xl h-[50px]">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, numCats: Math.max(1, formData.numCats - 1) })}
                        className={`p-1 rounded-full text-brand-blue hover:bg-gray-50 transition-colors ${formData.numCats <= 1 ? 'invisible' : ''}`}
                        disabled={formData.numCats <= 1}
                      >
                        <Minus size={20} />
                      </button>
                      <span className="font-medium text-lg w-12 text-center">{formData.numCats}</span>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, numCats: formData.numCats + 1 })}
                        className="p-1 rounded-full text-brand-blue hover:bg-gray-50 transition-colors"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">{t.form.frequency}</label>
                    <select
                      value={formData.frequency}
                      onChange={(e) => setFormData({ ...formData, frequency: e.target.value === 'custom' ? 'custom' : parseInt(e.target.value) })}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue appearance-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7].map(num => {
                        const discount = getDiscountBadge(num);
                        const label = num === 1 ? (lang === 'en' ? 'visit/week' : '次/周') : (lang === 'en' ? 'visits/week' : '次/周');
                        return (
                          <option key={num} value={num}>
                            {num} {label}{discount ? ` (${discount})` : ''}
                          </option>
                        );
                      })}
                      <option value="custom">{t.form.customFreq}</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">{t.form.preferredTime}</label>
                  <div className="grid grid-cols-3 gap-3">
                    {Object.entries(t.options).map(([key, label]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setFormData({ ...formData, timeOfDay: key })}
                        className={`py-3 px-2 rounded-xl text-xs font-bold border-2 transition-all ${
                          formData.timeOfDay === key 
                              ? 'border-brand-blue bg-blue-50 text-brand-blue' 
                              : 'border-white bg-white text-gray-400 text-gray-400 hover:border-gray-200'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">{t.form.notes}</label>
                    <textarea
                        rows={3}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue resize-none"
                        placeholder="..."
                      ></textarea>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-gray-500 font-medium">{t.form.total}</span>
                  <span className="text-2xl font-bold text-brand-blue">{calculatePrice()}</span>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4">
                  <div className="flex justify-between pb-4 border-b border-gray-100">
                    <span className="text-gray-500">{t.form.planLabel}</span>
                    <span className="font-bold text-right max-w-[200px]">{formData.plan}</span>
                  </div>
                  <div className="flex justify-between pb-4 border-b border-gray-100">
                    <span className="text-gray-500">{t.form.name}</span>
                    <span className="font-bold">{formData.name}</span>
                  </div>
                  <div className="flex justify-between pb-4 border-b border-gray-100">
                    <span className="text-gray-500">{t.form.phone}</span>
                    <span className="font-bold">{formData.phone}</span>
                  </div>
                  <div className="flex justify-between pb-4 border-b border-gray-100">
                    <span className="text-gray-500">{t.form.numCats}</span>
                    <span className="font-bold">{formData.numCats}</span>
                  </div>
                  <div className="flex justify-between pb-4 border-b border-gray-100">
                    <span className="text-gray-500">{t.form.frequency}</span>
                    <span className="font-bold">
                      {formData.frequency === 'custom' ? t.form.customFreq : `${formData.frequency} ${lang === 'en' ? (formData.frequency === 1 ? 'visit/week' : 'visits/week') : '次/周'}`}
                    </span>
                  </div>
                  <div className="flex justify-between pb-4 border-b border-gray-100">
                    <span className="text-gray-500">{t.form.total}</span>
                    <span className="font-bold text-brand-blue text-lg">{calculatePrice()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Address</span>
                    <span className="font-bold text-right max-w-[200px] truncate">{formData.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm animate-in fade-in duration-500">
                  <input
                    type="checkbox"
                    id="terms-agreement"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-gray-300 text-brand-blue focus:ring-brand-blue transition-all cursor-pointer"
                  />
                  <label htmlFor="terms-agreement" className="text-sm text-gray-600 leading-relaxed cursor-pointer select-none">
                    {t.agreement.prefix}
                    <Link 
                      href={`/privacy?lang=${lang}`} 
                      target="_blank" 
                      className="text-brand-blue font-bold hover:underline decoration-brand-blue/30"
                    >
                      {t.agreement.privacy}
                    </Link>
                    {t.agreement.and}
                    <Link 
                      href={`/terms?lang=${lang}`} 
                      target="_blank" 
                      className="text-brand-blue font-bold hover:underline decoration-brand-blue/30"
                    >
                      {t.agreement.terms}
                    </Link>
                  </label>
                </div>
                
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 animate-in fade-in duration-500">
                  <p className="text-sm text-amber-800 leading-relaxed font-medium">
                    {lang === 'en' 
                      ? "📌 Important: We use your cat litter for refill/replacement. Please ensure you have sufficient supply available before service."
                      : "📌 重要提示：我们使用您自备的猫砂进行填充或更换。请确保在服务前备好充足的猫砂。"}
                  </p>
                </div>

                {status === 'error' && (
                    <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
                )}
              </div>
            )}

            {/* Nav Buttons */}
            <div className="mt-12 flex items-center justify-between gap-4">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  {t.buttons.back}
                </button>
              ) : (
                <Link
                  href={`/?lang=${lang}`}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  {t.buttons.home}
                </Link>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 bg-brand-blue text-white px-8 py-3 rounded-xl font-bold hover:bg-cyan-600 transition-all shadow-lg shadow-blue-100"
                >
                  {t.buttons.next}
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  disabled={status === 'loading' || !agreedToTerms}
                  className={`flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold transition-all shadow-lg flex-1 ${
                    agreedToTerms 
                      ? 'bg-brand-green text-white hover:bg-green-600 shadow-green-100' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                  }`}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t.buttons.loading}
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5" />
                      {t.buttons.submit}
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-brand-blue" />
      </div>
    }>
      <BookingContent />
    </Suspense>
  );
}
