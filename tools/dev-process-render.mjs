/** Shared HTML renderer — Our Development Process (Journey Flow) */

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

const ACCENTS = ['cyan', 'indigo', 'violet', 'teal', 'sky', 'emerald', 'amber', 'rose'];

function journeyNode(step, i, total) {
  const num = String(i + 1).padStart(2, '0');
  const icon = step.icon || 'fa-circle';
  return `<li class="devproc-journey__node${i === 0 ? ' is-active' : ''}" data-devproc-node="${i}" style="--devproc-node-i:${i};--devproc-node-total:${total - 1}">
    <span class="devproc-journey__dot" aria-hidden="true"><i class="fas ${icon}"></i></span>
    <span class="devproc-journey__label">${esc(step.t)}</span>
    <span class="devproc-journey__num">${num}</span>
  </li>`;
}

function phaseCard(step, i, { linkPrefix = '', aos = false } = {}) {
  const num = String(i + 1).padStart(2, '0');
  const icon = step.icon || 'fa-circle';
  const accent = ACCENTS[i % ACCENTS.length];
  const aosAttr = aos ? ` data-aos="fade-up" data-aos-delay="${Math.min(i * 60, 360)}"` : '';
  const duration = step.duration
    ? `<span class="devproc-card__duration"><i class="fas fa-clock" aria-hidden="true"></i> ${esc(step.duration)}</span>`
    : '';
  const detail = step.detail ? `<p class="devproc-card__detail">${esc(step.detail)}</p>` : '';
  const tags = step.deliverables?.length
    ? `<ul class="devproc-card__tags" aria-label="Deliverables">${step.deliverables.map((d) =>
        `<li>${esc(d)}</li>`
      ).join('')}</ul>`
    : '';
  const link = step.link
    ? `<a href="${esc(linkPrefix + step.link)}" class="devproc-card__link">Learn more <i class="fas fa-arrow-right" aria-hidden="true"></i></a>`
    : '';

  return `<article class="devproc-card devproc-card--${accent}" role="listitem" data-devproc-card="${i}"${aosAttr}>
    <div class="devproc-card__accent" aria-hidden="true"></div>
    <span class="devproc-card__watermark" aria-hidden="true">${num}</span>
    <div class="devproc-card__head">
      <span class="devproc-card__icon" aria-hidden="true"><i class="fas ${icon}"></i></span>
      ${duration}
    </div>
    <p class="devproc-card__phase">Phase ${num}</p>
    <h3 class="devproc-card__title">${esc(step.t)}</h3>
    <p class="devproc-card__summary">${esc(step.d)}</p>
    ${detail}
    ${tags}
    ${link}
  </article>`;
}

function metricsStrip(metrics) {
  if (!metrics?.length) return '';
  return `<div class="devproc-strip" aria-label="Process highlights">${metrics.map((m) =>
    `<div class="devproc-strip__item">
      <strong class="devproc-strip__value">${esc(m.value)}</strong>
      <span class="devproc-strip__label">${esc(m.label)}</span>
    </div>`
  ).join('')}</div>`;
}

/**
 * @param {object} opts
 */
export function renderDevProcessSection(opts) {
  const {
    steps,
    id = 'svc-process',
    badge = 'Process',
    title = 'Our Development Process',
    subtitle = 'A proven, transparent workflow — from first workshop to production launch and beyond.',
    headingTag = 'h2',
    metrics = null,
    linkPrefix = '../',
    aos = false,
    showMethodologyLink = true,
  } = opts;

  const headAos = aos ? ' data-aos="fade-up"' : '';
  const nodes = steps.map((s, i) => journeyNode(s, i, steps.length)).join('');
  const cards = steps.map((s, i) => phaseCard(s, i, { linkPrefix, aos })).join('');
  const methodologyLink = showMethodologyLink
    ? `<a href="${esc(linkPrefix)}our-process.html" class="devproc-banner__link">Explore full methodology <i class="fas fa-arrow-right" aria-hidden="true"></i></a>`
    : '';

  return `<section id="${esc(id)}" class="devproc-section" data-devproc-root>
  <div class="devproc-flow-bg" aria-hidden="true">
    <svg class="devproc-flow-bg__wave" viewBox="0 0 1440 320" preserveAspectRatio="none"><path fill="rgba(16,165,245,0.06)" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"/></svg>
    <div class="devproc-flow-bg__blob devproc-flow-bg__blob--1"></div>
    <div class="devproc-flow-bg__blob devproc-flow-bg__blob--2"></div>
  </div>
  <div class="devproc-wrap">
    <header class="devproc-head"${headAos}>
      <span class="devproc-badge"><i class="fas fa-route" aria-hidden="true"></i> ${esc(badge)}</span>
      <${headingTag} class="devproc-title">${title}</${headingTag}>
      <p class="devproc-lead">${esc(subtitle)}</p>
    </header>
    ${metricsStrip(metrics)}
    <div class="devproc-journey" aria-label="Process journey overview">
      <div class="devproc-journey__track" aria-hidden="true">
        <div class="devproc-journey__fill"></div>
      </div>
      <ol class="devproc-journey__nodes">${nodes}</ol>
    </div>
    <div class="devproc-grid" role="list" aria-label="Development process phases">${cards}</div>
    <aside class="devproc-banner">
      <div class="devproc-banner__icon" aria-hidden="true"><i class="fas fa-shield-halved"></i></div>
      <div class="devproc-banner__text">
        <strong>Enterprise delivery standards</strong>
        <span>Security review, stakeholder sign-off, and quality gates at every phase.</span>
      </div>
      ${methodologyLink}
    </aside>
  </div>
</section>`;
}

