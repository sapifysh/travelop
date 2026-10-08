import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data/content';

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 sm:py-32 bg-[#FAF7F0] text-[#123B45] border-t border-[#123B45]/10"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-[#4F9DA6] block mb-3">
            From Our Travelers
          </span>
          <h2 className="font-bold text-3xl sm:text-5xl lg:text-6xl text-[#123B45] tracking-tight leading-[1.12]">
            Good Trips Are Better When They're Remembered.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#123B45]/80 font-normal leading-relaxed max-w-xl">
            A few quiet reflections on the feeling of stepping off the beaten path and experiencing Lombok at its natural pace.
          </p>
        </div>

        {/* 3 Restrained Minimal Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {TESTIMONIALS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              className="flex flex-col justify-between p-8 sm:p-10 rounded-2xl bg-white/80 border border-[#123B45]/10 hover:border-[#4F9DA6]/30 transition-all duration-300 shadow-sm"
            >
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#4F9DA6] font-semibold block mb-6">
                  {item.tag}
                </span>

                <blockquote className="font-normal text-base sm:text-lg text-[#123B45] leading-relaxed">
                  "{item.quote}"
                </blockquote>
              </div>

              <div className="mt-8 pt-6 border-t border-[#123B45]/10 flex flex-col">
                <span className="text-xs font-semibold tracking-wider text-[#123B45] uppercase">
                  {item.traveler}
                </span>
                <span className="text-[11px] text-[#123B45]/60 mt-0.5">
                  {item.note}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
