/**
 * Digital Marketing pages — CMA master template renderer (matches custom-mobile-app-development.html)
 */
import { renderProcessHubCta } from './process-hub-shared.mjs';
import { renderEnterpriseFaqSection } from './faq-render.mjs';
import { renderIndustriesParallaxSection } from './industries-parallax-render.mjs';
import { renderEnterpriseParallaxSection } from './enterprise-parallax-render.mjs';
import {
  getEnterpriseParallaxBg,
  MARKETING_INTRO_PARALLAX,
  MARKETING_FEATURES_PARALLAX,
  MARKETING_CTA_PARALLAX,
} from './marketing-parallax-images.mjs';
import { MARKETING_INDUSTRIES } from './marketing-mobile-config.mjs';
import { getDeepContent } from './marketing-content-expansion.mjs';
import { marketingProcess } from './svc-shared-data.mjs';
import { renderEnterpriseValueSection } from './enterprise-value-section-render.mjs';

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function faIcon(icon) {
  if (!icon) return 'fas fa-circle';
  return icon.includes(' ') ? icon : `fas ${icon}`;
}

function glowCard({ icon, title, desc, items, delay = 0, dark = false }) {
  const list = items?.length
    ? `<ul class="cma-glow-card__list">${items.map((i) =>
      `<li><i class="fas fa-check" aria-hidden="true"></i>${esc(i)}</li>`
    ).join('')}</ul>`
    : '';
  return `<article class="cma-glow-card${dark ? ' cma-glow-card--dark' : ''}" data-aos="fade-up" data-aos-delay="${delay}">
    <span class="cma-glow-card__glow" aria-hidden="true"></span>
    <span class="cma-glow-card__shine" aria-hidden="true"></span>
    <span class="cma-glow-card__icon"><i class="${faIcon(icon)}" aria-hidden="true"></i></span>
    <h3 class="cma-glow-card__title">${esc(title)}</h3>
    ${desc ? `<p class="cma-glow-card__desc">${esc(desc)}</p>` : ''}
    ${list}
  </article>`;
}

function parallaxSection({ id, bg, light = false, inner }) {
  return `<section id="${id}" class="cma-parallax guudle-parallax-section" data-svc-parallax-section data-svc-parallax-speed="0.32" data-parallax-scale="1.07" aria-labelledby="${id}-heading">
  <div class="cma-parallax__ambient" aria-hidden="true">
    <span class="cma-parallax__orb cma-parallax__orb--1"></span>
    <span class="cma-parallax__orb cma-parallax__orb--2"></span>
  </div>
  <div class="cma-parallax__bg guudle-parallax-layer slp-parallax__bg" style="background-image:url('${bg}')" role="img" aria-label="Section background"></div>
  <div class="cma-parallax__overlay${light ? ' cma-parallax__overlay--light' : ''}" aria-hidden="true"></div>
  <div class="cma-parallax__content py-20 sm:py-28">${inner}</div>
</section>`;
}

const WHY_US_MARKETING = [
  'Certified Platform Specialists',
  'Data-Driven Strategies',
  'Transparent Reporting',
  'Dedicated Account Manager',
  'AI-Powered Marketing',
  'Conversion Optimization',
  'Enterprise Security & Compliance',
  'Proven ROI Results',
  'Continuous Optimization',
  'Long-Term Partnership',
  'Cross-Channel Integration',
  'Executive-Ready Dashboards',
];

