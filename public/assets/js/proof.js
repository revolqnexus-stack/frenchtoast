/* ─────────────────────────────────────────────────────────────────────────────
   FRENCH TOAST — Social Proof Animation
   Rating counter, star fill, seamless marquee
   ─────────────────────────────────────────────────────────────────────────── */

(function () {
  'use strict';

  const section = document.querySelector('.proof');
  if (!section) return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    section.classList.add('in');
    return;
  }

  // Duplicate cards so the marquee loops seamlessly
  const track = section.querySelector('.proof-track');
  if (track) {
    [...track.children].forEach((li) => {
      const clone = li.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
  }

  // EaseOutExpo for smooth counting
  const ease = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

  function count(el) {
    const end = parseFloat(el.dataset.count);
    const dec = +el.dataset.decimals || 0;
    const t0 = performance.now();
    const dur = 1800;

    (function tick(now) {
      const p = Math.min((now - t0) / dur, 1);
      const v = p === 1 ? end : end * ease(p);
      el.textContent = v.toLocaleString('en-IN', {
        minimumFractionDigits: dec,
        maximumFractionDigits: dec,
      });
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }

  // Trigger on scroll
  const io = new IntersectionObserver(
    ([e]) => {
      if (!e.isIntersecting) return;
      section.classList.add('in');
      section.querySelectorAll('[data-count]').forEach(count);
      io.disconnect();
    },
    { threshold: 0.35 }
  );
  io.observe(section);
})();
