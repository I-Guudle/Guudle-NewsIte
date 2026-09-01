/**
 * Hosting & Cloud Solutions — full page renderer (cloud-solutions.html)
 */
import { renderProcessHubCta } from './process-hub-shared.mjs';
import { renderEnterpriseFaqSection } from './faq-render.mjs';
import { renderIndustriesParallaxSection, industriesFromTuples } from './industries-parallax-render.mjs';
function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

/** Unsplash CDN — auto=format serves WebP/AVIF where supported */
function unsplash(photoId, w = 900) {
  return `https://images.unsplash.com/${photoId}?w=${w}&q=82&auto=format&fit=crop`;
}

const IMG = {
  hero: unsplash('photo-1451187580459-43490279c0fa', 900),
  transform: unsplash('photo-1558494949-ef010cbdcc31', 1600),
  infra: unsplash('photo-1551288049-bebda4e38f71', 1600),
  industries: unsplash('photo-1522071820081-009f0129c71c', 1600),
  cta: unsplash('photo-1486406146926-c627a92ad1ab', 1600),
  services: {
    infra: unsplash('photo-1558494949-ef010cbdcc31', 640),
    web: unsplash('photo-1460925895917-afdab827c52f', 640),
    migration: unsplash('photo-1555949963-aa79dcee981c', 640),
    managed: unsplash('photo-1553877522-43269d4ea984', 640),
    devops: unsplash('photo-1498050108023-c5249f4df085', 640),
    security: unsplash('photo-1563986768609-322da13575f3', 640),
    dr: unsplash('photo-1558494949-ef010cbdcc31', 640),
    backup: unsplash('photo-1555949963-ff9fe0c870eb', 640),
  },
};

function parallax({ id, bg, light, inner, speed = '0.32' }) {
  return `<section id="${id}" class="cld-parallax guudle-parallax-section${light ? ' cld-parallax--light' : ''}" data-svc-parallax-section data-svc-parallax-speed="${speed}" data-parallax-scale="1.07" aria-labelledby="${id}-heading">
  <div class="cld-parallax__ambient" aria-hidden="true"><span class="cld-parallax__orb cld-parallax__orb--1"></span><span class="cld-parallax__orb cld-parallax__orb--2"></span><div class="cld-parallax__grid"></div></div>
  <div class="cld-parallax__bg guudle-parallax-layer slp-parallax__bg" style="background-image:url('${bg}')" role="img" aria-label="Section background"></div>
  <div class="cld-parallax__overlay${light ? ' cld-parallax__overlay--light' : ''}" aria-hidden="true"></div>
  <div class="cld-parallax__content py-20 sm:py-28">${inner}</div>
</section>`;
}

function serviceCard({ icon, title, desc, items, link, img, imgAlt, delay = 0 }) {
  const list = items?.length ? `<ul class="cld-glow-card__list">${items.map((i) => `<li><i class="fas fa-check" aria-hidden="true"></i>${esc(i)}</li>`).join('')}</ul>` : '';
  const more = link ? `<a href="${link}" class="cld-link">Learn more <i class="fas fa-arrow-right" aria-hidden="true"></i></a>` : '';
  const media = img ? `<div class="cld-service-card__media"><img src="${img}" alt="${esc(imgAlt || title)}" width="400" height="220" loading="lazy" class="cld-service-card__img"></div>` : '';
  return `<article class="cld-glow-card cld-service-card" data-aos="fade-up" data-aos-delay="${delay}">
    <span class="cld-glow-card__glow" aria-hidden="true"></span><span class="cld-glow-card__shine" aria-hidden="true"></span>
    ${media}
    <span class="cld-glow-card__icon"><i class="${icon.includes(' ') ? icon : `fas ${icon}`}" aria-hidden="true"></i></span>
    <h3 class="cld-glow-card__title">${esc(title)}</h3>
    <p class="cld-glow-card__desc">${esc(desc)}</p>${list}${more}
  </article>`;
}

function glowCard({ icon, title, desc, items, link, delay = 0, dark = false }) {
  const list = items?.length ? `<ul class="cld-glow-card__list">${items.map((i) => `<li><i class="fas fa-check" aria-hidden="true"></i>${esc(i)}</li>`).join('')}</ul>` : '';
  const more = link ? `<a href="${link}" class="cld-link${dark ? ' cld-link--light' : ''}">Learn more <i class="fas fa-arrow-right" aria-hidden="true"></i></a>` : '';
  return `<article class="cld-glow-card${dark ? ' cld-glow-card--dark' : ''}" data-aos="fade-up" data-aos-delay="${delay}">
    <span class="cld-glow-card__glow" aria-hidden="true"></span><span class="cld-glow-card__shine" aria-hidden="true"></span>
    <span class="cld-glow-card__icon"><i class="${icon.includes(' ') ? icon : `fas ${icon}`}" aria-hidden="true"></i></span>
    <h3 class="cld-glow-card__title">${esc(title)}</h3>
    <p class="cld-glow-card__desc">${esc(desc)}</p>${list}${more}
  </article>`;
}

