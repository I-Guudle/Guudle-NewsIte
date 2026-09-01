/**
 * CRM Development — Why Choose / Customer Relationships section
 */

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

const CRM_BENEFITS = [
  { icon: 'fa-database', text: 'Centralize all customer information in one secure platform' },
  { icon: 'fa-gears', text: 'Automate repetitive sales and business workflows' },
  { icon: 'fa-filter', text: 'Improve lead generation and conversion rates' },
  { icon: 'fa-heart', text: 'Strengthen customer engagement and loyalty' },
  { icon: 'fa-comments', text: 'Track every customer interaction across multiple channels' },
  { icon: 'fa-bolt', text: 'Increase team productivity through automation' },
  { icon: 'fa-chart-line', text: 'Generate real-time reports and business insights' },
  { icon: 'fa-arrow-up-right-dots', text: 'Scale effortlessly as your business grows' },
];

function renderBenefit(item, i) {
  return `<article class="crm-why__benefit" data-aos="fade-up" data-aos-delay="${Math.min(i * 45, 280)}">
    <span class="crm-why__benefit-icon"><i class="fas ${esc(item.icon)}" aria-hidden="true"></i></span>
    <p class="crm-why__benefit-text">${esc(item.text)}</p>
  </article>`;
}

export function renderCrmWhySection(opts = {}) {
  const sectionId = opts.sectionId || 'svc-whyChoose';
  const contactLink = opts.contactLink || '#svc-contact';

  return `
    <section id="${sectionId}" class="crm-why" aria-labelledby="crm-why-heading">
      <div class="crm-why__block crm-why__block--light">
        <div class="crm-why__ambient" aria-hidden="true">
          <div class="crm-why__mesh"></div>
          <div class="crm-why__orb crm-why__orb--1"></div>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 sm:py-24">
          <header class="crm-why__head" data-aos="fade-up">
            <span class="crm-why__eyebrow"><i class="fas fa-users" aria-hidden="true"></i> Customer Relationships at Scale</span>
            <h2 id="crm-why-heading" class="crm-why__title font-display">Build Intelligent CRM Solutions That <span class="crm-why__accent">Accelerate Sales, Strengthen Customer Relationships, and Drive Business Growth</span></h2>
            <p class="crm-why__lead">Empower your business with a custom-built Customer Relationship Management (CRM) solution designed to centralize customer data, automate business processes, improve team collaboration, and deliver exceptional customer experiences. Our enterprise CRM development services help organizations manage leads, sales opportunities, customer interactions, marketing campaigns, and support operations from a single secure platform.</p>
            <p class="crm-why__lead crm-why__lead--secondary">Whether you're a startup, growing business, or large enterprise, we develop scalable CRM systems tailored to your unique workflows, enabling your teams to work smarter, close more deals, improve customer retention, and make data-driven decisions with confidence.</p>
          </header>
        </div>
      </div>

      <div class="crm-why__block crm-why__block--dark">
        <div class="crm-why__ambient crm-why__ambient--dark" aria-hidden="true">
          <div class="crm-why__grid-lines"></div>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 sm:py-24">
          <header class="crm-why__head crm-why__head--light" data-aos="fade-up">
            <span class="crm-why__eyebrow crm-why__eyebrow--dark"><i class="fas fa-star" aria-hidden="true"></i> Why Choose Us</span>
            <h3 class="crm-why__title crm-why__title--light font-display">Why Choose Our CRM Development Services?</h3>
            <p class="crm-why__lead crm-why__lead--light">We build modern, cloud-based CRM platforms that go beyond contact management. Our solutions integrate sales, marketing, customer service, analytics, automation, and AI capabilities into one powerful ecosystem, helping your business streamline operations and maximize customer lifetime value.</p>
          </header>
          <p class="crm-why__subhead" data-aos="fade-up">Our CRM solutions help you:</p>
          <div class="crm-why__benefits">${CRM_BENEFITS.map(renderBenefit).join('')}</div>
        </div>
      </div>

      <div class="crm-why__block crm-why__block--soft">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <article class="crm-why__panel" data-aos="fade-up">
            <span class="crm-why__eyebrow"><i class="fas fa-building" aria-hidden="true"></i> Enterprise CRM</span>
            <h3 class="crm-why__title font-display">Enterprise CRM Solutions for <span class="crm-why__accent">Every Business</span></h3>
            <p class="crm-why__lead">We develop CRM platforms for organizations across various industries, including healthcare, finance, real estate, construction, education, retail, hospitality, logistics, manufacturing, professional services, and government. Each solution is fully customized to align with your business objectives, operational processes, and customer journey.</p>
          </article>
        </div>
      </div>

      <div class="crm-why__block crm-why__block--navy">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center">
          <article class="crm-why__closing" data-aos="fade-up">
            <div class="crm-why__closing-glow" aria-hidden="true"></div>
            <span class="crm-why__eyebrow crm-why__eyebrow--dark"><i class="fas fa-shield-halved" aria-hidden="true"></i> Built to Last</span>
            <h3 class="crm-why__title crm-why__title--light font-display">Built for Growth, Security, and Performance</h3>
            <p class="crm-why__lead crm-why__lead--light">Our CRM systems are engineered using modern technologies and enterprise best practices, ensuring high performance, scalability, and security. From lead management and sales pipelines to customer support, workflow automation, AI-powered insights, and third-party integrations, we deliver CRM solutions that empower businesses to build stronger relationships, improve operational efficiency, and achieve sustainable long-term growth.</p>
            <a href="${esc(contactLink)}" class="crm-why__cta">Start Your CRM Project <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
          </article>
        </div>
      </div>
    </section>`;
}
