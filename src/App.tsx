import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experiences from './components/Experiences';
import Packages from './components/Packages';
import YourRide from './components/YourRide';
import About from './components/About';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

import PlanTripModal from './components/PlanTripModal';
import DestinationModal from './components/DestinationModal';
import PackageModal from './components/PackageModal';

import LombokPrivateTours from './pages/LombokPrivateTours';

import { Destination, Experience, TravelPackage, VehicleOption } from './types';
import { DESTINATIONS } from './data/content';

export default function App() {
  // Client-side route detection
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Modal state managers
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);

  // Vehicle selection state shared across Journey A and Journey B
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleOption | null>(null);

  // Pre-fill parameters for the plan modal
  const [planInitialDestination, setPlanInitialDestination] = useState<string | undefined>(undefined);
  const [planInitialPackage, setPlanInitialPackage] = useState<string | undefined>(undefined);

  const handleOpenPlanModal = (destId?: string, pkgName?: string, vehicle?: VehicleOption) => {
    setPlanInitialDestination(destId);
    setPlanInitialPackage(pkgName);
    if (vehicle) {
      setSelectedVehicle(vehicle);
    }
    setIsPlanModalOpen(true);
  };

  const handleClosePlanModal = () => {
    setIsPlanModalOpen(false);
    setPlanInitialDestination(undefined);
    setPlanInitialPackage(undefined);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleNavigateToYourRide = () => {
    setIsPlanModalOpen(false);
    // Smooth scroll to YOUR RIDE section
    setTimeout(() => {
      scrollToSection('your-ride');
    }, 100);
  };

  const handleSelectDestinationFast = (destinationId: string) => {
    const target = DESTINATIONS.find((d) => d.id === destinationId);
    if (target) {
      setSelectedDestination(target);
    } else {
      scrollToSection('experiences');
    }
  };

  const handlePlanExperience = (exp: Experience) => {
    handleOpenPlanModal(undefined, `Experience: ${exp.title} (${exp.category})`);
  };

  const handleSelectPackageForPlanning = (pkg: TravelPackage) => {
    handleOpenPlanModal(undefined, pkg.name);
  };

  const isLombokPrivateTours =
    currentPath === '/lombok-private-tours' ||
    currentPath === '/lombok-private-tours/' ||
    (typeof window !== 'undefined' &&
      (window.location.pathname === '/lombok-private-tours' ||
        window.location.pathname === '/lombok-private-tours/'));

  if (isLombokPrivateTours) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] text-[#123B45] selection:bg-[#123B45]/20 selection:text-[#123B45] overflow-x-hidden">
        <LombokPrivateTours
          onNavigateHome={() => handleNavigate('/')}
          onOpenPlanModal={handleOpenPlanModal}
        />
        <PlanTripModal
          isOpen={isPlanModalOpen}
          onClose={handleClosePlanModal}
          initialDestination={planInitialDestination}
          initialPackage={planInitialPackage}
          selectedVehicle={selectedVehicle}
          onSelectVehicle={setSelectedVehicle}
          onNavigateToYourRide={() => {
            setIsPlanModalOpen(false);
            handleNavigate('/');
            setTimeout(() => scrollToSection('your-ride'), 200);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#123B45] selection:bg-[#123B45]/20 selection:text-[#123B45] overflow-x-hidden">
      {/* Editorial Transparent Overlay Navigation */}
      <Navbar onOpenPlanModal={() => handleOpenPlanModal()} />

      {/* Main Content */}
      <main id="main-content">
        {/* Hero Section */}
        <Hero
          onExploreLombok={() => scrollToSection('experiences')}
          onViewExperiences={() => scrollToSection('experiences')}
          onSelectDestinationFast={handleSelectDestinationFast}
        />

        {/* Experiences Section (What to do) */}
        <Experiences onPlanExperience={handlePlanExperience} />

        {/* Packages Section */}
        <Packages
          onSelectPackage={handleSelectPackageForPlanning}
          onViewItinerary={(pkg) => setSelectedPackage(pkg)}
        />

        {/* YOUR RIDE Dedicated Vehicle Experience (How to get around) */}
        <YourRide
          selectedVehicle={selectedVehicle}
          onSelectVehicle={setSelectedVehicle}
          onContinueToPlan={(vehicle) =>
            handleOpenPlanModal(undefined, undefined, vehicle || selectedVehicle || undefined)
          }
        />

        {/* Dedicated Editorial About FIRST-LOP Section */}
        <About />

        {/* Final CTA Banner */}
        <FinalCTA onPlanTrip={() => handleOpenPlanModal()} />
      </main>

      {/* Footer */}
      <Footer onOpenPlanModal={() => handleOpenPlanModal()} />

      {/* Interactive Modals */}
      <PlanTripModal
        isOpen={isPlanModalOpen}
        onClose={handleClosePlanModal}
        initialDestination={planInitialDestination}
        initialPackage={planInitialPackage}
        selectedVehicle={selectedVehicle}
        onSelectVehicle={setSelectedVehicle}
        onNavigateToYourRide={handleNavigateToYourRide}
      />

      <DestinationModal
        destination={selectedDestination}
        onClose={() => setSelectedDestination(null)}
        onPlanForDestination={(destId) => handleOpenPlanModal(destId)}
      />

      <PackageModal
        pkg={selectedPackage}
        onClose={() => setSelectedPackage(null)}
        onSelectPackage={handleSelectPackageForPlanning}
      />
    </div>
  );
}
