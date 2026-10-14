import { motion } from 'motion/react';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { BRAND } from '../data/content';
import ctaImage from '../assets/images/cta_rinjani_dusk.jpg';

interface FinalCTAProps {
  onPlanTrip: () => void;
}

export default function FinalCTA({ onPlanTrip }: FinalCTAProps) {
  const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(
    `Hello ${BRAND.name}! I'm ready to begin planning my Lombok journey. Let's talk!`
  )}`;

  return (
    <section
      id="final-cta"
      className="relative py-20 sm:py-24 lg:py-28 w-full overflow-hidden bg-[#123B45] text-[#FAF7F0] flex items-center justify-center"
    >
      {/* Static Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={ctaImage}
          loading="lazy"
          alt="Illustration of Mount Rinjani at dusk above the Sembalun hills, Lombok"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#123B45]/80 via-[#123B45]/45 to-[#123B45]/50 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-[#F4C95D] mb-5">
            Ready to Escape?
          </div>

          <h2 className="font-bold text-[34px] sm:text-5xl md:text-[56px] text-[#FAF7F0] tracking-tight leading-[1.08] drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)]">
            Let's Plan Your Time in Lombok.
          </h2>

          <p className="mt-5 text-[15px] sm:text-base md:text-lg text-[#FAF7F0]/90 font-normal max-w-xl leading-relaxed">
            Tell us what kind of trip you have in mind. We'll help you put together the right days, places and experiences.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            {/* Primary CTA */}
            <button
              type="button"
              onClick={onPlanTrip}
              id="final-cta-plan-trip"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#F4C95D] text-[#123B45] hover:-translate-y-0.5 font-semibold text-xs sm:text-sm uppercase tracking-[0.14em] px-8 py-4 rounded-full shadow-[0_10px_25px_rgba(244,201,93,0.35)] transition-all duration-200 cursor-pointer"
            >
              <span>Plan Your Trip</span>
              <span className="text-base font-normal transition-transform duration-200 group-hover:translate-x-1">→</span>
            </button>

            {/* Secondary CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              id="final-cta-whatsapp"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 glass hover:bg-white/20 text-[#FAF7F0] hover:-translate-y-0.5 font-semibold text-xs sm:text-sm uppercase tracking-[0.14em] px-7 py-4 rounded-full transition-all duration-200 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#F4C95D]" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <p className="mt-6 text-xs text-[#FAF7F0]/60 tracking-wider uppercase font-sans">
            Personal response within 12 hours — Direct island concierge
          </p>
        </motion.div>
      </div>
    </section>
  );
}