const ENTERPRISE_PARALLAX_COPY = {
  promotion: {
    titleHtml: 'Launch Promotions That <span class="ent-parallax__accent">Drive Real Demand</span>',
    lead: 'From seasonal campaigns to product launches — we architect promotional strategies with urgency messaging, multi-channel distribution, and real-time optimization that converts interest into revenue without eroding margin.',
    floats: [{ icon: 'fa-bullhorn', label: 'Campaigns' }, { icon: 'fa-tags', label: 'Offers' }, { icon: 'fa-chart-pie', label: 'ROI' }, { icon: 'fa-users', label: 'Audiences' }],
  },
  seo: {
    titleHtml: 'Rank Higher. <span class="ent-parallax__accent">Convert Better.</span>',
    lead: 'Technical SEO, content authority, and local visibility programs engineered for sustainable organic growth — with transparent ranking reports tied directly to pipeline and revenue outcomes.',
    floats: [{ icon: 'fa-magnifying-glass-chart', label: 'Rankings' }, { icon: 'fa-key', label: 'Keywords' }, { icon: 'fa-link', label: 'Authority' }, { icon: 'fa-chart-line', label: 'Traffic' }],
  },
  'social-media-marketing': {
    titleHtml: 'Social Media That <span class="ent-parallax__accent">Builds Brands</span>',
    lead: 'Platform-native content, community management, and paid social amplification — designed to grow followers, engagement, and conversions across every major network your audience uses daily.',
    floats: [{ icon: 'fa-hashtag', label: 'Content' }, { icon: 'fa-heart', label: 'Engagement' }, { icon: 'fa-video', label: 'Reels' }, { icon: 'fa-bullhorn', label: 'Paid Social' }],
  },
  'influencer-marketing': {
    titleHtml: 'Influencer Partnerships <span class="ent-parallax__accent">With Real ROI</span>',
    lead: 'End-to-end creator programs — discovery, vetting, campaign management, and performance tracking — that authentically reach your target audience and drive measurable conversions.',
    floats: [{ icon: 'fa-user-check', label: 'Vetting' }, { icon: 'fa-handshake', label: 'Partnerships' }, { icon: 'fa-clapperboard', label: 'Content' }, { icon: 'fa-chart-simple', label: 'Tracking' }],
  },
  'performance-marketing': {
    titleHtml: 'Performance Marketing <span class="ent-parallax__accent">Measured to the Dollar</span>',
    lead: 'Full-funnel programs optimized for CPA, ROAS, and LTV — spanning search, social, display, and affiliate channels with rigorous attribution and continuous testing.',
    floats: [{ icon: 'fa-funnel-dollar', label: 'Full Funnel' }, { icon: 'fa-flask', label: 'A/B Tests' }, { icon: 'fa-crosshairs', label: 'Targeting' }, { icon: 'fa-chart-pie', label: 'Attribution' }],
  },
  'google-ads-management': {
    titleHtml: 'Google Ads <span class="ent-parallax__accent">Managed for Maximum ROAS</span>',
    lead: 'Search, Display, Shopping, YouTube, and Performance Max campaigns — with conversion tracking, quality score optimization, and weekly bid adjustments by certified specialists.',
    floats: [{ icon: 'fa-magnifying-glass', label: 'Search' }, { icon: 'fa-cart-shopping', label: 'Shopping' }, { icon: 'fa-play', label: 'YouTube' }, { icon: 'fa-rotate', label: 'Remarketing' }],
  },
  'meta-ads-management': {
    titleHtml: 'Meta Ads That <span class="ent-parallax__accent">Scale Profitably</span>',
    lead: 'Facebook and Instagram advertising with precise audience layering, creative testing frameworks, and Conversions API tracking for leads and e-commerce sales post-iOS privacy changes.',
    floats: [{ icon: 'fab fa-facebook', label: 'Facebook' }, { icon: 'fab fa-instagram', label: 'Instagram' }, { icon: 'fa-user-plus', label: 'Lead Gen' }, { icon: 'fa-palette', label: 'Creative' }],
  },
  'search-engine-ads': {
    titleHtml: 'Capture <span class="ent-parallax__accent">High-Intent Demand</span>',
    lead: 'Paid search across Google and Microsoft Ads — keyword strategy, ad copy testing, negative keyword sculpting, and landing page alignment that lowers CPA and increases qualified leads.',
    floats: [{ icon: 'fa-magnifying-glass', label: 'Keywords' }, { icon: 'fa-file-lines', label: 'Ad Copy' }, { icon: 'fa-window-maximize', label: 'Landing Pages' }, { icon: 'fa-chart-bar', label: 'ROAS' }],
  },
  'bundle-marketing': {
    titleHtml: 'Integrated Marketing <span class="ent-parallax__accent">One Strategy, Every Channel</span>',
    lead: 'Bundle packages combining SEO, paid media, email, and social — one team, unified reporting, and cross-channel optimization that outperforms disconnected agency relationships.',
    floats: [{ icon: 'fa-layer-group', label: 'Integration' }, { icon: 'fa-chart-network', label: 'Analytics' }, { icon: 'fa-users', label: 'One Team' }, { icon: 'fa-arrows-spin', label: 'Optimization' }],
  },
  'email-marketing': {
    titleHtml: 'Email Marketing That <span class="ent-parallax__accent">Drives Revenue</span>',
    lead: 'Lifecycle programs — welcome series, newsletters, automation, and segmentation — with deliverability best practices that land in inboxes and maximize customer lifetime value.',
    floats: [{ icon: 'fa-envelope', label: 'Campaigns' }, { icon: 'fa-robot', label: 'Automation' }, { icon: 'fa-users', label: 'Segments' }, { icon: 'fa-flask', label: 'A/B Tests' }],
  },
  'whatsapp-marketing': {
    titleHtml: 'WhatsApp Marketing With <span class="ent-parallax__accent">98% Open Rates</span>',
    lead: 'WhatsApp Business API campaigns — broadcasts, automated messaging, chatbots, and CRM integration for high-engagement customer communication that drives sales and support efficiency.',
    floats: [{ icon: 'fab fa-whatsapp', label: 'Broadcasts' }, { icon: 'fa-robot', label: 'Chatbots' }, { icon: 'fa-comments', label: 'Engagement' }, { icon: 'fa-plug', label: 'CRM Sync' }],
  },
  'sms-marketing': {
    titleHtml: 'SMS Marketing — <span class="ent-parallax__accent">Instant Reach</span>',
    lead: 'TCPA-compliant text campaigns with segmentation, automation, and two-way messaging — delivering promotions, alerts, and nurture sequences with industry-leading open and response rates.',
    floats: [{ icon: 'fa-comment-sms', label: 'Promotions' }, { icon: 'fa-bell', label: 'Alerts' }, { icon: 'fa-robot', label: 'Automation' }, { icon: 'fa-shield-halved', label: 'Compliance' }],
  },
  marketplace: {
    titleHtml: 'Marketplace Selling <span class="ent-parallax__accent">At Scale</span>',
    lead: 'Amazon, Walmart, eBay, and Etsy management — account health, catalog optimization, marketplace PPC, and operations that scale revenue without scaling headcount.',
    floats: [{ icon: 'fab fa-amazon', label: 'Amazon' }, { icon: 'fa-box', label: 'Catalog' }, { icon: 'fa-chart-line', label: 'PPC' }, { icon: 'fa-star', label: 'Reviews' }],
  },
  'ecommerce-management': {
    titleHtml: 'E-Commerce Management <span class="ent-parallax__accent">Built for Growth</span>',
    lead: 'Store optimization, catalog management, promotions, analytics, and CRO for Shopify, WooCommerce, and custom platforms — turning traffic into repeat customers and growing revenue.',
    floats: [{ icon: 'fa-cart-shopping', label: 'Store Ops' }, { icon: 'fa-percent', label: 'Promotions' }, { icon: 'fa-wand-magic-sparkles', label: 'CRO' }, { icon: 'fa-chart-line', label: 'Analytics' }],
  },
  'product-listing': {
    titleHtml: 'Product Listings That <span class="ent-parallax__accent">Win the Buy Box</span>',
    lead: 'Optimized titles, bullets, A+ content, and imagery across marketplaces — engineered for discoverability, conversion, and compliance with platform listing requirements.',
    floats: [{ icon: 'fa-list', label: 'Listings' }, { icon: 'fa-image', label: 'Imagery' }, { icon: 'fa-pen', label: 'Copy' }, { icon: 'fa-ranking-star', label: 'Rankings' }],
  },
  'marketplace-seo': {
    titleHtml: 'Marketplace SEO For <span class="ent-parallax__accent">Maximum Visibility</span>',
    lead: 'Amazon A9, Walmart SEO, and multi-marketplace search optimization — keyword research, backend terms, and competitive analysis that puts your products in front of ready-to-buy shoppers.',
    floats: [{ icon: 'fa-magnifying-glass', label: 'Keywords' }, { icon: 'fa-arrow-up-right-dots', label: 'Rankings' }, { icon: 'fa-box-open', label: 'Listings' }, { icon: 'fa-chart-line', label: 'Sales' }],
  },
};

