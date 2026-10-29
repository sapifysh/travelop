import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface StickyCTAProps {
  onPlanTrip: () => void;
}

// Mobile-only sticky call-to-action bar. It stays hidden while the hero
// (which already carries the primary CTA) is on screen, then slides in once
// the visitor has scrolled past it. It opens the Plan Trip form — the same
// action as the navbar's "Plan Your Trip" button. z-30 sits below modals and
// below YourRide's docked selection bar (z-40), which takes precedence while
// a vehicle is selected.
export default function StickyCTA({ onPlanTrip }: StickyCTAProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.85);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 88, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 88, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 inset-x-0 z-30 md:hidden px-4 pb-4 pt-6 bg-gradient-to-t from-[rgba(10,36,43,0.45)] via-[rgba(10,36,43,0.18)] to-transparent pointer-events-none"
        >
          <button
            type="button"
            onClick={onPlanTrip}
            className="pointer-events-auto w-full inline-flex items-center justify-center gap-2 bg-[#F4C95D] hover:bg-[#E5BC50] active:scale-[0.98] text-[#123B45] text-xs font-bold uppercase tracking-[0.14em] py-3.5 rounded-full shadow-[0_4px_18px_rgba(244,201,93,0.35)] transition-all duration-200 cursor-pointer"
          >
            <span>Plan Your Trip</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
