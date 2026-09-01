/**
 * Guudle — reusable contact form → Supabase integration
 * HTML5 + Tailwind + Vanilla JS (no frameworks)
 *
 * Usage:
 *   await GuudleContact.submitFromForm(formElement, { service: 'Web Development' });
 *   GuudleContact.bind(formElement, options);
 *   GuudleContact.autoBind(); // hero + svc forms
 */
(function (global) {
  'use strict';

  var MESSAGES = {
    sending: 'Sending your enquiry...',
    success:
      'Thank you. Your enquiry has been received. Our team will review your message and get back to you.',
    failure: "We couldn't submit your enquiry right now. Please try again.",
    configMissing:
      'Contact form is not configured yet. Please email info@guudle.com or call +44 (0) 7908 727 559.',
    nameRequired: 'Please enter your full name.',
    emailRequired: 'Please enter your business email address.',
    emailInvalid: 'Please enter a valid business email address.',
    messageRequired: 'Please tell us about your project.',
    serviceRequired: 'Please select a service.',
    phoneInvalid: 'Please enter a valid phone number.',
  };

  var lastSuccessAt = 0;
  var formOpenedAt = Date.now();

  function cfg() {
    return global.GUUDLE_SUPABASE || {};
  }

  function isConfigured() {
    var c = cfg();
    return Boolean(c.url && c.anonKey && c.url.indexOf('YOUR_PROJECT') === -1);
  }

  function trim(v) {
    return String(v == null ? '' : v).trim();
  }

  function sanitizeText(v, max) {
    return trim(v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').slice(0, max || 5000);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPhone(phone) {
    if (!phone) return true;
    return /^[\d\s+\-().]{7,20}$/.test(phone);
  }

  function sourcePage() {
    try {
      var path = global.location.pathname || '/';
      if (path === '/' || path.endsWith('/')) return path === '/' ? '/' : path;
      return path.split('/').filter(Boolean).slice(-2).join('/') || path;
    } catch (e) {
      return '/';
    }
  }

  function inferService(form, options) {
    if (options && options.service) return options.service;
    if (form && form.getAttribute('data-service')) return form.getAttribute('data-service');
    var body = document.body;
    if (body && body.getAttribute('data-guudle-service')) {
      return body.getAttribute('data-guudle-service');
    }
    var title = document.querySelector('h1');
    if (title && trim(title.textContent)) {
      return sanitizeText(title.textContent, 120);
    }
    var file = (global.location.pathname || '').split('/').pop() || '';
    if (file && file !== 'index.html') {
      return file
        .replace(/\.html$/i, '')
        .split('-')
        .map(function (w) {
          return w.charAt(0).toUpperCase() + w.slice(1);
        })
        .join(' ');
    }
    return '';
  }

  function getField(form, names) {
    for (var i = 0; i < names.length; i++) {
      var el = form.elements[names[i]];
      if (el && typeof el.value !== 'undefined') return el;
    }
    return null;
  }

  function valueOf(form, names) {
    var el = getField(form, names);
    return el ? trim(el.value) : '';
  }

  function clearInlineErrors(form) {
    form.querySelectorAll('.guudle-field-error, .slp-form-error.is-visible, .ct-field-error').forEach(function (n) {
      if (n.classList.contains('slp-form-error')) {
        n.classList.remove('is-visible');
        n.textContent = '';
      } else if (n.classList.contains('ct-field-error')) {
        n.remove();
      } else {
        n.remove();
      }
    });
    form.querySelectorAll('.is-error, .ct-field--error').forEach(function (n) {
      n.classList.remove('is-error', 'ct-field--error');
    });
  }

  function showInlineError(form, field, message) {
    if (!field) return;
    field.classList.add('is-error');
    field.setAttribute('aria-invalid', 'true');

    var wrap = field.closest('[data-slp-field], .ct-field, .hero-contact-field, .guudle-field');
    if (wrap) {
      wrap.classList.add('ct-field--error');
      var slpErr = wrap.querySelector('.slp-form-error');
      if (slpErr) {
        slpErr.textContent = message;
        slpErr.classList.add('is-visible');
        return;
      }
      var existing = wrap.querySelector('.guudle-field-error, .ct-field-error');
      if (!existing) {
        existing = document.createElement('p');
        existing.className = 'guudle-field-error ct-field-error';
        existing.setAttribute('role', 'alert');
        wrap.appendChild(existing);
      }
      existing.textContent = message;
      return;
    }

    var next = field.nextElementSibling;
    if (next && next.classList.contains('guudle-field-error')) {
      next.textContent = message;
      return;
    }
    var p = document.createElement('p');
    p.className = 'guudle-field-error';
    p.setAttribute('role', 'alert');
    p.style.cssText = 'margin:0.35rem 0 0;font-size:0.8rem;color:#b91c1c;';
    p.textContent = message;
    field.insertAdjacentElement('afterend', p);
  }

  function setStatus(form, type, text) {
    var status =
      form.querySelector('[data-guudle-status]') ||
      form.querySelector('#ct-form-status') ||
      form.querySelector('.hero-contact-note');

    if (!status) {
      status = document.createElement('p');
      status.setAttribute('data-guudle-status', '');
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      status.style.cssText = 'margin-top:0.75rem;font-size:0.875rem;line-height:1.45;';
      var btn = form.querySelector('[type="submit"]');
      if (btn && btn.parentNode) btn.parentNode.insertBefore(status, btn.nextSibling);
      else form.appendChild(status);
    }

    status.hidden = false;
    status.textContent = text || '';
    if (type === 'error') status.style.color = '#b91c1c';
    else if (type === 'success') status.style.color = '#047857';
    else status.style.color = '';
  }

  function honeypotFilled(form) {
    var hp = getField(form, ['website_url', 'company_website', 'fax', 'hp_website']);
    return Boolean(hp && trim(hp.value));
  }

  function validateForm(form, options) {
    clearInlineErrors(form);
    var errors = [];

    var nameEl = getField(form, ['full_name', 'name', 'given-name']);
    var emailEl = getField(form, ['email', 'business_email']);
    var phoneEl = getField(form, ['phone', 'telephone']);
    var messageEl = getField(form, ['message', 'project_description', 'context']);
    var serviceEl = getField(form, ['service', 'service-line']);

    var name = nameEl ? trim(nameEl.value) : '';
    var email = emailEl ? trim(emailEl.value) : '';
    var phone = phoneEl ? trim(phoneEl.value) : '';
    var message = messageEl ? trim(messageEl.value) : '';
    var service = serviceEl ? trim(serviceEl.value) : inferService(form, options);

    if (!name || name.length < 2) {
      showInlineError(form, nameEl, MESSAGES.nameRequired);
      errors.push('name');
    }
    if (!email) {
      showInlineError(form, emailEl, MESSAGES.emailRequired);
      errors.push('email');
    } else if (!isValidEmail(email)) {
      showInlineError(form, emailEl, MESSAGES.emailInvalid);
      errors.push('email');
    }
    if (!isValidPhone(phone)) {
      showInlineError(form, phoneEl, MESSAGES.phoneInvalid);
      errors.push('phone');
    }
    if (!message) {
      showInlineError(form, messageEl, MESSAGES.messageRequired);
      errors.push('message');
    }
    if (options && options.requireService && !service) {
      showInlineError(form, serviceEl, MESSAGES.serviceRequired);
      errors.push('service');
    }

    if (errors.length) {
      var first = form.querySelector('.is-error');
      if (first && typeof first.focus === 'function') first.focus();
    }

    return {
      ok: errors.length === 0,
      payload: {
        full_name: sanitizeText(name, 200),
        email: sanitizeText(email, 254).toLowerCase(),
        phone: sanitizeText(phone, 40) || null,
        company: sanitizeText(valueOf(form, ['company', 'company_name']), 200) || null,
        service: sanitizeText(service, 200) || null,
        project_type: sanitizeText(valueOf(form, ['project_type', 'project_title']), 200) || null,
        budget_range: sanitizeText(valueOf(form, ['budget_range', 'budget']), 120) || null,
        message: sanitizeText(message, 8000),
        preferred_contact_method:
          sanitizeText(valueOf(form, ['preferred_contact_method', 'preferred_contact']), 80) || null,
        website: sanitizeText(valueOf(form, ['existing_url', 'website']), 500) || null,
        country: sanitizeText(valueOf(form, ['country']), 120) || null,
        source_page: sanitizeText((options && options.sourcePage) || sourcePage(), 300),
      },
    };
  }

  function collectServicesCheckbox(form, payload) {
    var boxes = form.querySelectorAll('input[name="services"]:checked');
    if (!boxes.length) return payload;
    var list = [];
    boxes.forEach(function (b) {
      list.push(trim(b.value));
    });
    if (list.length) {
      payload.service = sanitizeText(list.join(', '), 500);
      if (!payload.project_type) payload.project_type = 'Multi-service enquiry';
    }
    return payload;
  }

  async function insertSubmission(row) {
    var c = cfg();
    var endpoint =
      String(c.url).replace(/\/$/, '') +
      '/rest/v1/' +
      encodeURIComponent(c.table || 'Guudleitsolutions');

    // Drop null/empty optional fields (cleaner inserts)
    var payload = {};
    Object.keys(row).forEach(function (key) {
      var val = row[key];
      if (val !== null && val !== undefined && val !== '') payload[key] = val;
    });

    // IMPORTANT: use return=minimal — representation requires SELECT RLS
    var res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        apikey: c.anonKey,
        Authorization: 'Bearer ' + c.anonKey,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      var detail = '';
      try {
        detail = await res.text();
      } catch (e) {
        detail = '';
      }
      var err = new Error('submit_failed');
      err.status = res.status;
      err.detail = detail;
      throw err;
    }
    return true;
  }

  async function submitFromForm(form, options) {
    options = options || {};
    if (!form) return { ok: false };

    if (honeypotFilled(form) || Date.now() - formOpenedAt < (cfg().minFillMs || 2500)) {
      setStatus(form, 'success', MESSAGES.success);
      form.reset();
      return { ok: true, spam: true };
    }

    if (Date.now() - lastSuccessAt < (cfg().submitCooldownMs || 30000)) {
      setStatus(form, 'success', MESSAGES.success);
      return { ok: true, cooldown: true };
    }

    var result = validateForm(form, options);
    if (!result.ok) return { ok: false, validation: true };

    if (options.multiService) {
      result.payload = collectServicesCheckbox(form, result.payload);
      if (!result.payload.service) {
        var errHost = form.querySelector('#services-error');
        if (errHost) errHost.hidden = false;
        return { ok: false, validation: true };
      }
    }

    if (!isConfigured()) {
      setStatus(form, 'error', MESSAGES.configMissing);
      return { ok: false, config: true };
    }

    var btn = form.querySelector('[type="submit"]');
    var originalHtml = btn ? btn.innerHTML : '';
    if (btn) {
      btn.disabled = true;
      btn.setAttribute('aria-busy', 'true');
      btn.innerHTML = MESSAGES.sending;
    }
    setStatus(form, 'info', MESSAGES.sending);

    try {
      // Never send honeypot / internal fields
      var row = result.payload;
      delete row.internal_notes;
      delete row.archived_at;

      await insertSubmission(row);
      lastSuccessAt = Date.now();
      setStatus(form, 'success', MESSAGES.success);
      form.reset();
      clearInlineErrors(form);
      if (typeof options.onSuccess === 'function') options.onSuccess(row);
      return { ok: true };
    } catch (err) {
      setStatus(form, 'error', MESSAGES.failure);
      if (typeof options.onError === 'function') options.onError(err);
      return { ok: false, error: true };
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.removeAttribute('aria-busy');
        btn.innerHTML = originalHtml;
      }
    }
  }

  function bind(form, options) {
    if (!form || form.dataset.guudleBound === '1') return;
    form.dataset.guudleBound = '1';
    form.setAttribute('novalidate', 'novalidate');

    if (!form.querySelector('input[name="website_url"], input[name="hp_website"]')) {
      var hp = document.createElement('div');
      hp.className = 'guudle-hp';
      hp.setAttribute('aria-hidden', 'true');
      hp.style.cssText = 'position:absolute;left:-9999px;opacity:0;height:0;overflow:hidden;';
      hp.innerHTML =
        '<label>Company website<input type="text" name="website_url" tabindex="-1" autocomplete="off"></label>';
      form.appendChild(hp);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      submitFromForm(form, options);
    });
  }

  function autoBind() {
    var hero = document.getElementById('hero-contact-form');
    if (hero) bind(hero, { requireService: true });

    document.querySelectorAll('form[data-guudle-contact]').forEach(function (form) {
      bind(form, {
        requireService: form.getAttribute('data-require-service') === 'true',
        service: form.getAttribute('data-service') || undefined,
        sourcePage: form.getAttribute('data-source-page') || undefined,
      });
    });
  }

  global.GuudleContact = {
    messages: MESSAGES,
    isConfigured: isConfigured,
    validateForm: validateForm,
    submitFromForm: submitFromForm,
    bind: bind,
    autoBind: autoBind,
    inferService: inferService,
    sourcePage: sourcePage,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoBind);
  } else {
    autoBind();
  }
})(typeof window !== 'undefined' ? window : globalThis);
