/**
 * Business Outcomes pages — particles, counters, timeline, KPI, FAQ, parallax
 */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function particles(canvas) {
    if (!canvas || reduce) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    var dots = [];
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      var parent = canvas.parentElement;
      var w = parent.clientWidth;
      var h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = Math.min(55, Math.floor((w * h) / 18000));
      dots = [];
      for (var i = 0; i < count; i++) {
        dots.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.8 + 0.4,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
        });
      }
    }

    function draw() {
      var w = canvas.clientWidth;
      var h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(186, 230, 253, 0.55)';
      dots.forEach(function (d) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });
    draw();
  }

  function reveal(sel) {
    var nodes = Array.prototype.slice.call(document.querySelectorAll(sel));
    if (!nodes.length) return;
    if (reduce || !('IntersectionObserver' in window)) {
      nodes.forEach(function (n) { n.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    nodes.forEach(function (n, i) {
      n.style.transitionDelay = (i % 6) * 0.05 + 's';
      io.observe(n);
    });
  }

  function counters() {
    var nodes = Array.prototype.slice.call(document.querySelectorAll('[data-bo-count]'));
    if (!nodes.length) return;

    function animate(el) {
      if (el.getAttribute('data-bo-counted') === '1') return;
      el.setAttribute('data-bo-counted', '1');
      var target = parseFloat(el.getAttribute('data-bo-count') || '0');
      var suffix = el.getAttribute('data-bo-suffix') || '';
      var prefix = el.getAttribute('data-bo-prefix') || '';
      var decimals = parseInt(el.getAttribute('data-bo-decimals') || '0', 10);
      if (reduce) {
        el.textContent = prefix + target.toFixed(decimals) + suffix;
        return;
      }
      var start = performance.now();
      var dur = 1400;
      function frame(now) {
        var t = Math.min(1, (now - start) / dur);
        var eased = 1 - Math.pow(1 - t, 3);
        var val = target * eased;
        el.textContent = prefix + val.toFixed(decimals) + suffix;
        if (t < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    if (!('IntersectionObserver' in window)) {
      nodes.forEach(animate);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          animate(e.target);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });
    nodes.forEach(function (n) {
      io.observe(n);
      var r = n.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        animate(n);
        io.unobserve(n);
      }
    });
  }

  function kpiBars() {
    var fills = Array.prototype.slice.call(document.querySelectorAll('[data-bo-bar]'));
    if (!fills.length) return;
    function run(el) {
      var pct = el.getAttribute('data-bo-bar') || '0';
      el.style.width = pct + '%';
    }
    if (reduce || !('IntersectionObserver' in window)) {
      fills.forEach(run);
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          run(e.target);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    fills.forEach(function (f) { io.observe(f); });
  }

  function faq() {
    document.querySelectorAll('[data-bo-faq]').forEach(function (root) {
      var items = Array.prototype.slice.call(root.querySelectorAll('[data-bo-faq-item]'));
      items.forEach(function (item) {
        var btn = item.querySelector('[data-bo-faq-btn]');
        if (!btn) return;
        btn.addEventListener('click', function () {
          var open = item.classList.contains('is-open');
          items.forEach(function (other) {
            other.classList.remove('is-open');
            var b = other.querySelector('[data-bo-faq-btn]');
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

  function parallaxCta() {
    var bg = document.querySelector('.bo-cta__bg');
    if (!bg || reduce) return;
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var parent = bg.parentElement;
        var rect = parent.getBoundingClientRect();
        var mid = rect.top + rect.height * 0.5;
        var offset = (window.innerHeight * 0.5 - mid) * 0.15;
        bg.style.transform = 'translate3d(0,' + offset + 'px,0) scale(1.12)';
        ticking = false;
      });
    }, { passive: true });
  }

  function boot() {
    particles(document.querySelector('.bo-hero__particles'));
    reveal('.bo-reveal');
    reveal('.bo-timeline__step');
    counters();
    kpiBars();
    faq();
    parallaxCta();
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
