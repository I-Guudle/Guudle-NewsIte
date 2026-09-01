import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getSiteMetaBlock } from './site-meta.mjs';
import { csValueGrid } from './value-props.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const PORTFOLIO_DIR = path.join(ROOT, 'pages', 'portfolio');

const CATEGORIES = [
  {
    slug: 'ai-solutions',
    theme: 'ai',
    title: 'AI Solutions',
    heroTitle: 'AI Solutions That Transform Businesses',
    heroSub: 'From predictive models and computer vision to enterprise copilots — explore how we deliver measurable AI outcomes for global organizations.',
    badge: 'AI Innovation Lab',
    cta: 'Start Your AI Project',
    ctaSub: 'Partner with our AI Lab to turn your data into competitive advantage.',
    stats: [['85', '%', 'Process automation'], ['40', '%', 'Cost reduction'], ['3', 'x', 'Faster insights'], ['99.5', '%', 'Model uptime']],
    filters: ['all', 'ml', 'vision', 'nlp'],
    filterLabels: { all: 'All Projects', ml: 'Machine Learning', vision: 'Computer Vision', nlp: 'NLP & Chatbots' },
    subsections: [
      { title: 'Machine Learning & Predictive Analytics', items: ['Demand forecasting for retail chains', 'Credit risk scoring engine', 'Churn prediction & retention models'] },
      { title: 'Computer Vision Projects', items: ['Manufacturing defect detection', 'Document OCR & ID verification', 'Retail shelf analytics'] },
      { title: 'NLP & Conversational AI', items: ['Enterprise knowledge copilot', 'Multilingual support chatbot', 'Contract clause extraction'] },
    ],
    tech: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI', 'LangChain', 'AWS SageMaker', 'Azure ML', 'Kubernetes', 'MLflow'],
    cases: [
      {
        filter: 'nlp ml',
        tag: 'FinTech • Enterprise AI',
        title: 'AI-Powered Compliance Copilot',
        intro: 'A global bank needed to reduce manual review of regulatory documents while maintaining audit-grade accuracy.',
        challenge: 'Analysts spent 15+ hours weekly parsing policy updates across 12 jurisdictions with high error rates on cross-references.',
        solution: 'RAG-based copilot on Azure OpenAI with custom entity extraction, citation tracking, and human-in-the-loop approval workflows.',
        process: 'Discovery → Data pipeline → Model fine-tuning → UAT with compliance team → Production rollout',
        features: ['Document ingestion from SharePoint', 'Real-time regulatory alerts', 'Audit trail & explainability reports'],
        tech: ['Azure OpenAI', 'LangChain', 'Python', 'PostgreSQL'],
        metrics: [['70%', 'Review time saved'], ['98%', 'Citation accuracy'], ['6 wks', 'To production']],
        testimonial: { quote: 'Guudle delivered an AI system our compliance team actually trusts — accuracy and auditability were non-negotiable.', author: 'Chief Compliance Officer, Global Bank' },
        visual: 'ai',
        mockup: 'Compliance Dashboard · 847 docs indexed · Live inference',
      },
      {
        filter: 'vision',
        tag: 'Manufacturing • Computer Vision',
        title: 'Visual Quality Inspection System',
        intro: 'Automotive parts manufacturer replaced manual line inspection with real-time computer vision at production speed.',
        challenge: 'Human inspectors missed micro-defects at 30% rate during peak shifts, causing costly downstream rework.',
        solution: 'Edge-deployed YOLO models on NVIDIA Jetson with MES integration and operator alert dashboards.',
        process: 'Data capture → Labeling → Model training → Edge deployment → Continuous learning loop',
        features: ['Sub-100ms inference per unit', 'Defect heatmap overlays', 'Automated quality reports to ERP'],
        tech: ['PyTorch', 'YOLOv8', 'ONNX', 'NVIDIA Jetson', 'MQTT'],
        metrics: [['99.2%', 'Detection accuracy'], ['-65%', 'Rework costs'], ['30 FPS', 'Line speed']],
        testimonial: { quote: 'We catch defects at line speed that humans simply cannot see consistently. ROI paid back in four months.', author: 'VP Operations, AutoParts Co.' },
        visual: 'ai',
        mockup: 'Vision QC · 12 cameras · 0.08s avg latency',
      },
    ],
    related: ['mobile-apps', 'enterprise-platforms', 'saas-products'],
  },
  {
    slug: 'mobile-apps',
    theme: 'mobile',
    title: 'Mobile Apps',
    heroTitle: 'Building Mobile Experiences Users Love',
    heroSub: 'Native iOS, Android, and cross-platform apps engineered for performance, polish, and App Store success.',
    badge: 'Mobile Excellence',
    cta: 'Build Your Mobile App',
    ctaSub: 'From MVP to millions of downloads — we ship mobile products that users keep opening.',
    stats: [['50', '+', 'Apps delivered'], ['4.8', '★', 'Avg store rating'], ['2', 'M+', 'Total downloads'], ['99.9', '%', 'Crash-free sessions']],
    filters: ['all', 'ios', 'android', 'cross'],
    filterLabels: { all: 'All Apps', ios: 'iOS', android: 'Android', cross: 'Cross-Platform' },
    subsections: [
      { title: 'Featured iOS Applications', items: ['FinTech wallet with Apple Pay', 'Health & wellness tracker', 'B2B field sales companion'] },
      { title: 'Android Success Stories', items: ['On-demand delivery super-app', 'Enterprise logistics scanner', 'EdTech learning platform'] },
      { title: 'Cross-Platform Solutions', items: ['Flutter healthcare portal', 'React Native retail app', 'Single codebase, dual stores'] },
    ],
    tech: ['Swift', 'SwiftUI', 'Kotlin', 'Flutter', 'React Native', 'Firebase', 'GraphQL', 'Fastlane'],
    cases: [
      {
        filter: 'cross ios android',
        tag: 'Healthcare • Telemedicine',
        title: 'Global Telemedicine Platform',
        intro: 'Healthcare network launched HIPAA-compliant video consultations across 8 countries in 14 weeks.',
        challenge: 'Legacy phone triage could not scale during demand spikes; patients waited 45+ minutes for callbacks.',
        solution: 'Flutter app with WebRTC video, EHR integration, AI symptom triage, and secure payment flows.',
        process: 'UX research → MVP sprint → Store submission → Phased regional rollout',
        features: ['HD video consultations', 'E-prescriptions & lab orders', 'Offline appointment caching'],
        tech: ['Flutter', 'Firebase', 'WebRTC', 'HL7 FHIR', 'Stripe'],
        metrics: [['500K', 'Active users'], ['4.9★', 'App Store rating'], ['-60%', 'Wait times']],
        testimonial: { quote: 'Guudle shipped a telemedicine app our clinicians and patients love — on time, on budget, and store-ready.', author: 'Director of Digital Health' },
        visual: 'mobile',
        mockup: 'Video consult · EHR sync · Push reminders',
      },
      {
        filter: 'ios',
        tag: 'FinTech • iOS Native',
        title: 'Premium iOS Banking Experience',
        intro: 'Digital bank needed a native SwiftUI app matching their premium brand with sub-second transaction views.',
        challenge: 'Hybrid web wrapper felt sluggish; App Store reviews cited poor animations and biometric login failures.',
        solution: 'Native SwiftUI rebuild with Core Data, Face ID, Apple Pay, and widget extensions for balance glance.',
        process: 'Design system → Native rebuild → Security audit → App Store launch',
        features: ['Instant balance widgets', 'Apple Pay & wire transfers', 'Spending insights & budgets'],
        tech: ['Swift', 'SwiftUI', 'Core Data', 'Combine', 'Keychain'],
        metrics: [['4.8★', 'App Store'], ['+120%', 'Daily active users'], ['<1s', 'Cold start']],
        testimonial: { quote: 'The native rebuild transformed our App Store presence. Users notice the difference immediately.', author: 'CPO, NeoBank' },
        visual: 'mobile',
        mockup: 'SwiftUI · Widgets · Face ID',
      },
    ],
    related: ['ai-solutions', 'saas-products', 'enterprise-platforms'],
  },
  {
    slug: 'enterprise-platforms',
    theme: 'enterprise',
    title: 'Enterprise Platforms',
    heroTitle: 'Enterprise Platforms Built for Scale',
    heroSub: 'ERP, CRM, HRMS, and workflow platforms that unify operations, eliminate silos, and deliver executive visibility.',
    badge: 'Enterprise Command Center',
    cta: 'Transform Your Enterprise',
    ctaSub: 'Modernize legacy systems and deploy platforms your teams will actually adopt.',
    stats: [['35', '%', 'Ops cost reduction'], ['99.99', '%', 'Platform uptime'], ['500', '+', 'Enterprise users'], ['12', 'mo', 'Avg payback']],
    filters: ['all', 'erp', 'crm', 'cloud'],
    filterLabels: { all: 'All Platforms', erp: 'ERP', crm: 'CRM', cloud: 'Cloud Migration' },
    subsections: [
      { title: 'ERP Case Studies', items: ['SAP S/4HANA manufacturing rollout', 'NetSuite multi-entity finance', 'Dynamics 365 supply chain'] },
      { title: 'CRM Implementations', items: ['Salesforce Sales Cloud + CPQ', 'HubSpot marketing automation', 'Custom B2B portal CRM'] },
      { title: 'Cloud Migration Success', items: ['Mainframe to AWS migration', 'Hybrid Azure integration', 'Zero-downtime cutover'] },
    ],
    tech: ['SAP', 'Salesforce', 'Dynamics 365', 'AWS', 'Azure', '.NET', 'Java', 'Kubernetes', 'Power BI'],
    cases: [
      {
        filter: 'erp cloud',
        tag: 'Manufacturing • ERP',
        title: 'Global ERP Transformation',
        intro: 'Multinational manufacturer unified 14 legacy systems onto SAP S/4HANA across 6 regions.',
        challenge: 'Fragmented ERP instances caused inventory discrepancies, 18-day month-end close, and no single source of truth.',
        solution: 'Phased SAP implementation with data migration factory, change management, and hypercare support.',
        process: 'Fit-gap → Blueprint → Wave 1 pilot → Global rollout → Optimization',
        features: ['Unified finance & supply chain', 'Real-time inventory visibility', 'Executive KPI dashboards'],
        tech: ['SAP S/4HANA', 'Azure', 'Power BI', 'MuleSoft'],
        metrics: [['-40%', 'Inventory carrying cost'], ['5 days', 'Month-end close'], ['$12M', 'Annual savings']],
        testimonial: { quote: 'Guudle managed the complexity of a global ERP program without disrupting production — a rare achievement.', author: 'CIO, Global Manufacturing Inc.' },
        visual: 'enterprise',
        mockup: 'SAP Dashboard · 14 entities · Real-time KPIs',
      },
      {
        filter: 'crm',
        tag: 'B2B SaaS • CRM',
        title: 'Salesforce Revenue Operations Platform',
        intro: 'High-growth B2B company scaled sales from $20M to $80M ARR with unified Salesforce architecture.',
        challenge: 'Spreadsheet pipelines, duplicate records, and no visibility into forecast accuracy stalled growth.',
        solution: 'Sales Cloud + CPQ + Marketing Cloud with custom integrations to product usage data.',
        process: 'Process mapping → Salesforce config → Integration → Sales enablement → Go-live',
        features: ['Automated lead routing', 'CPQ with approval workflows', 'RevOps analytics dashboards'],
        tech: ['Salesforce', 'Apex', 'MuleSoft', 'Tableau'],
        metrics: [['2.5x', 'Pipeline velocity'], ['+35%', 'Win rate'], ['100%', 'Forecast accuracy']],
        testimonial: { quote: 'Our sales team finally lives in one system. Forecast calls went from guesswork to confidence.', author: 'VP Revenue Operations' },
        visual: 'enterprise',
        mockup: 'Salesforce · CPQ · Pipeline analytics',
      },
    ],
    related: ['saas-products', 'ai-solutions', 'blockchain-projects'],
  },
  {
    slug: 'saas-products',
    theme: 'saas',
    title: 'SaaS Products',
    heroTitle: 'Scalable SaaS Products for Modern Businesses',
    heroSub: 'Multi-tenant platforms, subscription billing, and product-led growth engines — built to scale from MVP to Series B.',
    badge: 'SaaS Product Studio',
    cta: 'Launch Your SaaS Product',
    ctaSub: 'Ship a subscription product with the architecture to grow — not a prototype that breaks at 1,000 users.',
    stats: [['30', '+', 'SaaS products'], ['$10M', '+', 'ARR enabled'], ['8', 'wks', 'Avg MVP time'], ['99.95', '%', 'Uptime SLA']],
    filters: ['all', 'b2b', 'b2c', 'analytics'],
    filterLabels: { all: 'All Products', b2b: 'B2B SaaS', b2c: 'B2C SaaS', analytics: 'Analytics' },
    subsections: [
      { title: 'Featured SaaS Platforms', items: ['Project management for agencies', 'HR analytics for mid-market', 'Developer API platform'] },
      { title: 'Subscription & Multi-Tenant', items: ['Stripe billing integration', 'Tenant isolation & RBAC', 'Usage-based pricing engines'] },
      { title: 'Growth & Analytics', items: ['Product analytics dashboards', 'Onboarding funnel optimization', 'Churn prediction alerts'] },
    ],
    tech: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS', 'Redis', 'Terraform', 'Segment'],
    cases: [
      {
        filter: 'b2b analytics',
        tag: 'B2B SaaS • Analytics',
        title: 'Multi-Tenant Analytics Platform',
        intro: 'Startup launched embedded analytics SaaS serving 200+ B2B customers in year one.',
        challenge: 'Founders needed MVP in 10 weeks with multi-tenancy, white-label dashboards, and usage billing.',
        solution: 'Next.js + Node.js platform with row-level security, Stripe metered billing, and embeddable widgets.',
        process: 'Product discovery → MVP sprint → Beta with design partners → GA launch',
        features: ['White-label dashboards', 'SQL + no-code report builder', 'Customer usage analytics'],
        tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
        metrics: [['200', 'Paying customers'], ['$4M', 'ARR year 1'], ['8 wks', 'MVP delivered']],
        testimonial: { quote: 'Guudle built the foundation we scaled on — multi-tenant, billable, and investor-ready from day one.', author: 'CEO, DataPulse SaaS' },
        visual: 'saas',
        mockup: 'Dashboard builder · 200 tenants · Stripe billing',
      },
      {
        filter: 'b2c',
        tag: 'Consumer • Subscription',
        title: 'Fitness Subscription App',
        intro: 'Consumer wellness brand launched iOS/Android app with personalized plans and in-app subscriptions.',
        challenge: 'Needed cross-platform app with video streaming, progress tracking, and App Store subscriptions at scale.',
        solution: 'React Native app with Firebase backend, RevenueCat subscriptions, and ML-powered workout recommendations.',
        process: 'Brand UX → Core flows → Subscription integration → Growth experiments',
        features: ['Personalized workout plans', 'Offline video downloads', 'Social challenges & streaks'],
        tech: ['React Native', 'Firebase', 'RevenueCat', 'Mux', 'Python ML'],
        metrics: [['150K', 'Subscribers'], ['4.7★', 'Store rating'], ['-28%', 'Churn with ML']],
        testimonial: { quote: 'They understood product-led growth, not just code. Our retention metrics prove it.', author: 'Founder, FitFlow' },
        visual: 'saas',
        mockup: 'Subscriptions · Video · Streaks',
      },
    ],
    related: ['mobile-apps', 'enterprise-platforms', 'ai-solutions'],
  },
  {
    slug: 'blockchain-projects',
    theme: 'blockchain',
    title: 'Blockchain Projects',
    heroTitle: 'Blockchain Solutions for the Future',
    heroSub: 'Smart contracts, DeFi protocols, NFT marketplaces, and Web3 applications — engineered with security and compliance at the core.',
    badge: 'Web3 Engineering',
    cta: 'Build Your Blockchain Solution',
    ctaSub: 'From smart contract audit to mainnet launch — we de-risk Web3 delivery.',
    stats: [['25', '+', 'Web3 projects'], ['$50M', '+', 'TVL secured'], ['0', '', 'Critical exploits post-audit'], ['3', 'chains', 'Ethereum, Polygon, Solana']],
    filters: ['all', 'defi', 'nft', 'web3'],
    filterLabels: { all: 'All Projects', defi: 'DeFi', nft: 'NFT', web3: 'Web3 Apps' },
    subsections: [
      { title: 'Smart Contract Projects', items: ['DeFi lending protocol', 'Token vesting & staking', 'Multi-sig treasury management'] },
      { title: 'DeFi Platforms', items: ['DEX with liquidity pools', 'Yield aggregator dashboard', 'Cross-chain bridge UI'] },
      { title: 'NFT & Web3 Applications', items: ['Creator NFT marketplace', 'Web3 wallet integration', 'Token-gated community portal'] },
    ],
    tech: ['Solidity', 'Rust', 'Ethereum', 'Polygon', 'Solana', 'Hardhat', 'IPFS', 'Web3.js', 'Chainlink'],
    cases: [
      {
        filter: 'defi',
        tag: 'DeFi • Smart Contracts',
        title: 'Decentralized Lending Protocol',
        intro: 'DeFi startup launched audited lending protocol with $18M TVL within 90 days of mainnet.',
        challenge: 'Needed secure smart contracts, oracle integration, and admin dashboard before investor deadline.',
        solution: 'Solidity contracts with Chainlink oracles, formal verification, and React Web3 frontend.',
        process: 'Architecture → Smart contract dev → Audit → Testnet → Mainnet launch',
        features: ['Over-collateralized lending', 'Dynamic interest rates', 'Liquidation bot integration'],
        tech: ['Solidity', 'Hardhat', 'Chainlink', 'React', 'The Graph'],
        metrics: [['$18M', 'TVL at launch'], ['2 audits', 'Zero critical findings'], ['90 days', 'Concept to mainnet']],
        testimonial: { quote: 'Security was our investors\' top concern. Guudle delivered audited contracts and a polished dApp on schedule.', author: 'Founder, LendChain Protocol' },
        visual: 'blockchain',
        mockup: 'Lending pools · Chainlink oracles · 2 audits',
      },
      {
        filter: 'nft web3',
        tag: 'Creator Economy • NFT',
        title: 'NFT Marketplace for Digital Creators',
        intro: 'Creator platform enabling artists to mint, sell, and royalty-track NFT collections with fiat on-ramp.',
        challenge: 'Creators needed simple UX hiding Web3 complexity while ensuring royalty enforcement on secondary sales.',
        solution: 'Polygon-based marketplace with lazy minting, embedded wallet, and Stripe fiat checkout.',
        process: 'UX for non-crypto users → Smart contracts → Marketplace UI → Creator onboarding',
        features: ['Lazy minting & gas abstraction', '5% enforced royalties', 'Creator analytics dashboard'],
        tech: ['Solidity', 'Polygon', 'IPFS', 'Next.js', 'WalletConnect'],
        metrics: [['12K', 'NFTs minted'], ['$2.4M', 'Volume traded'], ['800', 'Active creators']],
        testimonial: { quote: 'They made Web3 feel invisible to our creators while keeping decentralization intact.', author: 'CEO, ArtMint Studio' },
        visual: 'blockchain',
        mockup: 'Marketplace · Lazy mint · Royalties',
      },
    ],
    related: ['saas-products', 'enterprise-platforms', 'ai-solutions'],
  },
];

