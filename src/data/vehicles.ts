import { VehicleOption } from '../types';

import toyotaAgyaImg from '../assets/images/toyota_agya_rental_1788753077701.jpg';
import daihatsuAylaImg from '../assets/images/daihatsu_ayla_rental_1788753119736.jpg';
import hondaBrioImg from '../assets/images/honda_brio_rental_1788753139984.jpg';
import suzukiXl7Img from '../assets/images/suzuki_xl7_rental_1788753156949.jpg';
import ertigaHybridImg from '../assets/images/ertiga_hybrid_rental_1788753173346.jpg';
import allNewAvanzaImg from '../assets/images/all_new_avanza_rental_1788753188850.jpg';
import allNewXeniaImg from '../assets/images/all_new_xenia_rental_1788753212935.jpg';
import hondaBrvImg from '../assets/images/honda_brv_rental_1788753229882.jpg';
import toyotaRaizeImg from '../assets/images/toyota_raize_rental_1788753246978.jpg';
import xpanderImg from '../assets/images/xpander_rental_1788753263958.jpg';
import innovaRebornImg from '../assets/images/innova_reborn_rental_1788753278997.jpg';
import zenixTypeGImg from '../assets/images/zenix_type_g_rental_1788753295680.jpg';
import zenixVHybridImg from '../assets/images/zenix_v_hybrid_rental_1788753313587.jpg';
import toyotaFortunerImg from '../assets/images/toyota_fortuner_rental_1788753330204.jpg';
import toyotaAlphardImg from '../assets/images/alphard_clean_flagship_1791426729161.jpg';
import lombokCoastalDriveHeroImg from '../assets/images/lombok_scenic_coastal_drive_1788754067003.jpg';

export const YOUR_RIDE_HERO_IMAGE = lombokCoastalDriveHeroImg;

