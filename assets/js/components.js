/**
 * Guudle IT Solutions — Shared Components (Header / Nav single source of truth)
 *
 * FRONT PAGE HEADER SPEC (all pages must match):
 *   - #site-header.site-nav.site-nav--split.site-nav--enterprise.site-nav--premium
 *   - Row 1: logo | support/phone | Start Your Project CTA | mobile menu
 *   - Row 2: mega nav (center) | search (right) at xl+
 *   - Mega menus unchanged — rendered via mega-menu-render.js
 *
 * Every page must include scripts in order:
 *   1. mega-menu-webdev-data.js
 *   2. mega-menu-data.js
 *   3. mega-menu-render.js
 *   4. components.js  (injects header via #header-placeholder)
 *   5. main.js        (sticky, search, mobile menu, active states)
 *
 * Audit: node tools/audit-header.mjs
 */

const SITE = {
  name: 'Guudle IT Solutions',
  tagline: 'Premium Global Technology Partner',
  email: 'info@guudle.com',
  phone: '07908 727559',
  phoneTel: '+447908727559',
  logo: 'logo/GUUDLE-LOGO22-1.png',
};

function renderLogo(base, { className = 'site-logo h-10 sm:h-11 w-auto object-contain', light = false } = {}) {
  const src = `${base}${SITE.logo}`;
  const cls = light ? `${className} site-logo--light` : className;
  return `<img src="${src}" alt="${SITE.name}" class="${cls}" width="168" height="48" loading="eager">`;
}

