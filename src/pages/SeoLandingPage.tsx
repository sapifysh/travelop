import { useEffect, useState, type MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check, ChevronDown, MessageCircle, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BRAND } from '../data/content';
import { VEHICLE_OPTIONS } from '../data/vehicles';
import { SEO_PAGES, type SeoPage } from '../data/seoPages';
import { BLOG_POSTS } from './Blog';
import type { VehicleOption } from '../types';

export { SEO_PAGES, findSeoPage } from '../data/seoPages';
export type { SeoPage } from '../data/seoPages';

const FLEET_PICKS = ['toyota-agya', 'xpander', 'toyota-alphard'];

interface SeoLandingPageProps {
  page: SeoPage;
  onNavigate: (path: string) => void;
  onOpenPlanModal: (destId?: string, pkgName?: string, vehicle?: VehicleOption) => void;
}

export default function SeoLandingPage({ page, onNavigate, onOpenPlanModal }: SeoLandingPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const isId = page.lang === 'id';
  const showPrices = page.slug !== 'lombok-airport-transfer';
  const t = {
    plan: isId ? 'Rencanakan Perjalanan' : 'Plan Your Trip',
    chat: isId ? 'Chat WhatsApp' : 'Chat on WhatsApp',
    fleetEyebrow: isId ? 'ARMADA KAMI' : 'YOUR RIDE',
    fleetTitle: isId ? 'Pilih mobil sesuai rombongan Anda.' : 'A car sized for your group.',
    fleetNote: isId
      ? 'Semua mobil ber-AC, bersih, dan dikemudikan sopir lokal profesional.'
      : 'Every car is air-conditioned, spotless and driven by a professional local chauffeur.',
    seats: isId ? 'kursi' : 'seats',
    perDay: isId ? '/ hari' : '/ day',
    from: isId ? 'Mulai' : 'From',
    choose: isId ? 'Pilih mobil ini' : 'Choose this car',
    seeFleet: isId ? 'Lihat semua armada' : 'See the full fleet',
    included: isId ? 'YANG ANDA DAPATKAN' : 'WHAT YOU GET',
    includedTitle: isId ? 'Semua sudah diurus.' : 'Everything taken care of.',
    readNext: isId ? 'BACA JUGA' : 'READ NEXT',
    readGuide: isId ? 'Baca panduan' : 'Read the guide',
    faq: isId ? 'PERTANYAAN UMUM' : 'QUESTIONS & ANSWERS',
    faqTitle: isId ? 'Pertanyaan yang sering ditanyakan.' : 'Frequently asked questions.',
    ready: isId ? 'Siap keliling Lombok?' : 'Ready to plan your Lombok days?',
    readyBody: isId
      ? 'Ceritakan tanggal, jumlah orang, dan tujuan Anda. Kami siapkan mobil dan rute yang pas.'
      : 'Tell us your dates, group size and wish list. We will match the right car, driver and route.',
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
  const fleet = FLEET_PICKS.map((id) => VEHICLE_OPTIONS.find((v) => v.id === id)).filter(Boolean) as VehicleOption[];
  const guide = BLOG_POSTS[0];
  const plan = () => onOpenPlanModal(undefined, page.navLabel);
  const go = (e: MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#123B45] overflow-x-hidden">
      <Navbar onOpenPlanModal={plan} />

      {/* Hero */}
      <section className="relative min-h-[88svh] flex items-end overflow-hidden">
        <img
          src={page.heroImage}
          alt={page.heroAlt || page.keyword}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A242B]/95 via-[#0A242B]/45 to-[#0A242B]/25" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 pb-14 sm:pb-20 pt-36 text-[#FAF7F0]">
          <div className="max-w-3xl">
            <span className="text-[10.5px] uppercase tracking-[0.3em] font-mono text-[#F4C95D] block mb-5">{page.eyebrow}</span>
            <h1 className="font-serif text-[2.4rem] leading-[1.06] sm:text-6xl lg:text-7xl font-normal tracking-tight mb-6">{page.h1}</h1>
            <p className="text-base sm:text-lg text-[#FAF7F0]/85 max-w-2xl leading-relaxed mb-8">{page.intro}</p>
            <span className="inline-flex items-center px-4 py-2 mb-8 rounded-full bg-white/10 border border-white/20 backdrop-blur-md font-mono text-xs sm:text-sm tracking-wide text-[#FAF7F0]">
              {page.priceFrom}
            </span>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={plan}
                className="w-full sm:w-auto px-8 py-4 bg-[#F4C95D] hover:bg-[#E5BC50] text-[#123B45] text-xs font-bold uppercase tracking-[0.16em] rounded-full shadow-[0_4px_18px_rgba(244,201,93,0.35)] flex items-center justify-center gap-2 transition-colors"
              >
                {t.plan}
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md text-[#FAF7F0] text-xs font-semibold uppercase tracking-[0.16em] rounded-full flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#F4C95D]" />
                {t.chat}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Story sections: image + text, alternating */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 space-y-20 sm:space-y-28">
        {page.sections.map((s, i) => (
          <article key={s.h2} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 lg:gap-20 items-center">
            {s.image && (
              <div className={`overflow-hidden rounded-2xl shadow-[0_20px_50px_-20px_rgba(10,36,43,0.35)] ${i % 2 ? 'md:order-2' : ''}`}>
                <img src={s.image} alt={s.imageAlt || s.h2} loading="lazy" className="w-full aspect-[4/3] object-cover" />
              </div>
            )}
            <div>
              <span className="font-mono text-[11px] tracking-[0.3em] text-[#2E7987] block mb-4">0{i + 1}</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-[#123B45] font-normal tracking-tight leading-[1.12] mb-5">
                {s.h2}
              </h2>
              <p className="text-base sm:text-[17px] text-[#0E171A]/75 leading-[1.8]">{s.body}</p>
            </div>
          </article>
        ))}
      </section>

      {/* Fleet picks */}
      {page.showFleet && (
        <section className="pb-20 sm:pb-28 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <span className="text-[10.5px] uppercase tracking-[0.28em] font-mono text-[#2E7987] block mb-3">{t.fleetEyebrow}</span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#123B45] font-normal tracking-tight">{t.fleetTitle}</h2>
              <p className="mt-3 text-sm text-[#0E171A]/65">{t.fleetNote}</p>
            </div>
            <a
              href="/#your-ride"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#2E7987] hover:text-[#123B45] shrink-0"
            >
              {t.seeFleet}
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {fleet.map((v) => (
              <div key={v.id} className="bg-white rounded-2xl border border-[#123B45]/10 overflow-hidden flex flex-col">
                <div className="bg-[#F3F1EC]">
                  <img src={v.image} alt={v.name} loading="lazy" className="w-full aspect-[16/10] object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[10px] uppercase tracking-[0.22em] font-mono text-[#2E7987]">{v.category}</span>
                  <h3 className="font-serif text-2xl text-[#123B45] mt-2">{v.name}</h3>
                  <div className="mt-2 flex items-center gap-4 text-sm text-[#0E171A]/65">
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="w-4 h-4" /> {v.seats} {t.seats}
                    </span>
                    {showPrices && (
                      <span>
                        {t.from} <strong className="text-[#123B45]">${v.pricePerDay}</strong> {t.perDay}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => onOpenPlanModal(undefined, page.navLabel, v)}
                    className="mt-6 w-full py-3 rounded-full border border-[#123B45]/20 text-[#123B45] text-xs font-semibold uppercase tracking-[0.16em] hover:bg-[#123B45] hover:text-[#FAF7F0] transition-colors"
                  >
                    {t.choose}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* What you get */}
      <section className="py-20 sm:py-28 bg-[#0A242B] text-[#FAF7F0]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          <span className="text-[10.5px] uppercase tracking-[0.28em] font-mono text-[#F4C95D] block mb-3">{t.included}</span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight mb-12">{t.includedTitle}</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {page.highlights.map((h) => (
              <li key={h} className="flex items-start gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <span className="w-9 h-9 rounded-full bg-[#F4C95D]/15 flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 text-[#F4C95D]" />
                </span>
                <span className="text-sm sm:text-[15px] text-[#FAF7F0]/90 leading-relaxed pt-1.5">{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Read next */}
      {guide && (
        <section className="pt-20 sm:pt-28 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
          <span className="text-[10.5px] uppercase tracking-[0.28em] font-mono text-[#2E7987] block mb-6">{t.readNext}</span>
          <a
            href={`/blog/${guide.slug}/`}
            onClick={(e) => go(e, `/blog/${guide.slug}/`)}
            className="group grid grid-cols-1 md:grid-cols-5 bg-white rounded-2xl border border-[#123B45]/10 overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="md:col-span-2 overflow-hidden">
              <img
                src={guide.cardImage}
                alt={guide.heroAlt}
                loading="lazy"
                className="w-full h-full min-h-[220px] object-cover group-hover:scale-[1.03] transition-transform duration-700"
              />
            </div>
            <div className="md:col-span-3 p-7 sm:p-10 flex flex-col justify-center">
              <span className="text-[10px] uppercase tracking-[0.24em] font-mono text-[#2E7987]">
                {guide.eyebrow} · {guide.readMinutes} min
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#123B45] leading-snug mt-3 mb-3">{guide.h1}</h3>
              <p className="text-sm text-[#0E171A]/70 leading-relaxed">{guide.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#123B45]">
                {t.readGuide} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </a>
        </section>
      )}

      {/* FAQ */}
      <section className="py-20 sm:py-28 max-w-4xl mx-auto px-6 sm:px-10">
        <span className="text-[10.5px] uppercase tracking-[0.24em] font-mono text-[#2E7987] block mb-3 text-center">{t.faq}</span>
        <h2 className="font-serif text-3xl sm:text-5xl text-[#123B45] font-normal tracking-tight text-center mb-12">{t.faqTitle}</h2>
        <div className="space-y-3">
          {page.faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <div key={f.q} className="bg-white rounded-2xl border border-[#123B45]/10 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4"
                  aria-expanded={open}
                >
                  <h3 className="font-serif text-lg sm:text-xl text-[#123B45] font-medium leading-snug">{f.q}</h3>
                  <ChevronDown className={`w-4 h-4 shrink-0 text-[#2E7987] transition-transform ${open ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-[15px] text-[#0E171A]/75 leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 sm:py-32 overflow-hidden text-[#FAF7F0] text-center">
        <img
          src={page.sections[page.sections.length - 1]?.image || page.heroImage}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0A242B]/80" />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight mb-5">{t.ready}</h2>
          <p className="text-[#FAF7F0]/80 mb-10">{t.readyBody}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={plan}
              className="w-full sm:w-auto px-9 py-4 bg-[#F4C95D] hover:bg-[#E5BC50] text-[#123B45] text-xs font-bold uppercase tracking-[0.16em] rounded-full flex items-center justify-center gap-2 transition-colors"
            >
              {t.plan}
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 border border-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-[0.16em] rounded-full flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#F4C95D]" />
              {t.chat}
            </a>
          </div>
          <nav className="mt-16 pt-10 border-t border-white/15" aria-label="More Lombok guides">
            <span className="text-[10px] uppercase tracking-[0.28em] font-mono text-[#FAF7F0]/60 block mb-5">{t.explore}</span>
            <div className="flex flex-wrap justify-center gap-2.5">
              {others.map((o) => (
                <a
                  key={o.slug}
                  href={`/${o.slug}`}
                  onClick={(e) => go(e, `/${o.slug}`)}
                  className="px-4 py-2 rounded-full border border-white/20 bg-white/5 text-xs text-[#FAF7F0]/85 hover:text-white hover:border-white/50 transition-colors"
                >
                  {o.navLabel}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </section>

      <Footer onOpenPlanModal={plan} />
    </div>
  );
}
