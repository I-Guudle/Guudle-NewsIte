/**
 * RE Development Site — extended sections (parallax + grids)
 */
function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function parallaxBand({ id, bg, light = false, inner, speed = '0.32' }) {
  return `<section id="${id}" class="redev-parallax guudle-parallax-section${light ? ' redev-parallax--light' : ''}" data-svc-parallax-section data-svc-parallax-speed="${speed}" data-parallax-scale="1.07" aria-labelledby="${id}-heading">
  <div class="redev-parallax__ambient" aria-hidden="true">
    <span class="redev-parallax__orb redev-parallax__orb--1"></span>
    <span class="redev-parallax__orb redev-parallax__orb--2"></span>
    <div class="redev-parallax__grid"></div>
  </div>
  <div class="redev-parallax__bg guudle-parallax-layer slp-parallax__bg" style="background-image:url('${bg}')" role="img" aria-label="Section background"></div>
  <div class="redev-parallax__overlay${light ? ' redev-parallax__overlay--light' : ''}" aria-hidden="true"></div>
  <div class="redev-parallax__content py-20 sm:py-28">${inner}</div>
</section>`;
}

function glowCard({ icon, title, desc, items, delay = 0, dark = false }) {
  const list = items?.length
    ? `<ul class="redev-glow-card__list">${items.map((i) =>
        `<li><i class="fas fa-check" aria-hidden="true"></i>${esc(i)}</li>`
      ).join('')}</ul>`
    : '';
  return `<article class="redev-glow-card${dark ? ' redev-glow-card--dark' : ''}" data-aos="fade-up" data-aos-delay="${delay}">
    <span class="redev-glow-card__glow" aria-hidden="true"></span>
    <span class="redev-glow-card__shine" aria-hidden="true"></span>
    <span class="redev-glow-card__icon"><i class="fas ${icon}" aria-hidden="true"></i></span>
    <h3 class="redev-glow-card__title">${esc(title)}</h3>
    <p class="redev-glow-card__desc">${esc(desc)}</p>
    ${list}
  </article>`;
}

const TOP_SERVICES = [
  {
    icon: 'fa-palette',
    title: 'Custom Property Website Design',
    desc: 'Tailored layouts for luxury towers, master-planned communities, and boutique developments — built to reflect your brand and sales story.',
    items: ['Brand-aligned visual systems', 'Phase-aware page architecture', 'Premium typography & imagery'],
  },
  {
    icon: 'fa-mobile-screen',
    title: 'Responsive & Mobile-First Design',
    desc: 'Buyers discover projects on phones first. We design fluid experiences from mobile to desktop with no awkward scaling.',
    items: ['Touch-friendly unit browsers', 'Sticky CTAs on mobile', 'Optimized media delivery'],
  },
  {
    icon: 'fa-image',
    title: 'Visual Design & Branding',
    desc: 'Logos, color systems, renders, and lifestyle photography woven into a cohesive digital presence that feels as premium as your project.',
    items: ['Hero render treatments', 'Amenity & lifestyle galleries', 'Consistent iconography'],
  },
  {
    icon: 'fa-gauge-high',
    title: 'Performance Optimization',
    desc: 'Fast load times for image-heavy property sites — compressed media, lazy loading, CDN delivery, and Core Web Vitals tuning.',
    items: ['Lighthouse performance audits', 'Image & video optimization', 'Caching & CDN setup'],
  },
  {
    icon: 'fa-plug',
    title: 'CRM & Third-Party Integrations',
    desc: 'Connect inventory, forms, chat, payments, and marketing automation so every lead lands in the right pipeline.',
    items: ['Salesforce & HubSpot sync', 'MLS / inventory feeds', 'Chat & calendar booking'],
  },
  {
    icon: 'fa-pen-ruler',
    title: 'UI/UX for Property Buyers',
    desc: 'Intuitive journeys from first visit to booked viewing — floor plans, comparables, and registration flows designed for conversion.',
    items: ['Buyer journey mapping', 'Interactive floor plans', 'Accessibility (WCAG 2.2)'],
  },
  {
    icon: 'fa-magnifying-glass-chart',
    title: 'SEO for Real Estate Launches',
    desc: 'Local SEO, structured data for properties, launch landing pages, and content strategy to rank before and after go-live.',
    items: ['Schema for RealEstateListing', 'Location landing pages', 'Launch & retargeting SEO'],
  },
  {
    icon: 'fa-wordpress',
    title: 'CMS & Admin Experience',
    desc: 'WordPress, headless CMS, or custom admin panels so your team can update units, pricing, and media without developers.',
    items: ['Easy unit & phase management', 'Role-based admin access', 'Plugin & security hardening'],
  },
];