function whyBenefitsFor(page) {
  const fromHighlights = page.overview?.highlights || [];
  const generic = [
    'Increase qualified leads and pipeline velocity',
    'Improve conversion rates across every touchpoint',
    'Reduce cost per acquisition with data-driven optimization',
    'Build stronger brand awareness and category authority',
    'Gain transparent ROI reporting tied to revenue',
    'Scale campaigns confidently with dedicated specialists',
    'Integrate marketing data with CRM and analytics stacks',
    'Stay ahead of competitors with continuous testing',
  ];
  const merged = [...fromHighlights, ...generic].slice(0, 8);
  return merged;
}

function enrichServiceDesc(f, page) {
  const label = page.title;
  return `${f.desc} Our ${label} team implements proven frameworks with creative excellence, rigorous A/B testing, and executive-ready dashboards — ensuring every initiative ties to measurable pipeline growth and long-term brand equity. We document hypotheses, run controlled experiments, and report results in language your leadership team can act on immediately. Each deliverable is mapped to funnel stage, audience segment, and revenue KPI so nothing is executed without strategic purpose.`;
}

function featureItems(f) {
  if (f.points?.length) return f.points;
  return [
    'Strategy aligned to your funnel and KPI targets',
    'Execution with platform-certified specialists',
    'Weekly optimization and transparent reporting',
    'Integration with CRM and analytics tools',
  ];
}