const NAV = {
  services: {
    label: 'Development',
    icon: '💻',
    items: [
      { name: 'Website Development', href: 'pages/services/website-development.html', desc: 'Custom responsive websites' },
      { name: 'Business Website', href: 'pages/services/business-website.html', desc: 'Corporate & startup sites' },
      { name: 'Web Application', href: 'pages/services/web-application.html', desc: 'SaaS & enterprise portals' },
      { name: 'Mobile App', href: 'pages/services/mobile-app.html', desc: 'Cross-platform mobile apps' },
      { name: 'iOS App Development', href: 'pages/services/ios-app.html', desc: 'Native Swift iPhone apps' },
      { name: 'Android App Development', href: 'pages/services/android-app.html', desc: 'Kotlin & Java solutions' },
      { name: 'Flutter App Development', href: 'pages/services/flutter-app.html', desc: 'Fast cross-platform apps' },
      { name: 'E-commerce', href: 'pages/services/ecommerce.html', desc: 'Online stores & marketplaces' },
      { name: 'Shopify', href: 'pages/services/shopify.html', desc: 'Shopify stores & themes' },
      { name: 'Magento', href: 'pages/services/magento.html', desc: 'Enterprise Magento dev' },
      { name: 'WooCommerce', href: 'pages/services/woocommerce.html', desc: 'WordPress commerce' },
      { name: 'CMS', href: 'pages/services/cms.html', desc: 'Custom & headless CMS' },
      { name: 'WordPress', href: 'pages/services/wordpress.html', desc: 'Custom WordPress sites' },
      { name: 'Wix', href: 'pages/services/wix.html', desc: 'Modern Wix websites' },
    ],
  },
  solutions: {
    label: 'SaaS Applications',
    icon: '🏛️',
    items: [
      { name: 'Enterprise Software Development', href: 'pages/services/enterprise-solutions.html', desc: 'Custom enterprise platforms' },
      { name: 'ERP Development', href: 'pages/services/erp.html', desc: 'Resource management' },
      { name: 'CRM Development', href: 'pages/services/crm.html', desc: 'Sales automation' },
      { name: 'HRMS Development', href: 'pages/services/hrms.html', desc: 'Workforce management' },
      { name: 'Legacy Modernization', href: 'pages/services/legacy-modernization.html', desc: 'Replatform & refactor' },
      { name: 'Cloud Engineering', href: 'pages/services/cloud-engineering.html', desc: 'Cloud-native systems' },
      { name: 'Digital Transformation', href: 'pages/services/digital-transformation.html', desc: 'Modernize at scale' },
      { name: 'IT Consulting', href: 'pages/services/it-consulting.html', desc: 'Technology advisory' },
      { name: 'Workflow Automation', href: 'pages/services/workflow-automation.html', desc: 'RPA & orchestration' },
      { name: 'Business Intelligence Solutions', href: 'pages/services/business-intelligence.html', desc: 'Dashboards & analytics' },
      { name: 'Enterprise Mobility Solutions', href: 'pages/services/enterprise-mobility.html', desc: 'Secure mobile apps' },
      { name: 'Data Engineering', href: 'pages/services/data-engineering.html', desc: 'Pipelines & lakehouses' },
    ],
  },
  cloud: {
    label: 'Cloud Services',
    icon: '☁️',
    items: [
      { name: 'Cloud Solutions', href: 'pages/services/cloud-solutions.html', desc: 'Migration & consulting' },
      { name: 'AWS', href: 'pages/services/aws.html', desc: 'AWS architecture & DevOps' },
      { name: 'Azure', href: 'pages/services/azure.html', desc: 'Microsoft Azure solutions' },
      { name: 'SaaS Development', href: 'pages/services/saas-development.html', desc: 'Subscription platforms' },
    ],
  },
  analytics: {
    label: 'Analytics & BI',
    icon: '📊',
    items: [
      { name: 'Analytics', href: 'pages/services/analytics.html', desc: 'BI dashboards & reporting' },
      { name: 'Power BI', href: 'pages/services/power-bi.html', desc: 'Data visualization' },
      { name: 'Salesforce', href: 'pages/services/salesforce.html', desc: 'CRM implementation' },
      { name: 'Dynamics 365', href: 'pages/services/dynamics-365.html', desc: 'Enterprise productivity' },
    ],
  },
  ai: {
    label: 'AI & Emerging Tech',
    icon: '🤖',
    items: [
      { name: 'AI Development', href: 'pages/services/ai-development.html', desc: 'Production-grade AI systems' },
      { name: 'Generative AI', href: 'pages/services/generative-ai.html', desc: 'LLM copilots & content AI' },
      { name: 'AI Agent Development', href: 'pages/services/ai-agent-development.html', desc: 'Autonomous AI agents' },
      { name: 'AI Automation', href: 'pages/services/ai-automation.html', desc: 'Intelligent process automation' },
      { name: 'Conversational AI', href: 'pages/services/conversational-ai.html', desc: 'Chatbots & voice assistants' },
      { name: 'Machine Learning', href: 'pages/services/machine-learning.html', desc: 'Predictive ML models' },
      { name: 'Computer Vision', href: 'pages/services/computer-vision.html', desc: 'Image & video analytics' },
      { name: 'RPA Development', href: 'pages/services/rpa-development.html', desc: 'Robotic process automation' },
      { name: 'AI Consulting', href: 'pages/services/ai-consulting.html', desc: 'AI strategy & advisory' },
      { name: 'AI Integration', href: 'pages/services/ai-integration.html', desc: 'Embed AI in your stack' },
      { name: 'Enterprise AI', href: 'pages/services/enterprise-ai.html', desc: 'Governed AI platforms' },
      { name: 'AI Product Engineering', href: 'pages/services/ai-product-engineering.html', desc: 'AI-native SaaS products' },
      { name: 'LLM Development', href: 'pages/services/llm-development.html', desc: 'Custom language models' },
      { name: 'RAG Development', href: 'pages/services/rag-development.html', desc: 'Knowledge-grounded AI' },
      { name: 'Internet of Things', href: 'pages/services/iot.html', desc: 'Smart device integration' },
    ],
  },
};

function getBasePath() {
  const path = window.location.pathname;
  const segments = path.split('/').filter(Boolean);
  const marker = segments.find((s) => s === 'pages' || s === 'dashboards');
  if (marker) {
    const idx = segments.indexOf(marker);
    const levels = segments.length - idx - 1;
    return '../'.repeat(Math.max(levels, 1));
  }
  return '';
}

