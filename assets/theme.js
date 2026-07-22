// Satchmoe Studios — dark mode toggle
// Runs immediately (not deferred) so the theme class is set before first paint.
(function () {
  var STORAGE_KEY = 'satchmoe-theme';
  var saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* storage unavailable */ }
  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  var theme = saved || (prefersDark ? 'dark' : 'light');
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  }
})();

document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;

  function isDark() {
    return document.documentElement.classList.contains('dark');
  }

  function updateLabel() {
    btn.textContent = isDark() ? '☀ Light' : '🌙 Dark';
    btn.setAttribute('aria-pressed', isDark() ? 'true' : 'false');
  }

  updateLabel();

  btn.addEventListener('click', function () {
    document.documentElement.classList.toggle('dark');
    try {
      localStorage.setItem('satchmoe-theme', isDark() ? 'dark' : 'light');
    } catch (e) { /* storage unavailable */ }
    updateLabel();
  });
});