const WHY_CLOUD = [
  ['fa-gauge-high', 'Website Performance', 'SSD storage, CDN, and caching for fast global delivery.'],
  ['fa-server', 'High Availability', 'Redundant architecture with automatic failover.'],
  ['fa-chart-line', 'Scalability', 'Auto-scaling resources as traffic and workloads grow.'],
  ['fa-shield-halved', 'Cybersecurity', 'Firewalls, encryption, IAM, and threat monitoring.'],
  ['fa-globe', 'Global Accessibility', 'Multi-region deployments and edge delivery.'],
  ['fa-business-time', 'Business Continuity', 'Resilient infrastructure designed for uptime.'],
  ['fa-database', 'Automated Backups', 'Scheduled snapshots and incremental backup policies.'],
  ['fa-rotate', 'Disaster Recovery', 'Replication, runbooks, and tested recovery plans.'],
  ['fa-piggy-bank', 'Reduced Costs', 'Right-sized resources and consumption-based pricing.'],
  ['fa-sliders', 'Simplified Management', 'Managed ops so your team focuses on product.'],
  ['fa-people-group', 'Collaboration', 'Secure shared environments for distributed teams.'],
  ['fa-circle-check', 'Reliability', '99.99% uptime targets with SLA-backed support.'],
];

const HOSTING_SERVICES = [
  { icon: 'fa-cloud', title: 'Cloud Infrastructure Services', desc: 'Design, deploy, and operate secure multi-cloud environments.', items: ['VPC & network design', 'Auto-scaling groups', 'Load balancers', 'Cost governance'], link: '#cld-platforms', img: IMG.services.infra, imgAlt: 'Enterprise cloud infrastructure and global server network' },
  { icon: 'fa-globe', title: 'Web Hosting', desc: 'Fast, secure hosting for corporate sites and applications.', items: ['SSL & CDN', 'Staging environments', 'CMS hosting', 'Performance tuning'], link: '#cld-hosting-plans', img: IMG.services.web, imgAlt: 'Web hosting analytics dashboard on laptop' },
  { icon: 'fa-truck-ramp-box', title: 'Cloud Migration', desc: 'Move workloads from on-prem or legacy cloud with minimal risk.', items: ['Discovery & assessment', 'Migration runbooks', 'Zero-downtime cutover', 'Post-migration optimization'], link: '../our-process.html', img: IMG.services.migration, imgAlt: 'Cloud migration planning and digital transformation' },
  { icon: 'fa-headset', title: 'Managed Cloud Services', desc: '24/7 monitoring, patching, and incident response.', items: ['Proactive monitoring', 'Security patching', 'Capacity planning', 'Monthly reports'], link: '#cld-monitoring', img: IMG.services.managed, imgAlt: 'Managed cloud operations team collaborating' },
  { icon: 'fa-gears', title: 'DevOps & Automation', desc: 'CI/CD pipelines and infrastructure as code at scale.', items: ['GitHub Actions / Azure DevOps', 'Terraform & Ansible', 'Container orchestration', 'GitOps workflows'], link: '#cld-devops', img: IMG.services.devops, imgAlt: 'DevOps engineers working on cloud automation' },
  { icon: 'fa-lock', title: 'Cloud Security', desc: 'Zero-trust architecture and compliance-ready controls.', items: ['IAM & MFA', 'WAF & DDoS protection', 'Encryption at rest/transit', 'Audit logging'], link: '#cld-infra-dashboard', img: IMG.services.security, imgAlt: 'Cloud security and cyber protection concept' },
  { icon: 'fa-house-chimney-crack', title: 'Disaster Recovery', desc: 'Business continuity with tested failover and replication.', items: ['RTO/RPO planning', 'Cross-region replication', 'DR drills', 'Runbook automation'], link: '#cld-backup', img: IMG.services.dr, imgAlt: 'Data center servers for disaster recovery infrastructure' },
  { icon: 'fa-floppy-disk', title: 'Backup Solutions', desc: 'Automated backup strategies for databases and file systems.', items: ['Daily & incremental backups', 'Point-in-time recovery', 'Off-site cloud backup', 'Retention policies'], link: '#cld-backup', img: IMG.services.backup, imgAlt: 'Cloud backup and data replication systems' },
];

const HOSTING_PLANS = [
  { name: 'Shared Hosting', perf: 'Starter sites & blogs', sec: 'SSL, WAF basics', storage: '20–100 GB SSD', support: 'Business hours', scale: 'Low traffic' },
  { name: 'VPS Hosting', perf: 'Dedicated resources', sec: 'Firewall + SSL', storage: '50–500 GB SSD', support: 'Extended hours', scale: 'Growing apps' },
  { name: 'Dedicated Servers', perf: 'Bare-metal power', sec: 'Hardened OS baseline', storage: '1–4 TB RAID', support: 'Priority SLA', scale: 'High compute' },
  { name: 'Managed Hosting', perf: 'Fully managed stack', sec: 'Managed patches & WAF', storage: 'Custom', support: '24/7 managed', scale: 'Hands-off ops' },
  { name: 'Cloud Hosting', perf: 'Auto-scaling cloud', sec: 'IAM + encryption', storage: 'Elastic block/object', support: '24/7 cloud NOC', scale: 'Elastic demand' },
  { name: 'Enterprise Hosting', perf: 'Multi-region HA', sec: 'Compliance controls', storage: 'Petabyte-ready', support: 'Dedicated TAM', scale: 'Mission-critical' },
];

