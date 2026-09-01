/**
 * Unique marketing page renderers — heroes & section variants
 */
import { marketingProcess, marketingIndustries } from './svc-shared-data.mjs';
import { renderIndustriesParallaxSection } from './industries-parallax-render.mjs';
import { renderProcessHubCta } from './process-hub-shared.mjs';
import { renderEnterpriseFaqSection } from './faq-render.mjs';
import { renderCapabilitiesSection } from './svc-capabilities-render.mjs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

function breadcrumb(title) {
  return `<nav class="mkt-crumb" aria-label="Breadcrumb">
    <a href="../../index.html">Home</a><span>/</span><span>Marketing</span><span>/</span><span class="mkt-crumb__current">${esc(title)}</span>
  </nav>`;
}

function ctas(primary = 'Get Free Consultation') {
  return `<div class="mkt-hero__ctas">
    <a href="../contact.html" class="mkt-btn mkt-btn--primary">${primary} <i class="fas fa-arrow-right"></i></a>
    <a href="#mkt-contact" class="mkt-btn mkt-btn--ghost">Schedule Strategy Call</a>
    <a href="../contact.html" class="mkt-btn mkt-btn--outline">Request Proposal</a>
  </div>`;
}

/* ─── HEROES (16 unique — light, image-led) ─── */
const HEROES = {
  campaign(c) {
    const floats = c.images.slice(10, 14).map((src, i) =>
      `<div class="mkt-float mkt-float--${i + 1}" data-mkt-float><img src="${src}" alt="${esc(c.title)} campaign visual ${i + 1}" loading="lazy" width="200" height="140"></div>`
    ).join('');
    return `<section class="mkt-hero mkt-hero--campaign" id="mkt-top" aria-labelledby="mkt-h1">
      <div class="mkt-hero__banners" aria-hidden="true">
        <span class="mkt-banner mkt-banner--1">LAUNCH</span><span class="mkt-banner mkt-banner--2">-30%</span><span class="mkt-banner mkt-banner--3">NEW</span>
      </div>
      ${floats}
      <div class="mkt-wrap mkt-hero__inner">
        ${breadcrumb(c.title)}
        <p class="mkt-hero__theme">${esc(c.tagline)}</p>
        <h1 id="mkt-h1" class="mkt-h1">${c.headline} <em>${c.headlineAccent}</em></h1>
        <p class="mkt-lead">${esc(c.subhead)}</p>
        ${ctas('Launch Your Campaign')}
        <div class="mkt-timeline-mini" aria-hidden="true">
          <span>Plan</span><span>Launch</span><span>Scale</span><span>Win</span>
        </div>
      </div>
      <div class="mkt-hero__visual mkt-hero__visual--skew">
        <img src="${c.images[1]}" alt="${esc(c.title)} campaign" loading="eager" width="720" height="540">
      </div>
    </section>`;
  },

  'promo-launch'(c) {
    const collage = c.images.slice(1, 5).map((src, i) =>
      `<figure class="mkt-promo-collage__item mkt-promo-collage__item--${i + 1}"><img src="${src}" alt="Promotion visual ${i + 1}" loading="${i === 0 ? 'eager' : 'lazy'}" width="320" height="240"></figure>`
    ).join('');
    const chips = ['Flash Sales', 'Product Launches', 'Seasonal Offers', 'Loyalty Programs'].map((t) =>
      `<span class="mkt-promo-chip"><i class="fas fa-bolt"></i>${t}</span>`
    ).join('');
    const tickets = [
      { label: 'SAVE 30%', sub: 'Limited time' },
      { label: 'NEW LAUNCH', sub: 'Go live' },
      { label: 'VIP ACCESS', sub: 'Members only' },
    ].map((t, i) =>
      `<div class="mkt-promo-ticket mkt-promo-ticket--${i + 1}"><strong>${t.label}</strong><span>${t.sub}</span></div>`
    ).join('');
    return `<section class="mkt-hero mkt-hero--promo-launch" id="mkt-top" aria-labelledby="mkt-h1">
      <div class="mkt-wrap mkt-promo-hero-grid">
        <div class="mkt-promo-hero-copy">
          ${breadcrumb(c.title)}
          <p class="mkt-hero__theme">${esc(c.tagline)}</p>
          <h1 id="mkt-h1" class="mkt-h1">${c.headline} <em>${c.headlineAccent}</em></h1>
          <p class="mkt-lead">${esc(c.subhead)}</p>
          ${ctas('Launch Your Campaign')}
          <div class="mkt-promo-chips">${chips}</div>
          <div class="mkt-promo-hero-stats">
            ${c.results.slice(0, 3).map((r) => `<div><strong>${r.value}</strong><span>${r.label}</span></div>`).join('')}
          </div>
        </div>
        <div class="mkt-promo-hero-visual">
          ${tickets}
          <div class="mkt-promo-collage">${collage}</div>
        </div>
      </div>
    </section>`;
  },

  'seo-command'(c) {
    const kw = ['seo services', 'local seo agency', 'technical seo audit', 'rank higher google'].map((k) =>
      `<span class="mkt-seo-kw">${k}</span>`
    ).join('');
    const suggestions = ['seo services near me', 'best seo company', 'seo audit checklist'].map((s, i) =>
      `<div class="mkt-seo-suggest ${i === 0 ? 'is-active' : ''}"><i class="fas fa-magnifying-glass"></i>${s}</div>`
    ).join('');
    const rows = ['Your Brand — Enterprise SEO Services', 'Competitor A — Generic SEO', 'Competitor B — Local Listings'].map((t, i) =>
      `<div class="mkt-seo-serp-row ${i === 0 ? 'is-top' : ''}"><span>${i + 1}</span><div><strong>${t.split(' — ')[0]}</strong><p>${t.split(' — ')[1] || ''}</p><em>guudle.com › seo-services</em></div></div>`
    ).join('');
    return `<section class="mkt-hero mkt-hero--seo-command" id="mkt-top" aria-labelledby="mkt-h1">
      <div class="mkt-wrap">
        ${breadcrumb(c.title)}
        <div class="mkt-seo-search-bar" aria-hidden="true">
          <i class="fab fa-google"></i>
          <span>best seo agency for growth</span>
          <i class="fas fa-microphone"></i>
        </div>
        <div class="mkt-seo-hero-grid">
          <div class="mkt-seo-hero-copy">
            <p class="mkt-hero__theme">${esc(c.tagline)}</p>
            <h1 id="mkt-h1" class="mkt-h1">${c.headline} <em>${c.headlineAccent}</em></h1>
            <p class="mkt-lead">${esc(c.subhead)}</p>
            ${ctas('Audit My Rankings')}
            <div class="mkt-seo-kw-cloud">${kw}</div>
            <div class="mkt-seo-rank-mini">
              ${[94, 81, 72, 68].map((n, i) => `<div><span>KW ${i + 1}</span><i style="width:${n}%"></i><em>${n}%</em></div>`).join('')}
            </div>
          </div>
          <div class="mkt-seo-command-panel">
            <div class="mkt-seo-suggest-list">${suggestions}</div>
            <div class="mkt-seo-serp-panel">${rows}</div>
            <img src="${c.images[3]}" alt="SEO analytics dashboard" loading="eager" width="560" height="320" class="mkt-seo-panel-chart">
            <img src="${c.images[1]}" alt="SEO strategy session" loading="lazy" width="200" height="140" class="mkt-seo-panel-float">
          </div>
        </div>
      </div>
    </section>`;
  },

  serp(c) {
    const rows = ['#1 Your Brand — Best solution', '#2 Competitor A', '#3 Competitor B', '#4 Industry guide'].map((t, i) =>
      `<div class="mkt-serp__row ${i === 0 ? 'is-top' : ''}"><span class="mkt-serp__rank">${i + 1}</span><span>${t}</span></div>`
    ).join('');
    return `<section class="mkt-hero mkt-hero--serp" id="mkt-top" aria-labelledby="mkt-h1">
      <div class="mkt-hero__grid-bg" aria-hidden="true"></div>
      <div class="mkt-wrap mkt-hero__split">
        <div>${breadcrumb(c.title)}<p class="mkt-hero__theme">${esc(c.tagline)}</p>
          <h1 id="mkt-h1" class="mkt-h1">${c.headline} <em>${c.headlineAccent}</em></h1>
          <p class="mkt-lead">${esc(c.subhead)}</p>${ctas('Audit My Rankings')}
          <div class="mkt-rank-bars">${[92, 78, 65, 54].map((n, i) => `<div class="mkt-rank-bar" style="--w:${n}%"><span>Keyword ${i + 1}</span><i style="width:${n}%"></i></div>`).join('')}</div>
        </div>
        <div class="mkt-serp" data-mkt-float>${rows}<img class="mkt-serp__chart" src="${c.images[2]}" alt="SEO analytics" loading="eager" width="600" height="400"></div>
      </div>
    </section>`;
  },

  'social-grid'(c) {
    const tiles = c.images.slice(2, 8).map((src, i) =>
      `<div class="mkt-ig-tile mkt-ig-tile--${i + 1}"><img src="${src}" alt="Social content ${i + 1}" loading="${i < 2 ? 'eager' : 'lazy'}" width="300" height="300"></div>`
    ).join('');
    return `<section class="mkt-hero mkt-hero--social" id="mkt-top" aria-labelledby="mkt-h1">
      <div class="mkt-wrap">${breadcrumb(c.title)}<p class="mkt-hero__theme">${esc(c.tagline)}</p>
        <div class="mkt-hero__social-layout">
          <div class="mkt-hero__social-copy">
            <h1 id="mkt-h1" class="mkt-h1">${c.headline} <em>${c.headlineAccent}</em></h1>
            <p class="mkt-lead">${esc(c.subhead)}</p>${ctas('Grow My Audience')}
            <div class="mkt-engage-counters"><div><strong data-mkt-count="2400">0</strong><span>Posts</span></div><div><strong data-mkt-count="890">0</strong><span>K Followers</span></div><div><strong data-mkt-count="12">0</strong><span>% Engagement</span></div></div>
          </div>
          <div class="mkt-ig-grid" data-mkt-float>${tiles}</div>
        </div>
      </div>
    </section>`;
  },

  creators(c) {
    const cards = c.images.slice(1, 5).map((src, i) =>
      `<article class="mkt-creator-card mkt-creator-card--${i + 1}" data-mkt-float><img src="${src}" alt="Creator ${i + 1}" loading="lazy" width="280" height="320"><span>@creator${i + 1}</span><em>${(120 + i * 40)}K</em></article>`
    ).join('');
    return `<section class="mkt-hero mkt-hero--creators" id="mkt-top" aria-labelledby="mkt-h1">
      <div class="mkt-wrap mkt-hero__center">${breadcrumb(c.title)}<p class="mkt-hero__theme">${esc(c.tagline)}</p>
        <h1 id="mkt-h1" class="mkt-h1">${c.headline} <em>${c.headlineAccent}</em></h1>
        <p class="mkt-lead mkt-lead--center">${esc(c.subhead)}</p>${ctas('Partner With Creators')}
        <div class="mkt-creator-showcase">${cards}</div>
      </div>
    </section>`;
  },

  analytics(c) {
    return `<section class="mkt-hero mkt-hero--analytics" id="mkt-top" aria-labelledby="mkt-h1">
      <div class="mkt-wrap mkt-hero__analytics">
        <div>${breadcrumb(c.title)}<p class="mkt-hero__theme">${esc(c.tagline)}</p>
          <h1 id="mkt-h1" class="mkt-h1">${c.headline} <em>${c.headlineAccent}</em></h1>
          <p class="mkt-lead">${esc(c.subhead)}</p>${ctas('Improve My ROAS')}
          <div class="mkt-kpi-row">${c.results.map((r) => `<div class="mkt-kpi-mini"><span>${r.value}</span><small>${r.label}</small></div>`).join('')}</div>
        </div>
        <div class="mkt-dash-stack" data-mkt-float>
          <img src="${c.images[0]}" alt="Analytics dashboard" loading="eager" width="700" height="500" class="mkt-dash-stack__main">
          <img src="${c.images[1]}" alt="Performance report" loading="lazy" width="400" height="280" class="mkt-dash-stack__sub">
        </div>
      </div>
    </section>`;
  },

  'google-ppc'(c) {
    return `<section class="mkt-hero mkt-hero--ppc" id="mkt-top" aria-labelledby="mkt-h1">
      <div class="mkt-wrap mkt-hero__ppc">
        <div class="mkt-ad-mock" data-mkt-float>
          <div class="mkt-ad-mock__bar"><span class="mkt-ad-mock__ad">Ad</span><strong>Your Brand — ${esc(c.headlineAccent)}</strong>
          <p>${esc(c.subhead.slice(0, 80))}…</p><span class="mkt-ad-mock__url">guudle.com/services</span></div>
          <img src="${c.images[0]}" alt="Google Ads dashboard" loading="eager" width="640" height="420">
        </div>
        <div>${breadcrumb(c.title)}<p class="mkt-hero__theme">${esc(c.tagline)}</p>
          <h1 id="mkt-h1" class="mkt-h1">${c.headline} <em>${c.headlineAccent}</em></h1>
          <p class="mkt-lead">${esc(c.subhead)}</p>${ctas('Optimize My Google Ads')}
        </div>
      </div>
    </section>`;
  },

  'meta-phone'(c) {
    return `<section class="mkt-hero mkt-hero--meta" id="mkt-top" aria-labelledby="mkt-h1">
      <div class="mkt-wrap mkt-hero__meta">
        <div>${breadcrumb(c.title)}<p class="mkt-hero__theme">${esc(c.tagline)}</p>
          <h1 id="mkt-h1" class="mkt-h1">${c.headline} <em>${c.headlineAccent}</em></h1>
          <p class="mkt-lead">${esc(c.subhead)}</p>${ctas('Scale Meta Ads')}
        </div>
        <div class="mkt-phone" data-mkt-float>
          <div class="mkt-phone__frame"><div class="mkt-phone__ad"><img src="${c.images[0]}" alt="Instagram ad preview" loading="eager" width="320" height="400"><div class="mkt-phone__cta">Shop Now</div></div></div>
          <img class="mkt-phone__float" src="${c.images[2]}" alt="Meta campaign" loading="lazy" width="200" height="200">
        </div>
      </div>
    </section>`;
  },

  'intent-funnel'(c) {
    const steps = ['Search', 'Click', 'Land', 'Convert'].map((s, i) => `<div class="mkt-funnel__step mkt-funnel__step--${i + 1}"><span>${s}</span></div>`).join('');
    return `<section class="mkt-hero mkt-hero--funnel" id="mkt-top" aria-labelledby="mkt-h1">
      <div class="mkt-hero__funnel-bg" aria-hidden="true"></div>
      <div class="mkt-wrap mkt-hero__center">${breadcrumb(c.title)}<p class="mkt-hero__theme">${esc(c.tagline)}</p>
        <h1 id="mkt-h1" class="mkt-h1">${c.headline} <em>${c.headlineAccent}</em></h1>
        <p class="mkt-lead mkt-lead--center">${esc(c.subhead)}</p>${ctas('Capture Intent')}
        <div class="mkt-funnel" data-mkt-float>${steps}</div>
        <img class="mkt-hero__funnel-img" src="${c.images[0]}" alt="Search advertising" loading="eager" width="800" height="300">
      </div>
    </section>`;
  },

  'sea-command'(c) {
    const ads = [
      { brand: 'Your Brand', title: 'Enterprise Search Ads — Free Audit', url: 'guudle.com › search-ads', ad: true, top: true },
      { brand: 'Competitor A', title: 'Generic PPC Management Services', url: 'competitor-a.com', ad: true, top: false },
      { brand: 'Competitor B', title: 'Paid Search Agency — Compare Quotes', url: 'competitor-b.com', ad: true, top: false },
    ];
    const adRows = ads.map((a) =>
      `<div class="mkt-sea-ad-row ${a.top ? 'is-yours' : ''}">${a.ad ? '<span class="mkt-sea-ad-badge">Ad</span>' : ''}<div><strong>${a.brand}</strong><h4>${a.title}</h4><em>${a.url}</em></div></div>`
    ).join('');
    const platforms = ['Google Ads', 'Microsoft Ads', 'Search Partners'].map((p) =>
      `<span class="mkt-sea-platform"><i class="${p.includes('Google') ? 'fab fa-google' : p.includes('Microsoft') ? 'fab fa-microsoft' : 'fas fa-globe'}"></i>${p}</span>`
    ).join('');
    const funnel = [
      { l: 'Impressions', v: '2.4M' },
      { l: 'Clicks', v: '48K' },
      { l: 'Leads', v: '3.2K' },
      { l: 'ROAS', v: '4.1x' },
    ].map((f) => `<div class="mkt-sea-funnel-stat"><strong>${f.v}</strong><span>${f.l}</span></div>`).join('');
    return `<section class="mkt-hero mkt-hero--sea-command" id="mkt-top" aria-labelledby="mkt-h1">
      <div class="mkt-wrap">
        ${breadcrumb(c.title)}
        <div class="mkt-sea-search-bar" aria-hidden="true">
          <i class="fab fa-google"></i>
          <span>best paid search agency near me</span>
          <i class="fas fa-sliders"></i>
        </div>
        <div class="mkt-sea-hero-grid">
          <div class="mkt-sea-hero-copy">
            <p class="mkt-hero__theme">${esc(c.tagline)}</p>
            <h1 id="mkt-h1" class="mkt-h1">${c.headline} <em>${c.headlineAccent}</em></h1>
            <p class="mkt-lead">${esc(c.subhead)}</p>
            ${ctas('Capture Intent')}
            <div class="mkt-sea-platforms">${platforms}</div>
            <div class="mkt-sea-hero-stats">${c.results.slice(0, 3).map((r) => `<div><strong>${r.value}</strong><span>${r.label}</span></div>`).join('')}</div>
          </div>
          <div class="mkt-sea-command-panel">
            <div class="mkt-sea-panel-tabs"><span class="is-active">All</span><span>Ads</span><span>Maps</span></div>
            <div class="mkt-sea-serp">${adRows}</div>
            <div class="mkt-sea-funnel-mini">${funnel}</div>
            <img src="${c.images[1]}" alt="Paid search dashboard" loading="eager" width="560" height="280" class="mkt-sea-panel-chart">
            <img src="${c.images[3]}" alt="Campaign performance" loading="lazy" width="180" height="120" class="mkt-sea-panel-float">
          </div>
        </div>
      </div>
    </section>`;
  },

  ecosystem(c) {
    const nodes = ['SEO', 'PPC', 'Email', 'Social', 'SMS'].map((n, i) => `<span class="mkt-node mkt-node--${i + 1}">${n}</span>`).join('');
    return `<section class="mkt-hero mkt-hero--ecosystem" id="mkt-top" aria-labelledby="mkt-h1">
      <div class="mkt-wrap mkt-hero__eco">${breadcrumb(c.title)}<p class="mkt-hero__theme">${esc(c.tagline)}</p>
        <h1 id="mkt-h1" class="mkt-h1 mkt-h1--center">${c.headline} <em>${c.headlineAccent}</em></h1>
        <p class="mkt-lead mkt-lead--center">${esc(c.subhead)}</p>${ctas('Build My Bundle')}
        <div class="mkt-eco-diagram" data-mkt-float><div class="mkt-eco-core">Your Brand</div>${nodes}</div>
        <img src="${c.images[0]}" alt="Omnichannel marketing" loading="eager" width="900" height="400" class="mkt-eco-img">
      </div>
    </section>`;
  },

  inbox(c) {
    const mails = ['Welcome sequence', 'Product launch', 'Re-engagement', 'VIP offer'].map((t, i) =>
      `<div class="mkt-mail mkt-mail--${i + 1}" data-mkt-float><i class="fas fa-envelope"></i><span>${t}</span></div>`
    ).join('');
    return `<section class="mkt-hero mkt-hero--inbox" id="mkt-top" aria-labelledby="mkt-h1">
      <div class="mkt-wrap mkt-hero__inbox">
        <div class="mkt-inbox-stack">${mails}<img src="${c.images[0]}" alt="Email campaign" loading="eager" width="500" height="360"></div>
        <div>${breadcrumb(c.title)}<p class="mkt-hero__theme">${esc(c.tagline)}</p>
          <h1 id="mkt-h1" class="mkt-h1">${c.headline} <em>${c.headlineAccent}</em></h1>
          <p class="mkt-lead">${esc(c.subhead)}</p>${ctas('Automate Email')}
        </div>
      </div>
    </section>`;
  },

  chat(c) {
    const bubbles = ['Hi! 👋 Special offer inside', 'Thanks — tell me more', 'Here is your 20% code: SAVE20', 'Perfect, I will use it!'].map((t, i) =>
      `<div class="mkt-bubble mkt-bubble--${i % 2 ? 'out' : 'in'} mkt-bubble--${i + 1}">${t}</div>`
    ).join('');
    return `<section class="mkt-hero mkt-hero--chat" id="mkt-top" aria-labelledby="mkt-h1">
      <div class="mkt-wrap mkt-hero__chat">
        <div>${breadcrumb(c.title)}<p class="mkt-hero__theme">${esc(c.tagline)}</p>
          <h1 id="mkt-h1" class="mkt-h1">${c.headline} <em>${c.headlineAccent}</em></h1>
          <p class="mkt-lead">${esc(c.subhead)}</p>${ctas('Start WhatsApp Marketing')}
        </div>
        <div class="mkt-chat-window" data-mkt-float>${bubbles}<img src="${c.images[0]}" alt="WhatsApp marketing" loading="eager" width="380" height="520" class="mkt-chat-phone"></div>
      </div>
    </section>`;
  },

  'mobile-notify'(c) {
    return `<section class="mkt-hero mkt-hero--sms" id="mkt-top" aria-labelledby="mkt-h1">
      <div class="mkt-wrap mkt-hero__sms">
        <div class="mkt-sms-phone" data-mkt-float>
          <img src="${c.images[0]}" alt="SMS marketing mobile" loading="eager" width="360" height="640">
          <div class="mkt-notify mkt-notify--1">Flash Sale — 2hrs left!</div>
          <div class="mkt-notify mkt-notify--2">Your order is confirmed ✓</div>
          <div class="mkt-notify mkt-notify--3">Reply STOP to opt out</div>
        </div>
        <div>${breadcrumb(c.title)}<p class="mkt-hero__theme">${esc(c.tagline)}</p>
          <h1 id="mkt-h1" class="mkt-h1">${c.headline} <em>${c.headlineAccent}</em></h1>
          <p class="mkt-lead">${esc(c.subhead)}</p>${ctas('Launch SMS Campaigns')}
        </div>
      </div>
    </section>`;
  },

  'marketplace-platform'(c) {
    return `<section class="mkt-hero mkt-hero--marketplace" id="mkt-top" aria-labelledby="mkt-h1">
      <div class="mkt-hero__vendor-flow" aria-hidden="true"></div>
      <div class="mkt-wrap mkt-hero__market">
        <div>${breadcrumb(c.title)}<p class="mkt-hero__theme">${esc(c.tagline)}</p>
          <h1 id="mkt-h1" class="mkt-h1">${c.headline} <em>${c.headlineAccent}</em></h1>
          <p class="mkt-lead">${esc(c.subhead)}</p>${ctas('Grow My Marketplace')}
        </div>
        <div class="mkt-vendor-grid" data-mkt-float>
          ${c.images.slice(1, 5).map((src, i) => `<div class="mkt-vendor"><img src="${src}" alt="Vendor ${i + 1}" loading="lazy" width="200" height="160"><span>Vendor ${i + 1}</span></div>`).join('')}
        </div>
      </div>
    </section>`;
  },

  'control-center'(c) {
    return `<section class="mkt-hero mkt-hero--control" id="mkt-top" aria-labelledby="mkt-h1">
      <div class="mkt-wrap mkt-hero__control">
        <div class="mkt-control-panels" data-mkt-float>
          <img src="${c.images[0]}" alt="E-commerce dashboard" loading="eager" width="680" height="480">
          <div class="mkt-panel mkt-panel--sales"><span>Sales</span><strong data-mkt-count="284">0</strong><small>K this month</small></div>
          <div class="mkt-panel mkt-panel--orders"><span>Orders</span><strong data-mkt-count="1240">0</strong></div>
        </div>
        <div>${breadcrumb(c.title)}<p class="mkt-hero__theme">${esc(c.tagline)}</p>
          <h1 id="mkt-h1" class="mkt-h1">${c.headline} <em>${c.headlineAccent}</em></h1>
          <p class="mkt-lead">${esc(c.subhead)}</p>${ctas('Optimize My Store')}
        </div>
      </div>
    </section>`;
  },

  catalog(c) {
    return `<section class="mkt-hero mkt-hero--catalog" id="mkt-top" aria-labelledby="mkt-h1">
      <div class="mkt-wrap">${breadcrumb(c.title)}<p class="mkt-hero__theme">${esc(c.tagline)}</p>
        <h1 id="mkt-h1" class="mkt-h1 mkt-h1--center">${c.headline} <em>${c.headlineAccent}</em></h1>
        <p class="mkt-lead mkt-lead--center">${esc(c.subhead)}</p>${ctas('Optimize Listings')}
        <div class="mkt-catalog-scroll" data-mkt-float>
          ${c.images.slice(0, 6).map((src, i) => `<article class="mkt-product-card"><img src="${src}" alt="Product ${i + 1}" loading="${i < 3 ? 'eager' : 'lazy'}" width="240" height="280"><span>SKU-${100 + i}</span></article>`).join('')}
        </div>
      </div>
    </section>`;
  },

  'ranking-chart'(c) {
    return `<section class="mkt-hero mkt-hero--ranking" id="mkt-top" aria-labelledby="mkt-h1">
      <div class="mkt-wrap mkt-hero__rank">
        <div>${breadcrumb(c.title)}<p class="mkt-hero__theme">${esc(c.tagline)}</p>
          <h1 id="mkt-h1" class="mkt-h1">${c.headline} <em>${c.headlineAccent}</em></h1>
          <p class="mkt-lead">${esc(c.subhead)}</p>${ctas('Boost Product Rank')}
          <div class="mkt-rank-chart">${[40, 55, 72, 88, 95].map((h, i) => `<div class="mkt-rank-col" style="--h:${h}%"><span>W${i + 1}</span></div>`).join('')}</div>
        </div>
        <img src="${c.images[0]}" alt="Marketplace ranking" loading="eager" width="640" height="480" class="mkt-rank-img" data-mkt-float>
      </div>
    </section>`;
  },
};

