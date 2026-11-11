import { gsap } from 'gsap';

let motionContext: gsap.Context | null = null;
let tiltAbortController: AbortController | null = null;

export function cleanupCyberAnimations() {
  if (tiltAbortController) {
    tiltAbortController.abort();
    tiltAbortController = null;
  }
  if (motionContext) {
    motionContext.revert();
    motionContext = null;
  }
}

export function initCyberAnimations() {
  cleanupCyberAnimations();

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const heroItems = document.querySelectorAll<HTMLElement>('.hero-stagger-item');
  const categoryCards = document.querySelectorAll<HTMLElement>('.category-stagger-card');

  if (prefersReduced) {
    heroItems.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    categoryCards.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  tiltAbortController = new AbortController();
  const { signal } = tiltAbortController;

  motionContext = gsap.context(() => {
    // 1. Hero Stagger Entrance Animation (transform + opacity only, compositor-friendly)
    if (heroItems.length > 0) {
      gsap.fromTo(
        heroItems,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.05,
          ease: 'power3.out',
          clearProps: 'transform',
        }
      );
    }

    // 2. Interactive 3D Holographic Card Tilt with Neon Cursor Spotlight
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (canHover) {
      const tiltCards = document.querySelectorAll<HTMLElement>('.bento-card, .cyber-tilt-card');
      tiltCards.forEach((card) => {
        if (!card.querySelector('.card-spotlight-layer')) {
          const shine = document.createElement('div');
          shine.className =
            'card-spotlight-layer pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 rounded-2xl z-0';
          shine.style.background =
            'radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(69, 242, 180, 0.12), transparent 70%)';
          if (getComputedStyle(card).position === 'static') {
            card.style.position = 'relative';
          }
          card.appendChild(shine);
        }

        let rect: DOMRect | null = null;
        let rafId = 0;

        card.addEventListener(
          'mouseenter',
          () => {
            rect = card.getBoundingClientRect();
            const shine = card.querySelector<HTMLElement>('.card-spotlight-layer');
            if (shine) shine.style.opacity = '1';
          },
          { signal }
        );

        card.addEventListener(
          'mousemove',
          (e) => {
            if (!rect) rect = card.getBoundingClientRect();
            if (rafId) return;

            const clientX = e.clientX;
            const clientY = e.clientY;

            rafId = requestAnimationFrame(() => {
              rafId = 0;
              if (!rect) return;
              const x = clientX - rect.left;
              const y = clientY - rect.top;
              const centerX = rect.width / 2 || 1;
              const centerY = rect.height / 2 || 1;

              const rotateX = ((y - centerY) / centerY) * -3.5;
              const rotateY = ((x - centerX) / centerX) * 3.5;

              card.style.setProperty('--mouse-x', `${x}px`);
              card.style.setProperty('--mouse-y', `${y}px`);

              gsap.to(card, {
                rotateX,
                rotateY,
                transformPerspective: 1000,
                scale: 1.01,
                duration: 0.25,
                ease: 'power2.out',
                overwrite: 'auto',
              });
            });
          },
          { signal }
        );

        card.addEventListener(
          'mouseleave',
          () => {
            rect = null;
            if (rafId) {
              cancelAnimationFrame(rafId);
              rafId = 0;
            }
            const shine = card.querySelector<HTMLElement>('.card-spotlight-layer');
            if (shine) shine.style.opacity = '0';

            gsap.to(card, {
              rotateX: 0,
              rotateY: 0,
              scale: 1,
              duration: 0.35,
              ease: 'power3.out',
              overwrite: 'auto',
            });
          },
          { signal }
        );
      });
    }

    // 3. Stagger reveal on category cards
    if (categoryCards.length > 0) {
      gsap.fromTo(
        categoryCards,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.06,
          ease: 'power2.out',
          clearProps: 'transform',
        }
      );
    }
  });
}
