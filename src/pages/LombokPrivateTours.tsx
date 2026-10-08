import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Car,
  Waves,
  Sun,
  ShieldCheck,
  MessageCircle,
  Phone,
  Home,
  Check,
  Calendar,
  Star,
} from 'lucide-react';
import FirstLopLogo from '../components/FirstLopLogo';
import { BRAND } from '../data/content';
import { VEHICLE_OPTIONS } from '../data/vehicles';
import { VehicleOption } from '../types';

interface LombokPrivateToursProps {
  onNavigateHome: () => void;
  onOpenPlanModal: (destId?: string, pkgName?: string, vehicle?: VehicleOption) => void;
}

// Curated Private Tour Collections
const PRIVATE_TOURS = [
  {
    id: 'south-lombok-coastal',
    title: 'South Lombok Coastal & Beach Odyssey',
    tagline: 'Crescent bays, rolling whitewash, and iconic clifftop sunsets.',
    duration: 'Full Day · 8–10 Hours',
    pickup: 'Pick-up anywhere in Lombok / Airport',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
    category: 'BEACH & COASTAL',
    priceEstimate: 'From $65 / vehicle (up to 4 guests)',
    bestFor: 'Beach lovers, photographers, surf beginners, families',
    highlights: [
      'Gentle waves and powdery sand at Selong Belanak bay',
      'Panoramic 360° twin-bay vistas atop Bukit Merese at golden hour',
      'Powder-soft white sands and hidden coves of Tanjung Aan',
      'Scenic coastal drive through Kuta Lombok headlands',
    ],
    overview:
      'The definitive South Lombok journey. Explore the island’s most celebrated coastlines at your own pace. Stop for fresh young coconuts at quiet warungs, paddle into warm waters, and finish atop Bukit Merese as the sun sinks into the Indian Ocean.',
  },
  {
    id: 'gili-islands-safari',
    title: 'Gili Islands Private Boat & Turtle Safari',
    tagline: 'Private speedboat crossing, crystal reefs, and quiet island shores.',
    duration: 'Full Day · 7–9 Hours',
    pickup: 'Mainland transfer to Teluk Nare Harbor included',
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=1200&q=85',
    category: 'ISLAND HOPPING & MARINE',
    priceEstimate: 'From $110 / private charter',
    bestFor: 'Snorkelers, couples, marine wildlife lovers',
    highlights: [
      'Private wooden outrigger boat with personal local boat captain',
      'Snorkel with wild green sea turtles in their natural reef sanctuary',
      'Visit the world-famous underwater statues off Gili Meno',
      'Car-free bicycle ride and beachside lunch on Gili Trawangan',
    ],
    overview:
      'Skip the crowded public ferries. Your private chauffeur escorts you to Teluk Nare harbor, where a private boat captain awaits. Glide over vibrant coral gardens and swim with sea turtles before returning to the mainland in serene comfort.',
  },
  {
    id: 'rinjani-waterfalls',
    title: 'Mount Rinjani Foothills & Secret Waterfalls',
    tagline: 'Lush rainforest canopies, misty river trails, and Senaru cascades.',
    duration: 'Full Day · 9–10 Hours',
    pickup: 'Pick-up anywhere in Lombok',
    image: 'https://images.unsplash.com/photo-1516815231560-8f41ec531527?auto=format&fit=crop&w=1200&q=85',
    category: 'NATURE & HIGHLANDS',
    priceEstimate: 'From $75 / vehicle',
    bestFor: 'Nature enthusiasts, hikers, refreshing rainforest dips',
    highlights: [
      'Trek through Senaru rainforest to the towering Sendang Gile cascade',
      'Wade through cooling mountain streams to reach hidden Tiu Kelep falls',
      'Highland coffee tasting overlooking northern terraced rice fields',
      'Private air-conditioned mountain vehicle with skilled highland driver',
    ],
    overview:
      'Journey to northern Lombok’s dramatic volcanic slopes. Experience the refreshing mist of Sendang Gile and Tiu Kelep waterfalls nestled inside pristine tropical rainforest, led by a respectful local mountain ranger.',
  },
  {
    id: 'sasak-heritage-craft',
    title: 'Sasak Living Heritage & Artisan Trail',
    tagline: 'Centuries-old handweaving, terracotta masters, and authentic flavors.',
    duration: 'Half Day / Full Day · 5–7 Hours',
    pickup: 'Pick-up anywhere in Lombok',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=85',
    category: 'CULTURAL IMMERSION',
    priceEstimate: 'From $55 / vehicle',
    bestFor: 'Culture seekers, textile collectors, authentic culinary travelers',
    highlights: [
      'Witness intricate hand-woven songket textiles in Sukarara artisan village',
      'Centuries-old architecture and cultural heritage at traditional Sade hamlet',
      'Hand-thrown clay pottery demonstration in Banyumulek village',
      'Traditional Sasak family-style lunch with homemade sambal',
    ],
    overview:
      'Go beyond the beach to uncover the deep cultural heritage of the Sasak people. Meet local artisans, learn about ancient architectural traditions, and taste authentic Lombok cuisine prepared with heartfelt warmth.',
  },
  {
    id: 'custom-private-itinerary',
    title: 'Custom Lombok Private Tour (Your Design)',
    tagline: 'Completely bespoke routing crafted around your wish list and tempo.',
    duration: 'Single Day or Multi-Day (Flexible)',
    pickup: 'Any location across Lombok & Gili archipelago',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=85',
    category: 'TAILOR-MADE',
    priceEstimate: 'Custom quote based on itinerary',
    bestFor: 'Special occasions, multi-generational families, surfing trips',
    highlights: [
      'Dedicated trip designer to build your personalized daily schedule',
      'Choose your preferred vehicle from our executive fleet (Alphard, Zenix, Xpander)',
      'Blend surf coaching, beach clubs, waterfalls, or private yacht charters',
      'Real-time itinerary adjustments directly with your private chauffeur',
    ],
    overview:
      'Have specific places in mind or traveling for a special honeymoon or family milestone? Tell us your dates and desires, and we will curate a seamless private tour from arrival to departure.',
  },
];

