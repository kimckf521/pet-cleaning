export type PlanKey = 'essential' | 'care' | 'ultimate';

export const PLAN_KEYS: PlanKey[] = ['essential', 'care', 'ultimate'];

export const PLAN_BASE_PRICE: Record<PlanKey, number> = {
  essential: 28,
  care: 35,
  ultimate: 42,
};

export function isPlanKey(value: unknown): value is PlanKey {
  return value === 'essential' || value === 'care' || value === 'ultimate';
}

export function getDiscountRate(frequency: number | 'custom'): number {
  if (frequency === 'custom') return 1;
  if (frequency >= 6) return 0.9;
  if (frequency >= 4) return 0.95;
  return 1;
}

export function getDiscountLabel(frequency: number | 'custom', lang: 'en' | 'cn'): string | null {
  if (frequency === 'custom') return null;
  if (frequency >= 6) return lang === 'en' ? '10% OFF' : '10%优惠';
  if (frequency >= 4) return lang === 'en' ? '5% OFF' : '5%优惠';
  return null;
}

// Returns null for a 'custom' frequency (caller shows a "contact us" quote instead).
export function calculateWeeklyPrice(
  planKey: PlanKey,
  numCats: number,
  frequency: number | 'custom'
): number | null {
  if (frequency === 'custom') return null;
  const basePricePerVisit = PLAN_BASE_PRICE[planKey];
  const extraCatFee = (Math.max(1, numCats) - 1) * 5;
  const subtotalPerVisit = basePricePerVisit + extraCatFee;
  const finalPricePerVisit = subtotalPerVisit * getDiscountRate(frequency);
  return finalPricePerVisit * frequency;
}

export function formatAmount(total: number): string {
  return total.toFixed(2).replace(/\.00$/, '').replace(/(\.\d)0$/, '$1');
}

// Dog waste removal: single-tier pilot service (Box Hill & Blackburn only, see DOG_SERVICE_SUBURBS).
export const DOG_BASE_PRICE = 32; // per visit, 1 dog
export const DOG_EXTRA_PET_FEE = 8; // per visit, per additional dog

export function calculateDogWeeklyPrice(numDogs: number, frequency: number | 'custom'): number | null {
  if (frequency === 'custom') return null;
  const subtotalPerVisit = DOG_BASE_PRICE + (Math.max(1, numDogs) - 1) * DOG_EXTRA_PET_FEE;
  const finalPricePerVisit = subtotalPerVisit * getDiscountRate(frequency);
  return finalPricePerVisit * frequency;
}
