/**
 * Injects a unique product visual into service-page heroes
 * so each page shares the index.html visual language without copying copy.
 */
(function () {
  'use strict';

  var GROUPS = {
    phone: ['custom-mobile', 'mob-ios', 'mob-flutter', 'mob-android', 'mobile', 'enterprise-mobile', 'pwa'],
    web: ['website', 'web-shopify', 'web-wp', 'cms', 'ecommerce', 'web-app', 'portal'],
    commerce: ['ecommerce', 'shopify', 'magento', 'woocommerce', 'marketplace'],
    fintech: ['fintech'],
    health: ['healthcare', 'hms'],
    taxi: ['taxi', 'on-demand', 'delivery'],
    cloud: ['cloud', 'aws', 'azure', 'devops'],
    seo: ['seo', 'marketing', 'ads'],
    uiux: ['ui-ux', 'ux', 'design'],
    cyber: ['security', 'cyber'],
    ai: ['ai', 'ai-hub', 'multi-agent', 'chatbot'],
    dash: ['crm', 'erp', 'analytics', 'power-bi', 'bi', 'hrms']
  };

  function groupFor(theme) {
    var t = String(theme || '').toLowerCase();
    var keys = Object.keys(GROUPS);
    for (var i = 0; i < keys.length; i++) {
      var list = GROUPS[keys[i]];
      for (var j = 0; j < list.length; j++) {
        if (t.indexOf(list[j]) !== -1) return keys[i];
      }
    }
    return 'software';
  }

  function stage(kind, title, chips) {
    var phone = kind === 'phone';
    var chipHtml = chips.map(function (c) {
      return '<span class="ent-stage__chip">' + c + '</span>';
    }).join('');
    return (
      '<div class="ent-stage-wrap">' +
        '<p class="ent-stage__label">' + title + '</p>' +
        '<div class="ent-stage' + (phone ? ' ent-stage--phone' : '') + '" aria-hidden="true">' +
          '<div class="ent-stage__bar">' +
            '<span class="ent-stage__dot"></span><span class="ent-stage__dot"></span><span class="ent-stage__dot"></span>' +
            '<span class="ent-stage__url">guudle.com</span>' +
          '</div>' +
          '<div class="ent-stage__body">' +
            (phone ? '' : '<div class="ent-stage__rail"></div>') +
            '<div class="ent-stage__main">' +
              '<div class="ent-stage__row ent-stage__row--wide"></div>' +
              '<div class="ent-stage__row ent-stage__row--mid"></div>' +
              '<div class="ent-stage__panel"></div>' +
              '<div class="ent-stage__row ent-stage__row--short"></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="ent-stage__chips">' + chipHtml + '</div>' +
      '</div>'
    );
  }

  var TEMPLATES = {
    phone: function () { return stage('phone', 'Mobile product interface', ['iOS', 'Android', 'Flutter']); },
    web: function () { return stage('web', 'Website interface', ['Web', 'CMS', 'Performance']); },
    commerce: function () { return stage('web', 'Commerce storefront', ['Catalog', 'Checkout', 'Payments']); },
    fintech: function () { return stage('web', 'Financial operations console', ['Ledger', 'Payments', 'Controls']); },
    health: function () { return stage('web', 'Healthcare platform', ['Records', 'Scheduling', 'Care']); },
    taxi: function () { return stage('phone', 'Booking and dispatch', ['Map', 'Driver', 'Trip']); },
    cloud: function () { return stage('web', 'Infrastructure architecture', ['Cloud', 'Scale', 'Reliability']); },
    seo: function () { return stage('web', 'Search and analytics', ['Visibility', 'Content', 'Measurement']); },
    uiux: function () { return stage('web', 'Design system', ['Flows', 'Components', 'Usability']); },
    cyber: function () { return stage('web', 'Secure enterprise interface', ['Access', 'Monitoring', 'Policy']); },
    ai: function () { return stage('web', 'AI application workspace', ['Models', 'Workflows', 'Insight']); },
    dash: function () { return stage('web', 'Operations dashboard', ['CRM', 'ERP', 'Analytics']); },
    software: function () { return stage('web', 'Product workspace', ['Enterprise', 'SaaS', 'Cloud']); }
  };

  function inject() {
    if (!document.body || !document.body.classList.contains('guudle-site')) return;
    if (document.body.classList.contains('home-saas')) return;
    if (document.body.classList.contains('ft-page')) return;
    if (document.body.classList.contains('ow-page')) return;
    if (document.body.classList.contains('gstory-page')) return;
    if (document.body.classList.contains('gind-page')) return;
    if (document.body.classList.contains('corp-page')) return;

    var hero = document.querySelector('[data-svc-hero], .saas-hero');
    if (!hero || hero.querySelector('.ent-stage')) return;

    var theme = document.body.getAttribute('data-svc-theme') || '';
    var kind = groupFor(theme);
    var html = (TEMPLATES[kind] || TEMPLATES.software)();

    var host =
      hero.querySelector('.max-w-4xl') ||
      hero.querySelector('.max-w-xl') ||
      hero.querySelector('.ow-hero__inner') ||
      hero.querySelector('.relative.z-10') ||
      hero;

    var actions = host.querySelector('.flex.flex-wrap.gap-3, .hero-enter-d4, .ow-hero__actions, .ft-actions');
    var wrap = document.createElement('div');
    wrap.innerHTML = html;
    if (actions && actions.parentNode) {
      actions.parentNode.insertBefore(wrap.firstElementChild, actions.nextSibling);
    } else {
      host.appendChild(wrap.firstElementChild);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
