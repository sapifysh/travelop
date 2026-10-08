import { motion } from 'motion/react';
import { ArrowRight, Clock } from 'lucide-react';
import { DESTINATIONS } from '../data/content';
import { Destination } from '../types';

interface DestinationsProps {
  onSelectDestination: (dest: Destination) => void;
}

interface MobileCardProps {
  dest: Destination;
  index: number;
  onSelect: (dest: Destination) => void;
}

function MobileDestinationCard({ dest, index, onSelect }: MobileCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="sm:hidden flex flex-col bg-white rounded-[22px] border border-[#0E171A]/8 shadow-[0_12px_36px_rgba(14,23,26,0.06)] overflow-hidden"
    >
      {/* Dominant Photography: full width, ~4:3 aspect, min-h ~280-320px, object-cover */}
      <div className="relative w-full aspect-[4/3] min-h-[280px] xs:min-h-[300px] overflow-hidden bg-[#1F4A52]">
        <img
          src={dest.image}
          alt={dest.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Compact Elegant Text Area (25-30% of card) */}
      <div className="p-4 xs:p-5 flex flex-col justify-between border-t border-[#0E171A]/8 bg-white">
        <div>
          {/* Destination label: 10-11px uppercase */}
          <div className="text-[10.5px] uppercase tracking-[0.2em] font-semibold text-[#2E7987]">
            0{index + 1} / {dest.name}
          </div>

          {/* Destination title: 21-24px */}
          <h3 className="mt-1 font-semibold text-[22px] text-[#0E171A] tracking-tight leading-snug">
            "{dest.title}"
          </h3>

          {/* Description: 14-15px, 1-2 lines */}
          <p className="mt-1.5 text-[14px] text-[#0E171A]/75 font-normal leading-relaxed line-clamp-2">
            {dest.description}
          </p>
        </div>

        {/* Distance/location (12-13px) + CTA (12-13px) */}
        <div className="mt-3.5 pt-3 border-t border-[#0E171A]/8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-[12.5px] text-[#0E171A]/60">
            <Clock className="w-3.5 h-3.5 text-[#2E7987] shrink-0" />
            <span className="truncate">{dest.travelTime}</span>
          </div>

          <button
            type="button"
            onClick={() => onSelect(dest)}
            className="liquid-glass-btn-primary inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0E171A] active:scale-[0.98] cursor-pointer shrink-0"
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#2E7987]" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function Destinations({ onSelectDestination }: DestinationsProps) {
  return (
    <section
      id="destinations"
      className="pt-20 pb-20 sm:py-36 bg-[#FAF8F5] text-[#0E171A] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-24">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2E7987]" />
            <span className="text-[10.5px] uppercase tracking-[0.24em] font-semibold text-[#2E7987]">
              The Destinations
            </span>
          </div>
          <h2 className="font-semibold text-3xl sm:text-5xl lg:text-6xl text-[#0E171A] tracking-tight leading-[1.08]">
            Four Places.<br />One Unforgettable Island.
          </h2>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[#0E171A]/75 font-normal leading-relaxed max-w-2xl">
            From tranquil crescent bays and turquoise waters to vibrant island nights and open coastal roads, discover Lombok through its most distinctive shores.
          </p>
        </div>

        {/* Editorial Gallery: Mobile Dedicated Cards (<sm) & Desktop Compositions (>=sm) */}
        <div className="space-y-8 sm:space-y-24 lg:space-y-32">
          {DESTINATIONS.map((dest, index) => {
            const compositionType = index % 4;

            return (
              <div key={dest.id} id={`destination-block-${dest.id}`}>
                {/* Mobile View: High visual dominance photography with compact card */}
                <MobileDestinationCard
                  dest={dest}
                  index={index}
                  onSelect={onSelectDestination}
                />

                {/* Desktop View: Preserved Original Editorial Compositions */}
                {compositionType === 0 && (
                  <motion.article
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="hidden sm:block group relative rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(14,23,26,0.08)] border border-white/60 aspect-[16/9] lg:aspect-[21/10]"
                  >
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                    <div className="absolute left-8 bottom-8 max-w-xl">
                      <div className="liquid-glass-elevated p-8 rounded-3xl refraction-highlight transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2 text-[10.5px] uppercase tracking-[0.2em] font-semibold text-[#2E7987]">
                          <span>01 / {dest.name}</span>
                          <span className="text-[#0E171A]/30">·</span>
                          <span className="text-[#0E171A]/70 font-normal">{dest.vibe}</span>
                        </div>

                        <h3 className="font-semibold text-3xl text-[#0E171A] tracking-tight leading-snug">
                          "{dest.title}"
                        </h3>

                        <p className="mt-2.5 text-base text-[#0E171A]/80 font-normal leading-relaxed line-clamp-2">
                          {dest.description}
                        </p>

                        <div className="mt-5 pt-4 border-t border-[#0E171A]/10 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-1.5 text-xs text-[#0E171A]/60">
                            <Clock className="w-3.5 h-3.5 text-[#2E7987]" />
                            <span>{dest.travelTime}</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => onSelectDestination(dest)}
                            className="liquid-glass-btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.14em] cursor-pointer"
                          >
                            <span>Explore</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                )}

                {compositionType === 1 && (
                  <motion.article
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="hidden sm:grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
                  >
                    <div className="lg:col-span-7 relative group">
                      <div className="aspect-[16/10] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(14,23,26,0.07)] border border-white/60">
                        <img
                          src={dest.image}
                          alt={dest.name}
                          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                      </div>

                      {dest.secondaryImage && (
                        <div className="absolute -bottom-5 -right-5 w-40 h-40 rounded-2xl overflow-hidden liquid-glass-standard p-1.5 shadow-2xl">
                          <img
                            src={dest.secondaryImage}
                            alt={`${dest.name} detail`}
                            className="w-full h-full object-cover rounded-xl"
                            loading="lazy"
                          />
                        </div>
                      )}
                    </div>

                    <div className="lg:col-span-5">
                      <div className="liquid-glass-standard p-8 lg:p-10 rounded-3xl refraction-highlight">
                        <div className="flex items-center gap-2 mb-2 text-[10.5px] uppercase tracking-[0.2em] font-semibold text-[#2E7987]">
                          <span>02 / {dest.name}</span>
                          <span className="text-[#0E171A]/30">·</span>
                          <span className="text-[#0E171A]/70 font-normal">{dest.vibe}</span>
                        </div>

                        <h3 className="font-semibold text-2xl sm:text-3xl text-[#0E171A] tracking-tight">
                          "{dest.title}"
                        </h3>

                        <p className="mt-3 text-sm sm:text-base text-[#0E171A]/80 font-normal leading-relaxed">
                          {dest.description}
                        </p>

                        <div className="mt-6 pt-5 border-t border-[#0E171A]/10 space-y-2">
                          {dest.highlights.slice(0, 2).map((item) => (
                            <div key={item} className="text-xs text-[#0E171A]/75 flex items-start gap-2">
                              <span className="w-1 h-1 rounded-full bg-[#2E7987] mt-1.5 shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 pt-5 border-t border-[#0E171A]/10 flex items-center justify-between gap-4">
                          <span className="text-xs text-[#0E171A]/60 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#2E7987]" />
                            <span>{dest.travelTime}</span>
                          </span>

                          <button
                            type="button"
                            onClick={() => onSelectDestination(dest)}
                            className="liquid-glass-btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.14em] cursor-pointer"
                          >
                            <span>Explore</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                )}

                {compositionType === 2 && (
                  <motion.article
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="hidden sm:grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
                  >
                    <div className="lg:col-span-5 order-2 lg:order-1">
                      <div className="liquid-glass-standard p-8 lg:p-10 rounded-3xl refraction-highlight">
                        <div className="flex items-center gap-2 mb-2 text-[10.5px] uppercase tracking-[0.2em] font-semibold text-[#2E7987]">
                          <span>03 / {dest.name}</span>
                          <span className="text-[#0E171A]/30">·</span>
                          <span className="text-[#0E171A]/70 font-normal">{dest.vibe}</span>
                        </div>

                        <h3 className="font-semibold text-2xl sm:text-3xl text-[#0E171A] tracking-tight">
                          "{dest.title}"
                        </h3>

                        <p className="mt-3 text-sm sm:text-base text-[#0E171A]/80 font-normal leading-relaxed">
                          {dest.description}
                        </p>

                        <div className="mt-6 pt-5 border-t border-[#0E171A]/10 space-y-2">
                          {dest.highlights.slice(0, 2).map((item) => (
                            <div key={item} className="text-xs text-[#0E171A]/75 flex items-start gap-2">
                              <span className="w-1 h-1 rounded-full bg-[#2E7987] mt-1.5 shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 pt-5 border-t border-[#0E171A]/10 flex items-center justify-between gap-4">
                          <span className="text-xs text-[#0E171A]/60 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#2E7987]" />
                            <span>{dest.travelTime}</span>
                          </span>

                          <button
                            type="button"
                            onClick={() => onSelectDestination(dest)}
                            className="liquid-glass-btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.14em] cursor-pointer"
                          >
                            <span>Explore</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-7 order-1 lg:order-2 group relative">
                      <div className="aspect-[16/10] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(14,23,26,0.07)] border border-white/60">
                        <img
                          src={dest.image}
                          alt={dest.name}
                          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-50" />
                      </div>

                      {dest.secondaryImage && (
                        <div className="absolute -top-5 -left-5 w-40 h-40 rounded-2xl overflow-hidden liquid-glass-standard p-1.5 shadow-2xl z-10">
                          <img
                            src={dest.secondaryImage}
                            alt={`${dest.name} detail`}
                            className="w-full h-full object-cover rounded-xl"
                            loading="lazy"
                          />
                        </div>
                      )}
                    </div>
                  </motion.article>
                )}

                {compositionType === 3 && (
                  <motion.article
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="hidden sm:block group relative rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(14,23,26,0.08)] border border-white/60 aspect-[16/9] lg:aspect-[21/10]"
                  >
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                    <div className="absolute right-8 bottom-8 max-w-xl">
                      <div className="liquid-glass-elevated p-8 rounded-3xl refraction-highlight transition-all duration-300">
                        <div className="flex items-center gap-2 mb-2 text-[10.5px] uppercase tracking-[0.2em] font-semibold text-[#2E7987]">
                          <span>04 / {dest.name}</span>
                          <span className="text-[#0E171A]/30">·</span>
                          <span className="text-[#0E171A]/70 font-normal">{dest.vibe}</span>
                        </div>

                        <h3 className="font-semibold text-3xl text-[#0E171A] tracking-tight leading-snug">
                          "{dest.title}"
                        </h3>

                        <p className="mt-2.5 text-base text-[#0E171A]/80 font-normal leading-relaxed line-clamp-2">
                          {dest.description}
                        </p>

                        <div className="mt-5 pt-4 border-t border-[#0E171A]/10 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-1.5 text-xs text-[#0E171A]/60">
                            <Clock className="w-3.5 h-3.5 text-[#2E7987]" />
                            <span>{dest.travelTime}</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => onSelectDestination(dest)}
                            className="liquid-glass-btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.14em] cursor-pointer"
                          >
                            <span>Explore</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

