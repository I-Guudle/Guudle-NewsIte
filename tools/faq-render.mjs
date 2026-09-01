/**
 * Enterprise FAQ section — shared renderer (accordion + support panel)
 */
import { SITE_PHONE_DISPLAY, SITE_PHONE_TEL } from './site-contact.mjs';

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function faqItem(f, i, id) {
  const btnId = `${id}-btn-${i}`;
  const panelId = `${id}-panel-${i}`;
  return `<div class="ent-faq__item slp-faq-item" data-ent-faq data-svc-faq>
    <button type="button" class="ent-faq__trigger slp-faq-trigger" id="${btnId}" aria-expanded="false" aria-controls="${panelId}">
      <span class="ent-faq__q">${esc(f.q)}</span>
      <span class="ent-faq__icon" aria-hidden="true"><i class="fas fa-plus"></i></span>
    </button>
    <div class="ent-faq__panel slp-faq-panel" id="${panelId}" role="region" aria-labelledby="${btnId}">
      <div class="slp-faq-panel__inner ent-faq__a">${esc(f.a)}</div>
    </div>
  </div>`;
}

function supportPanel(opts) {
  const contactHref = opts.contactHref || '#svc-contact';
  const contactPage = opts.contactPageHref || '../contact.html';
  return `<aside class="ent-faq__aside" aria-label="Support and contact">
    <div class="ent-faq__support-card">
      <div class="ent-faq__support-head">
        <span class="ent-faq__support-icon" aria-hidden="true"><i class="fas fa-headset"></i></span>
        <h3 class="ent-faq__support-title">Still have questions?</h3>
        <p class="ent-faq__support-lead">Our enterprise team responds within one business day with clear, actionable guidance.</p>
      </div>
      <ul class="ent-faq__support-list">
        <li><i class="fas fa-clock" aria-hidden="true"></i><span><strong>24/7 support</strong> for active clients</span></li>
        <li><i class="fas fa-shield-halved" aria-hidden="true"></i><span><strong>NDA &amp; IP protection</strong> standard</span></li>
        <li><i class="fas fa-file-contract" aria-hidden="true"></i><span><strong>Transparent estimates</strong> after discovery</span></li>
      </ul>
      <div class="ent-faq__support-contact">
        <a href="mailto:info@guudle.com" class="ent-faq__support-link"><i class="fas fa-envelope" aria-hidden="true"></i> info@guudle.com</a>
        <a href="tel:${SITE_PHONE_TEL}" class="ent-faq__support-link"><i class="fas fa-phone" aria-hidden="true"></i> ${SITE_PHONE_DISPLAY}</a>
      </div>
      <div class="ent-faq__support-actions">
        <a href="${esc(contactHref)}" class="ent-faq__btn ent-faq__btn--primary">Get Free Consultation <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
        <a href="${esc(contactPage)}" class="ent-faq__btn ent-faq__btn--ghost">Contact Our Team</a>
      </div>
    </div>
    <div class="ent-faq__trust-strip" aria-label="Trust indicators">
      <span><i class="fas fa-check-circle" aria-hidden="true"></i> Enterprise SLA</span>
      <span><i class="fas fa-check-circle" aria-hidden="true"></i> Global Delivery</span>
      <span><i class="fas fa-check-circle" aria-hidden="true"></i> ISO-aligned</span>
    </div>
  </aside>`;
}

/**
 * @param {object} opts
 * @param {string} [opts.id='svc-faq']
 * @param {string} [opts.title='Frequently Asked Questions']
 * @param {string} [opts.subtitle]
 * @param {Array<{q:string,a:string}>} opts.faqs
 * @param {string} [opts.contactHref]
 * @param {string} [opts.contactPageHref]
 * @param {boolean} [opts.aos=true]
 * @param {string} [opts.sectionClass='']
 */
export function renderEnterpriseFaqSection(_opts) {
  return '';
}

/** FAQ items HTML only — for client-side injection (contact page) */
export function renderEnterpriseFaqItems(faqs, id = 'ct-faq') {
  return faqs.map((f, i) => faqItem(f, i, id)).join('');
}
