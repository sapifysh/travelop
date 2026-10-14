import { useEffect, useState, type MouseEvent, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, ChevronDown, Clock, MessageCircle } from 'lucide-react';
import FirstLopLogo from '../components/FirstLopLogo';
import { BRAND } from '../data/content';
import blogPosts from '../data/blog-posts.json';
import { SEO_PAGES } from '../data/seoPages';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  heroImage: string;
  heroAlt: string;
  ogImage: string;
  cardImage: string;
  author: string;
  datePublished: string;
  dateModified: string;
  readMinutes: number;
  sections: {
    h2: string;
    image?: string;
    imageAlt?: string;
    paragraphs: string[];
    link?: { href: string; label: string };
  }[];
  faqs: { q: string; a: string }[];
  related: string[];
}

export const BLOG_POSTS = blogPosts as BlogPost[];

const clean = (pathname: string) => pathname.replace(/^\/+|\/+$/g, '');

export function isBlogIndex(pathname: string) {
  return clean(pathname) === 'blog';
}

export function findBlogPost(pathname: string): BlogPost | undefined {
  const p = clean(pathname);
  if (!p.startsWith('blog/')) return undefined;
  return BLOG_POSTS.find((b) => b.slug === p.slice(5));
}

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

const pageLabel = (slug: string) =>
  slug === 'lombok-private-tours' ? 'Lombok Private Tours' : SEO_PAGES.find((p) => p.slug === slug)?.navLabel || slug;

function useMeta(title: string, description: string, canonical: string) {
  useEffect(() => {
    const prevTitle = document.title;
    const desc = document.querySelector('meta[name="description"]');
    const canon = document.querySelector('link[rel="canonical"]');
    const prevDesc = desc?.getAttribute('content') || '';
    const prevCanon = canon?.getAttribute('href') || '';
    document.title = title;
    desc?.setAttribute('content', description);
    canon?.setAttribute('href', canonical);
    document.documentElement.lang = 'en';
    window.scrollTo(0, 0);
    return () => {
      document.title = prevTitle;
      if (prevDesc) desc?.setAttribute('content', prevDesc);
      if (prevCanon) canon?.setAttribute('href', prevCanon);
    };
  }, [title, description, canonical]);
}

interface ShellProps {
  label: string;
  onNavigate: (path: string) => void;
  onOpenPlanModal: (destId?: string, pkgName?: string) => void;
  children: ReactNode;
}

function BlogShell({ label, onNavigate, onOpenPlanModal, children }: ShellProps) {
  const go = (e: MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };
  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#123B45] overflow-x-hidden">
      <header className="sticky top-0 z-40 bg-[#FAF7F0]/90 backdrop-blur-md border-b border-[#123B45]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="/" onClick={(e) => go(e, '/')} className="flex items-center gap-3" aria-label="FIRST-LOP home">
            <FirstLopLogo className="w-8 h-8 text-[#123B45]" />
            <div className="flex flex-col">
              <span className="font-serif tracking-tight text-xl font-bold text-[#123B45]">FIRST-LOP</span>
              <span className="text-[9.5px] uppercase tracking-[0.28em] text-[#2E7987] font-mono">{label}</span>
            </div>
          </a>
          <div className="flex items-center gap-3">
            <a
              href="/blog"
              onClick={(e) => go(e, '/blog')}
              className="hidden md:inline-flex text-xs font-mono uppercase tracking-[0.2em] text-[#123B45]/70 hover:text-[#123B45]"
            >
              Journal
            </a>
            <button
              onClick={() => onOpenPlanModal(undefined, 'Journal inquiry')}
              className="px-5 py-2.5 bg-[#123B45] text-[#FAF7F0] text-xs font-mono uppercase tracking-[0.2em] rounded-full hover:bg-[#1B4D58] flex items-center gap-2"
            >
              Plan Your Trip
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>
      {children}
      <footer className="py-12 bg-[#0E171A] text-center">
        <p className="text-xs font-mono text-[#FAF7F0]/40">© FIRST-LOP · {BRAND.tagline}</p>
      </footer>
    </div>
  );
}

interface PageProps {
  onNavigate: (path: string) => void;
  onOpenPlanModal: (destId?: string, pkgName?: string) => void;
}

export function BlogIndexPage({ onNavigate, onOpenPlanModal }: PageProps) {
  useMeta(
    'Lombok Travel Journal: Itineraries, Guides & Tips | FIRST-LOP',
    'Practical Lombok and Gili Islands travel guides from the FIRST-LOP team: itineraries, where to stay, getting around and the best time to visit.',
    'https://firstlop.site/blog'
  );
  const go = (e: MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };
  return (
    <BlogShell label="Journal" onNavigate={onNavigate} onOpenPlanModal={onOpenPlanModal}>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 sm:pt-28">
        <span className="text-[10.5px] uppercase tracking-[0.28em] font-mono text-[#2E7987] block mb-4">THE FIRST-LOP JOURNAL</span>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight leading-[1.08] mb-6">
          Lombok, written by the people who drive it every day.
        </h1>
        <p className="text-base sm:text-lg text-[#0E171A]/75 max-w-2xl leading-relaxed">
          Itineraries, honest drive times and local tips for Lombok and the Gili Islands.
        </p>
      </section>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 grid grid-cols-1 md:grid-cols-2 gap-8">
        {BLOG_POSTS.map((p) => (
          <a
            key={p.slug}
            href={`/blog/${p.slug}`}
            onClick={(e) => go(e, `/blog/${p.slug}`)}
            className="group block bg-white rounded-2xl overflow-hidden border border-[#123B45]/10 hover:shadow-xl transition-shadow"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={p.cardImage}
                alt={p.heroAlt}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
              />
            </div>
            <div className="p-6 sm:p-7">
              <span className="text-[10px] uppercase tracking-[0.24em] font-mono text-[#2E7987]">
                {formatDate(p.datePublished)} · {p.readMinutes} min read
              </span>
              <h2 className="font-serif text-2xl text-[#123B45] leading-snug mt-3 mb-3">{p.h1}</h2>
              <p className="text-sm text-[#0E171A]/70 leading-relaxed">{p.description}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#123B45]">
                Read the guide <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </a>
        ))}
      </section>
    </BlogShell>
  );
}

