import { useEffect, useState } from 'react';
import { BRAND } from '../data/content';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import FirstLopLogo from './FirstLopLogo';
import footerArt from '../assets/images/footer_lombok_night.jpg';
import { SEO_PAGES } from '../data/seoPages';
import { scrollToTarget } from '../utils/smoothScroll';

interface FooterProps {
  onOpenAboutModal?: () => void;
  onOpenPlanModal: () => void;
}

const MONO = "'Space Mono', 'Inter', monospace";

function useLombokTime() {
  const fmt = () =>
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Makassar',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = window.setInterval(() => setTime(fmt()), 1_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

function ColTitle({ n, children }: { n: string; children: string }) {
  return (
    <h4
      className="flex items-baseline gap-3 text-[10px] uppercase tracking-[0.28em] text-[#F4C95D] mb-6"
      style={{ fontFamily: MONO }}
    >
      <span className="text-white/30">{n}</span>
      {children}
    </h4>
  );
}

const linkCls =
  'group inline-flex items-center text-[14px] text-white/80 hover:text-[#FAF7F0] transition-colors cursor-pointer';

function LinkDot() {
  return (
    <span className="h-px w-0 bg-[#F4C95D] transition-all duration-300 group-hover:w-3 group-hover:mr-2" aria-hidden="true" />
  );
}

export default function Footer({ onOpenPlanModal }: FooterProps) {
  const time = useLombokTime();

  const scrollToSection = (id: string) => {
    if (!document.getElementById(id)) {
      window.location.href = '/#' + id;
      return;
    }
    scrollToTarget('#' + id, { offset: -88, duration: 1.15 });
  };

  const explore: { label: string; action: () => void }[] = [
    { label: 'Experiences', action: () => scrollToSection('experiences') },
    { label: 'Journeys', action: () => scrollToSection('packages') },
    { label: 'Your Ride', action: () => scrollToSection('your-ride') },
    { label: 'About Us', action: () => scrollToSection('about') },
  ];

  return (
    <footer
      id="site-footer"
      className="relative overflow-hidden bg-[#0F2C32] text-[#FAF7F0]"
    >
      {/* Illustrated Lombok night: Tanjung Aan bay from Bukit Merese */}
      <img
        src={footerArt}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute bottom-0 left-0 w-full h-[440px] sm:h-auto object-cover object-[60%_100%] select-none"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 w-full h-[440px] sm:h-[42.4vw] bg-gradient-to-b from-[#0F2C32] via-[#0F2C32]/0 via-35% to-transparent"
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-16 sm:pt-20">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-x-8 gap-y-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 flex flex-col gap-5">
            <FirstLopLogo align="start" size="lg" />
            <p className="text-[14px] leading-relaxed text-white/70 max-w-xs">
              Slow, private island travel with drivers, boats and stays chosen by people who live here.
            </p>
            <div
              className="flex flex-col gap-1.5 text-[10px] uppercase tracking-[0.24em] text-white/50"
              style={{ fontFamily: MONO }}
            >
              <span>8.65° S · 116.32° E</span>
              <span className="flex items-center gap-2">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#F4C95D]" />
                Lombok · <span className="tabular-nums">{time}</span> WITA
              </span>
            </div>
            <div>
              <button
                type="button"
                onClick={onOpenPlanModal}
                className="mt-1 inline-flex items-center gap-2 bg-[#F4C95D] hover:bg-[#E5BC50] active:scale-[0.98] text-[#123B45] text-xs font-bold uppercase tracking-[0.14em] px-5 py-2.5 rounded-full shadow-[0_4px_18px_rgba(244,201,93,0.3)] transition-all duration-200 cursor-pointer"
              >
                <span>Plan Your Escape</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="md:col-span-2">
            <ColTitle n="01">Explore</ColTitle>
            <ul className="space-y-3.5">
              {explore.map((l) => (
                <li key={l.label}>
                  <button type="button" onClick={l.action} className={linkCls}>
                    <LinkDot />
                    {l.label}
                  </button>
                </li>
              ))}
              <li>
                <a href="/blog/" className={linkCls}>
                  <LinkDot />
                  Journal
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <ColTitle n="02">Private Tours</ColTitle>
            <ul className="space-y-3.5">
              <li>
                <a href="/lombok-private-tours/" className={linkCls}>
                  <LinkDot />
                  Lombok Private Tours
                </a>
              </li>
              {SEO_PAGES.map((p) => (
                <li key={p.slug}>
                  <a href={`/${p.slug}/`} className={linkCls}>
                    <LinkDot />
                    {p.navLabel}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-3">
            <ColTitle n="03">Island Concierge</ColTitle>
            <div className="space-y-4">
              <a
                href={`https://wa.me/6281234567890?text=${encodeURIComponent(
                  `Hi ${BRAND.name}, I'm reaching out from your website.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3"
              >
                <Phone className="w-4 h-4 mt-0.5 text-[#F4C95D]/80" />
                <span>
                  <span className="block text-[14px] text-white/80 group-hover:text-[#FAF7F0] transition-colors">
                    +62 812-3456-7890
                  </span>
                  <span className="block text-[10px] uppercase tracking-[0.22em] text-white/35 mt-1" style={{ fontFamily: MONO }}>
                    WhatsApp
                  </span>
                </span>
              </a>
              <a href="mailto:concierge@firstlop.com" className="group flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-[#F4C95D]/80" />
                <span>
                  <span className="block text-[14px] text-white/80 group-hover:text-[#FAF7F0] transition-colors">
                    concierge@firstlop.com
                  </span>
                  <span className="block text-[10px] uppercase tracking-[0.22em] text-white/35 mt-1" style={{ fontFamily: MONO }}>
                    Email
                  </span>
                </span>
              </a>
              <button type="button" onClick={onOpenPlanModal} className={linkCls + ' pt-1'}>
                <LinkDot />
                Contact &amp; Inquiries
              </button>
            </div>
          </div>
        </div>

        {/* Divider + legal */}
        <div
          className="mt-14 border-t border-white/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] uppercase tracking-[0.22em] text-white/50"
          style={{ fontFamily: MONO }}
        >
          <p>© {new Date().getFullYear()} {BRAND.name} · Handcrafted in West Nusa Tenggara</p>
          <p>The Island, Your Way · Slow Island Travel</p>
        </div>

        {/* Space for the landscape to breathe */}
        <div aria-hidden="true" className="h-[260px] sm:h-[26vw] lg:h-[min(26vw,420px)]" />
      </div>
    </footer>
  );
}
