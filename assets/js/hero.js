// assets/js/hero.js — scroll-driven hero image expand effect
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var section  = document.getElementById('hero-section');
    if (!section) return;

    var imgWrap  = section.querySelector('.hero-img-wrap');
    var heroText = section.querySelector('.hero-text');
    if (!imgWrap || !heroText) return;

    var h1el = heroText.querySelector('h1');
    var pel  = heroText.querySelector('p');

    var rafId = null;
    // Cached offsets (top/bottom of h1..p block relative to hero)
    var topOffset = 0, bottomOffset = 0;

    function measureOffsets() {
      if (!h1el || !pel) return;
      var heroRect = section.getBoundingClientRect();
      var h1Rect   = h1el.getBoundingClientRect();
      var pRect    = pel.getBoundingClientRect();
      topOffset    = h1Rect.top    - heroRect.top;
      bottomOffset = heroRect.bottom - pRect.bottom;
    }

    function lerp(a, b, t) { return a + (b - a) * t; }

    function update() {
      rafId = null;

      if (window.innerWidth < 640) {
        imgWrap.style.cssText = '';
        heroText.style.paddingRight = '';
        return;
      }

      var scrollY = window.scrollY || window.pageYOffset;
      var heroH   = section.offsetHeight;
      var t = Math.max(0, Math.min(1, scrollY / heroH));

      // Width: 38% (right column) → 100% (full bg)
      imgWrap.style.width = lerp(38, 100, t) + '%';

      // Opacity: 1 (column) → 0.15 (faded bg)
      imgWrap.style.opacity = lerp(1, 0.15, t);

      // top: aligns with h1 → 0 (full bg)
      imgWrap.style.top    = lerp(topOffset, 0, t) + 'px';
      // bottom: aligns with end of p → 0 (full bg)
      imgWrap.style.bottom = lerp(bottomOffset, 0, t) + 'px';

      // Border-radius: rounded panel → none
      var r = lerp(10, 0, t);
      imgWrap.style.borderRadius = r + 'px';

      // Text right-padding: leave room for image → 0
      heroText.style.paddingRight = lerp(41, 0, t) + '%';
    }

    function schedule() {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    }

    // Recalculate offsets then update on resize
    window.addEventListener('resize', function () {
      measureOffsets();
      schedule();
    }, { passive: true });

    window.addEventListener('scroll', schedule, { passive: true });

    // Initial render: measure after fonts/layout settle
    requestAnimationFrame(function () {
      measureOffsets();
      update();
    });
  });
})();
