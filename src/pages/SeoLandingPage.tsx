import { useEffect, useState, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, ChevronDown, Home, MessageCircle } from 'lucide-react';
import FirstLopLogo from '../components/FirstLopLogo';
import { BRAND } from '../data/content';
import seoPages from '../data/seo-pages.json';

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
  priceFrom: string;
  priceLow: number;
  priceHigh: number;
  sections: { h2: string; body: string }[];
  highlights: string[];
  faqs: { q: string; a: string }[];
}

export const SEO_PAGES = seoPages as SeoPage[];

/** Returns the SEO landing page that matches a path such as "/lombok-private-driver/". */
export function findSeoPage(pathname: string): SeoPage | undefined {
  const slug = pathname.replace(/^\/+|\/+$/g, '');
  return SEO_PAGES.find((p) => p.slug === slug);
}

interface SeoLandingPageProps {
  page: SeoPage;
  onNavigate: (path: string) => void;
  onOpenPlanModal: (destId?: string, pkgName?: string) => void;
}

export default function SeoLandingPage({ page, onNavigate, onOpenPlanModal }: SeoLandingPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const isId = page.lang === 'id';
  const t = {
    home: isId ? 'Beranda' : 'Home',
    plan: isId ? 'Rencanakan Perjalanan' : 'Plan Your Trip',
    included: isId ? 'YANG ANDA DAPATKAN' : 'WHAT YOU GET',
    faq: isId ? 'PERTANYAAN UMUM' : 'QUESTIONS & ANSWERS',
    faqTitle: isId ? 'Pertanyaan yang sering ditanyakan.' : 'Frequently asked questions.',
    ready: isId ? 'Siap keliling Lombok?' : 'Ready to plan your Lombok days?',
    readyBody: isId
      ? 'Ceritakan tanggal, jumlah orang, dan tujuan Anda. Kami siapkan mobil dan rute yang pas.'
      : 'Tell us your dates, group size and wish list. We will match the right car, driver and route.',
    chat: isId ? 'Chat WhatsApp' : 'Chat on WhatsApp',
    explore: isId ? 'JELAJAHI LAINNYA' : 'MORE WAYS TO EXPLORE LOMBOK',
  };

  // Keep title, description and canonical in sync when navigating client-side.
  useEffect(() => {
    const prevTitle = document.title;
    document.title = page.title;
    const desc = document.querySelector('meta[name="description"]');
    const canon = document.querySelector('link[rel="canonical"]');
    const prevDesc = desc?.getAttribute('content') || '';
    const prevCanon = canon?.getAttribute('href') || '';
    desc?.setAttribute('content', page.description);
    canon?.setAttribute('href', `https://firstlop.site/${page.slug}`);
    document.documentElement.lang = page.lang;
    window.scrollTo(0, 0);
    return () => {
      document.title = prevTitle;
      if (prevDesc) desc?.setAttribute('content', prevDesc);
      if (prevCanon) canon?.setAttribute('href', prevCanon);
    };
  }, [page]);

  const whatsappUrl = `https://wa.me/${BRAND.contact.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
    isId
      ? `Halo FIRST-LOP, saya mau tanya soal ${page.keyword}.`
      : `Hello FIRST-LOP, I would like to ask about a ${page.keyword}.`
  )}`;
  const others = [
    { slug: 'lombok-private-tours', navLabel: 'Lombok Private Tours' },
    ...SEO_PAGES.filter((p) => p.slug !== page.slug),
  ];
  const go = (e: MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#123B45] overflow-x-hidden">
      <header className="sticky top-0 z-40 bg-[#FAF7F0]/90 backdrop-blur-md border-b border-[#123B45]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="/" onClick={(e) => go(e, '/')} className="flex items-center gap-3" aria-label="FIRST-LOP home">
            <FirstLopLogo className="w-8 h-8 text-[#123B45]" />
            <div className="flex flex-col">
              <span className="font-serif tracking-tight text-xl font-bold text-[#123B45]">FIRST-LOP</span>
              <span className="text-[9.5px] uppercase tracking-[0.28em] text-[#2E7987] font-mono">{page.navLabel}</span>
            </div>
          </a>
          <div className="flex items-center gap-3">
            <a
              href="/"
              onClick={(e) => go(e, '/')}
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.2em] text-[#123B45]/70 hover:text-[#123B45]"
            >
              <Home className="w-3.5 h-3.5" />
              {t.home}
            </a>
            <button
              onClick={() => onOpenPlanModal(undefined, page.navLabel)}
              className="px-5 py-2.5 bg-[#123B45] text-[#FAF7F0] text-xs font-mono uppercase tracking-[0.2em] rounded-full hover:bg-[#1B4D58] flex items-center gap-2"
            >
              {t.plan}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <img src={page.heroImage} alt={page.keyword} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E171A]/90 via-[#0E171A]/45 to-[#0E171A]/10" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-32 text-[#FAF7F0]">
          <span className="text-[10.5px] uppercase tracking-[0.28em] font-mono text-[#F4C95D] block mb-4">{page.eyebrow}</span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight leading-[1.08] mb-6">{page.h1}</h1>
          <p className="text-base sm:text-lg text-[#FAF7F0]/85 max-w-2xl leading-relaxed mb-8">{page.intro}</p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <button
              onClick={() => onOpenPlanModal(undefined, page.navLabel)}
              className="px-8 py-4 bg-[#FAF7F0] text-[#123B45] text-xs font-mono uppercase tracking-[0.2em] font-bold rounded-full hover:bg-white flex items-center justify-center gap-2"
            >
              {t.plan}
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="font-mono text-sm text-[#F4C95D]">{page.priceFrom}</span>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {page.sections.map((s) => (
          <article key={s.h2}>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#123B45] font-normal tracking-tight leading-[1.15] mb-5">{s.h2}</h2>
            <p className="text-base text-[#0E171A]/80 leading-relaxed">{s.body}</p>
          </article>
        ))}
      </section>

      <section className="py-20 sm:py-24 bg-[#123B45] text-[#FAF7F0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[10.5px] uppercase tracking-[0.28em] font-mono text-[#48B0C4] block mb-8">{t.included}</span>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {page.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-[#FAF7F0]/90">
                <Check className="w-5 h-5 text-[#F4C95D] shrink-0 mt-0.5" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 sm:py-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <span className="text-[10.5px] uppercase tracking-[0.24em] font-mono text-[#2E7987] block mb-3 text-center">{t.faq}</span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#123B45] font-normal tracking-tight text-center mb-12">{t.faqTitle}</h2>
        <div className="space-y-4">
          {page.faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={f.q} className="bg-white rounded-xl border border-[#123B45]/10 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4"
                  aria-expanded={open}
                >
                  <h3 className="font-serif text-lg sm:text-xl text-[#123B45] font-medium leading-snug">{f.q}</h3>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm text-[#0E171A]/80 leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-[#0E171A] text-[#FAF7F0] text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight mb-5">{t.ready}</h2>
          <p className="text-[#FAF7F0]/75 mb-10">{t.readyBody}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => onOpenPlanModal(undefined, page.navLabel)}
              className="px-9 py-4 bg-[#FAF7F0] text-[#123B45] text-xs font-mono uppercase tracking-[0.2em] font-bold rounded-full flex items-center justify-center gap-2"
            >
              {t.plan}
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-white/20 text-xs font-mono uppercase tracking-[0.2em] rounded-full flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#48B0C4]" />
              {t.chat}
            </a>
          </div>
          <nav className="mt-16 pt-10 border-t border-white/10" aria-label="More Lombok guides">
            <span className="text-[10px] uppercase tracking-[0.28em] font-mono text-[#FAF7F0]/50 block mb-5">{t.explore}</span>
            <div className="flex flex-wrap justify-center gap-3">
              {others.map((o) => (
                <a
                  key={o.slug}
                  href={`/${o.slug}`}
                  onClick={(e) => go(e, `/${o.slug}`)}
                  className="px-4 py-2 rounded-full border border-white/15 text-xs text-[#FAF7F0]/80 hover:text-white hover:border-white/40"
                >
                  {o.navLabel}
                </a>
              ))}
            </div>
          </nav>
          <p className="mt-12 text-xs font-mono text-[#FAF7F0]/40">© FIRST-LOP · {BRAND.tagline}</p>
        </div>
      </section>
    </div>
  );
}
