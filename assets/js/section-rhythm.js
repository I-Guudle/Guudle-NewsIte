/**
 * Alternates major sections between an image parallax band and a solid navy/white band.
 * Homepage stays the visual reference and is left untouched.
 * Skips app shells (dashboards, gas delivery, auth screens).
 */
(function () {
  'use strict';

  const HERO_SELECTOR = [
    '[data-svc-hero]',
    '.saas-hero',
    '.hp-hero',
    '.hs-hero',
    '.bweb-hero',
    '.lm-hero',
    '.ct-hero',
    '.svc-hero',
    '.mkt-hero',
    '.sp-hero',
    '.page-hero',
    '.ind-hero',
    '.about-hero',
  ].join(',');

  const BG_SELECTOR = [
    '.cma-parallax__bg',
    '.slp-parallax__bg',
    '.svc-parallax__bg',
    '.ent-parallax__bg',
    '.mkt-parallax__bg',
    '.guudle-parallax-layer',
    '.gv-parallax__bg',
    '[data-parallax-bg]',
  ].join(',');

  const OVERLAY_SELECTOR = [
    '.gv-parallax__overlay',
    '.cma-parallax__overlay',
    '.ent-parallax__overlay',
    '.slp-parallax__overlay',
    '.svc-hero-parallax__overlay',
  ].join(',');

  function skipPage() {
    const body = document.body;
    if (!body) return true;
    if (body.classList.contains('home-saas') || body.classList.contains('home-navy-refined')) return true;
    if (body.classList.contains('wds-collection') || body.dataset.wdsManaged === '1') return true;
    const path = (location.pathname || '').replace(/\\/g, '/').toLowerCase();
    if (path.includes('/dashboards/')) return true;
    if (path.includes('/pages/gas/')) return true;
    if (path.includes('/saas/login') || path.includes('/saas/register')) return true;
    return false;
  }

  function assetBase() {
    if (window.GuudleSite && typeof window.GuudleSite.getBasePath === 'function') {
      return window.GuudleSite.getBasePath();
    }
    return '';
  }

  function poolFor(path) {
    const base = assetBase();
    const img = (name) => `${base}assets/images/solutions/${name}.jpg`;
    const web = [img('workspace'), img('projects'), img('agency'), img('operations')];
    const commerce = [img('payments'), img('fintech'), img('property'), img('workspace')];
    const cloud = [img('cloud'), img('operations'), img('ai'), img('projects')];
    const security = [img('security'), img('operations'), img('cloud'), img('agency')];
    const growth = [img('analytics'), img('projects'), img('agency'), img('team')];
    const design = [img('mobile'), img('workspace'), img('agency'), img('projects')];
    const support = [img('team'), img('operations'), img('agency'), img('workspace')];
    const modern = [img('workspace'), img('cloud'), img('projects'), img('security')];
    const team = [img('team'), img('agency'), img('projects'), img('operations')];
    const industry = [img('property'), img('crm'), img('operations'), img('team')];

    if (/ecommerce|marketplace|shopify|magento|woocommerce|product-listing|payments/.test(path)) return commerce;
    if (/cloud|hosting|aws|azure|devops/.test(path)) return cloud;
    if (/security|cyber/.test(path)) return security;
    if (/seo|marketing|ads|promotion|influencer|email|sms|whatsapp/.test(path)) return growth;
    if (/ui-ux|design/.test(path)) return design;
    if (/maintenance|support/.test(path)) return support;
    if (/legacy|migration|modern/.test(path)) return modern;
    if (/industr/.test(path)) return industry;
    if (/about|process|contact|testimonial|portfolio|our-work|blog/.test(path)) return team;
    return web;
  }

  function isHero(el) {
    if (el.matches(HERO_SELECTOR)) return true;
    return !!el.querySelector(`:scope > ${HERO_SELECTOR}`);
  }

  function meaningful(el) {
    if (el.matches('nav, script, style, .slp-sticky-nav, .mobile-sticky-cta')) return false;
    if (el.id === 'header-placeholder' || el.id === 'footer-placeholder' || el.id === 'chatbot-placeholder') return false;
    if (el.querySelector('h1, h2, h3')) return true;
    const text = (el.textContent || '').replace(/\s+/g, ' ').trim();
    return text.length > 80;
  }

  function collect(main) {
    let nodes = [...main.children];
    const sections = nodes.filter((el) => el.matches && el.matches('section'));
    if (sections.length < 2) {
      const wrapper = nodes.find((el) => el.matches && el.matches('div') && el.querySelectorAll(':scope > section').length > 1);
      if (wrapper) nodes = [...wrapper.children];
    }

    const bands = [];
    nodes.forEach((el) => {
      if (!el.matches || !el.matches('section, div, article')) return;
      if (isHero(el)) {
        el.classList.add('gv-hero');
        return;
      }
      if (!meaningful(el)) return;
      bands.push(el);
    });
    return bands;
  }

  function existingImage(section) {
    const node = section.querySelector(BG_SELECTOR);
    if (node) {
      const inline = node.style.backgroundImage;
      if (inline && inline !== 'none') return inline;
    }
    const own = section.style.backgroundImage;
    if (own && own.includes('url(')) return own;
    return '';
  }

  function ensureImage(section, url) {
    let bg = section.querySelector(BG_SELECTOR);
    const current = existingImage(section);
    if (!bg) {
      bg = document.createElement('div');
      bg.className = 'gv-parallax__bg guudle-parallax-layer';
      bg.setAttribute('data-parallax-bg', '');
      bg.setAttribute('aria-hidden', 'true');
      section.prepend(bg);
    }
    if (!bg.style.backgroundImage || bg.style.backgroundImage === 'none') {
      bg.style.backgroundImage = current || `url("${url}")`;
    }
    if (!section.querySelector(OVERLAY_SELECTOR)) {
      const overlay = document.createElement('div');
      overlay.className = 'gv-parallax__overlay';
      overlay.setAttribute('aria-hidden', 'true');
      bg.after(overlay);
    }
    section.classList.add('guudle-parallax-section');
    if (!section.hasAttribute('data-svc-parallax-section')) {
      section.setAttribute('data-svc-parallax-section', '');
    }
    if (!section.dataset.parallaxScale) section.dataset.parallaxScale = '1.08';
  }

  function apply() {
    if (skipPage()) return;
    if (document.body.dataset.gvRhythm === '1') return;
    const main = document.getElementById('main');
    if (!main) return;

    const firstHero = main.querySelector(HERO_SELECTOR);
    if (firstHero) firstHero.classList.add('gv-hero');

    const allBands = collect(main);
    const pinned = allBands.filter((el) => el.matches('.svc-related') || el.querySelector('form'));
    const sections = allBands.filter((el) => !pinned.includes(el));
    const pool = poolFor(location.pathname || '');
    let imageIndex = 0;
    let solidIndex = 0;

    pinned.forEach((section) => {
      section.classList.add('gv-band--solid', 'gv-solid--white');
      section.dataset.gvBand = 'solid';
    });

    function darkNative(section) {
      return section.matches(
        '.cma-parallax, .ent-parallax, .guudle-benefits, .svc-hero-parallax, .mkt-hero--parallax, .ct-cta, .gstory-cta, .gstory-vision, .bweb-cta, .cma-cta-band'
      );
    }

    sections.forEach((section, index) => {
      const useImage = index % 2 === 0;
      section.classList.remove('gv-band--image', 'gv-band--solid', 'gv-solid--white', 'gv-solid--mist', 'gv-solid--navy');
      if (useImage) {
        section.classList.add('gv-band--image');
        section.dataset.gvBand = 'image';
        ensureImage(section, pool[imageIndex % pool.length]);
        imageIndex += 1;
      } else if (darkNative(section)) {
        section.classList.add('gv-band--solid', 'gv-solid--navy');
        section.dataset.gvBand = 'solid';
      } else {
        const variant = solidIndex % 2 === 0 ? 'white' : 'mist';
        section.classList.add('gv-band--solid', `gv-solid--${variant}`);
        section.dataset.gvBand = 'solid';
        solidIndex += 1;
      }
    });

    document.body.dataset.gvRhythm = '1';
    document.dispatchEvent(new CustomEvent('guudle:rhythm-ready'));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
})();
