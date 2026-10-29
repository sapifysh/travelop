import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Check,
  ArrowRight,
  ArrowUp,
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

interface CarCardProps {
  key?: string;
  car: VehicleOption;
  domId: string;
  isSelected: boolean;
  onChoose: () => void;
  onContinue: () => void;
  compact?: boolean;
  className?: string;
}

function CarCard({ car, domId, isSelected, onChoose, onContinue, compact = false, className = '' }: CarCardProps) {
  return (
    <div
      id={domId}
      className={`group relative flex flex-col overflow-hidden rounded-[20px] bg-white border transition-[box-shadow,border-color] duration-500 ${
        isSelected
          ? 'border-[#123B45]/70 shadow-[0_20px_44px_-24px_rgba(18,59,69,0.35)]'
          : 'border-[#123B45]/[0.07] shadow-[0_1px_2px_rgba(18,59,69,0.04)] hover:shadow-[0_20px_44px_-24px_rgba(18,59,69,0.22)]'
      } ${className}`}
    >
      {/* Photo, edge to edge */}
      <div className={`relative w-full ${compact ? 'aspect-[16/10]' : 'aspect-[4/3]'} overflow-hidden bg-[#F3EFE8]`}>
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        {isSelected && (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#FAF8F5]/95 text-[#123B45] text-[11px] font-medium tracking-wide flex items-center gap-1.5 shadow-sm">
            <Check className="w-3 h-3" />
            <span>Selected</span>
          </div>
        )}
      </div>

      {/* Details */}
      <div className={`flex flex-1 flex-col ${compact ? 'p-5' : 'p-6 sm:p-7'}`}>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h4 className={`${compact ? 'text-base' : 'text-xl'} font-semibold text-[#123B45] tracking-tight truncate`}>
              {car.name}
            </h4>
            {car.seats && (
              <p className="mt-1 text-[13px] text-[#123B45]/55">{car.seats} seats · with driver</p>
            )}
          </div>
          <div className="text-right shrink-0">
            <span className="block text-[11px] text-[#123B45]/50 leading-none">from</span>
            <span className={`${compact ? 'text-lg' : 'text-2xl'} font-medium text-[#123B45] tracking-tight leading-tight`}>
              ${car.pricePerDay}
            </span>
            <span className="text-[12px] text-[#123B45]/50"> /day</span>
          </div>
        </div>

        <div className={`${compact ? 'mt-4 pt-4' : 'mt-5 pt-5'} border-t border-[#123B45]/[0.07]`}>
          <p className="text-[13px] leading-relaxed text-[#123B45]/65">
            Driver · Fuel for your itinerary · Lombok snack · Up to 12 hrs a day
          </p>
          <p className="mt-1.5 text-[11px] leading-normal text-[#123B45]/40">
            Additional hours are charged separately.
          </p>
        </div>

        <div className={`mt-auto ${compact ? 'pt-5' : 'pt-6'}`}>
          {isSelected ? (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onContinue}
                className="flex-1 rounded-full bg-[#123B45] text-[#FAF7F0] hover:bg-[#0E2E36] py-3 px-5 text-[13px] font-medium tracking-wide transition-colors duration-300 cursor-pointer flex items-center justify-center gap-2"
                aria-label="Continue to trip planner"
              >
                <span>Continue to plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={onChoose}
                className="shrink-0 text-[12px] text-[#123B45]/55 hover:text-[#123B45] underline underline-offset-4 decoration-[#123B45]/20 transition-colors cursor-pointer"
              >
                Change
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onChoose}
              className="w-full rounded-full border border-[#123B45]/20 text-[#123B45] hover:bg-[#123B45] hover:text-[#FAF7F0] hover:border-[#123B45] py-3 px-5 text-[13px] font-medium tracking-wide transition-colors duration-300 cursor-pointer"
            >
              Choose this car
            </button>
          )}
        </div>
      </div>
    </div>
  );
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
      className="relative py-20 sm:py-28 bg-[#FAF8F5] text-[#123B45] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* ========================================================================= */}
        {/* 1. HERO HEADER */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              {/* Main Headline */}
              <h2 className="font-bold text-3xl sm:text-5xl lg:text-6xl text-[#123B45] tracking-tight leading-[1.12]">
                Go further, your way.
              </h2>

              {/* Supporting Copy */}
              <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[#123B45]/80 font-normal leading-relaxed max-w-xl">
                Choose the right ride for the way you want to explore Lombok — from dedicated private chauffeurs and Lombok airport transfers to bespoke island journeys.
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
        </motion.div>

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
            data-lenis-prevent
            className="flex md:grid md:grid-cols-3 gap-5 sm:gap-7 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory scrollbar-none -mx-6 px-6 md:mx-0 md:px-0"
          >
            {BEST_PICKS.map((car) => {
              const isSelected = selectedVehicle?.id === car.id;

              return (
                <CarCard
                  key={car.id}
                  domId={`best-pick-${car.id}`}
                  car={car}
                  isSelected={isSelected}
                  onChoose={() => handleChoose(car)}
                  onContinue={() => onContinueToPlan(car)}
                  className="w-[85vw] max-w-[340px] md:max-w-none md:w-auto shrink-0 snap-center"
                />
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
                      <div className="pb-3 border-b border-[#123B45]/[0.08] flex items-end justify-between gap-4">
                        <div>
                          <h4 className="text-lg sm:text-xl font-semibold tracking-tight text-[#123B45]">
                            {cat.name}
                          </h4>
                          <p className="mt-1 text-[13px] text-[#123B45]/55">{cat.note}</p>
                        </div>
                        <span className="shrink-0 text-[12px] text-[#123B45]/45">
                          {vehicles.length} {vehicles.length === 1 ? 'car' : 'cars'}
                        </span>
                      </div>

                      {/* Remaining Vehicles Grid (Optimized for Mobile, iPad, and Desktop) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                        {vehicles.map((car) => {
                          const isSelected = selectedVehicle?.id === car.id;

                          return (
                            <CarCard
                              key={car.id}
                              domId={`additional-vehicle-${car.id}`}
                              car={car}
                              isSelected={isSelected}
                              onChoose={() => handleChoose(car)}
                              onContinue={() => onContinueToPlan(car)}
                              compact
                            />
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

                  {isAlphardSelected && (
                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-[#123B45] text-[#FAF7F0] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                      <Check className="w-3.5 h-3.5 text-[#F4C95D]" />
                      <span>Selected</span>
                    </div>
                  )}
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
