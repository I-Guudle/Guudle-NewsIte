/**
 * Guudle IT Solutions — Main JavaScript
 */

function initNavModules() {
  initMegaMenu();
  initMobileMenu();
  initNavSearch();
  initNavActiveLinks();
  initStickyHeader();
}

document.addEventListener('DOMContentLoaded', () => {
  initNavModules();
  initScrollReveal();
  initTestimonialSlider();
  initTabs();
  initAccordions();
  initChatbot();
  initNewsletter();
  initContactForm();
  initParticles();
  initParallax();
});

document.addEventListener('guudle:header-ready', () => {
  initNavModules();
  initNavActiveLinks();
  syncHeaderHeight();
});

/* ─── Mega Menu Tabs (Weydii-style) ─── */
function initMegaMenu() {
  document.querySelectorAll('.mega-menu-tabs:not([data-nav-bound]), .mega-menu-item:not([data-nav-bound])').forEach((container) => {
    container.dataset.navBound = '1';
    const tabBtns = container.querySelectorAll('.mega-tab-btn, .mega-sidebar-btn');
    const tabContents = container.querySelectorAll('.mega-tab-content');

    tabBtns.forEach((btn) => {
      const activate = () => {
        const target = btn.dataset.tab;
        if (!target) return;
        tabBtns.forEach((b) => b.classList.remove('active'));
        tabContents.forEach((c) => c.classList.remove('active'));
        btn.classList.add('active');
        const panel = container.querySelector(`[data-content="${target}"]`);
        panel?.classList.add('active');
      };

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        activate();
      });

      btn.addEventListener('mouseenter', activate);
    });
  });

}

/* ─── Mobile Menu — Full Screen ─── */
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  if (!btn || btn.dataset.navBound) return;
  btn.dataset.navBound = '1';

  const close = document.getElementById('mobile-menu-close');
  const menu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-menu-overlay');
  const accordionTriggers = document.querySelectorAll('.mobile-accordion-trigger');

  function openMenu() {
    menu?.classList.add('open');
    overlay?.classList.add('open');
    overlay?.classList.remove('invisible', 'opacity-0');
    overlay?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    btn?.setAttribute('aria-expanded', 'true');
    close?.focus();
  }

  function closeMenu() {
    menu?.classList.remove('open');
    overlay?.classList.remove('open');
    overlay?.classList.add('invisible', 'opacity-0');
    overlay?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    btn?.setAttribute('aria-expanded', 'false');
    btn?.focus();
  }

  btn?.addEventListener('click', openMenu);
  close?.addEventListener('click', closeMenu);
  overlay?.addEventListener('click', closeMenu);

  menu?.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || !menu.classList.contains('open')) return;
    const focusable = menu.querySelectorAll('a[href], button:not([disabled]), input, textarea, select');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  accordionTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      const panel = trigger.nextElementSibling;
      trigger.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      if (!expanded) {
        accordionTriggers.forEach((other) => {
          if (other !== trigger) other.setAttribute('aria-expanded', 'false');
        });
      }
    });
  });

  menu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu?.classList.contains('open')) closeMenu();
  });
}

