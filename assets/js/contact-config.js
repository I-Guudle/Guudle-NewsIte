/**
 * Guudle contact endpoints + Supabase bridge flags
 */
window.GUUDLE_CONTACT = Object.assign(
  {
    /** Legacy PHP fallback (optional) */
    csrfUrl: '../api/csrf-token.php',
    submitUrl: '../api/submit-inquiry.php',
    maxFileSize: 10 * 1024 * 1024,
    maxFiles: 5,
    allowedExtensions: ['pdf', 'doc', 'docx', 'png', 'jpg', 'jpeg', 'gif', 'webp', 'zip', 'txt', 'xlsx', 'pptx'],
    /** Prefer Supabase when configured */
    preferSupabase: true,
  },
  window.GUUDLE_CONTACT || {}
);
