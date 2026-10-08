export interface Destination {
  id: string;
  name: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  secondaryImage?: string;
  vibe: string;
  bestFor: string[];
  highlights: string[];
  travelTime: string;
  coordinates?: string;
}

export interface Experience {
  id: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  location: string;
  duration: string;
  highlights: string[];
}

export interface TravelPackage {
  id: string;
  name: string;
  duration: string;
  subtitle: string;
  tags: string[];
  image: string;
  priceEstimate: string;
  description: string;
  itinerary: {
    day: number;
    title: string;
    description: string;
    highlights: string[];
  }[];
  included: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  location: string;
  image: string;
  category: string;
  span?: string; // For asymmetric grid sizing
}

export interface VehicleOption {
  id: string;
  name: string;
  pricePerDay: number;
  image: string;
  category?: string;
  categoryId?: string;
  seats?: number;
  isFlagship?: boolean;
  serviceHighlights?: string[];
  termsNote?: string;
}

export interface VehicleCategory {
  id: string;
  number: string;
  name: string;
  description: string;
  vehicleIds: string[];
}

export interface TripInquiryPayload {
  name: string;
  email: string;
  whatsapp: string;
  travelDate: string;
  travelers: string;
  interests: string;
  message: string;
}

export interface TripInquiryData {
  inquiryId?: string;
  timestamp?: string;
  name: string;
  email?: string;
  whatsapp: string;
  travelDate: string;
  travelers?: string;
  interests?: string;
  message?: string;
  destinations?: string[];
  numberOfTravelers?: number;
  selectedCar?: string;
  carDailyRate?: number;
  additionalNotes?: string;
  source?: string;
  // Optional secondary fields for backward compatibility
  travelParty?: string;
  experiences?: string[];
  duration?: string;
  status?: string;
}

export interface TripPlanState {
  destinations: string[];
  travelStyle: string;
  durationDays: number | string;
  guests: string;
  travelMonth: string;
  name: string;
  email: string;
  whatsapp: string;
  specialRequests: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  traveler: string;
  note: string;
  tag: string;
}
