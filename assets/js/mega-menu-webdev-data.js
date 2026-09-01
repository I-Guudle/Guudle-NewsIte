/**
 * Web Development Services — standard mega menu section (matches other service tabs)
 */
(function () {
  const p = (slug) => `pages/services/${slug}.html`;

  window.GuudleWebDevSection = {
    id: 'web-development',
    label: 'Web Development Services',
    icon: 'globe',
    cta: {
      title: 'Build Enterprise-Grade Web Experiences',
      desc: 'From custom websites to full-stack platforms — scalable, secure, and conversion-focused.',
      btn: 'Request a Quote',
      href: 'pages/contact.html',
    },
    links: [
      { name: 'Web Development Services', href: p('website-development'), icon: 'globe' },
      { name: 'Custom Website Development', href: p('business-website'), icon: 'window' },
      { name: 'E-Commerce Development', href: p('ecommerce'), icon: 'cart' },
      { name: 'CMS Development', href: p('cms'), icon: 'layers' },
      { name: 'Frontend Development', href: p('frontend-development'), icon: 'window' },
      { name: 'Backend Development', href: p('backend-development'), icon: 'server' },
      { name: 'Full-Stack Development', href: p('full-stack-development'), icon: 'code' },
      { name: 'Marketplace Development', href: p('marketplace-development'), icon: 'store' },
      { name: 'Web Portal Development', href: p('web-portal-development'), icon: 'globe' },
      { name: 'Hosting & Cloud Solutions', href: p('cloud-solutions'), icon: 'cloud' },
      { name: 'SEO & Digital Optimization', href: p('seo-digital-optimization'), icon: 'search' },
      { name: 'Website Maintenance & Support', href: p('maintenance-support'), icon: 'tools' },
      { name: 'UI/UX Design Services', href: p('ui-ux-design'), icon: 'palette' },
      { name: 'Website Security Services', href: p('website-security'), icon: 'shield' },
      { name: 'Migration & Modernization', href: p('legacy-modernization'), icon: 'refresh' },
      { name: 'Emerging Web Technologies', href: p('emerging-web-technologies'), icon: 'sparkles' },
    ],
  };
})();