export const corpProcessSteps = [
  {
    t: 'Discovery & Consultation',
    d: 'Collaborative workshops to align on business goals, users, technical scope, and success metrics.',
    detail: 'Stakeholder interviews and feasibility assessment before any build commitment.',
    icon: 'fa-magnifying-glass',
    duration: '1–2 weeks',
    deliverables: ['Discovery brief', 'Stakeholder map', 'Success metrics'],
    link: 'contact.html',
  },
  {
    t: 'Research & Planning',
    d: 'Market research, architecture planning, and a prioritized roadmap with clear milestones.',
    detail: 'Risk register and ROI-aligned backlog for predictable delivery.',
    icon: 'fa-clipboard-list',
    duration: '1–2 weeks',
    deliverables: ['Technical roadmap', 'Architecture blueprint', 'Sprint plan'],
    link: 'contact.html',
  },
  {
    t: 'UI / UX Design',
    d: 'Wireframes, prototypes, and accessible interfaces validated with users and engineering.',
    detail: 'WCAG-aware design systems built for conversion and scalability.',
    icon: 'fa-pen-nib',
    duration: '2–4 weeks',
    deliverables: ['Wireframes', 'Interactive prototype', 'Design system'],
    link: 'services/ui-ux-design.html',
  },
  {
    t: 'Software Development',
    d: 'Agile sprints delivering secure, scalable, production-ready increments every two weeks.',
    detail: 'Transparent demos, velocity reporting, and direct access to engineering leads.',
    icon: 'fa-code',
    duration: 'Sprint-based',
    deliverables: ['Working software', 'API contracts', 'Documentation'],
    link: 'services/custom-software-development.html',
  },
  {
    t: 'Testing & QA',
    d: 'Manual and automated testing across functionality, security, accessibility, and performance.',
    detail: 'Regression suites, penetration review, and load validation before release.',
    icon: 'fa-shield-halved',
    duration: '1–2 weeks',
    deliverables: ['QA reports', 'Security checklist', 'Benchmarks'],
    link: 'services/qa-testing.html',
  },
  {
    t: 'Deployment',
    d: 'CI/CD pipelines, cloud infrastructure, and zero-downtime production releases.',
    detail: 'Observability, rollback plans, and operational runbooks included.',
    icon: 'fa-cloud-arrow-up',
    duration: '1 week',
    deliverables: ['CI/CD pipeline', 'Monitoring', 'Runbooks'],
    link: 'services/devops.html',
  },
  {
    t: 'Launch & Training',
    d: 'Go-live support with documentation, admin training, and knowledge transfer.',
    detail: 'Smooth handover so your team can operate confidently from day one.',
    icon: 'fa-rocket',
    duration: '1 week',
    deliverables: ['Launch checklist', 'User guides', 'Training'],
    link: 'contact.html',
  },
  {
    t: 'Maintenance & Growth',
    d: 'Continuous monitoring, optimization, and feature evolution post-launch.',
    detail: 'SLA-backed support and analytics-driven roadmap iteration.',
    icon: 'fa-headset',
    duration: 'Ongoing',
    deliverables: ['SLA support', 'Release cadence', 'Growth roadmap'],
    link: 'services/maintenance-support.html',
  },
];

export const defaultProcessMetrics = [];
