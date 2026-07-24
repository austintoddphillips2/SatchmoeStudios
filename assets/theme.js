// Satchmoe Studios: dark mode toggle + mobile nav menu
// The theme part runs immediately (not deferred) so the class is set before first paint.
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
  /* ---- Theme toggle ---- */
  var btn = document.getElementById('theme-toggle');
  if (btn) {
    var icon = btn.querySelector('.tt-icon');
    var label = btn.querySelector('.tt-label');

    function isDark() {
      return document.documentElement.classList.contains('dark');
    }

    function updateToggle() {
      var dark = isDark();
      if (icon) icon.textContent = dark ? '☀' : '🌙';
      if (label) label.textContent = dark ? ' Light' : ' Dark';
      btn.setAttribute('aria-pressed', dark ? 'true' : 'false');
      btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    }

    updateToggle();

    btn.addEventListener('click', function () {
      document.documentElement.classList.toggle('dark');
      try {
        localStorage.setItem('satchmoe-theme', isDark() ? 'dark' : 'light');
      } catch (e) { /* storage unavailable */ }
      updateToggle();
    });
  }

  /* ---- Mobile nav menu ---- */
  var navToggle = document.getElementById('nav-toggle');
  var header = document.querySelector('header');
  if (navToggle && header) {
    function closeMenu() {
      header.classList.remove('menu-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.textContent = '☰';
    }
    function openMenu() {
      header.classList.add('menu-open');
      navToggle.setAttribute('aria-expanded', 'true');
      navToggle.textContent = '✕';
    }

    navToggle.addEventListener('click', function () {
      if (header.classList.contains('menu-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // close the menu after picking a link
    var links = header.querySelectorAll('.navlinks a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', closeMenu);
    }

    // close the menu if the viewport grows back past the mobile breakpoint
    window.addEventListener('resize', function () {
      if (window.innerWidth > 760) closeMenu();
    });
  }
});