// Why choose private tours over group tours
const PRIVATE_ADVANTAGES = [
  {
    title: 'Your Rhythm, Your Rules',
    description:
      'No rigid schedules or crowded tourist buses. Linger for an extra swim at Selong Belanak, stay for one more golden sunset, or change direction when a secret cove calls your name.',
  },
  {
    title: 'Executive Private Fleet',
    description:
      'Travel exclusively in clean, modern, air-conditioned vehicles—from our versatile Mitsubishi Xpander and Toyota Innova Zenix Hybrid to our flagship Toyota Alphard.',
  },
  {
    title: 'Professional Island Chauffeurs',
    description:
      'Our dedicated drivers are born and raised in Lombok. Courteous, punctual, and discreet, they know the island’s secret lookouts, tide tables, and authentic local warungs.',
  },
  {
    title: 'Door-to-Door & Airport Greeting',
    description:
      'Complimentary pickup from Lombok International Airport (LOP), your luxury villa, or harbor. Luggage assistance, route coordination, and chilled bottled water are always included.',
  },
];

// Inclusions list
const TOUR_INCLUSIONS = [
  'Private air-conditioned vehicle exclusively for your party',
  'Dedicated, experienced, and courteous island chauffeur',
  'All fuel, road tolls, and destination parking fees',
  'Complimentary chilled bottled water and cold towels',
  'Door-to-door pickup and drop-off anywhere on mainland Lombok',
  'Full luggage assistance upon airport and hotel arrival',
  'Complete route flexibility and personalized recommendations',
  'Zero hidden booking fees or unexpected surcharges',
];