// Complete fleet data including the flagship Toyota Alphard
export const VEHICLE_OPTIONS: VehicleOption[] = [
  // 1. Toyota Agya
  {
    id: 'toyota-agya',
    name: 'Toyota Agya',
    pricePerDay: 40,
    image: toyotaAgyaImg,
    category: 'City & Compact',
    categoryId: 'city-compact',
    seats: 4,
  },
  // 2. Daihatsu Ayla
  {
    id: 'daihatsu-ayla',
    name: 'Daihatsu Ayla',
    pricePerDay: 40,
    image: daihatsuAylaImg,
    category: 'City & Compact',
    categoryId: 'city-compact',
    seats: 4,
  },
  // 3. Honda Brio
  {
    id: 'honda-brio',
    name: 'Honda Brio',
    pricePerDay: 45,
    image: hondaBrioImg,
    category: 'City & Compact',
    categoryId: 'city-compact',
    seats: 4,
  },

  // 4. Suzuki XL7
  {
    id: 'suzuki-xl7',
    name: 'Suzuki XL7',
    pricePerDay: 50,
    image: suzukiXl7Img,
    category: 'Comfort & Family',
    categoryId: 'comfort-family',
    seats: 7,
  },
  // 5. Ertiga Hybrid
  {
    id: 'ertiga-hybrid',
    name: 'Ertiga Hybrid',
    pricePerDay: 50,
    image: ertigaHybridImg,
    category: 'Comfort & Family',
    categoryId: 'comfort-family',
    seats: 7,
  },
  // 6. All New Avanza
  {
    id: 'all-new-avanza',
    name: 'All New Avanza',
    pricePerDay: 50,
    image: allNewAvanzaImg,
    category: 'Comfort & Family',
    categoryId: 'comfort-family',
    seats: 7,
  },
  // 7. All New Xenia
  {
    id: 'all-new-xenia',
    name: 'All New Xenia',
    pricePerDay: 50,
    image: allNewXeniaImg,
    category: 'Comfort & Family',
    categoryId: 'comfort-family',
    seats: 7,
  },

  // 8. Honda BR-V
  {
    id: 'honda-br-v',
    name: 'Honda BR-V',
    pricePerDay: 55,
    image: hondaBrvImg,
    category: 'SUV & Adventure',
    categoryId: 'suv-adventure',
    seats: 7,
  },
  // 9. Toyota Raize
  {
    id: 'toyota-raize',
    name: 'Toyota Raize',
    pricePerDay: 55,
    image: toyotaRaizeImg,
    category: 'SUV & Adventure',
    categoryId: 'suv-adventure',
    seats: 5,
  },
  // 10. Xpander (Best Pick)
  {
    id: 'xpander',
    name: 'Xpander',
    pricePerDay: 60,
    image: xpanderImg,
    category: 'SUV & Adventure',
    categoryId: 'suv-adventure',
    seats: 7,
  },

  // 11. Innova Reborn (Best Pick)
  {
    id: 'innova-reborn',
    name: 'Toyota Innova Reborn',
    pricePerDay: 75,
    image: innovaRebornImg,
    category: 'Premium',
    categoryId: 'premium',
    seats: 7,
  },
  // 12. Zenix Type G
  {
    id: 'zenix-type-g',
    name: 'Zenix Type G',
    pricePerDay: 85,
    image: zenixTypeGImg,
    category: 'Premium',
    categoryId: 'premium',
    seats: 7,
  },
  // 13. Zenix V Hybrid (Best Pick)
  {
    id: 'zenix-v-hybrid',
    name: 'Zenix V Hybrid',
    pricePerDay: 95,
    image: zenixVHybridImg,
    category: 'Premium',
    categoryId: 'premium',
    seats: 7,
  },
  // 14. Toyota Fortuner
  {
    id: 'toyota-fortuner',
    name: 'Toyota Fortuner',
    pricePerDay: 120,
    image: toyotaFortunerImg,
    category: 'Premium',
    categoryId: 'premium',
    seats: 7,
  },

  // 15. Flagship: Toyota Alphard (THE FIRST-LOP SIGNATURE)
  {
    id: 'toyota-alphard',
    name: 'Toyota Alphard',
    pricePerDay: 200,
    image: toyotaAlphardImg,
    category: 'Signature Concierge',
    categoryId: 'signature',
    seats: 6,
    isFlagship: true,
    serviceHighlights: [
      'Private chauffeur',
      'Premium cabin',
      'Fuel included',
    ],
    termsNote:
      'Up to 12 hours/day. An additional hours are excluded.',
  },
];

// The 3 Best Picks shown by default (Xpander, Toyota Innova Reborn, Zenix V Hybrid)
export const BEST_PICK_IDS = ['xpander', 'innova-reborn', 'zenix-v-hybrid'];

export const BEST_PICKS: VehicleOption[] = BEST_PICK_IDS.map(
  (id) => VEHICLE_OPTIONS.find((v) => v.id === id)!
);

// Flagship Signature Vehicle
export const SIGNATURE_ALPHARD: VehicleOption = VEHICLE_OPTIONS.find(
  (v) => v.id === 'toyota-alphard'
)!;

// The remaining 11 standard vehicles organized subtly into 4 categories (without duplicating Best Picks or Alphard)
export interface SubCategory {
  id: string;
  name: string;
  vehicleIds: string[];
}

export const REMAINING_CATEGORIES: SubCategory[] = [
  {
    id: 'city-compact',
    name: 'CITY & COMPACT',
    vehicleIds: ['toyota-agya', 'daihatsu-ayla', 'honda-brio'],
  },
  {
    id: 'comfort-family',
    name: 'COMFORT & FAMILY',
    vehicleIds: ['suzuki-xl7', 'ertiga-hybrid', 'all-new-avanza', 'all-new-xenia'],
  },
  {
    id: 'suv-adventure',
    name: 'SUV & ADVENTURE',
    vehicleIds: ['honda-br-v', 'toyota-raize'],
  },
  {
    id: 'premium',
    name: 'PREMIUM',
    vehicleIds: ['zenix-type-g', 'toyota-fortuner'],
  },
];
