/* ─────────────────────────────────────────────────────────────────────────────
   FRENCH TOAST — GSAP Motion System
   Lenis smooth scroll, ScrollTrigger reveals, parallax, magnetic buttons
   ─────────────────────────────────────────────────────────────────────────── */

(function () {
  'use strict';

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || typeof Lenis === 'undefined') {
    console.warn('GSAP, ScrollTrigger, or Lenis not loaded');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    // ── Lenis Smooth Scroll ────────────────────────────────────────────────
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true,
      smoothTouch: false, // disable on touch devices for better performance
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Stop scroll when drawer/modal opens
    const drawer = document.getElementById('nav-drawer');
    const modalBackdrop = document.getElementById('item-modal-backdrop');

    if (drawer) {
      const observer = new MutationObserver(() => {
        const isOpen = drawer.classList.contains('open');
        isOpen ? lenis.stop() : lenis.start();
      });
      observer.observe(drawer, { attributes: true, attributeFilter: ['class'] });
    }

    if (modalBackdrop) {
      const observer = new MutationObserver(() => {
        const isOpen = modalBackdrop.classList.contains('open');
        isOpen ? lenis.stop() : lenis.start();
      });
      observer.observe(modalBackdrop, { attributes: true, attributeFilter: ['class'] });
    }

    // ── Image Reveals: clip-path wipe + inner zoom-out ─────────────────────
    gsap.utils.toArray('.img-frame').forEach((frame) => {
      const img = frame.querySelector('img');
      if (!img) return;

      const st = { trigger: frame, start: 'top 85%', once: true };

      // Frame: clip-path wipe from bottom
      gsap.fromTo(
        frame,
        { clipPath: 'inset(0 0 100% 0)' },
        {
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: st,
        }
      );

      // Image: scale down from 1.25 → 1
      gsap.fromTo(
        img,
        { scale: 1.25 },
        {
          scale: 1,
          duration: 1.6,
          ease: 'power3.out',
          scrollTrigger: st,
        }
      );
    });

    // ── Parallax: add data-parallax to big images ──────────────────────────
    gsap.utils.toArray('[data-parallax]').forEach((el) => {
      gsap.to(el, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          scrub: true,
          start: 'top bottom',
          end: 'bottom top',
        },
      });
    });

    // ── Magnetic Buttons ───────────────────────────────────────────────────
    const magneticBtns = gsap.utils.toArray('.btn--primary, .btn--light');

    magneticBtns.forEach((btn) => {
      const handleMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.3;
        const deltaY = (e.clientY - centerY) * 0.3;

        gsap.to(btn, {
          x: deltaX,
          y: deltaY,
          duration: 0.4,
          ease: 'power2.out',
        });
      };

      const handleLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.5)',
        });
      };

      btn.addEventListener('mousemove', handleMove);
      btn.addEventListener('mouseleave', handleLeave);
    });

    // ── Split-line Headline Reveal (hero only) ─────────────────────────────
    const heroHeadline = document.querySelector('.hero-headline');
    if (heroHeadline && !heroHeadline.querySelector('.mo-line-wrap')) {
      const text = heroHeadline.innerHTML;
      const lines = text.split('<br>');
      
      heroHeadline.innerHTML = lines
        .map((line) => `<span class="mo-line-wrap"><span class="mo-line-inner">${line}</span></span>`)
        .join('');

      // Animate lines with stagger
      gsap.fromTo(
        '.hero-headline .mo-line-inner',
        {
          y: 80,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.15,
          delay: 0.3,
        }
      );
    }

    // ── Dish Card Hover: Custom Cursor ─────────────────────────────────────
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.textContent = 'View';
    cursor.style.cssText = `
      position: fixed;
      pointer-events: none;
      z-index: 9999;
      background: var(--espresso);
      color: var(--warm-white);
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.8);
      transition: opacity 0.2s, transform 0.2s;
    `;
    document.body.appendChild(cursor);

    const dishCards = gsap.utils.toArray('.dish-card, .menu-item');

    dishCards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      });

      card.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
      });

      card.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      });
    });

    // Cleanup function
    return () => {
      lenis.destroy();
      cursor.remove();
    };
  });

  // ── Marquee Strip (always runs, respects reduced-motion via CSS) ─────────
  const marqueeContainer = document.createElement('div');
  marqueeContainer.className = 'dish-marquee';
  marqueeContainer.setAttribute('aria-hidden', 'true');
  marqueeContainer.innerHTML = `
    <div class="dish-marquee-track">
      <span>Fresh</span><span>·</span>
      <span>Daily</span><span>·</span>
      <span>Made to order</span><span>·</span>
      <span>Fresh</span><span>·</span>
      <span>Daily</span><span>·</span>
      <span>Made to order</span><span>·</span>
    </div>
  `;

  // Insert marquee after signature dishes section
  const sigSection = document.querySelector('.signatures');
  if (sigSection) {
    sigSection.after(marqueeContainer);
  }

  // Add marquee styles via inline style tag
  const marqueeStyles = document.createElement('style');
  marqueeStyles.textContent = `
    .dish-marquee {
      overflow: hidden;
      padding: var(--sp-8) 0;
      background: var(--espresso);
      color: var(--butter);
    }
    
    .dish-marquee-track {
      display: flex;
      gap: var(--sp-6);
      width: max-content;
      animation: marquee-scroll 40s linear infinite;
      font-family: var(--font-display);
      font-size: var(--text-sm);
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }
    
    @keyframes marquee-scroll {
      to { transform: translateX(-50%); }
    }
    
    @media (prefers-reduced-motion: reduce) {
      .dish-marquee-track { animation: none; }
    }
  `;
  document.head.appendChild(marqueeStyles);
})();