/* ─── SECTIONS ─── */
function head(title, sub = '') {
  return `<header class="mkt-sec-head"><h2 class="mkt-h2">${title}</h2>${sub ? `<p>${sub}</p>` : ''}</header>`;
}

const SECTIONS = {
  'stats-inline'() { return ''; },
  'results-hero-band'() { return ''; },
  'stats-dashboard'() { return ''; },
  'stats-creator'() { return ''; },
  'stats-funnel'() { return ''; },
  'stats-mobile'() { return ''; },
  'engagement-stats'() { return ''; },

  /* ── Promotion redesign sections ── */
  'promo-stats-cards'() { return ''; },
  'promo-overview-editorial'(c) {
    return `<section class="mkt-sec mkt-sec--promo-overview" id="mkt-overview"><div class="mkt-wrap mkt-promo-editorial">
      <div class="mkt-promo-editorial__copy">${head(c.overview.title, c.overview.text)}
        <ul class="mkt-checklist">${c.overview.highlights.map((h) => `<li><i class="fas fa-check"></i>${h}</li>`).join('')}</ul>
      </div>
      <div class="mkt-promo-editorial__media">
        <img src="${c.images[4]}" alt="${esc(c.overview.title)}" loading="lazy" width="480" height="360" class="mkt-promo-editorial__main">
        <img src="${c.images[5]}" alt="Campaign planning" loading="lazy" width="220" height="160" class="mkt-promo-editorial__sub">
        <img src="${c.images[6]}" alt="Team strategy" loading="lazy" width="220" height="160" class="mkt-promo-editorial__sub2">
      </div>
    </div></section>`;
  },
  'promo-types'(c) {
    const types = [
      { t: 'Flash Sales', d: 'Urgency-driven offers with countdown mechanics.', icon: 'fa-bolt', img: 7 },
      { t: 'Product Launches', d: 'Coordinated go-to-market across every channel.', icon: 'fa-rocket', img: 8 },
      { t: 'Seasonal Campaigns', d: 'Holiday and peak-season promotional calendars.', icon: 'fa-snowflake', img: 9 },
      { t: 'Loyalty & Referral', d: 'Retention programs that increase lifetime value.', icon: 'fa-gift', img: 10 },
    ];
    return `<section class="mkt-sec mkt-sec--promo-types" id="mkt-types"><div class="mkt-wrap">
      ${head('Promotion Formats We Execute', 'Structured campaigns for every stage of your sales calendar')}
      <div class="mkt-promo-types-grid">${types.map((x) =>
        `<article><img src="${c.images[x.img]}" alt="${x.t}" loading="lazy" width="400" height="220"><div><i class="fas ${x.icon}"></i><h3>${x.t}</h3><p>${x.d}</p></div></article>`
      ).join('')}</div>
    </div></section>`;
  },
  'promo-features-carousel'(c) {
    return `<section class="mkt-sec mkt-sec--promo-features" id="mkt-features"><div class="mkt-wrap">
      ${head('Service Features', 'End-to-end promotional capability')}
      <div class="mkt-promo-feat-scroll">${c.features.map((f, i) =>
        `<article><img src="${c.images[i + 5] || c.images[5]}" alt="${esc(f.title)} — ${esc(c.title)}" loading="lazy" width="280" height="160"><div><i class="fas ${f.icon}"></i><h3>${f.title}</h3><p>${f.desc}</p></div></article>`
      ).join('')}</div>
    </div></section>`;
  },
  'promo-process-timeline'(c) {
    const steps = c.process.slice(0, 6);
    return `<section class="mkt-sec mkt-sec--promo-process" id="mkt-process"><div class="mkt-wrap">
      ${head('Our Process', 'From strategy to scaled promotions')}
      <div class="mkt-promo-timeline">${steps.map((s, i) =>
        `<div class="mkt-promo-timeline__step"><span>${i + 1}</span><div><h3>${s.t}</h3><p>${s.d}</p></div>${i % 2 === 0 ? `<img src="${c.images[i + 8] || c.images[8]}" alt="${esc(s.t)} process step" loading="lazy" width="200" height="140">` : ''}</div>`
      ).join('')}</div>
      <img class="mkt-promo-process-wide" src="${c.images[11]}" alt="Process overview" loading="lazy" width="900" height="320">
    </div></section>`;
  },
  'promo-gallery-polaroid'(c) {
    return `<section class="mkt-sec mkt-sec--promo-polaroid" id="mkt-gallery"><div class="mkt-wrap">
      ${head('Campaign Visuals', 'Real promotional work across industries')}
      <div class="mkt-promo-polaroids">${c.images.slice(3, 13).map((src, i) =>
        `<figure class="mkt-promo-polaroid mkt-promo-polaroid--${i + 1}"><img src="${src}" alt="Campaign ${i + 1}" loading="lazy" width="280" height="220"><figcaption>Camp ${i + 1}</figcaption></figure>`
      ).join('')}</div>
    </div></section>`;
  },
  'promo-why-split'(c) {
    return `<section class="mkt-sec mkt-sec--promo-why" id="mkt-why"><div class="mkt-wrap mkt-promo-why-split">
      <img src="${c.images[12]}" alt="Why Guudle promotions" loading="lazy" width="520" height="640">
      <div>${head('Why Choose Our Service')}
        <div class="mkt-promo-why-list">${c.services.map((s) =>
          `<article><i class="${s.icon}"></i><div><h3>${s.title}</h3><p>${s.desc}</p></div></article>`
        ).join('')}</div>
      </div>
    </div></section>`;
  },
  'promo-cases-bento'(c) {
    const [main, ...rest] = c.cases;
    return `<section class="mkt-sec mkt-sec--promo-cases" id="mkt-cases"><div class="mkt-wrap">
      ${head('Success Stories')}
      <div class="mkt-promo-cases-bento">
        <article class="mkt-promo-case-main"><img src="${main.image}" alt="${main.title}" loading="lazy" width="800" height="420"><div><span>${main.tag}</span><h3>${main.title}</h3><p>${main.desc}</p></div></article>
        ${rest.map((cs, i) =>
          `<article class="mkt-promo-case-sm mkt-promo-case-sm--${i + 1}"><img src="${cs.image}" alt="${cs.title}" loading="lazy" width="400" height="260"><div><h3>${cs.title}</h3><p>${cs.desc}</p></div></article>`
        ).join('')}
      </div>
    </div></section>`;
  },

  /* ── SEO redesign sections ── */
  'seo-metrics-dash'() { return ''; },
  'seo-overview-pillars'(c) {
    const pillars = [
      { t: 'Technical SEO', d: 'Crawl, speed, schema, and architecture.', img: 4 },
      { t: 'Content Strategy', d: 'Keyword clusters and conversion copy.', img: 5 },
      { t: 'Authority Building', d: 'Ethical links and brand mentions.', img: 6 },
      { t: 'Local Visibility', d: 'Maps, citations, and geo-targeting.', img: 7 },
    ];
    return `<section class="mkt-sec mkt-sec--seo-pillars" id="mkt-overview"><div class="mkt-wrap">
      ${head(c.overview.title, c.overview.text)}
      <div class="mkt-seo-pillars">${pillars.map((p) =>
        `<article><img src="${c.images[p.img]}" alt="${p.t}" loading="lazy" width="360" height="200"><div class="mkt-seo-pillar-body"><h3>${p.t}</h3><p>${p.d}</p></div></article>`
      ).join('')}</div>
    </div></section>`;
  },
  'seo-features-grid-img'(c) {
    return `<section class="mkt-sec mkt-sec--seo-features" id="mkt-features"><div class="mkt-wrap">
      ${head('Service Features', 'Full-stack SEO capability')}
      <div class="mkt-seo-feat-grid">${c.features.map((f, i) =>
        `<article><img src="${c.images[i + 6] || c.images[6]}" alt="${esc(f.title)} — ${esc(c.title)}" loading="lazy" width="360" height="200"><div><i class="fas ${f.icon}"></i><h3>${f.title}</h3><p>${f.desc}</p></div></article>`
      ).join('')}</div>
    </div></section>`;
  },
  'seo-audit-preview'(c) {
    const checks = ['Core Web Vitals pass', 'Index coverage clean', 'Schema markup valid', 'Mobile usability OK', 'Internal links optimized', 'Meta tags complete'];
    return `<section class="mkt-sec mkt-sec--seo-audit" id="mkt-audit"><div class="mkt-wrap mkt-seo-audit-layout">
      <div>${head('SEO Audit Snapshot', 'Every engagement starts with a comprehensive site health review')}
        <ul class="mkt-seo-audit-list">${checks.map((x) => `<li><i class="fas fa-circle-check"></i>${x}</li>`).join('')}</ul>
      </div>
      <div class="mkt-seo-audit-visual">
        <img src="${c.images[8]}" alt="SEO audit dashboard" loading="lazy" width="520" height="400">
        <img src="${c.images[9]}" alt="Ranking report" loading="lazy" width="240" height="160" class="mkt-seo-audit-float">
      </div>
    </div></section>`;
  },
  'seo-process-wizard'(c) {
    const steps = c.process.slice(0, 7);
    return `<section class="mkt-sec mkt-sec--seo-wizard" id="mkt-process"><div class="mkt-wrap">
      ${head('Our Process', 'Structured path from audit to rankings')}
      <div class="mkt-seo-wizard">${steps.map((s, i) =>
        `<article class="mkt-seo-wizard__step ${i === 0 ? 'is-active' : ''}"><span>${i + 1}</span><h3>${s.t}</h3><p>${s.d}</p></article>`
      ).join('')}</div>
      <img src="${c.images[10]}" alt="SEO workflow" loading="lazy" width="900" height="300" class="mkt-seo-wizard-img">
    </div></section>`;
  },
  'seo-gallery-compare'(c) {
    return `<section class="mkt-sec mkt-sec--seo-gallery" id="mkt-gallery"><div class="mkt-wrap">
      ${head('SEO Work in Action', 'Strategy, content, and ranking growth')}
      <div class="mkt-seo-gallery">
        <figure class="mkt-seo-gallery__before"><span>Before</span><img src="${c.images[11]}" alt="Before SEO" loading="lazy" width="400" height="300"></figure>
        <figure class="mkt-seo-gallery__arrow" aria-hidden="true"><i class="fas fa-arrow-right"></i></figure>
        <figure class="mkt-seo-gallery__after"><span>After</span><img src="${c.images[12]}" alt="After SEO" loading="lazy" width="400" height="300"></figure>
      </div>
      <div class="mkt-seo-gallery-row">${c.images.slice(3, 9).map((src, i) =>
        `<figure><img src="${src}" alt="SEO visual ${i + 1}" loading="lazy" width="280" height="200"></figure>`
      ).join('')}</div>
    </div></section>`;
  },
  'seo-why-stack'(c) {
    return `<section class="mkt-sec mkt-sec--seo-why" id="mkt-why"><div class="mkt-wrap">
      ${head('Why Choose Our Service')}
      <div class="mkt-seo-why-stack">${c.services.map((s, i) =>
        `<article class="mkt-seo-why-card mkt-seo-why-card--${i + 1}"><i class="${s.icon}"></i><div><h3>${s.title}</h3><p>${s.desc}</p></div><img src="${c.images[i + 13] || c.images[13]}" alt="${esc(s.title)}" loading="lazy" width="120" height="80"></article>`
      ).join('')}</div>
    </div></section>`;
  },
  'seo-cases-slider'(c) {
    return `<section class="mkt-sec mkt-sec--seo-cases" id="mkt-cases"><div class="mkt-wrap">
      ${head('Success Stories')}
      <div class="mkt-seo-cases-track">${c.cases.map((cs) =>
        `<article><img src="${cs.image}" alt="${cs.title}" loading="lazy" width="360" height="220"><span>${cs.tag}</span><h3>${cs.title}</h3><p>${cs.desc}</p><a href="#mkt-contact" class="mkt-seo-case-link">Discuss similar results <i class="fas fa-arrow-right"></i></a></article>`
      ).join('')}</div>
    </div></section>`;
  },

  /* ── Search Engine Ads redesign sections ── */
  'sea-stats-strip'() { return ''; },
  'sea-overview-split'(c) {
    return `<section class="mkt-sec mkt-sec--sea-overview" id="mkt-overview"><div class="mkt-wrap mkt-sea-editorial">
      <div class="mkt-sea-editorial__copy">${head(c.overview.title, c.overview.text)}
        <ul class="mkt-checklist">${c.overview.highlights.map((h) => `<li><i class="fas fa-check"></i>${h}</li>`).join('')}</ul>
      </div>
      <div class="mkt-sea-editorial__media">
        <img src="${c.images[4]}" alt="${esc(c.overview.title)}" loading="lazy" width="480" height="360" class="mkt-sea-editorial__main">
        <img src="${c.images[5]}" alt="Keyword research" loading="lazy" width="220" height="160" class="mkt-sea-editorial__sub">
        <img src="${c.images[6]}" alt="Ad copy testing" loading="lazy" width="220" height="160" class="mkt-sea-editorial__sub2">
      </div>
    </div></section>`;
  },
  'sea-platforms'(c) {
    const platforms = [
      { name: 'Google Ads', icon: 'fab fa-google', desc: 'Search, Shopping, Display, and Performance Max across the Google network.', img: 7, stats: ['Search network', 'RSA & PMax', 'Smart bidding'] },
      { name: 'Microsoft Ads', icon: 'fab fa-microsoft', desc: 'Bing, Yahoo, and AOL — competitive CPCs and strong B2B demographics.', img: 8, stats: ['Lower CPC potential', 'LinkedIn targeting', 'Import from Google'] },
    ];
    return `<section class="mkt-sec mkt-sec--sea-platforms" id="mkt-platforms"><div class="mkt-wrap">
      ${head('Search Platforms We Manage', 'Full-funnel coverage on Google and Microsoft networks')}
      <div class="mkt-sea-platform-cards">${platforms.map((p) =>
        `<article><img src="${c.images[p.img]}" alt="${p.name}" loading="lazy" width="520" height="280"><div class="mkt-sea-platform-body"><div class="mkt-sea-platform-head"><i class="${p.icon}"></i><h3>${p.name}</h3></div><p>${p.desc}</p><ul>${p.stats.map((s) => `<li><i class="fas fa-check"></i>${s}</li>`).join('')}</ul></div></article>`
      ).join('')}</div>
    </div></section>`;
  },
  'sea-features-grid'(c) {
    return `<section class="mkt-sec mkt-sec--sea-features" id="mkt-features"><div class="mkt-wrap">
      ${head('Service Features', 'End-to-end paid search capability')}
      <div class="mkt-sea-feat-grid">${c.features.map((f, i) =>
        `<article><img src="${c.images[i + 5] || c.images[5]}" alt="${esc(f.title)} — ${esc(c.title)}" loading="lazy" width="360" height="200"><div><i class="fas ${f.icon}"></i><h3>${f.title}</h3><p>${f.desc}</p></div></article>`
      ).join('')}</div>
    </div></section>`;
  },
  'sea-intent-map'(c) {
    const intents = [
      { t: 'Informational', d: 'Educational queries — capture awareness with helpful content ads.', icon: 'fa-circle-info', pct: 28, img: 9 },
      { t: 'Navigational', d: 'Brand searches — defend your name and outrank competitors.', icon: 'fa-compass', pct: 15, img: 10 },
      { t: 'Commercial', d: 'Comparison queries — win consideration with strong USPs.', icon: 'fa-scale-balanced', pct: 32, img: 11 },
      { t: 'Transactional', d: 'High-intent buyers — maximize conversions with tight message match.', icon: 'fa-cart-shopping', pct: 25, img: 12 },
    ];
    return `<section class="mkt-sec mkt-sec--sea-intent" id="mkt-intent"><div class="mkt-wrap">
      ${head('Intent-Based Keyword Strategy', 'Match ad groups to buyer intent at every funnel stage')}
      <div class="mkt-sea-intent-grid">${intents.map((x) =>
        `<article><img src="${c.images[x.img]}" alt="${x.t} search intent" loading="lazy" width="280" height="160"><div><i class="fas ${x.icon}"></i><h3>${x.t}</h3><p>${x.d}</p><div class="mkt-sea-intent-bar"><i style="width:${x.pct}%"></i></div><span>${x.pct}% of queries</span></div></article>`
      ).join('')}</div>
    </div></section>`;
  },
  'sea-process-flow'(c) {
    const steps = c.process.slice(0, 7);
    return `<section class="mkt-sec mkt-sec--sea-process" id="mkt-process"><div class="mkt-wrap">
      ${head('Our Process', 'From audit to scaled search performance')}
      <div class="mkt-sea-process-track">${steps.map((s, i) =>
        `<article class="mkt-sea-process-step ${i === 0 ? 'is-active' : ''}"><span>${i + 1}</span><h3>${s.t}</h3><p>${s.d}</p></article>`
      ).join('')}</div>
      <img src="${c.images[10]}" alt="Search ads workflow" loading="lazy" width="900" height="320" class="mkt-sea-process-wide">
    </div></section>`;
  },
  'sea-gallery-grid'(c) {
    return `<section class="mkt-sec mkt-sec--sea-gallery" id="mkt-gallery"><div class="mkt-wrap">
      ${head('Campaign Visuals', 'Strategy sessions, dashboards, and ad creative')}
      <div class="mkt-sea-gallery-grid">${c.images.slice(3, 15).map((src, i) =>
        `<figure class="mkt-sea-gallery-item mkt-sea-gallery-item--${i + 1}"><img src="${src}" alt="Search ads visual ${i + 1}" loading="lazy" width="320" height="240"></figure>`
      ).join('')}</div>
    </div></section>`;
  },
  'sea-why-split'(c) {
    return `<section class="mkt-sec mkt-sec--sea-why" id="mkt-why"><div class="mkt-wrap mkt-sea-why-split">
      <img src="${c.images[12]}" alt="Why Guudle search ads" loading="lazy" width="520" height="640">
      <div>${head('Why Choose Our Service')}
        <div class="mkt-sea-why-list">${c.services.map((s) =>
          `<article><i class="${s.icon}"></i><div><h3>${s.title}</h3><p>${s.desc}</p></div></article>`
        ).join('')}</div>
      </div>
    </div></section>`;
  },
  'sea-cases-bento'(c) {
    const [main, ...rest] = c.cases;
    return `<section class="mkt-sec mkt-sec--sea-cases" id="mkt-cases"><div class="mkt-wrap">
      ${head('Success Stories')}
      <div class="mkt-sea-cases-bento">
        <article class="mkt-sea-case-main"><img src="${main.image}" alt="${main.title}" loading="lazy" width="800" height="420"><div><span>${main.tag}</span><h3>${main.title}</h3><p>${main.desc}</p></div></article>
        ${rest.map((cs, i) =>
          `<article class="mkt-sea-case-sm mkt-sea-case-sm--${i + 1}"><img src="${cs.image}" alt="${cs.title}" loading="lazy" width="400" height="260"><div><h3>${cs.title}</h3><p>${cs.desc}</p></div></article>`
        ).join('')}
      </div>
    </div></section>`;
  },

  'overview-zigzag'(c) {
    return `<section class="mkt-sec mkt-sec--overview-zig" id="mkt-overview"><div class="mkt-wrap mkt-zig">
      <div class="mkt-zig__text">${head(c.overview.title)}<p>${c.overview.text}</p>
        <ul class="mkt-checklist">${c.overview.highlights.map((h) => `<li><i class="fas fa-check"></i>${h}</li>`).join('')}</ul></div>
      <div class="mkt-zig__img"><img src="${c.images[3]}" alt="${esc(c.overview.title)}" loading="lazy" width="640" height="480"></div>
    </div></section>`;
  },
  'overview-split-rank'(c) {
    return `<section class="mkt-sec mkt-sec--overview-split" id="mkt-overview"><div class="mkt-wrap mkt-split mkt-split--reverse">
      <img src="${c.images[4]}" alt="${esc(c.overview.title)}" loading="lazy" width="600" height="450">
      <div>${head(c.overview.title)}<p>${c.overview.text}</p><ul class="mkt-checklist">${c.overview.highlights.map((h) => `<li><i class="fas fa-check"></i>${h}</li>`).join('')}</ul></div>
    </div></section>`;
  },
  'overview-fullbleed'(c) { return SECTIONS['overview-zigzag'](c); },
  'overview-creator'(c) { return SECTIONS['overview-zigzag']({ ...c, images: [...c.images].reverse() }); },
  'overview-analytics'(c) { return SECTIONS['overview-split-rank'](c); },
  'overview-ppc'(c) { return SECTIONS['overview-zigzag'](c); },
  'overview-reverse'(c) {
    return `<section class="mkt-sec" id="mkt-overview"><div class="mkt-wrap mkt-split">
      <div>${head(c.overview.title)}<p>${c.overview.text}</p><ul class="mkt-checklist">${c.overview.highlights.map((h) => `<li><i class="fas fa-check"></i>${h}</li>`).join('')}</ul></div>
      <img src="${c.images[4]}" alt="${esc(c.overview.title)}" loading="lazy" width="600" height="450">
    </div></section>`;
  },
  'overview-intent'(c) { return SECTIONS['overview-split-rank'](c); },
  'overview-bento'(c) {
    return `<section class="mkt-sec mkt-sec--bento" id="mkt-overview"><div class="mkt-wrap">
      ${head(c.overview.title, c.overview.text)}
      <div class="mkt-bento">${c.overview.highlights.map((h, i) => `<div class="mkt-bento__cell"><img src="${c.images[i + 3]}" alt="${esc(h)}" loading="lazy" width="400" height="260"><span>${h}</span></div>`).join('')}</div>
    </div></section>`;
  },
  'overview-inbox'(c) { return SECTIONS['overview-reverse'](c); },
  'overview-chat'(c) { return SECTIONS['overview-zigzag'](c); },
  'overview-mobile'(c) { return SECTIONS['overview-split-rank'](c); },
  'overview-vendor'(c) { return SECTIONS['overview-bento'](c); },
  'overview-control'(c) { return SECTIONS['overview-analytics'](c); },
  'overview-catalog'(c) { return SECTIONS['overview-reverse'](c); },
  'overview-rank'(c) { return SECTIONS['overview-split-rank'](c); },

  'features-float'(c) {
    return `<section class="mkt-sec mkt-sec--features-float" id="mkt-features"><div class="mkt-wrap">
      ${head('Service Features', 'Capabilities tailored to your growth goals')}
      <div class="mkt-features-float">${c.features.map((f, i) => `<article class="mkt-feat-float mkt-feat-float--${i + 1}"><i class="fas ${f.icon}"></i><h3>${f.title}</h3><p>${f.desc}</p></article>`).join('')}</div>
    </div></section>`;
  },
  'features-serp-list'(c) {
    return `<section class="mkt-sec mkt-sec--features-list" id="mkt-features"><div class="mkt-wrap mkt-feat-list-layout">
      <img src="${c.images[6]}" alt="SEO features" loading="lazy" width="500" height="600">
      <div>${head('Service Features')}<ol class="mkt-serp-list">${c.features.map((f) => `<li><i class="fas ${f.icon}"></i><div><strong>${f.title}</strong><p>${f.desc}</p></div></li>`).join('')}</ol></div>
    </div></section>`;
  },
  'features-feed'(c) {
    return `<section class="mkt-sec mkt-sec--features-feed" id="mkt-features"><div class="mkt-wrap">
      ${head('Service Features')}
      <div class="mkt-feed-features">${c.features.map((f, i) => `<article class="mkt-feed-card"><img src="${c.images[i + 6] || c.images[6]}" alt="${esc(f.title)}" loading="lazy" width="320" height="200"><div><i class="fas ${f.icon}"></i><h3>${f.title}</h3><p>${f.desc}</p></div></article>`).join('')}</div>
    </div></section>`;
  },
  'features-showcase'(c) {
    return `<section class="mkt-sec mkt-sec--features-showcase" id="mkt-features"><div class="mkt-wrap">
      ${head('Service Features')}
      <div class="mkt-showcase">${c.features.map((f, i) => `<div class="mkt-showcase__item ${i % 2 ? 'is-reverse' : ''}"><div><h3><i class="fas ${f.icon}"></i> ${f.title}</h3><p>${f.desc}</p></div><img src="${c.images[i + 5] || c.images[5]}" alt="${esc(f.title)}" loading="lazy" width="480" height="320"></div>`).join('')}</div>
    </div></section>`;
  },
  'features-metrics'(c) { return SECTIONS['features-float'](c); },
  'features-ad-mockup'(c) { return SECTIONS['features-serp-list'](c); },
  'features-ad-preview'(c) { return SECTIONS['features-feed'](c); },
  'features-pathway'(c) { return SECTIONS['features-showcase'](c); },
  'features-network'(c) {
    return `<section class="mkt-sec mkt-sec--network" id="mkt-features"><div class="mkt-wrap">
      ${head('Service Features')}
      <div class="mkt-network-grid">${c.features.map((f) => `<article><i class="fas ${f.icon}"></i><h3>${f.title}</h3><p>${f.desc}</p></article>`).join('')}</div>
    </div></section>`;
  },
  'features-workflow'(c) { return SECTIONS['features-showcase'](c); },
  'features-bubbles'(c) { return SECTIONS['features-feed'](c); },
  'features-sms'(c) { return SECTIONS['features-float'](c); },
  'features-vendor'(c) { return SECTIONS['features-network'](c); },
  'features-ops'(c) { return SECTIONS['features-serp-list'](c); },
  'features-catalog'(c) { return SECTIONS['features-feed'](c); },
  'features-rank'(c) { return SECTIONS['features-serp-list'](c); },

  'showcase-a'(c) {
    const imgs = c.images.slice(14, 19);
    return `<section class="mkt-sec mkt-sec--showcase" id="mkt-showcase-a"><div class="mkt-wrap">
      ${head('Visual Highlights', esc(c.tagline))}
      <div class="mkt-showcase-row">${imgs.map((src, i) => `<figure class="mkt-showcase-row__item"><img src="${src}" alt="${esc(c.title)} visual ${i + 1}" loading="lazy" width="420" height="300"></figure>`).join('')}</div>
    </div></section>`;
  },
  'showcase-b'(c) {
    const imgs = c.images.slice(15, 20);
    return `<section class="mkt-sec mkt-sec--showcase mkt-sec--showcase-b" id="mkt-showcase-b"><div class="mkt-wrap">
      <div class="mkt-showcase-grid">${imgs.map((src, i) => `<figure><img src="${src}" alt="Campaign visual ${i + 1}" loading="lazy" width="360" height="260"><figcaption>Insight ${i + 1}</figcaption></figure>`).join('')}</div>
    </div></section>`;
  },
  'parallax-a'(c) { return SECTIONS['showcase-a'](c); },
  'parallax-b'(c) { return SECTIONS['showcase-b'](c); },

  'process-horizontal'(c) {
    const steps = c.process.slice(0, 8);
    return `<section class="mkt-sec mkt-sec--process-h" id="mkt-process"><div class="mkt-wrap">
      ${head('Our Process', 'Discovery through scaling')}
      <div class="mkt-process-h">${steps.map((s, i) => `<div class="mkt-process-h__step"><span>${i + 1}</span><h3>${s.t}</h3><p>${s.d}</p></div>`).join('')}</div>
      <img class="mkt-process-img" src="${c.images[9]}" alt="Process workflow" loading="lazy" width="900" height="300">
    </div></section>`;
  },
  'process-vertical-alt'(c) {
    return `<section class="mkt-sec mkt-sec--process-v" id="mkt-process"><div class="mkt-wrap mkt-process-v-layout">
      <div>${head('Our Process')}${c.process.slice(0, 7).map((s, i) => `<div class="mkt-process-v__item"><span>${i + 1}</span><div><h3>${s.t}</h3><p>${s.d}</p></div></div>`).join('')}</div>
      <img src="${c.images[9]}" alt="Process" loading="lazy" width="480" height="640">
    </div></section>`;
  },
  'process-stepped'(c) { return SECTIONS['process-horizontal'](c); },
  'process-timeline'(c) { return SECTIONS['process-vertical-alt'](c); },
  'process-funnel'(c) { return SECTIONS['process-horizontal'](c); },
  'process-orbit'(c) {
    return `<section class="mkt-sec mkt-sec--process-orbit" id="mkt-process"><div class="mkt-wrap mkt-orbit-wrap">
      ${head('Our Process')}
      <div class="mkt-orbit">${c.process.slice(0, 6).map((s, i) => `<div class="mkt-orbit__item mkt-orbit__item--${i + 1}"><strong>${s.t}</strong><p>${s.d}</p></div>`).join('')}</div>
    </div></section>`;
  },

  'gallery-mosaic'(c) {
    return `<section class="mkt-sec mkt-sec--mosaic" id="mkt-gallery"><div class="mkt-wrap">${head('Campaign & Workflow Visuals')}
      <div class="mkt-mosaic mkt-mosaic--expanded">${c.images.slice(3, 15).map((src, i) => `<figure class="mkt-mosaic__item mkt-mosaic__item--${i + 1}"><img src="${src}" alt="Visual ${i + 1}" loading="lazy" width="400" height="300"></figure>`).join('')}</div>
    </div></section>`;
  },
  'gallery-dashboard'(c) { return SECTIONS['gallery-mosaic'](c); },
  'gallery-instagram'(c) { return SECTIONS['gallery-mosaic'](c); },
  'gallery-creators'(c) { return SECTIONS['gallery-mosaic'](c); },
  'gallery-charts'(c) { return SECTIONS['gallery-mosaic'](c); },
  'gallery-ppc'(c) { return SECTIONS['gallery-mosaic'](c); },
  'gallery-meta'(c) { return SECTIONS['gallery-mosaic'](c); },
  'gallery-funnel'(c) { return SECTIONS['gallery-mosaic'](c); },
  'gallery-omni'(c) { return SECTIONS['gallery-mosaic'](c); },
  'gallery-email'(c) { return SECTIONS['gallery-mosaic'](c); },
  'gallery-chat'(c) { return SECTIONS['gallery-mosaic'](c); },
  'gallery-mobile'(c) { return SECTIONS['gallery-mosaic'](c); },
  'gallery-vendor'(c) { return SECTIONS['gallery-mosaic'](c); },
  'gallery-store'(c) { return SECTIONS['gallery-mosaic'](c); },
  'gallery-products'(c) { return SECTIONS['gallery-mosaic'](c); },
  'gallery-rank'(c) { return SECTIONS['gallery-mosaic'](c); },

  'why-dark'(c) { return SECTIONS['why-light-bento'](c); },
  'why-cards-offset'(c) {
    return `<section class="mkt-sec mkt-sec--why-offset" id="mkt-why"><div class="mkt-wrap">
      ${head('Why Choose Our Service')}
      <div class="mkt-why-offset">${c.services.map((s, i) => `<article style="--i:${i}"><i class="${s.icon}"></i><h3>${s.title}</h3><p>${s.desc}</p></article>`).join('')}</div>
    </div></section>`;
  },
  'why-gradient'(c) { return SECTIONS['why-light-bento'](c); },
  'why-light-bento'(c) {
    return `<section class="mkt-sec mkt-sec--why-bento" id="mkt-why"><div class="mkt-wrap">
      ${head('Why Choose Our Service')}
      <div class="mkt-why-bento">${c.services.map((s) => `<article><i class="${s.icon}"></i><h3>${s.title}</h3><p>${s.desc}</p></article>`).join('')}</div>
    </div></section>`;
  },
  'why-dark-stats'(c) { return SECTIONS['why-cards-offset'](c); },

  'industries-parallax'(c) {
    return renderIndustriesParallaxSection({
      industries: marketingIndustries,
      slug: c.slug,
      sectionId: 'mkt-industries',
      lead: 'Marketing technology and growth programs engineered for your sector — with data-driven campaigns, analytics, and conversion optimization.',
      pathPrefix: '../../',
      contactLink: '#mkt-contact',
    });
  },
  'industries-marquee'(c) { return SECTIONS['industries-parallax'](c); },
  'industries-grid-compact'(c) { return SECTIONS['industries-parallax'](c); },
  'industries-pills'(c) { return SECTIONS['industries-parallax'](c); },
  'industries-icons'(c) { return SECTIONS['industries-parallax'](c); },

  'cases-featured'(c) {
    const main = c.cases[0];
    return `<section class="mkt-sec mkt-sec--case-featured" id="mkt-cases"><div class="mkt-wrap">
      ${head('Success Stories')}
      <article class="mkt-case-featured"><img src="${main.image}" alt="${main.title}" loading="lazy" width="800" height="450"><div><span>${main.tag}</span><h3>${main.title}</h3><p>${main.desc}</p></div></article>
      <div class="mkt-cases-row">${c.cases.slice(1).map((cs) => `<article><img src="${cs.image}" alt="${cs.title}" loading="lazy" width="400" height="260"><h3>${cs.title}</h3><p>${cs.desc}</p></article>`).join('')}</div>
    </div></section>`;
  },
  'cases-trio'(c) {
    return `<section class="mkt-sec" id="mkt-cases"><div class="mkt-wrap">${head('Success Stories')}
      <div class="mkt-cases-trio">${c.cases.map((cs) => `<article><img src="${cs.image}" alt="${cs.title}" loading="lazy" width="360" height="240"><span>${cs.tag}</span><h3>${cs.title}</h3><p>${cs.desc}</p></article>`).join('')}</div>
    </div></section>`;
  },
  'cases-stack'(c) {
    return `<section class="mkt-sec mkt-sec--cases-stack" id="mkt-cases"><div class="mkt-wrap">${head('Success Stories')}
      ${c.cases.map((cs, i) => `<article class="mkt-case-stack mkt-case-stack--${i + 1}"><img src="${cs.image}" alt="${cs.title}" loading="lazy" width="500" height="320"><div><span>${cs.tag}</span><h3>${cs.title}</h3><p>${cs.desc}</p></div></article>`).join('')}
    </div></section>`;
  },
  'cases-spotlight'(c) { return SECTIONS['cases-featured'](c); },

  'tech-pills'() { return ''; },
  'tech-grid'() { return ''; },
  'tech-row'(c) { return SECTIONS['tech-pills'](c); },
  'tech-minimal'(c) { return SECTIONS['tech-grid'](c); },

  'faq-accordion'(c) {
    return renderEnterpriseFaqSection({
      id: 'mkt-faq',
      faqs: c.faqs || [],
      contactHref: '#mkt-contact',
      contactPageHref: '../contact.html',
      aos: false,
      sectionClass: 'ent-faq--marketing',
    });
  },
  'faq-two-col'(c) {
    return renderEnterpriseFaqSection({
      id: 'mkt-faq',
      faqs: c.faqs || [],
      contactHref: '#mkt-contact',
      contactPageHref: '../contact.html',
      aos: false,
      sectionClass: 'ent-faq--marketing',
    });
  },

  'cta-split'(c) {
    return `<section class="mkt-cta mkt-cta--light mkt-cta--split" id="mkt-cta"><div class="mkt-wrap mkt-cta-split">
      <div><h2>${c.cta}</h2><p>${c.ctaSubtext || ''}</p></div>
      <div class="mkt-cta-split__actions"><a href="#mkt-contact" class="mkt-btn mkt-btn--primary">Free Consultation</a><a href="../contact.html" class="mkt-btn mkt-btn--ghost">Contact Team</a></div>
    </div></section>`;
  },
  'cta-minimal'(c) {
    return `<section class="mkt-cta mkt-cta--light mkt-cta--minimal" id="mkt-cta"><div class="mkt-wrap mkt-cta-center"><h2>${c.cta}</h2><a href="#mkt-contact" class="mkt-btn mkt-btn--primary">Book Discovery Call</a></div></section>`;
  },
  'cta-social'(c) { return SECTIONS['cta-split'](c); },
  'cta-creator'(c) { return SECTIONS['cta-minimal'](c); },
  'cta-data'(c) { return SECTIONS['cta-split'](c); },
  'cta-ppc'(c) { return SECTIONS['cta-split'](c); },
  'cta-meta'(c) { return SECTIONS['cta-minimal'](c); },
  'cta-funnel'(c) { return SECTIONS['cta-split'](c); },
  'cta-ecosystem'(c) { return SECTIONS['cta-minimal'](c); },
  'cta-inbox'(c) { return SECTIONS['cta-split'](c); },
  'cta-chat'(c) { return SECTIONS['cta-minimal'](c); },
  'cta-mobile'(c) { return SECTIONS['cta-split'](c); },
  'cta-marketplace'(c) { return SECTIONS['cta-split'](c); },
  'cta-store'(c) { return SECTIONS['cta-minimal'](c); },
  'cta-catalog'(c) { return SECTIONS['cta-split'](c); },
  'cta-rank'(c) { return SECTIONS['cta-minimal'](c); },

  contact(c) {
    return `<section class="mkt-sec mkt-sec--contact" id="mkt-contact"><div class="mkt-wrap mkt-contact-grid">
      <div class="mkt-contact-aside"><h2 class="mkt-h2">Talk to a Marketing Expert</h2><p>Tell us about your goals. We respond within one business day.</p>
        <ul><li><i class="fas fa-envelope"></i> hello@guudle.com</li><li><i class="fas fa-clock"></i> Response within 24 hours</li></ul>
        <img src="${c.images[11] || c.images[5]}" alt="Team collaboration" loading="lazy" width="480" height="320">
        <img src="${c.images[12] || c.images[6]}" alt="Marketing workspace" loading="lazy" width="480" height="280" class="mkt-contact-aside__img2"></div>
      <form class="mkt-form" id="mkt-contact-form" novalidate>
        <label>Full Name *<input type="text" name="name" required placeholder="Your name"></label>
        <label>Work Email *<input type="email" name="email" required placeholder="you@company.com"></label>
        <label>Project Details *<textarea name="message" rows="4" required placeholder="Your marketing goals…"></textarea></label>
        <button type="submit" class="mkt-btn mkt-btn--primary">Submit Inquiry <i class="fas fa-paper-plane"></i></button>
      </form>
    </div></section>`;
  },

  related(c) {
    if (!c.related?.length) return '';
    return `<section class="mkt-sec mkt-sec--related" aria-label="Related services"><div class="mkt-wrap">
      <p class="mkt-related-label">Explore Related Services</p>
      <div class="mkt-related">${c.related.map((r) => `<a href="${r.href}"><i class="fas fa-arrow-right"></i>${r.label}</a>`).join('')}</div>
    </div></section>`;
  },
};

