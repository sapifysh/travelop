import { motion } from 'motion/react';
import { X, ArrowRight, Check, Clock } from 'lucide-react';
import { Destination } from '../types';

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  onPlanForDestination: (destId: string) => void;
}

export default function DestinationModal({
  destination,
  onClose,
  onPlanForDestination,
}: DestinationModalProps) {
  if (!destination) return null;

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
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#0E171A]">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E171A] via-[#0E171A]/40 to-transparent" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close destination details"
            className="absolute top-4 right-4 w-9 h-9 rounded-full liquid-glass-dark-subtle hover:bg-black/50 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title & Vibe on hero */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#3D95A5]">
                Lombok Destination
              </span>
              <span className="text-white/40">/</span>
              <span className="text-xs text-white/80">{destination.vibe}</span>
            </div>
            <h2 className="font-semibold text-3xl sm:text-4xl text-white tracking-tight">
              {destination.name}
            </h2>
            <p className="text-base sm:text-lg text-[#FAF8F5]/90 mt-1 font-normal">
              "{destination.title}"
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
          <div>
            <span className="text-[10.5px] uppercase tracking-[0.2em] font-semibold text-[#2E7987] block mb-2">
              About This Shore
            </span>
            <p className="text-base sm:text-lg text-[#0E171A]/80 font-normal leading-relaxed">
              {destination.description}
            </p>
          </div>

          {/* Best For Tags (Clean unboxed style) */}
          <div>
            <span className="text-[10.5px] uppercase tracking-[0.2em] font-semibold text-[#0E171A]/55 block mb-2.5">
              Ideal For
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {destination.bestFor.map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1 liquid-glass-subtle text-[#0E171A] text-xs rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Curated Highlights */}
          <div className="pt-4 border-t border-[#0E171A]/10">
            <span className="text-[10.5px] uppercase tracking-[0.2em] font-semibold text-[#0E171A]/55 block mb-3">
              Signature Island Highlights
            </span>
            <ul className="space-y-2.5">
              {destination.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#0E171A]/85">
                  <Check className="w-4 h-4 text-[#2E7987] shrink-0 mt-0.5" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Travel Logistics info */}
          <div className="pt-2 flex items-center gap-2 text-xs text-[#0E171A]/60">
            <Clock className="w-4 h-4 text-[#2E7987]" />
            <span>{destination.travelTime}</span>
          </div>

          {/* Action CTA */}
          <div className="pt-4 border-t border-[#0E171A]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={onClose}
              className="text-xs uppercase tracking-wider text-[#0E171A]/60 hover:text-[#0E171A] font-semibold cursor-pointer"
            >
              Close
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onPlanForDestination(destination.name);
              }}
              className="w-full sm:w-auto liquid-glass-btn-primary inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] px-7 py-3 rounded-full cursor-pointer"
            >
              <span>Plan Trip to {destination.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