const RE_SECTORS = [
  { icon: 'fa-building', title: 'Residential Towers', desc: 'High-rise and mid-rise condos with inventory search, floor stacks, and reservation workflows.' },
  { icon: 'fa-city', title: 'Mixed-Use Developments', desc: 'Retail, office, and residential storytelling on one unified platform with phased releases.' },
  { icon: 'fa-hotel', title: 'Hospitality & Branded Residences', desc: 'Lifestyle-led sites with amenities, partnerships, and international buyer journeys.' },
  { icon: 'fa-tree-city', title: 'Master-Planned Communities', desc: 'Neighborhood maps, lot releases, and long-horizon content for multi-year developments.' },
  { icon: 'fa-warehouse', title: 'Commercial & Industrial', desc: 'Spec sheets, leasing inquiries, and B2B lead capture for commercial property groups.' },
  { icon: 'fa-house-chimney-user', title: 'Build-to-Rent & Multifamily', desc: 'Availability portals, tenant applications, and community amenity showcases.' },
];

const REDesign_SIGNS = [
  { icon: 'fa-chart-line-down', title: 'Low conversion & high bounce', desc: 'Traffic arrives but few register for viewings or download brochures.' },
  { icon: 'fa-clock', title: 'Slow load times', desc: 'Heavy renders and video slow mobile experience and hurt search rankings.' },
  { icon: 'fa-mobile-screen-button', title: 'Poor mobile experience', desc: 'Layouts break on phones — the primary channel for property research.' },
  { icon: 'fa-box-archive', title: 'Outdated inventory', desc: 'Sold units still show as available; phases are hard to update without developers.' },
  { icon: 'fa-shield-halved', title: 'Security & compliance gaps', desc: 'Missing SSL hardening, outdated plugins, or weak form protection.' },
  { icon: 'fa-puzzle-piece', title: 'Disconnected CRM & marketing', desc: 'Leads sit in inboxes instead of syncing to Salesforce, HubSpot, or sales teams.' },
];

const STATS = [
  { value: '100+', label: 'Digital products delivered' },
  { value: '98%', label: 'Client satisfaction' },
  { value: '50+', label: 'Countries served' },
  { value: '24/7', label: 'Enterprise support' },
];

const PORTFOLIO = [
  { tag: 'Luxury Condo', title: 'Harbor View Residences', desc: 'Pre-launch waitlist site with CRM automation — 40% more qualified leads in 90 days.', img: '../../sliders/12.jpg' },
  { tag: 'Mixed-Use', title: 'Metro Quarter', desc: 'Multi-phase portal with map search, Matterport tours, and live inventory sync.', img: '../../sliders/18.jpg' },
  { tag: 'Master Plan', title: 'Greenfield Estates', desc: 'Community site spanning 4 phases with neighborhood maps and lot release CMS.', img: '../../sliders/25.jpg' },
  { tag: 'Commercial', title: 'Axis Business Park', desc: 'Leasing-focused B2B site with spec downloads and broker inquiry routing.', img: '../../sliders/30.jpg' },
];

export function renderRedevTransformParallax() {
  return parallaxBand({
    id: 'redev-transform',
    bg: '../../sliders/15.jpg',
    inner: `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <header class="redev-section-head redev-section-head--light" data-aos="fade-up">
        <span class="redev-badge"><i class="fas fa-wand-magic-sparkles" aria-hidden="true"></i> Fresh Look</span>
        <h2 id="redev-transform-heading" class="redev-title redev-title--light">Transform Your Development Site Into a <span class="redev-accent">Fresh, High-Converting Experience</span></h2>
        <p class="redev-lead redev-lead--light">We revamp outdated property websites into modern, mobile-first platforms — premium visuals, faster performance, CRM-connected lead flows, and inventory your sales team can trust.</p>
        <div class="redev-cta-row">
          <a href="../contact.html" class="redev-btn redev-btn--primary">Get in Touch <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
          <a href="#svc-contact" class="redev-btn redev-btn--ghost">Book a Free Consultation</a>
        </div>
      </header>
    </div>`,
  });
}

