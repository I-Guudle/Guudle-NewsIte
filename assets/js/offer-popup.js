/**
 * Guudle Enterprise Offer Popup — conversion modal with exit intent
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'guudle_offer_popup_until';
  const SESSION_KEY = 'guudle_offer_popup_session';
  const DISMISS_DAYS = 7;
  const DELAY_MS = 5000;
  const SCROLL_PCT = 0.3;

  const SERVICES = [
    'Web Development',
    'Mobile App Development',
    'AI Development',
    'CRM Development',
    'ERP Development',
    'Cloud Solutions',
    'UI/UX Design',
    'Cyber Security',
    'API Development',
    'DevOps',
    'E-commerce Development',
  ];

  const BUDGETS = [
    'Under $10,000',
    '$10,000 – $25,000',
    '$25,000 – $50,000',
    '$50,000 – $100,000',
    '$100,000+',
    'Not sure yet',
  ];

  const OFFER_ITEMS = [
    'Free Project Consultation (Worth $250)',
    'Free UI/UX Prototype',
    'Free Technical Requirements Analysis',
    '20% Discount on Development',
    'Priority Project Delivery',
    '30 Days Free Technical Support',
  ];

  let popupShown = false;
  let activeModal = null;
  let backdrop = null;
  let lastFocus = null;

  function basePath() {
    if (window.GuudleSite?.getBasePath) return window.GuudleSite.getBasePath();
    const path = window.location.pathname;
    if (path.includes('/pages/')) {
      const depth = path.split('/').filter(Boolean).length - 2;
      return depth > 0 ? '../'.repeat(depth) : '../';
    }
    return '';
  }

  function contactUrl() {
    return `${basePath()}pages/contact.html`;
  }

  function logoUrl() {
    return `${basePath()}logo/GUUDLE-LOGO22-1.png`;
  }

  function assetUrl(file) {
    return `${basePath()}assets/${file}`;
  }

  function shouldShow() {
    const until = localStorage.getItem(STORAGE_KEY);
    if (until && Date.now() < parseInt(until, 10)) return false;
    if (sessionStorage.getItem(SESSION_KEY) === '1') return false;
    return true;
  }

  function dismissForDays(days = DISMISS_DAYS) {
    localStorage.setItem(STORAGE_KEY, String(Date.now() + days * 86400000));
  }

  function markSessionShown() {
    sessionStorage.setItem(SESSION_KEY, '1');
  }

  function track(action, detail = {}) {
    document.dispatchEvent(new CustomEvent('guudle:offer-popup', { detail: { action, ...detail } }));
  }

  function injectCss() {
    if (document.getElementById('guudle-offer-popup-css')) return;
    const link = document.createElement('link');
    link.id = 'guudle-offer-popup-css';
    link.rel = 'stylesheet';
    link.href = assetUrl('css/offer-popup.css');
    document.head.appendChild(link);
  }

  function esc(s) {
    return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
  }

  function serviceOptions() {
    return SERVICES.map((s) => `<option value="${esc(s)}">${esc(s)}</option>`).join('');
  }

  function budgetOptions() {
    return BUDGETS.map((b) => `<option value="${esc(b)}">${esc(b)}</option>`).join('');
  }

  function offerListHtml(items) {
    return items.map((t) => `<li><i class="fas fa-check-circle" aria-hidden="true"></i>${esc(t)}</li>`).join('');
  }

  function buildMainModal() {
    const el = document.createElement('div');
    el.className = 'guudle-offer-modal';
    el.id = 'guudle-offer-main';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-labelledby', 'guudle-offer-title');
    el.hidden = true;

    el.innerHTML = `
      <div class="guudle-offer-panel">
        <div class="guudle-offer-panel__particles" aria-hidden="true">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
        <button type="button" class="guudle-offer-close" data-offer-close aria-label="Close offer popup">
          <i class="fas fa-xmark" aria-hidden="true"></i>
        </button>
        <div class="guudle-offer-body">
          <div class="guudle-offer-view" data-offer-view="offer">
            <img src="${logoUrl()}" alt="Guudle IT Solutions" class="guudle-offer-logo" width="140" height="40">
            <span class="guudle-offer-badge"><i class="fas fa-rocket" aria-hidden="true"></i> Limited-Time Offer</span>
            <h2 id="guudle-offer-title" class="guudle-offer-title">Get <em>20% OFF</em> Your Next Software Development Project</h2>
            <p class="guudle-offer-desc">Transform your business with expert software development — custom websites, mobile apps, AI, CRM, ERP, and cloud applications.</p>
            <div class="guudle-offer-layout">
              <div>
                <ul class="guudle-offer-list">${offerListHtml(OFFER_ITEMS)}</ul>
                <p class="guudle-offer-expiry"><i class="fas fa-clock" aria-hidden="true"></i> Offer expires in <strong>7 days</strong>.</p>
              </div>
              <div class="guudle-offer-art" aria-hidden="true">
                <div class="guudle-offer-art__glow"></div>
                <div class="guudle-offer-art__rings"></div>
                <div class="guudle-offer-art__icon"><i class="fas fa-laptop-code"></i></div>
              </div>
            </div>
            <div class="guudle-offer-trust">
              <strong>⭐⭐⭐⭐⭐ Rated by 500+ Businesses</strong>
              <span><i class="fas fa-circle-check"></i> 500+ Projects</span>
              <span><i class="fas fa-circle-check"></i> 15+ Years</span>
              <span><i class="fas fa-circle-check"></i> 98% Satisfaction</span>
              <span><i class="fas fa-circle-check"></i> Enterprise-Grade</span>
            </div>
            <div class="guudle-offer-actions">
              <button type="button" class="guudle-offer-btn guudle-offer-btn--primary" data-offer-claim>Claim My Offer</button>
              <a href="${contactUrl()}" class="guudle-offer-btn guudle-offer-btn--ghost" data-offer-consult>Schedule Free Consultation</a>
            </div>
          </div>

          <div class="guudle-offer-view" data-offer-view="form" hidden>
            <img src="${logoUrl()}" alt="" class="guudle-offer-logo" width="140" height="40">
            <h2 class="guudle-offer-title" style="font-size:1.25rem">Claim Your <em>20% OFF</em> Offer</h2>
            <p class="guudle-offer-desc">Complete the form below and our solutions consultant will reach out within 24 hours.</p>
            <form id="guudle-offer-form" class="guudle-offer-form" novalidate>
              <div class="guudle-offer-form-grid guudle-offer-form-grid--2">
                <div class="guudle-offer-field">
                  <label for="offer-name">Full Name <span aria-hidden="true">*</span></label>
                  <input type="text" id="offer-name" name="name" required autocomplete="name" placeholder="Your full name">
                </div>
                <div class="guudle-offer-field">
                  <label for="offer-company">Company Name</label>
                  <input type="text" id="offer-company" name="company" autocomplete="organization" placeholder="Company (optional)">
                </div>
                <div class="guudle-offer-field">
                  <label for="offer-email">Email Address <span aria-hidden="true">*</span></label>
                  <input type="email" id="offer-email" name="email" required autocomplete="email" placeholder="you@company.com">
                </div>
                <div class="guudle-offer-field">
                  <label for="offer-phone">Phone Number</label>
                  <input type="tel" id="offer-phone" name="phone" autocomplete="tel" placeholder="+44 ...">
                </div>
                <div class="guudle-offer-field">
                  <label for="offer-service">Service Interested In <span aria-hidden="true">*</span></label>
                  <select id="offer-service" name="service" required>
                    <option value="">Select a service</option>
                    ${serviceOptions()}
                  </select>
                </div>
                <div class="guudle-offer-field">
                  <label for="offer-budget">Project Budget</label>
                  <select id="offer-budget" name="budget">
                    <option value="">Select budget range</option>
                    ${budgetOptions()}
                  </select>
                </div>
                <div class="guudle-offer-field guudle-offer-field--full">
                  <label for="offer-message">Project Description <span aria-hidden="true">*</span></label>
                  <textarea id="offer-message" name="message" rows="3" required placeholder="Tell us about your project goals..."></textarea>
                </div>
              </div>
              <div class="guudle-offer-actions" style="margin-top:1rem">
                <button type="submit" class="guudle-offer-btn guudle-offer-btn--primary">Claim My Free Consultation</button>
                <button type="button" class="guudle-offer-btn guudle-offer-btn--ghost" data-offer-back>Back</button>
              </div>
            </form>
          </div>

          <div class="guudle-offer-view" data-offer-view="success" hidden>
            <div class="guudle-offer-success">
              <div class="guudle-offer-success__icon" aria-hidden="true">🎉</div>
              <h3>Thank You!</h3>
              <p>Your consultation request has been received.<br>Our solutions consultant will contact you within <strong>24 hours</strong>.</p>
            </div>
          </div>
        </div>
        <div class="guudle-offer-footer" data-offer-footer>
          <label class="guudle-offer-dismiss">
            <input type="checkbox" id="guudle-offer-dont-show"> Don't show again
          </label>
          <button type="button" class="guudle-offer-nothanks" data-offer-close>No Thanks</button>
        </div>
      </div>`;

    return el;
  }

  function buildExitModal() {
    const el = document.createElement('div');
    el.className = 'guudle-offer-modal guudle-offer-modal--exit';
    el.id = 'guudle-offer-exit';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-labelledby', 'guudle-offer-exit-title');
    el.hidden = true;

    el.innerHTML = `
      <div class="guudle-offer-panel">
        <div class="guudle-offer-panel__particles" aria-hidden="true"><span></span><span></span><span></span></div>
        <button type="button" class="guudle-offer-close" data-offer-close aria-label="Close popup">
          <i class="fas fa-xmark" aria-hidden="true"></i>
        </button>
        <div class="guudle-offer-body">
          <span class="guudle-offer-badge"><i class="fas fa-hand-paper" aria-hidden="true"></i> Wait!</span>
          <h2 id="guudle-offer-exit-title" class="guudle-offer-title">Before You Leave...</h2>
          <p class="guudle-offer-desc">Get a <strong>FREE Project Consultation</strong> — no obligation.</p>
          <ul class="guudle-offer-exit-list">
            <li><i class="fas fa-check" aria-hidden="true"></i> Free Project Roadmap</li>
            <li><i class="fas fa-check" aria-hidden="true"></i> Free Cost Estimate</li>
            <li><i class="fas fa-check" aria-hidden="true"></i> Free Architecture Planning</li>
            <li><i class="fas fa-check" aria-hidden="true"></i> Free Technology Consultation</li>
          </ul>
          <div class="guudle-offer-actions">
            <a href="${contactUrl()}" class="guudle-offer-btn guudle-offer-btn--primary" data-offer-exit-cta>Get My Free Consultation</a>
          </div>
        </div>
        <div class="guudle-offer-footer">
          <label class="guudle-offer-dismiss">
            <input type="checkbox" class="guudle-offer-dont-show-exit"> Don't show again
          </label>
          <button type="button" class="guudle-offer-nothanks" data-offer-close>No Thanks</button>
        </div>
      </div>`;

    return el;
  }

  function getBackdrop() {
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'guudle-offer-backdrop';
      backdrop.setAttribute('aria-hidden', 'true');
      backdrop.addEventListener('click', () => closeActive(true));
      document.body.appendChild(backdrop);
    }
    return backdrop;
  }

  function trapFocus(modal) {
    const focusable = modal.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    modal.addEventListener('keydown', function onKey(e) {
      if (e.key !== 'Tab') return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  function openModal(modal, type) {
    if (popupShown || !modal) return;
    popupShown = true;
    markSessionShown();
    activeModal = modal;
    lastFocus = document.activeElement;

    const bg = getBackdrop();
    modal.hidden = false;
    requestAnimationFrame(() => {
      bg.classList.add('is-visible');
      modal.classList.add('is-visible');
    });
    document.body.classList.add('guudle-offer-open');
    const closeBtn = modal.querySelector('.guudle-offer-close');
    closeBtn?.focus();
    track('view', { type });
  }

  function closeActive(userDismiss = false) {
    if (!activeModal) return;
    const modal = activeModal;
    const dontShow = modal.querySelector('.guudle-offer-dismiss input:checked, .guudle-offer-dont-show-exit:checked');

    if (userDismiss || dontShow) {
      dismissForDays(DISMISS_DAYS);
      track('dismiss', { permanent: !!dontShow });
    }

    modal.classList.remove('is-visible');
    backdrop?.classList.remove('is-visible');
    document.body.classList.remove('guudle-offer-open');

    setTimeout(() => {
      modal.hidden = true;
      activeModal = null;
      lastFocus?.focus?.();
    }, 350);
  }

  function showMain() {
    if (!shouldShow() || popupShown) return;
    const modal = document.getElementById('guudle-offer-main');
    openModal(modal, 'main');
  }

  function showExit() {
    if (!shouldShow() || popupShown) return;
    const modal = document.getElementById('guudle-offer-exit');
    openModal(modal, 'exit');
  }

  function showFormView() {
    const modal = document.getElementById('guudle-offer-main');
    if (!modal) return;
    modal.querySelector('[data-offer-view="offer"]').hidden = true;
    modal.querySelector('[data-offer-view="form"]').hidden = false;
    modal.querySelector('[data-offer-footer]')?.setAttribute('hidden', '');
    track('claim_click');
    modal.querySelector('#offer-name')?.focus();
  }

  function showOfferView() {
    const modal = document.getElementById('guudle-offer-main');
    if (!modal) return;
    modal.querySelector('[data-offer-view="form"]').hidden = true;
    modal.querySelector('[data-offer-view="offer"]').hidden = false;
    modal.querySelector('[data-offer-footer]')?.removeAttribute('hidden');
  }

  function showSuccessView() {
    const modal = document.getElementById('guudle-offer-main');
    if (!modal) return;
    modal.querySelector('[data-offer-view="form"]').hidden = true;
    modal.querySelector('[data-offer-view="offer"]').hidden = true;
    modal.querySelector('[data-offer-view="success"]').hidden = false;
    modal.querySelector('[data-offer-footer]')?.setAttribute('hidden', '');
    dismissForDays(DISMISS_DAYS);
    track('submit');
    setTimeout(() => closeActive(false), 4500);
  }

  function bindEvents() {
    document.addEventListener('click', (e) => {
      const close = e.target.closest('[data-offer-close]');
      if (close) {
        e.preventDefault();
        closeActive(true);
        return;
      }
      if (e.target.closest('[data-offer-claim]')) {
        e.preventDefault();
        showFormView();
        return;
      }
      if (e.target.closest('[data-offer-back]')) {
        e.preventDefault();
        showOfferView();
        return;
      }
      if (e.target.closest('[data-offer-consult]')) {
        track('consult_click');
        dismissForDays(DISMISS_DAYS);
        markSessionShown();
        return;
      }
      if (e.target.closest('[data-offer-exit-cta]')) {
        track('exit_cta_click');
        dismissForDays(DISMISS_DAYS);
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && activeModal) closeActive(true);
    });

    const form = document.getElementById('guudle-offer-form');
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (window.GuudleContact) {
        const result = await window.GuudleContact.submitFromForm(form, {
          service: 'Website offer enquiry',
          sourcePage: window.GuudleContact.sourcePage(),
        });
        if (result.ok) showSuccessView();
        return;
      }
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      showSuccessView();
    });
  }

  function initTriggers() {
    if (!shouldShow()) return;

    let triggered = false;
    const fire = (source) => {
      if (triggered || !shouldShow()) return;
      triggered = true;
      showMain();
      track('trigger', { source });
    };

    setTimeout(() => fire('delay'), DELAY_MS);

    const onScroll = () => {
      const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrolled >= SCROLL_PCT) {
        fire('scroll');
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    if (window.matchMedia('(min-width: 1024px)').matches) {
      document.addEventListener('mouseout', (e) => {
        if (e.relatedTarget || e.clientY > 0) return;
        if (triggered || popupShown || !shouldShow()) return;
        triggered = true;
        showExit();
        track('trigger', { source: 'exit_intent' });
      });
    }
  }

  function mount() {
    if (document.getElementById('guudle-offer-main')) return;
    injectCss();
    document.body.appendChild(buildMainModal());
    document.body.appendChild(buildExitModal());
    trapFocus(document.getElementById('guudle-offer-main'));
    trapFocus(document.getElementById('guudle-offer-exit'));
    bindEvents();
    initTriggers();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
