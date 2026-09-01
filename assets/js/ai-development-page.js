/**
 * AI Development page — up-slider parallax + reveal + FAQ
 */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mobile = window.matchMedia('(max-width: 900px)').matches;

  function parallaxUp(selector, factor) {
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
          // Negative Y = slide upward as section rises through viewport
          el.style.transform = 'translate3d(0, ' + offset + 'px, 0) scale(1.12)';
        });
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function reveal(selector) {
    var nodes = Array.prototype.slice.call(document.querySelectorAll(selector));
    if (!nodes.length) return;
    document.documentElement.classList.add('aid-page--reveal');
    var page = document.querySelector('.aid-page');
    if (page) page.classList.add('aid-page--reveal');
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
      { threshold: 0.08, rootMargin: '0px 0px -4% 0px' }
    );
    nodes.forEach(function (n, i) {
      n.style.transitionDelay = (i % 4) * 0.06 + 's';
      io.observe(n);
      // Already in view on load
      var r = n.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92 && r.bottom > 0) {
        n.classList.add('is-in');
        io.unobserve(n);
      }
    });
  }

  function tabs() {
    document.querySelectorAll('[data-aid-tabs]').forEach(function (root) {
      var tabs = Array.prototype.slice.call(root.querySelectorAll('[data-aid-tab]'));
      var panels = Array.prototype.slice.call(root.querySelectorAll('[data-aid-panel]'));
      if (!tabs.length || !panels.length) return;

      function activate(id) {
        tabs.forEach(function (tab) {
          var on = tab.getAttribute('data-aid-tab') === id;
          tab.classList.toggle('is-active', on);
          tab.setAttribute('aria-selected', on ? 'true' : 'false');
          tab.setAttribute('tabindex', on ? '0' : '-1');
        });
        panels.forEach(function (panel) {
          var on = panel.getAttribute('data-aid-panel') === id;
          panel.classList.toggle('is-active', on);
          panel.hidden = !on;
        });
      }

      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          activate(tab.getAttribute('data-aid-tab'));
        });
        tab.addEventListener('keydown', function (e) {
          var i = tabs.indexOf(tab);
          if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
            e.preventDefault();
            var next = e.key === 'ArrowRight'
              ? tabs[(i + 1) % tabs.length]
              : tabs[(i - 1 + tabs.length) % tabs.length];
            next.focus();
            activate(next.getAttribute('data-aid-tab'));
          }
        });
      });
    });
  }

  function faq() {
    document.querySelectorAll('[data-aid-faq]').forEach(function (root) {
      var items = Array.prototype.slice.call(root.querySelectorAll('[data-aid-faq-item]'));
      items.forEach(function (item) {
        var btn = item.querySelector('[data-aid-faq-btn]');
        if (!btn) return;
        btn.addEventListener('click', function () {
          var open = item.classList.contains('is-open');
          items.forEach(function (other) {
            other.classList.remove('is-open');
            var b = other.querySelector('[data-aid-faq-btn]');
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
    parallaxUp('.aid-hero__layer--1', 0.22);
    parallaxUp('.aid-upslide__track', 0.16);
    parallaxUp('.aid-cta__bg', 0.14);
    reveal('.aid-svc-card');
    reveal('.aid-life__item');
    tabs();
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