/** Weydii-style tabbed mega menu data */
const MEGA_TABS = [
  {
    id: 'development',
    label: 'Development',
    icon: 'code',
    default: true,
    columns: [
      {
        title: 'Development Services',
        links: [
          { name: 'Website Development', href: 'pages/services/website-development.html', icon: 'globe' },
          { name: 'Business Website', href: 'pages/services/business-website.html', icon: 'briefcase' },
          { name: 'Web Application', href: 'pages/services/web-application.html', icon: 'shield' },
          { name: 'Mobile App', href: 'pages/services/mobile-app.html', icon: 'mobile' },
        ],
      },
      {
        title: 'Mobile App',
        links: [
          { name: 'iOS App Development', href: 'pages/services/ios-app.html', icon: 'apple' },
          { name: 'Android App Development', href: 'pages/services/android-app.html', icon: 'android' },
          { name: 'Flutter App Development', href: 'pages/services/flutter-app.html', icon: 'code' },
        ],
      },
      {
        title: 'E-commerce',
        links: [
          { name: 'E-commerce', href: 'pages/services/ecommerce.html', icon: 'bag' },
          { name: 'Shopify', href: 'pages/services/shopify.html', icon: 'store' },
          { name: 'Magento', href: 'pages/services/magento.html', icon: 'shop' },
          { name: 'WooCommerce', href: 'pages/services/woocommerce.html', icon: 'cart' },
        ],
      },
      {
        title: 'CMS',
        links: [
          { name: 'CMS Development', href: 'pages/services/cms.html', icon: 'cms' },
          { name: 'WordPress', href: 'pages/services/wordpress.html', icon: 'wordpress' },
          { name: 'Wix', href: 'pages/services/wix.html', icon: 'window' },
        ],
      },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud',
    icon: 'cloud',
    columns: [
      {
        title: 'Cloud Platform',
        links: [
          { name: 'Cloud Solutions', href: 'pages/services/cloud-solutions.html', icon: 'cloud' },
          { name: 'AWS', href: 'pages/services/aws.html', icon: 'aws' },
          { name: 'Azure', href: 'pages/services/azure.html', icon: 'azure' },
          { name: 'SaaS Development', href: 'pages/services/saas-development.html', icon: 'saas' },
        ],
      },
      {
        title: 'Infrastructure',
        links: [
          { name: 'DevOps & CI/CD', href: 'pages/services/aws.html', icon: 'cogs' },
          { name: 'Cloud Migration', href: 'pages/services/cloud-solutions.html', icon: 'server' },
          { name: 'Hybrid Cloud', href: 'pages/services/azure.html', icon: 'network' },
        ],
      },
      {
        title: 'Enterprise Cloud',
        links: [
          { name: 'SaaS Applications', href: 'saas.html', icon: 'saas' },
          { name: 'Scalable Infrastructure', href: 'pages/services/cloud-solutions.html', icon: 'chart' },
        ],
      },
      {
        title: 'Platforms',
        links: [
          { name: 'Multi-tenant SaaS', href: 'pages/services/saas-development.html', icon: 'layers' },
          { name: 'Serverless', href: 'pages/services/aws.html', icon: 'bolt' },
        ],
      },
    ],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: 'chart',
    columns: [
      {
        title: 'Business Intelligence',
        links: [
          { name: 'Analytics', href: 'pages/services/analytics.html', icon: 'chart' },
          { name: 'Power BI', href: 'pages/services/power-bi.html', icon: 'chart-bar' },
          { name: 'Data Analytics', href: 'pages/services/data-analytics.html', icon: 'database' },
        ],
      },
      {
        title: 'CRM Platforms',
        links: [
          { name: 'Salesforce', href: 'pages/services/salesforce.html', icon: 'salesforce' },
          { name: 'Dynamics 365', href: 'pages/services/dynamics-365.html', icon: 'cube' },
          { name: 'CRM Solutions', href: 'pages/services/crm.html', icon: 'users' },
        ],
      },
      {
        title: 'Reporting',
        links: [
          { name: 'KPI Dashboards', href: 'pages/services/analytics.html', icon: 'dashboard' },
          { name: 'Real-time Analytics', href: 'pages/services/data-analytics.html', icon: 'pulse' },
        ],
      },
      {
        title: 'Data Services',
        links: [
          { name: 'Data Warehousing', href: 'pages/services/analytics.html', icon: 'warehouse' },
          { name: 'Predictive Analytics', href: 'pages/services/data-analytics.html', icon: 'brain' },
        ],
      },
    ],
  },
  {
    id: 'solutions',
    label: 'Solutions',
    icon: 'cogs',
    columns: [
      {
        title: 'Enterprise',
        links: [
          { name: 'Enterprise Software Development', href: 'pages/services/enterprise-solutions.html', icon: 'building' },
          { name: 'ERP Development', href: 'pages/services/erp.html', icon: 'erp' },
          { name: 'CRM Development', href: 'pages/services/crm.html', icon: 'users' },
          { name: 'HRMS Development', href: 'pages/services/hrms.html', icon: 'users' },
          { name: 'Legacy Modernization', href: 'pages/services/legacy-modernization.html', icon: 'refresh' },
          { name: 'Digital Transformation', href: 'pages/services/digital-transformation.html', icon: 'chart' },
          { name: 'IT Consulting', href: 'pages/services/it-consulting.html', icon: 'briefcase' },
          { name: 'Workflow Automation', href: 'pages/services/workflow-automation.html', icon: 'workflow' },
          { name: 'Cloud Engineering', href: 'pages/services/cloud-engineering.html', icon: 'cloud' },
          { name: 'Business Intelligence Solutions', href: 'pages/services/business-intelligence.html', icon: 'chart-bar' },
          { name: 'Enterprise Mobility Solutions', href: 'pages/services/enterprise-mobility.html', icon: 'mobile' },
          { name: 'Data Engineering', href: 'pages/services/data-engineering.html', icon: 'database' },
        ],
      },
      {
        title: 'Cloud',
        links: [
          { name: 'Cloud Solutions', href: 'pages/services/cloud-solutions.html', icon: 'cloud' },
          { name: 'AWS', href: 'pages/services/aws.html', icon: 'aws' },
          { name: 'Azure', href: 'pages/services/azure.html', icon: 'azure' },
          { name: 'SaaS Development', href: 'pages/services/saas-development.html', icon: 'saas' },
        ],
      },
      {
        title: 'Analytics',
        links: [
          { name: 'Power BI', href: 'pages/services/power-bi.html', icon: 'chart-bar' },
          { name: 'Salesforce', href: 'pages/services/salesforce.html', icon: 'salesforce' },
          { name: 'Dynamics 365', href: 'pages/services/dynamics-365.html', icon: 'cube' },
        ],
      },
      {
        title: 'AI & Emerging Tech',
        links: [
          { name: 'AI Development', href: 'pages/services/ai-development.html', icon: 'brain' },
          { name: 'Generative AI', href: 'pages/services/generative-ai.html', icon: 'sparkles' },
          { name: 'AI Agents', href: 'pages/services/ai-agent-development.html', icon: 'robot' },
          { name: 'LLM Development', href: 'pages/services/llm-development.html', icon: 'code' },
          { name: 'RAG Development', href: 'pages/services/rag-development.html', icon: 'database' },
          { name: 'Computer Vision', href: 'pages/services/computer-vision.html', icon: 'eye' },
          { name: 'Conversational AI', href: 'pages/services/conversational-ai.html', icon: 'chat' },
          { name: 'Enterprise AI', href: 'pages/services/enterprise-ai.html', icon: 'building' },
        ],
      },
    ],
  },
];

const MEGA_ICONS = {
  code: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>',
  cloud: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>',
  chart: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>',
  cogs: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>',
  globe: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>',
  briefcase: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>',
  shield: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>',
  mobile: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>',
  apple: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>',
  android: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"/>',
  bag: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>',
  store: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>',
  shop: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>',
  cart: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17"/>',
  cms: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>',
  wordpress: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9"/>',
  window: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z"/>',
  aws: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>',
  azure: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>',
  saas: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"/>',
  building: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>',
  erp: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"/>',
  users: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>',
  workflow: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/>',
  'chart-bar': '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10"/>',
  salesforce: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>',
  cube: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>',
  database: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"/>',
  wifi: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/>',
  brain: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>',
  server: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2"/>',
  network: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"/>',
  layers: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>',
  bolt: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>',
  dashboard: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5z"/>',
  pulse: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>',
  warehouse: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4"/>',
};

function megaIcon(name) {
  const path = MEGA_ICONS[name] || MEGA_ICONS.code;
  return `<svg class="mega-icon w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">${path}</svg>`;
}

function renderMegaMenuDropdown(base) {
  if (window.GuudleMegaMenuRender?.renderAllMegaMenus) {
    return window.GuudleMegaMenuRender.renderAllMegaMenus(base);
  }
  return '';
}

function isServicePage() {
  return document.body?.classList.contains('service-page') ||
    window.location.pathname.includes('/services/');
}

/** Homepage-matched nav: light transparent bar at top (same on all pages). */
function usesHomeNavStyle() {
  return true;
}

/** Match homepage: transparent nav at top; sticky scroll handled by main.js. */
function needsInitialScrolledNav() {
  if (usesHomeNavStyle()) return false;
  if (document.body.classList.contains('home-saas')) return false;
  if (document.body.classList.contains('service-page')) return false;
  if (document.body.classList.contains('corp-page')) return false;
  return document.body.classList.contains('bg-slate-950') ||
    document.documentElement.classList.contains('dark');
}

function renderTopContact(icon, label, value, href, variant = 'desktop') {
  const root = variant === 'mobile' ? 'mobile-nav-contact-item' : 'nav-top-contact';
  const iconCls = variant === 'mobile' ? 'mobile-nav-contact-item__icon' : 'nav-top-contact__icon';
  const bodyCls = variant === 'mobile' ? 'mobile-nav-contact-item__body' : 'nav-top-contact__body';
  const labelCls = variant === 'mobile' ? 'mobile-nav-contact-item__label' : 'nav-top-contact__label';
  const valueCls = variant === 'mobile' ? 'mobile-nav-contact-item__value' : 'nav-top-contact__value';
  return `<div class="${root}">
    <span class="${iconCls}" aria-hidden="true"><i class="fas ${icon}"></i></span>
    <div class="${bodyCls}">
      <span class="${labelCls}">${label}</span>
      <a href="${href}" class="${valueCls}">${value}</a>
    </div>
  </div>`;
}

function renderFooterSocialLinks() {
  const links = [
    { label: 'LinkedIn', icon: 'fa-linkedin-in', href: 'https://linkedin.com' },
    { label: 'X (Twitter)', icon: 'fa-x-twitter', href: 'https://twitter.com' },
    { label: 'Facebook', icon: 'fa-facebook-f', href: 'https://facebook.com' },
    { label: 'YouTube', icon: 'fa-youtube', href: 'https://youtube.com' },
  ];
  return `<div class="site-footer__social" aria-label="Social media">
    <span class="site-footer__social-label">Connect with us</span>
    ${links.map((s) =>
      `<a href="${s.href}" class="site-footer__social-link" target="_blank" rel="noopener noreferrer" aria-label="${s.label}"><i class="fab ${s.icon}" aria-hidden="true"></i></a>`
    ).join('')}
  </div>`;
}

function renderHeader() {
  const base = getBasePath();
  const topClass = usesHomeNavStyle() ? 'nav-light-top' : 'nav-dark-top';
  const initialState = needsInitialScrolledNav() ? 'nav-scrolled' : 'nav-at-top';

  return `
    <header id="site-header" class="site-nav site-nav--split site-nav--enterprise site-nav--premium fixed top-0 left-0 right-0 z-[60] ${initialState} ${topClass}" role="banner">
      <div class="nav-scroll-progress" aria-hidden="true"></div>
      <div class="nav-inner max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div class="nav-top-bar flex items-center justify-between gap-4" role="group" aria-label="Site branding and contact">
          <a href="${base}index.html" class="nav-brand flex items-center group flex-shrink-0" aria-label="${SITE.name} Home">
            ${renderLogo(base, { className: 'site-logo h-10 sm:h-11 w-auto object-contain flex-shrink-0 transition-transform duration-300 group-hover:scale-[1.02]' })}
          </a>

          <div class="nav-top-right flex items-center gap-3 sm:gap-4 xl:gap-5 flex-shrink-0">
            <div class="nav-top-meta hidden lg:flex items-center gap-5 xl:gap-6">
              ${renderTopContact('fa-headset', '24/7 Online Support', SITE.email, `mailto:${SITE.email}`)}
              ${renderTopContact('fa-phone-volume', 'Contact Us Free', SITE.phone, `tel:${SITE.phoneTel}`)}
            </div>
            <a href="${base}pages/saas/login.html" class="nav-signin-link hidden lg:inline-flex items-center gap-2 whitespace-nowrap" data-nav-match="saas-login">
              <i class="fas fa-right-to-bracket" aria-hidden="true"></i>
              Sign in
            </a>
            <a href="${base}pages/contact.html" class="nav-cta-btn nav-cta-btn--appointment nav-top-cta hidden lg:inline-flex items-center gap-2 whitespace-nowrap" data-nav-match="contact">
              <i class="fas fa-calendar-check" aria-hidden="true"></i>
              Start Your Project
            </a>
            <button type="button" id="nav-search-btn-mobile" class="nav-search-trigger nav-icon-btn nav-icon-btn--menu xl:hidden" aria-label="Search site" aria-expanded="false" aria-controls="nav-search-panel">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </button>
            <button id="mobile-menu-btn" class="nav-icon-btn nav-icon-btn--menu xl:hidden" aria-label="Open menu" aria-expanded="false">
              <svg class="w-6 h-6 nav-hamburger" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>

        <div class="nav-header-divider hidden xl:block" aria-hidden="true"></div>

        <div class="nav-menu-bar hidden xl:block">
          <div class="nav-menu-bar__inner nav-menu-bar__inner--centered">
            <div class="nav-menu-bar__side" aria-hidden="true"></div>
            <nav class="nav-menu-bar__nav nav-menu-bar__nav--center" aria-label="Main navigation">
              <ul class="flex items-center justify-center gap-0 list-none m-0 p-0 mega-nav-list nav-menu-list">
                ${renderMegaMenuDropdown(base)}
              </ul>
            </nav>
            <div class="nav-menu-actions flex items-center justify-end gap-3 flex-shrink-0">
              <button type="button" id="nav-search-btn" class="nav-search-trigger nav-icon-btn nav-icon-btn--menu hidden xl:inline-flex" aria-label="Search site" aria-expanded="false" aria-controls="nav-search-panel">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="nav-bottom-divider" aria-hidden="true"></div>

      <div id="nav-search-panel" class="nav-search-panel hidden" role="search" aria-label="Site search">
        <div class="max-w-2xl mx-auto px-4 py-4">
          <form id="nav-search-form" class="flex gap-3">
            <input type="search" id="nav-search-input" placeholder="Search services, solutions, company..." class="flex-1 rounded-xl px-4 py-3 text-sm" aria-label="Search site">
            <button type="submit" class="nav-cta-btn nav-cta-btn--appointment px-5 py-3 text-sm rounded-xl">Search</button>
          </form>
          <div id="nav-search-results" class="mt-3 space-y-1 max-h-48 overflow-y-auto" role="listbox" aria-live="polite"></div>
        </div>
      </div>
    </header>
    ${renderMobileMenu(base)}
  `;
}

function getMobileGroups() {
  if (window.GuudleMegaMenuRender?.getMobileNavGroups) {
    return window.GuudleMegaMenuRender.getMobileNavGroups();
  }
  return [
    { title: 'Development Services', items: NAV.services.items.slice(0, 7) },
    { title: 'SaaS Applications', items: NAV.solutions.items },
  ];
}

function renderMobileMenu(base) {
  const mainLinks = [
    { label: 'Home', href: `${base}index.html`, match: 'index.html' },
    { label: 'Pricing', href: `${base}pages/saas/pricing.html`, match: 'pricing' },
    { label: 'Our Work', href: `${base}pages/our-work.html`, match: 'our-work' },
    { label: 'About Us', href: `${base}pages/about.html`, match: 'about' },
    { label: 'Industries', href: `${base}pages/industries.html`, match: 'industries' },
    { label: 'Contact', href: `${base}pages/contact.html`, match: 'contact' },
  ];
  const mobileGroups = getMobileGroups();

  return `
    <div id="mobile-menu-overlay" class="mobile-menu-overlay fixed inset-0 z-[70] opacity-0 invisible transition-all duration-400 xl:hidden" aria-hidden="true"></div>
    <aside id="mobile-menu" class="mobile-menu-fullscreen mobile-drawer fixed inset-y-0 right-0 left-auto w-full max-w-md z-[80] overflow-y-auto xl:hidden translate-x-full" role="dialog" aria-modal="true" aria-label="Mobile navigation">
      <div class="min-h-full flex flex-col p-6 sm:p-8">
        <div class="mobile-drawer__header">
          <a href="${base}index.html" class="flex items-center">
            ${renderLogo(base, { className: 'site-logo h-10 w-auto object-contain' })}
          </a>
          <button id="mobile-menu-close" class="mobile-drawer__close" aria-label="Close menu">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        <div class="mobile-nav-contact xl:hidden flex flex-col gap-3 mb-6 pb-6">
          ${renderTopContact('fa-headset', '24/7 Online Support', SITE.email, `mailto:${SITE.email}`, 'mobile')}
          ${renderTopContact('fa-phone-volume', 'Contact Us Free', SITE.phone, `tel:${SITE.phoneTel}`, 'mobile')}
        </div>

        <nav class="flex-1 space-y-1" aria-label="Mobile navigation links">
          ${mainLinks.slice(0, 1).map((l, i) => `
            <a href="${l.href}" class="mobile-nav-link block px-4 py-3.5 text-lg rounded-xl" style="--mobile-i:${i}" data-nav-match="${l.match}">${l.label}</a>
          `).join('')}

          <div class="mobile-nav-accordion py-1" style="--mobile-i:1">
            <button type="button" class="mobile-accordion-trigger w-full flex items-center justify-between px-4 py-3.5 text-lg rounded-xl" aria-expanded="false">
              Browse Services
              <svg class="mobile-accordion-chevron w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div class="mobile-accordion-panel max-h-0 overflow-hidden transition-all duration-400">
              ${mobileGroups.map((group) => `
                <div class="mobile-service-group mt-2">
                  <p class="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">${group.title}</p>
                  ${group.items.map((s) => `
                    <a href="${base}${s.href}" class="mobile-nav-sublink block px-4 py-2.5 text-sm rounded-lg transition-colors">${s.name}</a>
                  `).join('')}
                </div>
              `).join('')}
            </div>
          </div>

          ${mainLinks.slice(1).map((l, i) => `
            <a href="${l.href}" class="mobile-nav-link block px-4 py-3.5 text-lg rounded-xl" style="--mobile-i:${i + 2}" data-nav-match="${l.match}">${l.label}</a>
          `).join('')}
        </nav>

        <div class="mobile-drawer__footer">
          <a href="${base}pages/contact.html" class="mobile-drawer__cta-primary nav-cta-btn nav-cta-btn--appointment">Start Your Project <i class="fas fa-calendar-check" aria-hidden="true"></i></a>
          <a href="${base}pages/saas/login.html" class="mobile-drawer__cta-secondary">Sign in to Platform</a>
          <p class="mobile-drawer__email">${SITE.email}</p>
        </div>
      </div>
    </aside>
  `;
}

function renderFooter() {
  const base = getBasePath();
  const year = new Date().getFullYear();

  const col = (title, items) => `
    <div class="site-footer__col">
      <h3 class="site-footer__col-title">${title}</h3>
      <ul class="site-footer__links">${items.map((i) =>
        `<li><a href="${base}${i.href}">${i.name || i.label}</a></li>`
      ).join('')}</ul>
    </div>`;

  return `
    <footer class="site-footer" role="contentinfo">
      <div class="site-footer__wrap">
        <div class="site-footer__grid">
          <div class="site-footer__brand site-footer__col">
            <a href="${base}index.html" class="site-footer__logo" aria-label="${SITE.name} Home">
              ${renderLogo(base, { className: 'site-logo site-logo--on-dark h-11 w-auto object-contain' })}
            </a>
            <p class="site-footer__tagline">${SITE.tagline}. We deliver enterprise software, cloud engineering, AI innovation, and digital transformation for organizations worldwide.</p>
            <div class="site-footer__contact-mini">
              <a href="mailto:${SITE.email}"><i class="fas fa-envelope" aria-hidden="true"></i> ${SITE.email}</a>
              <a href="tel:${SITE.phoneTel}"><i class="fas fa-phone" aria-hidden="true"></i> ${SITE.phone}</a>
            </div>
            ${renderFooterSocialLinks()}
            <div class="site-footer__cta-row">
              <a href="${base}pages/contact.html" class="site-footer__cta">Start Your Project <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
            </div>
          </div>
          ${col('Platform', [
            { name: 'Business Operating Platform', href: 'pages/saas/index.html' },
            { name: 'Modules', href: 'pages/saas/index.html#gbp-modules' },
            { name: 'Pricing', href: 'pages/saas/pricing.html' },
            { name: 'Start Free Trial', href: 'pages/saas/register.html' },
            { name: 'Sign In', href: 'pages/saas/login.html' },
            { name: 'Client Workspace', href: 'dashboards/client/index.html' },
            { name: 'Super Admin', href: 'dashboards/admin/index.html' },
            { name: 'Support', href: 'pages/saas/support.html' },
          ])}
          ${col('Development', NAV.services.items.slice(0, 6))}
          ${col('Enterprise', NAV.solutions.items.slice(0, 6))}
          ${col('Company', [
            { name: 'About Us', href: 'pages/about.html' },
            { name: 'Industries', href: 'pages/industries.html' },
            { name: 'Our Process', href: 'pages/our-process.html' },
            { name: 'Our Work', href: 'pages/our-work.html' },
            { name: 'Testimonials', href: 'pages/testimonials.html' },
            { name: 'Contact', href: 'pages/contact.html' },
          ])}
        </div>
        <div class="site-footer__bar">
          <p class="site-footer__copy">&copy; ${year} ${SITE.name}. All rights reserved.</p>
          <nav class="site-footer__legal" aria-label="Legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
            <a href="#">GDPR</a>
          </nav>
        </div>
      </div>
    </footer>`;
}

function renderChatbot() {
  return `
    <div id="chatbot" class="fixed bottom-6 right-6 z-40">
      <div id="chatbot-panel" class="chatbot-panel absolute bottom-16 right-0 w-80 sm:w-96 glass rounded-2xl shadow-2xl overflow-hidden border border-white/10">
        <div class="bg-gradient-to-r from-[#123D6A] to-[#2563EB] p-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>
            <div>
              <p class="text-white font-semibold text-sm">Guudle AI Assistant</p>
              <p class="text-cyan-300/70 text-xs">Online now</p>
            </div>
          </div>
          <button id="chatbot-close" class="text-white/60 hover:text-white" aria-label="Close chat">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div id="chatbot-messages" class="p-4 h-60 overflow-y-auto space-y-3 bg-[#2E3440]">
          <div class="flex gap-2">
            <div class="w-7 h-7 rounded-full bg-gradient-to-br from-[#2563EB] to-[#0B1F3A] flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold">AI</div>
            <div class="bg-white/8 border border-white/10 rounded-2xl rounded-tl-sm px-3 py-2 text-sm text-white/70">Hello! How can I help with your technology needs today?</div>
          </div>
        </div>
        <div class="p-3 border-t border-white/10 bg-[#091729]">
          <form id="chatbot-form" class="flex gap-2">
            <input type="text" id="chatbot-input" placeholder="Ask anything..." class="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/50" aria-label="Chat message">
            <button type="submit" class="p-2 btn-primary rounded-xl" aria-label="Send">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
            </button>
          </form>
        </div>
      </div>
      <button id="chatbot-toggle" class="w-14 h-14 rounded-2xl btn-primary shadow-xl shadow-blue-500/30 flex items-center justify-center" aria-label="Open AI chat">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
      </button>
    </div>
  `;
}

function injectFontAwesome() {
  if (document.querySelector('link[href*="font-awesome"]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
  document.head.appendChild(link);
}

function injectNavLockCss() {
  if (document.getElementById('nav-lock-css')) return;
  const base = getBasePath();
  const link = document.createElement('link');
  link.id = 'nav-lock-css';
  link.rel = 'stylesheet';
  link.href = `${base}assets/css/nav-lock.css`;
  document.head.appendChild(link);
}

function injectSiteUnifiedCss() {
  if (document.getElementById('site-unified-css')) return;
  const base = getBasePath();
  const link = document.createElement('link');
  link.id = 'site-unified-css';
  link.rel = 'stylesheet';
  link.href = `${base}assets/css/site-unified.css`;
  document.head.appendChild(link);
}

function injectEnterpriseSystemCss() {
  if (document.getElementById('enterprise-system-css')) return;
  const base = getBasePath();
  const link = document.createElement('link');
  link.id = 'enterprise-system-css';
  link.rel = 'stylesheet';
  link.href = `${base}assets/css/enterprise-system.css`;
  document.head.appendChild(link);
}

function injectAquaThemeCss() {
  if (document.getElementById('aqua-white-css')) return;
  const base = getBasePath();
  const link = document.createElement('link');
  link.id = 'aqua-white-css';
  link.rel = 'stylesheet';
  link.href = `${base}assets/css/aqua-white.css`;
  document.head.appendChild(link);
}

function injectEnterpriseHero() {
  if (document.getElementById('guudle-enterprise-hero')) return;
  const base = getBasePath();
  const s = document.createElement('script');
  s.id = 'guudle-enterprise-hero';
  s.src = `${base}assets/js/enterprise-hero.js`;
  s.defer = true;
  document.body.appendChild(s);
}

function injectOfferPopup() {
  if (document.getElementById('guudle-offer-popup-loader')) return;
  const base = getBasePath();
  const s = document.createElement('script');
  s.id = 'guudle-offer-popup-loader';
  s.src = `${base}assets/js/offer-popup.js`;
  s.defer = true;
  document.body.appendChild(s);
}

function injectHeroTitleAnimation() {
  if (document.querySelector('link[data-hta-css]') || document.getElementById('guudle-hta-loader')) return;
  const base = getBasePath();
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `${base}assets/css/hero-title-animation.css`;
  link.setAttribute('data-hta-css', '1');
  document.head.appendChild(link);

  const s = document.createElement('script');
  s.id = 'guudle-hta-loader';
  s.src = `${base}assets/js/hero-title-animation.js`;
  s.defer = true;
  document.body.appendChild(s);
}

function injectComponents() {
  const headerEl = document.getElementById('header-placeholder');
  const footerEl = document.getElementById('footer-placeholder');
  const chatbotEl = document.getElementById('chatbot-placeholder');
  if (headerEl) headerEl.innerHTML = renderHeader();
  if (footerEl) footerEl.innerHTML = renderFooter();
  if (chatbotEl) chatbotEl.innerHTML = renderChatbot();
  injectFontAwesome();
  injectNavLockCss();
  injectSiteUnifiedCss();
  injectEnterpriseSystemCss();
  injectAquaThemeCss();
  injectEnterpriseHero();
  injectOfferPopup();
  requestAnimationFrame(() => {
    const header = document.getElementById('site-header');
    if (header) {
      document.documentElement.style.setProperty('--site-header-height', `${header.offsetHeight}px`);
    }
    document.dispatchEvent(new CustomEvent('guudle:header-ready'));
  });
}

document.addEventListener('DOMContentLoaded', injectComponents);

window.GuudleSite = { getBasePath, SITE, isServicePage };