const PLATFORMS = [
  { icon: 'fab fa-aws', name: 'Amazon Web Services', desc: 'Industry-leading cloud with 200+ services for compute, storage, AI, and analytics.', services: ['EC2 & Lambda', 'RDS & DynamoDB', 'S3 & CloudFront', 'EKS & ECS'], benefits: ['Global regions', 'Mature ecosystem', 'Enterprise compliance'], use: 'SaaS, e-commerce, data platforms' },
  { icon: 'fab fa-microsoft', name: 'Microsoft Azure', desc: 'Hybrid-friendly cloud deeply integrated with Microsoft 365, Active Directory, and .NET.', services: ['App Service & AKS', 'Azure SQL', 'Blob Storage', 'Azure DevOps'], benefits: ['Hybrid identity', 'Enterprise agreements', 'Strong compliance'], use: 'Enterprise apps, government, ERP' },
  { icon: 'fab fa-google', name: 'Google Cloud Platform', desc: 'Data and AI-first cloud with strong Kubernetes, analytics, and ML capabilities.', services: ['GKE & Cloud Run', 'BigQuery', 'Cloud Storage', 'Vertex AI'], benefits: ['Analytics leadership', 'Global network', 'Sustainable infra'], use: 'Analytics, ML, modern web apps' },
  { icon: 'fab fa-digital-ocean', name: 'DigitalOcean', desc: 'Developer-friendly cloud for startups and teams needing simplicity and predictable pricing.', services: ['Droplets', 'Managed Kubernetes', 'Spaces object storage', 'App Platform'], benefits: ['Simple UX', 'Predictable pricing', 'Fast provisioning'], use: 'Startups, dev/staging, SMB hosting' },
];

const DEVOPS = [
  ['fa-code-branch', 'CI/CD', 'Automated build, test, and deploy pipelines.'],
  ['fab fa-docker', 'Docker', 'Containerized workloads for consistency.'],
  ['fas fa-dharmachakra', 'Kubernetes', 'Orchestration at scale with HA.'],
  ['fa-file-code', 'Infrastructure as Code', 'Terraform, Pulumi, and ARM templates.'],
  ['fa-code-merge', 'GitOps', 'Declarative deployments from Git.'],
  ['fa-chart-area', 'Monitoring', 'Metrics, logs, and distributed tracing.'],
  ['fa-rocket', 'Deployment Automation', 'Blue/green and canary releases.'],
  ['fa-sliders', 'Configuration Management', 'Ansible, Chef, and policy-as-code.'],
];

const BACKUP = [
  ['fa-calendar-day', 'Daily Backups', 'Automated nightly snapshots.'],
  ['fa-layer-group', 'Incremental Backup', 'Efficient delta backups between full runs.'],
  ['fa-cloud-arrow-up', 'Cloud Backup', 'Off-site replication to secondary regions.'],
  ['fa-rotate-left', 'Recovery', 'Point-in-time restore and file-level recovery.'],
  ['fa-clone', 'Replication', 'Real-time sync for critical databases.'],
  ['fa-clipboard-list', 'Disaster Planning', 'Documented RTO/RPO and DR drills.'],
];

const MONITORING = [
  ['fa-eye', '24/7 Monitoring', 'Always-on NOC and alert routing.'],
  ['fa-heart-pulse', 'Server Health', 'CPU, memory, disk, and network metrics.'],
  ['fa-signal', 'Uptime', 'SLA tracking with public status options.'],
  ['fa-user-shield', 'Security Monitoring', 'SIEM alerts and vulnerability scans.'],
  ['fa-bolt', 'Incident Response', 'Escalation playbooks and war rooms.'],
  ['fa-file-lines', 'Monthly Reports', 'Performance, cost, and security summaries.'],
];

const INDUSTRIES = [
  ['fa-heart-pulse', 'Healthcare', 'HIPAA-aware hosting and secure patient platforms.'],
  ['fa-building-columns', 'Banking', 'Regulated workloads with encryption and audit trails.'],
  ['fa-landmark-dome', 'Government', 'Sovereign cloud and compliance-ready infrastructure.'],
  ['fa-graduation-cap', 'Education', 'LMS hosting and campus application platforms.'],
  ['fa-bag-shopping', 'Retail', 'High-traffic e-commerce and omnichannel backends.'],
  ['fa-helmet-safety', 'Construction', 'Field apps and project collaboration hosting.'],
  ['fa-industry', 'Manufacturing', 'IoT ingestion and ERP cloud hosting.'],
  ['fa-hotel', 'Hospitality', 'Booking engines and property management systems.'],
  ['fa-truck', 'Logistics', 'Real-time tracking and TMS cloud platforms.'],
  ['fa-building', 'Real Estate', 'Listing portals and CRM hosting at scale.'],
  ['fa-shield', 'Insurance', 'Secure policy and claims application hosting.'],
  ['fa-microchip', 'Technology', 'SaaS platforms and developer infrastructure.'],
  ['fa-tower-cell', 'Telecommunications', 'High-availability network service backends.'],
  ['fa-hand-holding-heart', 'Non-Profit', 'Cost-optimized hosting for mission-driven orgs.'],
];

