import { Destination, Experience, TravelPackage, GalleryItem, Testimonial } from '../types';
import mandalikaCircuitImage from '../assets/images/mandalika_circuit_aerial_1788474583616.jpg';
import tanjungAanBeachImage from '../assets/images/tanjung_aan_beach_1788474598205.jpg';
import rinjaniAdventureImage from '../assets/images/rinjani_adventure_cover_1788476233808.jpg';
import sasakTraditionalFeastImage from '../assets/images/sasak_traditional_feast_1788476667136.jpg';
import giliUnderwaterStatuesImage from '../assets/images/gili_underwater_statues_1788529424643.jpg';

export const BRAND = {
  name: 'FIRST-LOP',
  tagline: 'Lombok, experienced differently.',
  subtitle: 'Take the long way to the beach. Stay for one more sunset. Let Lombok set the pace.',
  region: 'Lombok, West Nusa Tenggara',
  country: 'Indonesia',
  contact: {
    whatsappNumber: '+6281234567890',
    displayPhone: '+62 812-3456-7890',
    email: 'concierge@firstlop.com',
    location: 'Kuta Lombok & Gili Islands, West Nusa Tenggara, Indonesia',
  }
};

export const DESTINATIONS: Destination[] = [
  {
    id: 'selong-belanak',
    name: 'SELONG BELANAK',
    title: 'Slow days by the sea.',
    tagline: 'Slow days by the sea.',
    description: 'A beautiful crescent of sand, gentle waves and golden afternoons. The kind of place where there is nowhere else you need to be.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=80',
    vibe: 'Tranquil & Sun-Drenched',
    bestFor: ['First-time Surfers', 'Sunbathers', 'Slow Living', 'Sunset Walks'],
    highlights: [
      'Gentle rolling whitewash waves ideal for easy longboarding',
      'Wide sandy crescent bay lined with quiet local warungs and fresh young coconuts',
      'Evening spectacle of grazing water buffalo crossing the beach at dusk',
      'Warm shallow waters safe for long, effortless swims all day'
    ],
    travelTime: '30 mins from Lombok International Airport',
  },
  {
    id: 'gili-trawangan',
    name: 'GILI TRAWANGAN',
    title: 'Where the island comes alive.',
    tagline: 'Where the island comes alive.',
    description: 'Crystal-clear water, sunset rides and evenings that stretch a little longer.',
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=1800&q=85',
    secondaryImage: giliUnderwaterStatuesImage,
    vibe: 'Effortless & Vibrant',
    bestFor: ['Sunset Bike Rides', 'Reef Snorkeling', 'Acoustic Dinners', 'Ocean Swings'],
    highlights: [
      'Car-free island paths traversed entirely by cruiser bicycles and horse-drawn cidomo',
      'World-renowned snorkeling with wild green sea turtles right off the eastern beach',
      'West-facing golden-hour viewpoints overlooking Mount Agung in the horizon',
      'Laidback beachside seafood grills and open-air beachfront acoustic music'
    ],
    travelTime: '25 min scenic boat transfer from Teluk Nare Harbor',
  },
  {
    id: 'gili-meno',
    name: 'GILI MENO',
    title: 'A quieter kind of paradise.',
    tagline: 'A quieter kind of paradise.',
    description: 'Slow mornings, turquoise water and peaceful island days.',
    image: 'https://images.unsplash.com/photo-1516815231560-8f41ec531527?auto=format&fit=crop&w=1800&q=85',
    secondaryImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    vibe: 'Intimate & Meditative',
    bestFor: ['Couples & Solitude', 'Reef Diving', 'Quiet Escapes', 'Reading by the Sea'],
    highlights: [
      'The quietest of the three Gili islands with near-silent white sandy perimeters',
      'Famous underwater stone human sculptures by artist Jason deCaires Taylor',
      'Saltwater inland lagoon sanctuary inhabited by coastal tropical birds',
      'Unbroken views of Mount Rinjani rising across the blue Lombok strait'
    ],
    travelTime: '15 min private outrigger hop from Gili Trawangan or mainland',
  },
  {
    id: 'kuta-lombok',
    name: 'KUTA LOMBOK',
    title: 'Wild beaches. Open roads.',
    tagline: 'Wild beaches. Open roads.',
    description: 'Surf, dramatic coastlines, hidden beaches and roads made for getting a little lost.',
    image: mandalikaCircuitImage,
    secondaryImage: tanjungAanBeachImage,
    vibe: 'Adventurous & Coastal',
    bestFor: ['Surf Culture', 'Scenic Scooter Rides', 'Hidden Coves', 'Panoramic Viewpoints'],
    highlights: [
      'Sunset hikes up the rolling grassy peaks of Bukit Merese overlooking twin bays',
      'Coastal surf meccas from Tanjung Aan to Gerupuk and desert point breaks',
      'Thriving contemporary cafe culture, artisanal bakeries, and yoga shalas',
      'Paved coastal roads weaving through dramatic limestone cliffs and wild coconut groves'
    ],
    travelTime: '20 mins south of Lombok International Airport (LOP)',
  },
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'island-escapes',
    category: 'ISLAND ESCAPES',
    title: 'Island Escapes',
    tagline: 'Island hopping, snorkeling and open-water adventures.',
    description: 'Charter a handcrafted teak outrigger across the turquoise channel to secluded sandbars, drifting over pristine coral gardens where only sea turtles swim.',
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=1600&q=85',
    location: 'North Lombok & Gili Archipelago',
    duration: 'Full Day / Half Day',
    highlights: ['Private local captain & marine guide', 'Snorkel gear & underwater photography', 'Fresh tropical fruit feast on deck'],
  },
  {
    id: 'surf-beach',
    category: 'SURF & BEACH',
    title: 'Surf & Beach',
    tagline: 'Find your wave, your beach, or simply your place in the sun.',
    description: 'Whether paddling into your first gentle green wave at Selong Belanak or navigating the outer reefs of Gerupuk with a seasoned local coach, experience Lombok surf at its purest.',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1600&q=85',
    location: 'South Coast & Secret Coves',
    duration: 'Morning / Late Afternoon',
    highlights: ['Private coach & customized board selection', 'Tide & wind matched daily sessions', 'High-definition surf photography included'],
  },
  {
    id: 'sunset-moments',
    category: 'SUNSET MOMENTS',
    title: 'Sunset Moments',
    tagline: 'Golden hours, quiet shores and evenings worth staying out for.',
    description: 'Climb the breeze-kissed headlands of Bukit Merese or settle into comfortable linen cushions on the west beach of Gili Trawangan for Lombok’s legendary fiery skies.',
    image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1600&q=85',
    location: 'Bukit Merese & Gili West Coast',
    duration: 'Twilight (4:30 PM – 7:00 PM)',
    highlights: ['Chilled fresh young coconuts & artisanal snacks', 'Private scenic seating & panoramic vantage', 'Spectacular Mount Agung silhouettes'],
  },
  {
    id: 'island-adventures',
    category: 'ISLAND ADVENTURES',
    title: 'Island Adventures',
    tagline: 'Go beyond the obvious and explore more of Lombok.',
    description: 'Cruise down smooth coastal ribbons flanked by coconut palm canopies, venture north toward cascading Sendang Gile waterfalls, and discover lookouts unseen by tourist buses.',
    image: rinjaniAdventureImage,
    location: 'Rinjani Foothills & Coastline',
    duration: 'Full Day Expedition',
    highlights: ['Private air-conditioned defender or vintage scooter convoy', 'Lush rainforest trails & refreshing canyon pools', 'Local insider route maps'],
  },
  {
    id: 'local-life',
    category: 'LOCAL LIFE',
    title: 'Local Life',
    tagline: 'Taste, meet and experience the island beyond the itinerary.',
    description: 'Immerse in the timeless rhythms of Sasak villages: hand-thrown pottery in Banyumulek, intricate songket weaving in Sukarara, and home-cooked heirloom sambal in village courtyards.',
    image: sasakTraditionalFeastImage,
    location: 'Central Lombok Villages',
    duration: 'Half Day Immersion',
    highlights: ['Warm village host introductions', 'Hands-on heritage weaving & clay craft', 'Traditional Sasak family lunch'],
  },
];

