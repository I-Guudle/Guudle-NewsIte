/**
 * Guudle — Supabase public configuration
 * Load supabase-config.local.js after this file to set project values.
 */
(function (global) {
  'use strict';

  var base = {
    url: '',
    anonKey: '',
    table: 'Guudleitsolutions',
    submitCooldownMs: 30000,
    minFillMs: 2500,
  };

  global.GUUDLE_SUPABASE = Object.assign({}, base, global.GUUDLE_SUPABASE || {});
})(typeof window !== 'undefined' ? window : globalThis);
