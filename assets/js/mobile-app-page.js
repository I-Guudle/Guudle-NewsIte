/**
 * Mobile App page — mid-page parallax + phone depth + FAQ + reveal
 */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mobile = window.matchMedia('(max-width: 900px)').matches;

  function parallax(selector, factor) {
    var nodes = Array.prototype.slice.call(document.querySelectorAll(selector));
    if (!nodes.length || reduce || mobile) return;
    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        nodes.forEach(function (el) {
          var parent = el.parentElement;
          if (!parent) return;
          var rect = parent.getBoundingClientRect();
          var mid = rect.top + rect.height * 0.5;
          var offset = (window.innerHeight * 0.5 - mid) * factor;
          el.style.transform = 'translate3d(0, ' + offset + 'px, 0) scale(1.12)';
        });
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function phoneDepth() {
    var stage = document.querySelector('.ma-phones');
    if (!stage || reduce || mobile) return;
    var main = stage.querySelector('.ma-phone--main');
    var left = stage.querySelector('.ma-phone--left');
    var right = stage.querySelector('.ma-phone--right');
    var ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var rect = stage.getBoundingClientRect();
        var mid = rect.top + rect.height * 0.5;
        var p = (window.innerHeight * 0.5 - mid) * 0.08;
        if (main) main.style.transform = 'translate3d(0, ' + p + 'px, 0) rotate(-2deg)';
        if (left) left.style.transform = 'translate3d(0, ' + (24 + p * 1.4) + 'px, 0) rotate(-12deg) scale(0.88)';
        if (right) right.style.transform = 'translate3d(0, ' + (18 - p * 1.2) + 'px, 0) rotate(10deg) scale(0.88)';
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function reveal() {
    var nodes = Array.prototype.slice.call(document.querySelectorAll('.ma-reveal'));
    if (!nodes.length) return;
    if (reduce || !('IntersectionObserver' in window)) {
      nodes.forEach(function (n) { n.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    nodes.forEach(function (n, i) {
      n.style.transitionDelay = (i % 6) * 0.05 + 's';
      io.observe(n);
    });
  }

  function faq() {
    document.querySelectorAll('[data-ma-faq]').forEach(function (root) {
      var items = Array.prototype.slice.call(root.querySelectorAll('[data-ma-faq-item]'));
      items.forEach(function (item) {
        var btn = item.querySelector('[data-ma-faq-btn]');
        if (!btn) return;
        btn.addEventListener('click', function () {
          var open = item.classList.contains('is-open');
          items.forEach(function (other) {
            other.classList.remove('is-open');
            var b = other.querySelector('[data-ma-faq-btn]');
            if (b) b.setAttribute('aria-expanded', 'false');
          });
          if (!open) {
            item.classList.add('is-open');
            btn.setAttribute('aria-expanded', 'true');
          }
        });
      });
    });
  }

  function boot() {
    parallax('.ma-showcase__bg', 0.2);
    parallax('.ma-stats-band__bg', 0.14);
    parallax('.ma-cta__bg', 0.14);
    phoneDepth();
    reveal();
    faq();
    if (window.AOS) {
      window.AOS.init({ once: true, duration: 700, easing: 'ease-out-cubic', offset: 40 });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
