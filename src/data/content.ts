import { Destination, Experience, TravelPackage, GalleryItem, Testimonial } from '../types';
import mandalikaCircuitImage from '../assets/images/mandalika_circuit_aerial_1788474583616.jpg';
import tanjungAanBeachImage from '../assets/images/tanjung_aan_beach_1788474598205.jpg';
import rinjaniAdventureImage from '../assets/images/rinjani_adventure_cover_1788476233808.jpg';
import sasakTraditionalFeastImage from '../assets/images/sasak_traditional_feast_1788476667136.jpg';
import giliUnderwaterStatuesImage from '../assets/images/gili_underwater_statues_1788529424643.jpg';
import pkgEssentialImage from '../assets/images/pkg_lombok_essential.jpg';
import pkgIslandImage from '../assets/images/pkg_island_escape.jpg';
import pkgAdventureImage from '../assets/images/pkg_lombok_adventure.jpg';
import pkgRomanceImage from '../assets/images/pkg_lombok_romance.jpg';
import pkgRinjaniImage from '../assets/images/pkg_rinjani_summit.jpg';
import pkgSouthDayImage from '../assets/images/pkg_south_lombok_day.jpg';

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
    subtitle: 'For first-timers who want Lombok\'s best beaches without the rush.',
    tags: ['Kuta', 'Selong Belanak', 'Bukit Merese', '5-Star Stay'],
    image: pkgEssentialImage,
    priceEstimate: 'From $460 / guest',
    description: 'Two nights at a five-star beachfront resort in Mandalika, the south coast\'s most famous sunset hill and the long white bay of Selong Belanak, with a private driver the whole way.',
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Merese Sunset',
        description: 'Private pickup at Lombok International Airport and check-in at Pullman Lombok Mandalika (or similar). In the late afternoon we drive up Bukit Merese for sunset drinks over Tanjung Aan.',
        highlights: ['Private airport pickup', '5-star beachfront resort', 'Sunset drinks on Bukit Merese']
      },
      {
        day: 2,
        title: 'Selong Belanak & Tanjung Aan',
        description: 'Morning at Selong Belanak with a gentle surf lesson or a lounger on the sand, seafood lunch at a beach warung, then a slow afternoon swim at Tanjung Aan.',
        highlights: ['Beginner surf lesson or beach lounger', 'Seafood lunch by the bay', 'Afternoon at Tanjung Aan']
      },
      {
        day: 3,
        title: 'Slow Morning & Departure',
        description: 'Late breakfast at the resort, a stop at Banyumulek pottery village on the way, and a private transfer to the airport.',
        highlights: ['Banyumulek pottery village', 'Private airport transfer']
      }
    ],
    included: [
      '2 nights 5-star beachfront resort (Pullman Lombok Mandalika or similar)',
      'Private car & English-speaking driver',
      'Airport transfers & daily breakfast',
      'Surf lesson or beach lounger, sunset drinks',
      'Toyota Alphard upgrade available'
    ]
  },
  {
    id: 'island-escape',
    name: 'THE ISLAND ESCAPE',
    duration: '4 DAYS · 3 NIGHTS',
    subtitle: 'Turtles, clear water and slow island days on the Gilis.',
    tags: ['Gili Trawangan', 'Gili Meno', 'Snorkeling', 'Beachfront'],
    image: pkgIslandImage,
    priceEstimate: 'From $700 / guest',
    description: 'Three nights at a four-star beachfront resort on Gili Trawangan, a private snorkel boat to the turtle reefs of Gili Meno and Gili Air, and a free day to do nothing at all.',
    itinerary: [
      {
        day: 1,
        title: 'Crossing to Gili Trawangan',
        description: 'Coastal drive to Teluk Nare and a private speedboat across. Beachfront check-in, then bikes along the island loop to the west-coast sunset.',
        highlights: ['Private speedboat crossing', '4-star beachfront resort', 'West-coast sunset by bike']
      },
      {
        day: 2,
        title: 'Private Snorkel Safari',
        description: 'A wooden boat with your own guide to the reefs of Gili Meno and Gili Air: sea turtles, coral gardens and Jason deCaires Taylor\'s Nest statues. Lunch on a quiet beach.',
        highlights: ['Swim with green sea turtles', 'The Nest underwater statues', 'Beach lunch on Gili Air']
      },
      {
        day: 3,
        title: 'Free Day on Gili Trawangan',
        description: 'Spa, bikes or a long swim, at your own pace. In the evening, a candlelit dinner set up on the sand.',
        highlights: ['Free day at your pace', 'Candlelit beach dinner']
      },
      {
        day: 4,
        title: 'Return to Lombok',
        description: 'Morning swim, private boat back to Lombok and a transfer to the airport or onward to Kuta.',
        highlights: ['Private boat return', 'Airport or Kuta transfer']
      }
    ],
    included: [
      '3 nights 4-star beachfront resort on Gili Trawangan',
      'Private speedboat both ways',
      'Private snorkel boat, guide & gear',
      'Bikes, candlelit beach dinner',
      'All land transfers & daily breakfast'
    ]
  },
  {
    id: 'lombok-adventure',
    name: 'THE LOMBOK ADVENTURE',
    duration: '5 DAYS · 4 NIGHTS',
    subtitle: 'Surf, waterfalls and Sasak culture: the Lombok beyond the postcard.',
    tags: ['Surf', 'Waterfalls', 'Sasak Culture', 'Rinjani Foothills'],
    image: pkgAdventureImage,
    priceEstimate: 'From $840 / guest',
    description: 'Four nights on the south coast with a boat out to Gerupuk\'s waves, the twin waterfalls under Mount Rinjani, songket weaving in Sukarara and lunch in a bamboo grove at Bonjeruk.',
    itinerary: [
      {
        day: 1,
        title: 'Kuta Arrival',
        description: 'Airport pickup and check-in at Novotel Lombok or Pullman Mandalika (or similar). Sunset walk on the Seger headland.',
        highlights: ['Private airport pickup', '4–5 star resort in Mandalika', 'Seger headland sunset']
      },
      {
        day: 2,
        title: 'Gerupuk & Tanjung Aan',
        description: 'Boat out to a Gerupuk wave with a surf coach, or paddleboard the calm bay. Tanjung Aan in the afternoon and grilled seafood for dinner.',
        highlights: ['Surf boat & coach at Gerupuk', 'Tanjung Aan beach', 'Grilled seafood dinner']
      },
      {
        day: 3,
        title: 'Rinjani Foothills',
        description: 'Drive north to Senaru and walk to Sendang Gile and Tiu Kelep waterfalls with a licensed local guide, then highland Sasak coffee.',
        highlights: ['Sendang Gile & Tiu Kelep', 'Licensed local guide', 'Highland coffee stop']
      },
      {
        day: 4,
        title: 'Sasak Heritage',
        description: 'Songket weaving with Sasak women in Desa Sukarara, terracotta in Banyumulek, and a lunch of nasi ayam merangkat at Pasar Bambu Bonjeruk.',
        highlights: ['Desa Sukarara weaving', 'Banyumulek pottery', 'Lunch at Pasar Bambu Bonjeruk']
      },
      {
        day: 5,
        title: 'Farewell Swim',
        description: 'Morning swim at Selong Belanak, a slow brunch and a private airport transfer.',
        highlights: ['Selong Belanak morning swim', 'Private airport transfer']
      }
    ],
    included: [
      '4 nights 4–5 star resort in Mandalika',
      'Private driver & licensed local guide',
      'Surf boat & coach, waterfall guide',
      'Entry fees & village contributions',
      'Daily breakfast & lunches'
    ]
  },
  {
    id: 'lombok-romance',
    name: 'THE LOMBOK ROMANCE',
    duration: '4 DAYS · 3 NIGHTS',
    subtitle: 'For honeymooners and couples who want privacy, views and long sunsets.',
    tags: ['Honeymoon', 'Tampah Hills', 'Royal Avila', 'Private Villa'],
    image: pkgRomanceImage,
    priceEstimate: 'From $1,550 / guest',
    description: 'One night on the cliffs of Malimbu at Royal Avila Boutique Resort, a private boat day to Gili Meno, then two nights in a private-pool villa at Tampah Hills with butler service and the south coast below you.',
    itinerary: [
      {
        day: 1,
        title: 'Malimbu Cliffs',
        description: 'Private pickup and check-in to an ocean suite at Royal Avila Boutique Resort, perched above Malimbu bay. Sunset with the Gili islands on the horizon.',
        highlights: ['Ocean suite at Royal Avila', 'Malimbu sunset', 'Private airport pickup']
      },
      {
        day: 2,
        title: 'Private Gili Meno Day',
        description: 'A short drive to the harbour and a private boat to Gili Meno: snorkel with turtles and lunch on an empty stretch of beach. In the afternoon we drive south to Tampah Hills.',
        highlights: ['Private boat to Gili Meno', 'Snorkel with sea turtles', 'Check-in at Tampah Hills']
      },
      {
        day: 3,
        title: 'Spa & Private Dinner',
        description: 'A slow morning at your villa\'s infinity pool, a couples\' spa treatment, and a private dinner set up for two on Bukit Merese at sunset.',
        highlights: ['Couples\' spa treatment', 'Private sunset dinner on Bukit Merese']
      },
      {
        day: 4,
        title: 'Floating Breakfast & Departure',
        description: 'Floating breakfast in your pool, then a private transfer to the airport, about 40 minutes away.',
        highlights: ['Floating breakfast', 'Private airport transfer']
      }
    ],
    included: [
      '1 night ocean suite at Royal Avila Boutique Resort (5-star)',
      '2 nights private-pool villa at Tampah Hills with butler service',
      'Private boat day to Gili Meno',
      'Couples\' spa & private sunset dinner',
      'Private car & driver, daily breakfast'
    ]
  },
  {
    id: 'rinjani-summit',
    name: 'THE RINJANI SUMMIT',
    duration: '3 DAYS · 2 NIGHTS',
    subtitle: 'Sunrise over Segara Anak from the rim of Indonesia\'s second-highest volcano.',
    tags: ['Trekking', 'Mount Rinjani', 'Crater Rim', 'April–December'],
    image: pkgRinjaniImage,
    priceEstimate: 'From $560 / guest',
    description: 'The Senaru crater-rim trek with a licensed guide and porters who carry the camp, cook and have the tent ready before you arrive. Runs April to December, when the national park is open.',
    itinerary: [
      {
        day: 1,
        title: 'Senaru',
        description: 'Private transfer to Senaru, a gear check with your licensed guide and a night at a mountain lodge.',
        highlights: ['Private transfer', 'Gear briefing', 'Mountain lodge night']
      },
      {
        day: 2,
        title: 'To the Crater Rim',
        description: 'Trek through rainforest up to the Senaru crater rim at 2,641 m. Camp is set when you arrive, and the sun goes down over the crater lake.',
        highlights: ['Rainforest trek', 'Senaru crater rim, 2,641 m', 'Sunset over Segara Anak']
      },
      {
        day: 3,
        title: 'Sunrise & Descent',
        description: 'Sunrise over Segara Anak and the Barujari cone, then the descent to Senaru and a transfer back to your hotel.',
        highlights: ['Crater-rim sunrise', 'Descent to Senaru', 'Hotel transfer']
      }
    ],
    included: [
      'Licensed trekking guide & porters',
      'Tents, sleeping bags & all meals on the mountain',
      'Rinjani National Park permits',
      '1 night mountain lodge in Senaru',
      'Private transfers'
    ]
  },
  {
    id: 'south-lombok-day',
    name: 'SOUTH LOMBOK PRIVATE DAY',
    duration: 'FULL DAY',
    subtitle: 'One perfect day for short stays: craft, food, beaches and sunset.',
    tags: ['Day Trip', 'Sukarara', 'Bonjeruk', 'Tanjung Aan'],
    image: pkgSouthDayImage,
    priceEstimate: 'From $75 / guest',
    description: 'A private car and driver for the day: songket weaving in Sukarara, lunch in the bamboo grove at Bonjeruk, a swim at Tanjung Aan and sunset on Bukit Merese.',
    itinerary: [
      {
        day: 1,
        title: 'Craft, Lunch, Beach & Sunset',
        description: 'Morning songket weaving with Sasak women in Desa Sukarara, nasi ayam merangkat at Pasar Bambu Bonjeruk, an afternoon swim at Tanjung Aan, then sunset on Bukit Merese before drop-off at your hotel.',
        highlights: ['Desa Sukarara weaving', 'Lunch at Pasar Bambu Bonjeruk', 'Swim at Tanjung Aan', 'Sunset on Bukit Merese']
      }
    ],
    included: [
      'Private car & driver (up to 10 hours)',
      'Lunch at Pasar Bambu Bonjeruk',
      'Village contribution',
      'Fresh coconut at sunset'
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
