import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getSiteMetaBlock } from './site-meta.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'pages', 'services');

const SERVICES = [
  { slug: 'website-development', title: 'Website Development', subtitle: 'Custom, responsive, and SEO-optimized websites that drive business growth', layout: 'browser-split', personality: 'Digital Craftsmanship', features: ['Custom responsive design','SEO-friendly architecture','Performance optimization','CMS integration','Analytics setup','Security hardening'], benefits: ['Increase online visibility','Convert visitors to customers','Mobile-first experience','Scalable architecture'], tech: ['HTML5','Tailwind CSS','JavaScript','WordPress','Next.js'], stat: { n: '3x', l: 'Faster load times' } },
  { slug: 'business-website', title: 'Business Website', subtitle: 'Professional corporate websites and startup landing pages that build credibility', layout: 'corporate-timeline', personality: 'Corporate Excellence', features: ['Corporate branding','Lead generation forms','Professional design','Content strategy','Multi-page architecture','Brand consistency'], benefits: ['Establish market presence','Generate qualified leads','Build brand trust','Support sales teams'], tech: ['HTML5','Tailwind CSS','JavaScript','WordPress','Webflow'], stat: { n: '85%', l: 'Lead increase avg.' } },
  { slug: 'web-application', title: 'Web Application Development', subtitle: 'Scalable SaaS platforms, custom web apps, and enterprise portals', layout: 'dashboard-saas', personality: 'SaaS Engineering', features: ['SaaS platform development','Custom web applications','Enterprise portals','API integration','Real-time features','Multi-tenant architecture'], benefits: ['Automate business processes','Scale with your growth','Reduce operational costs','Improve user engagement'], tech: ['JavaScript','Node.js','React','PostgreSQL','AWS'], stat: { n: '10M+', l: 'API requests/day' } },
  { slug: 'mobile-app', title: 'Mobile App Development', subtitle: 'Cross-platform mobile applications with exceptional UI/UX', layout: 'phone-showcase', personality: 'Mobile First', features: ['Cross-platform development','Native performance','UI/UX design','Push notifications','Offline capabilities','App store deployment'], benefits: ['Reach mobile audiences','Enhance customer engagement','Streamline operations','Increase brand loyalty'], tech: ['React Native','Flutter','Swift','Kotlin','Firebase'], stat: { n: '4.8★', l: 'Avg app rating' } },
  { slug: 'ios-app', title: 'iOS App Development', subtitle: 'Native iPhone and iPad applications built with Swift', layout: 'ios-minimal', personality: 'Apple Ecosystem', features: ['Native Swift development','iOS design guidelines','App Store optimization','Core Data integration','Apple Pay integration','iCloud sync'], benefits: ['Premium user experience','Maximum performance','Apple ecosystem integration','Higher user retention'], tech: ['Swift','SwiftUI','UIKit','Core Data','Xcode'], stat: { n: '50+', l: 'Apps on App Store' } },
  { slug: 'android-app', title: 'Android App Development', subtitle: 'Native Android applications using Kotlin and Java', layout: 'material-cards', personality: 'Material Design', features: ['Kotlin & Java development','Material Design UI','Google Play deployment','Firebase integration','Wear OS support','Android Auto'], benefits: ['Reach Android market share','Custom device features','Google services integration','Flexible deployment'], tech: ['Kotlin','Java','Jetpack Compose','Firebase','Gradle'], stat: { n: '1M+', l: 'Downloads delivered' } },
  { slug: 'flutter-app', title: 'Flutter App Development', subtitle: 'Fast, beautiful cross-platform mobile apps from a single codebase', layout: 'diagonal-dual', personality: 'Cross-Platform Speed', features: ['Single codebase deployment','Custom animations','Hot reload development','Platform-specific UI','State management','Native module integration'], benefits: ['Faster time to market','Cost-effective development','Consistent cross-platform UX','Easy maintenance'], tech: ['Flutter','Dart','Firebase','Provider','Bloc'], stat: { n: '40%', l: 'Dev cost savings' } },
  { slug: 'ecommerce', title: 'E-commerce Development', subtitle: 'Online stores and marketplace solutions with secure payment integration', layout: 'shop-grid', personality: 'Commerce Engine', features: ['Online store development','Marketplace solutions','Payment gateway integration','Inventory management','Order tracking','Multi-vendor support'], benefits: ['Expand sales channels','24/7 revenue generation','Global market reach','Automated order processing'], tech: ['Shopify','WooCommerce','Magento','Stripe','PayPal'], stat: { n: '$50M+', l: 'GMV processed' } },
  { slug: 'shopify', title: 'Shopify Development', subtitle: 'Custom Shopify stores, themes, and app integrations', layout: 'shopify-store', personality: 'Shopify Expert', features: ['Shopify store setup','Custom theme development','App integration','Payment setup','Product migration','SEO optimization'], benefits: ['Quick store launch','Scalable e-commerce','Built-in security','Extensive app ecosystem'], tech: ['Shopify Liquid','Shopify API','JavaScript','GraphQL','Polaris'], stat: { n: '200+', l: 'Stores launched' } },
  { slug: 'magento', title: 'Magento Development', subtitle: 'Enterprise-grade Magento e-commerce solutions and optimization', layout: 'enterprise-stats', personality: 'Enterprise Commerce', features: ['Enterprise Magento development','Performance optimization','Multi-store setup','B2B commerce','Custom extensions','Migration services'], benefits: ['Handle high traffic volumes','Complex catalog management','Enterprise scalability','Advanced customization'], tech: ['Magento 2','PHP','MySQL','Redis','Elasticsearch'], stat: { n: '99.9%', l: 'Uptime SLA' } },
  { slug: 'woocommerce', title: 'WooCommerce Development', subtitle: 'WordPress-powered e-commerce stores with full customization', layout: 'wordpress-blocks', personality: 'WordPress Commerce', features: ['WooCommerce store setup','Custom plugin development','Theme customization','Payment integration','Shipping configuration','Product import/export'], benefits: ['WordPress flexibility','Cost-effective solution','Large plugin ecosystem','Easy content management'], tech: ['WordPress','WooCommerce','PHP','MySQL','Elementor'], stat: { n: '150+', l: 'Stores built' } },
  { slug: 'cms', title: 'CMS Development', subtitle: 'Custom and headless CMS solutions for content-driven businesses', layout: 'editorial-cms', personality: 'Content Architecture', features: ['Custom CMS development','Headless CMS architecture','Content workflow','Multi-language support','Media management','Role-based access'], benefits: ['Easy content updates','Flexible content delivery','Omnichannel publishing','Reduced developer dependency'], tech: ['Strapi','Contentful','Sanity','WordPress','Custom API'], stat: { n: '60%', l: 'Faster publishing' } },
  { slug: 'wordpress', title: 'WordPress Development', subtitle: 'Custom WordPress websites, plugins, and Elementor designs', layout: 'blog-grid', personality: 'WordPress Mastery', features: ['Custom WordPress themes','Plugin development','Elementor page building','Performance optimization','Security hardening','Migration services'], benefits: ['User-friendly management','SEO-friendly structure','Extensive plugin library','Cost-effective maintenance'], tech: ['WordPress','PHP','Elementor','ACF','MySQL'], stat: { n: '300+', l: 'WP sites delivered' } },
  { slug: 'wix', title: 'Wix Development', subtitle: 'Modern Wix websites for small businesses and professionals', layout: 'builder-blocks', personality: 'Visual Builder', features: ['Wix website design','Velo custom code','E-commerce setup','Booking systems','SEO configuration','Domain & hosting setup'], benefits: ['Quick deployment','Drag-and-drop editing','Built-in hosting','Mobile responsive'], tech: ['Wix','Velo','JavaScript','Wix Stores','Wix Bookings'], stat: { n: '2wk', l: 'Avg launch time' } },
  { slug: 'enterprise-solutions', title: 'Enterprise Solutions', subtitle: 'Digital transformation, automation, and scalable infrastructure for large organizations', layout: 'institutional-banner', personality: 'Digital Transformation', features: ['Digital transformation strategy','Enterprise automation','Scalable infrastructure','Legacy modernization','System integration','Change management'], benefits: ['Operational efficiency','Competitive advantage','Future-proof technology','Reduced technical debt'], tech: ['AWS','Azure','Microservices','Docker','Kubernetes'], stat: { n: 'Fortune 500', l: 'Clients served' } },
  { slug: 'erp', title: 'ERP Solutions', subtitle: 'Enterprise resource planning implementation and resource management systems', layout: 'flowchart-erp', personality: 'Resource Orchestration', features: ['ERP implementation','Resource management','Financial modules','Supply chain integration','Custom workflows','Reporting dashboards'], benefits: ['Unified business data','Streamlined operations','Real-time insights','Improved decision making'], tech: ['SAP','Oracle','Microsoft Dynamics','Odoo','Custom ERP'], stat: { n: '35%', l: 'Ops cost reduction' } },
  { slug: 'crm', title: 'CRM Solutions', subtitle: 'Customer relationship management and sales automation platforms', layout: 'pipeline-crm', personality: 'Sales Acceleration', features: ['CRM implementation','Sales automation','Lead management','Customer analytics','Pipeline tracking','Integration services'], benefits: ['Improve customer retention','Boost sales productivity','Centralized customer data','Data-driven sales'], tech: ['Salesforce','HubSpot','Microsoft Dynamics','Zoho','Custom CRM'], stat: { n: '2.5x', l: 'Sales pipeline growth' } },
  { slug: 'business-process', title: 'Business Process Automation', subtitle: 'Workflow automation and process optimization systems', layout: 'workflow-nodes', personality: 'Workflow Intelligence', features: ['Workflow automation','Process optimization','RPA integration','Document management','Approval workflows','KPI tracking'], benefits: ['Reduce manual errors','Faster processing times','Cost reduction','Improved compliance'], tech: ['Power Automate','Zapier','Custom APIs','RPA Tools','Workflow Engines'], stat: { n: '70%', l: 'Manual task reduction' } },
  { slug: 'cloud-solutions', title: 'Cloud Solutions', subtitle: 'Cloud migration, infrastructure setup, and consulting services', layout: 'cloud-float', personality: 'Cloud Native', features: ['Cloud migration','Infrastructure setup','Cloud consulting','Hybrid cloud','Disaster recovery','Cost optimization'], benefits: ['Scalable resources','Reduced IT costs','Enhanced security','Global availability'], tech: ['AWS','Azure','Google Cloud','Docker','Terraform'], stat: { n: '99.99%', l: 'Cloud uptime' } },
  { slug: 'aws', title: 'AWS Cloud Services', subtitle: 'AWS cloud architecture, DevOps, and deployment solutions', layout: 'aws-architecture', personality: 'AWS Certified', features: ['AWS architecture design','DevOps & CI/CD','Serverless solutions','EC2 & Lambda','RDS & DynamoDB','CloudWatch monitoring'], benefits: ['Industry-leading cloud platform','Pay-as-you-go pricing','Global infrastructure','Enterprise security'], tech: ['AWS EC2','Lambda','S3','RDS','CloudFormation'], stat: { n: '100+', l: 'AWS deployments' } },
  { slug: 'azure', title: 'Microsoft Azure Solutions', subtitle: 'Enterprise cloud services on Microsoft Azure platform', layout: 'azure-hex', personality: 'Azure Enterprise', features: ['Azure cloud architecture','Azure DevOps','Active Directory integration','Azure SQL','App Services','Azure AI services'], benefits: ['Microsoft ecosystem integration','Enterprise compliance','Hybrid cloud support','Global data centers'], tech: ['Azure','Azure DevOps','Power Platform','.NET','Azure SQL'], stat: { n: '80+', l: 'Azure migrations' } },
  { slug: 'saas-development', title: 'SaaS Development', subtitle: 'Subscription-based application architecture and platform development', layout: 'subscription-tiers', personality: 'Recurring Revenue', features: ['SaaS platform architecture','Subscription billing','Multi-tenant design','User management','Analytics dashboard','API development'], benefits: ['Recurring revenue model','Scalable user base','Lower customer acquisition cost','Continuous updates'], tech: ['Node.js','React','Stripe','PostgreSQL','AWS'], stat: { n: '$10M+', l: 'ARR enabled' } },
  { slug: 'analytics', title: 'Analytics & Business Intelligence', subtitle: 'Business intelligence dashboards and reporting systems', layout: 'chart-analytics', personality: 'Data Intelligence', features: ['BI dashboard development','Reporting systems','Data warehousing','KPI tracking','Real-time analytics','Custom reports'], benefits: ['Data-driven decisions','Identify growth opportunities','Monitor performance','Predictive insights'], tech: ['Power BI','Tableau','SQL','Python','BigQuery'], stat: { n: '5x', l: 'Faster reporting' } },
  { slug: 'power-bi', title: 'Power BI Development', subtitle: 'Microsoft Power BI dashboards and data visualization solutions', layout: 'bi-dashboard', personality: 'Visual Analytics', features: ['Power BI dashboard design','Data modeling','DAX calculations','Report automation','Embedded analytics','Data gateway setup'], benefits: ['Microsoft integration','Self-service analytics','Interactive visualizations','Real-time data refresh'], tech: ['Power BI','DAX','Power Query','Azure Synapse','SQL Server'], stat: { n: '200+', l: 'Dashboards built' } },
  { slug: 'salesforce', title: 'Salesforce Implementation', subtitle: 'Salesforce CRM implementation and automation services', layout: 'crm-cloud', personality: 'CRM Cloud Leader', features: ['Salesforce implementation','Custom object development','Workflow automation','Integration services','Lightning components','Report & dashboard setup'], benefits: ['Industry-leading CRM','Sales productivity boost','Customer 360 view','Extensive app marketplace'], tech: ['Salesforce','Apex','Lightning','Visualforce','MuleSoft'], stat: { n: '120+', l: 'SF implementations' } },
  { slug: 'dynamics-365', title: 'Microsoft Dynamics 365', subtitle: 'Enterprise productivity and business application integration', layout: 'd365-grid', personality: 'Microsoft 365 Suite', features: ['Dynamics 365 implementation','CRM & ERP modules','Power Platform integration','Custom workflows','Data migration','Training & support'], benefits: ['Unified Microsoft platform','Enterprise scalability','AI-powered insights','Seamless Office 365 integration'], tech: ['Dynamics 365','Power Platform','Azure','.NET','Power Apps'], stat: { n: '90+', l: 'D365 projects' } },
  { slug: 'iot', title: 'Internet of Things (IoT)', subtitle: 'Smart device integration, IoT dashboards, and industrial IoT solutions', layout: 'iot-network', personality: 'Connected Intelligence', features: ['Smart device integration','IoT dashboard systems','Industrial IoT','Sensor data processing','Edge computing','Remote monitoring'], benefits: ['Real-time monitoring','Predictive maintenance','Operational efficiency','Cost savings'], tech: ['AWS IoT','Azure IoT','MQTT','Node.js','Python'], stat: { n: '10K+', l: 'Devices connected' } },
  { slug: 'ai', title: 'Artificial Intelligence', subtitle: 'AI-powered automation, machine learning, and intelligent chatbot solutions', layout: 'neural-ai', personality: 'AI Innovation Lab', features: ['AI-powered automation','Machine learning models','AI chatbot development','Natural language processing','Computer vision','Predictive analytics'], benefits: ['Automate complex tasks','Personalized experiences','Competitive innovation','Data-driven intelligence'], tech: ['OpenAI API','TensorFlow','Python','LangChain','AWS SageMaker'], stat: { n: '85%', l: 'Automation rate' } },
  { slug: 'data-analytics', title: 'Data Analytics', subtitle: 'Big data processing, predictive analytics, and real-time reporting', layout: 'data-streams', personality: 'Big Data Velocity', features: ['Big data processing','Predictive analytics','Real-time reporting','Data pipeline development','ETL processes','Data visualization'], benefits: ['Uncover hidden patterns','Forecast trends','Optimize operations','Reduce risks'], tech: ['Python','Apache Spark','SQL','Power BI','AWS Redshift'], stat: { n: 'PB+', l: 'Data processed' } },
];

