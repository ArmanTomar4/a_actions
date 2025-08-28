import Lenis from '@studio-freight/lenis'

// Global Lenis instance
let lenis = null;

/**
 * Initialize Lenis smooth scroll - professional grade like alfacharlie.co
 */
export function initializeLenisScroll() {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
  
  return lenis;
}

/**
 * Enhanced smooth scroll using Lenis for ultra-smooth animation
 */
export function smoothScrollTo(target, options = {}) {
  const { duration = 800, align = 'start' } = options;

  if (!lenis) {
    initializeLenisScroll();
  }

  const targetElement = typeof target === "string" ? document.querySelector(target) : target;
  
  if (typeof target === 'number') {
    lenis.scrollTo(target, { duration: duration / 1000, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    return;
  }

  if (targetElement) {
    let offset = 0;
    if (align === 'center') {
      offset = -(window.innerHeight / 2) + (targetElement.offsetHeight / 2);
    }
    // 'start' alignment has an offset of 0, which is the default for lenis.scrollTo

    lenis.scrollTo(targetElement, {
      offset,
      duration: duration / 1000, // Lenis uses seconds
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  }
}

/**
 * Stop smooth scrolling
 */
export function stopScroll() {
  if (lenis) {
    lenis.stop();
  }
}

/**
 * Start smooth scrolling
 */
export function startScroll() {
  if (lenis) {
    lenis.start();
  }
}

/**
 * Initialize smooth scrolling for all anchor links on the page
 * Call this function after component mount or route changes
 */
export function initializeSmoothScrolling(duration = 400) {
  // Add smooth scrolling to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    // Remove existing listeners to prevent duplicates
    anchor.removeEventListener('click', handleSmoothScroll);
    anchor.addEventListener('click', handleSmoothScroll);
  });

  function handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      smoothScrollTo(target, duration);
    }
  }
}

/**
 * Scroll to a specific element by ID
 */
export function scrollToElement(elementId, duration = 400) {
  const target = document.querySelector(elementId);
  if (target) {
    smoothScrollTo(target, duration);
  }
}

/**
 * Scroll to top of page
 */
export function scrollToTop(duration = 400) {
  smoothScrollTo(0, duration);
}
