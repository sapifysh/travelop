import { motion } from 'motion/react';
import { X, ArrowRight, Check, Clock } from 'lucide-react';
import { TravelPackage } from '../types';

interface PackageModalProps {
  pkg: TravelPackage | null;
  onClose: () => void;
  onSelectPackage: (pkg: TravelPackage) => void;
}

export default function PackageModal({
  pkg,
  onClose,
  onSelectPackage,
}: PackageModalProps) {
  if (!pkg) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#0E171A]/75 backdrop-blur-2xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-3xl liquid-glass-elevated text-[#0E171A] rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.3)] border border-white/80 overflow-hidden my-8 refraction-highlight"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Visual Hero */}
        <div className="relative aspect-[16/8] w-full overflow-hidden bg-[#0E171A]">
          <img
            src={pkg.image}
            alt={pkg.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E171A] via-[#0E171A]/50 to-transparent" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close itinerary"
            className="absolute top-4 right-4 w-9 h-9 rounded-full liquid-glass-dark-subtle hover:bg-black/50 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title & Duration */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="inline-flex items-center gap-2 liquid-glass-dark-subtle px-3 py-1 rounded-full text-xs font-semibold mb-2">
              <Clock className="w-3.5 h-3.5 text-[#3D95A5]" />
              <span>{pkg.duration}</span>
            </div>
            <h2 className="font-semibold text-2xl sm:text-4xl text-white tracking-tight">
              {pkg.name}
            </h2>
            <p className="text-sm sm:text-base text-[#FAF8F5]/90 mt-1 font-normal">
              "{pkg.subtitle}"
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8 max-h-[60vh] overflow-y-auto">
          {/* Overview */}
          <div>
            <span className="text-[10.5px] uppercase tracking-[0.2em] font-semibold text-[#2E7987] block mb-2">
              Package Overview
            </span>
            <p className="text-sm sm:text-base text-[#0E171A]/80 font-normal leading-relaxed">
              {pkg.description}
            </p>
          </div>

          {/* Day-by-day Itinerary */}
          <div>
            <span className="text-[10.5px] uppercase tracking-[0.2em] font-semibold text-[#0E171A]/55 block mb-4">
              Day-by-Day Journey
            </span>
            <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-[1px] before:bg-[#0E171A]/12">
              {pkg.itinerary.map((day) => (
                <div key={day.day} className="relative pl-9">
                  <div className="absolute left-0 top-0.5 w-7 h-7 rounded-full liquid-glass-btn-dark-primary text-white flex items-center justify-center text-xs font-bold shadow-xs">
                    {day.day}
                  </div>
                  <h4 className="text-base font-semibold text-[#0E171A] tracking-tight">
                    Day {day.day}: {day.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#0E171A]/75 font-normal mt-1.5 leading-relaxed">
                    {day.description}
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {day.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-[10.5px] font-medium liquid-glass-subtle text-[#0E171A] px-2.5 py-0.5 rounded-full"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What's Included */}
          <div className="pt-4 border-t border-[#0E171A]/10">
            <span className="text-[10.5px] uppercase tracking-[0.2em] font-semibold text-[#0E171A]/55 block mb-3">
              Included In This Journey
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {pkg.included.map((inc) => (
                <div key={inc} className="flex items-start gap-2 text-xs sm:text-sm text-[#0E171A]/85">
                  <Check className="w-4 h-4 text-[#2E7987] shrink-0 mt-0.5" />
                  <span>{inc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-6 border-t border-[#0E171A]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-[#0E171A]/60 block font-medium">Estimated Pricing</span>
              <span className="text-lg font-bold text-[#0E171A]">{pkg.priceEstimate}</span>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onSelectPackage(pkg);
              }}
              className="w-full sm:w-auto liquid-glass-btn-primary inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] px-7 py-3.5 rounded-full cursor-pointer"
            >
              <span>Plan This Journey</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
