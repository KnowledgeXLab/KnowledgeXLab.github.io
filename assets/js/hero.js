// assets/js/hero.js — right-panel → full-screen scroll animation
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var section   = document.getElementById('hero-section');
    if (!section) return;

    var imgWrap   = section.querySelector('.hero-img-wrap');
    var heroInner = section.querySelector('.hero-inner');
    if (!imgWrap || !heroInner) return;

    var h1el  = heroInner.querySelector('h1');
    var pel   = heroInner.querySelector('p');
    var rafId = null;

    function lerp(a, b, t) { return a + (b - a) * t; }

    function update() {
      rafId = null;

      if (window.innerWidth < 640) {
        imgWrap.style.cssText = '';
        section.style.removeProperty('--overlay-opacity');
        return;
      }

      var scrollY = window.scrollY || window.pageYOffset;
      var heroH   = section.offsetHeight;
      var t = Math.max(0, Math.min(1, scrollY / (heroH * 0.10)));

      // Measure actual DOM positions at current zoom level — stays correct at any scale
      var heroRect  = section.getBoundingClientRect();
      var innerRect = heroInner.getBoundingClientRect();
      var vw        = window.innerWidth;

      // right: image aligns with hero-inner's right edge → flush to viewport right
      var rightOffset = heroRect.right - innerRect.right;
      imgWrap.style.right = lerp(rightOffset, 0, t) + 'px';

      // width: 28% of hero-inner actual width → full viewport
      imgWrap.style.width = lerp(innerRect.width * 0.45, vw, t) + 'px';

      // top/bottom: align with h1 top and p bottom → cover full hero
      var h1Top   = h1el ? h1el.getBoundingClientRect().top    - heroRect.top : 0;
      var pBottom = pel  ? heroRect.bottom - pel.getBoundingClientRect().bottom : 0;
      imgWrap.style.top    = lerp(h1Top,    0, t) + 'px';
      imgWrap.style.bottom = lerp(pBottom,  0, t) + 'px';

      // border-radius: all corners rounded when panel → none when full-screen
      var r = lerp(10, 0, t);
      imgWrap.style.borderRadius = r + 'px';

      // overlay fades in for text readability
      section.style.setProperty('--overlay-opacity', t.toFixed(3));
    }

    function schedule() {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    }

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });

    requestAnimationFrame(update);
  });
})();