/**
 * @param {object} page — MARKETING_PAGES entry with slug
 */
export function renderMarketingCmaMain(page) {
  const slug = page.slug;
  const epCopy = ENTERPRISE_PARALLAX_COPY[slug] || {
    titleHtml: `${esc(page.title)} <span class="ent-parallax__accent">That Delivers Results</span>`,
    lead: page.subhead,
    floats: [{ icon: 'fa-chart-line', label: 'ROI' }, { icon: 'fa-bullseye', label: 'Strategy' }, { icon: 'fa-robot', label: 'Automation' }, { icon: 'fa-chart-bar', label: 'Analytics' }],
  };

  const headlineLine2 = page.headlineAccent || '';
  const h1Html = headlineLine2
    ? `${esc(page.headline)}<br class="hidden sm:block"><span class="block sm:inline mt-2 sm:mt-0 hero-title-navy__line hero-title-navy__line--inline">${esc(headlineLine2)}</span>`
    : esc(page.headline);

  const hero = `<section id="cma-hero" class="saas-hero saas-hero--light hero-premium hero-premium--enterprise hero-premium--center" aria-labelledby="cma-hero-heading" data-svc-hero>
      <div class="hero-aurora hero-aurora-1" data-hero-parallax="0.1" aria-hidden="true"></div>
      <div class="hero-aurora hero-aurora-2" data-hero-parallax="0.14" aria-hidden="true"></div>
      <div class="hero-aurora hero-aurora-3" data-hero-parallax="0.08" aria-hidden="true"></div>
      <div class="hero-dot-grid" aria-hidden="true"></div>
      <div class="hero-beam" aria-hidden="true"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-[96px] relative z-10">
        <div class="py-14 lg:py-20">
          <div class="max-w-4xl mx-auto text-center">
            <nav class="text-sm text-slate-500 mb-7 flex flex-wrap justify-center" aria-label="Breadcrumb" data-aos="fade-up">
              <a href="../../index.html" class="hover:text-slate-800 transition-colors">Home</a><span class="mx-2 text-slate-300">/</span>
              <a href="../../index.html#services" class="hover:text-slate-800 transition-colors">Services</a><span class="mx-2 text-slate-300">/</span>
              <span class="text-slate-900 font-semibold">${esc(page.title)}</span>
            </nav>
            <div class="hero-enter hero-enter-d1 hero-badge hero-badge--navy mb-7 mx-auto" data-aos="fade-up">
              <span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60"></span><span class="relative rounded-full h-2 w-2 bg-cyan-600"></span></span>
              <span>${esc(page.badge)}</span>
              <span class="hero-badge__div" aria-hidden="true"></span>
              <span class="hero-badge__rating"><i class="fas fa-star"></i> Enterprise grade</span>
            </div>
            <h1 id="cma-hero-heading" class="hero-enter hero-enter-d2 hero-title-navy font-display hero-title text-[2.25rem] sm:text-4xl xl:text-[3.25rem] font-extrabold leading-[1.08] mb-5 text-center mx-auto" data-aos="fade-up" data-aos-delay="50">${h1Html}</h1>
            <p class="hero-enter hero-enter-d3 text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl mx-auto" data-aos="fade-up" data-aos-delay="100">${esc(page.subhead)}</p>
            <div class="hero-enter hero-enter-d4 flex flex-wrap gap-3 mb-9 justify-center" data-aos="fade-up" data-aos-delay="150">
              <a href="../contact.html" class="hero-cta-navy-primary magnetic inline-flex items-center gap-2 px-6 py-3.5 text-sm">Get Started Today <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
              <a href="#svc-contact" class="hero-cta-navy-secondary inline-flex items-center gap-2 px-6 py-3.5 text-sm"><i class="fas fa-calendar-check text-cyan-600"></i> Book Free Consultation</a>
            </div>
            <div class="hero-enter hero-enter-d5 hero-enterprise-grid hero-enterprise-grid--center" data-aos="fade-up" data-aos-delay="200">
              <article class="hero-enterprise-card"><span class="hero-enterprise-card__icon"><i class="fas fa-chart-line" aria-hidden="true"></i></span><div><strong>Measurable ROI</strong><p>Campaigns tied to leads, revenue, and ROAS.</p></div></article>
              <article class="hero-enterprise-card"><span class="hero-enterprise-card__icon"><i class="fas fa-bullseye" aria-hidden="true"></i></span><div><strong>Data-Driven</strong><p>Analytics-led planning and optimization.</p></div></article>
              <article class="hero-enterprise-card"><span class="hero-enterprise-card__icon"><i class="fas fa-wand-magic-sparkles" aria-hidden="true"></i></span><div><strong>AI-Powered</strong><p>Automation and intelligent targeting.</p></div></article>
              <article class="hero-enterprise-card"><span class="hero-enterprise-card__icon"><i class="fas fa-user-tie" aria-hidden="true"></i></span><div><strong>Dedicated Team</strong><p>Certified strategists on your account.</p></div></article>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-divider" aria-hidden="true"><span class="hero-divider__line"></span><span class="hero-divider__gem"></span><span class="hero-divider__line"></span></div>
    </section>`;

  const introBg = MARKETING_INTRO_PARALLAX[slug] || MARKETING_INTRO_PARALLAX.seo;
  const overviewExtra = ` Guudle IT Solutions combines strategic consulting with hands-on execution — certified platform specialists, creative teams, and analytics engineers working as one accountable unit. We audit current performance, identify high-ROI opportunities, build integrated campaigns, and optimize continuously for sustainable growth. Every engagement includes transparent reporting, CRM integration, and executive summaries tied to leads, ROAS, CAC, and revenue.`;
  const intro = parallaxSection({
    id: 'cma-intro',
    bg: introBg,
    light: true,
    inner: `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header class="cma-section-head" data-aos="fade-up">
        <span class="cma-badge mb-4"><i class="fas fa-bullhorn" aria-hidden="true"></i> ${esc(page.badge)}</span>
        <h2 id="cma-intro-heading" class="cma-title">${esc(page.overview?.title || page.title)} <span style="color:#10A5F5">By Guudle</span></h2>
        <p class="cma-lead">${esc((page.overview?.text || '') + overviewExtra)}</p>
        <p class="cma-lead mt-4">Whether you are scaling a startup pipeline or optimizing enterprise media spend across regions, our ${esc(page.title)} programs align every tactic to business outcomes — reducing wasted spend, improving conversion rates, and building brand equity that compounds quarter over quarter.</p>
      </header>
    </div>`,
  });

  const whyBenefits = whyBenefitsFor(page);
  const whySection = `<section id="cma-why" class="py-20 sm:py-28 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header class="cma-section-head" data-aos="fade-up">
        <h2 class="cma-title">Why Your Business Needs ${esc(page.title)}</h2>
        <p class="cma-lead">Professional ${esc(page.title.toLowerCase())} enables your organization to reach buyers, build trust, and convert demand into measurable revenue.</p>
      </header>
      <div class="cma-check-grid">${whyBenefits.map((b, i) =>
        `<div class="cma-check-item" data-aos="fade-up" data-aos-delay="${Math.min(i * 40, 280)}"><i class="fas fa-circle-check" aria-hidden="true"></i>${esc(b)}</div>`
      ).join('')}</div>
    </div>
  </section>`;

  const features = page.features || [];
  const servicesSection = `<section id="cma-services" class="py-20 sm:py-28 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header class="cma-section-head" data-aos="fade-up">
        <span class="cma-badge mb-4"><i class="fas fa-layer-group" aria-hidden="true"></i> Our Services</span>
        <h2 class="cma-title">Our ${esc(page.title)} Services</h2>
        <p class="cma-lead">Comprehensive ${esc(page.title.toLowerCase())} capabilities — strategy, execution, analytics, and optimization under one accountable team.</p>
      </header>
      <div class="cma-glow-grid cma-glow-grid--2 lg:grid-cols-3 gap-6">${features.map((f, i) =>
        glowCard({
          icon: f.icon,
          title: f.title,
          desc: enrichServiceDesc(f, page),
          items: featureItems(f),
          delay: i * 55,
        })
      ).join('')}</div>
    </div>
  </section>`;

  const enterpriseParallax = renderEnterpriseParallaxSection({
    slug,
    bgUrl: getEnterpriseParallaxBg(slug),
    bgAlt: `${page.title} — enterprise marketing parallax background`,
    badge: page.badge,
    badgeIcon: 'fa-chart-line',
    titleHtml: epCopy.titleHtml,
    lead: epCopy.lead,
    floatIcons: epCopy.floats,
    primaryCta: 'Get Started Today',
    secondaryCta: 'Book Free Consultation',
  });

  const techGroups = (page.tech || []).reduce((acc, t, i) => {
    const gi = Math.floor(i / 3);
    if (!acc[gi]) acc[gi] = { icon: 'fa-plug', title: gi === 0 ? 'Analytics & Ads' : gi === 1 ? 'Automation & CRM' : 'Commerce & Tools', items: [] };
    acc[gi].items.push(t.name);
    return acc;
  }, []);
  const featureCards = techGroups.length
    ? techGroups.map((g, i) => glowCard({ ...g, dark: true, delay: i * 50 }))
    : features.slice(0, 6).map((f, i) => glowCard({ icon: f.icon, title: f.title, desc: f.desc, items: featureItems(f).slice(0, 4), dark: true, delay: i * 50 }));

  const featuresParallax = parallaxSection({
    id: 'cma-features',
    bg: MARKETING_FEATURES_PARALLAX[slug] || MARKETING_FEATURES_PARALLAX.seo,
    inner: `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header class="cma-section-head cma-section-head--light" data-aos="fade-up">
        <span class="cma-badge mb-4"><i class="fas fa-microchip" aria-hidden="true"></i> Technologies & Platforms</span>
        <h2 id="cma-features-heading" class="cma-title">Tools We Master for ${esc(page.title)}</h2>
        <p class="cma-lead">Best-in-class platforms for campaign execution, analytics, automation, and conversion optimization — integrated into one accountable growth engine.</p>
      </header>
      <div class="cma-glow-grid cma-glow-grid--2 lg:grid-cols-3 gap-6">${featureCards.join('')}</div>
    </div>`,
  });

  const industriesSection = renderIndustriesParallaxSection({
    industries: MARKETING_INDUSTRIES,
    slug,
    sectionId: 'cma-industries',
    contactLink: '#svc-contact',
    lead: `We deliver ${page.title.toLowerCase()} programs across regulated, competitive, and high-growth sectors — with compliance-aware messaging and analytics built for your industry's buying cycle.`,
    pathPrefix: '../../',
  });

  const processHub = renderProcessHubCta({
    linkPrefix: '../',
    badge: 'Marketing Process',
    title: 'Our Proven Marketing Process',
    desc: 'Discovery, research, strategy, campaign planning, content creation, launch, optimization, and transparent reporting — discover how our strategists transform marketing goals into measurable revenue outcomes.',
    btn: 'Explore Our Marketing Process',
  });

  const deep = getDeepContent(slug);
  const closingPara = `Partner with Guudle IT Solutions for ${page.title.toLowerCase()} that combines strategic clarity, creative excellence, and analytics rigor — the same enterprise discipline trusted by growth-stage startups and global brands alike. Request a consultation to receive a tailored roadmap, competitive assessment, and transparent proposal aligned to your goals, timeline, and budget. Our onboarding process is efficient, collaborative, and designed to deliver early wins within the first thirty days of engagement.`;
  const deepSection = `<section id="cma-deep-dive" class="py-20 sm:py-28 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header class="cma-section-head" data-aos="fade-up">
        <span class="cma-badge mb-4"><i class="fas fa-book-open" aria-hidden="true"></i> In Depth</span>
        <h2 class="cma-title">${esc(deep.title)}</h2>
      </header>
      <div class="max-w-4xl mx-auto space-y-6">${[...deep.paragraphs, closingPara].map((para, i) =>
        `<p class="cma-lead${i > 0 ? ' mt-0' : ''}" data-aos="fade-up" data-aos-delay="${Math.min(i * 60, 300)}">${esc(para)}</p>`
      ).join('')}</div>
    </div>
  </section>`;

  const processSteps = marketingProcess || [];
  const stepIcons = ['fa-compass', 'fa-magnifying-glass', 'fa-chess', 'fa-calendar-days', 'fa-pen-ruler', 'fa-rocket', 'fa-gauge-high', 'fa-sliders', 'fa-chart-bar', 'fa-arrow-trend-up'];
  const processSection = `<section id="cma-process" class="py-20 sm:py-28 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header class="cma-section-head" data-aos="fade-up">
        <span class="cma-badge mb-4"><i class="fas fa-route" aria-hidden="true"></i> Our Process</span>
        <h2 class="cma-title">How We Deliver ${esc(page.title)}</h2>
        <p class="cma-lead">A proven methodology from discovery through scaling — transparent milestones, accountable KPIs, and continuous optimization at every stage.</p>
      </header>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">${processSteps.map((step, i) =>
        `<article class="cma-glow-card" data-aos="fade-up" data-aos-delay="${Math.min(i * 40, 360)}">
          <span class="cma-glow-card__glow" aria-hidden="true"></span>
          <span class="cma-glow-card__icon"><i class="fas ${stepIcons[i % stepIcons.length]}" aria-hidden="true"></i></span>
          <h3 class="cma-glow-card__title">${esc(step.t)}</h3>
          <p class="cma-glow-card__desc">${esc(step.d)} ${esc(step.detail || '')}</p>
        </article>`
      ).join('')}</div>
    </div>
  </section>`;

  const valueSection = renderEnterpriseValueSection(
    { slug, sectionTitles: page.sectionTitles },
    {
      sectionId: 'cma-value',
      slug,
      badge: 'Why Choose Us',
      title: 'Why Businesses Choose Us',
      accent: 'Us',
      lead: `Enterprise-grade ${esc(page.title)} focused on strategy, execution, and long-term partnership — not vanity metrics.`,
    },
  );

  const testimonialsSection = `<section id="cma-testimonials" class="py-20 sm:py-28 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header class="cma-section-head" data-aos="fade-up">
        <span class="cma-badge mb-4"><i class="fas fa-quote-left" aria-hidden="true"></i> Client Success</span>
        <h2 class="cma-title">What Our Clients Say</h2>
        <p class="cma-lead">Enterprise leaders trust Guudle IT Solutions for ${esc(page.title.toLowerCase())} that delivers measurable business impact.</p>
      </header>
      <div class="grid md:grid-cols-3 gap-6">${[
    { quote: 'Guudle rebuilt our marketing engine from the ground up — measurable traffic growth, improved ROAS, and dashboards our executives use every week.', name: 'Sarah Chen', role: 'VP Marketing', company: 'FinScale Technologies' },
    { quote: 'Their team operates like an extension of ours — transparent reporting, rapid testing, and campaigns that consistently beat our CPA targets.', name: 'Marcus Webb', role: 'Director of Growth', company: 'NovaRetail Group' },
    { quote: 'From strategy through execution, every channel was aligned. We saw pipeline impact within 60 days and sustained growth quarter over quarter.', name: 'Priya Sharma', role: 'CMO', company: 'HealthBridge Systems' },
  ].map((t, i) =>
    `<blockquote class="cma-glow-card" data-aos="fade-up" data-aos-delay="${i * 70}">
      <span class="cma-glow-card__glow" aria-hidden="true"></span>
      <div class="cpox-testimonial__stars mb-3" aria-label="5 out of 5 stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
      <p class="cma-glow-card__desc">"${esc(t.quote)}"</p>
      <footer class="mt-4 text-sm"><strong>${esc(t.name)}</strong><br><span class="text-slate-500">${esc(t.role)}, ${esc(t.company)}</span></footer>
    </blockquote>`
  ).join('')}</div>
    </div>
  </section>`;

  const whyUsSection = `<section id="cma-why-us" class="py-20 sm:py-28 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header class="cma-section-head" data-aos="fade-up">
        <h2 class="cma-title">Why Choose Guudle for ${esc(page.title)}?</h2>
        <p class="cma-lead">Certified experts, data-driven strategies, and transparent reporting — built for sustainable growth and long-term partnership.</p>
      </header>
      <div class="cma-glow-grid cma-glow-grid--2 lg:grid-cols-4 gap-4">${WHY_US_MARKETING.map((w, i) =>
        `<article class="cma-glow-card" data-aos="fade-up" data-aos-delay="${Math.min(i * 35, 350)}">
          <span class="cma-glow-card__glow" aria-hidden="true"></span>
          <span class="cma-glow-card__shine" aria-hidden="true"></span>
          <span class="cma-glow-card__icon"><i class="fas fa-check" aria-hidden="true"></i></span>
          <h3 class="cma-glow-card__title">${esc(w)}</h3>
        </article>`
      ).join('')}</div>
    </div>
  </section>`;

  const faqSection = renderEnterpriseFaqSection({
    id: 'cma-faq',
    badge: 'FAQ',
    title: `Frequently Asked Questions — ${page.title}`,
    subtitle: `Common questions about our ${page.title.toLowerCase()} services.`,
    faqs: page.faqs || [],
    aos: true,
  });

  const ctaParallax = parallaxSection({
    id: 'cma-cta',
    bg: MARKETING_CTA_PARALLAX[slug] || MARKETING_CTA_PARALLAX.seo,
    inner: `<div class="max-w-4xl mx-auto px-4 sm:px-6 cma-cta-band" data-aos="fade-up">
      <h2 id="cma-cta-heading">${esc(page.cta || `Ready to Grow with ${page.title}?`)}</h2>
      <p>${esc(page.ctaSubtext || `Partner with Guudle IT Solutions for data-driven ${page.title.toLowerCase()} that generates more traffic, qualified leads, and measurable business growth.`)}</p>
      <div class="flex flex-wrap justify-center gap-3">
        <a href="../contact.html" class="cma-btn-primary">Get Started Today <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
        <a href="#svc-contact" class="cma-btn-outline"><i class="fas fa-calendar-check" aria-hidden="true"></i> Book Free Consultation</a>
      </div>
    </div>`,
  });

  const contactSection = `<section id="svc-contact" class="cpox-section cpox-section--gray cpox-contact py-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="cpox-contact-grid">
        <div class="cpox-contact-aside" data-aos="fade-up">
          <div class="cpox-label"><span class="cpox-label__line" aria-hidden="true"></span><span class="cpox-label__text">Contact</span></div>
          <h2 class="cpox-title font-display">Start Your <span class="cpox-accent">${esc(page.title)}</span> Project</h2>
          <p class="cpox-lead">Tell us about your marketing goals. We respond within one business day.</p>
          <ul class="cpox-contact-list">
            <li><i class="fas fa-envelope" aria-hidden="true"></i> hello@guudle.com</li>
            <li><i class="fas fa-phone" aria-hidden="true"></i> <a href="tel:+447908727559">07908 727559</a></li>
            <li><i class="fas fa-clock" aria-hidden="true"></i> Response within 24 hours</li>
          </ul>
        </div>
        <form id="svc-contact-form" class="cpox-contact-form" data-aos="fade-up" data-aos-delay="80" novalidate>
          <div data-slp-field>
            <label for="svc-name">Full Name <span class="text-red-500">*</span></label>
            <input type="text" id="svc-name" name="name" class="slp-form-input" required placeholder="Your full name" autocomplete="name">
            <span class="slp-form-error" role="alert"></span>
          </div>
          <div data-slp-field>
            <label for="svc-email">Work Email <span class="text-red-500">*</span></label>
            <input type="email" id="svc-email" name="email" class="slp-form-input" required placeholder="you@company.com" autocomplete="email">
            <span class="slp-form-error" role="alert"></span>
          </div>
          <div data-slp-field>
            <label for="svc-message">Project Details <span class="text-red-500">*</span></label>
            <textarea id="svc-message" name="message" rows="4" class="slp-form-input resize-y" required placeholder="Describe your marketing goals and timeline..."></textarea>
            <span class="slp-form-error" role="alert"></span>
          </div>
          <button type="submit" class="cpox-cta__btn cpox-cta__btn--primary cpox-cta__btn--full">Submit Inquiry <i class="fas fa-paper-plane" aria-hidden="true"></i></button>
        </form>
      </div>
    </div>
  </section>`;

  const related = page.related || [];
  const relatedSection = related.length ? `<section class="svc-related py-12 bg-white border-t border-slate-100" aria-label="Related services">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p class="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Related Services</p>
      <div class="flex flex-wrap gap-3">${related.map((r) =>
        `<a href="${esc(r.href)}" class="svc-related__link"><i class="fas fa-arrow-right"></i>${esc(r.label)}</a>`
      ).join('')}</div>
    </div>
  </section>` : '';

  const stickyNav = `<nav class="slp-sticky-nav" data-svc-sticky-nav aria-label="Page sections">
    <div class="slp-sticky-nav__inner">
      <a href="#cma-intro" class="slp-sticky-nav__link" data-svc-nav-link>Overview</a>
      <a href="#cma-services" class="slp-sticky-nav__link" data-svc-nav-link>Services</a>
      <a href="#cma-enterprise-parallax" class="slp-sticky-nav__link" data-svc-nav-link>Enterprise</a>
      <a href="#cma-features" class="slp-sticky-nav__link" data-svc-nav-link>Technologies</a>
      <a href="#cma-industries" class="slp-sticky-nav__link" data-svc-nav-link>Industries</a>
      <a href="#cma-testimonials" class="slp-sticky-nav__link" data-svc-nav-link>Testimonials</a>
      <a href="#cma-faq" class="slp-sticky-nav__link" data-svc-nav-link>FAQ</a>
      <a href="#svc-contact" class="slp-sticky-nav__link" data-svc-nav-link>Contact</a>
    </div>
  </nav>`;

  return `
    ${hero}
    ${stickyNav}
    ${intro}
    ${whySection}
    ${servicesSection}
    ${enterpriseParallax}
    ${featuresParallax}
    ${valueSection}
    ${industriesSection}
    ${processHub}
    ${processSection}
    ${deepSection}
    ${whyUsSection}
    ${testimonialsSection}
    ${faqSection}
    ${ctaParallax}
    ${contactSection}
    ${relatedSection}
  `;
}

export function renderMarketingFaqsJsonLd(faqs) {
  return (faqs || []).map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  }));
}
