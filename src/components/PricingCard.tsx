'use client';

import React from 'react';
import { Check, Minus, Plus } from 'lucide-react';
import { PlanKey, calculateWeeklyPrice, formatAmount, getDiscountLabel } from '@/lib/pricing';

interface PricingCardProps {
  planKey: PlanKey;
  lang: 'en' | 'cn';
  t: any;
  numCats: number;
  onNumCatsChange: (n: number) => void;
  frequency: number | 'custom';
  onFrequencyChange: (f: number | 'custom') => void;
  onChoosePlan: (planKey: PlanKey) => void;
  popular?: boolean;
}

export default function PricingCard({
  planKey,
  lang,
  t,
  numCats,
  onNumCatsChange,
  frequency,
  onFrequencyChange,
  onChoosePlan,
  popular,
}: PricingCardProps) {
  const plan = t.pricing[planKey];
  const discountBadge = getDiscountLabel(frequency, lang);
  const weeklyPrice = calculateWeeklyPrice(planKey, numCats, frequency);
  const priceDisplay =
    weeklyPrice === null
      ? lang === 'en'
        ? 'Quote'
        : '联系定制'
      : `$${formatAmount(weeklyPrice)}${lang === 'en' ? '/Week' : '/周'}`;

  return (
    <div
      className={
        popular
          ? 'bg-white p-8 rounded-3xl shadow-warm border-2 border-coral relative transform md:-translate-y-4 hover:md:-translate-y-6 transition-all duration-300'
          : 'bg-white p-8 rounded-3xl shadow-soft border border-peach/50 hover:shadow-warm hover:-translate-y-2 transition-all duration-300 relative'
      }
    >
      {popular && (
        <div className="absolute top-0 left-0 bg-coral text-white text-xs font-bold px-3 py-1 rounded-br-2xl rounded-tl-3xl">
          {plan.popular}
        </div>
      )}
      {discountBadge && (
        <div className="absolute top-0 right-0 bg-brand-green text-white text-xs font-bold px-3 py-1 rounded-bl-2xl rounded-tr-3xl">
          {discountBadge}
        </div>
      )}
      <h3 className="text-xl font-bold text-center">{plan.name}</h3>
      <div className="text-4xl font-display font-extrabold text-coral my-4 text-center">{priceDisplay}</div>
      <ul className="space-y-3 mb-8">
        {plan.features.map((f: string, i: number) => (
          <li key={i} className="flex items-center gap-2 text-gray-600">
            <Check className="w-5 h-5 text-brand-green" /> {f}
          </li>
        ))}
      </ul>

      <div className="mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-center text-gray-700 mb-2">
            {t.pricing.cats_label}
          </label>
          <div className="flex items-center justify-between w-full bg-cream border border-peach/50 text-gray-700 py-3 px-4 rounded-2xl">
            <button
              onClick={() => onNumCatsChange(Math.max(1, numCats - 1))}
              className={`p-1 rounded-full text-coral hover:bg-cream transition-colors ${
                numCats <= 1 ? 'invisible' : ''
              }`}
              disabled={numCats <= 1}
            >
              <Minus size={20} />
            </button>
            <span className="font-medium text-lg w-12 text-center">{numCats}</span>
            <button
              onClick={() => onNumCatsChange(numCats + 1)}
              className="p-1 rounded-full text-coral hover:bg-cream transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-center text-gray-700 mb-2">
            {t.pricing.frequency_label}
          </label>
          <div className="relative">
            <select
              value={frequency}
              onChange={(e) => onFrequencyChange(e.target.value === 'custom' ? 'custom' : Number(e.target.value))}
              className="w-full appearance-none bg-cream border border-peach/50 text-center text-gray-700 py-3 px-4 pr-8 rounded-2xl leading-tight focus:outline-none focus:bg-white focus:border-coral"
            >
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <option key={num} value={num}>
                  {num} {lang === 'en' ? (num === 1 ? 'Time' : 'Times') : t.pricing.times_unit}
                  {getDiscountLabel(num, lang) ? ` (${getDiscountLabel(num, lang)})` : ''}
                </option>
              ))}
              <option value="custom">{t.pricing.custom}</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => onChoosePlan(planKey)}
        className={
          popular
            ? 'w-full py-3 rounded-full bg-coral text-white font-bold shadow-warm hover:bg-coral-600 hover:scale-105 transition-all'
            : 'w-full py-3 rounded-full border-2 border-coral text-coral font-bold hover:bg-coral hover:text-white transition-all'
        }
        title={`${plan.name} Pricing`}
      >
        {frequency === 'custom' ? t.pricing.contact_btn : t.pricing.btn}
      </button>
    </div>
  );
}