export function BlogPostPage({ post, onNavigate, onOpenPlanModal }: PageProps & { post: BlogPost }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  useMeta(post.title, post.description, `https://firstlop.site/blog/${post.slug}`);
  const go = (e: MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };
  const whatsappUrl = `https://wa.me/${BRAND.contact.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
    `Hello FIRST-LOP, I read your ${post.h1.replace(/[.:]$/, '')} guide and would like to plan my trip.`
  )}`;

  return (
    <BlogShell label="Journal" onNavigate={onNavigate} onOpenPlanModal={onOpenPlanModal}>
      <article>
        <section className="relative min-h-[72vh] flex items-end overflow-hidden">
          <img src={post.heroImage} alt={post.heroAlt} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E171A]/90 via-[#0E171A]/45 to-[#0E171A]/10" />
          <div className="relative z-10 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-14 pt-32 text-[#FAF7F0]">
            <a
              href="/blog"
              onClick={(e) => go(e, '/blog')}
              className="inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.28em] font-mono text-[#FAF7F0]/70 hover:text-white mb-6"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Journal
            </a>
            <span className="text-[10.5px] uppercase tracking-[0.28em] font-mono text-[#F4C95D] block mb-4">{post.eyebrow}</span>
            <h1 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight leading-[1.08] mb-6">{post.h1}</h1>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono uppercase tracking-[0.18em] text-[#FAF7F0]/70">
              <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {post.readMinutes} min read
              </span>
              <span>·</span>
              <span>{post.author}</span>
            </p>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <p className="font-serif text-xl sm:text-2xl leading-relaxed text-[#123B45] mb-14">{post.intro}</p>

          <div className="space-y-16">
            {post.sections.map((s) => (
              <section key={s.h2}>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#123B45] font-normal tracking-tight leading-[1.15] mb-6">{s.h2}</h2>
                {s.image && (
                  <figure className="mb-7 -mx-4 sm:mx-0">
                    <img
                      src={s.image}
                      alt={s.imageAlt}
                      loading="lazy"
                      className="w-full max-h-[520px] object-cover sm:rounded-2xl"
                    />
                  </figure>
                )}
                <div className="space-y-5">
                  {s.paragraphs.map((t) => (
                    <p key={t.slice(0, 40)} className="text-[17px] text-[#0E171A]/80 leading-[1.8]">
                      {t}
                    </p>
                  ))}
                </div>
                {s.link && (
                  <a
                    href={s.link.href}
                    onClick={(e) => go(e, s.link!.href)}
                    className="mt-6 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#2E7987] border-b border-[#2E7987]/40 pb-1 hover:text-[#123B45] hover:border-[#123B45]"
                  >
                    {s.link.label}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </section>
            ))}
          </div>
        </div>

        <section className="py-20 sm:py-24 bg-white border-y border-[#123B45]/10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-[10.5px] uppercase tracking-[0.24em] font-mono text-[#2E7987] block mb-3 text-center">QUESTIONS & ANSWERS</span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#123B45] font-normal tracking-tight text-center mb-12">
              Frequently asked questions.
            </h2>
            <div className="space-y-4">
              {post.faqs.map((f, i) => {
                const open = openFaq === i;
                return (
                  <div key={f.q} className="bg-[#FAF7F0] rounded-xl border border-[#123B45]/10 overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(open ? null : i)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4"
                      aria-expanded={open}
                    >
                      <h3 className="font-serif text-lg sm:text-xl text-[#123B45] font-medium leading-snug">{f.q}</h3>
                      <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-6 text-sm text-[#0E171A]/80 leading-relaxed">{f.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </article>

      <section className="py-20 sm:py-28 bg-[#123B45] text-[#FAF7F0] text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight mb-5">Want this itinerary, done for you?</h2>
          <p className="text-[#FAF7F0]/75 mb-10">
            Tell us your dates and group size. We plan the route, the car and the timing around you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => onOpenPlanModal(undefined, post.h1)}
              className="px-9 py-4 bg-[#FAF7F0] text-[#123B45] text-xs font-mono uppercase tracking-[0.2em] font-bold rounded-full flex items-center justify-center gap-2"
            >
              Plan Your Trip
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-white/20 text-xs font-mono uppercase tracking-[0.2em] rounded-full flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#48B0C4]" />
              Chat on WhatsApp
            </a>
          </div>
          <nav className="mt-16 pt-10 border-t border-white/10" aria-label="Related Lombok tours">
            <span className="text-[10px] uppercase tracking-[0.28em] font-mono text-[#FAF7F0]/50 block mb-5">TOURS FROM THIS GUIDE</span>
            <div className="flex flex-wrap justify-center gap-3">
              {post.related.map((slug) => (
                <a
                  key={slug}
                  href={`/${slug}`}
                  onClick={(e) => go(e, `/${slug}`)}
                  className="px-4 py-2 rounded-full border border-white/15 text-xs text-[#FAF7F0]/80 hover:text-white hover:border-white/40"
                >
                  {pageLabel(slug)}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </section>
    </BlogShell>
  );
}