export function renderRedevSolutionsParallax() {
  return parallaxBand({
    id: 'redev-solutions',
    bg: '../../sliders/22.jpg',
    light: true,
    inner: `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="redev-split">
        <div class="redev-split__copy" data-aos="fade-right">
          <span class="redev-badge redev-badge--navy"><i class="fas fa-compass-drafting" aria-hidden="true"></i> Solutions</span>
          <h2 id="redev-solutions-heading" class="redev-title">RE Development Site <span class="redev-accent">Solutions</span></h2>
          <p class="redev-lead">Our team turns simple brochure sites into full-funnel property platforms — responsive on every device, unified brand theme across phases, and structured for sales teams to update inventory without friction.</p>
          <ul class="redev-check-list">
            <li><i class="fas fa-check-circle" aria-hidden="true"></i>Responsive design from mobile to desktop — no pinch-to-zoom layouts</li>
            <li><i class="fas fa-check-circle" aria-hidden="true"></i>Phase-based architecture for towers, wings, and lot releases</li>
            <li><i class="fas fa-check-circle" aria-hidden="true"></i>Virtual tours, video, and render galleries integrated natively</li>
            <li><i class="fas fa-check-circle" aria-hidden="true"></i>Lead routing to CRM with source tracking and SLA alerts</li>
          </ul>
          <a href="#redev-top-services" class="redev-link">Explore all RE site services <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
        </div>
        <div class="redev-split__media" data-aos="fade-left">
          <div class="redev-visual-panel">
            <img src="../../sliders/20.jpg" alt="RE development website solutions by Guudle IT Solutions" loading="lazy" width="640" height="480" class="redev-visual-panel__img">
            <div class="redev-visual-panel__chip redev-visual-panel__chip--1"><i class="fas fa-map-location-dot"></i> Map search</div>
            <div class="redev-visual-panel__chip redev-visual-panel__chip--2"><i class="fas fa-vr-cardboard"></i> 3D tours</div>
          </div>
        </div>
      </div>
    </div>`,
  });
}

export function renderRedevTopServicesGrid() {
  const cards = TOP_SERVICES.map((s, i) => glowCard({ ...s, delay: Math.min(i * 45, 315) })).join('');
  return `<section id="redev-top-services" class="redev-section redev-section--gray" aria-labelledby="redev-top-services-heading">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
    <header class="redev-section-head" data-aos="fade-up">
      <span class="redev-badge redev-badge--navy"><i class="fas fa-grid-2" aria-hidden="true"></i> Services</span>
      <h2 id="redev-top-services-heading" class="redev-title">Top RE Development <span class="redev-accent">Site Services</span></h2>
      <p class="redev-lead">Everything you need to launch, refresh, or scale a property development website — from custom design and performance tuning to CRM integrations and SEO for new launches.</p>
    </header>
    <div class="redev-glow-grid redev-glow-grid--4">${cards}</div>
  </div>
</section>`;
}

export function renderRedevStatsParallax() {
  const items = STATS.map((s, i) =>
    `<div class="redev-stat" data-aos="fade-up" data-aos-delay="${i * 60}">
      <strong class="redev-stat__value">${esc(s.value)}</strong>
      <span class="redev-stat__label">${esc(s.label)}</span>
    </div>`
  ).join('');
  return parallaxBand({
    id: 'redev-stats',
    bg: '../../sliders/8.jpg',
    inner: `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header class="redev-section-head redev-section-head--light redev-section-head--compact" data-aos="fade-up">
        <h2 id="redev-stats-heading" class="redev-title redev-title--light">Why Choose Guudle for <span class="redev-accent">RE Development Sites</span></h2>
        <p class="redev-lead redev-lead--light">Enterprise delivery, property-domain expertise, and measurable outcomes — from first workshop to launch and beyond.</p>
      </header>
      <div class="redev-stats-grid">${items}</div>
    </div>`,
  });
}

