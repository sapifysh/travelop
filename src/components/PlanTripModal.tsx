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
  'Selong Belanak',
  'Kuta Lombok',
  'Gili Trawangan',
  'Gili Meno',
  'Rinjani Mountain',
  'Not sure yet',
];

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
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(['Selong Belanak']);

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

      if (initialDestination) {
        const match = DESTINATION_CHIPS.find(
          (c) => c.toLowerCase() === initialDestination.toLowerCase()
        );
        setSelectedDestinations([match || initialDestination]);
      } else {
        setSelectedDestinations(['Selong Belanak']);
      }

      if (initialPackage) {
        setNotes(`Interested in package: ${initialPackage}`);
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
        return next.length === 0 ? ['Not sure yet'] : next;
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
    if (!email.trim()) {
      errors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(email.trim())) {
      errors.email = 'Please enter a valid email address (e.g. name@example.com).';
    }

    if (!whatsapp.trim()) {
      errors.whatsapp = 'Please enter your WhatsApp or phone number.';
    } else if (whatsapp.trim().replace(/\D/g, '').length < 6) {
      errors.whatsapp = 'Please enter a valid phone number (at least 6 digits).';
    }

    if (!travelDate) {
      errors.travelDate = 'Please select your anticipated travel date.';
    }

    if (!travelers || travelers < 1) {
      errors.travelers = 'Please select at least 1 traveler.';
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setErrorMessage('Please fill in all required fields highlighted below.');
      return false;
    }

    return true;
  };

  // Submit Handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

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

    const fullMessage = notes.trim()
      ? `${notes.trim()}${selectedVehicle || transportChoice === 'need-car' ? ` (Transport: ${carSummary})` : ''}`
      : selectedVehicle || transportChoice === 'need-car'
      ? `Transport: ${carSummary}`
      : 'None';

    const payload: TripInquiryPayload = {
      name: name.trim(),
      email: email.trim(),
      whatsapp: whatsapp.trim(),
      travelDate: travelDate,
      travelers: String(travelers),
      interests: selectedDestinations.length > 0 ? selectedDestinations.join(', ') : 'Not sure yet',
      message: fullMessage,
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

  const directWhatsAppLink = `https://wa.me/6281234567890?text=${encodeURIComponent(
    `Hello FIRST-LOP!%0A%0AI just submitted my Lombok travel plan.%0A• Name: ${name || 'Traveler'}%0A• Email: ${email || '-'}%0A• WhatsApp: ${whatsapp}%0A• Date: ${travelDate || 'Flexible'}%0A• Destination: ${selectedDestinations.join(', ')}%0A• Travelers: ${travelers}%0A• Vehicle: ${vehicleSummaryText}%0A• Notes: ${notes || '-'}`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-[#0A242B]/85 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 12 }}
        transition={{ duration: 0.24, ease: 'easeOut' }}
        className="relative w-full max-w-xl bg-[#FAF7F0] text-[#123B45] rounded-2xl shadow-2xl border border-[#123B45]/15 overflow-hidden my-auto max-h-[92vh] flex flex-col font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-[#123B45]/5 hover:bg-[#123B45]/10 text-[#123B45] flex items-center justify-center transition-colors cursor-pointer z-20"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8">
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
                <div className="w-16 h-16 rounded-full bg-[#4F9DA6]/15 text-[#4F9DA6] mx-auto flex items-center justify-center mb-4 ring-8 ring-[#4F9DA6]/5">
                  <CheckCircle2 className="w-9 h-9 text-[#4F9DA6]" />
                </div>

                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4F9DA6] mb-1">
                  Inquiry Confirmed
                </div>

                <h3 className="font-bold text-2xl sm:text-3xl text-[#123B45] tracking-tight">
                  YOUR JOURNEY STARTS HERE.
                </h3>

                <p className="text-sm sm:text-base text-[#123B45]/75 mt-2 max-w-md mx-auto leading-relaxed">
                  Thank you. We've received your inquiry and our team will be in touch shortly.
                </p>

                {/* Liquid Glass Inquiry Summary Card */}
                <div className="mt-6 p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-[#123B45]/10 max-w-md mx-auto text-left text-xs space-y-2.5 text-[#123B45]/85 shadow-sm">
                  <div className="flex justify-between items-center py-0.5 border-b border-[#123B45]/8">
                    <span className="text-[#123B45]/50 uppercase tracking-wider text-[10px] font-semibold">Traveler</span>
                    <span className="font-semibold text-[#123B45]">{name}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5 border-b border-[#123B45]/8">
                    <span className="text-[#123B45]/50 uppercase tracking-wider text-[10px] font-semibold">Email</span>
                    <span className="font-medium text-[#123B45]">{email}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5 border-b border-[#123B45]/8">
                    <span className="text-[#123B45]/50 uppercase tracking-wider text-[10px] font-semibold">WhatsApp</span>
                    <span className="font-medium text-[#123B45]">{whatsapp}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5 border-b border-[#123B45]/8">
                    <span className="text-[#123B45]/50 uppercase tracking-wider text-[10px] font-semibold">Travel Date</span>
                    <span className="font-medium text-[#123B45]">{travelDate || 'Flexible'}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5 border-b border-[#123B45]/8">
                    <span className="text-[#123B45]/50 uppercase tracking-wider text-[10px] font-semibold">Travelers</span>
                    <span className="font-medium text-[#123B45]">{travelers} {travelers === 1 ? 'guest' : 'guests'}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5 border-b border-[#123B45]/8">
                    <span className="text-[#123B45]/50 uppercase tracking-wider text-[10px] font-semibold">Interests</span>
                    <span className="font-medium text-[#123B45] truncate max-w-[220px]">
                      {selectedDestinations.join(', ')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-0.5">
                    <span className="text-[#123B45]/50 uppercase tracking-wider text-[10px] font-semibold">Transportation</span>
                    <span className="font-medium text-[#123B45]">
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
                    className="w-full sm:w-auto bg-[#123B45] hover:bg-[#0E2E36] text-[#FAF7F0] px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm"
                  >
                    BACK TO FIRST-LOP
                  </button>

                  <a
                    href={directWhatsAppLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-[#123B45] hover:text-[#0E2E36] text-xs font-semibold uppercase tracking-wider px-5 py-3 rounded-full border border-[#123B45]/20 hover:bg-white/60 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#4F9DA6]" />
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
                {/* Header */}
                <div className="pr-8">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F4C95D]" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#123B45]/60">
                      FIRST-LOP Concierge
                    </span>
                  </div>
                  <h2 className="font-bold text-2xl sm:text-3xl text-[#123B45] tracking-tight leading-snug">
                    Tell us your plan.
                  </h2>
                  <p className="text-xs sm:text-sm text-[#123B45]/70 mt-1 font-normal">
                    Share the basics. We’ll take it from there.
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

                {/* 1. WHERE DO YOU WANT TO GO? */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-[#123B45] uppercase tracking-wider">
                    1. Where do you want to go?
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
                              ? 'bg-[#123B45] text-white shadow-xs'
                              : 'bg-white text-[#123B45]/80 border border-[#123B45]/15 hover:border-[#123B45]/40'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 text-[#F4C95D]" />}
                          <span>{chip}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. DATES & TRAVELERS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#123B45] uppercase tracking-wider">
                      2. When are you coming? <span className="text-[#4F9DA6]">*</span>
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
                      className={`w-full bg-white px-3.5 py-2.5 rounded-xl border text-sm text-[#123B45] focus:outline-none transition-colors ${
                        fieldErrors.travelDate
                          ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                          : 'border-[#123B45]/15 focus:border-[#4F9DA6]'
                      }`}
                    />
                    {fieldErrors.travelDate && (
                      <p className="text-[11px] text-red-600 font-medium">{fieldErrors.travelDate}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#123B45] uppercase tracking-wider">
                      3. How many travelers? <span className="text-[#4F9DA6]">*</span>
                    </label>
                    <div
                      className={`flex items-center justify-between bg-white px-3 py-1.5 rounded-xl border transition-colors ${
                        fieldErrors.travelers ? 'border-red-400 bg-red-50/20' : 'border-[#123B45]/15'
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
                        className="w-7 h-7 rounded-lg bg-[#FAF7F0] hover:bg-[#123B45] hover:text-white text-[#123B45] flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
                        aria-label="Decrease travelers"
                      >
                        –
                      </button>
                      <span className="font-semibold text-sm text-[#123B45]">
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
                        className="w-7 h-7 rounded-lg bg-[#FAF7F0] hover:bg-[#123B45] hover:text-white text-[#123B45] flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
                        aria-label="Increase travelers"
                      >
                        +
                      </button>
                    </div>
                    {fieldErrors.travelers && (
                      <p className="text-[11px] text-red-600 font-medium">{fieldErrors.travelers}</p>
                    )}
                  </div>
                </div>

                {/* 4. TRANSPORTATION (Compact, Focused) */}
                <div className="space-y-2 pt-1">
                  <label className="block text-xs font-semibold text-[#123B45] uppercase tracking-wider">
                    4. Transportation
                  </label>

                  {selectedVehicle ? (
                    /* Populated vehicle selected from YOUR RIDE */
                    <div className="p-3.5 rounded-xl bg-white border border-[#123B45]/15 shadow-2xs space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F4C95D]" />
                          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#4F9DA6]">
                            YOUR RIDE
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onNavigateToYourRide();
                          }}
                          className="text-[11px] font-semibold text-[#123B45]/70 hover:text-[#123B45] underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>Change vehicle →</span>
                        </button>
                      </div>

                      <div className="flex items-center justify-between gap-3 pt-0.5">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-10 rounded-lg overflow-hidden bg-[#FAF7F0] border border-[#123B45]/10 shrink-0">
                            <img
                              src={selectedVehicle.image}
                              alt={selectedVehicle.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <p className="text-xs sm:text-sm font-bold text-[#123B45]">
                                {selectedVehicle.name}
                              </p>
                              {selectedVehicle.isFlagship && (
                                <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#123B45]/10 text-[#123B45] px-1.5 py-0.5 rounded">
                                  Signature
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#123B45]/70">
                              From ${selectedVehicle.pricePerDay} / day · Driver, Fuel & Snack Included
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-[11px] font-semibold text-[#123B45] bg-[#FAF7F0] px-2.5 py-1 rounded-full border border-[#123B45]/12 shrink-0">
                          <Check className="w-3 h-3 text-[#F4C95D]" />
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
                              ? 'bg-[#123B45] text-[#FAF7F0] shadow-2xs'
                              : 'bg-white text-[#123B45]/70 border border-[#123B45]/15 hover:border-[#123B45]/40'
                          }`}
                        >
                          {transportChoice === 'none' && <Check className="w-3 h-3 text-[#F4C95D]" />}
                          <span>No car needed</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setTransportChoice('need-car')}
                          className={`py-2.5 px-3.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                            transportChoice === 'need-car'
                              ? 'bg-[#123B45] text-[#FAF7F0] shadow-2xs'
                              : 'bg-white text-[#123B45]/70 border border-[#123B45]/15 hover:border-[#123B45]/40'
                          }`}
                        >
                          {transportChoice === 'need-car' && <Check className="w-3 h-3 text-[#F4C95D]" />}
                          <span>I’d like a car</span>
                        </button>
                      </div>

                      {transportChoice === 'need-car' && (
                        <div className="p-3 rounded-xl bg-white border border-[#123B45]/12 flex items-center justify-between gap-3 text-xs">
                          <span className="text-[#123B45]/70">
                            Want to choose a specific vehicle first?
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              onClose();
                              onNavigateToYourRide();
                            }}
                            className="shrink-0 text-xs font-semibold text-[#123B45] hover:text-[#4F9DA6] underline flex items-center gap-1 cursor-pointer"
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
                  <label className="block text-xs font-semibold text-[#123B45] uppercase tracking-wider">
                    5. Contact Details
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Full Name */}
                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-[#123B45]">
                        Full Name <span className="text-[#4F9DA6]">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Your name"
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
                        className={`w-full bg-white px-3.5 py-2.5 rounded-xl border text-sm text-[#123B45] placeholder-[#123B45]/40 focus:outline-none transition-colors ${
                          fieldErrors.name
                            ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                            : 'border-[#123B45]/15 focus:border-[#4F9DA6]'
                        }`}
                      />
                      {fieldErrors.name && (
                        <p className="text-[11px] text-red-600 font-medium">{fieldErrors.name}</p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div className="space-y-1">
                      <label className="block text-xs font-medium text-[#123B45]">
                        Email Address <span className="text-[#4F9DA6]">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
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
                        className={`w-full bg-white px-3.5 py-2.5 rounded-xl border text-sm text-[#123B45] placeholder-[#123B45]/40 focus:outline-none transition-colors ${
                          fieldErrors.email
                            ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                            : 'border-[#123B45]/15 focus:border-[#4F9DA6]'
                        }`}
                      />
                      {fieldErrors.email && (
                        <p className="text-[11px] text-red-600 font-medium">{fieldErrors.email}</p>
                      )}
                    </div>

                    {/* WhatsApp Number */}
                    <div className="space-y-1 sm:col-span-2">
                      <label className="block text-xs font-medium text-[#123B45]">
                        WhatsApp / Phone <span className="text-[#4F9DA6]">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+62 812..."
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
                        className={`w-full bg-white px-3.5 py-2.5 rounded-xl border text-sm text-[#123B45] placeholder-[#123B45]/40 focus:outline-none transition-colors ${
                          fieldErrors.whatsapp
                            ? 'border-red-400 focus:border-red-500 bg-red-50/20'
                            : 'border-[#123B45]/15 focus:border-[#4F9DA6]'
                        }`}
                      />
                      {fieldErrors.whatsapp && (
                        <p className="text-[11px] text-red-600 font-medium">{fieldErrors.whatsapp}</p>
                      )}
                    </div>
                  </div>

                  {/* Travel notes / message */}
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-[#123B45]">
                      Anything else? <span className="text-[#123B45]/40 font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Tell us what you have in mind or any special wishes…"
                      className="w-full bg-white px-3.5 py-2.5 rounded-xl border border-[#123B45]/15 text-sm text-[#123B45] placeholder-[#123B45]/40 focus:outline-none focus:border-[#4F9DA6] transition-colors"
                    />
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="plan-trip-submit-button"
                    className="w-full bg-[#123B45] hover:bg-[#0E2E36] active:scale-[0.99] text-[#FAF7F0] py-3.5 rounded-xl font-semibold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-200 shadow-sm cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#F4C95D]" />
                        <span>SUBMITTING...</span>
                      </>
                    ) : (
                      <>
                        <span>PLAN MY TRIP →</span>
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-[#123B45]/50 mt-2 font-normal">
                    Direct concierge response on WhatsApp · No spam, no obligation
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