function esc(s) { return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;'); }

function breadcrumb(title) {
  return `<nav class="text-sm text-slate-500 mb-6 sp-reveal" aria-label="Breadcrumb"><a href="../../index.html" class="hover:text-[#002080]">Home</a> <span class="mx-2">/</span> <a href="#" class="hover:text-[#002080]">Services</a> <span class="mx-2">/</span> <span class="text-[#2563EB] font-medium">${esc(title)}</span></nav>`;
}

function ctas() {
  return `<div class="flex flex-wrap gap-4 sp-reveal sp-d2">
    <a href="../contact.html" class="sp-btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-sm">Get Free Consultation <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg></a>
    <a href="../portfolio.html" class="sp-btn-outline inline-flex items-center gap-2 px-7 py-3.5 text-sm">View Our Work</a>
  </div>`;
}

function featureList(features) {
  return `<ul class="space-y-3">${features.map(f => `<li class="flex items-start gap-3 sp-reveal"><svg class="w-5 h-5 text-[#10A5F5] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg><span class="text-slate-600">${esc(f)}</span></li>`).join('')}</ul>`;
}

function techPills(tech) {
  return `<div class="flex flex-wrap gap-2">${tech.map(t => `<span class="px-4 py-2 bg-[#F3F6FB] border border-slate-200 rounded-xl text-sm font-medium text-[#002080] hover:border-[#2563EB] hover:text-[#2563EB] transition-colors">${esc(t)}</span>`).join('')}</div>`;
}

function sharedSections(s) {
  return `
    <section class="py-20 sp-section-gray">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl sm:text-3xl font-bold text-[#002080] mb-8 sp-reveal">Technologies We Use</h2>
        <div class="sp-reveal sp-d1">${techPills(s.tech)}</div>
      </div>
    </section>
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl sm:text-3xl font-bold text-[#002080] mb-12 text-center sp-reveal">Our Process</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          ${['Discovery','Strategy','Development','Launch'].map((step, i) => `
          <div class="sp-card p-6 text-center sp-reveal sp-d${i+1}">
            <div class="w-12 h-12 rounded-xl ${i===0||i===3 ? 'bg-[#002080] text-white' : 'bg-[#F3F6FB] text-[#002080]'} flex items-center justify-center font-bold mx-auto mb-4">${String(i+1).padStart(2,'0')}</div>
            <h3 class="font-semibold text-[#002080] mb-2">${step}</h3>
            <p class="text-slate-500 text-sm">${['Understanding goals & requirements','Architecture & roadmap planning','Agile build with regular updates','Deployment & ongoing support'][i]}</p>
          </div>`).join('')}
        </div>
      </div>
    </section>
    <section class="py-20 sp-section-navy">
      <div class="max-w-4xl mx-auto px-4 text-center sp-reveal">
        <h2 class="text-3xl sm:text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
        <p class="text-white/60 mb-8">Let's discuss how our ${esc(s.title)} expertise can accelerate your goals.</p>
        <a href="../contact.html" class="inline-flex px-8 py-4 bg-white text-[#002080] font-semibold rounded-xl hover:shadow-xl transition-all text-sm">Start Your Project</a>
      </div>
    </section>`;
}

const HEROES = {
  'browser-split': (s) => `
    <section class="pt-28 pb-16 lg:pb-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        ${breadcrumb(s.title)}
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="sp-reveal-left">
            <span class="sp-badge bg-[#F3F6FB] text-[#2563EB] border border-blue-100 mb-6">${esc(s.personality)}</span>
            <h1 class="text-4xl sm:text-5xl font-bold text-[#002080] leading-tight mb-5">${esc(s.title)}</h1>
            <p class="text-lg text-slate-500 mb-8 leading-relaxed">${esc(s.subtitle)}</p>
            ${ctas()}
          </div>
          <div class="hero-browser sp-reveal-right sp-d2 bg-white">
            <div class="bg-[#F3F6FB] px-4 py-3 flex items-center gap-2 border-b border-slate-200">
              <div class="flex gap-1.5"><div class="w-3 h-3 rounded-full bg-red-400"></div><div class="w-3 h-3 rounded-full bg-yellow-400"></div><div class="w-3 h-3 rounded-full bg-green-400"></div></div>
              <div class="flex-1 mx-4 h-6 bg-white rounded-md border border-slate-200 text-[10px] text-slate-400 flex items-center px-3">https://yourbusiness.com</div>
            </div>
            <div class="p-6 bg-gradient-to-br from-[#F3F6FB] to-white min-h-[280px]">
              <div class="h-4 w-3/4 bg-[#002080]/10 rounded mb-3"></div>
              <div class="h-3 w-full bg-slate-200 rounded mb-2"></div>
              <div class="h-3 w-5/6 bg-slate-200 rounded mb-6"></div>
              <div class="grid grid-cols-3 gap-3">${[1,2,3].map(()=>'<div class="h-20 bg-white border border-slate-100 rounded-lg shadow-sm"></div>').join('')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-20 sp-section-gray"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12"><div class="sp-reveal"><h2 class="text-2xl font-bold text-[#002080] mb-6">What We Deliver</h2>${featureList(s.features)}</div><div class="grid sm:grid-cols-2 gap-4 sp-reveal sp-d2">${s.benefits.map(b=>`<div class="sp-card p-5"><p class="font-medium text-[#002080]">${esc(b)}</p></div>`).join('')}</div></div></section>`,

  'corporate-timeline': (s) => `
    <section class="pt-28 pb-20 bg-gradient-to-b from-[#F3F6FB] to-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        ${breadcrumb(s.title)}
        <div class="max-w-3xl sp-reveal">
          <span class="sp-badge bg-white text-[#002080] border border-slate-200 mb-6">${esc(s.personality)}</span>
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#002080] mb-5">${esc(s.title)}</h1>
          <p class="text-xl text-slate-500 mb-8">${esc(s.subtitle)}</p>
          ${ctas()}
        </div>
      </div>
    </section>
    <section class="py-20"><div class="max-w-3xl mx-auto px-4">${s.features.map((f,i)=>`<div class="timeline-item relative pl-12 pb-10 sp-reveal sp-d${Math.min(i+1,4)}"><div class="absolute left-0 w-10 h-10 rounded-full bg-[#002080] text-white flex items-center justify-center text-sm font-bold">${i+1}</div><h3 class="font-semibold text-[#002080] mb-1">${esc(f)}</h3><p class="text-slate-500 text-sm">${esc(s.benefits[i % s.benefits.length])}</p></div>`).join('')}</div></section>`,

  'dashboard-saas': (s) => `
    <section class="pt-28 pb-16 bg-[#002080] text-white relative overflow-hidden">
      <div class="absolute inset-0 opacity-20" style="background-image:linear-gradient(rgba(37,99,235,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.3) 1px,transparent 1px);background-size:40px 40px"></div>
      <div class="max-w-7xl mx-auto px-4 relative">
        ${breadcrumb(s.title).replace('text-slate-500','text-white/50').replace('hover:text-[#002080]','hover:text-white').replace('text-[#2563EB]','text-cyan-400')}
        <div class="grid lg:grid-cols-2 gap-12 items-center py-8">
          <div class="sp-reveal-left"><span class="sp-badge bg-white/10 text-cyan-400 mb-6">${esc(s.personality)}</span><h1 class="text-4xl sm:text-5xl font-bold mb-5">${esc(s.title)}</h1><p class="text-white/60 text-lg mb-8">${esc(s.subtitle)}</p>${ctas().replace('sp-btn-outline','sp-btn-outline border-white/30 text-white hover:bg-white hover:text-[#002080]')}</div>
          <div class="metric-pulse sp-card-navy p-6 sp-reveal-right"><div class="grid grid-cols-2 gap-4 mb-4">${['Users','Revenue','Uptime','API'].map((l,i)=>`<div class="bg-white/10 rounded-xl p-4"><p class="text-xs text-white/50">${l}</p><p class="text-2xl font-bold text-cyan-400">${['847K','$2.4M','99.9%','12M'][i]}</p></div>`).join('')}</div><div class="h-24 bg-white/5 rounded-xl flex items-end gap-2 p-4">${[40,65,45,80,55,90,70].map(h=>`<div class="flex-1 bg-gradient-to-t from-[#2563EB] to-cyan-400 rounded-t" style="height:${h}%"></div>`).join('')}</div></div>
        </div>
      </div>
    </section>
    <section class="py-20"><div class="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6">${s.features.slice(0,6).map((f,i)=>`<div class="sp-card p-6 sp-reveal sp-d${(i%4)+1}"><div class="w-10 h-10 rounded-lg bg-[#F3F6FB] flex items-center justify-center text-[#2563EB] font-bold mb-4">${i+1}</div><h3 class="font-semibold text-[#002080] mb-2">${esc(f)}</h3></div>`).join('')}</div></section>`,

  'phone-showcase': (s) => `
    <section class="pt-28 pb-20 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4">
        ${breadcrumb(s.title)}
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div class="order-2 lg:order-1 flex justify-center sp-reveal">
            <div class="phone-frame w-56 bg-[#002080] p-3">
              <div class="bg-white rounded-[1.4rem] overflow-hidden h-[420px]">
                <div class="h-8 bg-[#F3F6FB] flex items-center justify-center"><div class="w-16 h-4 bg-[#002080]/10 rounded-full"></div></div>
                <div class="p-4 space-y-3">${[1,2,3,4].map(()=>'<div class="h-12 bg-[#F3F6FB] rounded-xl"></div>').join('')}</div>
              </div>
            </div>
          </div>
          <div class="order-1 lg:order-2 sp-reveal-right"><span class="sp-badge bg-[#F3F6FB] text-[#002080] mb-6">${esc(s.personality)}</span><h1 class="text-4xl sm:text-5xl font-bold text-[#002080] mb-5">${esc(s.title)}</h1><p class="text-slate-500 text-lg mb-6">${esc(s.subtitle)}</p><p class="text-3xl font-bold sp-gradient-text mb-8">${esc(s.stat.n)} <span class="text-base font-normal text-slate-400">${esc(s.stat.l)}</span></p>${ctas()}</div>
        </div>
      </div>
    </section>
    <section class="py-20 sp-section-gray"><div class="max-w-7xl mx-auto px-4"><h2 class="text-2xl font-bold text-[#002080] mb-8 sp-reveal">Capabilities</h2>${featureList(s.features)}</div></section>`,

  'ios-minimal': (s) => `
    <section class="pt-32 pb-24 text-center">
      <div class="max-w-4xl mx-auto px-4 sp-reveal">
        ${breadcrumb(s.title)}
        <span class="sp-badge bg-[#F3F6FB] text-[#002080] mb-8">${esc(s.personality)}</span>
        <h1 class="hero-title text-5xl sm:text-6xl lg:text-7xl font-bold text-[#002080] tracking-tight mb-6">${esc(s.title)}</h1>
        <p class="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">${esc(s.subtitle)}</p>
        ${ctas()}
        <div class="flex flex-wrap justify-center gap-3 mt-16">${s.features.map(f=>`<span class="feature-pill px-5 py-2 bg-[#F3F6FB] border border-slate-200 text-sm text-[#002080]">${esc(f)}</span>`).join('')}</div>
      </div>
    </section>
    <section class="py-20 sp-section-gray"><div class="max-w-7xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-6">${s.benefits.map((b,i)=>`<div class="sp-card p-6 sp-reveal sp-d${i+1}"><h3 class="font-semibold text-[#002080]">${esc(b)}</h3></div>`).join('')}</div></section>`,

  'material-cards': (s) => `
    <section class="pt-28 pb-16 bg-gradient-to-br from-[#F3F6FB] via-white to-[#F3F6FB]">
      <div class="max-w-7xl mx-auto px-4">${breadcrumb(s.title)}<div class="sp-reveal"><span class="sp-badge bg-[#2563EB] text-white mb-6">${esc(s.personality)}</span><h1 class="text-4xl sm:text-5xl font-bold text-[#002080] mb-4">${esc(s.title)}</h1><p class="text-slate-500 text-lg max-w-2xl mb-8">${esc(s.subtitle)}</p>${ctas()}</div></div>
    </section>
    <section class="py-20"><div class="max-w-7xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">${s.features.map((f,i)=>`<div class="material-card sp-card p-6 sp-reveal" style="transition-delay:${i*0.08}s"><div class="w-12 h-12 rounded-full bg-[#2563EB] text-white flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg></div><h3 class="font-semibold text-[#002080]">${esc(f)}</h3></div>`).join('')}</div></section>`,

  'diagonal-dual': (s) => `
    <section class="relative pt-28 pb-20"><div class="diag-bg absolute inset-0 -z-10"></div>
      <div class="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">${breadcrumb(s.title)}<div class="lg:col-span-2 grid lg:grid-cols-2 gap-12 items-center -mt-8">
        <div class="sp-reveal-left"><h1 class="text-4xl sm:text-5xl font-bold text-[#002080] mb-5">${esc(s.title)}</h1><p class="text-slate-500 mb-8">${esc(s.subtitle)}</p>${ctas()}</div>
        <div class="grid grid-cols-2 gap-4 sp-reveal-right"><div class="sp-card p-6 bg-[#002080] text-white rounded-2xl"><p class="text-cyan-400 text-sm mb-2">iOS</p><p class="font-bold">Native feel</p></div><div class="sp-card p-6 mt-8"><p class="text-[#2563EB] text-sm mb-2">Android</p><p class="font-bold text-[#002080]">Material UI</p></div><div class="sp-card p-6 -mt-4 col-span-2 text-center"><p class="text-sm text-slate-500">One Flutter codebase</p><p class="text-2xl font-bold sp-gradient-text">Deploy everywhere</p></div></div>
      </div></div>
    </section>
    <section class="py-20"><div class="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12"><div class="sp-reveal">${featureList(s.features)}</div><div class="sp-card-navy p-8 sp-reveal sp-d2"><h2 class="text-xl font-bold mb-6">Key Benefits</h2><ul class="space-y-4">${s.benefits.map(b=>`<li class="flex gap-3 text-white/80"><span class="text-cyan-400">→</span>${esc(b)}</li>`).join('')}</ul></div></div></section>`,

  'shop-grid': (s) => `
    <section class="pt-28 pb-12 bg-white"><div class="max-w-7xl mx-auto px-4">${breadcrumb(s.title)}<div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sp-reveal"><div><span class="sp-badge bg-[#F3F6FB] text-[#002080] mb-4">${esc(s.personality)}</span><h1 class="text-4xl sm:text-5xl font-bold text-[#002080]">${esc(s.title)}</h1><p class="text-slate-500 mt-4 max-w-xl">${esc(s.subtitle)}</p></div>${ctas()}</div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">${[1,2,3,4].map(i=>`<div class="product-tile sp-card overflow-hidden sp-reveal sp-d${i}"><div class="h-32 bg-gradient-to-br from-[#F3F6FB] to-slate-100"></div><div class="p-4"><div class="h-3 w-2/3 bg-slate-200 rounded mb-2"></div><p class="text-[#2563EB] font-bold">$${99+i*20}</p></div></div>`).join('')}</div></div></section>
    <section class="py-20 sp-section-gray"><div class="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12"><div class="sp-reveal"><h2 class="text-2xl font-bold text-[#002080] mb-6">Store Features</h2>${featureList(s.features)}</div><div class="grid grid-cols-2 gap-4 sp-reveal sp-d2">${s.benefits.map(b=>`<div class="sp-card p-5 text-center"><p class="font-medium text-[#002080] text-sm">${esc(b)}</p></div>`).join('')}</div></div></section>`,

  'shopify-store': (s) => `
    <section class="pt-28 pb-0"><div class="store-header py-3 text-center text-white text-sm font-medium">Powered by Shopify Expert Development</div>
      <div class="max-w-7xl mx-auto px-4 py-16">${breadcrumb(s.title)}<div class="grid lg:grid-cols-2 gap-12 items-center sp-reveal"><div><h1 class="text-4xl font-bold text-[#002080] mb-4">${esc(s.title)}</h1><p class="text-slate-500 mb-6">${esc(s.subtitle)}</p>${ctas()}</div><div class="sp-card p-6 border-2 border-[#95BF47]/30"><div class="flex gap-3 mb-4">${['Home','Products','Cart'].map(t=>`<span class="text-sm ${t==='Products'?'accent-green font-semibold':'text-slate-400'}">${t}</span>`).join('')}</div><div class="grid grid-cols-2 gap-3">${[1,2,3,4].map(()=>'<div class="aspect-square bg-[#F3F6FB] rounded-lg"></div>').join('')}</div></div></div></div></section>
    <section class="py-20"><div class="max-w-7xl mx-auto px-4">${featureList(s.features)}</div></section>`,

  'enterprise-stats': (s) => `
    <section class="pt-28 pb-20"><div class="max-w-7xl mx-auto px-4">${breadcrumb(s.title)}<h1 class="text-4xl sm:text-6xl font-bold text-[#002080] mb-4 sp-reveal">${esc(s.title)}</h1><p class="text-xl text-slate-500 max-w-2xl mb-12 sp-reveal sp-d1">${esc(s.subtitle)}</p>
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">${[{n:'500+',l:'Enterprise clients'},{n:s.stat.n,l:s.stat.l},{n:'24/7',l:'Support SLA'},{n:'15+',l:'Years experience'}].map((st,i)=>`<div class="stat-block sp-card p-6 sp-reveal sp-d${i+1}"><p class="text-3xl font-bold text-[#2563EB]">${st.n}</p><p class="text-slate-500 text-sm mt-1">${st.l}</p></div>`).join('')}</div>${ctas()}</div></section>
    <section class="py-20 sp-section-gray"><div class="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">${featureList(s.features)}<div class="sp-reveal sp-d2">${s.benefits.map(b=>`<div class="border-l-4 border-[#002080] pl-4 mb-6"><p class="font-semibold text-[#002080]">${esc(b)}</p></div>`).join('')}</div></div></section>`,

  'wordpress-blocks': (s) => `
    <section class="pt-28 pb-16"><div class="max-w-7xl mx-auto px-4">${breadcrumb(s.title)}<div class="sp-reveal mb-12"><h1 class="text-4xl font-bold text-[#002080] mb-4">${esc(s.title)}</h1><p class="text-slate-500">${esc(s.subtitle)}</p></div>
    <div class="grid lg:grid-cols-3 gap-6">${s.features.map((f,i)=>`<div class="wp-block sp-card p-6 sp-reveal sp-d${(i%4)+1}"><h3 class="font-semibold text-[#002080] mb-2">${esc(f)}</h3><p class="text-slate-500 text-sm">${esc(s.benefits[i % s.benefits.length])}</p></div>`).join('')}</div><div class="mt-10">${ctas()}</div></div></section>`,

  'editorial-cms': (s) => `
    <section class="pt-28 pb-12 bg-[#F3F6FB]"><div class="max-w-4xl mx-auto px-4 text-center sp-reveal">${breadcrumb(s.title)}<h1 class="text-4xl sm:text-5xl font-serif font-bold text-[#002080] mb-5" style="font-family:Georgia,serif">${esc(s.title)}</h1><p class="text-lg text-slate-600 italic mb-8">${esc(s.subtitle)}</p>${ctas()}</div></section>
    <section class="py-20"><div class="max-w-4xl mx-auto px-4 editorial-col gap-8 sp-reveal">${s.features.map(f=>`<div class="sp-card p-5 mb-6 break-inside-avoid"><h3 class="font-semibold text-[#002080]">${esc(f)}</h3></div>`).join('')}</div></section>`,

  'blog-grid': (s) => `
    <section class="pt-28 pb-16"><div class="max-w-7xl mx-auto px-4">${breadcrumb(s.title)}<div class="grid lg:grid-cols-3 gap-8"><div class="lg:col-span-1 sp-reveal"><h1 class="text-3xl font-bold text-[#002080] mb-4">${esc(s.title)}</h1><p class="text-slate-500 mb-6">${esc(s.subtitle)}</p>${ctas()}</div><div class="lg:col-span-2 grid sm:grid-cols-2 gap-4">${s.features.map((f,i)=>`<article class="sp-card p-5 sp-reveal sp-d${(i%4)+1}"><div class="h-24 bg-[#F3F6FB] rounded-lg mb-3"></div><h3 class="font-semibold text-[#002080] text-sm">${esc(f)}</h3></article>`).join('')}</div></div></div></section>`,

  'builder-blocks': (s) => `
    <section class="pt-28 pb-20 overflow-hidden"><div class="max-w-7xl mx-auto px-4">${breadcrumb(s.title)}<div class="grid lg:grid-cols-2 gap-12 items-center"><div class="sp-reveal"><h1 class="text-4xl font-bold text-[#002080] mb-4">${esc(s.title)}</h1><p class="text-slate-500 mb-8">${esc(s.subtitle)}</p>${ctas()}</div><div class="relative h-80 sp-reveal-right">${['Header','Hero','Gallery','Contact'].map((l,i)=>`<div class="drag-block absolute sp-card px-6 py-4 cursor-grab shadow-lg" style="top:${i*18}%;left:${i*12}%;transform:rotate(${(i-1.5)*3}deg)"><span class="text-xs text-slate-400">Block</span><p class="font-semibold text-[#002080]">${l}</p></div>`).join('')}</div></div></div></section>
    <section class="py-20 sp-section-gray"><div class="max-w-7xl mx-auto px-4">${featureList(s.features)}</div></section>`,

  'institutional-banner': (s) => `
    <section class="relative pt-28 pb-24 bg-[#002080] text-white overflow-hidden"><div class="banner-stripe"></div>
      <div class="max-w-7xl mx-auto px-4 relative">${breadcrumb(s.title).replace(/text-slate-500/g,'text-white/50').replace(/hover:text-\[#002080\]/g,'hover:text-white').replace(/text-\[#2563EB\]/g,'text-cyan-400')}
      <div class="max-w-3xl sp-reveal"><span class="sp-badge bg-white/10 text-cyan-400 mb-6">${esc(s.personality)}</span><h1 class="text-4xl sm:text-6xl font-bold mb-6">${esc(s.title)}</h1><p class="text-white/60 text-xl mb-10">${esc(s.subtitle)}</p>${ctas().replace('sp-btn-outline','border border-white/30 text-white px-7 py-3.5 rounded-xl inline-flex')}</div></div></section>
    <section class="py-24 -mt-12 relative z-10"><div class="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6">${s.benefits.map((b,i)=>`<div class="sp-card bg-white p-8 sp-reveal sp-d${i+1} shadow-xl"><p class="text-2xl font-bold text-[#2563EB] mb-2">${['Efficiency','Scale','Future-proof'][i]}</p><p class="text-[#002080] font-medium">${esc(b)}</p></div>`).join('')}</div></section>
    <section class="py-20 sp-section-gray"><div class="max-w-7xl mx-auto px-4">${featureList(s.features)}</div></section>`,

  'flowchart-erp': (s) => `
    <section class="pt-28 pb-16"><div class="max-w-7xl mx-auto px-4">${breadcrumb(s.title)}<h1 class="text-4xl font-bold text-[#002080] mb-4 sp-reveal">${esc(s.title)}</h1><p class="text-slate-500 mb-12 sp-reveal">${esc(s.subtitle)}</p>
    <div class="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">${s.features.slice(0,4).map((f,i)=>`<div class="flow-node sp-card px-6 py-4 text-center min-w-[140px] sp-reveal sp-d${i+1}"><p class="font-semibold text-[#002080] text-sm">${esc(f)}</p>${i<3?'<div class="hidden md:block absolute">→</div>':''}</div>`).join('<span class="text-2xl text-[#2563EB] hidden md:block">→</span>')}</div>${ctas()}</div></section>
    <section class="py-20 sp-section-gray"><div class="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-6">${s.features.slice(4).map(f=>`<div class="sp-card p-5 sp-reveal"><p class="font-medium text-[#002080]">${esc(f)}</p></div>`).join('')}${s.benefits.map(b=>`<div class="sp-card-navy p-5 sp-reveal text-white/90">${esc(b)}</div>`).join('')}</div></section>`,

  'pipeline-crm': (s) => `
    <section class="pt-28 pb-20 bg-gradient-to-b from-white to-[#F3F6FB]"><div class="max-w-7xl mx-auto px-4">${breadcrumb(s.title)}<div class="sp-reveal mb-12"><h1 class="text-4xl font-bold text-[#002080] mb-4">${esc(s.title)}</h1><p class="text-slate-500">${esc(s.subtitle)}</p></div>
    <div class="flex flex-col md:flex-row gap-3 mb-12">${['Leads','Qualified','Proposal','Closed'].map((stage,i)=>`<div class="pipeline-stage sp-card p-6 sp-reveal sp-d${i+1} bg-gradient-to-b from-white to-[#F3F6FB]"><p class="text-xs text-slate-400 uppercase tracking-wider mb-2">${stage}</p><p class="font-bold text-[#002080]">${esc(s.features[i] || stage)}</p><div class="mt-4 h-2 bg-slate-200 rounded-full"><div class="h-full bg-[#2563EB] rounded-full" style="width:${(i+1)*25}%"></div></div></div>`).join('')}</div>${ctas()}</div></section>
    <section class="py-20"><div class="max-w-7xl mx-auto px-4">${featureList(s.features)}</div></section>`,

  'workflow-nodes': (s) => `
    <section class="pt-28 pb-16"><div class="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">${breadcrumb(s.title)}<div class="lg:col-span-2 grid lg:grid-cols-2 gap-12 -mt-6"><div class="sp-reveal"><h1 class="text-4xl font-bold text-[#002080] mb-4">${esc(s.title)}</h1><p class="text-slate-500 mb-8">${esc(s.subtitle)}</p>${ctas()}</div>
    <div class="relative sp-reveal-right"><svg id="workflow-svg" class="absolute inset-0 w-full h-full" viewBox="0 0 300 200"><path class="wf-connector" d="M50,100 L150,50 L250,100 L150,150 Z" fill="none" stroke="#2563EB" stroke-width="2" opacity="0.3"/></svg>${s.features.slice(0,4).map((f,i)=>{const pos=[[20,40],[60,10],[60,70],[20,85]][i];return `<div class="absolute sp-card p-3 text-xs font-medium text-[#002080]" style="top:${pos[0]}%;left:${pos[1]}%">${esc(f.split(' ')[0])}</div>`}).join('')}</div></div></div></section>
    <section class="py-20 sp-section-gray"><div class="max-w-7xl mx-auto px-4 grid sm:grid-cols-2 gap-4">${s.benefits.map(b=>`<div class="sp-card p-6 sp-reveal"><p class="font-semibold text-[#002080]">${esc(b)}</p></div>`).join('')}</div></section>`,

  'cloud-float': (s) => `
    <section class="pt-28 pb-24 relative overflow-hidden"><div class="max-w-7xl mx-auto px-4 relative z-10">${breadcrumb(s.title)}<div class="grid lg:grid-cols-2 gap-12 items-center"><div class="sp-reveal"><h1 class="text-4xl sm:text-5xl font-bold text-[#002080] mb-5">${esc(s.title)}</h1><p class="text-slate-500 mb-8">${esc(s.subtitle)}</p>${ctas()}</div><div class="relative h-64 sp-reveal-right">${[0,1,2].map(i=>`<div class="cloud-icon absolute sp-card p-6 ${i===1?'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 shadow-xl':i===0?'top-4 left-8':'bottom-4 right-8'}"><svg class="w-10 h-10 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/></svg></div>`).join('')}</div></div></div></section>
    <section class="py-20"><div class="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12"><div class="sp-reveal">${featureList(s.features)}</div><div class="sp-card-navy p-8 sp-reveal sp-d2"><p class="text-cyan-400 text-sm mb-2">${esc(s.stat.n)}</p><p class="text-3xl font-bold mb-4">${esc(s.stat.l)}</p><ul class="space-y-2 text-white/70 text-sm">${s.benefits.map(b=>`<li>• ${esc(b)}</li>`).join('')}</ul></div></div></section>`,

  'aws-architecture': (s) => `
    <section class="pt-28 pb-16"><div class="max-w-7xl mx-auto px-4">${breadcrumb(s.title)}<div class="sp-reveal mb-10"><span class="sp-badge bg-[#FFF4E5] accent-aws mb-4">AWS Partner</span><h1 class="text-4xl font-bold text-[#002080] mb-4">${esc(s.title)}</h1><p class="text-slate-500">${esc(s.subtitle)}</p></div>
    <div class="space-y-4 mb-12">${['Application Layer','Compute & Storage','Database & Cache','Monitoring'].map((layer,i)=>`<div class="aws-layer sp-card p-5 sp-reveal sp-d${i+1}"><p class="text-xs accent-aws font-semibold uppercase mb-2">${layer}</p><p class="text-[#002080] font-medium">${esc(s.features[i])}</p></div>`).join('')}</div>${ctas()}</div></section>
    <section class="py-20 sp-section-gray"><div class="max-w-7xl mx-auto px-4">${featureList(s.features.slice(4))}</div></section>`,

  'azure-hex': (s) => `
    <section class="pt-28 pb-20 azure-hex relative"><div class="max-w-7xl mx-auto px-4 relative">${breadcrumb(s.title)}<div class="grid lg:grid-cols-2 gap-12 items-center"><div class="sp-reveal"><h1 class="text-4xl font-bold text-[#002080] mb-4">${esc(s.title)}</h1><p class="text-slate-500 mb-8">${esc(s.subtitle)}</p>${ctas()}</div><div class="grid grid-cols-3 gap-3 sp-reveal-right">${s.features.slice(0,6).map(f=>`<div class="sp-card p-4 text-center aspect-square flex items-center justify-center"><p class="text-xs font-semibold text-[#002080]">${esc(f.split(' ')[0])}</p></div>`).join('')}</div></div></div></section>
    <section class="py-20"><div class="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">${s.benefits.map(b=>`<div class="sp-card p-6 border-l-4 border-[#2563EB] sp-reveal"><p class="font-semibold text-[#002080]">${esc(b)}</p></div>`).join('')}</div></section>`,

  'subscription-tiers': (s) => `
    <section class="pt-28 pb-12 text-center"><div class="max-w-7xl mx-auto px-4 sp-reveal">${breadcrumb(s.title)}<h1 class="text-4xl font-bold text-[#002080] mb-4">${esc(s.title)}</h1><p class="text-slate-500 max-w-2xl mx-auto mb-12">${esc(s.subtitle)}</p></div>
    <div class="max-w-5xl mx-auto px-4 grid md:grid-cols-3 gap-6 items-end mb-12">${['Starter','Professional','Enterprise'].map((tier,i)=>`<div class="tier-card sp-card p-8 sp-reveal sp-d${i+1} ${i===1?'featured':''}"><p class="text-sm text-slate-400 mb-2">${tier}</p><p class="text-2xl font-bold text-[#002080] mb-4">${esc(s.features[i])}</p><p class="text-slate-500 text-sm">${esc(s.benefits[i % s.benefits.length])}</p></div>`).join('')}</div><div class="text-center">${ctas()}</div></section>
    <section class="py-20 sp-section-gray"><div class="max-w-7xl mx-auto px-4">${featureList(s.features.slice(3))}</div></section>`,

  'chart-analytics': (s) => `
    <section class="pt-28 pb-16 bg-[#002080] text-white"><div class="max-w-7xl mx-auto px-4">${breadcrumb(s.title).replace(/text-slate-500/g,'text-white/50').replace(/hover:text-\[#002080\]/g,'hover:text-white')}
    <div class="grid lg:grid-cols-2 gap-12 items-center py-8"><div class="sp-reveal"><h1 class="text-4xl font-bold mb-4">${esc(s.title)}</h1><p class="text-white/60 mb-8">${esc(s.subtitle)}</p>${ctas()}</div>
    <div class="flex items-end gap-3 h-48 sp-reveal-right">${[45,70,55,90,65,80,50].map((h,i)=>`<div class="bar-animate flex-1 bg-gradient-to-t from-[#2563EB] to-cyan-400 rounded-t-lg" style="height:${h}%"></div>`).join('')}</div></div></div></section>
    <section class="py-20"><div class="max-w-7xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6">${s.features.map((f,i)=>`<div class="sp-card p-6 sp-reveal"><h3 class="font-semibold text-[#002080]">${esc(f)}</h3></div>`).join('')}</div></section>`,

  'bi-dashboard': (s) => `
    <section class="pt-28 pb-20"><div class="max-w-7xl mx-auto px-4">${breadcrumb(s.title)}<div class="grid lg:grid-cols-2 gap-12 items-center"><div class="sp-reveal"><h1 class="text-4xl font-bold text-[#002080] mb-4">${esc(s.title)}</h1><p class="text-slate-500 mb-8">${esc(s.subtitle)}</p>${ctas()}</div>
    <div class="sp-card p-8 sp-reveal-right"><div class="flex items-center justify-center"><div class="donut-spin w-40 h-40 rounded-full border-[12px] border-[#F3F6FB] border-t-[#2563EB] border-r-cyan-400 flex items-center justify-center"><span class="text-2xl font-bold text-[#002080]">78%</span></div></div><div class="grid grid-cols-3 gap-2 mt-6">${['Sales','Ops','Marketing'].map(l=>`<div class="text-center"><p class="text-xs text-slate-400">${l}</p><p class="font-bold text-[#2563EB]">${Math.floor(Math.random()*40+30)}%</p></div>`).join('')}</div></div></div></div></section>
    <section class="py-20 sp-section-gray"><div class="max-w-7xl mx-auto px-4">${featureList(s.features)}</div></section>`,

  'crm-cloud': (s) => `
    <section class="pt-28 pb-20 overflow-hidden"><div class="max-w-7xl mx-auto px-4 text-center sp-reveal">${breadcrumb(s.title)}<h1 class="text-4xl font-bold text-[#002080] mb-4">${esc(s.title)}</h1><p class="text-slate-500 max-w-2xl mx-auto mb-16">${esc(s.subtitle)}</p>
    <div class="relative w-64 h-64 mx-auto mb-12"><div class="absolute inset-0 flex items-center justify-center"><div class="w-20 h-20 rounded-full bg-[#002080] text-white flex items-center justify-center font-bold z-10">CRM</div></div><div class="orbit-dot absolute top-1/2 left-1/2 w-4 h-4 -ml-2 -mt-2 rounded-full bg-[#2563EB]"></div></div>${ctas()}</div></section>
    <section class="py-20"><div class="max-w-7xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">${s.features.map((f,i)=>`<div class="sp-card p-6 sp-reveal sp-d${(i%4)+1}"><h3 class="font-semibold text-[#002080]">${esc(f)}</h3></div>`).join('')}</div></section>`,

  'd365-grid': (s) => `
    <section class="pt-28 pb-16 bg-[#F3F6FB]"><div class="max-w-7xl mx-auto px-4">${breadcrumb(s.title)}<h1 class="text-4xl font-bold text-[#002080] mb-4 sp-reveal">${esc(s.title)}</h1><p class="text-slate-500 mb-10 sp-reveal">${esc(s.subtitle)}</p>
    <div class="grid grid-cols-3 md:grid-cols-6 gap-2 mb-12">${s.features.map((f,i)=>`<div class="module-cell sp-card flex items-center justify-center p-4 sp-reveal sp-d${(i%4)+1}"><p class="text-[10px] sm:text-xs font-semibold text-[#002080] text-center">${esc(f.split(' ')[0])}</p></div>`).join('')}</div>${ctas()}</div></section>
    <section class="py-20"><div class="max-w-7xl mx-auto px-4">${s.benefits.map(b=>`<div class="sp-card p-5 mb-4 sp-reveal flex items-center gap-4"><div class="w-2 h-2 rounded-full bg-[#2563EB]"></div><p class="font-medium text-[#002080]">${esc(b)}</p></div>`).join('')}</div></section>`,

  'iot-network': (s) => `
    <section class="pt-28 pb-20"><div class="max-w-7xl mx-auto px-4">${breadcrumb(s.title)}<div class="grid lg:grid-cols-2 gap-12 items-center"><div class="sp-reveal"><h1 class="text-4xl font-bold text-[#002080] mb-4">${esc(s.title)}</h1><p class="text-slate-500 mb-8">${esc(s.subtitle)}</p>${ctas()}</div>
    <div class="relative h-72 bg-[#F3F6FB] rounded-2xl sp-reveal-right">${[[20,20],[70,15],[80,60],[30,70],[50,45]].map(([t,l],i)=>`<button class="iot-node absolute w-10 h-10 rounded-full bg-[#2563EB] text-white text-xs flex items-center justify-center shadow-lg cursor-pointer" style="top:${t}%;left:${l}%">${i+1}</button>`).join('')}<svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">${[[20,20,50,45],[70,15,50,45],[80,60,50,45],[30,70,50,45]].map(([x1,y1,x2,y2])=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#2563EB" stroke-width="0.5" opacity="0.4"/>`).join('')}</svg></div></div></div></section>
    <section class="py-20 sp-section-gray"><div class="max-w-7xl mx-auto px-4">${featureList(s.features)}</div></section>`,

  'neural-ai': (s) => `
    <section class="pt-28 pb-16 neural-bg relative overflow-hidden"><canvas id="neural-canvas" class="absolute inset-0 w-full h-full opacity-40 pointer-events-none"></canvas>
      <div class="max-w-7xl mx-auto px-4 relative z-10 text-center sp-reveal">${breadcrumb(s.title)}<span class="sp-badge bg-[#002080] text-cyan-400 mb-6">${esc(s.personality)}</span><h1 class="text-4xl sm:text-6xl font-bold text-[#002080] mb-5">${esc(s.title)}</h1><p class="text-slate-600 text-lg max-w-2xl mx-auto mb-10">${esc(s.subtitle)}</p>${ctas()}</div></section>
    <section class="py-20"><div class="max-w-7xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6">${s.features.map((f,i)=>`<div class="sp-card p-6 sp-reveal sp-d${(i%4)+1} border-t-2 border-[#2563EB]"><h3 class="font-semibold text-[#002080]">${esc(f)}</h3><p class="text-slate-500 text-sm mt-2">${esc(s.benefits[i % s.benefits.length])}</p></div>`).join('')}</div></section>`,

  'data-streams': (s) => `
    <section class="pt-28 pb-20 bg-[#002080] text-white relative overflow-hidden"><div class="stream-container absolute inset-0 overflow-hidden pointer-events-none"></div>
      <div class="max-w-7xl mx-auto px-4 relative z-10">${breadcrumb(s.title).replace(/text-slate-500/g,'text-white/50').replace(/hover:text-\[#002080\]/g,'hover:text-white')}
      <div class="sp-reveal max-w-2xl"><h1 class="text-4xl sm:text-5xl font-bold mb-5">${esc(s.title)}</h1><p class="text-white/60 mb-8">${esc(s.subtitle)}</p><p class="text-4xl font-bold text-cyan-400 mb-8">${esc(s.stat.n)} <span class="text-lg font-normal text-white/50">${esc(s.stat.l)}</span></p>${ctas()}</div></div></section>
    <section class="py-20"><div class="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12"><div class="sp-reveal">${featureList(s.features)}</div><div class="space-y-4 sp-reveal sp-d2">${s.benefits.map(b=>`<div class="sp-card p-6"><p class="font-semibold text-[#002080]">${esc(b)}</p></div>`).join('')}</div></div></section>`,
};

function buildPage(s) {
  const heroFn = HEROES[s.layout];
  if (!heroFn) throw new Error(`Missing layout: ${s.layout} for ${s.slug}`);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
${getSiteMetaBlock({ homeHref: '../../index.html', aboutHref: '../about.html' })}
  <meta name="description" content="${esc(s.subtitle)} — Guudle IT Solutions premium ${esc(s.personality)} services.">
  <title>${esc(s.title)} | Guudle IT Solutions</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"><\/script>
  <script src="../../assets/js/tailwind-config.js"><\/script>
  <link rel="stylesheet" href="../../assets/css/styles.css">
  <link rel="stylesheet" href="../../assets/css/service-pages.css">
</head>
<body class="service-page layout-${s.layout} bg-white text-[#002080] antialiased" data-service="${s.slug}" data-layout="${s.layout}">
  <a href="#main" class="skip-link">Skip to main content</a>
  <div id="header-placeholder"></div>
  <main id="main">
    ${heroFn(s)}
    ${sharedSections(s)}
  </main>
  <div id="footer-placeholder"></div>
  <div id="chatbot-placeholder"></div>
  <script src="../../assets/js/mega-menu-webdev-data.js"><\/script>
  <script src="../../assets/js/mega-menu-data.js"><\/script>
  <script src="../../assets/js/mega-menu-render.js"><\/script>
  <script src="../../assets/js/components.js"><\/script>
  <script src="../../assets/js/main.js"><\/script>
  <script src="../../assets/js/service-pages.js"><\/script>
</body>
</html>`;
}

fs.mkdirSync(OUT, { recursive: true });
let count = 0;
for (const s of SERVICES) {
  fs.writeFileSync(path.join(OUT, `${s.slug}.html`), buildPage(s), 'utf8');
  console.log(`✓ ${s.slug}.html — layout: ${s.layout} (${s.personality})`);
  count++;
}
console.log(`\nGenerated ${count} unique service pages.`);
