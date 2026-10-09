// Full-screen logo swipe between normal document navigations.
(function () {
  const root = document.documentElement;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const key = 'studio-page-transition';
  const routes = new Set(['/', '/mma-empire/', '/romemon/', '/team/', '/other-projects/', '/other-projects/smart-draft/', '/proam-dashboard/']);
  let navigating = false;
  let pending;
  try {
    pending = JSON.parse(sessionStorage.getItem(key) || 'null');
    sessionStorage.removeItem(key);
  } catch (_) { /* Navigation works normally when storage is unavailable. */ }
  if (!motion.matches && pending && pending.path === location.pathname && Date.now() - pending.time < 8000) {
    root.classList.add('page-arriving');
    // A failed or interrupted load must never leave the curtain over the page.
    setTimeout(reset, 1600);
  }
  function reset() {
    root.classList.remove('page-arriving', 'page-departing', 'page-entering');
    navigating = false;
  }
  document.addEventListener('DOMContentLoaded', function () {
    if (root.classList.contains('page-arriving')) {
      const mobile = window.matchMedia('(max-width:760px)').matches;
      // Hold the logo for a beat after the new document is ready, then reveal it.
      setTimeout(() => {
        if (!root.classList.contains('page-arriving')) return;
        root.classList.add('page-entering');
        setTimeout(reset, mobile ? 240 : 300);
      }, mobile ? 140 : 220);
    }
    document.addEventListener('click', function (event) {
      const link = event.target.closest('a[href]');
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || motion.matches || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
      const target = new URL(link.href, location.href);
      if (target.origin !== location.origin || !routes.has(target.pathname) || target.pathname === location.pathname) return;
      if (navigating) { event.preventDefault(); return; }
      // Do not delay navigation unless the destination can recover its arrival state.
      try {
        sessionStorage.setItem(key, JSON.stringify({ path: target.pathname, time: Date.now() }));
      } catch (_) { return; }
      event.preventDefault();
      navigating = true;
      root.classList.remove('page-arriving', 'page-entering');
      root.classList.add('page-departing');
      const duration = window.matchMedia('(max-width:760px)').matches ? 180 : 230;
      setTimeout(() => location.assign(target.href), duration);
      setTimeout(reset, 2000);
    });
  });
  window.addEventListener('pageshow', event => { if (event.persisted) reset(); });
  motion.addEventListener('change', () => { if (motion.matches) reset(); });
})();
