/**
 * Service pages migrated from legacy generators to unified svc-landing template.
 */
import { buildServicePage, HERO_PHOTOS } from './svc-page-factory.mjs';
import { IMG } from './svc-shared-data.mjs';
import { CRM_PAGE } from './svc-crm-config.mjs';

const p = (opts) => buildServicePage(opts);

export const MIGRATED_PAGES = {
  /* ── Enterprise Solutions ── */
  'enterprise-solutions': p({
    slug: 'enterprise-solutions', category: 'enterprise', theme: 'ent-solutions',
    title: 'Enterprise Software Development',
    badge: 'Enterprise Solutions',
    headline: 'Enterprise Software', headlineAccent: 'Built for Global Scale',
    heroImage: IMG(HERO_PHOTOS.enterprise),
    subhead: 'Custom enterprise platforms, integrations, and digital products engineered for security, scalability, and long-term maintainability.',
  }),

  'erp': p({ slug: 'erp', category: 'enterprise', theme: 'ent-erp', title: 'ERP Development', badge: 'ERP Systems', headline: 'ERP Development', headlineAccent: 'Unified Operations', heroImage: IMG(HERO_PHOTOS.erp), subhead: 'Custom and integrated ERP solutions that connect finance, inventory, HR, and operations on one platform.', whyChooseVariant: 'erp-hub' }),
  'crm': p(CRM_PAGE),
  'hrms': p({ slug: 'hrms', category: 'enterprise', theme: 'ent-hrms', title: 'HRMS Development', badge: 'Human Resources', headline: 'HRMS Development', headlineAccent: 'Workforce Management Simplified', subhead: 'Recruitment, payroll, performance, and employee self-service on secure cloud platforms.' }),
  'cloud-engineering': p({ slug: 'cloud-engineering', category: 'enterprise', theme: 'ent-cloud', title: 'Cloud Engineering', badge: 'Cloud Infrastructure', headline: 'Cloud Engineering', headlineAccent: 'Resilient Cloud Architecture', heroImage: IMG(HERO_PHOTOS.cloud), subhead: 'Design, migrate, and operate cloud-native infrastructure on AWS, Azure, and hybrid environments.' }),
  'digital-transformation': p({ slug: 'digital-transformation', category: 'enterprise', theme: 'ent-digital', title: 'Digital Transformation', badge: 'Transformation', headline: 'Digital Transformation', headlineAccent: 'Modernize & Innovate', subhead: 'End-to-end programs that modernize legacy systems, processes, and customer experiences.' }),
  'it-consulting': p({ slug: 'it-consulting', category: 'enterprise', theme: 'ent-it', title: 'IT Consulting', badge: 'Technology Advisory', headline: 'IT Consulting', headlineAccent: 'Strategic Technology Guidance', subhead: 'Architecture reviews, vendor selection, and technology roadmaps aligned to business outcomes.' }),
  'workflow-automation': p({ slug: 'workflow-automation', category: 'enterprise', theme: 'ent-workflow', title: 'Workflow Automation', badge: 'Process Automation', headline: 'Workflow Automation', headlineAccent: 'Streamline Operations', heroImage: IMG(HERO_PHOTOS.rpa), subhead: 'Automate approvals, notifications, and cross-system workflows with low-code and custom integrations.' }),
  'business-intelligence': p({ slug: 'business-intelligence', category: 'enterprise', theme: 'ent-bi', title: 'Business Intelligence Solutions', badge: 'Business Intelligence', headline: 'Business Intelligence', headlineAccent: 'Data-Driven Decisions', heroImage: IMG(HERO_PHOTOS.data), subhead: 'Dashboards, data warehouses, and analytics pipelines that turn raw data into executive insights.' }),
  'enterprise-mobility': p({ slug: 'enterprise-mobility', category: 'enterprise', theme: 'ent-mobility', title: 'Enterprise Mobility Solutions', badge: 'Enterprise Mobility', headline: 'Enterprise Mobility', headlineAccent: 'Secure Workforce Apps', heroImage: IMG(HERO_PHOTOS.mobile), subhead: 'MDM-ready mobile platforms for field teams, employees, and partners with offline-first design.' }),
  'data-engineering': p({ slug: 'data-engineering', category: 'enterprise', theme: 'ent-data', title: 'Data Engineering', badge: 'Data Platforms', headline: 'Data Engineering', headlineAccent: 'Pipelines That Scale', heroImage: IMG(HERO_PHOTOS.data), subhead: 'ETL/ELT pipelines, lakehouse architecture, and real-time streaming for analytics and AI workloads.' }),
  'devops': p({ slug: 'devops', category: 'enterprise', theme: 'ent-devops', title: 'DevOps & CI/CD', badge: 'DevOps', headline: 'DevOps Engineering', headlineAccent: 'Ship Faster, Safer', heroImage: IMG(HERO_PHOTOS.devops), subhead: 'CI/CD pipelines, infrastructure as code, observability, and SRE practices for reliable releases.' }),
  'business-process': p({ slug: 'business-process', category: 'enterprise', theme: 'ent-bpm', title: 'Business Process Management', badge: 'BPM', headline: 'Business Process', headlineAccent: 'Optimization & Automation', subhead: 'Model, automate, and optimize business processes with BPM platforms and custom integrations.' }),

  /* ── Product Engineering ── */
  'custom-software-development': p({ slug: 'custom-software-development', category: 'product', theme: 'prod-custom', title: 'Custom Software Development', badge: 'Custom Software', headline: 'Custom Software', headlineAccent: 'Tailored to Your Business', subhead: 'Bespoke applications, platforms, and integrations built around your unique workflows and goals.' }),
  'web-application': p({ slug: 'web-application', category: 'product', theme: 'prod-webapp', title: 'Web Application Development', badge: 'Web Applications', headline: 'Web Applications', headlineAccent: 'Scalable & Secure', heroImage: IMG(HERO_PHOTOS.web), subhead: 'SaaS platforms, internal tools, and customer portals with modern frontends and robust APIs.' }),
  'saas-development': p({
    slug: 'saas-development',
    category: 'product',
    theme: 'prod-saas',
    title: 'SaaS Development',
    badge: 'SaaS Products',
    headline: 'SaaS Development',
    headlineAccent: 'Subscription Products That Scale',
    heroImage: IMG(HERO_PHOTOS.saas),
    subhead: 'Multi-tenant architecture, billing, onboarding, and growth analytics for B2B and B2C SaaS.',
    afterFeaturesParallax: 'ai-product',
    industriesVariant: 'saas-platforms',
    whyChooseVariant: 'promo',
    whyChooseIntro: 'Bring your software idea to life with a secure, scalable, and feature-rich SaaS platform designed for long-term success. From subscription billing and multi-tenant architecture to customer onboarding, analytics, and cloud deployment, we deliver end-to-end SaaS solutions that help businesses innovate faster, grow sustainably, and generate recurring revenue.',
    whyChooseCtaHref: '#svc-contact',
    whyChooseCtaLabel: 'Start Your SaaS Project',
    sectionTitles: {
      whyChooseBadge: 'SaaS Launch',
      whyChooseHtml: 'Ready to Launch Your <span class="cpox-accent">SaaS Product?</span>',
    },
  }),
  'mvp-development': p({ slug: 'mvp-development', category: 'product', theme: 'prod-mvp', title: 'MVP Development', badge: 'MVP Launch', headline: 'MVP Development', headlineAccent: 'Validate Ideas Fast', subhead: 'Lean MVPs with core features to test market fit, attract investors, and iterate with real users.' }),
  'qa-testing': p({ slug: 'qa-testing', category: 'product', theme: 'prod-qa', title: 'QA & Testing Services', badge: 'Quality Assurance', headline: 'QA & Testing', headlineAccent: 'Ship With Confidence', subhead: 'Manual and automated testing, performance validation, and security review before every release.' }),
  'api-development': p({ slug: 'api-development', category: 'product', theme: 'prod-api', title: 'API Development', badge: 'API Engineering', headline: 'API Development', headlineAccent: 'Connect Your Ecosystem', subhead: 'REST, GraphQL, and event-driven APIs with documentation, versioning, and developer portals.' }),
  'digital-product-development': p({ slug: 'digital-product-development', category: 'product', theme: 'prod-digital', title: 'Digital Product Development', badge: 'Digital Products', headline: 'Digital Products', headlineAccent: 'From Concept to Market', subhead: 'Product discovery, design, engineering, and launch for digital-first businesses.' }),
  'progressive-web-apps': p({ slug: 'progressive-web-apps', category: 'product', theme: 'prod-pwa', title: 'Progressive Web Apps', badge: 'PWA', headline: 'Progressive Web Apps', headlineAccent: 'App-Like Web Experiences', heroImage: IMG(HERO_PHOTOS.web), subhead: 'Offline-capable, installable web apps that deliver native-like performance across devices.' }),
  'product-discovery': p({ slug: 'product-discovery', category: 'product', theme: 'prod-discovery', title: 'Product Discovery', badge: 'Product Discovery', headline: 'Product Discovery', headlineAccent: 'De-Risk Before You Build', subhead: 'User research, prototyping, and technical spikes to validate ideas before major investment.' }),
  'mobile-app': p({ slug: 'mobile-app', category: 'mobile', theme: 'mob-general', title: 'Mobile App Development', badge: 'Mobile Apps', headline: 'Mobile Apps', headlineAccent: 'iOS, Android & Cross-Platform', heroImage: IMG(HERO_PHOTOS.mobile), subhead: 'Native and cross-platform mobile applications with polished UX and scalable backends.' }),
  'ios-app': p({ slug: 'ios-app', category: 'mobile', theme: 'mob-ios', title: 'iOS App Development', badge: 'iOS Development', headline: 'iOS Apps', headlineAccent: 'Built for Apple Ecosystem', heroImage: IMG(HERO_PHOTOS.mobile), subhead: 'Swift and SwiftUI applications optimized for iPhone, iPad, and Apple Watch.' }),
  'android-app': p({ slug: 'android-app', category: 'mobile', theme: 'mob-android', title: 'Android App Development', badge: 'Android Development', headline: 'Android Apps', headlineAccent: 'Material Design Excellence', heroImage: IMG(HERO_PHOTOS.mobile), subhead: 'Kotlin applications for phones, tablets, and Android enterprise deployments.' }),
  'flutter-app': p({ slug: 'flutter-app', category: 'mobile', theme: 'mob-flutter', title: 'Flutter App Development', badge: 'Flutter', headline: 'Flutter Apps', headlineAccent: 'One Codebase, Two Platforms', heroImage: IMG(HERO_PHOTOS.mobile), subhead: 'Cross-platform mobile apps with native performance and consistent brand experiences.' }),

  /* ── Web / CMS platforms ── */
  'business-website': p({ slug: 'business-website', category: 'web', theme: 'web-business', title: 'Business Website Development', badge: 'Business Websites', headline: 'Business Websites', headlineAccent: 'Credibility That Converts', heroImage: IMG(HERO_PHOTOS.web), subhead: 'Professional corporate sites and landing pages that build trust and generate qualified leads.' }),
  'shopify': p({ slug: 'shopify', category: 'web', theme: 'web-shopify', title: 'Shopify Development', badge: 'Shopify', headline: 'Shopify Stores', headlineAccent: 'E-Commerce That Sells', heroImage: IMG(HERO_PHOTOS.ecommerce), subhead: 'Custom Shopify themes, apps, and integrations for high-converting online stores.' }),
  'magento': p({ slug: 'magento', category: 'web', theme: 'web-magento', title: 'Magento Development', badge: 'Magento', headline: 'Magento Commerce', headlineAccent: 'Enterprise E-Commerce', heroImage: IMG(HERO_PHOTOS.ecommerce), subhead: 'Scalable Magento stores with custom modules, B2B features, and performance optimization.' }),
  'woocommerce': p({ slug: 'woocommerce', category: 'web', theme: 'web-woo', title: 'WooCommerce Development', badge: 'WooCommerce', headline: 'WooCommerce Stores', headlineAccent: 'WordPress Commerce', heroImage: IMG(HERO_PHOTOS.ecommerce), subhead: 'Custom WooCommerce builds with payment gateways, subscriptions, and marketplace features.' }),
  'wordpress': p({ slug: 'wordpress', category: 'web', theme: 'web-wp', title: 'WordPress Development', badge: 'WordPress', headline: 'WordPress Sites', headlineAccent: 'Flexible & Powerful', heroImage: IMG(HERO_PHOTOS.web), subhead: 'Custom themes, plugins, and headless WordPress for content-rich business sites.' }),
  'wix': p({ slug: 'wix', category: 'web', theme: 'web-wix', title: 'Wix Development', badge: 'Wix', headline: 'Wix Websites', headlineAccent: 'Professional & Fast', heroImage: IMG(HERO_PHOTOS.web), subhead: 'Custom Wix Velo development and design for businesses needing rapid, polished web presence.' }),

  /* ── Cloud / Analytics ── */
  'aws': p({ slug: 'aws', category: 'cloud', theme: 'cloud-aws', title: 'AWS Cloud Solutions', badge: 'Amazon Web Services', headline: 'AWS Solutions', headlineAccent: 'Cloud at Enterprise Scale', heroImage: IMG(HERO_PHOTOS.cloud), subhead: 'Architecture, migration, and managed services on AWS with security and cost optimization.' }),
  'azure': p({ slug: 'azure', category: 'cloud', theme: 'cloud-azure', title: 'Microsoft Azure Solutions', badge: 'Microsoft Azure', headline: 'Azure Solutions', headlineAccent: 'Enterprise Cloud on Azure', heroImage: IMG(HERO_PHOTOS.cloud), subhead: 'Azure infrastructure, DevOps, and application modernization for Microsoft-centric enterprises.' }),
  'analytics': p({ slug: 'analytics', category: 'data', theme: 'data-analytics', title: 'Analytics Solutions', badge: 'Analytics', headline: 'Analytics Platforms', headlineAccent: 'Insights That Drive Action', heroImage: IMG(HERO_PHOTOS.data), subhead: 'Web, product, and marketing analytics with dashboards tied to business KPIs.' }),
  'data-analytics': p({ slug: 'data-analytics', category: 'data', theme: 'data-analytics2', title: 'Data Analytics Services', badge: 'Data Analytics', headline: 'Data Analytics', headlineAccent: 'From Raw Data to Decisions', heroImage: IMG(HERO_PHOTOS.data), subhead: 'Advanced analytics, predictive models, and self-service BI for data-driven organizations.' }),
  'power-bi': p({ slug: 'power-bi', category: 'data', theme: 'data-pbi', title: 'Power BI Development', badge: 'Power BI', headline: 'Power BI Solutions', headlineAccent: 'Executive Dashboards', heroImage: IMG(HERO_PHOTOS.data), subhead: 'Custom Power BI reports, data models, and embedded analytics for Microsoft environments.' }),
  'salesforce': p({ slug: 'salesforce', category: 'enterprise', theme: 'ent-sfdc', title: 'Salesforce Development', badge: 'Salesforce', headline: 'Salesforce Solutions', headlineAccent: 'CRM Customization & Integration', subhead: 'Sales Cloud, Service Cloud, and custom Apex development tailored to your sales motion.' }),
  'dynamics-365': p({ slug: 'dynamics-365', category: 'enterprise', theme: 'ent-d365', title: 'Dynamics 365 Development', badge: 'Dynamics 365', headline: 'Dynamics 365', headlineAccent: 'Microsoft Business Apps', subhead: 'CRM and ERP customization, integrations, and Power Platform extensions on Dynamics 365.' }),
  'iot': p({ slug: 'iot', category: 'enterprise', theme: 'ent-iot', title: 'IoT Solutions', badge: 'Internet of Things', headline: 'IoT Solutions', headlineAccent: 'Connected Devices & Platforms', heroImage: IMG(HERO_PHOTOS.cloud), subhead: 'Device firmware, edge computing, and cloud platforms for industrial and consumer IoT.' }),
  'business-outcomes-digital-platforms': p({ slug: 'business-outcomes-digital-platforms', category: 'enterprise', theme: 'ent-outcomes', title: 'Business Outcomes & Digital Platforms', badge: 'Digital Platforms', headline: 'Digital Platforms', headlineAccent: 'Outcomes Over Output', subhead: 'Platform strategies and engineering aligned to measurable business outcomes and KPIs.' }),
  'ai': p({
    slug: 'ai',
    category: 'ai',
    theme: 'ai-hub',
    title: 'AI & Emerging Technologies',
    badge: 'Enterprise AI Hub',
    headline: 'AI & Emerging Tech',
    headlineAccent: 'Built for Enterprise Scale',
    heroImage: IMG(HERO_PHOTOS.ai),
    subhead: 'Your gateway to fifteen specialized AI practices — generative AI, agents, machine learning, computer vision, RPA, and enterprise platforms — engineered for production scale.',
    metaDescription: 'AI & Emerging Technologies hub — generative AI, agents, ML, computer vision, RPA, LLM, RAG, and enterprise AI services by Guudle IT Solutions.',
    keywords: 'AI Services, Generative AI, Machine Learning, AI Agents, Enterprise AI, Guudle IT Solutions',
    sectionOrder: ['aiServices', 'overview', 'whyChoose', 'features', 'industries', 'services', 'benefits', 'process', 'tech', 'testimonials', 'cta', 'contact'],
    overview: {
      title: 'One Hub for Every AI Capability',
      text: 'Guudle IT Solutions delivers end-to-end AI engineering — from strategy and consulting through production deployment and MLOps. Each practice area is staffed by senior specialists who integrate with your data, security, and compliance requirements.',
      highlights: ['15 specialized AI service practices', 'Production MLOps and governance', 'Enterprise security and compliance ready', 'End-to-end AI engineering delivery'],
    },
    features: [
      { icon: 'fa-wand-magic-sparkles', title: 'Generative AI & LLMs', desc: 'Copilots, fine-tuning, and governed GenAI on OpenAI, Claude, Gemini, and private models.' },
      { icon: 'fa-robot', title: 'Agents & Automation', desc: 'Single and multi-agent systems with tool use, RPA, and intelligent process automation.' },
      { icon: 'fa-brain', title: 'Machine Learning', desc: 'Custom models, feature stores, drift monitoring, and production inference pipelines.' },
      { icon: 'fa-eye', title: 'Computer Vision', desc: 'Detection, OCR, quality inspection, and edge-deployed vision systems.' },
      { icon: 'fa-database', title: 'RAG & Knowledge AI', desc: 'Vector search, citation-backed Q&A, and enterprise knowledge assistants.' },
      { icon: 'fa-building', title: 'Enterprise AI Platforms', desc: 'Governed AI layers with model registry, SSO, and regulatory alignment.' },
    ],
    heroHighlights: [
      { icon: 'fa-shield-halved', title: 'Governed AI', desc: 'Security, compliance, and responsible AI by design.' },
      { icon: 'fa-gauge-high', title: 'Production MLOps', desc: 'Monitored inference, drift detection, and retraining.' },
      { icon: 'fa-users-gear', title: 'Senior Specialists', desc: 'Architects, data scientists, and ML engineers.' },
    ],
    cta: 'Start Your AI Transformation',
    ctaSubtext: 'Book a strategy session and explore the right AI practice for your use case.',
    related: [
      { href: 'ai-development.html', label: 'AI Development' },
      { href: 'generative-ai.html', label: 'Generative AI' },
      { href: 'enterprise-ai.html', label: 'Enterprise AI' },
      { href: 'ai.html', label: 'AI Services Hub' },
    ],
  }),
};
