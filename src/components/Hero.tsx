import { motion } from 'motion/react';

interface HeroProps {
  onExploreLombok: () => void;
  onViewExperiences: () => void;
  onSelectDestinationFast?: (destinationId: string) => void;
}

export default function Hero({
  onExploreLombok,
  onViewExperiences,
}: HeroProps) {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#1F4A52]"
    >
      {/* Background Image with Layered Deep Teal Color Grading */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=90"
          alt="Lombok turquoise beach and peaceful coastline"
          className="w-full h-full object-cover object-center"
        />
        {/* Layer 1: Subtle top vignette for crystal clear navigation readability without a dark bar */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,36,43,0.55)] via-[rgba(41,78,86,0.40)] to-[rgba(31,74,82,0.65)]" />

        {/* Layer 2: Subtle lighter teal luminous radial glow around center/right */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_65%_at_65%_45%,rgba(73,127,135,0.20),transparent_75%)]" />

        {/* Layer 3: Subtle bottom gradient transition to content */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(10,36,43,0.5)]" />
      </div>

      {/* Spacer to balance top navigation when in flex flex-col justify-between */}
      <div className="hidden lg:block h-24" aria-hidden="true" />

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 w-full pt-28 sm:pt-32 pb-16 sm:pb-24 lg:pt-0 lg:pb-16 text-center flex flex-col items-center my-auto">
        {/* Large centered bold headline - refined editorial scale */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-bold text-[44px] sm:text-[58px] md:text-[64px] lg:text-[76px] xl:text-[80px] text-[#F6F5EE] tracking-tight leading-[1.0] sm:leading-[1.02] lg:leading-[0.98] max-w-[800px] mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.25)]"
          id="hero-headline"
        >
          Find Your Way<br />to Lombok.
          <span className="sr-only"> — Private tours and chauffeur service in Lombok, Indonesia.</span>
        </motion.h1>

        {/* Refined editorial paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.3 }}
          className="mt-5 sm:mt-6 text-[15px] sm:text-[16px] lg:text-[18px] text-[#F6F5EE]/90 font-normal max-w-[540px] mx-auto leading-[1.55] drop-shadow-[0_1px_8px_rgba(0,0,0,0.2)]"
          id="hero-supporting-copy"
        >
          Take the long way to the beach. Stay for one more sunset. Let Lombok set the pace.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.45 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto"
        >
          {/* Primary CTA: Warm yellow/gold accent rounded pill with dark text and subtle glow */}
          <button
            type="button"
            onClick={onExploreLombok}
            id="hero-primary-cta"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#F4C95D] hover:bg-[#E5BC50] active:scale-[0.98] text-[#1F4A52] font-bold text-xs sm:text-[13px] tracking-[0.16em] uppercase px-8 py-4 rounded-full shadow-[0_10px_25px_rgba(244,201,93,0.32)] transition-all duration-200 cursor-pointer"
          >
            <span>EXPLORE LOMBOK</span>
            <span className="text-base font-normal transition-transform duration-200 group-hover:translate-x-1">→</span>
          </button>

          {/* Secondary CTA: Translucent dark/teal background, thin subtle border, white text */}
          <button
            type="button"
            onClick={onViewExperiences}
            id="hero-secondary-cta"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-[#294E56]/65 hover:bg-[#294E56]/90 active:scale-[0.98] text-[#F6F5EE] border border-white/20 hover:border-white/35 font-semibold text-xs sm:text-[13px] tracking-[0.16em] uppercase px-8 py-4 rounded-full transition-all duration-200 cursor-pointer backdrop-blur-sm"
          >
            <span>VIEW EXPERIENCES</span>
          </button>
        </motion.div>
      </div>

      {/* Bottom subtle indicator or spacer to guarantee visual balance */}
      <div className="relative z-10 w-full pb-6 hidden sm:flex justify-center pointer-events-none">
        <div className="w-1 h-8 rounded-full bg-white/20" />
      </div>
    </section>
  );
}
