/* ════════════════════════════════════════
   Detail Page — Immersive Show Reading
   ════════════════════════════════════════ */

const DetailPage = {
  sections: [
    { id: 'cast',      label: '演员阵容', icon: '👤' },
    { id: 'scenes',    label: '经典场景', icon: '🎬' },
    { id: 'timeline',  label: '剧情脉络', icon: '📖' },
    { id: 'trivia',    label: '冷知识',   icon: '💡' },
    { id: 'fashion',   label: '经典造型', icon: '👔' },
    { id: 'locations', label: '取景地',   icon: '📍' },
  ],

  render(showId) {
    const show = getShowData(showId);
    if (!show) return Router.go('home');

    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="detail-header" id="detail-header">
        <span class="detail-header-logo">${show.logo}</span>
        <span class="detail-header-title">${esc(show.title)}</span>
        <button class="detail-header-back" onclick="Router.go('home')">← 返回</button>
      </div>

      <div class="detail-hero">
        <div class="detail-hero-glow" aria-hidden="true"></div>
        <div class="detail-hero-content">
          <div class="detail-hero-logo">${show.logo}</div>
          <div class="detail-hero-info">
            <h1 class="detail-hero-title">${esc(show.title)}</h1>
            <div class="detail-hero-sub">${esc(show.titleEn)} · ${esc(show.year)}</div>
            <div class="detail-hero-tags">
              ${show.rating ? `<span class="tag tag-rating">${show.rating} ★</span>` : ''}
              <span class="tag tag-seasons">${show.seasons}季 · ${show.episodes}集</span>
              ${show.network ? `<span class="tag tag-network">${esc(show.network)}</span>` : ''}
              ${show.genre ? show.genre.split(/\s*[\/·]\s*/).map(g =>
                `<span class="tag" style="background:rgba(255,255,255,0.04);color:var(--text-muted)">${esc(g)}</span>`
              ).join('') : ''}
            </div>
            <p class="detail-hero-desc">${esc(show.description)}</p>
            ${show.tagline ? `<p style="margin-top:12px;font-size:12px;color:var(--text-muted);font-style:italic;">"${esc(show.tagline)}"</p>` : ''}
          </div>
        </div>
      </div>

      <div class="detail-layout">
        <aside class="detail-sidebar" id="detail-sidebar">
          <div class="sidebar-label">目录</div>
          <nav class="sidebar-nav">
            ${this.sections.map((s, i) => `
              <button class="sidebar-link ${i === 0 ? 'active' : ''}" data-section="${s.id}">
                <span class="sidebar-link-line"></span>
                <span class="sidebar-link-text">${s.label}</span>
              </button>
            `).join('')}
          </nav>
        </aside>
        <div class="detail-content" id="detail-content">
          ${this._renderCast(show)}
          ${this._renderScenes(show)}
          ${this._renderTimeline(show)}
          ${this._renderTrivia(show)}
          ${this._renderFashion(show)}
          ${this._renderLocations(show)}
        </div>
      </div>

      <button class="back-to-top" id="back-to-top" aria-label="回到顶部">↑</button>
    `;

    this._bindEvents(show);
  },

  /* ── Section renderers ── */

  _renderCast(show) {
    if (!show.cast || show.cast.length === 0) return '';
    const cards = show.cast.map(c => `
      <div class="cast-card">
        <div class="cast-top">
          <div class="cast-avatar">
            <img src="${placeholder(c.image, c.imageColor, c.avatar || '?', 150, 150)}"
                 alt="${esc(c.nameCn || c.name)}" loading="lazy">
          </div>
          <div class="cast-info">
            <h3 class="cast-name">${esc(c.nameCn || c.name)}</h3>
            <div class="cast-role">饰演 ${esc(c.roleCn || c.role)} (${esc(c.role)})</div>
            <p class="cast-bio">${esc(c.bio)}</p>
            ${c.awards && c.awards.length ? `
              <div class="cast-tags">${c.awards.map(a => `<span class="cast-tag">${esc(a)}</span>`).join('')}</div>
            ` : ''}
            ${c.funFact ? `<div class="cast-funfact">💡 ${esc(c.funFact)}</div>` : ''}
          </div>
        </div>
      </div>
    `).join('');

    return `
      <section class="detail-section" id="section-cast">
        <div class="section-head">
          <h2 class="section-title">演员阵容</h2>
          <span class="section-count">${show.cast.length} 位</span>
        </div>
        <p class="section-subtitle">${esc(show.title)} 的演员们</p>
        <div class="cast-grid">${cards}</div>
      </section>
    `;
  },

  _renderScenes(show) {
    if (!show.scenes || show.scenes.length === 0) return '';
    const cards = show.scenes.map(s => `
      <div class="scene-card">
        <div class="scene-icon-bar">${s.icon || '🎬'}</div>
        <h4>${esc(s.name)}</h4>
        <p>${esc(s.description)}</p>
        ${s.showVsReal ? `
          <div class="scene-vs">
            <span class="scene-vs-label">剧中 vs 现实</span>
            ${esc(s.showVsReal)}
          </div>
        ` : ''}
      </div>
    `).join('');

    return `
      <section class="detail-section" id="section-scenes">
        <div class="section-head">
          <h2 class="section-title">经典场景</h2>
          <span class="section-count">${show.scenes.length} 个</span>
        </div>
        <p class="section-subtitle">那些令人难忘的空间</p>
        <div class="scenes-grid">${cards}</div>
      </section>
    `;
  },

  _renderTimeline(show) {
    if (!show.timeline || show.timeline.length === 0) return '';
    const items = show.timeline.map(t => `
      <div class="timeline-item">
        <div class="timeline-season">${esc(t.season)}</div>
        <p class="timeline-desc">${esc(t.desc)}</p>
        ${t.highlight ? `<span class="timeline-highlight">★ ${esc(t.highlight)}</span>` : ''}
      </div>
    `).join('');

    return `
      <section class="detail-section" id="section-timeline">
        <div class="section-head">
          <h2 class="section-title">剧情脉络</h2>
          <span class="section-count">${show.seasons} 季</span>
        </div>
        <p class="section-subtitle">${show.seasons} 季的精彩旅程</p>
        <div class="timeline">${items}</div>
      </section>
    `;
  },

  _renderTrivia(show) {
    if (!show.trivia || show.trivia.length === 0) return '';
    const cards = show.trivia.map((t, i) => `
      <div class="trivia-card">
        <div class="trivia-num">${String(i + 1).padStart(2, '0')}</div>
        ${t.category ? `<span class="trivia-cat">${esc(t.category)}</span>` : ''}
        <p>${esc(t.text)}</p>
      </div>
    `).join('');

    return `
      <section class="detail-section" id="section-trivia">
        <div class="section-head">
          <h2 class="section-title">冷知识</h2>
          <span class="section-count">${show.trivia.length} 条</span>
        </div>
        <p class="section-subtitle">你可能不知道的幕后故事</p>
        <div class="trivia-grid">${cards}</div>
      </section>
    `;
  },

  _renderFashion(show) {
    if (!show.fashion || show.fashion.length === 0) return '';
    const cards = show.fashion.map(f => `
      <div class="fashion-card">
        <div class="fashion-icon-bar">${f.icon || '👔'}</div>
        <h4>${esc(f.name)}</h4>
        <p>${esc(f.desc)}</p>
      </div>
    `).join('');

    return `
      <section class="detail-section" id="section-fashion">
        <div class="section-head">
          <h2 class="section-title">经典造型</h2>
          <span class="section-count">${show.fashion.length} 套</span>
        </div>
        <p class="section-subtitle">角色的标志性穿搭</p>
        <div class="fashion-grid">${cards}</div>
      </section>
    `;
  },

  _renderLocations(show) {
    if (!show.locations || show.locations.length === 0) return '';
    const cards = show.locations.map(l => `
      <div class="location-card">
        <div class="loc-icon">${l.icon || '📍'}</div>
        <div class="loc-info">
          <h4>${esc(l.name)}</h4>
          <p>${esc(l.desc)}</p>
        </div>
      </div>
    `).join('');

    return `
      <section class="detail-section" id="section-locations">
        <div class="section-head">
          <h2 class="section-title">取景地</h2>
          <span class="section-count">${show.locations.length} 处</span>
        </div>
        <p class="section-subtitle">剧中涉及的真实地点</p>
        <div class="locations-grid">${cards}</div>
      </section>
    `;
  },

  /* ── Event binding ── */

  _bindEvents(show) {
    const header = document.getElementById('detail-header');
    const backToTop = document.getElementById('back-to-top');
    const sidebar = document.getElementById('detail-sidebar');

    // Sticky header: show when scrolled past hero
    const heroEl = document.querySelector('.detail-hero');
    if (heroEl && header) {
      const headerObserver = new IntersectionObserver(entries => {
        header.classList.toggle('visible', !entries[0].isIntersecting);
      }, { threshold: 0 });
      headerObserver.observe(heroEl);
    }

    // Back to top button
    if (backToTop) {
      window.addEventListener('scroll', () => {
        backToTop.classList.toggle('visible', window.scrollY > 600);
      }, { passive: true });
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Scroll spy for sidebar
    if (sidebar) {
      const sectionIds = this.sections.map(s => 'section-' + s.id);
      const spy = createScrollSpy(sectionIds, (activeId) => {
        const key = activeId.replace('section-', '');
        sidebar.querySelectorAll('.sidebar-link').forEach(link => {
          link.classList.toggle('active', link.dataset.section === key);
        });
      });

      // Sidebar click navigation
      sidebar.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', () => {
          const target = document.getElementById('section-' + link.dataset.section);
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
    }
  }
};
