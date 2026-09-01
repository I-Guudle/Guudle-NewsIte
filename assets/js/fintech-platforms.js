/**
 * FinTech Platforms — tabs, architecture, FAQ
 */
(function () {
  'use strict';

  function tabs() {
    var root = document.getElementById('ft-categories');
    if (!root) return;
    root.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-ft-tab]');
      if (!btn) return;
      var id = btn.getAttribute('data-ft-tab');
      root.querySelectorAll('[data-ft-tab]').forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      root.querySelectorAll('[data-ft-panel]').forEach(function (panel) {
        panel.hidden = panel.getAttribute('data-ft-panel') !== id;
      });
    });
  }

  function architecture() {
    var root = document.getElementById('ft-architecture');
    if (!root) return;
    var buttons = root.querySelectorAll('[data-ft-layer]');
    function activate(btn) {
      buttons.forEach(function (b) {
        var on = b === btn;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    }
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () { activate(btn); });
      btn.addEventListener('mouseenter', function () { activate(btn); });
    });
  }

  function faq() {
    document.querySelectorAll('[data-ft-faq]').forEach(function (item) {
      var btn = item.querySelector('button');
      var panel = item.querySelector('.ft-faq__panel');
      if (!btn || !panel) return;
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', open ? 'false' : 'true');
        panel.hidden = open;
      });
    });
  }

  function boot() {
    tabs();
    architecture();
    faq();
    if (window.AOS) window.AOS.init({ once: true, duration: 700, offset: 60, easing: 'ease-out-cubic' });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