const WHY_US = [
  ['fa-certificate', 'Certified Cloud Engineers', 'AWS, Azure, and GCP certified architects.'],
  ['fa-shield-halved', 'Enterprise Security', 'Zero-trust design and compliance alignment.'],
  ['fa-clock', '99.99% Uptime', 'HA architecture with SLA-backed availability.'],
  ['fa-tags', 'Transparent Pricing', 'Clear estimates with no surprise overages.'],
  ['fa-headset', '24/7 Support', 'Global NOC and named account managers.'],
  ['fa-server', 'High Availability', 'Multi-AZ and multi-region redundancy.'],
  ['fa-expand', 'Scalable Infrastructure', 'Elastic resources that grow with demand.'],
  ['fa-cloud', 'Cloud Experts', 'Multi-cloud strategy without vendor lock-in.'],
  ['fa-house-chimney-crack', 'Disaster Recovery', 'Tested failover and business continuity.'],
  ['fa-gears', 'DevOps Specialists', 'CI/CD and IaC from day one.'],
  ['fa-handshake', 'Long-Term Partnership', 'Day-2 ops beyond launch.'],
];

const MIGRATION_STEPS = [
  { t: 'Assessment', d: 'Inventory workloads, dependencies, and compliance requirements.', icon: 'fa-magnifying-glass', duration: '1–2 weeks' },
  { t: 'Planning', d: 'Migration strategy, timeline, and risk mitigation plan.', icon: 'fa-clipboard-list', duration: '1–2 weeks' },
  { t: 'Architecture', d: 'Target cloud design with security and cost models.', icon: 'fa-sitemap', duration: '2–3 weeks' },
  { t: 'Migration', d: 'Phased workload migration with rollback options.', icon: 'fa-truck-ramp-box', duration: 'Sprint-based' },
  { t: 'Testing', d: 'Performance, security, and failover validation.', icon: 'fa-vial', duration: '1–2 weeks' },
  { t: 'Deployment', d: 'Production cutover with monitoring enabled.', icon: 'fa-cloud-arrow-up', duration: '1 week' },
  { t: 'Monitoring', d: 'Observability, alerting, and cost dashboards live.', icon: 'fa-chart-line', duration: 'Ongoing' },
  { t: 'Ongoing Support', d: 'Managed ops, optimization, and SLA support.', icon: 'fa-headset', duration: 'Continuous' },
];

const FAQ = [
  { q: 'Which cloud platform is best for my business?', a: 'It depends on your stack, compliance needs, and team skills. We assess AWS, Azure, GCP, and DigitalOcean and recommend the best fit — or a multi-cloud approach when appropriate.' },
  { q: 'Can you migrate my website or applications to the cloud?', a: 'Yes. We handle discovery, architecture, migration execution, testing, and cutover with rollback plans to minimize downtime.' },
  { q: 'Do you provide managed hosting?', a: 'Full managed hosting includes 24/7 monitoring, patching, backups, incident response, and monthly performance reports.' },
  { q: 'Is my data secure in the cloud?', a: 'We implement encryption, IAM, firewalls, WAF, MFA, audit logging, and compliance controls aligned to your industry requirements.' },
  { q: 'Do you offer backups and disaster recovery?', a: 'Yes — automated backups, cross-region replication, DR runbooks, and regular recovery drills are standard in our enterprise packages.' },
  { q: 'Can I scale my hosting later?', a: 'Absolutely. Cloud and managed hosting plans are designed to scale horizontally and vertically as traffic and workloads grow.' },
  { q: 'What uptime can we expect?', a: 'We architect for 99.99% availability with redundancy, health checks, and automatic failover — backed by SLA options for enterprise clients.' },
  { q: 'Do you support hybrid cloud?', a: 'Yes — we integrate on-premises, private cloud, and public cloud with secure connectivity and unified identity.' },
];

const RELATED = [
  ['website-development.html', 'Web Development'],
  ['custom-mobile-app-development.html', 'Mobile Apps'],
  ['website-security.html', 'Cyber Security'],
  ['#cld-migration', 'Cloud Migration'],
  ['api-development.html', 'API Development'],
  ['maintenance-support.html', 'Website Maintenance'],
  ['it-consulting.html', 'Managed IT'],
  ['devops.html', 'DevOps'],
  ['data-engineering.html', 'Database Management'],
];

