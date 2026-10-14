import seoPages from './seo-pages.json';

export interface SeoPage {
  slug: string;
  lang: string;
  keyword: string;
  navLabel: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  heroImage: string;
  heroAlt?: string;
  priceFrom: string;
  priceLow: number;
  priceHigh: number;
  sections: { h2: string; body: string; image?: string; imageAlt?: string }[];
  highlights: string[];
  faqs: { q: string; a: string }[];
  showFleet?: boolean;
}

export const SEO_PAGES = seoPages as SeoPage[];

/** Returns the SEO landing page that matches a path such as "/lombok-private-driver/". */
export function findSeoPage(pathname: string): SeoPage | undefined {
  const slug = pathname.replace(/^\/+|\/+$/g, '');
  return SEO_PAGES.find((p) => p.slug === slug);
}
