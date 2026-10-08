import { motion } from 'motion/react';

export default function BrandStatement() {
  return (
    <section
      id="brand-statement"
      className="py-32 sm:py-44 lg:py-52 bg-[#FAF7F0] text-[#123B45] relative overflow-hidden border-t border-[#123B45]/10"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Subtle Eyebrow */}
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.24em] font-semibold text-[#4F9DA6] mb-8">
            The Island Philosophy
          </span>

          {/* Oversized Inter Typography Headline */}
          <h2 className="font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-[#123B45] tracking-tight leading-[1.12] max-w-4xl">
            Lombok isn't somewhere you simply go.<br className="hidden sm:inline" /> It's somewhere you slow down.
          </h2>

          {/* Natural Tones Minimal Gold Divider */}
          <div className="h-[1px] w-16 bg-[#F4C95D] my-8 sm:my-12" />

          {/* Supporting Text */}
          <p className="text-base sm:text-xl text-[#123B45]/85 font-normal max-w-2xl leading-relaxed">
            Feel the sand beneath your feet. Take the long way to the beach. Stay for one more sunset. Swim a little longer. Let the island set the pace.
          </p>

          <span className="mt-10 text-[11px] tracking-[0.2em] uppercase font-medium text-[#123B45]/40">
            FIRST-LOP · Indonesia
          </span>
        </motion.div>
      </div>
    </section>
  );
}

