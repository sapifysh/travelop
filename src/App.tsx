import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { setLenis, getLenis, scrollToTarget } from './utils/smoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experiences from './components/Experiences';
import Packages from './components/Packages';
import YourRide from './components/YourRide';
import WhyBookWithUs from './components/WhyBookWithUs';
import About from './components/About';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

import PlanTripModal from './components/PlanTripModal';
import DestinationModal from './components/DestinationModal';
import PackageModal from './components/PackageModal';

import LombokPrivateTours from './pages/LombokPrivateTours';
import SeoLandingPage, { findSeoPage } from './pages/SeoLandingPage';
import { BlogIndexPage, BlogPostPage, findBlogPost, isBlogIndex } from './pages/Blog';

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

  // Initialize Lenis with ultimate creamy lerp physics (signature luxury butter feel)
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.075,
      wheelMultiplier: 1.0,
      syncTouch: true,
      syncTouchLerp: 0.08,
      touchInertiaExponent: 1.85,
      touchMultiplier: 1.2,
      smoothWheel: true,
      infinite: false,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
    });

    setLenis(lenis);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // Arriving from a landing page link such as "/#packages": scroll to that home section.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (window.location.pathname !== '/' || !id) return;
    const t = setTimeout(() => {
      if (document.getElementById(id)) scrollToTarget('#' + id, { offset: -80, duration: 1.15 });
    }, 400);
    return () => clearTimeout(t);
  }, []);

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
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      }
    }
  };

  // Modal state managers
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null);

  // Pause background smooth scroll when modal overlay is active
  useEffect(() => {
    const isModalActive = isPlanModalOpen || !!selectedDestination || !!selectedPackage;
    const lenis = getLenis();
    if (!lenis) return;
    if (isModalActive) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [isPlanModalOpen, selectedDestination, selectedPackage]);

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
    scrollToTarget('#' + id, { offset: -80, duration: 1.15 });
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

  const seoPage = findSeoPage(currentPath);
  const blogPost = findBlogPost(currentPath);
  const blogIndex = isBlogIndex(currentPath);

  if (seoPage || blogPost || blogIndex) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] text-[#123B45] overflow-x-hidden">
        {seoPage && <SeoLandingPage page={seoPage} onNavigate={handleNavigate} onOpenPlanModal={handleOpenPlanModal} />}
        {blogPost && <BlogPostPage post={blogPost} onNavigate={handleNavigate} onOpenPlanModal={handleOpenPlanModal} />}
        {blogIndex && <BlogIndexPage onNavigate={handleNavigate} onOpenPlanModal={handleOpenPlanModal} />}
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
          onSeePackages={() => scrollToSection('packages')}
          onViewExperiences={() => scrollToSection('packages')}
          onSelectDestinationFast={handleSelectDestinationFast}
        />

        {/* Experiences Section (What to do) */}
        <Experiences onPlanExperience={handlePlanExperience} />

        {/* Packages Section */}
        <Packages
          onSelectPackage={handleSelectPackageForPlanning}
          onViewItinerary={(pkg) => setSelectedPackage(pkg)}
        />

        {/* Why travelers book with us (liquid-glass marquee) */}
        <WhyBookWithUs />

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
