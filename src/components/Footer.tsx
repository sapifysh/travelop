import { BRAND } from '../data/content';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import FirstLopLogo from './FirstLopLogo';

interface FooterProps {
  onOpenAboutModal?: () => void;
  onOpenPlanModal: () => void;
}

export default function Footer({ onOpenPlanModal }: FooterProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 88;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer
      id="site-footer"
      className="bg-[#091316] text-[#FAF8F5] pt-20 pb-12 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              <div className="mb-3">
                <FirstLopLogo align="start" />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 text-xs text-white/50 tracking-wider">
              <span>{BRAND.tagline}</span>
            </div>
          </div>

          {/* Links Column */}
          <div className="md:col-span-3">
            <h4 className="text-[10.5px] uppercase tracking-[0.22em] font-semibold text-[#3D95A5] mb-5">
              Explore
            </h4>
            <ul className="space-y-3.5 text-xs sm:text-sm text-white/75">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('experiences')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Experiences
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('packages')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Journeys
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('your-ride')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Your Ride
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenPlanModal}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Concierge & Fast Connect */}
          <div className="md:col-span-4">
            <h4 className="text-[10.5px] uppercase tracking-[0.22em] font-semibold text-[#3D95A5] mb-5">
              Island Concierge
            </h4>
            <p className="text-xs sm:text-sm text-white/70 font-normal leading-relaxed mb-4">
              Direct access to our on-ground travel designers in Kuta Lombok and Gili Trawangan.
            </p>

            <div className="space-y-3 text-xs sm:text-sm text-white/85">
              <a
                href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                  `Hi ${BRAND.name}, I'm reaching out from your website.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#3D95A5] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#3D95A5]" />
                <span>+62 812-3456-7890 (WhatsApp)</span>
              </a>

              <a
                href="mailto:concierge@firstlop.com"
                className="flex items-center gap-2 hover:text-[#3D95A5] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#3D95A5]" />
                <span>concierge@firstlop.com</span>
              </a>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={onOpenPlanModal}
                className="liquid-glass-btn-primary inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-semibold px-5 py-2.5 rounded-full cursor-pointer"
              >
                <span>Plan Your Escape</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/45">
          <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved. Handcrafted in West Nusa Tenggara.</p>
          <div className="flex items-center gap-4">
            <span>The Island, Your Way.</span>
            <span className="text-white/20">/</span>
            <span>Slow Island Travel</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