// Frequently Asked Questions
const FAQ_ITEMS = [
  {
    q: 'What is included in a Lombok private tour with FIRST-LOP?',
    a: 'Every private tour includes a dedicated air-conditioned vehicle, a vetted professional local chauffeur, all vehicle fuel, parking fees, and road tolls. We also provide complimentary bottled water and door-to-door pickup from your hotel, villa, or Lombok International Airport (LOP). Specific activities like boat charters, surfboard rentals, or waterfall guides can be seamlessly bundled upon request.',
  },
  {
    q: 'Can we customize our private tour itinerary on the day?',
    a: 'Yes, absolutely. That is the cornerstone of FIRST-LOP. While we provide curated itineraries for inspiration, your chauffeur is at your service. If you wish to spend more time at a particular beach, skip a stop, or discover an off-the-beaten-path cafe, you have full freedom to adapt your day.',
  },
  {
    q: 'Do you offer pickup from Lombok International Airport (LOP)?',
    a: 'Yes. We provide seamless airport pickups and drop-offs. Your private chauffeur will monitor your flight schedule, greet you at the arrival hall with a personalized name board, assist with all luggage, and escort you directly to your vehicle.',
  },
  {
    q: 'How does a private tour to the Gili Islands work?',
    a: 'Your private chauffeur drives you in comfort to Teluk Nare harbor in North Lombok. There, you step aboard a private wooden outrigger or chartered speedboat reserved exclusively for your party. Your boat captain takes you snorkeling with wild sea turtles at Gili Meno and Gili Trawangan before returning you to the mainland, where your chauffeur awaits.',
  },
  {
    q: 'What vehicles are available for Lombok private tours?',
    a: 'Our fleet ranges from compact city cars to executive VIP transports. Popular picks for private tours include the comfortable Mitsubishi Xpander (up to 4–5 guests), the premium Toyota Innova Zenix Hybrid, and our flagship Toyota Alphard featuring luxury captain seats and executive concierge service.',
  },
  {
    q: 'How far in advance should we book our Lombok private tour?',
    a: 'We recommend reserving at least 24 to 48 hours in advance, especially during high season (July–September and year-end holidays). However, we frequently accommodate same-day requests depending on fleet availability. You can reach out directly via our online planner or on WhatsApp.',
  },
];

