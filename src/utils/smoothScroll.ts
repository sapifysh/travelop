import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function setLenis(instance: Lenis | null): void {
  lenisInstance = instance;
}

export interface ScrollToOptions {
  offset?: number;
  duration?: number;
  immediate?: boolean;
}

/**
 * Perform an ultra-smooth 90fps+ inertial scroll to a target element or selector
 */
export function scrollToTarget(
  target: string | HTMLElement | number,
  options: ScrollToOptions = {}
): void {
  const { offset = -80, duration = 1.35, immediate = false } = options;

  if (lenisInstance) {
    lenisInstance.scrollTo(target, {
      offset: typeof target === 'number' ? 0 : offset,
      duration,
      immediate,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    return;
  }

  // Graceful browser fallback if Lenis hasn't mounted yet
  if (typeof target === 'number') {
    window.scrollTo({
      top: target,
      behavior: immediate ? 'auto' : 'smooth',
    });
    return;
  }

  const element =
    typeof target === 'string'
      ? document.getElementById(target.replace(/^#/, '')) || document.querySelector(target)
      : target;

  if (element && element instanceof HTMLElement) {
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const targetY = elementPosition + offset;

    window.scrollTo({
      top: targetY,
      behavior: immediate ? 'auto' : 'smooth',
    });
  }
}
