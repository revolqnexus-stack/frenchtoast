/* ─────────────────────────────────────────────────────────────────────────────
   FRENCH TOAST — Motion Module v2
   Editorial line reveals · Image reveals · Scroll system · Parallax

   Safety contract (never break these):
   ─────────────────────────────────────────────────────────────────────────────
   1. Content is NEVER permanently hidden. The CSS hidden states for
      .mo-reveal-image images are applied lazily — only after the
      IntersectionObserver callback fires and confirms the element is about to
      animate. If JS errors, elements remain at their natural visible state.

   2. Elements already in the viewport on load are given .mo-in immediately
      via a threshold=0 observer pass, so they never stay clipped.

   3. All effects respect prefers-reduced-motion: animations are skipped
      entirely; elements immediately receive their final visible state.

   4. No layout-thrashing. All DOM reads happen before writes.
      Parallax uses a single rAF + passive scroll listener.
   ─────────────────────────────────────────────────────────────────────────── */

(function () {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Utility: run after fonts are ready ─────────────────────────────────── */
  function whenFontsReady(fn) {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(fn);
    } else {
      requestAnimationFrame(fn);
    }
  }

  /* ── Utility: force a two-frame defer so transitions see before→after ────── */
  function nextPaint(fn) {
    requestAnimationFrame(() => requestAnimationFrame(fn));
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     1. HERO LOAD SEQUENCE  (homepage only)
     Classes applied before fonts ready → hidden states active.
     .mo-ready added to <body> after fonts load → transitions fire.
     ═══════════════════════════════════════════════════════════════════════════ */
  function initHeroSequence() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    if (reducedMotion) {
      // Skip entirely — content already visible without any classes
      return;
    }

    const nav     = document.querySelector('.site-nav');
    const eyebrow = hero.querySelector('.hero-eyebrow');
    const visual  = hero.querySelector('.hero-visual');
    const sub     = hero.querySelector('.hero-sub');
    const actions = hero.querySelector('.hero-actions');
    const meta    = hero.querySelector('.hero-meta');
    const scrollCue = hero.querySelector('.hero-scroll');

    // Apply motion classes (CSS hides them via html.js body:not(.mo-ready) guards)
    if (nav)       nav.classList.add('mo-hero-nav');
    if (eyebrow)   eyebrow.classList.add('mo-hero-eyebrow');
    if (visual)    visual.classList.add('mo-hero-image');
    if (sub)       sub.classList.add('mo-hero-copy');
    if (actions)   actions.classList.add('mo-hero-cta');
    if (meta)      meta.classList.add('mo-hero-meta');
    if (scrollCue) scrollCue.classList.add('mo-hero-meta');

    // Line reveal on headline
    const headline = hero.querySelector('.hero-headline');
    if (headline) applyLineReveal(headline, { baseDelay: 300, autoTrigger: false });

    whenFontsReady(() => {
      nextPaint(() => {
        document.body.classList.add('mo-ready');
        if (headline) nextPaint(() => headline.classList.add('mo-lines-visible'));
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     2. INNER-PAGE HERO ENTRANCE
     ═══════════════════════════════════════════════════════════════════════════ */
  function initPageHeroEntrance() {
    const pageHero = document.querySelector('.page-hero, .menu-page-hero');
    if (!pageHero) return;

    if (reducedMotion) return;

    const h1 = pageHero.querySelector('h1');
    if (h1) applyLineReveal(h1, { baseDelay: 220, autoTrigger: false });

    whenFontsReady(() => {
      nextPaint(() => {
        document.body.classList.add('mo-page-ready');
        if (h1) nextPaint(() => h1.classList.add('mo-lines-visible'));
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     3. LINE REVEAL  (overflow-hidden mask, per editorial line)

     The <br>-split approach handles our markup. Each line gets:
       .mo-line-wrap (overflow:hidden) > .mo-line-inner (translateY + opacity)

     Screen readers get a .sr-only copy of the original HTML.
     ═══════════════════════════════════════════════════════════════════════════ */
  function applyLineReveal(el, options) {
    if (reducedMotion) return;
    if (el.dataset.moLineInit) return;          // idempotent
    el.dataset.moLineInit = '1';

    const opts = Object.assign(
      { baseDelay: 0, staggerMs: 95, autoTrigger: true },
      options
    );

    const originalHTML = el.innerHTML;

    // Preserve the accessible text first
    const srSpan = document.createElement('span');
    srSpan.className = 'sr-only';
    srSpan.innerHTML = originalHTML;

    // Split on <br> tags
    const rawLines = originalHTML
      .split(/<br\s*\/?>/i)
      .map(s => s.trim())
      .filter(Boolean);

    el.innerHTML = '';

    rawLines.forEach((lineHTML, i) => {
      const wrap = document.createElement('span');
      wrap.className = 'mo-line-wrap';
      wrap.setAttribute('aria-hidden', 'true');

      const inner = document.createElement('span');
      inner.className = 'mo-line-inner';
      inner.innerHTML = lineHTML;
      inner.style.setProperty('--mo-line-delay', (opts.baseDelay + i * opts.staggerMs) + 'ms');

      wrap.appendChild(inner);
      el.appendChild(wrap);

      // Spacer between lines so reflowing text stays sane
      if (i < rawLines.length - 1) el.appendChild(document.createTextNode('\u00A0'));
    });

    el.appendChild(srSpan);

    if (opts.autoTrigger) observeLineReveal(el);
  }

  function observeLineReveal(el) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('mo-lines-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -30px 0px' });
    obs.observe(el);
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     4. SECTION HEADLINE LINE REVEALS  (selective scroll-triggered)
     ═══════════════════════════════════════════════════════════════════════════ */
  function initSectionHeadlineReveals() {
    if (reducedMotion) return;

    document.querySelectorAll([
      '.signatures-headline',
      '.about-nook-headline',
      '.about-story-text h2',
      '.story-teaser-content h2',
      '.menu-preview-text h2',
      '.cta-close-headline',
      '.moment-quote',
      '.visit-details h2',
      '.order-intro h2',
      '.contact-form-col h2',
    ].join(', ')).forEach(el => {
      // moment-quote gets slower, weightier stagger
      const isMoment = el.classList.contains('moment-quote');
      applyLineReveal(el, {
        baseDelay:  0,
        staggerMs:  isMoment ? 130 : 95,
        autoTrigger: true,
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     5. SCROLL REVEAL — SAFE IMAGE REVEALS
     ─────────────────────────────────────────────────────────────────────────
     KEY SAFETY RULE: We do NOT apply CSS hidden states in advance.
     The sequence is:
       a) Mark elements with .mo-reveal-image (just sets overflow:hidden +
          position:relative; images stay fully visible)
       b) When IO fires → add .mo-reveal-armed (applies clip-path initial state)
          → nextPaint → add .mo-in (triggers the CSS transition to revealed)
       c) Elements in the viewport on load get .mo-in within the same rAF burst.
     This means a JS error after step (a) but before (b) leaves images visible.
     ═══════════════════════════════════════════════════════════════════════════ */
  function initImageReveals() {
    if (reducedMotion) {
      // Just mark them — no animation needed
      document.querySelectorAll([
        '.dish-card .img-frame',
        '.story-teaser-img .img-frame',
        '.about-opening-image .img-frame',
        '.about-story-image .img-frame',
        '.menu-preview-image .img-frame',
        '.order-cta-img .img-frame',
      ].join(', ')).forEach(el => el.classList.add('mo-reveal-image', 'mo-in'));
      return;
    }

    const targets = document.querySelectorAll([
      '.dish-card .img-frame',
      '.story-teaser-img .img-frame',
      '.about-opening-image .img-frame',
      '.about-story-image .img-frame',
      '.menu-preview-image .img-frame',
      '.order-cta-img .img-frame',
    ].join(', '));

    targets.forEach(el => {
      if (!el.classList.contains('mo-reveal-image')) {
        el.classList.add('mo-reveal-image');
      }
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     6. UNIFIED SCROLL-REVEAL OBSERVER
     Handles .mo-reveal-up, .mo-reveal-image, .mo-reveal-stagger, .collage,
     .gallery-tile, .mo-rule-reveal.

     For .mo-reveal-image elements the "arm then reveal" two-step is used
     to guarantee images are visible before the clip state is applied.
     ═══════════════════════════════════════════════════════════════════════════ */
  function initScrollReveals() {
    if (reducedMotion) {
      document.querySelectorAll([
        '.mo-reveal-up', '.mo-reveal-image', '.mo-reveal-stagger',
        '.collage', '.gallery-tile', '.mo-rule-reveal',
      ].join(', ')).forEach(el => el.classList.add('mo-in'));
      return;
    }

    const selectors = [
      '.mo-reveal-up',
      '.mo-reveal-image',
      '.mo-reveal-stagger',
      '.collage',
      '.gallery-tile',
      '.mo-rule-reveal',
    ];

    const elements = document.querySelectorAll(selectors.join(', '));
    if (!elements.length) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;

        if (el.classList.contains('mo-reveal-image')) {
          // Two-step: arm (apply initial hidden state) then on next paint reveal
          el.classList.add('mo-reveal-armed');
          nextPaint(() => {
            el.classList.add('mo-in');
            revealFloatLabel(el);
          });
        } else {
          el.classList.add('mo-in');
        }

        observer.unobserve(el);
      });
    }, {
      threshold: 0.06,
      rootMargin: '0px 0px -44px 0px',
    });

    elements.forEach(el => observer.observe(el));
  }

  /* Helper: reveal the story float label when its sibling image reveals */
  function revealFloatLabel(imgFrame) {
    // Float label is a sibling of the .about-story-image container
    const parent = imgFrame.closest('.about-story-image');
    if (!parent) return;
    const label = parent.querySelector('.story-float-label');
    if (label) {
      // Small extra delay so it trails the image
      setTimeout(() => {
        label.style.opacity = '1';
        label.style.transform = 'translateY(0)';
      }, 420);
    }
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     7. GALLERY TILES  (stagger indices + scroll reveal)
     ═══════════════════════════════════════════════════════════════════════════ */
  function initGalleryStagger() {
    document.querySelectorAll('.gallery-tile').forEach((tile, i) => {
      tile.style.setProperty('--mo-tile-delay', Math.min(i * 55, 380) + 'ms');
    });
  }

  function initGalleryTileDetails() {
    document.querySelectorAll('.gallery-tile[data-category]').forEach((tile, i) => {
      const img = tile.querySelector('img');
      if (!img) return;

      // Index badge
      const idx = document.createElement('span');
      idx.className = 'gallery-tile-index';
      idx.setAttribute('aria-hidden', 'true');
      idx.textContent = String(i + 1).padStart(2, '0');
      tile.appendChild(idx);

      // Caption overlay
      const cap = document.createElement('span');
      cap.className = 'gallery-tile-caption';
      cap.setAttribute('aria-hidden', 'true');
      cap.textContent = img.alt;
      tile.appendChild(cap);
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     8. LIGHTBOX  (prev/next keyboard navigation)
     ═══════════════════════════════════════════════════════════════════════════ */
  function initLightboxNavigation() {
    const lightbox = document.getElementById('lightbox');
    const lbImg    = document.getElementById('lightbox-img');
    if (!lightbox || !lbImg) return;

    const tileImgs = Array.from(
      document.querySelectorAll('.gallery-tile[data-category] img')
    );
    if (tileImgs.length < 2) return;

    let currentIdx = 0;

    // Inject prev / next buttons
    const prev = document.createElement('button');
    prev.className = 'lightbox-prev';
    prev.setAttribute('aria-label', 'Previous image');
    prev.innerHTML = '&#8592;';

    const next = document.createElement('button');
    next.className = 'lightbox-next';
    next.setAttribute('aria-label', 'Next image');
    next.innerHTML = '&#8594;';

    lightbox.appendChild(prev);
    lightbox.appendChild(next);

    // Track opening tile
    tileImgs.forEach((img, i) => {
      img.closest('.gallery-tile')?.addEventListener('click', () => {
        currentIdx = i;
      });
    });

    function navigate(dir) {
      currentIdx = (currentIdx + dir + tileImgs.length) % tileImgs.length;
      const img = tileImgs[currentIdx];

      lbImg.style.opacity = '0';
      lbImg.style.transform = 'translateY(6px) scale(0.97)';

      setTimeout(() => {
        lbImg.src = img.src.replace(/w=\d+/, 'w=1400');
        lbImg.alt = img.alt;
        lbImg.style.opacity = '1';
        lbImg.style.transform = 'translateY(0) scale(1)';
      }, 200);
    }

    prev.addEventListener('click', e => { e.stopPropagation(); navigate(-1); });
    next.addEventListener('click', e => { e.stopPropagation(); navigate(1); });

    document.addEventListener('keydown', e => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'ArrowLeft')  navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     9. PARALLAX  (moment section + hero bg — desktop only, single rAF loop)
     ═══════════════════════════════════════════════════════════════════════════ */
  function initParallax() {
    if (reducedMotion)          return;
    if (window.innerWidth <= 768) return;

    const momentBg = document.querySelector('.moment-bg img');
    const heroBg   = document.querySelector('.hero-visual img');

    if (!momentBg && !heroBg) return;

    if (momentBg) momentBg.closest('.moment-bg')?.classList.add('mo-parallax');
    if (heroBg)   heroBg.classList.add('mo-parallax');

    // Initial scale so parallax travel doesn't expose gaps
    if (momentBg) momentBg.style.transform = 'translateY(0) scale(1.06)';
    if (heroBg)   heroBg.style.transform   = 'translateY(0) scale(1.06)';

    let ticking = false;

    function tick() {
      const scrollY = window.scrollY;

      if (momentBg) {
        const section = momentBg.closest('.moment');
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const progress = (window.innerHeight - rect.top) /
                             (window.innerHeight + rect.height);
            const offset = (progress - 0.5) * 56;
            momentBg.style.transform =
              `translateY(${offset.toFixed(1)}px) scale(1.06)`;
          }
        }
      }

      if (heroBg) {
        const heroSection = heroBg.closest('.hero');
        if (heroSection && scrollY < heroSection.offsetHeight) {
          const offset = scrollY * 0.16;
          heroBg.style.transform =
            `translateY(${offset.toFixed(1)}px) scale(1.06)`;
        }
      }

      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(tick); ticking = true; }
    }, { passive: true });

    tick();
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     10. SECTION EYEBROW REVEALS
     ═══════════════════════════════════════════════════════════════════════════ */
  function initEyebrowReveals() {
    if (reducedMotion) return;
    document.querySelectorAll('.section-eyebrow').forEach(el => {
      if (!el.classList.contains('mo-reveal-up')) {
        el.classList.add('mo-reveal-up');
      }
    });
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     11. MENU CATEGORY REVEALS  (dynamically rendered content)
     ═══════════════════════════════════════════════════════════════════════════ */
  function initMenuCategoryReveals() {
    if (reducedMotion) return;

    const menuRoot = document.getElementById('menu-root');
    if (!menuRoot) return;

    const mutObs = new MutationObserver(() => {
      menuRoot.querySelectorAll('.menu-category-section:not(.mo-observed)')
        .forEach((section, i) => {
          section.classList.add('mo-observed', 'mo-reveal-up');
          section.style.setProperty('--mo-tile-delay', (i * 55) + 'ms');
        });

      // Re-observe newly added elements
      initScrollReveals();
    });

    mutObs.observe(menuRoot, { childList: true, subtree: false });
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     12. MODAL POLISH  (staggered info children on open)
     ═══════════════════════════════════════════════════════════════════════════ */
  function initModalPolish() {
    const backdrop = document.getElementById('item-modal-backdrop');
    if (!backdrop) return;

    let lastOpen = false;

    const mutObs = new MutationObserver(() => {
      const isOpen = backdrop.classList.contains('open');
      if (!isOpen || lastOpen) { lastOpen = isOpen; return; }
      lastOpen = true;

      if (reducedMotion) return;

      const info = backdrop.querySelector('.item-modal-info');
      if (!info) return;

      info.querySelectorAll('h2, .item-modal-price, .item-modal-desc, .item-modal-tags, .btn')
        .forEach((child, i) => {
          child.style.cssText = `
            opacity: 0;
            transform: translateY(10px);
            transition: opacity 360ms ease ${70 + i * 50}ms,
                        transform 400ms cubic-bezier(0.16,1,0.3,1) ${70 + i * 50}ms;
          `;
          nextPaint(() => {
            child.style.opacity = '1';
            child.style.transform = 'translateY(0)';
          });
        });
    });

    mutObs.observe(backdrop, { attributes: true, attributeFilter: ['class'] });
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     INIT
     ═══════════════════════════════════════════════════════════════════════════ */
  function init() {
    initHeroSequence();
    initPageHeroEntrance();
    initSectionHeadlineReveals();
    initImageReveals();
    initEyebrowReveals();
    initScrollReveals();   // must run after initImageReveals + initEyebrowReveals
    initParallax();
    initGalleryStagger();
    initGalleryTileDetails();
    initLightboxNavigation();
    initMenuCategoryReveals();
    initModalPolish();

    // Hard failsafe: if any line-reveal or scroll-reveal hasn't fired within
    // 3 seconds (e.g. IntersectionObserver threshold never crossed), force
    // everything visible so content is never permanently hidden.
    setTimeout(() => {
      document.querySelectorAll(
        '[data-mo-line-init]:not(.mo-lines-visible)'
      ).forEach(el => el.classList.add('mo-lines-visible'));

      document.querySelectorAll(
        '.mo-reveal-up:not(.mo-in), .mo-reveal-image:not(.mo-in), ' +
        '.mo-reveal-stagger:not(.mo-in), .collage:not(.mo-in), ' +
        '.gallery-tile:not(.mo-in)'
      ).forEach(el => {
        el.classList.add('mo-reveal-armed', 'mo-in');
      });
    }, 3000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