/* ─── Nav Search ─── */
function initNavSearch() {
  const panel = document.getElementById('nav-search-panel');
  if (!panel || panel.dataset.navBound) return;
  panel.dataset.navBound = '1';

  const triggers = document.querySelectorAll('.nav-search-trigger');
  const input = document.getElementById('nav-search-input');
  const form = document.getElementById('nav-search-form');
  const results = document.getElementById('nav-search-results');
  if (!triggers.length || !panel) return;

  const header = document.getElementById('site-header');
  const base = window.GuudleSite?.getBasePath?.() || '';
  const index = [];
  document.querySelectorAll('.mega-link-item, .mega-link-item--rich, .mega-industry-card, .mega-solution-card, .mega-simple-link, .mega-tech-pill, .mega-portfolio-cat').forEach((a) => {
    if (a.tagName === 'A') {
      index.push({ name: a.textContent.trim().replace(/\s+/g, ' '), href: a.getAttribute('href') });
    }
  });
  [
    { name: 'Contact Us', href: `${base}pages/contact.html` },
    { name: 'Our Work', href: `${base}pages/our-work.html` },
    { name: 'About Us', href: `${base}pages/about.html` },
    { name: 'Industries', href: `${base}pages/industries.html` },
    { name: 'GUUDLE Business Operating Platform', href: `${base}pages/saas/index.html` },
    { name: 'Platform Pricing', href: `${base}pages/saas/pricing.html` },
    { name: 'Platform Sign In', href: `${base}pages/saas/login.html` },
    { name: 'Start Free Trial', href: `${base}pages/saas/register.html` },
    { name: 'Super Admin Dashboard', href: `${base}dashboards/admin/index.html` },
    { name: 'Client Workspace', href: `${base}dashboards/client/index.html` },
  ].forEach((item) => {
    if (item.href && !index.some((i) => i.name === item.name)) index.push(item);
  });

  function toggleSearch(force) {
    const isHidden = panel.classList.contains('hidden');
    const open = force !== undefined ? force : isHidden;
    panel.classList.toggle('hidden', !open);
    triggers.forEach((btn) => btn.setAttribute('aria-expanded', open ? 'true' : 'false'));
    if (open) {
      input?.focus();
      if (window.scrollY <= 48) {
        header?.classList.add('nav-scrolled');
        header?.classList.remove('nav-at-top');
      }
    }
    requestAnimationFrame(syncHeaderHeight);
  }

  triggers.forEach((btn) => btn.addEventListener('click', () => toggleSearch()));

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    renderResults(input?.value.trim() || '');
  });

  input?.addEventListener('input', () => renderResults(input.value.trim()));

  function renderResults(q) {
    if (!results) return;
    if (!q) {
      results.innerHTML = '';
      return;
    }
    const lower = q.toLowerCase();
    const matches = index.filter((i) => i.name.toLowerCase().includes(lower)).slice(0, 8);
    results.innerHTML = matches.length
      ? matches.map((m) => `<a href="${m.href}" class="nav-search-result">${m.name}</a>`).join('')
      : '<p class="nav-search-empty">No results found</p>';
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.classList.contains('hidden')) toggleSearch(false);
    if ((e.key === '/' || (e.ctrlKey && e.key === 'k')) && triggers.length && panel) {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || document.activeElement?.isContentEditable) return;
      e.preventDefault();
      toggleSearch(true);
    }
  });
}

/* ─── Active Nav Links ─── */
function initNavActiveLinks() {
  const path = window.location.pathname.toLowerCase();
  const file = path.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-link[data-nav-match], .mobile-nav-link[data-nav-match], .mobile-nav-sublink, .nav-text-link[data-nav-match], .nav-cta-btn[data-nav-match]').forEach((link) => {
    const match = link.dataset.navMatch;
    if (match === 'index.html' && (file === 'index.html' || file === '' || path.endsWith('/'))) {
      link.classList.add('active');
    } else if ((match === 'our-work' || match === 'portfolio') && (path.includes('/our-work') || path.includes('/case-studies') || path.includes('/portfolio') || file === 'our-work.html' || file === 'portfolio.html')) {
      link.classList.add('active');
    } else if (match === 'contact' && file === 'contact.html') {
      link.classList.add('active');
    } else if (match === 'about' && [
      'about.html', 'testimonials.html', 'our-process.html',
    ].includes(file)) {
      link.classList.add('active');
    } else if (match !== 'index.html' && path.includes(match)) {
      link.classList.add('active');
    }
  });

  const companyPages = [
    'about.html', 'testimonials.html', 'our-process.html',
  ];
  const sectionRules = [
    { section: 'services', match: () => path.includes('/services/') },
    { section: 'solutions', match: () => path.includes('/services/enterprise-') || path.includes('/services/erp') || path.includes('/services/crm') || path.includes('/services/hrms') || path.includes('/services/legacy-') || path.includes('/services/cloud-engineering') || path.includes('/services/digital-transformation') || path.includes('/services/it-consulting') || path.includes('/services/workflow-') || path.includes('/services/business-intelligence') || path.includes('/services/enterprise-mobility') || path.includes('/services/data-engineering') || path.includes('/services/cloud-solutions') || path.includes('/services/aws') || path.includes('/services/azure') || path.includes('/services/saas-development') },
    { section: 'portfolio', match: () => path.includes('/our-work') || path.includes('/case-studies') || path.includes('/portfolio') || file === 'our-work.html' || file === 'portfolio.html' },
    { section: 'company', match: () => companyPages.includes(file) },
  ];

  for (const { section, match } of sectionRules) {
    if (match()) {
      document.querySelector(`.mega-trigger[data-nav-section="${section}"], .mega-trigger-link[data-nav-section="${section}"]`)?.classList.add('active');
      break;
    }
  }

  const currentPath = path.replace(/\/$/, '');
  document.querySelectorAll('.mega-link-item--rich, .mega-simple-link, .mega-industry-card, .mega-solution-card, .mega-portfolio-cat, .mega-portfolio-card, .mobile-nav-sublink').forEach((a) => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    try {
      const linkPath = new URL(href, window.location.href).pathname.toLowerCase().replace(/\/$/, '');
      if (linkPath === currentPath) a.classList.add('active');
    } catch { /* ignore */ }
  });
}

