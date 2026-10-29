import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Clock, CheckCircle2, ChevronDown } from 'lucide-react';
import { PACKAGES, USD_IDR_RATE } from '../data/content';
import { TravelPackage } from '../types';

// Display-only: package names are stored in ALL CAPS in the data; render them
// in Title Case on the cards (data itself is unchanged).
const toTitleCase = (str: string) =>
  str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

// Parse the USD amount out of a priceEstimate string like "From $460 / guest"
// and format its IDR estimate compactly, e.g. "Rp8,3 jt".
const usdFromEstimate = (estimate?: string) => {
  const m = estimate?.match(/\$([\d,]+)/);
  return m ? Number(m[1].replace(/,/g, '')) : NaN;
};
const idrCompact = (usd: number) =>
  'Rp' + ((usd * USD_IDR_RATE) / 1_000_000).toFixed(1).replace('.', ',') + ' jt';

interface PackagesProps {
  onSelectPackage: (pkg: TravelPackage) => void;
  onViewItinerary: (pkg: TravelPackage) => void;
}

export default function Packages({ onSelectPackage, onViewItinerary }: PackagesProps) {
  const INITIAL_COUNT = 3;
  const [showAll, setShowAll] = useState(false);
  const visiblePackages = showAll ? PACKAGES : PACKAGES.slice(0, INITIAL_COUNT);

  const toggleShowAll = () => {
    if (showAll) {
      document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setShowAll((v) => !v);
  };

  return (
    <section
      id="packages"
      className="py-20 sm:py-36 bg-[#0E171A] text-[#FAF8F5] overflow-hidden relative"
    >
      {/* Subtle atmospheric ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#2E7987]/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-24">
          <h2 className="font-semibold text-3xl sm:text-5xl lg:text-6xl text-[#FAF8F5] tracking-tight leading-[1.08]">
            Choose Your Kind<br />of Escape.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#FAF8F5]/75 font-normal leading-relaxed max-w-2xl">
            Thoughtfully balanced journeys crafted around effortless pacing, genuine island hospitality, and breathtaking coastlines.
          </p>
        </div>

        {/* Apple-Style Liquid Glass Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-7 lg:gap-8">
          {visiblePackages.map((pkg, index) => {
            return (
              <motion.div
                key={pkg.id}
                id={`package-card-${pkg.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index % INITIAL_COUNT) * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col justify-between liquid-glass-dark-standard rounded-3xl overflow-hidden refraction-highlight transition-all duration-300 hover:-translate-y-1.5"
              >
                <div>
                  {/* Visual Header */}
                  <div className="relative aspect-[2/1] sm:aspect-[16/10] overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E171A] via-transparent to-transparent" />

                    {/* Floating Liquid Glass Duration Badge */}
                    <div className="absolute top-4 left-4 liquid-glass-dark-subtle px-3 py-1 rounded-full text-[11px] font-medium tracking-wide text-white flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-[#3D95A5]" />
                      <span>{pkg.duration}</span>
                    </div>

                    <div className="absolute bottom-3 left-5 right-5 text-white/70">
                      <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#3D95A5] block">
                        Signature 0{index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-7">
                    <h3 className="font-semibold text-lg sm:text-2xl text-white tracking-tight">
                      {toTitleCase(pkg.name)}
                    </h3>

                    <p className="mt-2 text-[13px] sm:text-sm text-white/70 font-normal leading-relaxed sm:min-h-[40px]">
                      "{pkg.subtitle}"
                    </p>

                    {/* Unboxed Metadata Tags (Anti-slop: clean text with dividers) */}
                    <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-white/60">
                      {pkg.tags.map((tag, tIdx) => (
                        <div key={tag} className="flex items-center gap-2">
                          <span>{tag}</span>
                          {tIdx < pkg.tags.length - 1 && (
                            <span className="text-white/20 select-none">·</span>
                          )}
                        </div>
                      ))}
                    </div>

                    {pkg.priceEstimate && (
                      <>
                        <p className="mt-3 sm:mt-4 text-[13px] sm:text-sm font-semibold text-[#3D95A5]">
                          {pkg.priceEstimate}
                        </p>
                        {!Number.isNaN(usdFromEstimate(pkg.priceEstimate)) && (
                          <p className="mt-0.5 text-xs text-white/50">
                            ≈ {idrCompact(usdFromEstimate(pkg.priceEstimate))} / tamu
                          </p>
                        )}
                      </>
                    )}

                    {/* Inclusions summary preview (hidden on phones; full list lives in the modal) */}
                    <div className="hidden sm:block mt-6 pt-5 border-t border-white/10 space-y-2">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/50 block">
                        Included Experience
                      </span>
                      {pkg.included.slice(0, 3).map((item) => (
                        <div key={item} className="flex items-start gap-2 text-xs text-white/80">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#3D95A5] mt-0.5 shrink-0" />
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions: Liquid Glass Button */}
                <div className="p-5 sm:p-7 pt-0 sm:pt-0 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => onViewItinerary(pkg)}
                    id={`btn-view-itinerary-${pkg.id}`}
                    className="group w-full inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.14em] py-3 sm:py-3.5 rounded-full cursor-pointer bg-[#F4C95D] hover:bg-[#E5BC50] active:scale-[0.98] text-[#123B45] shadow-[0_4px_18px_rgba(244,201,93,0.35)] transition-all duration-200"
                  >
                    <span>Explore Package</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {PACKAGES.length > INITIAL_COUNT && (
          <div className="mt-8 sm:mt-12 flex justify-center">
            <button
              type="button"
              onClick={toggleShowAll}
              aria-expanded={showAll}
              id="btn-toggle-packages"
              className="w-full sm:w-auto liquid-glass-dark-standard inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-[0.14em] text-[#FAF8F5] cursor-pointer transition-colors hover:text-white"
            >
              <span>{showAll ? 'Show less' : `View all ${PACKAGES.length} packages`}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
