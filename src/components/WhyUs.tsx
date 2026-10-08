import { motion } from 'motion/react';
import { WHY_US_FEATURES } from '../data/content';

export default function WhyUs() {
  return (
    <section
      id="why-us"
      className="py-24 sm:py-32 bg-[#FAF7F0] text-[#123B45] border-t border-[#123B45]/10"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-[#4F9DA6] block mb-3">
            The FIRST-LOP Way
          </span>
          <h2 className="font-bold text-3xl sm:text-5xl lg:text-6xl text-[#123B45] tracking-tight leading-[1.12]">
            Travel Better. Worry Less.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#123B45]/80 font-normal leading-relaxed max-w-xl">
            We strip away tourist friction so you can sink into the unhurried magic of the Indonesian archipelago.
          </p>
        </div>

        {/* Four Minimal Feature Blocks (Pure restrained typography, no icons/circles) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
          {WHY_US_FEATURES.map((feature, index) => {
            return (
              <motion.div
                key={feature.id}
                id={`feature-block-${feature.id}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col justify-between p-8 rounded-xl bg-white/70 border border-[#123B45]/10 transition-all duration-300 hover:border-[#4F9DA6]/40 hover:bg-white hover:shadow-sm"
              >
                <div>
                  <span className="text-[11px] tracking-[0.2em] uppercase text-[#4F9DA6] font-semibold block mb-4">
                    0{index + 1}
                  </span>

                  <h3 className="text-xs font-semibold tracking-[0.14em] uppercase text-[#123B45]">
                    {feature.title}
                  </h3>

                  <p className="mt-3 font-semibold text-lg sm:text-xl text-[#123B45] tracking-tight leading-snug">
                    "{feature.tagline}"
                  </p>

                  <p className="mt-4 text-xs sm:text-sm text-[#123B45]/75 font-normal leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#123B45]/10">
                  <span className="text-[11px] font-semibold tracking-[0.14em] text-[#123B45]/60 uppercase">
                    {feature.metric}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

