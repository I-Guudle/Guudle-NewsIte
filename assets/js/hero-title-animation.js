/**
 * hero-title-animation.js
 * Global premium hero title engine — auto-binds .hero-title (+ common hero h1s)
 */
(function () {
  'use strict';

  var HIGHLIGHT = [
    'AI', 'Digital', 'Enterprise', 'Cloud', 'Solutions', 'Business', 'Platform',
    'Platforms', 'Automation', 'Healthcare', 'Analytics', 'Innovation', 'Technology',
    'Transformation', 'Future', 'Intelligence', 'Data', 'Security', 'Growth',
    'Intelligent', 'Customer', 'Operations', 'Scale', 'Modern', 'Global', 'Software',
    'Mobile', 'Commerce', 'FinTech', 'SaaS', 'CRM', 'ERP'
  ];

  var HIGHLIGHT_SET = {};
  HIGHLIGHT.forEach(function (w) {
    HIGHLIGHT_SET[w.toLowerCase()] = true;
  });

  var SELECTORS = [
    'h1.hero-title',
    '.hero-title',
    'h1.hero-title-navy',
    '[data-svc-hero] h1',
    '.bo-hero__title',
    '.corp-hero-title',
    '.ct-hero-title',
    '#svc-hero-heading',
    '#cma-hero-heading',
    '#pf-hero-heading',
    '#oproc-hero-heading',
    '#ct-hero-heading',
    '#bo-hero-heading'
  ].join(',');

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isMobile = window.matchMedia('(max-width: 640px)').matches;
  var isTablet = window.matchMedia('(max-width: 1024px)').matches;

  function hashVariant(str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
    return (Math.abs(h) % 4) + 1;
  }

  function isHighlightWord(word) {
    var clean = word.replace(/[^a-zA-Z0-9+]/g, '');
    return !!HIGHLIGHT_SET[clean.toLowerCase()];
  }

  function wrapCharsInTextNode(textNode, counter, forceHl) {
    var text = textNode.nodeValue;
    if (!text || !text.length) return counter;

    var frag = document.createDocumentFragment();
    var words = text.split(/(\s+)/);

    words.forEach(function (chunk) {
      if (!chunk) return;
      if (/^\s+$/.test(chunk)) {
        var sp = document.createElement('span');
        sp.className = 'hta-char hta-char--space';
        sp.setAttribute('aria-hidden', 'true');
        sp.style.setProperty('--hta-i', String(counter.i++));
        sp.textContent = '\u00A0';
        frag.appendChild(sp);
        return;
      }

      var hl = forceHl || isHighlightWord(chunk);
      for (var c = 0; c < chunk.length; c++) {
        var ch = document.createElement('span');
        ch.className = hl ? 'hta-char hta-char--hl' : 'hta-char';
        ch.textContent = chunk.charAt(c);
        ch.style.setProperty('--hta-i', String(counter.i++));
        frag.appendChild(ch);
      }
    });

    textNode.parentNode.replaceChild(frag, textNode);
    return counter;
  }

  function walk(node, counter, forceHl) {
    if (node.nodeType === Node.TEXT_NODE) {
      wrapCharsInTextNode(node, counter, forceHl);
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    var tag = node.tagName;
    if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'BR') return;

    var accent =
      forceHl ||
      node.classList.contains('hero-title-navy__line') ||
      node.classList.contains('hero-title-navy__line--inline') ||
      node.classList.contains('cpox-accent');

    var children = Array.prototype.slice.call(node.childNodes);
    children.forEach(function (child) {
      walk(child, counter, accent);
    });
  }

  function addDecor(root) {
    if (reduce || isMobile) return;
    var deco = document.createElement('div');
    deco.className = 'hta-deco';
    deco.setAttribute('aria-hidden', 'true');

    var dots = isTablet ? 3 : 5;
    for (var i = 0; i < dots; i++) {
      var d = document.createElement('span');
      d.className = 'hta-deco__dot';
      d.style.left = 8 + i * 18 + '%';
      d.style.top = (i % 2 === 0 ? 12 : 78) + '%';
      d.style.animationDelay = -i * 0.7 + 's';
      deco.appendChild(d);
    }

    var orb1 = document.createElement('span');
    orb1.className = 'hta-deco__orb';
    orb1.style.width = '90px';
    orb1.style.height = '90px';
    orb1.style.left = '-2%';
    orb1.style.top = '10%';
    deco.appendChild(orb1);

    var orb2 = document.createElement('span');
    orb2.className = 'hta-deco__orb';
    orb2.style.width = '70px';
    orb2.style.height = '70px';
    orb2.style.right = '4%';
    orb2.style.bottom = '0%';
    orb2.style.animationDelay = '-2.5s';
    deco.appendChild(orb2);

    var ring = document.createElement('span');
    ring.className = 'hta-deco__ring';
    ring.style.width = '54px';
    ring.style.height = '54px';
    ring.style.right = '12%';
    ring.style.top = '8%';
    deco.appendChild(ring);

    var line = document.createElement('span');
    line.className = 'hta-deco__line';
    line.style.left = '6%';
    line.style.bottom = '18%';
    deco.appendChild(line);

    var geo = document.createElement('span');
    geo.className = 'hta-deco__geo';
    geo.style.left = '72%';
    geo.style.bottom = '22%';
    deco.appendChild(geo);

    root.insertBefore(deco, root.firstChild);
  }

  function prepare(el) {
    if (el.getAttribute('data-hta-ready') === '1') return null;
    el.setAttribute('data-hta-ready', '1');
    el.classList.add('hero-title', 'hta-root');

    // Avoid fighting AOS / enter classes
    el.removeAttribute('data-aos');
    el.removeAttribute('data-aos-delay');
    el.classList.remove('hero-enter', 'hero-enter-d1', 'hero-enter-d2', 'hero-enter-d3', 'aos-init', 'aos-animate');

    var textSample = (el.textContent || '').trim();
    el.setAttribute('data-hta-variant', String(hashVariant(textSample)));

    var parent = el.closest('.bo-hero, .bop-hero, .saas-hero--dark');
    var isLight =
      (parent && getComputedStyle(parent).colorScheme === 'dark') ||
      (parent && parent.classList.contains('bo-hero')) ||
      el.classList.contains('bo-hero__title');
    if (isLight || (parent && /bo-hero|bop-hero/.test(parent.className))) {
      el.classList.add('hta-root--light');
    }

    // Center detection
    var cs = getComputedStyle(el);
    if (cs.textAlign === 'center' || el.classList.contains('text-center') || el.classList.contains('mx-auto')) {
      el.classList.add('hta-center');
    }

    // Move children into inner wrapper for z-index stacking with deco
    var inner = document.createElement('span');
    inner.className = 'hta-inner';
    while (el.firstChild) inner.appendChild(el.firstChild);
    el.appendChild(inner);

    var counter = { i: 0 };
    walk(inner, counter);

    var underline = document.createElement('span');
    underline.className = 'hta-underline';
    underline.setAttribute('aria-hidden', 'true');
    el.appendChild(underline);

    addDecor(el);

    el.classList.add('hta-prepared');
    return { el: el, charCount: counter.i };
  }

  function playIntro(el) {
    if (reduce) {
      el.classList.remove('hta-prepared');
      el.classList.add('hta-animating', 'hta-done');
      return;
    }

    // Force reflow then animate
    void el.offsetWidth;
    el.classList.remove('hta-prepared', 'hta-replay', 'hta-replay-in', 'hta-float');
    el.classList.add('hta-animating');

    var stagger = isMobile ? 12 : isTablet ? 20 : 28;
    var base = isMobile ? 40 : 80;
    var chars = el.querySelectorAll('.hta-char').length;
    var duration = base + chars * stagger + 900;

    window.setTimeout(function () {
      el.classList.add('hta-done');
      el.classList.add('hta-float');
    }, Math.min(duration, 2200));
  }

  function replaySoft(el) {
    if (reduce || el.getAttribute('data-hta-chars-done') !== '1') return;
    el.classList.remove('hta-float', 'hta-replay-in');
    el.classList.add('hta-replay');
    void el.offsetWidth;
    requestAnimationFrame(function () {
      el.classList.add('hta-replay-in');
      window.setTimeout(function () {
        el.classList.remove('hta-replay', 'hta-replay-in');
        el.classList.add('hta-float');
      }, 800);
    });
  }

  function bindScrollReplay(el) {
    if (!('IntersectionObserver' in window)) return;
    var wasOut = false;
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            wasOut = true;
            return;
          }
          if (wasOut && el.classList.contains('hta-done')) {
            wasOut = false;
            replaySoft(el);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
  }

  function collectTitles() {
    var nodes = Array.prototype.slice.call(document.querySelectorAll(SELECTORS));
    var unique = [];
    var seen = {};
    nodes.forEach(function (n) {
      // Prefer hero titles only — skip tiny headings mistaken for hero
      if (n.closest('nav, footer, .mega-menu, .slp-sticky-nav')) return;
      if (seen[n]) return;
      seen[n] = true;
      unique.push(n);
    });
    return unique;
  }

  function boot() {
    var titles = collectTitles();
    if (!titles.length) return;

    titles.forEach(function (el, index) {
      var meta = prepare(el);
      if (!meta) return;

      // Stagger start slightly per title if multiple on page
      var delay = index * 120;
      window.setTimeout(function () {
        playIntro(el);
        el.setAttribute('data-hta-chars-done', '1');
        bindScrollReplay(el);
      }, delay + 40);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  // Re-run if header injection reshuffles layout late
  document.addEventListener('guudle:header-ready', function () {
    window.setTimeout(boot, 30);
  });

  window.GuudleHeroTitleAnimation = { boot: boot, playIntro: playIntro };
})();
