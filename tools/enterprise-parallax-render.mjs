/**
 * Mandatory Enterprise Parallax Section — full-width glass card band with unique service background.
 */

function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function faIcon(icon) {
  if (!icon) return 'fas fa-chart-line';
  return icon.includes(' ') ? icon : `fas ${icon}`;
}

/**
 * @param {object} opts
 * @param {string} opts.slug
 * @param {string} opts.bgUrl — unique background image URL
 * @param {string} opts.badge
 * @param {string} opts.titleHtml — may include accent spans
 * @param {string} opts.lead
 * @param {string} [opts.primaryCta]
 * @param {string} [opts.primaryHref]
 * @param {string} [opts.secondaryCta]
 * @param {string} [opts.secondaryHref]
 * @param {Array<{icon:string,label:string}>} [opts.floatIcons]
 * @param {string} [opts.bgAlt]
 */
export function renderEnterpriseParallaxSection(opts) {
  const id = opts.sectionId || 'cma-enterprise-parallax';
  const headingId = `${id}-heading`;
  const bgAlt = esc(opts.bgAlt || `${opts.title || 'Enterprise marketing'} — parallax background`);
  const floats = (opts.floatIcons || [
    { icon: 'fa-chart-line', label: 'Analytics' },
    { icon: 'fa-bullseye', label: 'Targeting' },
    { icon: 'fa-robot', label: 'Automation' },
    { icon: 'fa-wand-magic-sparkles', label: 'AI Growth' },
  ]).map((f, i) =>
    `<span class="ent-parallax__float ent-parallax__float--${i + 1}" aria-hidden="true"><i class="${faIcon(f.icon)}"></i><em>${esc(f.label)}</em></span>`
  ).join('');

  const primaryCta = opts.primaryCta || 'Get Started Today';
  const primaryHref = opts.primaryHref || '../contact.html';
  const secondaryCta = opts.secondaryCta || 'Book Free Consultation';
  const secondaryHref = opts.secondaryHref || '#svc-contact';

  return `
    <section id="${esc(id)}" class="ent-parallax guudle-parallax-section" data-svc-parallax-section data-svc-parallax-speed="0.38" data-parallax-scale="1.08" aria-labelledby="${esc(headingId)}">
      <div class="ent-parallax__bg slp-parallax__bg guudle-parallax-layer" style="background-image:url('${esc(opts.bgUrl)}')" role="img" aria-label="${bgAlt}"></div>
      <div class="ent-parallax__overlay" aria-hidden="true"></div>
      <div class="ent-parallax__mesh" aria-hidden="true"></div>
      <div class="ent-parallax__floats">${floats}</div>
      <svg class="ent-parallax__svg ent-parallax__svg--top" viewBox="0 0 1440 48" preserveAspectRatio="none" aria-hidden="true"><path fill="rgba(255,255,255,0.06)" d="M0,32 C360,0 720,48 1080,16 C1260,0 1380,8 1440,24 L1440,0 L0,0 Z"/></svg>
      <div class="ent-parallax__inner">
        <article class="ent-parallax__glass" data-aos="fade-up" data-aos-duration="900">
          <span class="ent-parallax__glass-glow" aria-hidden="true"></span>
          <span class="ent-parallax__badge"><i class="${faIcon(opts.badgeIcon || 'fa-building')}" aria-hidden="true"></i> ${esc(opts.badge || 'Enterprise Marketing')}</span>
          <h2 id="${esc(headingId)}" class="ent-parallax__title font-display">${opts.titleHtml || 'Enterprise <span class="ent-parallax__accent">Growth</span> Starts Here'}</h2>
          <p class="ent-parallax__lead">${esc(opts.lead || '')}</p>
          <div class="ent-parallax__actions">
            <a href="${esc(primaryHref)}" class="ent-parallax__btn ent-parallax__btn--primary magnetic">${esc(primaryCta)} <i class="fas fa-arrow-right" aria-hidden="true"></i></a>
            <a href="${esc(secondaryHref)}" class="ent-parallax__btn ent-parallax__btn--ghost"><i class="fas fa-calendar-check" aria-hidden="true"></i> ${esc(secondaryCta)}</a>
          </div>
        </article>
      </div>
      <svg class="ent-parallax__svg ent-parallax__svg--bottom" viewBox="0 0 1440 48" preserveAspectRatio="none" aria-hidden="true"><path fill="rgba(248,250,252,1)" d="M0,16 C360,48 720,0 1080,32 C1260,48 1380,40 1440,24 L1440,48 L0,48 Z"/></svg>
    </section>`;
}
