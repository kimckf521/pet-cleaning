'use client';

import React, { useState } from 'react';
import { ShieldCheck, MapPin, User, Mail, Phone, Calendar, Check, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

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
      preferredTime: 'Preferred Time of Day',
      notes: 'Additional Notes (Optional)',
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
      preferredTime: '首选服务时间段',
      notes: '备注信息（可选）',
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
    }
  }
};

type Lang = 'en' | 'cn';

export default function BookingPage() {
  const [lang, setLang] = useState<Lang>('en');
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    numCats: 1,
    frequency: 1,
    timeOfDay: 'morning',
    notes: '',
  });

  const t = CONTENT[lang];

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Reusing the existing API endpoint or a new one as planned
      const response = await fetch('http://localhost:8080/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
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
          <Link 
            href="/"
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
          <Link href="/" className="text-xl font-bold text-brand-blue flex items-center gap-2">
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
                    <label className="block text-sm font-bold text-gray-700 mb-2">{t.form.name}</label>
                    <div className="relative">
                      <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">{t.form.email}</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">{t.form.phone}</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue"
                        placeholder="0400 000 000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">{t.form.address}</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                      <textarea
                        required
                        rows={2}
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue resize-none"
                        placeholder="123 Example St, Blackburn"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">{t.form.numCats}</label>
                    <input
                      type="number"
                      min="1"
                      value={formData.numCats}
                      onChange={(e) => setFormData({ ...formData, numCats: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">{t.form.frequency}</label>
                    <select
                      value={formData.frequency}
                      onChange={(e) => setFormData({ ...formData, frequency: parseInt(e.target.value) })}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-brand-blue appearance-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7].map(num => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? (lang === 'en' ? 'visit/week' : '次/周') : (lang === 'en' ? 'visits/week' : '次/周')}
                        </option>
                      ))}
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
                      />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in slide-in-from-right duration-300">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4">
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
                    <span className="font-bold">{formData.frequency} visits/week</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Address</span>
                    <span className="font-bold text-right max-w-[200px] truncate">{formData.address}</span>
                  </div>
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
              ) : <div></div>}

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
                  type="submit"
                  disabled={status === 'loading'}
                  className="flex items-center justify-center gap-2 bg-brand-green text-white px-8 py-3 rounded-xl font-bold hover:bg-green-600 transition-all shadow-lg shadow-green-100 flex-1"
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