export function renderCloudHostingMain() {
  const hero = `<section class="saas-hero saas-hero--light hero-premium hero-premium--enterprise hero-premium--split" aria-labelledby="cld-hero-heading" data-svc-hero>
      <div class="hero-aurora hero-aurora-1" data-hero-parallax="0.1" aria-hidden="true"></div>
      <div class="hero-aurora hero-aurora-2" data-hero-parallax="0.14" aria-hidden="true"></div>
      <div class="hero-aurora hero-aurora-3" data-hero-parallax="0.08" aria-hidden="true"></div>
      <div class="hero-dot-grid" aria-hidden="true"></div>
      <div class="hero-beam" aria-hidden="true"></div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-[96px] relative z-10">
        <div class="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 xl:gap-16 items-center py-14 lg:py-20">
          <div class="relative hero-enter hero-enter-d1 order-2 lg:order-1" data-hero-parallax="0.05" data-aos="fade-right" data-aos-duration="900">
            <div class="hero-visual-panel">
              <div class="hero-visual-panel__glow" aria-hidden="true"></div>
              <div class="hero-visual-panel__ring" aria-hidden="true"></div>
              <div class="hero-visual-panel__frame">
                <img src="${IMG.hero}" alt="Hosting and cloud infrastructure — global servers, DevOps, secure data centers, and digital transformation by Guudle IT Solutions" width="640" height="800" loading="eager" fetchpriority="high" class="hero-visual-panel__img">
              </div>
              <div class="hero-chip hero-chip--1" aria-hidden="true"><i class="fas fa-cloud"></i> Global Cloud</div>
              <div class="hero-chip hero-chip--2" aria-hidden="true"><i class="fas fa-shield-halved"></i> Secure Cloud</div>
            </div>
          </div>
          <div class="max-w-xl order-1 lg:order-2">
            <nav class="text-sm text-slate-500 mb-7" aria-label="Breadcrumb" data-aos="fade-up">
              <a href="../../index.html" class="hover:text-slate-800 transition-colors">Home</a><span class="mx-2 text-slate-300">/</span>
              <a href="../../index.html#services" class="hover:text-slate-800 transition-colors">Services</a><span class="mx-2 text-slate-300">/</span>
              <span class="text-slate-900 font-semibold">Hosting &amp; Cloud Solutions</span>
            </nav>
            <div class="hero-enter hero-enter-d1 hero-badge hero-badge--navy mb-7" data-aos="fade-up">
              <span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60"></span><span class="relative rounded-full h-2 w-2 bg-cyan-600"></span></span>
              <span>HERO — Premium Interactive Experience</span>
              <span class="hero-badge__div" aria-hidden="true"></span>
              <span class="hero-badge__rating"><i class="fas fa-star"></i> Enterprise grade</span>
            </div>
            <p class="hero-enter hero-enter-d1 text-sm font-bold uppercase tracking-wider text-[#10A5F5] mb-3" data-aos="fade-up">Hosting &amp; Cloud Solutions Services</p>
            <h1 id="cld-hero-heading" class="hero-enter hero-enter-d2 hero-title-navy font-display hero-title text-[2.25rem] sm:text-4xl xl:text-[3.25rem] font-extrabold leading-[1.08] mb-5" data-aos="fade-up" data-aos-delay="50">Reliable, Secure &amp; Scalable <span class="block mt-2 hero-title-navy__line">Cloud Infrastructure for Modern Businesses</span></h1>
            <p class="hero-enter hero-enter-d3 text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-lg" data-aos="fade-up" data-aos-delay="100">Accelerate your digital transformation with enterprise-grade hosting and cloud solutions designed to maximize performance, security, scalability, and business continuity. Whether you're launching a new website, migrating mission-critical applications, or modernizing your IT infrastructure, our cloud experts deliver tailored solutions that keep your business running efficiently and securely.</p>
            <div class="hero-enter hero-enter-d4 flex flex-wrap gap-3 mb-9" data-aos="fade-up" data-aos-delay="150">
              <a href="../contact.html" class="hero-cta-navy-primary magnetic inline-flex items-center gap-2 px-6 py-3.5 text-sm">Get a Free Cloud Consultation <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
              <a href="#cld-transform" class="hero-cta-navy-secondary inline-flex items-center gap-2 px-6 py-3.5 text-sm"><i class="fas fa-cloud text-cyan-600"></i> Start Your Cloud Journey</a>
            </div>
            <div class="hero-enter hero-enter-d5 hero-enterprise-grid" data-aos="fade-up" data-aos-delay="200">
              <article class="hero-enterprise-card"><span class="hero-enterprise-card__icon"><i class="fas fa-server" aria-hidden="true"></i></span><div><strong>Enterprise Cloud</strong><p>Multi-cloud architecture built for scale and resilience.</p></div></article>
              <article class="hero-enterprise-card"><span class="hero-enterprise-card__icon"><i class="fas fa-shield-halved" aria-hidden="true"></i></span><div><strong>Security First</strong><p>Encryption, IAM, and compliance-ready controls.</p></div></article>
              <article class="hero-enterprise-card"><span class="hero-enterprise-card__icon"><i class="fas fa-arrows-rotate" aria-hidden="true"></i></span><div><strong>Cloud Migration</strong><p>Assessment through cutover with zero-downtime options.</p></div></article>
              <article class="hero-enterprise-card"><span class="hero-enterprise-card__icon"><i class="fas fa-headset" aria-hidden="true"></i></span><div><strong>24/7 Managed Ops</strong><p>Proactive monitoring and SLA-backed support.</p></div></article>
            </div>
          </div>
        </div>
      </div>
      <div class="hero-divider" aria-hidden="true"><span class="hero-divider__line"></span><span class="hero-divider__gem"></span><span class="hero-divider__line"></span></div>
    </section>`;

  const stickyNav = `<nav class="slp-sticky-nav" data-svc-sticky-nav aria-label="Page sections"><div class="slp-sticky-nav__inner">
    <a href="#cld-transform" class="slp-sticky-nav__link" data-svc-nav-link>Overview</a>
    <a href="#cld-why" class="slp-sticky-nav__link" data-svc-nav-link>Why Cloud</a>
    <a href="#cld-services" class="slp-sticky-nav__link" data-svc-nav-link>Services</a>
    <a href="#cld-hosting-plans" class="slp-sticky-nav__link" data-svc-nav-link>Hosting</a>
    <a href="#cld-platforms" class="slp-sticky-nav__link" data-svc-nav-link>Platforms</a>
    <a href="#svc-process-hub" class="slp-sticky-nav__link" data-svc-nav-link>Process</a>
    <a href="#cld-industries" class="slp-sticky-nav__link" data-svc-nav-link>Industries</a>
    <a href="#svc-contact" class="slp-sticky-nav__link" data-svc-nav-link>Contact</a>
  </div></nav>`;

  const transform = parallax({
    id: 'cld-transform',
    bg: IMG.transform,
    light: true,
    inner: `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header class="cld-section-head" data-aos="fade-up">
        <span class="cld-badge cld-badge--navy"><i class="fas fa-cloud" aria-hidden="true"></i> Cloud Computing</span>
        <h2 id="cld-transform-heading" class="cld-title">Transform Your Business with <span class="cld-accent">Modern Cloud Solutions</span></h2>
        <p class="cld-lead">Cloud computing enables digital transformation, business agility, and infrastructure modernization — while optimizing costs and delivering the scalability and reliability modern enterprises demand.</p>
        <div class="cld-intro-grid">${['Digital Transformation', 'Business Agility', 'Infrastructure Modernization', 'Cost Optimization', 'Elastic Scalability', 'Enterprise Reliability'].map((t, i) =>
          `<div class="cld-intro-pill" data-aos="fade-up" data-aos-delay="${i * 40}"><i class="fas fa-check-circle" aria-hidden="true"></i>${esc(t)}</div>`
        ).join('')}</div>
        <p class="cld-lead mt-6">Guudle architects cloud environments on AWS, Azure, GCP, and DigitalOcean — from first migration to managed day-2 operations with DevOps automation, security hardening, and disaster recovery built in.</p>
      </header>
    </div>`,
  });

  const whySection = `<section id="cld-why" class="cld-section cld-section--gray" aria-labelledby="cld-why-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <header class="cld-section-head" data-aos="fade-up">
        <span class="cld-badge cld-badge--navy"><i class="fas fa-circle-question" aria-hidden="true"></i> Why Cloud</span>
        <h2 id="cld-why-heading" class="cld-title">Why Your Business Needs <span class="cld-accent">Cloud Hosting</span></h2>
        <p class="cld-lead">Modern hosting and cloud infrastructure deliver measurable advantages — from performance and security to continuity and simplified operations.</p>
      </header>
      <div class="cld-feature-grid">${WHY_CLOUD.map(([icon, title, desc], i) =>
        glowCard({ icon, title, desc, delay: Math.min(i * 40, 440) })
      ).join('')}</div>
    </div>
  </section>`;

  const servicesSection = `<section id="cld-services" class="cld-section cld-section--white" aria-labelledby="cld-services-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <header class="cld-section-head" data-aos="fade-up">
        <span class="cld-badge cld-badge--navy"><i class="fas fa-layer-group" aria-hidden="true"></i> Services</span>
        <h2 id="cld-services-heading" class="cld-title">Our Hosting &amp; <span class="cld-accent">Cloud Services</span></h2>
        <p class="cld-lead">End-to-end cloud capabilities — from infrastructure design and web hosting to migration, DevOps, security, and disaster recovery.</p>
      </header>
      <div class="cld-glow-grid cld-glow-grid--4">${HOSTING_SERVICES.map((s, i) => serviceCard({ ...s, delay: i * 45 })).join('')}</div>
    </div>
  </section>`;

  const hostingPlans = `<section id="cld-hosting-plans" class="cld-section cld-section--gray" aria-labelledby="cld-hosting-plans-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <header class="cld-section-head" data-aos="fade-up">
        <span class="cld-badge cld-badge--navy"><i class="fas fa-server" aria-hidden="true"></i> Hosting Plans</span>
        <h2 id="cld-hosting-plans-heading" class="cld-title">Hosting <span class="cld-accent">Solutions</span></h2>
        <p class="cld-lead">Flexible hosting tiers — from shared and VPS to dedicated, managed, cloud, and enterprise-grade infrastructure.</p>
      </header>
      <div class="cld-plan-grid">${HOSTING_PLANS.map((p, i) =>
        `<article class="cld-plan-card" data-aos="fade-up" data-aos-delay="${Math.min(i * 50, 300)}">
          <h3 class="cld-plan-card__title">${esc(p.name)}</h3>
          <ul class="cld-plan-card__list">
            <li><strong>Performance</strong><span>${esc(p.perf)}</span></li>
            <li><strong>Security</strong><span>${esc(p.sec)}</span></li>
            <li><strong>Storage</strong><span>${esc(p.storage)}</span></li>
            <li><strong>Support</strong><span>${esc(p.support)}</span></li>
            <li><strong>Scalability</strong><span>${esc(p.scale)}</span></li>
          </ul>
          <a href="#svc-contact" class="cld-btn cld-btn--outline">Get a Quote <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
        </article>`
      ).join('')}</div>
    </div>
  </section>`;

  const platforms = `<section id="cld-platforms" class="cld-section cld-section--white" aria-labelledby="cld-platforms-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <header class="cld-section-head" data-aos="fade-up">
        <span class="cld-badge cld-badge--navy"><i class="fas fa-cloud" aria-hidden="true"></i> Platforms</span>
        <h2 id="cld-platforms-heading" class="cld-title">Cloud <span class="cld-accent">Platforms</span></h2>
        <p class="cld-lead">Certified expertise across leading cloud providers — architected for your workloads, compliance, and budget.</p>
      </header>
      <div class="cld-platform-grid">${PLATFORMS.map((p, i) =>
        `<article class="cld-platform-card" data-aos="fade-up" data-aos-delay="${i * 60}">
          <span class="cld-platform-card__icon"><i class="${p.icon}" aria-hidden="true"></i></span>
          <h3 class="cld-platform-card__title">${esc(p.name)}</h3>
          <p class="cld-platform-card__desc">${esc(p.desc)}</p>
          <p class="cld-platform-card__label">Key services</p>
          <ul class="cld-platform-card__tags">${p.services.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
          <p class="cld-platform-card__label">Benefits</p>
          <ul class="cld-platform-card__list">${p.benefits.map((b) => `<li><i class="fas fa-check" aria-hidden="true"></i>${esc(b)}</li>`).join('')}</ul>
          <p class="cld-platform-card__use"><i class="fas fa-building" aria-hidden="true"></i> ${esc(p.use)}</p>
        </article>`
      ).join('')}</div>
    </div>
  </section>`;

  const infraDashboard = parallax({
    id: 'cld-infra-dashboard',
    bg: IMG.infra,
    inner: `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <header class="cld-section-head cld-section-head--light" data-aos="fade-up">
        <span class="cld-badge"><i class="fas fa-gauge-high" aria-hidden="true"></i> Infrastructure</span>
        <h2 id="cld-infra-dashboard-heading" class="cld-title cld-title--light">Cloud Infrastructure <span class="cld-accent">Features</span></h2>
        <p class="cld-lead cld-lead--light">Enterprise-grade performance, reliability, security, and monitoring — built into every deployment.</p>
      </header>
      <div class="cld-dash-grid">
        ${[
          ['Performance', ['SSD Storage', 'CDN', 'Load Balancing', 'Auto Scaling', 'High-Speed Networking']],
          ['Reliability', ['99.99% Uptime', 'Redundancy', 'Automatic Failover', 'Data Replication']],
          ['Security', ['SSL/TLS', 'Firewall', 'IAM', 'Encryption', 'Malware Protection']],
          ['Monitoring', ['Real-Time Analytics', 'Server Health', 'Centralized Logs', 'Smart Alerts', 'Performance Reports']],
        ].map(([title, items], col) =>
          `<div class="cld-dash-col" data-aos="fade-up" data-aos-delay="${col * 80}">
            <h3 class="cld-dash-col__title">${esc(title)}</h3>
            <ul class="cld-dash-col__list">${items.map((i) => `<li><i class="fas fa-circle" aria-hidden="true"></i>${esc(i)}</li>`).join('')}</ul>
          </div>`
        ).join('')}
      </div>
    </div>`,
  });

  const processHubCta = renderProcessHubCta({ linkPrefix: '../' });

  const devopsSection = `<section id="cld-devops" class="cld-section cld-section--white" aria-labelledby="cld-devops-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <header class="cld-section-head" data-aos="fade-up">
        <span class="cld-badge cld-badge--navy"><i class="fas fa-gears" aria-hidden="true"></i> DevOps</span>
        <h2 id="cld-devops-heading" class="cld-title">DevOps <span class="cld-accent">Services</span></h2>
        <p class="cld-lead">Automate delivery pipelines, container platforms, and infrastructure — so your team ships faster with confidence.</p>
      </header>
      <div class="cld-feature-grid cld-feature-grid--4">${DEVOPS.map(([icon, title, desc], i) =>
        glowCard({ icon, title, desc, delay: i * 45 })
      ).join('')}</div>
    </div>
  </section>`;

  const backupSection = `<section id="cld-backup" class="cld-section cld-section--gray" aria-labelledby="cld-backup-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <header class="cld-section-head" data-aos="fade-up">
        <span class="cld-badge cld-badge--navy"><i class="fas fa-floppy-disk" aria-hidden="true"></i> Resilience</span>
        <h2 id="cld-backup-heading" class="cld-title">Backup &amp; <span class="cld-accent">Disaster Recovery</span></h2>
        <p class="cld-lead">Protect business continuity with automated backups, replication, and tested recovery procedures.</p>
      </header>
      <div class="cld-feature-grid cld-feature-grid--3">${BACKUP.map(([icon, title, desc], i) =>
        glowCard({ icon, title, desc, delay: i * 50 })
      ).join('')}</div>
    </div>
  </section>`;

  const monitoringSection = `<section id="cld-monitoring" class="cld-section cld-section--white" aria-labelledby="cld-monitoring-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <header class="cld-section-head" data-aos="fade-up">
        <span class="cld-badge cld-badge--navy"><i class="fas fa-chart-line" aria-hidden="true"></i> Operations</span>
        <h2 id="cld-monitoring-heading" class="cld-title">Monitoring &amp; <span class="cld-accent">Maintenance</span></h2>
        <p class="cld-lead">Proactive operations keep your cloud environment healthy, secure, and performant around the clock.</p>
      </header>
      <div class="cld-monitor-grid">${MONITORING.map(([icon, title, desc], i) =>
        `<article class="cld-monitor-card" data-aos="fade-up" data-aos-delay="${i * 45}">
          <span class="cld-monitor-card__icon"><i class="fas ${icon}" aria-hidden="true"></i></span>
          <h3>${esc(title)}</h3>
          <p>${esc(desc)}</p>
        </article>`
      ).join('')}</div>
    </div>
  </section>`;

  const industriesSection = renderIndustriesParallaxSection({
    industries: industriesFromTuples(INDUSTRIES),
    slug: 'cloud-solutions',
    bg: IMG.industries,
    sectionId: 'cld-industries',
    lead: 'Compliant, secure hosting and cloud solutions built on AWS, Azure, and GCP — tailored to sector-specific regulatory and performance requirements.',
    pathPrefix: '../../',
    contactLink: '#cld-contact',
  });

  const whyUsSection = `<section id="cld-why-us" class="cld-section cld-section--white" aria-labelledby="cld-why-us-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <header class="cld-section-head" data-aos="fade-up">
        <span class="cld-badge cld-badge--navy"><i class="fas fa-award" aria-hidden="true"></i> Why Guudle</span>
        <h2 id="cld-why-us-heading" class="cld-title">Why Choose Our <span class="cld-accent">Hosting &amp; Cloud Solutions</span></h2>
      </header>
      <div class="cld-feature-grid cld-feature-grid--4">${WHY_US.map(([icon, title, desc], i) =>
        glowCard({ icon, title, desc, delay: i * 40 })
      ).join('')}</div>
    </div>
  </section>`;

  const faqSection = renderEnterpriseFaqSection({
    id: 'cld-faq',
    title: 'Frequently Asked Questions',
    subtitle: 'Answers about cloud platforms, migration, managed hosting, security, backups, and scaling.',
    faqs: FAQ,
    contactHref: '#svc-contact',
  });

  const relatedSection = `<section id="cld-related" class="cld-section cld-section--gray" aria-labelledby="cld-related-heading">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <header class="cld-section-head" data-aos="fade-up">
        <h2 id="cld-related-heading" class="cld-title">Related <span class="cld-accent">Services</span></h2>
      </header>
      <div class="cld-related-grid">${RELATED.map(([href, label], i) =>
        `<a href="${href}" class="cld-related-card" data-aos="fade-up" data-aos-delay="${i * 35}"><i class="fas fa-arrow-right" aria-hidden="true"></i><span>${esc(label)}</span></a>`
      ).join('')}</div>
    </div>
  </section>`;

  const ctaParallax = parallax({
    id: 'cld-cta',
    bg: IMG.cta,
    inner: `<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <header class="cld-section-head cld-section-head--light" data-aos="fade-up">
        <h2 id="cld-cta-heading" class="cld-title cld-title--light">Ready to Move Your Business to the <span class="cld-accent">Cloud?</span></h2>
        <p class="cld-lead cld-lead--light">Modernize your infrastructure, improve performance, strengthen security, and future-proof your business with expert Hosting &amp; Cloud Solutions from Guudle IT Solutions.</p>
        <div class="cld-cta-row">
          <a href="../contact.html" class="cld-btn cld-btn--primary">Start Your Cloud Project <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
          <a href="#svc-contact" class="cld-btn cld-btn--ghost">Book Free Consultation</a>
        </div>
      </header>
    </div>`,
  });

  const contactSection = `<section id="svc-contact" class="cpox-section cpox-section--gray cpox-contact">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div class="cpox-contact-grid">
        <div class="cpox-contact__copy" data-aos="fade-right">
          <span class="cpox-label"><span class="cpox-label__line" aria-hidden="true"></span><span class="cpox-label__text">Contact</span></span>
          <h2 class="cpox-title font-display">Start Your Cloud Project</h2>
          <p class="cpox-lead">Tell us about your hosting or cloud requirements — we'll respond within one business day with a tailored plan.</p>
        </div>
        <form class="cpox-contact-form slp-form" data-slp-form action="#" method="post" data-aos="fade-left">
          <div data-slp-field>
            <label for="svc-name">Full Name <span class="text-red-500">*</span></label>
            <input type="text" id="svc-name" name="name" class="slp-form-input" required placeholder="Your full name">
            <span class="slp-form-error" role="alert"></span>
          </div>
          <div data-slp-field>
            <label for="svc-email">Work Email <span class="text-red-500">*</span></label>
            <input type="email" id="svc-email" name="email" class="slp-form-input" required placeholder="you@company.com">
            <span class="slp-form-error" role="alert"></span>
          </div>
          <div data-slp-field>
            <label for="svc-message">Cloud Requirements <span class="text-red-500">*</span></label>
            <textarea id="svc-message" name="message" rows="4" class="slp-form-input resize-y" required placeholder="Describe your hosting, migration, or managed cloud needs..."></textarea>
            <span class="slp-form-error" role="alert"></span>
          </div>
          <button type="submit" class="cpox-cta__btn cpox-cta__btn--primary cpox-cta__btn--full">Submit Inquiry <i class="fas fa-paper-plane" aria-hidden="true"></i></button>
        </form>
      </div>
    </div>
  </section>`;

  return `
    ${hero}
    ${stickyNav}
    ${transform}
    ${whySection}
    ${servicesSection}
    ${hostingPlans}
    ${platforms}
    ${infraDashboard}
    ${processHubCta}
    ${devopsSection}
    ${backupSection}
    ${monitoringSection}
    ${industriesSection}
    ${whyUsSection}
    ${faqSection}
    ${relatedSection}
    ${ctaParallax}
    ${contactSection}
  `;
}

export function renderCloudHostingFaqsJsonLd() {
  return FAQ.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  }));
}

export const CLOUD_HOSTING_OG_IMAGE = IMG.hero;
