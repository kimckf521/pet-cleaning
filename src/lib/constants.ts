export const SITE_URL = 'https://www.scooposervice.com';

// Keep this in sync with the pages under src/app/service-areas/.
export const SERVICE_AREAS = [
  { name: 'Box Hill', slug: 'box-hill' },
  { name: 'Blackburn', slug: 'blackburn' },
  { name: 'Mont Albert', slug: 'mont-albert' },
  { name: 'Surrey Hills', slug: 'surrey-hills' },
  { name: 'Doncaster', slug: 'doncaster' },
];

function joinWithAmpersand(items: string[]): string {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} & ${items[items.length - 1]}`;
}

// Full suburb list, for SEO-critical spots: meta descriptions, keywords, JSON-LD.
export const SERVICE_AREA_FULL_EN = joinWithAmpersand(SERVICE_AREAS.map((s) => s.name));
export const SERVICE_AREA_FULL_CN = SERVICE_AREAS.map((s) => s.name).join('、');

// Short form, for space-constrained spots: footer tagline, OG image, email sign-off.
export const SERVICE_AREA_SHORT_EN = "Melbourne's Eastern Suburbs";
export const SERVICE_AREA_SHORT_CN = '墨尔本东区';
