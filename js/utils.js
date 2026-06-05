/* ════════════════════════════════════════
   Utilities: Router, placeholder images, DOM helpers
   ════════════════════════════════════════ */

const Router = {
  currentPage: null,

  init() {
    window.addEventListener('hashchange', () => this.handle());
    this.handle();
  },

  go(page, param) {
    const encoded = param ? encodeURIComponent(param) : '';
    location.hash = encoded ? `#/${page}/${encoded}` : `#/${page}`;
  },

  handle() {
    const hash = location.hash || '#/home';
    const parts = hash.replace('#/', '').split('/');
    const page = decodeURIComponent(parts[0] || 'home');
    const param = parts[1] ? decodeURIComponent(parts[1]) : null;

    if (page === 'detail' && param) {
      this.currentPage = 'detail';
      DetailPage.render(param);
    } else {
      this.currentPage = 'home';
      HomePage.render();
    }
  }
};

/** Inline SVG placeholder — works offline */
function placeholder(url, color, emoji, w, h) {
  if (url) return url;
  const bg = '#' + (color || '201d28');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <rect width="100%" height="100%" fill="${bg}" rx="8"/>
    <text x="50%" y="50%" text-anchor="middle" dominant-baseline="central"
          font-size="${Math.min(w, h) * 0.35}">${emoji || '?'}</text>
  </svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

/** Simple HTML escaping */
function esc(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Stagger animation helper */
function staggerIn(container, selector, delay) {
  delay = delay || 40;
  const els = container.querySelectorAll(selector);
  els.forEach((el, i) => {
    el.style.animationDelay = (i * delay) + 'ms';
  });
}

/** IntersectionObserver-based scroll spy */
function createScrollSpy(sectionIds, callback) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry.target.id);
      }
    });
  }, { rootMargin: '-20% 0px -60% 0px' });

  sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  return observer;
}
