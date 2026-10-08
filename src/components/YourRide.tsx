import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Check,
  ArrowRight,
  ArrowUp,
  Users,
  UserCheck,
  Fuel,
  Cookie,
  Clock,
} from 'lucide-react';
import { VehicleOption } from '../types';
import {
  VEHICLE_OPTIONS,
  BEST_PICKS,
  REMAINING_CATEGORIES,
  SIGNATURE_ALPHARD,
} from '../data/vehicles';

interface YourRideProps {
  selectedVehicle: VehicleOption | null;
  onSelectVehicle: (vehicle: VehicleOption | null) => void;
  onContinueToPlan: (vehicle?: VehicleOption) => void;
}

export default function YourRide({
  selectedVehicle,
  onSelectVehicle,
  onContinueToPlan,
}: YourRideProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  // Track active slide on mobile carousel scroll
  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, offsetWidth } = carouselRef.current;
      const index = Math.round(scrollLeft / (offsetWidth * 0.8));
      setActiveSlide(Math.min(Math.max(index, 0), BEST_PICKS.length - 1));
    }
  };

  const handleChoose = (car: VehicleOption) => {
    if (selectedVehicle?.id === car.id) {
      // Toggle off if already selected
      onSelectVehicle(null);
    } else {
      onSelectVehicle(car);
    }
  };

  const handleSelectAlphardAndPlan = () => {
    onSelectVehicle(SIGNATURE_ALPHARD);
    onContinueToPlan(SIGNATURE_ALPHARD);
  };

  const handleToggleExpand = () => {
    setIsExpanded((prev) => {
      const nextState = !prev;
      if (!nextState && sectionRef.current) {
        // Smoothly scroll back to the section top on collapse
        sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return nextState;
    });
  };

  const isAlphardSelected = selectedVehicle?.id === SIGNATURE_ALPHARD.id;

  return (
    <section
      id="your-ride"
      ref={sectionRef}
      className="relative py-20 sm:py-28 bg-[#FAF7F0] text-[#123B45] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* ========================================================================= */}
        {/* 1. HERO HEADER */}
        {/* ========================================================================= */}
        <div className="mb-12 sm:mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              {/* Main Headline */}
              <h2 className="font-bold text-3xl sm:text-5xl lg:text-6xl text-[#123B45] tracking-tight leading-[1.12]">
                Go further, your way.
              </h2>

              {/* Supporting Copy */}
              <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[#123B45]/80 font-normal leading-relaxed max-w-xl">
                Choose the right ride for the way you want to explore Lombok.
              </p>
            </div>

            {/* Selected vehicle quick status badge */}
            {selectedVehicle && (
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#123B45] text-[#FAF7F0] text-xs font-medium shadow-xs self-start md:self-end">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F4C95D]" />
                <span>
                  {selectedVehicle.name} selected (${selectedVehicle.pricePerDay}/day)
                </span>
                <button
                  type="button"
                  onClick={() => onContinueToPlan(selectedVehicle)}
                  className="ml-1 underline text-[#F4C95D] hover:text-white transition-colors cursor-pointer font-semibold uppercase tracking-wider text-[11px]"
                >
                  Plan Trip →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. BEST PICKS SECTION */}
        {/* ========================================================================= */}
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-1.5 pb-3 border-b border-[#123B45]/10">
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-[#4F9DA6] block">
              BEST PICKS
            </span>
            <h3 className="font-bold text-2xl sm:text-3xl text-[#123B45] tracking-tight leading-snug">
              The rides we recommend for exploring Lombok.
            </h3>
          </div>

          {/* Desktop 3-Column Grid / Mobile Horizontal Swipe Carousel */}
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex md:grid md:grid-cols-3 gap-5 sm:gap-7 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory scrollbar-none -mx-6 px-6 md:mx-0 md:px-0"
          >
            {BEST_PICKS.map((car) => {
              const isSelected = selectedVehicle?.id === car.id;

              return (
                <div
                  key={car.id}
                  id={`best-pick-${car.id}`}
                  className={`w-[85vw] max-w-[340px] md:max-w-none md:w-auto shrink-0 snap-center group relative rounded-2xl bg-white border p-6 flex flex-col justify-between transition-all duration-300 ${
                    isSelected
                      ? 'border-[#123B45] ring-2 ring-[#123B45]/15 shadow-md -translate-y-0.5'
                      : 'border-[#123B45]/12 hover:border-[#123B45]/30 hover:shadow-[0_10px_30px_rgb(18,59,69,0.06)]'
                  }`}
                >
                  {/* Photo with clean background */}
                  <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#FAF7F0] mb-5">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />

                    {isSelected && (
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#123B45] text-[#FAF7F0] text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                        <Check className="w-3 h-3 text-[#F4C95D]" />
                        <span>Selected</span>
                      </div>
                    )}
                  </div>

                  {/* Vehicle Details */}
                  <div className="space-y-3 mb-5">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-lg font-bold text-[#123B45] tracking-tight">
                        {car.name}
                      </h4>
                      {car.seats && (
                        <span className="text-xs text-[#123B45]/60 flex items-center gap-1 shrink-0">
                          <Users className="w-3.5 h-3.5 text-[#4F9DA6]" />
                          <span>{car.seats} seats</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-baseline gap-1 pt-0.5">
                      <span className="text-xs text-[#123B45]/60 font-medium">From</span>
                      <span className="text-2xl font-bold text-[#123B45] tracking-tight">
                        ${car.pricePerDay}
                      </span>
                      <span className="text-xs text-[#123B45]/60 font-medium">/ day</span>
                    </div>

                    {/* INCLUDED Benefits */}
                    <div className="pt-3 border-t border-[#123B45]/8 space-y-2.5">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#4F9DA6] block">
                        INCLUDED
                      </span>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-xs text-[#123B45]/85">
                          <UserCheck className="w-3.5 h-3.5 text-[#4F9DA6] shrink-0" />
                          <span className="font-medium">Professional driver</span>
                        </li>
                        <li className="flex items-center gap-2 text-xs text-[#123B45]/85">
                          <Fuel className="w-3.5 h-3.5 text-[#4F9DA6] shrink-0" />
                          <span className="font-medium">Fuel for your selected itinerary</span>
                        </li>
                        <li className="flex items-center gap-2 text-xs text-[#123B45]/85">
                          <Cookie className="w-3.5 h-3.5 text-[#4F9DA6] shrink-0" />
                          <span className="font-medium">Traditional Lombok snack</span>
                        </li>
                        <li className="flex items-center gap-2 text-xs text-[#123B45]/85">
                          <Clock className="w-3.5 h-3.5 text-[#4F9DA6] shrink-0" />
                          <span className="font-medium text-[#123B45]/75">Up to 12 hours / day</span>
                        </li>
                      </ul>

                      {/* Subtle disclaimer */}
                      <p className="text-[10px] text-[#123B45]/50 leading-normal pt-1">
                        Fuel included for the agreed itinerary, an additional hours are excluded.
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-auto pt-3 border-t border-[#123B45]/8 flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleChoose(car)}
                      className={`w-full text-xs font-semibold uppercase tracking-[0.14em] py-3 px-4 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'bg-[#123B45] text-[#FAF7F0] hover:bg-[#0E2E36]'
                          : 'bg-[#FAF7F0] text-[#123B45] hover:bg-[#123B45] hover:text-[#FAF7F0] border border-[#123B45]/15'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#F4C95D]" />
                          <span>Selected</span>
                        </>
                      ) : (
                        <span>CHOOSE</span>
                      )}
                    </button>

                    {isSelected && (
                      <button
                        type="button"
                        onClick={() => onContinueToPlan(car)}
                        title="Continue to Plan Your Trip"
                        className="shrink-0 bg-[#F4C95D] hover:bg-[#eab941] text-[#123B45] p-3 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center shadow-xs"
                        aria-label="Continue to trip planner"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mobile Swipe Pagination Dots */}
          <div className="flex md:hidden justify-center items-center gap-1.5 pt-1 pb-1">
            {BEST_PICKS.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeSlide === idx
                    ? 'w-6 bg-[#123B45]'
                    : 'w-1.5 bg-[#123B45]/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. SHOWING THE OTHER VEHICLES (Understated Text/Button CTA) */}
        {/* ========================================================================= */}
        <div className="mt-8 sm:mt-10 text-center">
          <button
            type="button"
            onClick={handleToggleExpand}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase text-[#123B45]/75 hover:text-[#123B45] py-2 px-4 transition-colors cursor-pointer group"
          >
            {isExpanded ? (
              <>
                <span>SHOW LESS</span>
                <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
              </>
            ) : (
              <>
                <span>SEE ANOTHER CAR</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </>
            )}
          </button>
        </div>

        {/* ========================================================================= */}
        {/* 4. EXPANDABLE FULL FLEET (Remaining 11 Vehicles in 4 Subtle Categories) */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="overflow-hidden"
            >
              <div className="pt-14 sm:pt-16 space-y-14 sm:space-y-16">
                {REMAINING_CATEGORIES.map((cat) => {
                  const vehicles = VEHICLE_OPTIONS.filter((v) =>
                    cat.vehicleIds.includes(v.id)
                  );

                  return (
                    <div key={cat.id} className="space-y-5">
                      {/* Subtle Category Heading */}
                      <div className="pb-2.5 border-b border-[#123B45]/10">
                        <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-[#123B45]/70">
                          {cat.name}
                        </h4>
                      </div>

                      {/* Remaining Vehicles Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                        {vehicles.map((car) => {
                          const isSelected = selectedVehicle?.id === car.id;

                          return (
                            <div
                              key={car.id}
                              id={`additional-vehicle-${car.id}`}
                              className={`group relative rounded-2xl bg-white border p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 ${
                                isSelected
                                  ? 'border-[#123B45] ring-2 ring-[#123B45]/15 shadow-md -translate-y-0.5'
                                  : 'border-[#123B45]/12 hover:border-[#123B45]/30 hover:shadow-[0_8px_24px_rgb(18,59,69,0.06)]'
                              }`}
                            >
                              {/* Photo */}
                              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#FAF7F0] mb-4">
                                <img
                                  src={car.image}
                                  alt={car.name}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                  loading="lazy"
                                  referrerPolicy="no-referrer"
                                />

                                {isSelected && (
                                  <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-[#123B45] text-[#FAF7F0] text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                                    <Check className="w-3 h-3 text-[#F4C95D]" />
                                    <span>Selected</span>
                                  </div>
                                )}
                              </div>

                              {/* Details */}
                              <div className="space-y-2.5 mb-4">
                                <div className="flex items-center justify-between gap-2">
                                  <h5 className="text-base font-bold text-[#123B45] tracking-tight truncate">
                                    {car.name}
                                  </h5>
                                  {car.seats && (
                                    <span className="text-xs text-[#123B45]/60 flex items-center gap-1 shrink-0">
                                      <Users className="w-3 h-3 text-[#4F9DA6]" />
                                      <span>{car.seats} seats</span>
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-baseline gap-1 pt-0.5">
                                  <span className="text-xs text-[#123B45]/60 font-medium">From</span>
                                  <span className="text-lg font-bold text-[#123B45]">
                                    ${car.pricePerDay}
                                  </span>
                                  <span className="text-xs text-[#123B45]/60 font-medium">/ day</span>
                                </div>

                                {/* INCLUDED Benefits */}
                                <div className="pt-2.5 border-t border-[#123B45]/8 space-y-1.5">
                                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#4F9DA6] block">
                                    INCLUDED
                                  </span>
                                  <ul className="space-y-1.5 text-xs text-[#123B45]/85">
                                    <li className="flex items-center gap-1.5">
                                      <UserCheck className="w-3 h-3 text-[#4F9DA6] shrink-0" />
                                      <span className="font-medium text-xs">Professional driver</span>
                                    </li>
                                    <li className="flex items-center gap-1.5">
                                      <Fuel className="w-3 h-3 text-[#4F9DA6] shrink-0" />
                                      <span className="font-medium text-xs">Fuel for your selected itinerary</span>
                                    </li>
                                    <li className="flex items-center gap-1.5">
                                      <Cookie className="w-3 h-3 text-[#4F9DA6] shrink-0" />
                                      <span className="font-medium text-xs">Traditional Lombok snack</span>
                                    </li>
                                    <li className="flex items-center gap-1.5">
                                      <Clock className="w-3 h-3 text-[#4F9DA6] shrink-0" />
                                      <span className="font-medium text-xs text-[#123B45]/70">Up to 12 hours / day</span>
                                    </li>
                                  </ul>
                                  <p className="text-[10px] text-[#123B45]/50 leading-normal pt-0.5">
                                    Fuel included for the agreed itinerary, an additional hours are excluded.
                                  </p>
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="mt-auto pt-2 border-t border-[#123B45]/8 flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleChoose(car)}
                                  className={`w-full text-xs font-semibold uppercase tracking-[0.14em] py-2.5 px-4 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                                    isSelected
                                      ? 'bg-[#123B45] text-[#FAF7F0] hover:bg-[#0E2E36]'
                                      : 'bg-[#FAF7F0] text-[#123B45] hover:bg-[#123B45] hover:text-[#FAF7F0] border border-[#123B45]/15'
                                  }`}
                                >
                                  {isSelected ? (
                                    <>
                                      <Check className="w-3.5 h-3.5 text-[#F4C95D]" />
                                      <span>Selected</span>
                                    </>
                                  ) : (
                                    <span>CHOOSE</span>
                                  )}
                                </button>

                                {isSelected && (
                                  <button
                                    type="button"
                                    onClick={() => onContinueToPlan(car)}
                                    title="Continue to Plan Your Trip"
                                    className="shrink-0 bg-[#F4C95D] hover:bg-[#eab941] text-[#123B45] p-2.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center shadow-xs"
                                    aria-label="Continue to trip planner"
                                  >
                                    <ArrowRight className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                {/* Second collapse trigger at bottom of expanded list */}
                <div className="pt-4 text-center">
                  <button
                    type="button"
                    onClick={handleToggleExpand}
                    className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.14em] uppercase text-[#123B45]/75 hover:text-[#123B45] py-2 px-4 transition-colors cursor-pointer group"
                  >
                    <span>SHOW LESS</span>
                    <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* 5. THE FIRST-LOP SIGNATURE (Flagship: Toyota Alphard) */}
        {/* ========================================================================= */}
        <div className="mt-20 sm:mt-28 pt-16 sm:pt-20 border-t border-[#123B45]/12">
          <div
            id="the-first-lop-signature"
            className="relative rounded-3xl bg-white border border-[#123B45]/12 p-6 sm:p-10 lg:p-12 shadow-[0_12px_40px_rgb(18,59,69,0.06)] overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Large Toyota Alphard Image: approx 55-60% on desktop (col-span-7) */}
              <div className="lg:col-span-7">
                <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-[#FAF7F0] border border-[#123B45]/10 group shadow-sm">
                  <img
                    src={SIGNATURE_ALPHARD.image}
                    alt="Toyota Alphard in Lombok coastal resort"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />

                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#123B45]/90 backdrop-blur-md text-[#FAF7F0] text-[11px] font-semibold uppercase tracking-[0.16em] border border-white/10 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F4C95D]" />
                    <span>FLAGSHIP CHAUFFEUR</span>
                  </div>

                  {isAlphardSelected && (
                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-[#123B45] text-[#FAF7F0] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                      <Check className="w-3.5 h-3.5 text-[#F4C95D]" />
                      <span>Selected</span>
                    </div>
                  )}

                  <div className="absolute bottom-4 left-4 right-4 text-white text-[11px] font-medium tracking-wide bg-gradient-to-t from-[#123B45]/80 to-transparent p-3 pt-6 rounded-b-xl flex items-center justify-between">
                    <span>Lombok Executive Private Fleet</span>
                    <span className="text-white/80 flex items-center gap-1">
                      <Users className="w-3 h-3 text-[#4F9DA6]" /> 6 Luxury Captain Seats
                    </span>
                  </div>
                </div>
              </div>

              {/* Text / Content: approx 40-45% on desktop (col-span-5) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                <div>
                  {/* Eyebrow */}
                  <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-[#4F9DA6] block mb-3">
                    THE FIRST-LOP SIGNATURE
                  </span>

                  {/* Main Headline */}
                  <h3 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-[#123B45] tracking-tight leading-snug">
                    The most comfortable way to experience Lombok.
                  </h3>
                </div>

                {/* Vehicle Specs & Pricing */}
                <div className="pt-4 border-t border-[#123B45]/10 space-y-3">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#123B45]/55 block mb-0.5">
                      TOYOTA ALPHARD
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs text-[#123B45]/60 font-medium">From</span>
                      <span className="text-3xl font-bold text-[#123B45] tracking-tight">
                        $200
                      </span>
                      <span className="text-xs text-[#123B45]/60 font-medium">/ day</span>
                    </div>
                  </div>

                  {/* Inclusions */}
                  <p className="text-xs sm:text-sm font-semibold text-[#123B45] tracking-wide">
                    Private chauffeur · Fuel for your selected itinerary · Traditional Lombok snack
                  </p>

                  {/* Terms Note */}
                  <p className="text-[11px] text-[#123B45]/60 leading-relaxed font-normal">
                    Up to 12 hours/day. An additional hours are excluded.
                  </p>
                </div>

                {/* CTA Actions */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSelectAlphardAndPlan}
                    className="inline-flex items-center justify-center gap-2.5 bg-[#123B45] hover:bg-[#0E2E36] text-[#FAF7F0] hover:text-[#F4C95D] font-semibold text-xs uppercase tracking-[0.14em] px-7 py-3.5 rounded-full transition-all duration-200 cursor-pointer shadow-sm group"
                  >
                    <span>EXPERIENCE THE ALPHARD</span>
                    <span className="text-sm transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleChoose(SIGNATURE_ALPHARD)}
                    className={`inline-flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] px-5 py-3.5 rounded-full border transition-all duration-200 cursor-pointer ${
                      isAlphardSelected
                        ? 'border-[#123B45] bg-[#123B45]/5 text-[#123B45]'
                        : 'border-[#123B45]/20 text-[#123B45]/80 hover:border-[#123B45] hover:text-[#123B45]'
                    }`}
                  >
                    {isAlphardSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#4F9DA6]" />
                        <span>Selected</span>
                      </>
                    ) : (
                      <span>SELECT VEHICLE</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 6. READY TO EXPLORE LOMBOK? FINAL CTA AT BOTTOM OF YOUR RIDE */}
        {/* ========================================================================= */}
        <div className="mt-16 sm:mt-20 pt-12 border-t border-[#123B45]/10">
          <div className="relative rounded-3xl bg-[#123B45] text-[#FAF7F0] p-8 sm:p-12 text-center max-w-3xl mx-auto shadow-xl overflow-hidden">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#4F9DA6]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#F4C95D]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-lg mx-auto space-y-3.5">
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-[#F4C95D] block mb-2">
                READY TO EXPLORE LOMBOK?
              </span>

              <h3 className="font-bold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                Tell us where you’re going. We’ll help with the rest.
              </h3>

              <p className="text-sm sm:text-base text-white/80 font-normal leading-relaxed">
                {selectedVehicle
                  ? `Your ${selectedVehicle.name} ($${selectedVehicle.pricePerDay}/day) will be pre-selected in your travel inquiry.`
                  : 'Start with destinations, travel dates, or an island vehicle. Our concierge will curate your experience.'}
              </p>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => onContinueToPlan(selectedVehicle || undefined)}
                  className="inline-flex items-center justify-center gap-2 bg-[#FAF7F0] text-[#123B45] hover:bg-[#F4C95D] font-semibold text-xs uppercase tracking-[0.14em] px-8 py-3.5 rounded-full transition-all duration-200 cursor-pointer shadow-md hover:-translate-y-0.5"
                >
                  <span>PLAN YOUR TRIP</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 7. DOCKED SELECTION BAR (When any vehicle is chosen) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedVehicle && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 inset-x-4 sm:inset-x-auto sm:right-8 z-40 max-w-md w-full bg-[#123B45] text-[#FAF7F0] rounded-2xl shadow-2xl border border-white/15 p-4 flex items-center justify-between gap-4 backdrop-blur-md"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-white/10 shrink-0 border border-white/15">
                <img
                  src={selectedVehicle.image}
                  alt={selectedVehicle.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F4C95D]" />
                  <span className="text-[10px] uppercase font-semibold tracking-wider text-[#4F9DA6]">
                    {selectedVehicle.isFlagship ? 'Signature Flagship' : 'Selected Ride'}
                  </span>
                </div>
                <p className="text-sm font-bold text-white tracking-tight truncate">
                  {selectedVehicle.name}
                </p>
                <p className="text-xs text-white/70">
                  From ${selectedVehicle.pricePerDay} / day
                  {selectedVehicle.isFlagship && ' · Chauffeur & Fuel'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onContinueToPlan(selectedVehicle)}
              className="shrink-0 inline-flex items-center gap-1.5 bg-[#FAF7F0] text-[#123B45] hover:bg-[#F4C95D] font-semibold text-xs uppercase tracking-[0.14em] px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm"
            >
              <span>CONTINUE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
