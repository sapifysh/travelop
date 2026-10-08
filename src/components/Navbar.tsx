import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, MessageCircle } from 'lucide-react';
import { BRAND } from '../data/content';
import FirstLopLogo from './FirstLopLogo';

interface NavbarProps {
  onOpenPlanModal: () => void;
}

export default function Navbar({ onOpenPlanModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 88;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      {/* Editorial Transparent Overlay Navigation */}
      <header
        id="main-navigation"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
          isScrolled
            ? 'bg-[#0A242B]/95 backdrop-blur-md border-b border-white/10 py-3.5 sm:py-4 shadow-xl'
            : 'bg-[#0A242B] sm:bg-transparent sm:bg-gradient-to-b sm:from-[#0A242B]/80 sm:via-[#0A242B]/35 sm:to-transparent py-4 sm:py-7 border-b border-white/5 sm:border-b-0'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between">
          {/* Brand Logo / Wordmark on the far left matching uploaded logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center focus:outline-none select-none transition-opacity duration-200 hover:opacity-90"
            id="nav-logo"
            aria-label="FIRST-LOP INDONESIA"
          >
            <FirstLopLogo />
          </a>

          {/* Navigation Links Centered */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-11 text-[13px] lg:text-[14px] font-medium tracking-[0.05em]">
            <button
              type="button"
              onClick={() => scrollToSection('destinations')}
              id="nav-link-destinations"
              className="text-[#FAF7F0]/85 hover:text-[#FAF7F0] transition-colors duration-150 cursor-pointer"
            >
              Destinations
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('experiences')}
              id="nav-link-experiences"
              className="text-[#FAF7F0]/85 hover:text-[#FAF7F0] transition-colors duration-150 cursor-pointer"
            >
              Experiences
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('your-ride')}
              id="nav-link-your-ride"
              className="text-[#FAF7F0]/85 hover:text-[#FAF7F0] transition-colors duration-150 cursor-pointer"
            >
              Your Ride
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('about')}
              id="nav-link-about"
              className="text-[#FAF7F0]/85 hover:text-[#FAF7F0] transition-colors duration-150 cursor-pointer"
            >
              About
            </button>
          </nav>

          {/* Plan Your Trip CTA on the far right */}
          <div className="hidden sm:flex items-center">
            <button
              type="button"
              onClick={onOpenPlanModal}
              id="nav-btn-plan-trip"
              className="group inline-flex items-center gap-2 bg-[#F4C95D] hover:bg-[#E5BC50] active:scale-[0.98] text-[#123B45] text-xs font-bold uppercase tracking-[0.14em] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-[0_4px_16px_rgba(244,201,93,0.3)] transition-all duration-200 cursor-pointer"
            >
              <span>PLAN YOUR TRIP</span>
              <span className="text-sm font-normal transition-transform duration-200 group-hover:translate-x-1">→</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex sm:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="nav-mobile-toggle"
              aria-label="Toggle Navigation Menu"
              className="p-2 text-[#FAF7F0] hover:text-[#F4C95D] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Clean Overlay Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            id="mobile-nav-drawer"
            className="fixed inset-0 z-40 bg-[#0A242B]/95 backdrop-blur-xl text-[#FAF7F0] flex flex-col justify-between p-6 sm:p-8 pt-24 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div
              className="flex flex-col gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#F4C95D]">
                  Navigation
                </span>
                <span className="text-[10px] tracking-widest text-[#FAF7F0]/50 uppercase">
                  Lombok, ID
                </span>
              </div>

              <nav className="flex flex-col gap-4 text-lg font-medium tracking-tight">
                <button
                  type="button"
                  onClick={() => scrollToSection('destinations')}
                  className="text-left py-2 hover:text-[#F4C95D] transition-colors cursor-pointer"
                >
                  Destinations
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('experiences')}
                  className="text-left py-2 hover:text-[#F4C95D] transition-colors cursor-pointer"
                >
                  Experiences
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('packages')}
                  className="text-left py-2 hover:text-[#F4C95D] transition-colors cursor-pointer"
                >
                  Journeys & Packages
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('your-ride')}
                  className="text-left py-2 hover:text-[#F4C95D] transition-colors cursor-pointer"
                >
                  Your Ride
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('about')}
                  className="text-left py-2 hover:text-[#F4C95D] transition-colors cursor-pointer"
                >
                  About FIRST-LOP
                </button>
              </nav>
            </div>

            <div
              className="flex flex-col gap-3 border-t border-white/10 pt-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPlanModal();
                }}
                className="w-full bg-[#F4C95D] hover:bg-[#E5BC50] text-[#123B45] font-bold text-xs uppercase tracking-[0.16em] py-3.5 rounded-full flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>PLAN YOUR TRIP</span>
                <span className="text-sm">→</span>
              </button>

              <a
                href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                  `Hello ${BRAND.name}! I'd love to plan a bespoke trip to Lombok.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white/10 hover:bg-white/15 text-[#FAF7F0] border border-white/15 font-semibold text-xs uppercase tracking-[0.14em] py-3 rounded-full flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#F4C95D]" />
                <span>WhatsApp Concierge</span>
              </a>

              <p className="text-center text-[10px] text-[#FAF7F0]/50 tracking-wider uppercase mt-1">
                Lombok · West Nusa Tenggara
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
