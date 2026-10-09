// Shared, progressively enhanced interactions for the studio's marketing pages.
document.addEventListener('DOMContentLoaded', function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = window.matchMedia('(min-width: 761px)');
  document.body.classList.add('interactive-site');

  // The route belongs to the document. Scrolling reveals it without moving it.
  const svgNS = 'http://www.w3.org/2000/svg';
  const lines = document.createElementNS(svgNS, 'svg');
  lines.classList.add('scroll-lines');
  lines.setAttribute('aria-hidden', 'true');
  lines.setAttribute('focusable', 'false');
  lines.innerHTML = '<defs><clipPath id="studio-path-reveal"><rect x="0" y="0" width="0" height="0" /></clipPath></defs><g class="line-guide"><path class="line-teal"/><path class="line-blue"/></g><g class="line-drawn" clip-path="url(#studio-path-reveal)"><path class="line-teal"/><path class="line-blue"/></g>';
  document.body.append(lines);
  const revealRect = lines.querySelector('rect');
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.querySelector('header')?.append(progress);

  let pageHeight = 0;
  let lineHeight = 0;
  let furthestReveal = 0;
  let framePending = false;
  function layoutLines() {
    const width = document.documentElement.clientWidth;
    const sections = [...document.querySelectorAll('body > section')];
    if (!sections.length) return;
    const footer = document.querySelector('body > footer');
    const last = footer || sections[sections.length - 1];
    pageHeight = Math.max(window.innerHeight, last.offsetTop + last.offsetHeight);
    lineHeight = footer ? footer.offsetTop : pageHeight;
    lines.setAttribute('viewBox', `0 0 ${width} ${lineHeight}`);
    lines.style.height = `${lineHeight}px`;
    revealRect.setAttribute('width', width);
    // Straight diagonals reflect at the page edges; their geometry never slides.
    const leftEdge = Math.max(28, width * .035);
    const rightEdge = width - leftEdge;
    const slope = .88;
    // Both colors reflect against the same border. Their staggered impacts
    // naturally produce a crossing and reverse their order after each bounce.
    function route(offset) {
      let x = width * .90 + offset;
      let y = sections[0].offsetTop;
      let direction = -1;
      const points = [{ x, y }];
      while (y < lineHeight) {
        const edge = direction < 0 ? leftEdge : rightEdge;
        const travel = Math.abs(edge - x) / slope;
        const nextY = Math.min(lineHeight, y + travel);
        x += direction * slope * (nextY - y);
        y = nextY;
        points.push({ x, y });
        direction *= -1;
      }
      return points.map((point, i) => `${i ? 'L' : 'M'} ${point.x} ${point.y}`).join(' ');
    }
    lines.querySelectorAll('.line-teal').forEach(path => path.setAttribute('d', route(-21)));
    lines.querySelectorAll('.line-blue').forEach(path => path.setAttribute('d', route(21)));
    paintScroll();
  }
  function paintScroll() {
    framePending = false;
    const distance = Math.max(0, pageHeight - window.innerHeight);
    const fraction = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
    progress.style.transform = `scaleX(${fraction})`;
    if (desktop.matches && !reduceMotion.matches) {
      const nextReveal = fraction >= .995 ? pageHeight : window.scrollY + window.innerHeight * .72;
      furthestReveal = Math.max(furthestReveal, nextReveal);
      revealRect.setAttribute('height', Math.min(lineHeight, furthestReveal));
    }
  }
  function scheduleScroll() {
    if (!framePending) { framePending = true; requestAnimationFrame(paintScroll); }
  }
  window.addEventListener('scroll', scheduleScroll, { passive: true });
  window.addEventListener('resize', layoutLines);
  reduceMotion.addEventListener('change', scheduleScroll);
  desktop.addEventListener('change', layoutLines);
  layoutLines();
  document.fonts?.ready.then(layoutLines);
  if ('ResizeObserver' in window) {
    const layoutObserver = new ResizeObserver(layoutLines);
    document.querySelectorAll('body > section, body > footer').forEach(element => layoutObserver.observe(element));
  }

  // Reveal once; never hide content for reduced motion or without observer support.
  const revealTargets = document.querySelectorAll('.featured, .section-head, .card, .ios-shot, .about-grid, .contact .wrap');
  if (!reduceMotion.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealTargets.forEach(element => {
      element.classList.add('reveal');
      observer.observe(element);
    });
    reduceMotion.addEventListener('change', () => {
      if (reduceMotion.matches) {
        revealTargets.forEach(element => element.classList.add('is-visible'));
        observer.disconnect();
      }
    });
  }

  // A native modal supplies focus containment, Escape support, and an inert page.
  const shots = [...document.querySelectorAll('.ios-shot a')];
  if (!shots.length || typeof HTMLDialogElement === 'undefined') return;
  const dialog = document.createElement('dialog');
  dialog.className = 'screenshot-viewer';
  dialog.setAttribute('aria-labelledby', 'screenshot-title');
  dialog.innerHTML = '<div class="viewer-toolbar"><p id="screenshot-title"></p><button type="button" class="viewer-close" aria-label="Close screenshot viewer">Close ×</button></div><div class="viewer-stage"><img alt=""></div><p class="viewer-swipe-hint">Swipe left or right to browse</p><div class="viewer-controls"><button type="button" class="viewer-prev" aria-label="Previous screenshot">← Previous</button><span class="viewer-count" aria-live="polite"></span><button type="button" class="viewer-next" aria-label="Next screenshot">Next →</button></div>';
  document.body.append(dialog);
  const image = dialog.querySelector('img');
  const title = dialog.querySelector('#screenshot-title');
  const count = dialog.querySelector('.viewer-count');
  let index = 0;
  let opener;
  function show(next) {
    index = (next + shots.length) % shots.length;
    image.src = shots[index].href;
    image.alt = shots[index].querySelector('img').alt;
    title.textContent = shots[index].closest('figure').querySelector('strong').textContent;
    count.textContent = `${index + 1} / ${shots.length}`;
  }
  shots.forEach((link, i) => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    opener = link;
    show(i);
    dialog.showModal();
    document.body.classList.add('viewer-open');
  }));
  dialog.querySelector('.viewer-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.viewer-prev').addEventListener('click', () => show(index - 1));
  dialog.querySelector('.viewer-next').addEventListener('click', () => show(index + 1));
  // Let vertical scrolling and pinch zoom remain native. Only a deliberate
  // horizontal gesture on the image stage advances the gallery.
  const stage = dialog.querySelector('.viewer-stage');
  image.draggable = false;
  let swipe = null;
  stage.addEventListener('pointerdown', event => {
    if (!event.isPrimary) { swipe = null; return; }
    if (event.button !== 0) return;
    swipe = { id: event.pointerId, x: event.clientX, y: event.clientY, started: event.timeStamp };
    stage.setPointerCapture(event.pointerId);
  });
  stage.addEventListener('pointerup', event => {
    if (!swipe || swipe.id !== event.pointerId) return;
    const dx = event.clientX - swipe.x;
    const dy = event.clientY - swipe.y;
    const elapsed = event.timeStamp - swipe.started;
    swipe = null;
    if (Math.abs(dx) >= 50 && Math.abs(dx) > Math.abs(dy) * 1.5 && elapsed <= 1000) {
      show(index + (dx < 0 ? 1 : -1));
    }
  });
  stage.addEventListener('pointercancel', () => { swipe = null; });
  stage.addEventListener('lostpointercapture', () => { swipe = null; });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(index - 1); }
    if (event.key === 'ArrowRight') { event.preventDefault(); show(index + 1); }
  });
  dialog.addEventListener('click', event => {
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    }
  });
  dialog.addEventListener('close', () => {
    swipe = null;
    document.body.classList.remove('viewer-open');
    opener?.focus({ preventScroll: true });
  });
});
