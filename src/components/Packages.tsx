import { motion } from 'motion/react';
import { ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import { PACKAGES } from '../data/content';
import { TravelPackage } from '../types';

interface PackagesProps {
  onSelectPackage: (pkg: TravelPackage) => void;
  onViewItinerary: (pkg: TravelPackage) => void;
}

export default function Packages({ onSelectPackage, onViewItinerary }: PackagesProps) {
  return (
    <section
      id="packages"
      className="py-20 sm:py-36 bg-[#0E171A] text-[#FAF8F5] overflow-hidden relative"
    >
      {/* Subtle atmospheric ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#2E7987]/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3D95A5]" />
            <span className="text-[10.5px] uppercase tracking-[0.24em] font-semibold text-[#3D95A5]">
              Curated Itineraries
            </span>
          </div>
          <h2 className="font-semibold text-3xl sm:text-5xl lg:text-6xl text-[#FAF8F5] tracking-tight leading-[1.08]">
            Choose Your Kind<br />of Escape.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#FAF8F5]/75 font-normal leading-relaxed max-w-2xl">
            Thoughtfully balanced journeys crafted around effortless pacing, genuine island hospitality, and breathtaking coastlines.
          </p>
        </div>

        {/* 3 Apple-Style Liquid Glass Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-8">
          {PACKAGES.map((pkg, index) => {
            return (
              <motion.div
                key={pkg.id}
                id={`package-card-${pkg.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col justify-between liquid-glass-dark-standard rounded-3xl overflow-hidden refraction-highlight transition-all duration-300 hover:-translate-y-1.5"
              >
                <div>
                  {/* Visual Header */}
                  <div className="relative aspect-[16/10] overflow-hidden">
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
                  <div className="p-6 sm:p-7">
                    <h3 className="font-semibold text-xl sm:text-2xl text-white tracking-tight">
                      {pkg.name}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-white/70 font-normal leading-relaxed min-h-[40px]">
                      "{pkg.subtitle}"
                    </p>

                    {/* Unboxed Metadata Tags (Anti-slop: clean text with dividers) */}
                    <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-white/60">
                      {pkg.tags.map((tag, tIdx) => (
                        <div key={tag} className="flex items-center gap-2">
                          <span>{tag}</span>
                          {tIdx < pkg.tags.length - 1 && (
                            <span className="text-white/20 select-none">·</span>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Inclusions summary preview */}
                    <div className="mt-6 pt-5 border-t border-white/10 space-y-2">
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
                <div className="p-6 sm:p-7 pt-0 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => onViewItinerary(pkg)}
                    id={`btn-view-itinerary-${pkg.id}`}
                    className="w-full liquid-glass-btn-primary inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] py-3.5 rounded-full cursor-pointer"
                  >
                    <span>Explore Package</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