export function renderRedevSectorGrid() {
  const cards = RE_SECTORS.map((s, i) =>
    `<article class="redev-sector-card" data-aos="fade-up" data-aos-delay="${Math.min(i * 50, 300)}">
      <span class="redev-sector-card__icon"><i class="fas ${s.icon}" aria-hidden="true"></i></span>
      <h3 class="redev-sector-card__title">${esc(s.title)}</h3>
      <p class="redev-sector-card__desc">${esc(s.desc)}</p>
    </article>`
  ).join('');
  return `<section id="redev-sectors" class="redev-section redev-section--white" aria-labelledby="redev-sectors-heading">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
    <header class="redev-section-head" data-aos="fade-up">
      <span class="redev-badge redev-badge--navy"><i class="fas fa-building" aria-hidden="true"></i> Sectors</span>
      <h2 id="redev-sectors-heading" class="redev-title">RE Development Sites for <span class="redev-accent">Every Property Type</span></h2>
      <p class="redev-lead">Whether you are launching a luxury tower, master-planned community, or commercial park — we tailor structure, content, and integrations to your asset class.</p>
    </header>
    <div class="redev-sector-grid">${cards}</div>
  </div>
</section>`;
}

export function renderRedevSignsGrid() {
  const cards = REDesign_SIGNS.map((s, i) =>
    `<article class="redev-sign-card" data-aos="fade-up" data-aos-delay="${Math.min(i * 45, 270)}">
      <span class="redev-sign-card__icon"><i class="fas ${s.icon}" aria-hidden="true"></i></span>
      <h3 class="redev-sign-card__title">${esc(s.title)}</h3>
      <p class="redev-sign-card__desc">${esc(s.desc)}</p>
    </article>`
  ).join('');
  return `<section id="redev-signs" class="redev-section redev-section--gray" aria-labelledby="redev-signs-heading">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
    <header class="redev-section-head" data-aos="fade-up">
      <span class="redev-badge redev-badge--navy"><i class="fas fa-triangle-exclamation" aria-hidden="true"></i> Redesign Signals</span>
      <h2 id="redev-signs-heading" class="redev-title">When Your RE Site <span class="redev-accent">Needs a Redesign</span></h2>
      <p class="redev-lead">If any of these sound familiar, a strategic refresh can recover lost leads, improve search visibility, and give your sales team a platform they trust.</p>
    </header>
    <div class="redev-sign-grid">${cards}</div>
  </div>
</section>`;
}

export function renderRedevPortfolioParallax() {
  const cards = PORTFOLIO.map((p, i) =>
    `<article class="redev-portfolio-card" data-aos="fade-up" data-aos-delay="${Math.min(i * 55, 330)}">
      <div class="redev-portfolio-card__media">
        <img src="${p.img}" alt="${esc(p.title)}" loading="lazy" width="480" height="320">
        <span class="redev-portfolio-card__tag">${esc(p.tag)}</span>
      </div>
      <div class="redev-portfolio-card__body">
        <h3 class="redev-portfolio-card__title">${esc(p.title)}</h3>
        <p class="redev-portfolio-card__desc">${esc(p.desc)}</p>
        <a href="../portfolio.html" class="redev-link redev-link--light">View portfolio <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
      </div>
    </article>`
  ).join('');
  return parallaxBand({
    id: 'redev-portfolio',
    bg: '../../sliders/28.jpg',
    inner: `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header class="redev-section-head redev-section-head--light" data-aos="fade-up">
        <span class="redev-badge"><i class="fas fa-folder-open" aria-hidden="true"></i> Portfolio</span>
        <h2 id="redev-portfolio-heading" class="redev-title redev-title--light">RE Development <span class="redev-accent">Success Stories</span></h2>
        <p class="redev-lead redev-lead--light">Selected projects where refreshed property websites drove measurable lead growth, faster sales cycles, and stronger brand presence.</p>
      </header>
      <div class="redev-portfolio-grid">${cards}</div>
      <p class="redev-portfolio-cta" data-aos="fade-up">
        <a href="../contact.html" class="redev-btn redev-btn--primary">Let's Create a Stunning, High-Performing Site <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
      </p>
    </div>`,
  });
}

export function renderRedevInjectedSections() {
  return [
    renderRedevTransformParallax(),
    renderRedevSolutionsParallax(),
    renderRedevTopServicesGrid(),
    renderRedevStatsParallax(),
    renderRedevSectorGrid(),
    renderRedevSignsGrid(),
    renderRedevPortfolioParallax(),
  ].join('\n');
}
