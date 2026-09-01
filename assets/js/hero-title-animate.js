/**
 * Legacy shim — redirects to global hero-title-animation.js
 * Kept so older page includes do not break.
 */
(function () {
  'use strict';
  if (window.GuudleHeroTitleAnimation) return;
  var base = '';
  try {
    if (typeof window.GuudleSite !== 'undefined' && window.GuudleSite.getBasePath) {
      base = window.GuudleSite.getBasePath();
    } else if (location.pathname.indexOf('/pages/') !== -1) {
      var segments = location.pathname.split('/').filter(Boolean);
      var pagesIndex = segments.indexOf('pages');
      base = '../'.repeat(Math.max(1, segments.length - pagesIndex - 1));
    }
  } catch (e) { /* ignore */ }

  if (!document.querySelector('link[data-hta-css]')) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = base + 'assets/css/hero-title-animation.css';
    link.setAttribute('data-hta-css', '1');
    document.head.appendChild(link);
  }
  if (!document.getElementById('guudle-hta-loader')) {
    var s = document.createElement('script');
    s.id = 'guudle-hta-loader';
    s.src = base + 'assets/js/hero-title-animation.js';
    s.defer = true;
    document.body.appendChild(s);
  }
})();
