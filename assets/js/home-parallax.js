/**
 * Homepage — hero form validation and motion
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

  function reveal() {
    var nodes = Array.prototype.slice.call(document.querySelectorAll('.hp-reveal'));
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

  function setError(id, message) {
    var field = document.getElementById(id);
    var err = document.querySelector('[data-error-for="' + id + '"]');
    if (!field) return false;
    var invalid = Boolean(message);
    field.classList.toggle('is-error', invalid);
    field.setAttribute('aria-invalid', invalid ? 'true' : 'false');
    if (err) {
      err.hidden = !invalid;
      err.textContent = message || '';
    }
    return !invalid;
  }

  function heroForm() {
    var form = document.getElementById('hp-hero-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (document.getElementById('hp-name') || {}).value || '';
      var email = (document.getElementById('hp-email') || {}).value || '';
      var service = (document.getElementById('hp-service') || {}).value || '';
      var message = (document.getElementById('hp-message') || {}).value || '';
      var ok = true;
      ok = setError('hp-name', name.trim() ? '' : 'Enter your full name.') && ok;
      ok = setError('hp-email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ? '' : 'Enter a valid business email.') && ok;
      ok = setError('hp-service', service ? '' : 'Select a service.') && ok;
      ok = setError('hp-message', message.trim() ? '' : 'Add a short project description.') && ok;
      if (!ok) {
        var first = form.querySelector('.is-error');
        if (first) first.focus();
        return;
      }
      var params = new URLSearchParams({
        name: name.trim(),
        email: email.trim(),
        company: ((document.getElementById('hp-company') || {}).value || '').trim(),
        phone: ((document.getElementById('hp-phone') || {}).value || '').trim(),
        service: service,
        message: message.trim()
      });
      window.location.href = 'pages/contact.html?' + params.toString();
    });
  }

  function boot() {
    parallax('.hp-parallax__bg', 0.16);
    reveal();
    heroForm();
    if (window.AOS) {
      window.AOS.init({ once: true, duration: 700, easing: 'ease-out-cubic', offset: 40 });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