/* ─── Header height sync (split nav + search panel) ─── */
function syncHeaderHeight() {
  const header = document.getElementById('site-header');
  if (!header) return;
  document.documentElement.style.setProperty('--site-header-height', `${header.offsetHeight}px`);
}

/* ─── Sticky / Transparent Nav ─── */
function initStickyHeader() {
  const header = document.getElementById('site-header');
  if (!header || header.dataset.stickyBound) return;
  header.dataset.stickyBound = '1';

  syncHeaderHeight();
  window.addEventListener('resize', syncHeaderHeight, { passive: true });

  const forceScrolled = header.classList.contains('nav-scrolled') && !header.classList.contains('nav-at-top');
  let ticking = false;
  let lastScrolled = forceScrolled ? true : null;

  function updateScrollProgress() {
    const doc = document.documentElement;
    const scrollTop = window.scrollY;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    const progress = scrollHeight > 0 ? Math.min(100, (scrollTop / scrollHeight) * 100) : 0;
    doc.style.setProperty('--nav-scroll-progress', String(progress));
  }

  function update() {
    const scrollY = window.scrollY;
    const scrolled = forceScrolled || scrollY > 48;
    if (scrolled !== lastScrolled) {
      lastScrolled = scrolled;

      if (scrolled) {
        header.classList.remove('nav-at-top');
        header.classList.add('nav-scrolled');
      } else {
        header.classList.add('nav-at-top');
        header.classList.remove('nav-scrolled');
      }
      syncHeaderHeight();
    }

    header.classList.toggle('nav-is-compact', scrollY > 80);
    updateScrollProgress();
    ticking = false;
  }

  update();
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
}

/* ─── Scroll Reveal ─── */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('active'); }),
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );
  elements.forEach((el) => observer.observe(el));
}

/* ─── Parallax ─── */
function initParallax() {
  const items = document.querySelectorAll('[data-parallax]');
  if (!items.length) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    items.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax) || 0.15;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.style.transform = `translateY(${scrollY * speed * -0.1}px)`;
      }
    });
  }, { passive: true });
}

/* ─── Particle Canvas ─── */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.min(80, Math.floor(canvas.width / 14));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(16, 165, 245, ${p.opacity})`;
      ctx.fill();

      particles.slice(i + 1).forEach((p2) => {
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(37, 99, 235, ${0.08 * (1 - dist / 100)})`;
          ctx.stroke();
        }
      });
    });
    animId = requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(animId);
    else draw();
  });
}