export const PACKAGES: TravelPackage[] = [
  {
    id: 'lombok-essential',
    name: 'THE LOMBOK ESSENTIAL',
    duration: '3 DAYS · 2 NIGHTS',
    subtitle: 'For first-time visitors who want a little bit of everything.',
    tags: ['Beaches', 'Kuta', 'Selong Belanak', 'Island Life'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
    priceEstimate: 'From $420 / guest',
    description: 'A curated introductory escape tailored for those wanting to soak in Lombok\'s most iconic white sand beaches, stunning headlands, and warm island hospitality without feeling rushed.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in South Lombok & Kuta Vibe',
        description: 'Private airport greeting, check-in to boutique villa. Afternoon orientation around Kuta village and a sunset welcome toast atop Bukit Merese.',
        highlights: ['Private VIP airport transfer', 'Boutique eco-resort check-in', 'Sunset at Bukit Merese']
      },
      {
        day: 2,
        title: 'Selong Belanak & Beachfront Living',
        description: 'Morning drive to the serene crescent bay of Selong Belanak. Gentle surf lesson or beach day under sun umbrellas, followed by fresh coconut seafood lunch.',
        highlights: ['Private coach surf session or sun lounger setup', 'Beachfront lunch at local warung', 'Afternoon visit to Tanjung Aan']
      },
      {
        day: 3,
        title: 'Slow Morning & Departure',
        description: 'Leisurely artisanal breakfast, souvenir stop for handmade Lombok pottery, and private transfer back to the airport.',
        highlights: ['Relaxed check-out', 'Artisanal craft stops', 'Airport transfer']
      }
    ],
    included: [
      '2 nights boutique villa accommodation',
      'Private air-conditioned island vehicle & personal host',
      'All airport and destination transfers',
      'Daily curated breakfasts & 1 sunset picnic',
      'Surf coaching or beach lounger pass in Selong Belanak'
    ]
  },
  {
    id: 'island-escape',
    name: 'THE ISLAND ESCAPE',
    duration: '4 DAYS · 3 NIGHTS',
    subtitle: 'Slow down, get on the water and discover the Gili Islands.',
    tags: ['Gili Trawangan', 'Gili Meno', 'Snorkeling', 'Sunset'],
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=1200&q=85',
    priceEstimate: 'From $580 / guest',
    description: 'Designed for ocean lovers and seekers of slow island time. Glide through turquoise waters, snorkel alongside wild sea turtles, and watch the sun sink into the sea from bicycle saddles.',
    itinerary: [
      {
        day: 1,
        title: 'Mainland to the Gili Archipelago',
        description: 'Scenic coastal drive to Teluk Nare followed by a private speedboat crossing to Gili Trawangan. Island cruiser bicycles provided upon villa check-in.',
        highlights: ['Private harbor speedboat crossing', 'Boutique beachfront lodge', 'Bicycle island sunset loop']
      },
      {
        day: 2,
        title: 'Private Outrigger Turtle Safari',
        description: 'Morning private wooden boat charter to the quiet coral reefs of Gili Meno and Gili Air. Snorkel among the famous underwater sculptures and giant sea turtles.',
        highlights: ['Private boat & local marine guide', 'Jason deCaires underwater statues', 'Secluded island beach lunch']
      },
      {
        day: 3,
        title: 'Gili Meno Day of Quiet Sanctuary',
        description: 'Hop across to peaceful Gili Meno for a morning walk along pristine, empty shores, lagoon bird watching, and an intimate candlelit beachfront dinner.',
        highlights: ['Tranquil Meno excursion', 'Private sunset dinner setup', 'Stargazing by the ocean']
      },
      {
        day: 4,
        title: 'Slow Breakfast & Mainland Return',
        description: 'Last swim in the crystal-clear morning tide, followed by private boat return to Lombok and transfer to airport or onward journey.',
        highlights: ['Morning ocean dip', 'Private boat return', 'Transfer to airport or Kuta']
      }
    ],
    included: [
      '3 nights luxury boutique island stay',
      'Private speedboats & harbor transfers',
      'Dedicated private wooden boat snorkeling safari',
      'Island cruiser bicycles for your entire stay',
      'Curated beachfront candlelit dining experience'
    ]
  },
  {
    id: 'lombok-adventure',
    name: 'THE LOMBOK ADVENTURE',
    duration: '5 DAYS · 4 NIGHTS',
    subtitle: 'For travelers who want to go further and experience Lombok beyond the postcard.',
    tags: ['Beaches', 'Surf', 'Island Hopping', 'Local Experiences'],
    image: rinjaniAdventureImage,
    priceEstimate: 'From $790 / guest',
    description: 'The ultimate contemporary Lombok voyage. Spans wild south coast cliffs, exhilarating boat excursions, cultural Sasak immersion, and secret hidden waterfalls under the shadow of Mount Rinjani.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Wild South Coast Sunset',
        description: 'Welcome to Kuta Lombok. Settle in, grab afternoon iced coffee at a local roastery, and take in the panoramic sunset over Seger Beach headlands.',
        highlights: ['VIP airport arrival', 'Boutique stay check-in', 'Seger Beach coastal walk']
      },
      {
        day: 2,
        title: 'Surf, Secret Coves & Tanjung Aan',
        description: 'Morning surf session or paddleboarding in Gerupuk bay, afternoon exploring the powdery white sands of Tanjung Aan and cliff viewpoints.',
        highlights: ['Boat trip to outer reef wave or bay', 'Tanjung Aan sunset climb', 'Fresh grilled seafood dinner']
      },
      {
        day: 3,
        title: 'Rinjani Foothills & Sendang Gile Falls',
        description: 'Head north through the lush heart of Lombok. Walk the shaded jungle path to towering Sendang Gile and Tiu Kelep waterfalls with a local highland guide.',
        highlights: ['Scenic drive through tropical valleys', 'Refreshing natural pool swims', 'Traditional Sasak highland coffee']
      },
      {
        day: 4,
        title: 'Living Heritage & Traditional Craft',
        description: 'Visit Sasak artisan villages of Sukarara and Banyumulek to witness master weaving and terracotta crafts, concluding with a home-style Sasak feast.',
        highlights: ['Authentic community connections', 'Traditional songket weaving workshop', 'Family courtyard lunch']
      },
      {
        day: 5,
        title: 'Farewell Lombok',
        description: 'Sunrise beach walk along Selong Belanak, leisurely brunch, and private departure transfer with memories that linger.',
        highlights: ['Sunrise ocean stroll', 'Slow brunch', 'Airport farewell']
      }
    ],
    included: [
      '4 nights handpicked design villa accommodation',
      'Dedicated private driver & local experiential guide throughout',
      'Highland waterfall excursion with local forest ranger',
      'Private surf excursion & all gear',
      'All entry permits, village contributions & authentic meals'
    ]
  }
];

