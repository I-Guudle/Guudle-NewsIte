/**

 * Guudle — Technology Partnerships section interactions

 */

(function () {

  'use strict';



  function initLogoMarquee() {

    const root = document.querySelector('[data-ptr-marquee]');

    if (!root) return;



    root.addEventListener('touchstart', () => {

      root.classList.add('is-paused');

    }, { passive: true });



    root.addEventListener('touchend', () => {

      setTimeout(() => root.classList.remove('is-paused'), 2000);

    }, { passive: true });

  }



  function initEcosystem() {

    const wrap = document.querySelector('[data-ptr-ecosystem]');

    const tooltip = document.querySelector('[data-ptr-eco-tooltip]');

    if (!wrap || !tooltip) return;



    const defaultText = tooltip.textContent.trim();



    wrap.querySelectorAll('[data-ptr-eco-partner]').forEach((node) => {

      const show = () => {

        tooltip.textContent = node.dataset.ptrEcoPartner || defaultText;

        wrap.querySelectorAll('[data-ptr-eco-partner]').forEach((n) => n.classList.remove('is-active'));

        node.classList.add('is-active');

      };

      const hide = () => {

        tooltip.textContent = defaultText;

        node.classList.remove('is-active');

      };



      node.addEventListener('mouseenter', show);

      node.addEventListener('focus', show);

      node.addEventListener('mouseleave', hide);

      node.addEventListener('blur', hide);

    });

  }



  function initPartnershipsSection() {
    if (!document.getElementById('technology-partnerships') && !document.getElementById('mobile-app-ecosystem') && !document.getElementById('marketing-ecosystem')) return;
    initLogoMarquee();
    initEcosystem();
  }

  document.addEventListener('DOMContentLoaded', initPartnershipsSection);

})();