/* ─── Testimonial Slider ─── */
function initTestimonialSlider() {
  const track = document.getElementById('testimonial-track');
  const prev = document.getElementById('testimonial-prev');
  const next = document.getElementById('testimonial-next');
  const dots = document.querySelectorAll('.testimonial-dot');
  if (!track) return;

  let current = 0;
  const total = track.children.length;

  function goTo(index) {
    current = ((index % total) + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('bg-cyan-400', i === current);
      dot.classList.toggle('bg-white/20', i !== current);
    });
  }

  prev?.addEventListener('click', () => goTo(current - 1));
  next?.addEventListener('click', () => goTo(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
  setInterval(() => goTo(current + 1), 7000);
}

/* ─── Tabs ─── */
function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach((container) => {
    const buttons = container.querySelectorAll('.tab-btn');
    const panels = container.querySelectorAll('.tab-panel');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        buttons.forEach((b) => b.classList.remove('active'));
        panels.forEach((p) => p.classList.add('hidden'));
        btn.classList.add('active');
        container.querySelector(`#${target}`)?.classList.remove('hidden');
      });
    });
  });
}

/* ─── Accordions ─── */
function initAccordions() {
  document.querySelectorAll('.accordion-item').forEach((item) => {
    item.querySelector('.accordion-trigger')?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      item.closest('.accordion')?.querySelectorAll('.accordion-item').forEach((i) => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* ─── Chatbot ─── */
function initChatbot() {
  const toggle = document.getElementById('chatbot-toggle');
  const panel = document.getElementById('chatbot-panel');
  const close = document.getElementById('chatbot-close');
  const form = document.getElementById('chatbot-form');
  const input = document.getElementById('chatbot-input');
  const messages = document.getElementById('chatbot-messages');

  const responses = {
    default: 'Thank you! Our team will respond shortly. Visit our Contact page for immediate assistance.',
    services: 'We offer 29 specialized services — web & mobile development, cloud (AWS/Azure), AI/ML, ERP/CRM, and enterprise solutions.',
    pricing: 'Pricing is tailored to each project. Contact us for a free consultation and custom quote.',
    contact: 'Reach us at info@guudle.com or 07908 727559.',
  };

  toggle?.addEventListener('click', () => panel?.classList.add('open'));
  close?.addEventListener('click', () => panel?.classList.remove('open'));

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input?.value.trim();
    if (!text) return;
    appendMsg(text, 'user');
    input.value = '';
    setTimeout(() => {
      const lower = text.toLowerCase();
      let reply = responses.default;
      if (/service|develop|build/.test(lower)) reply = responses.services;
      else if (/price|cost|budget/.test(lower)) reply = responses.pricing;
      else if (/contact|call|email/.test(lower)) reply = responses.contact;
      appendMsg(reply, 'bot');
    }, 700);
  });

  function appendMsg(text, type) {
    const div = document.createElement('div');
    div.className = 'flex gap-2' + (type === 'user' ? ' flex-row-reverse' : '');
    div.innerHTML = type === 'user'
      ? `<div class="bg-[#2563EB] rounded-2xl rounded-tr-sm px-3 py-2 text-sm text-white max-w-[80%]">${esc(text)}</div>`
      : `<div class="w-7 h-7 rounded-full bg-gradient-to-br from-[#2563EB] to-[#10A5F5] flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold">AI</div>
         <div class="bg-white/8 border border-white/10 rounded-2xl rounded-tl-sm px-3 py-2 text-sm text-white/70 max-w-[80%]">${esc(text)}</div>`;
    messages?.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }
}

function esc(text) {
  const d = document.createElement('div');
  d.textContent = text;
  return d.innerHTML;
}

function initNewsletter() {
  document.querySelectorAll('.newsletter-form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button');
      const input = form.querySelector('input[type="email"]');
      if (!input?.value) return;
      btn.textContent = 'Subscribed!';
      btn.disabled = true;
      input.value = '';
      setTimeout(() => { btn.textContent = 'Subscribe'; btn.disabled = false; }, 3000);
    });
  });
}

function initContactForm() {
  const form = document.getElementById('hero-contact-form');
  if (!form || form.dataset.guudleBound === '1') return;
  if (window.GuudleContact) {
    window.GuudleContact.bind(form, { requireService: true });
    return;
  }
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (window.GuudleContact) {
      await window.GuudleContact.submitFromForm(form, { requireService: true });
      return;
    }
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn ? btn.innerHTML : '';
    if (btn) {
      btn.disabled = true;
      btn.textContent = "We couldn't submit your enquiry right now. Please try again.";
    }
    setTimeout(() => {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = orig;
      }
    }, 2800);
  });
}
