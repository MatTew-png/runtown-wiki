import { gsap } from 'gsap';

export function initCyberAnimations() {
  // 1. Hero Stagger Entrance Animation
  const heroItems = document.querySelectorAll('.hero-stagger-item');
  if (heroItems.length > 0) {
    gsap.fromTo(
      heroItems,
      { opacity: 0, y: 25, filter: 'blur(6px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.75,
        stagger: 0.06,
        ease: 'power3.out',
        clearProps: 'filter',
      }
    );
  }

  // 2. Interactive 3D Holographic Card Tilt with Neon Cursor Spotlight
  const tiltCards = document.querySelectorAll<HTMLElement>('.bento-card, .cyber-tilt-card');
  tiltCards.forEach((card) => {
    // Add shine spotlight layer if not present
    if (!card.querySelector('.card-spotlight-layer')) {
      const shine = document.createElement('div');
      shine.className = 'card-spotlight-layer pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 rounded-2xl z-0';
      shine.style.background = 'radial-gradient(350px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(69, 242, 180, 0.12), transparent 70%)';
      card.style.position = 'relative';
      card.appendChild(shine);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Subtle tilt angles (+/- 4 to 5 degrees)
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      const shine = card.querySelector<HTMLElement>('.card-spotlight-layer');
      if (shine) shine.style.opacity = '1';

      gsap.to(card, {
        rotateX,
        rotateY,
        transformPerspective: 1000,
        scale: 1.012,
        duration: 0.28,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    });

    card.addEventListener('mouseleave', () => {
      const shine = card.querySelector<HTMLElement>('.card-spotlight-layer');
      if (shine) shine.style.opacity = '0';

      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    });
  });

  // 3. Dial Gauge Roll-Up on Initial Load (Clean FiveM HUD Roll)
  const brainArc = document.getElementById('brainGaugeArc');
  const brainText = document.getElementById('brainPctText');
  const brainNum = document.getElementById('brainPctNum');
  if (brainArc) {
    const rawText = brainNum?.textContent || brainText?.textContent || '0.0%';
    const targetVal = parseFloat(rawText.replace('%', '')) || 0;
    const targetOffset = 452.39 - (targetVal / 100) * 452.39;

    gsap.fromTo(
      brainArc,
      { strokeDashoffset: 452.39 },
      { strokeDashoffset: targetOffset, duration: 1.2, ease: 'power2.out' }
    );

    const counter = { val: 0 };
    gsap.to(counter, {
      val: targetVal,
      duration: 1.2,
      ease: 'power2.out',
      onUpdate: () => {
        if (brainNum) brainNum.textContent = counter.val.toFixed(1);
        if (brainText) brainText.textContent = `${counter.val.toFixed(1)}%`;
      },
    });
  }

  const foodArc = document.getElementById('foodGaugeArc');
  const foodText = document.getElementById('foodPctText');
  const foodNum = document.getElementById('foodPctNum');
  if (foodArc) {
    const rawText = foodNum?.textContent || foodText?.textContent || '100.0%';
    const targetVal = parseFloat(rawText.replace('%', '')) || 100;
    const targetOffset = 452.39 - (targetVal / 100) * 452.39;

    gsap.fromTo(
      foodArc,
      { strokeDashoffset: 452.39 },
      { strokeDashoffset: targetOffset, duration: 1.3, ease: 'power2.out' }
    );

    const counter = { val: 0 };
    gsap.to(counter, {
      val: targetVal,
      duration: 1.3,
      ease: 'power2.out',
      onUpdate: () => {
        if (foodNum) foodNum.textContent = counter.val.toFixed(1);
        if (foodText) foodText.textContent = `${counter.val.toFixed(1)}%`;
      },
    });
  }

  // 4. Stagger reveal on category cards
  const categoryCards = document.querySelectorAll('.category-stagger-card');
  if (categoryCards.length > 0) {
    gsap.fromTo(
      categoryCards,
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
      }
    );
  }
}
