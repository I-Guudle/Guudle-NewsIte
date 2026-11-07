/**
 * Portfolio & Case Studies — filters, counters, modals, carousel, marquee
 */
(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const CATEGORIES = [
    { id: 'all', label: 'All Projects' },
    { id: 'ecommerce', label: 'E-Commerce' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'education', label: 'Education' },
    { id: 'enterprise', label: 'Enterprise Solutions' },
    { id: 'saas', label: 'SaaS Platforms' },
    { id: 'corporate', label: 'Corporate Websites' },
    { id: 'mobile', label: 'Mobile Applications' },
    { id: 'realestate', label: 'Real Estate' },
    { id: 'retail', label: 'Retail' },
    { id: 'nonprofit', label: 'Non-Profit & Community' },
    { id: 'ai', label: 'AI & Automation' },
  ];

  const PROJECTS = [
    {
      id: 'jija-fashion',
      title: 'Jija Fashion',
      url: 'https://jijafashion.com/',
      industry: 'Fashion & Retail',
      group: 'Fashion & Retail',
      categories: ['ecommerce', 'retail'],
      services: ['E-Commerce Development', 'UX Design', 'SEO'],
      stack: ['WordPress', 'WooCommerce', 'PHP', 'Responsive CSS'],
      overview: 'A polished UK online store for fashion & beauty — makeup, eyelashes, bridal jewellery, and accessories with category-rich catalog and secure checkout.',
      challenge: 'Presenting a large beauty SKU range attractively while building trust with first-time online shoppers.',
      solution: 'Clean product grid, detailed PDPs, visible trust badges, and a streamlined mobile-first checkout experience.',
      results: ['Mobile-friendly storefront across all devices', 'Improved product discovery & conversion UX', 'SEO-optimized category architecture'],
      accent: '#EC4899',
      icon: 'fa-bag-shopping',
      featured: true,
    },
    {
      id: 'zamzam-decor',
      title: 'Zamzam Decor',
      url: 'https://zamzamdecor.com/',
      industry: 'Home & Decor',
      group: 'Fashion & Retail',
      categories: ['ecommerce', 'retail'],
      services: ['E-Commerce Development', 'Branding'],
      stack: ['WordPress', 'WooCommerce', 'PHP'],
      overview: 'Premium home décor e-commerce with curated collections, visual merchandising, and brand-forward shopping journeys.',
      challenge: 'Translating an aspirational décor brand into a digital experience that feels premium and easy to shop.',
      solution: 'Visual-first layouts, collection-based navigation, and cohesive brand styling across product and content pages.',
      results: ['Elevated brand presence online', 'Structured catalog for seasonal collections', 'Responsive shopping on all devices'],
      accent: '#0B1F3A',
      icon: 'fa-couch',
      featured: true,
    },
    {
      id: 'siraj-paints',
      title: 'Siraj Paints',
      url: 'https://sirajpaints.com/',
      industry: 'Manufacturing & Retail',
      group: 'Fashion & Retail',
      categories: ['corporate', 'retail'],
      services: ['Corporate Website', 'Product Catalog'],
      stack: ['WordPress', 'Custom Theme', 'PHP'],
      overview: 'Corporate website with comprehensive product catalog for paints, coatings, and industrial solutions.',
      challenge: 'Organizing a wide product range while maintaining a professional B2B and retail-facing presence.',
      solution: 'Structured catalog taxonomy, spec sheets, and clear enquiry pathways for trade and retail buyers.',
      results: ['Clear product discovery for distributors & customers', 'Professional corporate brand presence', 'Lead generation via enquiry forms'],
      accent: '#2563EB',
      icon: 'fa-fill-drip',
      featured: true,
    },
    {
      id: 'barakat-bookshop',
      title: 'Barakat Bookshop',
      url: 'https://barakatbookshop.com/',
      industry: 'Publishing & Retail',
      group: 'Online Stores & Commerce',
      categories: ['ecommerce', 'education'],
      services: ['E-Commerce Platform'],
      stack: ['WordPress', 'WooCommerce', 'RTL / Multilingual', 'MySQL'],
      overview: 'Bilingual (Arabic & English) Islamic bookshop with deep catalog across Quran sciences, Hadith, Fiqh, and Seerah.',
      challenge: 'Mixing RTL Arabic with LTR English across a very large, metadata-rich book catalog.',
      solution: 'Bilingual layout with proper RTL rendering, Arabic-friendly typography, and structured categories.',
      results: ['Accessible bilingual browsing experience', 'Organized deep catalog navigation', 'UK shipping & promo integration'],
      accent: '#D97706',
      icon: 'fa-book-open',
      featured: true,
    },
    {
      id: 'motorparts360',
      title: 'Motor Parts 360',
      url: 'https://motorparts360.com/',
      industry: 'Automotive',
      group: 'Online Stores & Commerce',
      categories: ['ecommerce', 'retail'],
      services: ['Automotive E-Commerce Solution'],
      stack: ['WooCommerce', 'PHP', 'Payment Gateway', 'Search'],
      overview: 'Automotive parts e-commerce with vehicle-fitment browsing, parts search, and secure online ordering.',
      challenge: 'Helping customers find the right parts quickly across a complex automotive inventory.',
      solution: 'Category-driven navigation, search filters, and product pages optimized for part specifications.',
      results: ['Streamlined parts discovery', 'Secure checkout for trade & retail buyers', 'Mobile-responsive catalog'],
      accent: '#DC2626',
      icon: 'fa-car',
      featured: true,
    },
    {
      id: 'oak-eden',
      title: 'Oak Eden',
      url: 'https://oakeden.co.uk/',
      industry: 'Retail',
      group: 'Online Stores & Commerce',
      categories: ['ecommerce', 'retail'],
      services: ['Retail Website Development'],
      stack: ['WordPress', 'WooCommerce', 'SEO'],
      overview: 'UK retail website with curated product presentation, brand storytelling, and conversion-focused UX.',
      challenge: 'Balancing brand storytelling with fast, frictionless product browsing and checkout.',
      solution: 'Editorial-style landing pages paired with a clean shop experience and optimized performance.',
      results: ['Premium retail brand online', 'Fast, responsive shopping experience', 'SEO-ready product pages'],
      accent: '#78350F',
      icon: 'fa-store',
      featured: true,
    },
    {
      id: 'nearbycare',
      title: 'Nearby Care',
      url: 'https://nearbycare.co.uk/',
      industry: 'Healthcare',
      group: 'Healthcare',
      categories: ['healthcare', 'corporate'],
      services: ['Healthcare Platform'],
      stack: ['WordPress', 'Custom Theme', 'Booking Forms', 'SEO'],
      overview: 'Trust-focused domiciliary care website with service pages, CQC trust signals, and free care assessment booking.',
      challenge: 'Earning trust from vulnerable clients and families while keeping navigation simple for older users.',
      solution: 'Prominent CQC/AQP badges, warm accessible design, large readable type, and clear CTAs.',
      results: ['Credible care brand presence', 'Increased assessment enquiries', 'Accessible UX for all ages'],
      accent: '#0B1F3A',
      icon: 'fa-house-medical',
      featured: true,
      thumbnail: '../assets/images/portfolio/nearbycare.jpg',
    },
    {
      id: 'bright-clinic',
      title: 'Bright Clinic',
      url: 'https://brightclinic.net/',
      industry: 'Healthcare',
      group: 'Healthcare',
      categories: ['healthcare', 'corporate'],
      services: ['Medical Website Development'],
      stack: ['WordPress', 'Custom Theme', 'Appointment Forms'],
      overview: 'Modern medical clinic website presenting services, practitioners, and patient booking pathways.',
      challenge: 'Communicating clinical credibility while making appointment booking effortless.',
      solution: 'Clean medical UI, service-specific pages, practitioner profiles, and prominent booking CTAs.',
      results: ['Professional clinic brand online', 'Clear patient journey to booking', 'Mobile-friendly medical content'],
      accent: '#0B1F3A',
      icon: 'fa-stethoscope',
      featured: true,
      thumbnail: '../assets/images/portfolio/bright-clinic.jpg',
    },
    {
      id: 'netsecurityit',
      title: 'Net Security IT',
      url: 'https://netsecurityit.com/',
      industry: 'Cybersecurity',
      group: 'Technology & IT',
      categories: ['corporate', 'enterprise'],
      services: ['Cybersecurity Website'],
      stack: ['WordPress', 'Custom Theme', 'SEO'],
      overview: 'Cybersecurity services website communicating enterprise-grade protection, compliance, and IT security expertise.',
      challenge: 'Translating complex security offerings into clear, trustworthy messaging for business buyers.',
      solution: 'Service-led architecture, trust indicators, and technical credibility through structured content.',
      results: ['Enterprise-ready security brand', 'Clear service positioning', 'Lead capture for consultations'],
      accent: '#1E40AF',
      icon: 'fa-shield-halved',
      featured: true,
      thumbnail: '../assets/images/portfolio/netsecurityit.jpg',
    },
    {
      id: 'luminhive',
      title: 'LuminHive',
      url: 'https://luminhive.co.uk/',
      industry: 'Technology',
      group: 'Technology & IT',
      categories: ['enterprise', 'saas', 'corporate'],
      services: ['Technology Solutions Platform'],
      stack: ['React', 'Node.js', 'Cloud', 'API'],
      overview: 'Technology solutions platform showcasing digital services, product capabilities, and client engagement.',
      challenge: 'Presenting a broad technology portfolio with clarity and a premium SaaS-grade feel.',
      solution: 'Modular page architecture, interactive service sections, and scalable content management.',
      results: ['Modern tech brand positioning', 'Scalable platform for service expansion', 'Conversion-focused UX'],
      accent: '#7C3AED',
      icon: 'fa-microchip',
      featured: true,
      thumbnail: '../assets/images/portfolio/luminhive.jpg',
    },
    {
      id: 'avalon-bay',
      title: 'Avalon Bay',
      url: 'https://avalonbay.co.uk/',
      industry: 'Real Estate',
      group: 'Property & Real Estate',
      categories: ['realestate', 'enterprise'],
      services: ['Property Management Platform'],
      stack: ['WordPress', 'Custom CMS', 'PHP', 'Maps'],
      overview: 'Property management platform with listings, tenant resources, and professional real estate presentation.',
      challenge: 'Managing property listings and enquiries while maintaining a premium real estate brand.',
      solution: 'Structured property catalog, enquiry workflows, and location-aware browsing experience.',
      results: ['Professional property brand online', 'Streamlined listing management', 'Lead generation for viewings'],
      accent: '#059669',
      icon: 'fa-building',
      featured: true,
      thumbnail: '../assets/images/portfolio/avalon-bay.jpg',
    },
    {
      id: 'pagewood-green',
      title: 'Pagewood Green',
      url: 'https://pagewoodgreen.co.uk/',
      industry: 'Real Estate',
      group: 'Property & Real Estate',
      categories: ['realestate', 'corporate'],
      services: ['Real Estate Website'],
      stack: ['WordPress', 'Custom Theme', 'SEO'],
      overview: 'Real estate development website showcasing projects, amenities, and investment opportunities.',
      challenge: 'Showcasing development projects visually while driving qualified buyer enquiries.',
      solution: 'Project galleries, location highlights, and enquiry funnels tailored to property buyers.',
      results: ['Premium development brand presence', 'Visual project storytelling', 'Increased qualified enquiries'],
      accent: '#16A34A',
      icon: 'fa-tree',
      featured: true,
      thumbnail: '../assets/images/portfolio/pagewood-green.jpg',
    },
    {
      id: 'masjid-umalqura',
      title: 'Masjid Umal Qura',
      url: 'https://masjid-umalqura.com/',
      industry: 'Community',
      group: 'Community & Non-Profit',
      categories: ['nonprofit', 'education'],
      services: ['Community Portal'],
      stack: ['WordPress', 'Events', 'Multilingual'],
      overview: 'Community mosque portal with prayer times, events, donations, and educational resources.',
      challenge: 'Serving a diverse community with accessible information, events, and donation pathways.',
      solution: 'Centralized community hub with prayer schedules, event calendar, and donation integration.',
      results: ['Unified community information hub', 'Increased event visibility', 'Accessible multilingual content'],
      accent: '#0B1F3A',
      icon: 'fa-mosque',
      featured: true,
      thumbnail: '../assets/images/portfolio/masjid-umalqura.jpg',
    },
    {
      id: 'comfort-lane',
      title: 'Comfort Lane UK',
      url: 'https://comfortlaneuk.co.uk/',
      industry: 'Business Services',
      group: 'Business Services',
      categories: ['corporate'],
      services: ['Business Website'],
      stack: ['WordPress', 'Custom Theme', 'SEO'],
      overview: 'Professional business services website with service pages, trust messaging, and contact funnels.',
      challenge: 'Establishing credibility for a services business in a competitive local market.',
      solution: 'Clear service positioning, testimonials placement, and optimized contact conversion paths.',
      results: ['Professional services brand online', 'Clear value proposition', 'Improved enquiry rates'],
      accent: '#6366F1',
      icon: 'fa-briefcase',
      featured: true,
      thumbnail: '../assets/images/portfolio/comfort-lane.jpg',
    },
    {
      id: 'weydii',
      title: 'Weydii',
      url: 'https://weydii.com/',
      industry: 'Digital Platform',
      group: 'Business Services',
      categories: ['enterprise', 'saas'],
      services: ['Digital Platform'],
      stack: ['React', 'Node.js', 'Cloud', 'API'],
      overview: 'Digital platform connecting businesses with technology solutions — scalable, modern, and product-led.',
      challenge: 'Building a platform experience that scales across services, users, and future product modules.',
      solution: 'Modular architecture, API-first backend, and premium SaaS-grade interface design.',
      results: ['Scalable digital platform foundation', 'Modern product-led UX', 'Ready for feature expansion'],
      accent: '#2563EB',
      icon: 'fa-layer-group',
      featured: true,
      thumbnail: '../assets/images/portfolio/weydii.jpg',
    },
    {
      id: 'bea-gas',
      title: 'Beba Gas',
      url: 'https://bebagas.com/',
      industry: 'On-Demand Delivery',
      group: 'Additional Projects',
      categories: ['mobile', 'enterprise', 'ai'],
      services: ['Mobile App Development', 'Multi-Vendor Platform', 'API Development'],
      stack: ['Laravel', 'Flutter', 'REST APIs', 'Google Maps', 'MySQL'],
      overview: 'Multi-vendor on-demand gas delivery platform with customer, seller, and rider apps and live GPS tracking.',
      challenge: 'Coordinating customers, vendors, and riders in real time with a 20-minute delivery promise.',
      solution: 'Unified platform with nearest-supplier routing, automated dispatch, and live tracking across three apps.',
      results: ['Scalable multi-vendor delivery ecosystem', 'Real-time order tracking', 'Multi-service expansion ready'],
      accent: '#0B1F3A',
      icon: 'fa-fire-flame-simple',
      featured: true,
      thumbnail: '../assets/images/portfolio/bea-gas.jpg',
    },
    {
      id: 'leaforest',
      title: 'Leaforest',
      url: '#',
      industry: 'Enterprise',
      group: 'Additional Projects',
      categories: ['enterprise', 'saas'],
      services: ['Custom Software Development', 'Enterprise Solutions'],
      stack: ['.NET', 'Azure', 'SQL Server', 'React'],
      overview: 'Enterprise custom development initiative — scalable internal systems and digital workflow modernization.',
      challenge: 'Legacy processes limiting operational efficiency and data visibility across departments.',
      solution: 'Custom enterprise modules, cloud migration, and integrated dashboards for executive visibility.',
      results: ['Modernized internal workflows', 'Improved operational efficiency', 'Cloud-ready architecture'],
      accent: '#123D6A',
      icon: 'fa-building-columns',
      featured: false,
      placeholder: true,
    },
  ];

  const PLACEHOLDERS = [
    { title: 'Enterprise SaaS Platform', categories: ['saas', 'enterprise'], industry: 'SaaS', accent: '#7C3AED' },
    { title: 'AI Automation Suite', categories: ['ai', 'enterprise'], industry: 'AI & Automation', accent: '#6366F1' },
    { title: 'EdTech Learning Portal', categories: ['education'], industry: 'Education', accent: '#0B1F3A' },
    { title: 'FinTech Dashboard', categories: ['enterprise'], industry: 'Financial Services', accent: '#2563EB' },
  ];

  const TESTIMONIALS = [
    {
      quote: 'Guudle transformed our online store into a polished, high-converting experience. Sales on mobile improved dramatically within weeks of launch.',
      name: 'Sarah M.',
      role: 'Director, Fashion Retail Client',
      project: 'E-Commerce Platform',
      initials: 'SM',
      accent: '#EC4899',
    },
    {
      quote: 'Their team understood healthcare compliance and accessibility from day one. Our care assessment bookings increased significantly after the redesign.',
      name: 'James K.',
      role: 'Operations Lead, Healthcare Provider',
      project: 'Healthcare Website',
      initials: 'JK',
      accent: '#0B1F3A',
    },
    {
      quote: 'From discovery to launch, the process was transparent and professional. The platform handles our complex inventory and scales beautifully.',
      name: 'Ahmed R.',
      role: 'Founder, E-Commerce Business',
      project: 'Multi-Vendor Platform',
      initials: 'AR',
      accent: '#2563EB',
    },
    {
      quote: 'We needed a credible enterprise presence fast. Guudle delivered a premium site that our enterprise clients trust immediately.',
      name: 'Priya S.',
      role: 'CEO, Technology Firm',
      project: 'Corporate Website',
      initials: 'PS',
      accent: '#7C3AED',
    },
  ];

  const CLIENT_LOGOS = PROJECTS.filter((p) => !p.placeholder).map((p) => p.title);

  /* ── Scroll reveal ── */
  function initReveal() {
    observeReveal(document.querySelectorAll('.pf-reveal:not(.pf-project-card)'));
  }

  function observeReveal(els) {
    if (!els.length) return;
    if (reduced) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    );
    els.forEach((el) => obs.observe(el));
  }

  function initProjectsReveal() {
    const cards = document.querySelectorAll('#pf-projects-grid .pf-project-card');
    observeReveal(cards);
  }

  const PORTFOLIO_THUMB_BASE = '../assets/images/portfolio/';

  function thumbnailUrl(url) {
    if (!url || url === '#') return '';
    return `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=800&h=500`;
  }

  const SLIDER_IDS = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];

  function sliderThumb(projectId) {
    const h = [...String(projectId || '')].reduce((a, c) => ((a << 5) - a + c.charCodeAt(0)) | 0, 0);
    return `../../sliders/${SLIDER_IDS[Math.abs(h) % SLIDER_IDS.length]}.jpg`;
  }

  function projectThumbnail(p) {
    if (p.thumbnail && !p.thumbnail.includes('/portfolio/')) return p.thumbnail;
    const shot = thumbnailUrl(p.url);
    return shot || sliderThumb(p.id);
  }

  /* ── Filter bar ── */
  function renderFilters() {
    const bar = document.getElementById('pf-filter-bar');
    if (!bar) return;
    bar.innerHTML = CATEGORIES.map(
      (c, i) =>
        `<button type="button" class="cpox-portfolio-filter__btn${i === 0 ? ' active' : ''}" data-filter="${c.id}" aria-pressed="${i === 0}">${c.label}</button>`
    ).join('');
  }

  function domainFromUrl(url) {
    try {
      return new URL(url).hostname.replace(/^www\./, '');
    } catch {
      return '';
    }
  }

  function renderProjectCard(p, { index = 0 } = {}) {
    const domain = domainFromUrl(p.url);
    const cats = (p.categories || []).join(' ');
    const hasLive = p.url && p.url !== '#';
    const thumb = hasLive
      ? `<a href="${p.url}" target="_blank" rel="noopener noreferrer" class="cpox-portfolio-card__thumb">
          <div class="cpox-portfolio-card__browser"><span></span><span></span><span></span><em>${domain}</em></div>
          <img src="${projectThumbnail(p)}" alt="${p.title} website screenshot" loading="lazy" width="800" height="500" decoding="async">
          <span class="cpox-portfolio-card__overlay"><i class="fas fa-arrow-up-right-from-square"></i> Visit Live Site</span>
        </a>`
      : `<div class="cpox-portfolio-card__thumb" style="display:grid;place-items:center;color:#64748b">
          <div style="text-align:center;padding:2rem"><i class="fas fa-image" style="font-size:2rem;margin-bottom:0.5rem;display:block"></i><span>Preview coming soon</span></div>
        </div>`;

    const liveBtn = hasLive
      ? `<a href="${p.url}" target="_blank" rel="noopener noreferrer" class="cpox-cta__btn cpox-cta__btn--primary"><i class="fas fa-arrow-up-right-from-square"></i> Visit Live Site</a>`
      : '';
    const detailBtn = hasLive
      ? `<button type="button" class="cpox-cta__btn cpox-cta__btn--outline" data-pf-case="${p.id}"><i class="fas fa-circle-info"></i> Details</button>`
      : '';

    return `<article class="cpox-portfolio-card" data-pf-filter="${cats}" data-project-id="${p.id || ''}" data-aos="fade-up" data-aos-delay="${Math.min(index * 50, 300)}">
      ${thumb}
      <div class="cpox-portfolio-card__body">
        <div class="cpox-portfolio-card__meta">
          <span class="cpox-portfolio-card__tag"><i class="fas ${p.icon || 'fa-globe'}"></i> ${p.industry}</span>
        </div>
        <h3 class="cpox-portfolio-card__title">${p.title}</h3>
        <p class="cpox-portfolio-card__desc">${p.overview}</p>
        <div class="cpox-portfolio-card__chips">${(p.stack || []).slice(0, 4).map((t) => `<span class="cpox-portfolio-card__chip">${t}</span>`).join('')}</div>
        <div class="cpox-portfolio-card__actions">${liveBtn}${detailBtn}</div>
      </div>
    </article>`;
  }

  function renderProjects() {
    const grid = document.getElementById('pf-projects-grid');
    if (!grid) return;
    const liveProjects = PROJECTS.filter((p) => !p.placeholder);
    grid.innerHTML = liveProjects.map((p, i) => renderProjectCard(p, { index: i })).join('');
  }

  function initFilter() {
    const bar = document.getElementById('pf-filter-bar');
    const grid = document.getElementById('pf-projects-grid');
    if (!bar || !grid) return;

    bar.addEventListener('click', (e) => {
      const btn = e.target.closest('.cpox-portfolio-filter__btn');
      if (!btn) return;
      const val = btn.dataset.filter;
      bar.querySelectorAll('.cpox-portfolio-filter__btn').forEach((b) => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      grid.querySelectorAll('[data-pf-filter]').forEach((card) => {
        const tags = (card.getAttribute('data-pf-filter') || '').split(' ');
        const show = val === 'all' || tags.includes(val);
        card.classList.toggle('pf-hidden', !show);
      });
    });
  }

  /* ── Case study modal ── */
  function renderModal() {
    if (document.getElementById('pf-modal')) return;
    document.body.insertAdjacentHTML(
      'beforeend',
      `<div id="pf-modal" class="cpox-pf-modal" role="dialog" aria-modal="true" aria-labelledby="pf-modal-title" hidden>
        <div class="cpox-pf-modal__backdrop" data-pf-close></div>
        <div class="cpox-pf-modal__panel">
          <button type="button" class="cpox-pf-modal__close" data-pf-close aria-label="Close"><i class="fas fa-xmark"></i></button>
          <div id="pf-modal-content"></div>
        </div>
      </div>`
    );
  }

  function openModal(project) {
    const modal = document.getElementById('pf-modal');
    const content = document.getElementById('pf-modal-content');
    if (!modal || !content || !project) return;
    content.innerHTML = `
      ${project.url && project.url !== '#' ? `<div style="margin:-0.5rem -0.5rem 1.25rem;border-radius:0.75rem;overflow:hidden"><img src="${projectThumbnail(project)}" alt="${project.title} website" style="width:100%;aspect-ratio:16/9;object-fit:cover;object-position:top"></div>` : ''}
      <span class="cpox-portfolio-card__tag" style="margin-bottom:0.75rem"><i class="fas ${project.icon}"></i> ${project.industry}</span>
      <h2 id="pf-modal-title" class="cpox-title" style="font-size:1.5rem;margin-bottom:0.75rem">${project.title}</h2>
      <p class="cpox-lead" style="margin-bottom:1.25rem">${project.overview}</p>
      <div class="cpox-mini-grid" style="margin-bottom:1.25rem">
        <article class="cpox-mini"><span class="cpox-mini__icon"><i class="fas fa-triangle-exclamation"></i></span><div><strong>Challenge</strong><p style="font-size:0.85rem;margin-top:0.35rem;color:#64748b">${project.challenge}</p></div></article>
        <article class="cpox-mini"><span class="cpox-mini__icon"><i class="fas fa-lightbulb"></i></span><div><strong>Solution</strong><p style="font-size:0.85rem;margin-top:0.35rem;color:#64748b">${project.solution}</p></div></article>
      </div>
      <p style="font-weight:800;font-size:0.85rem;margin-bottom:0.5rem;color:#0b1f3a">Technologies</p>
      <div class="cpox-portfolio-card__chips" style="margin-bottom:1rem">${(project.stack || []).map((t) => `<span class="cpox-portfolio-card__chip">${t}</span>`).join('')}</div>
      <p style="font-weight:800;font-size:0.85rem;margin-bottom:0.5rem;color:#0b1f3a">Results</p>
      <ul style="margin-bottom:1.25rem;padding-left:0;list-style:none">${(project.results || []).map((r) => `<li style="display:flex;gap:0.5rem;margin-bottom:0.35rem;font-size:0.88rem;color:#475569"><i class="fas fa-check" style="color:#0B1F3A;margin-top:0.2rem"></i>${r}</li>`).join('')}</ul>
      <div class="cpox-portfolio-card__actions">
        ${project.url && project.url !== '#' ? `<a href="${project.url}" target="_blank" rel="noopener" class="cpox-cta__btn cpox-cta__btn--primary">Visit Live Site <i class="fas fa-arrow-up-right-from-square"></i></a>` : ''}
        <a href="contact.html" class="cpox-cta__btn cpox-cta__btn--outline">Start Similar Project</a>
      </div>`;
    modal.hidden = false;
    document.body.classList.add('cpox-pf-modal-open');
    modal.querySelector('.cpox-pf-modal__close')?.focus();
  }

  function closeModal() {
    const modal = document.getElementById('pf-modal');
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('cpox-pf-modal-open');
  }

  function initModal() {
    renderModal();
    document.addEventListener('click', (e) => {
      const caseBtn = e.target.closest('[data-pf-case]');
      if (caseBtn) {
        const id = caseBtn.getAttribute('data-pf-case');
        const project = PROJECTS.find((p) => p.id === id);
        if (project) openModal(project);
        return;
      }
      if (e.target.closest('[data-pf-close]')) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  /* ── Testimonials ── */
  function renderTestimonials() {
    const grid = document.getElementById('pf-testimonial-grid');
    if (!grid) return;
    grid.innerHTML = TESTIMONIALS.map(
      (t, i) => `
      <blockquote class="cpox-testimonial" data-aos="fade-up" data-aos-delay="${i * 70}">
        <div class="cpox-testimonial__stars" aria-label="5 out of 5 stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
        <p>"${t.quote}"</p>
        <footer><strong>${t.name}</strong><span>${t.role} — ${t.project}</span></footer>
      </blockquote>`
    ).join('');
  }

  /* ── Logo marquee ── */
  function renderMarquee() {
    const track = document.getElementById('pf-logo-track');
    if (!track) return;
    const items = [...CLIENT_LOGOS, ...CLIENT_LOGOS];
    track.innerHTML = items
      .map(
        (name) =>
          `<span class="cpox-portfolio-marquee__item"><span class="cpox-portfolio-marquee__mark">${name.split(' ').map((w) => w[0]).join('').slice(0, 2)}</span>${name}</span>`
      )
      .join('');
  }

  /* ── Industry cards ── */
  function renderIndustries() {
    const grid = document.getElementById('pf-industries-grid');
    if (!grid) return;
    const industries = [
      { id: 'healthcare', label: 'Healthcare', icon: 'fa-heart-pulse', projects: ['Nearby Care', 'Bright Clinic'] },
      { id: 'retail', label: 'Retail & E-Commerce', icon: 'fa-cart-shopping', projects: ['Jija Fashion', 'Oak Eden', 'Barakat Bookshop'] },
      { id: 'education', label: 'Education', icon: 'fa-graduation-cap', projects: ['Barakat Bookshop', 'Masjid Umal Qura'] },
      { id: 'realestate', label: 'Real Estate', icon: 'fa-building', projects: ['Avalon Bay', 'Pagewood Green'] },
      { id: 'logistics', label: 'Logistics', icon: 'fa-truck', projects: ['Beba Gas', 'Motor Parts 360'] },
      { id: 'technology', label: 'Technology', icon: 'fa-microchip', projects: ['LuminHive', 'Net Security IT', 'Weydii'] },
      { id: 'manufacturing', label: 'Manufacturing', icon: 'fa-industry', projects: ['Siraj Paints', 'Motor Parts 360'] },
      { id: 'nonprofit', label: 'Non-Profit', icon: 'fa-hands-holding-heart', projects: ['Masjid Umal Qura'] },
      { id: 'government', label: 'Community', icon: 'fa-landmark', projects: ['Masjid Umal Qura', 'Comfort Lane UK'] },
    ];
    grid.innerHTML = industries
      .slice(0, 9)
      .map(
        (ind, i) => `
      <article class="ind-serve-card" role="listitem" data-ind-row="${Math.floor(i / 3) + 1}" data-ind-col="${(i % 3) + 1}" data-aos="fade-up" data-aos-delay="${Math.min(i * 55, 385)}">
        <span class="ind-serve-card__shine" aria-hidden="true"></span>
        <span class="ind-serve-card__glow" aria-hidden="true"></span>
        <span class="ind-serve-card__index" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
        <div class="ind-serve-card__icon-wrap">
          <span class="ind-serve-card__icon"><i class="fas ${ind.icon}" aria-hidden="true"></i></span>
        </div>
        <h3 class="ind-serve-card__title">${ind.label}</h3>
        <p class="ind-serve-card__desc">${ind.projects.slice(0, 3).join(' · ')}</p>
        <span class="ind-serve-card__bar" aria-hidden="true"></span>
      </article>`
      )
      .join('');
  }

  /* ── Sticky filter ── */
  function initFilterSticky() {
    const wrap = document.getElementById('pf-filter-sticky');
    if (!wrap) return;
    const onScroll = () => wrap.classList.toggle('is-stuck', wrap.getBoundingClientRect().top <= 72);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function init() {
    renderFilters();
    renderProjects();
    renderTestimonials();
    renderMarquee();
    renderIndustries();
    initFilter();
    initFilterSticky();
    initModal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