function unifiedDevProcess() {
  return renderProcessHubCta({ linkPrefix: '../', aos: false });
}

[
  'promo-process-timeline', 'seo-process-wizard', 'sea-process-flow',
  'process-horizontal', 'process-vertical-alt', 'process-stepped',
  'process-timeline', 'process-funnel', 'process-orbit',
].forEach((key) => { SECTIONS[key] = unifiedDevProcess; });

function unifiedCapabilities(c) {
  return renderCapabilitiesSection(
    {
      ...c,
      sectionTitles: {
        features: 'Key Features & Capabilities',
        featuresSub: c.capabilitiesIntro || `${c.subhead || c.title} — explore the capabilities, deliverables, and outcomes we bring to every engagement.`,
      },
    },
    { sectionId: 'mkt-features', aos: false }
  );
}

[
  'promo-features-carousel', 'seo-features-grid-img', 'sea-features-grid',
  'features-float', 'features-serp-list', 'features-feed', 'features-showcase',
  'features-metrics', 'features-ad-mockup', 'features-ad-preview', 'features-pathway',
  'features-network', 'features-workflow', 'features-bubbles', 'features-sms',
  'features-vendor', 'features-ops', 'features-catalog', 'features-rank',
].forEach((key) => { SECTIONS[key] = unifiedCapabilities; });