const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map((c) => [c.slug, c]));

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function siteMetaForDepth(depth) {
  if (depth >= 2) {
    return getSiteMetaBlock({ homeHref: '../../index.html', aboutHref: '../about.html' });
  }
  return getSiteMetaBlock({ homeHref: '../index.html', aboutHref: 'about.html' });
}

function head(title, desc, depth) {
  const prefix = '../'.repeat(depth);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
${siteMetaForDepth(depth)}
  <meta name="description" content="${esc(desc)}">
  <title>${esc(title)} | Guudle IT Solutions</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  <script src="https://cdn.tailwindcss.com"><\/script>
  <script>tailwind.config={theme:{extend:{colors:{navy:'#0B1F3A',cyan:'#10A5F5','royal-blue':'#2563EB'}}}}<\/script>
  <link rel="stylesheet" href="${prefix}assets/css/styles.css">
  <link rel="stylesheet" href="${prefix}assets/css/case-studies.css">
</head>`;
}

function scripts(depth) {
  const prefix = '../'.repeat(depth);
  return `<div id="footer-placeholder"></div>
  <div id="chatbot-placeholder"></div>
  <script src="${prefix}assets/js/mega-menu-data.js"><\/script>
  <script src="${prefix}assets/js/mega-menu-render.js"><\/script>
  <script src="${prefix}assets/js/components.js"><\/script>
  <script src="${prefix}assets/js/main.js"><\/script>
  <script src="${prefix}assets/js/case-studies.js"><\/script>`;
}

function buildCaseStudy(c, i) {
  const metrics = c.metrics.map(([, l]) =>
    `<li><i class="fas fa-check" aria-hidden="true"></i>${esc(l)}</li>`
  ).join('');
  const tech = c.tech.map((t) => `<span class="cs-tech-chip">${esc(t)}</span>`).join('');
  return `<article class="cs-case cs-reveal cs-d${(i % 3) + 1}" data-cs-filter="${esc(c.filter)}">
  <div class="cs-case-layout">
    <div class="cs-case-visual cs-case-visual--${c.visual}">
      <div class="cs-case-visual-inner">
        <p class="text-xs uppercase tracking-wider opacity-70 mb-2">Project Preview</p>
        <p class="font-semibold text-white text-sm">${esc(c.mockup)}</p>
        <div class="mt-4 space-y-2">${c.features.map((f) => `<div class="text-xs text-white/80 flex items-center gap-2"><i class="fas fa-circle-check text-cyan-400"></i>${esc(f)}</div>`).join('')}</div>
      </div>
    </div>
    <div class="cs-case-body">
      <span class="cs-case-tag">${esc(c.tag)}</span>
      <h3 class="cs-case-title">${esc(c.title)}</h3>
      <p class="cs-case-intro">${esc(c.intro)}</p>
      <div class="cs-case-details">
        <div class="cs-case-block"><h4>Client Challenge</h4><p>${esc(c.challenge)}</p></div>
        <div class="cs-case-block"><h4>Proposed Solution</h4><p>${esc(c.solution)}</p></div>
        <div class="cs-case-block"><h4>Development Process</h4><p>${esc(c.process)}</p></div>
        <div class="cs-case-block"><h4>Technologies Used</h4><div class="cs-tech-row">${tech}</div></div>
      </div>
      <ul class="cs-case-outcomes">${metrics}</ul>
      <blockquote class="cs-testimonial">"${esc(c.testimonial.quote)}"<cite>— ${esc(c.testimonial.author)}</cite></blockquote>
    </div>
  </div>
</article>`;
}

function heroVisual(cat) {
  if (cat.theme === 'ai') {
    return `<div class="cs-neural-bg" aria-hidden="true"></div>
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <nav class="cs-bc mb-6 cs-reveal" aria-label="Breadcrumb"><a href="../case-studies.html">Case Studies</a><span class="mx-2">/</span><span style="color:#A5B4FC">${esc(cat.title)}</span></nav>
        <span class="cs-badge cs-reveal">${esc(cat.badge)}</span>
        <h1 class="cs-hero-title cs-reveal cs-d1">${esc(cat.heroTitle)}</h1>
        <p class="cs-hero-sub cs-reveal cs-d2">${esc(cat.heroSub)}</p>
        <div class="flex flex-wrap gap-3 cs-reveal cs-d3">
          <a href="../contact.html" class="cs-hero-cta">Get Started <i class="fas fa-arrow-right"></i></a>
          <a href="#projects" class="cs-hero-cta cs-hero-cta--outline">View Projects</a>
        </div>
      </div>
      <div class="cs-ai-dashboard cs-reveal cs-d2">
        <p class="text-sm font-semibold text-white mb-3"><i class="fas fa-brain text-indigo-300 mr-2"></i>AI Inference Monitor</p>
        ${['Model accuracy', 'Latency p95', 'Drift score'].map((l, i) => `<div class="mb-3"><div class="flex justify-between text-xs text-white/60"><span>${l}</span><span>${[98, 120, 2][i]}${i === 1 ? 'ms' : i === 2 ? '%' : '%'}</span></div><div class="cs-ai-bar"><div class="cs-ai-bar-fill" style="width:${[92, 75, 88][i]}%"></div></div></div>`).join('')}
      </div>
    </div>`;
  }
  if (cat.theme === 'mobile') {
    return `<div class="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <nav class="cs-bc mb-6 cs-reveal" aria-label="Breadcrumb"><a href="../case-studies.html">Case Studies</a><span class="mx-2">/</span><span style="color:#10A5F5">${esc(cat.title)}</span></nav>
        <span class="cs-badge cs-reveal">${esc(cat.badge)}</span>
        <h1 class="cs-hero-title cs-reveal cs-d1">${esc(cat.heroTitle)}</h1>
        <p class="cs-hero-sub cs-reveal cs-d2">${esc(cat.heroSub)}</p>
        <div class="flex flex-wrap gap-3 cs-reveal cs-d3">
          <a href="../contact.html" class="cs-hero-cta">${esc(cat.cta)} <i class="fas fa-arrow-right"></i></a>
        </div>
      </div>
      <div class="cs-devices-wrap cs-reveal cs-d2" aria-hidden="true">
        <div class="cs-float-device"><div class="cs-device-screen"><div class="h-2 w-10 bg-slate-200 rounded mx-auto mb-2"></div><div class="space-y-2"><div class="h-8 bg-teal-100 rounded-lg"></div><div class="h-8 bg-teal-50 rounded-lg"></div><div class="h-8 bg-teal-100 rounded-lg"></div></div></div></div>
        <div class="cs-float-device"><div class="cs-device-screen" style="width:160px;height:320px"><div class="h-2 w-12 bg-slate-200 rounded mx-auto mb-2"></div><div class="h-24 bg-gradient-to-b from-teal-400 to-cyan-500 rounded-lg mb-2"></div><div class="grid grid-cols-2 gap-1"><div class="h-10 bg-slate-100 rounded"></div><div class="h-10 bg-slate-100 rounded"></div></div></div></div>
        <div class="cs-float-device hidden sm:block"><div class="cs-device-screen cs-device-screen--lg"><div class="grid grid-cols-3 gap-1 h-full"><div class="bg-teal-100 rounded"></div><div class="bg-teal-200 rounded"></div><div class="bg-teal-100 rounded"></div></div></div></div>
      </div>
    </div>`;
  }
  if (cat.theme === 'enterprise') {
    return `<div class="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <nav class="cs-bc mb-6 cs-reveal text-white/60" aria-label="Breadcrumb"><a href="../case-studies.html" class="hover:text-white">Case Studies</a><span class="mx-2">/</span><span class="text-blue-300">${esc(cat.title)}</span></nav>
        <span class="cs-badge cs-reveal">${esc(cat.badge)}</span>
        <h1 class="cs-hero-title cs-reveal cs-d1">${esc(cat.heroTitle)}</h1>
        <p class="cs-hero-sub cs-reveal cs-d2">${esc(cat.heroSub)}</p>
        <a href="../contact.html" class="cs-hero-cta cs-reveal cs-d3">${esc(cat.cta)} <i class="fas fa-arrow-right"></i></a>
      </div>
      <div class="cs-dash-grid cs-reveal cs-d2" aria-hidden="true">
        ${[['Live', 'Platform health'], ['Active', 'User activity'], ['Tracked', 'Revenue'], ['Low', 'API latency']].map(([v, l]) =>
          `<div class="cs-dash-panel"><strong>${v}</strong><span class="text-xs text-white/50">${l}</span></div>`
        ).join('')}
      </div>
    </div>`;
  }
  if (cat.theme === 'saas') {
    return `<div class="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <nav class="cs-bc mb-6 cs-reveal" aria-label="Breadcrumb"><a href="../case-studies.html">Case Studies</a><span class="mx-2">/</span><span style="color:#7C3AED">${esc(cat.title)}</span></nav>
        <span class="cs-badge cs-reveal">${esc(cat.badge)}</span>
        <h1 class="cs-hero-title cs-reveal cs-d1">${esc(cat.heroTitle)}</h1>
        <p class="cs-hero-sub cs-reveal cs-d2">${esc(cat.heroSub)}</p>
        <a href="../contact.html" class="cs-hero-cta cs-reveal cs-d3">${esc(cat.cta)} <i class="fas fa-arrow-right"></i></a>
      </div>
      <div class="cs-reveal cs-d2">
        <p class="text-sm font-semibold text-slate-600 mb-2">MRR Growth</p>
        <div class="cs-growth-chart" aria-hidden="true">${[35, 50, 45, 70, 85, 95, 100].map((h) => `<div class="cs-growth-bar" style="height:${h}%"></div>`).join('')}</div>
        <p class="text-xs text-slate-500 mt-2">+340% YoY · 200 paying customers</p>
      </div>
    </div>`;
  }
  /* blockchain */
  return `<div class="text-center max-w-3xl mx-auto">
    <nav class="cs-bc mb-6 cs-reveal text-white/60 justify-center" aria-label="Breadcrumb"><a href="../case-studies.html" class="hover:text-white">Case Studies</a><span class="mx-2">/</span><span class="text-amber-300">${esc(cat.title)}</span></nav>
    <span class="cs-badge cs-reveal">${esc(cat.badge)}</span>
    <h1 class="cs-hero-title cs-reveal cs-d1">${esc(cat.heroTitle)}</h1>
    <p class="cs-hero-sub cs-reveal cs-d2 mx-auto">${esc(cat.heroSub)}</p>
    <a href="../contact.html" class="cs-hero-cta cs-reveal cs-d3">${esc(cat.cta)} <i class="fas fa-arrow-right"></i></a>
    <div class="cs-chain cs-reveal cs-d3" aria-hidden="true">
      ${['Block 1', 'Block 2', 'Block 3', 'Block 4'].map((b) => `<div class="cs-chain-block">${b}</div><i class="fas fa-link text-amber-500/50 hidden sm:inline"></i>`).join('').replace(/<i class="fas fa-link[^<]+<\/i>$/, '')}
    </div>
  </div>`;
}

function buildCategoryPage(cat) {
  const filterBtns = cat.filters.map((f, i) =>
    `<button type="button" class="cs-filter-btn${i === 0 ? ' active' : ''}" data-filter="${f}">${esc(cat.filterLabels[f])}</button>`
  ).join('');

  const cases = cat.cases.map((c, i) => buildCaseStudy(c, i)).join('\n');

  const subs = cat.subsections.map((s, si) =>
    `<div class="cs-reveal cs-d${(si % 3) + 1}"><h3 class="text-lg font-bold mb-4">${esc(s.title)}</h3><ul class="space-y-2">${s.items.map((it) => `<li class="flex items-start gap-2 text-sm text-slate-600"><i class="fas fa-check mt-1" style="color:var(--cs-accent)"></i>${esc(it)}</li>`).join('')}</ul></div>`
  ).join('');

  const valueGrid = csValueGrid();

  const tech = cat.tech.map((t) => `<span class="cs-tech-chip">${esc(t)}</span>`).join('');

  const related = cat.related.map((slug) => {
    const r = CATEGORY_MAP[slug];
    return `<a href="${slug}.html" class="cs-reveal"><span>${esc(r.title)}</span><strong>Explore ${esc(r.title)} portfolio →</strong></a>`;
  }).join('');

  return `${head(cat.title + ' Case Studies', cat.heroSub, 2)}
<body class="cs-page cs-page--${cat.theme}" data-portfolio="${cat.slug}">
  <a href="#main" class="skip-link">Skip to main content</a>
  <div id="header-placeholder"></div>
  <main id="main">

    <section class="cs-hero">
      <div class="cs-hero-inner">${heroVisual(cat)}</div>
    </section>

    <section class="cs-section cs-section--gray">
      <div class="max-w-7xl mx-auto px-4">
        ${valueGrid}
      </div>
    </section>

    <section class="cs-section" id="projects">
      <div class="max-w-7xl mx-auto px-4">
        <div class="cs-section-head cs-reveal">
          <h2>Featured Projects</h2>
          <p>In-depth case studies with challenges, solutions, and measurable business results.</p>
        </div>
        <div class="cs-filter cs-reveal" role="tablist" aria-label="Filter projects">${filterBtns}</div>
        ${cases}
      </div>
    </section>

    <section class="cs-section cs-section--gray">
      <div class="max-w-7xl mx-auto px-4">
        <div class="cs-section-head cs-reveal"><h2>Expertise Areas</h2><p>Depth across the ${esc(cat.title)} domain.</p></div>
        <div class="cs-grid-3">${subs}</div>
      </div>
    </section>

    <section class="cs-section">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <div class="cs-section-head cs-reveal"><h2>Technology Stack</h2><p>Tools and platforms powering our ${esc(cat.title.toLowerCase())} delivery.</p></div>
        <div class="flex flex-wrap justify-center gap-2 cs-reveal cs-d1">${tech}</div>
      </div>
    </section>

    <section class="cs-section cs-section--gray">
      <div class="max-w-7xl mx-auto px-4">
        <div class="cs-section-head cs-reveal"><h2>Explore More Portfolio</h2><p>Related case study categories.</p></div>
        <div class="cs-related">${related}</div>
      </div>
    </section>

    <section class="cs-cta">
      <div class="max-w-4xl mx-auto px-4 cs-reveal">
        <h2>${esc(cat.cta)}</h2>
        <p>${esc(cat.ctaSub)}</p>
        <div class="cs-cta-btns">
          <a href="../contact.html" class="cs-cta-btn cs-cta-btn--primary">Contact Us</a>
          <a href="../contact.html" class="cs-cta-btn cs-cta-btn--ghost">Request Demo</a>
        </div>
      </div>
    </section>
  </main>
  ${scripts(2)}
</body>
</html>`;
}

function buildHub() {
  const cards = CATEGORIES.map((cat) => {
    const icons = { ai: 'fa-brain', mobile: 'fa-mobile-screen', enterprise: 'fa-building', saas: 'fa-cloud', blockchain: 'fa-link' };
    const gradients = { ai: 'linear-gradient(135deg,#6366F1,#2563EB)', mobile: 'linear-gradient(135deg,#10A5F5,#10A5F5)', enterprise: 'linear-gradient(135deg,#2563EB,#123D6A)', saas: 'linear-gradient(135deg,#7C3AED,#A78BFA)', blockchain: 'linear-gradient(135deg,#F59E0B,#D97706)' };
    return `<a href="portfolio/${cat.slug}.html" class="cs-hub-card cs-reveal">
      <div class="cs-hub-card-icon" style="background:${gradients[cat.theme]}"><i class="fas ${icons[cat.theme]}"></i></div>
      <h3>${esc(cat.title)}</h3>
      <p>${esc(cat.heroSub.slice(0, 120))}…</p>
      <span class="cs-hub-card-link" style="color:${cat.theme === 'enterprise' ? '#2563EB' : cat.theme === 'ai' ? '#6366F1' : cat.theme === 'mobile' ? '#10A5F5' : cat.theme === 'saas' ? '#7C3AED' : '#F59E0B'}">View case studies <i class="fas fa-arrow-right"></i></span>
    </a>`;
  }).join('');

  return `${head('Case Studies & Portfolio', 'Explore Guudle IT Solutions case studies across AI, mobile, enterprise, SaaS, and blockchain — real projects, measurable outcomes.', 0)}
<body class="cs-page cs-page--hub">
  <a href="#main" class="skip-link">Skip to main content</a>
  <div id="header-placeholder"></div>
  <main id="main">

    <section class="cs-hero">
      <div class="cs-hero-inner">
        <nav class="cs-bc mb-6 cs-reveal text-white/60" aria-label="Breadcrumb"><a href="../index.html" class="hover:text-white">Home</a><span class="mx-2">/</span><span class="text-teal-300">Case Studies</span></nav>
        <span class="cs-badge cs-reveal"><i class="fas fa-trophy"></i> Proven Delivery</span>
        <h1 class="cs-hero-title cs-reveal cs-d1">Case Studies &amp; Portfolio</h1>
        <p class="cs-hero-sub cs-reveal cs-d2">Real-world projects. Measurable outcomes. Explore how we help organizations innovate across AI, mobile, enterprise platforms, SaaS, and blockchain.</p>
        <div class="flex flex-wrap justify-center gap-3 cs-reveal cs-d3">
          <a href="contact.html" class="cs-hero-cta">Start Your Project <i class="fas fa-arrow-right"></i></a>
          <a href="#categories" class="cs-hero-cta cs-hero-cta--outline">Browse Categories</a>
        </div>
      </div>
    </section>

    <section class="cs-section cs-section--gray">
      <div class="max-w-7xl mx-auto px-4">
        ${csValueGrid()}
      </div>
    </section>

    <section class="cs-section" id="categories">
      <div class="max-w-7xl mx-auto px-4">
        <div class="cs-section-head cs-reveal">
          <h2>Portfolio Categories</h2>
          <p>Each category showcases dedicated case studies with unique design and deep project narratives.</p>
        </div>
        <div class="cs-hub-grid">${cards}</div>
      </div>
    </section>

    <section class="cs-section cs-section--gray">
      <div class="max-w-7xl mx-auto px-4">
        <div class="cs-section-head cs-reveal"><h2>Why Clients Choose Guudle</h2></div>
        <div class="cs-grid-4">
          <div class="cs-card cs-reveal"><div class="cs-card-icon" style="background:linear-gradient(135deg,#2563EB,#10A5F5)"><i class="fas fa-rocket"></i></div><h3>End-to-End Delivery</h3><p>Strategy through launch and beyond — one accountable partner.</p></div>
          <div class="cs-card cs-reveal cs-d1"><div class="cs-card-icon" style="background:linear-gradient(135deg,#10A5F5,#22C55E)"><i class="fas fa-chart-line"></i></div><h3>Measurable ROI</h3><p>KPIs defined upfront and reported at every milestone.</p></div>
          <div class="cs-card cs-reveal cs-d2"><div class="cs-card-icon" style="background:linear-gradient(135deg,#7C3AED,#2563EB)"><i class="fas fa-shield-halved"></i></div><h3>Enterprise Grade</h3><p>Security, scalability, and compliance built in from day one.</p></div>
          <div class="cs-card cs-reveal cs-d3"><div class="cs-card-icon" style="background:linear-gradient(135deg,#F59E0B,#EA580C)"><i class="fas fa-users"></i></div><h3>Expert Teams</h3><p>Senior engineers and designers on every engagement.</p></div>
        </div>
      </div>
    </section>

    <section class="cs-cta">
      <div class="max-w-4xl mx-auto px-4 cs-reveal">
        <h2>Ready to Write Your Success Story?</h2>
        <p>Partner with Guudle to achieve measurable business results on your next digital initiative.</p>
        <div class="cs-cta-btns">
          <a href="contact.html" class="cs-cta-btn cs-cta-btn--primary" style="background:#10A5F5">Contact Us</a>
          <a href="contact.html" class="cs-cta-btn cs-cta-btn--ghost">Request Demo</a>
        </div>
      </div>
    </section>
  </main>
  ${scripts(0)}
</body>
</html>`;
}

fs.mkdirSync(PORTFOLIO_DIR, { recursive: true });
fs.writeFileSync(path.join(ROOT, 'pages', 'case-studies.html'), buildHub(), 'utf8');
console.log('✓ case-studies.html (hub)');

for (const cat of CATEGORIES) {
  fs.writeFileSync(path.join(PORTFOLIO_DIR, `${cat.slug}.html`), buildCategoryPage(cat), 'utf8');
  console.log(`✓ portfolio/${cat.slug}.html`);
}
console.log(`\nGenerated hub + ${CATEGORIES.length} portfolio category pages.`);