export const WHY_US_FEATURES = [
  {
    id: 'local-knowledge',
    title: 'LOCAL KNOWLEDGE',
    tagline: 'We know the island beyond the itinerary.',
    description: 'Our hosts and planners were raised on these coastlines. We know the secluded bays when the tide is high, the quietest hours for the turtle reefs, and the local warungs that make the island truly special.',
    metric: '100% On-Island Team',
  },
  {
    id: 'personalized-journeys',
    title: 'PERSONALIZED JOURNEYS',
    tagline: 'Your trip should fit you — not the other way around.',
    description: 'No rigid tourist buses, no mandatory stops. We tailor daily rhythms to your preferred pace—whether you wake before dawn to catch waves or prefer late mornings with sea breezes and books.',
    metric: 'Bespoke Itineraries',
  },
  {
    id: 'seamless-experience',
    title: 'SEAMLESS EXPERIENCE',
    tagline: "From airport pickup to island transfers, we've got the details covered.",
    description: 'Island logistics can be complicated—boats, tides, rural drivers. We handle every transfer, luggage haul, boat captain, and reservation smoothly so your mind remains completely at rest.',
    metric: 'Zero-Stress Logistics',
  },
  {
    id: 'real-lombok',
    title: 'REAL LOMBOK',
    tagline: 'Go beyond the obvious and experience the island from a local perspective.',
    description: 'Experience the authentic pulse of West Nusa Tenggara: community-rooted tourism that supports Sasak artisans, respects delicate reef ecosystems, and shares real island life with warmth.',
    metric: 'Direct Local Impact',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    quote: 'The rhythm of the south coast stayed with us long after we left. No rush, no crowded buses—just open coastal roads, quiet bays, and sunsets that made us pause.',
    traveler: 'Traveler Reflection · Early 2026',
    note: 'South Coast & Selong Belanak',
    tag: 'Verified Journey',
  },
  {
    id: 'test-2',
    quote: 'Waking up on Gili Meno and swimming out over quiet coral reefs before the island stirred was exactly the kind of calm we were looking for.',
    traveler: 'Traveler Reflection · Archipelago Escape',
    note: 'Gili Islands & Turtle Reef',
    tag: 'Verified Journey',
  },
  {
    id: 'test-3',
    quote: 'Everything felt effortless. Having someone on the ground manage the boat timings, tides, and transfers allowed us to simply experience the island without thinking about logistics.',
    traveler: 'Traveler Reflection · Coastal Route',
    note: 'Kuta & Rinjani Foothills',
    tag: 'Verified Journey',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gallery-selong-belanak',
    title: 'Selong Belanak Bay',
    location: 'South Lombok',
    category: 'Coastal Horizon',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
    span: 'col-span-12 md:col-span-8 row-span-2',
  },
  {
    id: 'gallery-underwater-meno',
    title: 'Underwater Sanctuary',
    location: 'Gili Meno Reef',
    category: 'Marine Life',
    image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1000&q=85',
    span: 'col-span-12 md:col-span-4 row-span-1',
  },
  {
    id: 'gallery-gili-t',
    title: 'Sunset Coastline',
    location: 'Gili Trawangan',
    category: 'Golden Hour',
    image: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=1000&q=85',
    span: 'col-span-12 md:col-span-4 row-span-1',
  },
  {
    id: 'gallery-kuta-coast',
    title: 'Clifftop Overlook',
    location: 'Kuta Lombok Coastline',
    category: 'Landscapes',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=85',
    span: 'col-span-12 md:col-span-4 row-span-2',
  },
  {
    id: 'gallery-local-food',
    title: 'Fresh Island Table',
    location: 'Local Sasak Kitchen',
    category: 'Culinary',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=85',
    span: 'col-span-12 md:col-span-4 row-span-1',
  },
  {
    id: 'gallery-sunset',
    title: 'Fiery Pacific Horizon',
    location: 'Bukit Merese',
    category: 'Sunset',
    image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1000&q=85',
    span: 'col-span-12 md:col-span-4 row-span-1',
  },
  {
    id: 'gallery-island-hopping',
    title: 'Wooden Outrigger Journey',
    location: 'Lombok Strait',
    category: 'Island Hopping',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1000&q=85',
    span: 'col-span-12 md:col-span-6 row-span-1',
  },
  {
    id: 'gallery-travelers',
    title: 'Open Road Freedom',
    location: 'South Coast Roads',
    category: 'Travelers',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=85',
    span: 'col-span-12 md:col-span-6 row-span-1',
  },
];
