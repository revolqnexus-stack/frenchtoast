/* ─────────────────────────────────────────────────────────────────────────────
   FRENCH TOAST — Main JS
   Navigation scroll · Mobile drawer · Scroll reveal (legacy .reveal class)
   ─────────────────────────────────────────────────────────────────────────── */

(function () {
  'use strict';

  /* ── Navigation scroll behaviour ─────────────────────────────────────────── */
  const nav = document.querySelector('.site-nav');
  if (nav) {
    const hasTransparent = nav.classList.contains('site-nav--transparent');

    function updateNav() {
      const scrolled = window.scrollY > 40;
      if (hasTransparent) {
        nav.classList.toggle('site-nav--solid',   scrolled);
        nav.classList.toggle('site-nav--on-dark', !scrolled);
      }
    }

    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  /* ── Mobile drawer ────────────────────────────────────────────────────────── */
  const toggle      = document.querySelector('.nav-toggle');
  const drawer      = document.querySelector('.nav-drawer');
  const drawerLinks = document.querySelectorAll('.nav-drawer .drawer-links a, .nav-drawer .drawer-order');

  if (toggle && drawer) {
    // All focusable elements inside the drawer for focus trapping
    function getDrawerFocusable() {
      return Array.from(drawer.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ));
    }

    function openDrawer() {
      drawer.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      const focusable = getDrawerFocusable();
      if (focusable.length) setTimeout(() => focusable[0].focus(), 80);
    }

    function closeDrawer() {
      drawer.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      toggle.focus();
    }

    toggle.addEventListener('click', () => {
      drawer.classList.contains('open') ? closeDrawer() : openDrawer();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
    });

    // Focus trap inside drawer
    drawer.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab' || !drawer.classList.contains('open')) return;
      const focusable = getDrawerFocusable();
      if (!focusable.length) return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
      }
    });

    // Close on backdrop click
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) closeDrawer();
    });

    // Close when a nav link is activated
    document.querySelectorAll('.nav-drawer .drawer-links a').forEach(a => {
      a.addEventListener('click', () => setTimeout(closeDrawer, 80));
    });
  }

  /* ── Legacy .reveal scroll observer (backward-compat) ───────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.10, rootMargin: '0px 0px -44px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
  }

  /* ── Active nav link ──────────────────────────────────────────────────────── */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-drawer .drawer-links a').forEach((a) => {
    const href = a.getAttribute('href');
    if (href === currentPath) a.classList.add('active');
  });

})();