export default function LombokPrivateTours({
  onNavigateHome,
  onOpenPlanModal,
}: LombokPrivateToursProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Dynamically update document title and canonical meta for SEO when on this page
  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'Lombok Private Tours — Bespoke Island Journeys & Chauffeur | FIRST-LOP';

    const metaDesc = document.querySelector('meta[name="description"]');
    const originalDesc = metaDesc?.getAttribute('content') || '';
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Discover Lombok with FIRST-LOP bespoke private tours: custom day tours, luxury chauffeur service, Gili Islands boat charters, and South Lombok beach journeys.'
      );
    }

    const canonicalLink = document.querySelector('link[rel="canonical"]');
    const originalCanonical = canonicalLink?.getAttribute('href') || '';
    if (canonicalLink) {
      canonicalLink.setAttribute('href', 'https://firstlop.site/lombok-private-tours');
    }

    return () => {
      document.title = originalTitle;
      if (metaDesc && originalDesc) {
        metaDesc.setAttribute('content', originalDesc);
      }
      if (canonicalLink && originalCanonical) {
        canonicalLink.setAttribute('href', originalCanonical);
      }
    };
  }, []);

  const scrollToTours = () => {
    const el = document.getElementById('curated-private-tours');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const whatsappInquiryUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(
    'Hello FIRST-LOP Concierge, I would like to inquire about booking a private tour in Lombok.'
  )}`;

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#123B45] selection:bg-[#123B45]/20 selection:text-[#123B45] overflow-x-hidden">
      {/* ========================================================
          STICKY EDITORIAL HEADER
      ======================================================== */}
      <header className="sticky top-0 z-40 bg-[#FAF7F0]/90 backdrop-blur-md border-b border-[#123B45]/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Home Link */}
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-3 text-left group focus:outline-none"
            aria-label="Return to FIRST-LOP homepage"
          >
            <FirstLopLogo className="w-8 h-8 text-[#123B45] transition-transform group-hover:scale-105" />
            <div className="flex flex-col">
              <span className="font-serif tracking-tight text-xl font-bold text-[#123B45]">
                FIRST-LOP
              </span>
              <span className="text-[9.5px] uppercase tracking-[0.28em] text-[#2E7987] font-mono">
                Lombok Private Tours
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={onNavigateHome}
              className="text-xs font-mono uppercase tracking-[0.2em] text-[#123B45]/70 hover:text-[#123B45] transition-colors flex items-center gap-1.5"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <a
              href="#curated-private-tours"
              className="text-xs font-mono uppercase tracking-[0.2em] text-[#123B45]/70 hover:text-[#123B45] transition-colors"
            >
              Tours
            </a>
            <a
              href="#the-private-difference"
              className="text-xs font-mono uppercase tracking-[0.2em] text-[#123B45]/70 hover:text-[#123B45] transition-colors"
            >
              Why Private
            </a>
            <a
              href="#tour-inclusions"
              className="text-xs font-mono uppercase tracking-[0.2em] text-[#123B45]/70 hover:text-[#123B45] transition-colors"
            >
              Inclusions
            </a>
            <a
              href="#faq"
              className="text-xs font-mono uppercase tracking-[0.2em] text-[#123B45]/70 hover:text-[#123B45] transition-colors"
            >
              FAQ
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono uppercase tracking-wider text-[#123B45] border border-[#123B45]/20 rounded-full hover:bg-[#123B45]/5 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#2E7987]" />
              <span>WhatsApp</span>
            </a>
            <button
              onClick={() => onOpenPlanModal(undefined, 'Lombok Private Tour')}
              className="px-5 py-2.5 bg-[#123B45] text-[#FAF7F0] text-xs font-mono uppercase tracking-[0.2em] rounded-full hover:bg-[#1B4D58] transition-all shadow-sm flex items-center gap-2 group"
            >
              <span>Plan a Tour</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================
          HERO SECTION (Cinematic Editorial Header)
      ======================================================== */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Deep Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=85"
            alt="Lombok turquoise coastline and pristine sand - FIRST-LOP Private Tours"
            className="w-full h-full object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#123B45] via-[#123B45]/60 to-[#123B45]/40" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center text-[#FAF7F0]">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#48B0C4] animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#FAF7F0]">
              Lombok Private Tours · Dedicated Chauffeur Service
            </span>
          </motion.div>

          {/* H1 Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#FAF7F0] leading-[1.08] max-w-4xl mx-auto mb-6"
          >
            Lombok Private Tours, <br />
            <span className="italic font-serif">Handcrafted</span> for the Curious Traveler.
          </motion.h1>

          {/* Subtitle / Narrative */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg lg:text-xl text-[#FAF7F0]/85 font-normal max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Experience Lombok on your own terms. From the pristine crescent bays of Selong Belanak
            and the surf breaks of Kuta to private boat charters in the Gili Islands—our private
            tours combine executive vehicles, native island hosts, and the luxury of setting your own
            tempo.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => onOpenPlanModal(undefined, 'Lombok Private Tour')}
              className="w-full sm:w-auto px-8 py-4 bg-[#FAF7F0] text-[#123B45] text-xs font-mono uppercase tracking-[0.2em] font-semibold rounded-full hover:bg-white transition-all shadow-xl hover:scale-105 flex items-center justify-center gap-2 group"
            >
              <span>Design Your Private Tour</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={scrollToTours}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-[#FAF7F0] border border-white/20 text-xs font-mono uppercase tracking-[0.2em] rounded-full backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Tour Itineraries</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Value Highlights Pill Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto pt-8 border-t border-white/15 text-left"
          >
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#48B0C4] shrink-0" />
              <span className="text-xs text-[#FAF7F0]/90 font-mono tracking-wide">
                100% Private & Custom
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Car className="w-4 h-4 text-[#48B0C4] shrink-0" />
              <span className="text-xs text-[#FAF7F0]/90 font-mono tracking-wide">
                Executive Chauffeur
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#48B0C4] shrink-0" />
              <span className="text-xs text-[#FAF7F0]/90 font-mono tracking-wide">
                No Rushed Schedules
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#48B0C4] shrink-0" />
              <span className="text-xs text-[#FAF7F0]/90 font-mono tracking-wide">
                Airport & Villa Pickup
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================
          EDITORIAL CONCEPT STATEMENT
      ======================================================== */}
      <section className="py-20 sm:py-28 bg-[#FAF8F5] border-b border-[#123B45]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[10.5px] uppercase tracking-[0.26em] font-mono text-[#2E7987] font-semibold block mb-4">
            A DIFFERENT WAY TO EXPERIENCE THE ISLAND
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#123B45] font-normal tracking-tight leading-[1.2] mb-6">
            The beauty of Lombok isn’t found on a crowded tour bus. It’s found when you take the long
            way to the beach.
          </h2>
          <p className="text-base sm:text-lg text-[#0E171A]/75 font-normal leading-relaxed max-w-2xl mx-auto">
            Standard group tours rush between crowded photo stops on strict timetables. FIRST-LOP
            provides an authentic alternative: thoughtful, private journeys with knowledgeable local
            chauffeurs who know when the tide is right, where the quietest shores hide, and how to
            let Lombok set the pace.
          </p>
        </div>
      </section>

      {/* ========================================================
          FEATURED PRIVATE TOUR ITINERARIES
      ======================================================== */}
      <section id="curated-private-tours" className="py-24 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E7987]" />
              <span className="text-[10.5px] uppercase tracking-[0.24em] font-semibold text-[#2E7987]">
                CURATED PRIVATE TOUR ITINERARIES
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#123B45] font-normal tracking-tight leading-[1.15]">
              Tailored Day Tours Across Lombok & the Gili Islands.
            </h2>
          </div>
          <p className="text-sm text-[#0E171A]/70 max-w-md font-normal leading-relaxed">
            Every itinerary is a flexible framework. Want to swap a beach, start at sunrise, or
            extend into dinner? Your dedicated chauffeur adapts the journey around you.
          </p>
        </div>

        {/* Tour Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {PRIVATE_TOURS.map((tour, index) => (
            <motion.article
              key={tour.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden border border-[#123B45]/10 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#123B45]/5">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#123B45]/90 text-[#FAF7F0] text-[10px] font-mono uppercase tracking-[0.2em] rounded-full backdrop-blur-sm">
                      {tour.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                    <span className="text-xs font-mono tracking-wider flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full">
                      <Clock className="w-3.5 h-3.5" />
                      {tour.duration}
                    </span>
                    <span className="text-xs font-mono font-semibold tracking-wider bg-[#2E7987]/90 px-2.5 py-1 rounded-full">
                      {tour.priceEstimate}
                    </span>
                  </div>
                </div>

                {/* Tour Card Content */}
                <div className="p-6 sm:p-8">
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#123B45] font-normal tracking-tight mb-2">
                    {tour.title}
                  </h3>
                  <p className="text-xs font-mono text-[#2E7987] uppercase tracking-wider mb-4">
                    {tour.tagline}
                  </p>
                  <p className="text-sm text-[#0E171A]/75 font-normal leading-relaxed mb-6">
                    {tour.overview}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2.5 pt-4 border-t border-[#123B45]/10 mb-6">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#123B45]/70 block font-semibold">
                      Tour Highlights
                    </span>
                    {tour.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#0E171A]/85">
                        <Check className="w-3.5 h-3.5 text-[#2E7987] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Best For Tag */}
                  <div className="text-xs font-mono text-[#123B45]/70 bg-[#FAF7F0] px-3.5 py-2 rounded-lg border border-[#123B45]/10">
                    <strong className="text-[#123B45]">Best for:</strong> {tour.bestFor}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 sm:p-8 pt-0 flex items-center justify-between gap-4 border-t border-[#123B45]/5">
                <button
                  onClick={() => onOpenPlanModal(undefined, tour.title)}
                  className="w-full py-3.5 bg-[#123B45] hover:bg-[#1B4D58] text-[#FAF7F0] text-xs font-mono uppercase tracking-[0.2em] font-semibold rounded-full transition-all flex items-center justify-center gap-2 group/btn"
                >
                  <span>Request This Tour</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ========================================================
          THE PRIVATE DIFFERENCE (WHY US)
      ======================================================== */}
      <section id="the-private-difference" className="py-24 sm:py-32 bg-[#123B45] text-[#FAF7F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10.5px] uppercase tracking-[0.28em] font-mono text-[#48B0C4] font-semibold block mb-3">
              THE PRIVATE DIFFERENCE
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#FAF7F0] leading-[1.15] mb-6">
              Why Discerning Travelers Choose a Private Tour with FIRST-LOP.
            </h2>
            <p className="text-base text-[#FAF7F0]/80 font-normal leading-relaxed">
              Lombok is vast, diverse, and still wild in all the best ways. Having a private,
              knowledgeable chauffeur transforms your vacation from stressful navigation into pure
              leisure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRIVATE_ADVANTAGES.map((adv, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col justify-between hover:bg-white/10 transition-colors"
              >
                <div>
                  <span className="font-mono text-xs text-[#48B0C4] tracking-widest block mb-4">
                    0{index + 1}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#FAF7F0] font-normal mb-3">
                    {adv.title}
                  </h3>
                  <p className="text-sm text-[#FAF7F0]/75 font-normal leading-relaxed">
                    {adv.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Stats Banner */}
          <div className="mt-16 pt-12 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="font-serif text-3xl sm:text-4xl text-[#FAF7F0] mb-1">100%</p>
              <p className="text-xs font-mono uppercase tracking-widest text-[#FAF7F0]/70">
                Private & Unshared
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl sm:text-4xl text-[#FAF7F0] mb-1">15+</p>
              <p className="text-xs font-mono uppercase tracking-widest text-[#FAF7F0]/70">
                Executive Vehicles
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl sm:text-4xl text-[#FAF7F0] mb-1">0</p>
              <p className="text-xs font-mono uppercase tracking-widest text-[#FAF7F0]/70">
                Fixed Bus Routes
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl sm:text-4xl text-[#FAF7F0] mb-1">24/7</p>
              <p className="text-xs font-mono uppercase tracking-widest text-[#FAF7F0]/70">
                Island Concierge Support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          WHAT IS INCLUDED IN EVERY TOUR
      ======================================================== */}
      <section id="tour-inclusions" className="py-24 sm:py-32 bg-[#FAF7F0] border-b border-[#123B45]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10.5px] uppercase tracking-[0.24em] font-mono text-[#2E7987] font-semibold block mb-3">
              TRANSPARENT SERVICE STANDARDS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#123B45] font-normal tracking-tight mb-4">
              What’s Included in Every FIRST-LOP Private Tour.
            </h2>
            <p className="text-sm text-[#0E171A]/75 font-normal leading-relaxed">
              We believe luxury is simplicity and clarity. No hidden costs or surprise fees at the
              end of your day.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TOUR_INCLUSIONS.map((item, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-xl border border-[#123B45]/10 flex items-start gap-3.5 shadow-xs"
              >
                <div className="w-5 h-5 rounded-full bg-[#2E7987]/15 flex items-center justify-center shrink-0 mt-0.5 text-[#2E7987]">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm text-[#0E171A]/85 font-medium leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-xs text-[#123B45]/70 font-mono tracking-wide">
              Optional additions: Private outrigger speedboats, surf coach booking, professional
              waterproof photography, or gourmet beach picnic setups.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          EXECUTIVE FLEET SHOWCASE
      ======================================================== */}
      <section className="py-24 sm:py-32 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-[10.5px] uppercase tracking-[0.24em] font-mono text-[#2E7987] font-semibold block mb-3">
                OUR PRIVATE VEHICLE FLEET
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#123B45] font-normal tracking-tight leading-[1.15]">
                Travel in Clean, Modern Island Comfort.
              </h2>
            </div>
            <p className="text-sm text-[#0E171A]/70 max-w-md font-normal leading-relaxed">
              Every private tour is paired with an immaculate, air-conditioned vehicle matched to
              your travel party size and style.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 1. Xpander */}
            <div className="bg-white rounded-2xl overflow-hidden border border-[#123B45]/10 p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="h-44 w-full overflow-hidden rounded-xl bg-gray-100 mb-6">
                  <img
                    src={VEHICLE_OPTIONS.find((v) => v.id === 'xpander')?.image}
                    alt="Mitsubishi Xpander - FIRST-LOP Private Tour"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#2E7987] font-semibold">
                  COMFORT & VALUE
                </span>
                <h3 className="font-serif text-2xl text-[#123B45] mb-2">Mitsubishi Xpander</h3>
                <p className="text-xs text-[#0E171A]/75 mb-4 leading-relaxed">
                  Ideal for couples, solo adventurers, and small groups of up to 4 travelers.
                  Spacious legroom, generous luggage capacity, and excellent air conditioning.
                </p>
              </div>
              <div className="pt-4 border-t border-[#123B45]/10 flex items-center justify-between">
                <span className="text-xs font-mono text-[#123B45]/70">Up to 4–5 guests</span>
                <span className="text-xs font-mono font-semibold text-[#123B45]">
                  Included in standard tour
                </span>
              </div>
            </div>

            {/* 2. Innova Zenix Hybrid */}
            <div className="bg-white rounded-2xl overflow-hidden border border-[#2E7987]/30 p-6 flex flex-col justify-between shadow-xs relative">
              <div className="absolute top-4 right-4">
                <span className="px-2.5 py-1 bg-[#2E7987] text-white text-[9.5px] font-mono uppercase tracking-widest rounded-full">
                  MOST POPULAR
                </span>
              </div>
              <div>
                <div className="h-44 w-full overflow-hidden rounded-xl bg-gray-100 mb-6">
                  <img
                    src={VEHICLE_OPTIONS.find((v) => v.id === 'zenix-v-hybrid')?.image}
                    alt="Toyota Innova Zenix Hybrid - FIRST-LOP Private Tour"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#2E7987] font-semibold">
                  PREMIUM TRAVEL
                </span>
                <h3 className="font-serif text-2xl text-[#123B45] mb-2">
                  Toyota Innova Zenix Hybrid
                </h3>
                <p className="text-xs text-[#0E171A]/75 mb-4 leading-relaxed">
                  The executive benchmark for contemporary island touring. Smooth hybrid drive,
                  generous cabin space, premium reclining seats, and silent highway cruising.
                </p>
              </div>
              <div className="pt-4 border-t border-[#123B45]/10 flex items-center justify-between">
                <span className="text-xs font-mono text-[#123B45]/70">Up to 6 guests</span>
                <span className="text-xs font-mono font-semibold text-[#2E7987]">
                  Executive upgrade
                </span>
              </div>
            </div>

            {/* 3. Toyota Alphard */}
            <div className="bg-white rounded-2xl overflow-hidden border border-[#123B45]/10 p-6 flex flex-col justify-between shadow-xs">
              <div>
                <div className="h-44 w-full overflow-hidden rounded-xl bg-gray-100 mb-6">
                  <img
                    src={VEHICLE_OPTIONS.find((v) => v.id === 'toyota-alphard')?.image}
                    alt="Toyota Alphard Flagship Chauffeur - FIRST-LOP"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#123B45] font-semibold">
                  FLAGSHIP VIP
                </span>
                <h3 className="font-serif text-2xl text-[#123B45] mb-2">Toyota Alphard</h3>
                <p className="text-xs text-[#0E171A]/75 mb-4 leading-relaxed">
                  First-class travel across Lombok. Luxury leather captain chairs, dual sunroofs,
                  ambient lighting, and personalized VIP concierge treatment.
                </p>
              </div>
              <div className="pt-4 border-t border-[#123B45]/10 flex items-center justify-between">
                <span className="text-xs font-mono text-[#123B45]/70">6 Luxury Captain Seats</span>
                <span className="text-xs font-mono font-semibold text-[#123B45]">
                  Signature VIP
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          FREQUENTLY ASKED QUESTIONS (SEO & USER QUERY TARGETING)
      ======================================================== */}
      <section id="faq" className="py-24 sm:py-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[10.5px] uppercase tracking-[0.24em] font-mono text-[#2E7987] font-semibold block mb-3">
            QUESTIONS & ANSWERS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#123B45] font-normal tracking-tight leading-[1.15] mb-4">
            Everything You Need to Know About Lombok Private Tours.
          </h2>
          <p className="text-sm text-[#0E171A]/75 font-normal max-w-xl mx-auto">
            Clear, transparent answers to help you plan your private journey across Lombok and the
            Gili archipelago with confidence.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-[#123B45]/10 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg sm:text-xl text-[#123B45] font-medium leading-snug">
                    {faq.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#123B45]/5 flex items-center justify-center shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 bg-[#123B45]/15' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 text-[#123B45]" />
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0 text-sm text-[#0E171A]/80 font-normal leading-relaxed border-t border-[#123B45]/5 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          FINAL EDITORIAL CTA SECTION
      ======================================================== */}
      <section className="py-24 sm:py-32 bg-[#123B45] text-[#FAF7F0] relative overflow-hidden">
        {/* Subtle decorative background ring */}
        <div className="absolute -right-32 -bottom-32 w-96 h-96 rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute -left-32 -top-32 w-96 h-96 rounded-full border border-white/5 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[10.5px] uppercase tracking-[0.28em] font-mono text-[#48B0C4] font-semibold block mb-4">
            BEGIN YOUR JOURNEY
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FAF7F0] leading-[1.12] mb-6">
            Ready to explore Lombok at your own pace?
          </h2>
          <p className="text-base sm:text-lg text-[#FAF7F0]/80 font-normal max-w-xl mx-auto leading-relaxed mb-10">
            Tell us about your travel dates, preferred destinations, or wish list. Our on-island
            concierge will craft a tailored private itinerary designed just for you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenPlanModal(undefined, 'Lombok Private Tour')}
              className="w-full sm:w-auto px-9 py-4 bg-[#FAF7F0] text-[#123B45] text-xs font-mono uppercase tracking-[0.2em] font-bold rounded-full hover:bg-white transition-all shadow-xl hover:scale-105 flex items-center justify-center gap-2 group"
            >
              <span>Plan Your Private Tour</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-[#FAF7F0] border border-white/20 text-xs font-mono uppercase tracking-[0.2em] rounded-full backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#48B0C4]" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <div className="mt-12 text-xs font-mono text-[#FAF7F0]/60">
            Available 7 days a week · Direct response within 1 hour · No obligation
          </div>
        </div>
      </section>

      {/* ========================================================
          PAGE FOOTER (Editorial FIRST-LOP Style)
      ======================================================== */}
      <footer className="bg-[#0E171A] text-[#FAF7F0] py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Col 1: Brand */}
            <div className="md:col-span-2">
              <button
                onClick={onNavigateHome}
                className="flex items-center gap-3 text-left mb-4 group focus:outline-none"
              >
                <FirstLopLogo className="w-8 h-8 text-[#FAF7F0]" />
                <span className="font-serif tracking-tight text-2xl font-bold text-[#FAF7F0]">
                  FIRST-LOP
                </span>
              </button>
              <p className="text-sm text-[#FAF7F0]/70 max-w-sm font-normal leading-relaxed mb-6">
                Boutique private tour operator and luxury chauffeur service in Lombok, West Nusa
                Tenggara, Indonesia. Handcrafted island journeys, executive vehicles, and local
                concierge care.
              </p>
              <div className="text-xs font-mono text-[#FAF7F0]/60">
                Kuta Lombok · Selong Belanak · Gili Islands · Mount Rinjani
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#FAF7F0]/50 block mb-4 font-semibold">
                PAGES & TOURS
              </span>
              <ul className="space-y-2.5 text-xs font-mono uppercase tracking-wider text-[#FAF7F0]/80">
                <li>
                  <button
                    onClick={onNavigateHome}
                    className="hover:text-[#48B0C4] transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <a href="#curated-private-tours" className="hover:text-[#48B0C4] transition-colors">
                    Lombok Private Tours
                  </a>
                </li>
                <li>
                  <a href="#the-private-difference" className="hover:text-[#48B0C4] transition-colors">
                    The Private Difference
                  </a>
                </li>
                <li>
                  <a href="#tour-inclusions" className="hover:text-[#48B0C4] transition-colors">
                    Tour Inclusions
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-[#48B0C4] transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Contact */}
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#FAF7F0]/50 block mb-4 font-semibold">
                DIRECT CONCIERGE
              </span>
              <ul className="space-y-3 text-xs font-mono text-[#FAF7F0]/80">
                <li>
                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-[#48B0C4] transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#48B0C4]" />
                    <span>+62 812-3456-7890</span>
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#48B0C4]" />
                  <span>Kuta Lombok, NTB, Indonesia</span>
                </li>
                <li className="pt-2">
                  <button
                    onClick={() => onOpenPlanModal(undefined, 'Lombok Private Tour')}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-[11px] uppercase tracking-wider text-[#FAF7F0] transition-colors"
                  >
                    Book Private Tour
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF7F0]/50 font-mono gap-4">
            <div>
              © {new Date().getFullYear()} FIRST-LOP (firstlop.site). All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <button
                onClick={onNavigateHome}
                className="hover:text-[#FAF7F0] transition-colors"
              >
                Return to Homepage
              </button>
              <a href="#curated-private-tours" className="hover:text-[#FAF7F0] transition-colors">
                Back to top ↑
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