export function renderHero(ctx) {
  const fn = HEROES[ctx.hero];
  if (!fn) throw new Error(`Unknown hero: ${ctx.hero}`);
  const bg = ctx.heroImage || ctx.images[0];
  const speed = 0.28 + (Math.abs([...ctx.slug].reduce((a, c) => a + c.charCodeAt(0), 0)) % 5) * 0.04;
  const layers = `<div class="mkt-parallax__bg slp-parallax__bg" style="background-image:url('${bg}')" aria-hidden="true"></div><div class="mkt-hero-parallax__overlay slp-parallax__overlay" aria-hidden="true"></div>`;
  return fn(ctx).replace(
    /<section class="mkt-hero([^"]*)"([^>]*)>/,
    `<section class="mkt-hero-parallax slp-parallax mkt-hero$1"$2 data-mkt-parallax-section data-mkt-parallax-speed="${speed.toFixed(2)}">${layers}`
  );
}

export function renderPipeline(ctx) {
  return ctx.pipeline.map((key) => {
    const fn = SECTIONS[key];
    if (!fn) { console.warn('Missing section:', key); return ''; }
    return fn(ctx);
  }).join('\n');
}

export function renderTrust(c) {
  return `<section class="mkt-trust" id="mkt-trust"><div class="mkt-trust__track">
    ${(c.trust || []).concat(c.trust || []).map((t) => `<span><i class="fas fa-check-circle"></i>${t}</span>`).join('')}
  </div></section>`;
}

export function renderStickyNav(ctx) {
  const ids = ['overview', 'features', 'process', 'contact'];
  const labels = { overview: 'Overview', features: 'Capabilities', process: 'Process', contact: 'Contact' };
  return `<nav class="mkt-sticky" data-mkt-sticky-nav aria-label="Sections"><div class="mkt-sticky__inner">
    ${ids.map((id) => `<a href="#mkt-${id}" data-mkt-nav-link>${labels[id]}</a>`).join('')}
  </div></nav>`;
}
