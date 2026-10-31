import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Check,
  Calendar,
  Users,
  MessageCircle,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Car,
  ArrowRight,
  Mail,
  Phone,
} from 'lucide-react';
import { TripInquiryPayload, VehicleOption } from '../types';
import { submitTripInquiryToGoogleSheet } from '../config/tripPlannerConfig';
import { BRAND, PACKAGES } from '../data/content';

interface PlanTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDestination?: string;
  initialPackage?: string;
  selectedVehicle: VehicleOption | null;
  onSelectVehicle: (vehicle: VehicleOption | null) => void;
  onNavigateToYourRide: () => void;
}

// Compact selectable destination chips as specified
const DESTINATION_CHIPS = [
  'Kuta Lombok',
  'Selong Belanak',
  'Gili Trawangan',
  'Gili Meno',
  'Gili Air',
  'Rinjani Mountain',
  'North Lombok Waterfalls',
  'Not sure yet',
];

const toTitle = (str: string) =>
  str.replace(/^THE\s+/i, '').toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

// Trip styles mirror the live packages, plus a fully custom option
const TRIP_STYLES = [...PACKAGES.map((p) => ({ id: p.name, label: toTitle(p.name) })), { id: 'CUSTOM', label: 'Custom Trip' }];

export default function PlanTripModal({
  isOpen,
  onClose,
  initialDestination,
  initialPackage,
  selectedVehicle,
  onSelectVehicle,
  onNavigateToYourRide,
}: PlanTripModalProps) {
  // Step 1: Destination
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [tripStyle, setTripStyle] = useState<string>('');
  const [nights, setNights] = useState<number>(4);

  // Step 2: Date & Travelers
  const [travelDate, setTravelDate] = useState<string>('');
  const [travelers, setTravelers] = useState<number>(2);

  // Step 3: Transportation Preference ('none' | 'need-car')
  const [transportChoice, setTransportChoice] = useState<'none' | 'need-car'>(
    selectedVehicle ? 'need-car' : 'none'
  );

  // Step 4: Contact details
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  // Anti-spam: honeypot field (invisible to humans) + when the form was opened
  const [company, setCompany] = useState<string>('');
  const [openedAt, setOpenedAt] = useState<number>(0);

  // Submission / UI state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Sync transportChoice when selectedVehicle changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setErrorMessage(null);
      setFieldErrors({});
      setIsSubmitting(false);
      setCompany('');
      setOpenedAt(Date.now());

      if (initialDestination) {
        const match = DESTINATION_CHIPS.find(
          (c) => c.toLowerCase() === initialDestination.toLowerCase()
        );
        setSelectedDestinations([match || initialDestination]);
      } else {
        setSelectedDestinations([]);
      }

      const pkgMatch = initialPackage
        ? TRIP_STYLES.find((t) => t.id.toLowerCase() === initialPackage.toLowerCase())
        : undefined;
      setTripStyle(pkgMatch ? pkgMatch.id : '');
      if (initialPackage && !pkgMatch) {
        setNotes(`Interested in: ${initialPackage}`);
      } else {
        setNotes('');
      }

      if (selectedVehicle) {
        setTransportChoice('need-car');
      } else {
        setTransportChoice('none');
      }
    }
  }, [isOpen, initialDestination, initialPackage, selectedVehicle]);

  if (!isOpen) return null;

  // Toggle destination chip logic (supports multiple)
  const handleToggleDestination = (dest: string) => {
    if (dest === 'Not sure yet') {
      setSelectedDestinations(['Not sure yet']);
      return;
    }

    setSelectedDestinations((prev) => {
      const filtered = prev.filter((d) => d !== 'Not sure yet');
      if (filtered.includes(dest)) {
        const next = filtered.filter((d) => d !== dest);
        return next;
      } else {
        return [...filtered, dest];
      }
    });
  };

  // Form Validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!name.trim()) {
      errors.name = 'Please enter your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() && !whatsapp.trim()) {
      errors.whatsapp = 'Add your WhatsApp or email so we can reply.';
    }
    if (email.trim() && !emailRegex.test(email.trim())) {
      errors.email = 'Please enter a valid email address (e.g. name@example.com).';
    }
    if (whatsapp.trim() && whatsapp.trim().replace(/\D/g, '').length < 6) {
      errors.whatsapp = 'Please enter a valid phone number with country code.';
    }

    if (!travelDate) {
      errors.travelDate = 'Please select your anticipated travel date.';
    }

    if (!travelers || travelers < 1) {
      errors.travelers = 'Please select at least 1 traveler.';
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setErrorMessage('Please complete the highlighted fields.');
      return false;
    }

    return true;
  };

  // Packages already define their places, so only ask where to go for a custom/undecided trip
  // (or when the traveler arrived from a destination card).
  const showDestinations = tripStyle === '' || tripStyle === 'CUSTOM' || Boolean(initialDestination);
  const destinationsText = !showDestinations
    ? 'As per package'
    : selectedDestinations.length > 0
    ? selectedDestinations.join(', ')
    : 'Not sure yet';
  const styleText = TRIP_STYLES.find((t) => t.id === tripStyle)?.label || 'Not chosen';

  // Packages have a fixed length; only ask for nights on a custom/undecided trip
  const showNights = tripStyle === '' || tripStyle === 'CUSTOM';
  const chosenPackage = PACKAGES.find((p) => p.name === tripStyle);
  const durationText =
    showNights || !chosenPackage
      ? `${nights} ${nights === 1 ? 'night' : 'nights'}`
      : chosenPackage.duration.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

  // Submit Handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Anti-spam: a filled honeypot or an inhumanly fast submit is silently
    // "accepted" so bots learn nothing, but nothing is sent or stored.
    if (company.trim() !== '' || (openedAt > 0 && Date.now() - openedAt < 3000)) {
      setIsSuccess(true);
      return;
    }

    setErrorMessage(null);

    // Validate minimum required fields
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const carSummary = selectedVehicle
      ? `${selectedVehicle.name} ($${selectedVehicle.pricePerDay}/day)`
      : transportChoice === 'need-car'
      ? "I'd like a car (consultation)"
      : 'No car needed';

    const fullMessage = notes.trim() || 'None';

    const styleLabel = TRIP_STYLES.find((t) => t.id === tripStyle)?.label || 'Not chosen';
    const payload: TripInquiryPayload = {
      name: name.trim(),
      email: email.trim() || '-',
      whatsapp: whatsapp.trim() || '-',
      travelDate: `${travelDate} (${durationText})`,
      travelers: String(travelers),
      interests: `Style: ${styleLabel} | Places: ${destinationsText}`,
      message: fullMessage,
      vehicle: carSummary,
      company: company.trim(),
    };

    try {
      await submitTripInquiryToGoogleSheet(payload);
      setIsSuccess(true);
    } catch (err) {
      console.error('[FIRST-LOP] Submission error:', err);
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "We couldn't send your inquiry right now. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pre-filled WhatsApp direct message for immediate confirmation
  const vehicleSummaryText = selectedVehicle
    ? `${selectedVehicle.name} ($${selectedVehicle.pricePerDay}/day${selectedVehicle.isFlagship ? ' - Chauffeur & Fuel' : ''})`
    : transportChoice === 'need-car'
    ? "I'd like a car"
    : 'No car needed';

  const directWhatsAppLink = `https://wa.me/${BRAND.contact.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
    [
      `Hello ${BRAND.name}! I just sent my Lombok trip plan.`,
      '',
      `• Name: ${name || 'Traveler'}`,
      `• Trip style: ${styleText}`,
      `• Places: ${destinationsText}`,
      `• Arrival: ${travelDate || 'Flexible'} (${durationText})`,
      `• Travelers: ${travelers}`,
      `• Vehicle: ${vehicleSummaryText}`,
      `• Notes: ${notes || '-'}`,
    ].join('\n')
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-[#0E171A]/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 12 }}
        transition={{ duration: 0.24, ease: 'easeOut' }}
        className="relative w-full max-w-xl bg-[#FAF8F5] text-[#0E171A] rounded-2xl shadow-2xl border border-[#0E171A]/15 overflow-hidden my-auto max-h-[92dvh] flex flex-col font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-[#0E171A]/5 hover:bg-[#0E171A]/10 text-[#0E171A] flex items-center justify-center transition-colors cursor-pointer z-20"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Scrollable Body */}
        <div data-lenis-prevent className="overflow-y-auto p-6 sm:p-8 overscroll-contain">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              /* ========================================================================= */
              /* SUCCESS STATE — Premium Liquid Glass Confirmation */
              /* ========================================================================= */
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="py-6 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#2E7987]/15 text-[#2E7987] mx-auto flex items-center justify-center mb-4 ring-8 ring-[#2E7987]/5">
                  <CheckCircle2 className="w-9 h-9 text-[#2E7987]" />
                </div>

                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2E7987] mb-1">
                  Plan received
                </div>

                <h3 className="font-semibold text-2xl sm:text-3xl text-[#0E171A] tracking-tight">
                  Thank you, {name.split(' ')[0] || 'traveler'}.
                </h3>

                <p className="text-sm sm:text-base text-[#0E171A]/75 mt-2 max-w-md mx-auto leading-relaxed">
                  Your plan is saved. We'll reply personally with a suggested itinerary and price.
                </p>

                {/* Liquid Glass Inquiry Summary Card */}
                <div className="mt-6 p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-[#0E171A]/10 max-w-md mx-auto text-left text-xs space-y-2.5 text-[#0E171A]/85 shadow-sm">
                  <div className="flex justify-between items-center py-0.5 border-b border-[#0E171A]/8">
                    <span className="text-[#0E171A]/50 uppercase tracking-wider text-[10px] font-semibold">Traveler</span>
                    <span className="font-semibold text-[#0E171A]">{name}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5 border-b border-[#0E171A]/8">
                    <span className="text-[#0E171A]/50 uppercase tracking-wider text-[10px] font-semibold">Email</span>
                    <span className="font-medium text-[#0E171A]">{email}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5 border-b border-[#0E171A]/8">
                    <span className="text-[#0E171A]/50 uppercase tracking-wider text-[10px] font-semibold">WhatsApp</span>
                    <span className="font-medium text-[#0E171A]">{whatsapp}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5 border-b border-[#0E171A]/8">
                    <span className="text-[#0E171A]/50 uppercase tracking-wider text-[10px] font-semibold">Travel Date</span>
                    <span className="font-medium text-[#0E171A]">{travelDate || 'Flexible'} · {durationText}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5 border-b border-[#0E171A]/8">
                    <span className="text-[#0E171A]/50 uppercase tracking-wider text-[10px] font-semibold">Travelers</span>
                    <span className="font-medium text-[#0E171A]">{travelers} {travelers === 1 ? 'guest' : 'guests'}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5 border-b border-[#0E171A]/8">
                    <span className="text-[#0E171A]/50 uppercase tracking-wider text-[10px] font-semibold">Trip</span>
                    <span className="font-medium text-[#0E171A] truncate max-w-[220px]">
                      {styleText} · {destinationsText}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-0.5">
                    <span className="text-[#0E171A]/50 uppercase tracking-wider text-[10px] font-semibold">Transportation</span>
                    <span className="font-medium text-[#0E171A]">
                      {selectedVehicle
                        ? `${selectedVehicle.name} ($${selectedVehicle.pricePerDay}/day)`
                        : transportChoice === 'need-car'
                        ? "I'd like a car"
                        : 'No car needed'}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full sm:w-auto bg-[#0E171A] hover:bg-[#1C2A2E] text-[#FAF8F5] px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm"
                  >
                    Back to site
                  </button>

                  <a
                    href={directWhatsAppLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-[#0E171A] hover:text-[#1C2A2E] text-xs font-semibold uppercase tracking-wider px-5 py-3 rounded-full border border-[#0E171A]/20 hover:bg-white/60 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#2E7987]" />
                    <span>Open WhatsApp</span>
                  </a>
                </div>
              </motion.div>
            ) : (
              /* ========================================================================= */
              /* SIMPLE, FAST CONCIERGE FORM */
              /* ========================================================================= */
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                {/* Honeypot — off-screen and invisible to humans; bots that fill it are silently dropped */}
                <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
                  <label>
                    Company
                    <input
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </label>
                </div>

                {/* Header */}
                <div className="pr-8">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3D95A5]" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0E171A]/60">
                      Plan your trip
                    </span>
                  </div>
                  <h2 className="font-semibold text-2xl sm:text-3xl text-[#0E171A] tracking-tight leading-snug">
                    Tell us your plan.
                  </h2>
                  <p className="text-xs sm:text-sm text-[#0E171A]/70 mt-1 font-normal">
                    Share the basics. We’ll reply with an itinerary and a price.
                  </p>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200/90 text-xs text-red-800 flex items-start gap-2.5 shadow-2xs">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-red-900">{errorMessage}</p>
                      <p className="text-[11px] text-red-700/80 mt-0.5">
                        Your entered information has been preserved so you can easily retry.
                      </p>
                    </div>
                  </div>
                )}

                {/* 1. TRIP STYLE */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#0E171A] uppercase tracking-wider">
                    What kind of trip?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {TRIP_STYLES.map((style) => {
                      const isSelected = tripStyle === style.id;
                      return (
                        <button
                          key={style.id}
                          type="button"
                          onClick={() => setTripStyle(isSelected ? '' : style.id)}
                          className={`px-3 py-2.5 rounded-xl text-xs font-medium text-left transition-all flex items-center gap-1.5 cursor-pointer ${
                            isSelected
                              ? 'bg-[#0E171A] text-white shadow-xs'
                              : 'bg-white/80 text-[#0E171A]/80 border border-[#0E171A]/15 hover:border-[#0E171A]/40'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 text-[#3D95A5] shrink-0" />}
                          <span className="truncate">{style.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {showDestinations && (
                <>
                {/* WHERE DO YOU WANT TO GO? */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#0E171A] uppercase tracking-wider">
                    Where do you want to go? <span className="normal-case tracking-normal font-normal text-[#0E171A]/50">(pick any)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {DESTINATION_CHIPS.map((chip) => {
                      const isSelected = selectedDestinations.includes(chip);
                      return (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => handleToggleDestination(chip)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                            isSelected
                              ? 'bg-[#0E171A] text-white shadow-xs'
                              : 'bg-white text-[#0E171A]/80 border border-[#0E171A]/15 hover:border-[#0E171A]/40'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 text-[#3D95A5]" />}
                          <span>{chip}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                </>
                )}

                {/* 3. ARRIVAL DATE */}
                <div className="grid grid-cols-1 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#0E171A] uppercase tracking-wider">
                      Arrival date <span className="text-[#2E7987]">*</span>
                    </label>
                    <input
                      type="date"
                      value={travelDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => {
                        setTravelDate(e.target.value);
                        if (fieldErrors.travelDate) {
                          setFieldErrors((prev) => {
                            const next = { ...prev };
                            delete next.travelDate;
                            return next;
                          });
                        }
                      }}
                      className={`w-full bg-white px-3.5 py-2.5 rounded-xl border text-sm text-[#0E171A] focus:outline-none transition-colors ${
                        fieldErrors.travelDate
                          ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                          : 'border-[#0E171A]/15 focus:border-[#2E7987]'
                      }`}
                    />
                    {fieldErrors.travelDate && (
                      <p className="text-[11px] text-red-600 font-medium">{fieldErrors.travelDate}</p>
                    )}
                  </div>

                </div>

                {/* TRAVELERS + NIGHTS */}
                <div className={`grid ${showNights ? 'grid-cols-2' : 'grid-cols-1'} gap-3`}>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#0E171A] uppercase tracking-wider">
                      Travelers <span className="text-[#2E7987]">*</span>
                    </label>
                    <div
                      className={`flex items-center justify-between bg-white px-3 py-1.5 rounded-xl border transition-colors ${
                        fieldErrors.travelers ? 'border-red-400 bg-red-50/20' : 'border-[#0E171A]/15'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setTravelers((prev) => Math.max(1, prev - 1));
                          if (fieldErrors.travelers) {
                            setFieldErrors((prev) => {
                              const next = { ...prev };
                              delete next.travelers;
                              return next;
                            });
                          }
                        }}
                        className="w-7 h-7 rounded-lg bg-[#FAF8F5] hover:bg-[#0E171A] hover:text-white text-[#0E171A] flex items-center justify-center font-semibold text-sm transition-colors cursor-pointer"
                        aria-label="Decrease travelers"
                      >
                        –
                      </button>
                      <span className="font-semibold text-sm text-[#0E171A]">
                        {travelers} {travelers === 1 ? 'traveler' : 'travelers'}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setTravelers((prev) => Math.min(20, prev + 1));
                          if (fieldErrors.travelers) {
                            setFieldErrors((prev) => {
                              const next = { ...prev };
                              delete next.travelers;
                              return next;
                            });
                          }
                        }}
                        className="w-7 h-7 rounded-lg bg-[#FAF8F5] hover:bg-[#0E171A] hover:text-white text-[#0E171A] flex items-center justify-center font-semibold text-sm transition-colors cursor-pointer"
                        aria-label="Increase travelers"
                      >
                        +
                      </button>
                    </div>
                    {fieldErrors.travelers && (
                      <p className="text-[11px] text-red-600 font-medium">{fieldErrors.travelers}</p>
                    )}
                  </div>
                  {showNights && (
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#0E171A] uppercase tracking-wider">
                      Nights in Lombok
                    </label>
                    <div className="flex items-center justify-between bg-white px-3 py-1.5 rounded-xl border border-[#0E171A]/15">
                      <button
                        type="button"
                        onClick={() => setNights((n) => Math.max(1, n - 1))}
                        className="w-7 h-7 rounded-lg bg-[#FAF8F5] hover:bg-[#0E171A] hover:text-white text-[#0E171A] flex items-center justify-center font-semibold text-sm transition-colors cursor-pointer"
                        aria-label="Fewer nights"
                      >
                        –
                      </button>
                      <span className="font-semibold text-sm text-[#0E171A]">
                        {nights} {nights === 1 ? 'night' : 'nights'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setNights((n) => Math.min(30, n + 1))}
                        className="w-7 h-7 rounded-lg bg-[#FAF8F5] hover:bg-[#0E171A] hover:text-white text-[#0E171A] flex items-center justify-center font-semibold text-sm transition-colors cursor-pointer"
                        aria-label="More nights"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  )}
                </div>

                {/* 4. TRANSPORTATION (Compact, Focused) */}
                <div className="space-y-2 pt-1">
                  <label className="block text-xs font-semibold text-[#0E171A] uppercase tracking-wider">
                    Transportation
                  </label>

                  {selectedVehicle ? (
                    /* Populated vehicle selected from YOUR RIDE */
                    <div className="p-3.5 rounded-xl bg-white border border-[#0E171A]/15 shadow-2xs space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3D95A5]" />
                          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2E7987]">
                            YOUR RIDE
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onNavigateToYourRide();
                          }}
                          className="text-[11px] font-semibold text-[#0E171A]/70 hover:text-[#0E171A] underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>Change vehicle →</span>
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-3 pt-0.5">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-10 rounded-lg overflow-hidden bg-[#FAF8F5] border border-[#0E171A]/10 shrink-0">
                            <img
                              src={selectedVehicle.image}
                              alt={selectedVehicle.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <p className="text-xs sm:text-sm font-semibold text-[#0E171A]">
                                {selectedVehicle.name}
                              </p>
                              {selectedVehicle.isFlagship && (
                                <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#0E171A]/10 text-[#0E171A] px-1.5 py-0.5 rounded">
                                  Signature
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#0E171A]/70">
                              From ${selectedVehicle.pricePerDay} / day · Driver, Fuel & Snack Included
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-[11px] font-semibold text-[#0E171A] bg-[#FAF8F5] px-2.5 py-1 rounded-full border border-[#0E171A]/12 shrink-0">
                          <Check className="w-3 h-3 text-[#3D95A5]" />
                          <span>Selected</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Unselected State: Compact Toggle + Browse CTA */
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setTransportChoice('none')}
                          className={`py-2.5 px-3.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                            transportChoice === 'none'
                              ? 'bg-[#0E171A] text-[#FAF8F5] shadow-2xs'
                              : 'bg-white text-[#0E171A]/70 border border-[#0E171A]/15 hover:border-[#0E171A]/40'
                          }`}
                        >
                          {transportChoice === 'none' && <Check className="w-3 h-3 text-[#3D95A5]" />}
                          <span>No car needed</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setTransportChoice('need-car')}
                          className={`py-2.5 px-3.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                            transportChoice === 'need-car'
                              ? 'bg-[#0E171A] text-[#FAF8F5] shadow-2xs'
                              : 'bg-white text-[#0E171A]/70 border border-[#0E171A]/15 hover:border-[#0E171A]/40'
                          }`}
                        >
                          {transportChoice === 'need-car' && <Check className="w-3 h-3 text-[#3D95A5]" />}
                          <span>I’d like a car</span>
                        </button>
                      </div>

                      {transportChoice === 'need-car' && (
                        <div className="p-3 rounded-xl bg-white border border-[#0E171A]/12 flex items-center justify-between gap-3 text-xs">
                          <span className="text-[#0E171A]/70">
                            Want to choose a specific vehicle first?
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              onClose();
                              onNavigateToYourRide();
                            }}
                            className="shrink-0 text-xs font-semibold text-[#0E171A] hover:text-[#2E7987] underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>Browse available rides →</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 5. CONTACT & PREFERENCES */}
                <div className="space-y-3 pt-1">
                  <label className="block text-xs font-semibold text-[#0E171A] uppercase tracking-wider">
                    How can we reach you? <span className="normal-case tracking-normal font-normal text-[#0E171A]/50">(WhatsApp or email)</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Full Name */}
                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-[#0E171A]">
                        Full Name <span className="text-[#2E7987]">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Your name"
                        maxLength={100}
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (fieldErrors.name) {
                            setFieldErrors((prev) => {
                              const next = { ...prev };
                              delete next.name;
                              return next;
                            });
                          }
                        }}
                        className={`w-full bg-white px-3.5 py-2.5 rounded-xl border text-sm text-[#0E171A] placeholder-[#0E171A]/40 focus:outline-none transition-colors ${
                          fieldErrors.name
                            ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                            : 'border-[#0E171A]/15 focus:border-[#2E7987]'
                        }`}
                      />
                      {fieldErrors.name && (
                        <p className="text-[11px] text-red-600 font-medium">{fieldErrors.name}</p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-[#0E171A]">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        maxLength={120}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (fieldErrors.email) {
                            setFieldErrors((prev) => {
                              const next = { ...prev };
                              delete next.email;
                              return next;
                            });
                          }
                        }}
                        className={`w-full bg-white px-3.5 py-2.5 rounded-xl border text-sm text-[#0E171A] placeholder-[#0E171A]/40 focus:outline-none transition-colors ${
                          fieldErrors.email
                            ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                            : 'border-[#0E171A]/15 focus:border-[#2E7987]'
                        }`}
                      />
                      {fieldErrors.email && (
                        <p className="text-[11px] text-red-600 font-medium">{fieldErrors.email}</p>
                      )}
                    </div>

                    {/* WhatsApp Number */}
                    <div className="space-y-1 sm:col-span-2">
                      <label className="block text-xs font-medium text-[#0E171A]">
                        WhatsApp (with country code)
                      </label>
                      <input
                        type="tel"
                        placeholder="+61 412 345 678"
                        maxLength={30}
                        value={whatsapp}
                        onChange={(e) => {
                          setWhatsapp(e.target.value);
                          if (fieldErrors.whatsapp) {
                            setFieldErrors((prev) => {
                              const next = { ...prev };
                              delete next.whatsapp;
                              return next;
                            });
                          }
                        }}
                        className={`w-full bg-white px-3.5 py-2.5 rounded-xl border text-sm text-[#0E171A] placeholder-[#0E171A]/40 focus:outline-none transition-colors ${
                          fieldErrors.whatsapp
                            ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                            : 'border-[#0E171A]/15 focus:border-[#2E7987]'
                        }`}
                      />
                      {fieldErrors.whatsapp && (
                        <p className="text-[11px] text-red-600 font-medium">{fieldErrors.whatsapp}</p>
                      )}
                    </div>
                  </div>

                  {/* Travel notes / message */}
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-[#0E171A]">
                      Anything else? <span className="text-[#0E171A]/40 font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      maxLength={2000}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Tell us what you have in mind or any special wishes…"
                      className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-[#0E171A]/15 text-sm text-[#0E171A] placeholder-[#0E171A]/40 focus:outline-none focus:border-[#2E7987] transition-colors"
                    />
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="plan-trip-submit-button"
                    className="w-full bg-[#0E171A] hover:bg-[#1C2A2E] active:scale-[0.99] text-[#FAF8F5] py-3.5 rounded-xl font-semibold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-200 shadow-sm cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#3D95A5]" />
                        <span>Sending…</span>
                      </>
                    ) : (
                      <>
                        <span>Send my plan →</span>
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-[#0E171A]/50 mt-2 font-normal">
                    We reply personally by WhatsApp or email · No spam, no obligation
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
