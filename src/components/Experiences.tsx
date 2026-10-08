import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, MapPin, Clock, Check } from 'lucide-react';
import { EXPERIENCES } from '../data/content';
import { Experience } from '../types';

interface ExperiencesProps {
  onPlanExperience: (exp: Experience) => void;
}

export default function Experiences({ onPlanExperience }: ExperiencesProps) {
  const [activeCategory, setActiveCategory] = useState<string>(EXPERIENCES[0].category);

  const activeExp = EXPERIENCES.find((e) => e.category === activeCategory) || EXPERIENCES[0];

  return (
    <section
      id="experiences"
      className="py-16 sm:py-36 bg-[#FAF8F5] text-[#0E171A] border-t border-[#0E171A]/8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2E7987]" />
            <span className="text-[10.5px] uppercase tracking-[0.24em] font-semibold text-[#2E7987]">
              Curated Moments
            </span>
          </div>
          <h2 className="font-semibold text-3xl sm:text-5xl lg:text-6xl text-[#0E171A] tracking-tight leading-[1.08]">
            Don't Just Visit Lombok.<br />Experience It.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#0E171A]/75 font-normal leading-relaxed max-w-2xl">
            The best trips aren't measured by how many places you see, but by what stays with you when you leave.
          </p>
        </div>

        {/* Apple-Style Liquid Glass Segmented Control Filter */}
        <div className="flex items-center overflow-x-auto pb-4 mb-10 sm:mb-14 no-scrollbar">
          <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full liquid-glass-subtle refraction-highlight">
            {EXPERIENCES.map((exp) => {
              const isSelected = exp.category === activeCategory;
              return (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() => setActiveCategory(exp.category)}
                  id={`exp-tab-${exp.id}`}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.14em] whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'liquid-glass-elevated text-[#0E171A] shadow-sm'
                      : 'text-[#0E171A]/60 hover:text-[#0E171A] hover:bg-white/40'
                  }`}
                >
                  {exp.category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Showcase Canvas with Floating Liquid Glass Panels */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeExp.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center liquid-glass-standard rounded-3xl p-6 sm:p-10 lg:p-12 refraction-highlight"
            >
              {/* Large Photography Container */}
              <div className="lg:col-span-7 overflow-hidden rounded-2xl aspect-[16/10] sm:aspect-[16/9] relative group shadow-[0_16px_40px_rgba(14,23,26,0.06)] border border-white/60">
                <img
                  src={activeExp.image}
                  alt={activeExp.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                {/* Floating Liquid Glass Badges */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2 liquid-glass-dark-subtle px-3.5 py-1.5 rounded-full text-white/95">
                    <MapPin className="w-3.5 h-3.5 text-[#3D95A5]" />
                    <span className="font-medium tracking-wide">{activeExp.location}</span>
                  </div>
                  <div className="flex items-center gap-2 liquid-glass-dark-subtle px-3.5 py-1.5 rounded-full text-white/95">
                    <Clock className="w-3.5 h-3.5 text-[#3D95A5]" />
                    <span className="font-medium tracking-wide">{activeExp.duration}</span>
                  </div>
                </div>
              </div>

              {/* Minimal Editorial Details */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#2E7987]">
                    {activeExp.category}
                  </span>
                </div>

                <h3 className="font-semibold text-2xl sm:text-3xl text-[#0E171A] tracking-tight">
                  {activeExp.title}
                </h3>

                <p className="text-sm sm:text-base text-[#2E7987] font-medium mt-1.5">
                  "{activeExp.tagline}"
                </p>

                <p className="mt-4 text-sm sm:text-base text-[#0E171A]/75 font-normal leading-relaxed">
                  {activeExp.description}
                </p>

                {/* Key Highlights */}
                <div className="mt-6 pt-5 border-t border-[#0E171A]/10 space-y-2.5">
                  <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-[#0E171A]/55 block mb-2">
                    Signature Elements
                  </span>
                  {activeExp.highlights.map((h) => (
                    <div key={h} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0E171A]/85">
                      <Check className="w-4 h-4 text-[#2E7987] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Plan Trip Action: Liquid Glass Button */}
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={() => onPlanExperience(activeExp)}
                    id={`btn-plan-exp-${activeExp.id}`}
                    className="liquid-glass-btn-primary inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] px-6 py-3.5 rounded-full cursor-pointer"
                  >
                    <span>Add to My Trip Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
