/* ════════════════════════════════════════
   Home Page — Hero + Search + Show Grid
   ════════════════════════════════════════ */

const HomePage = {
  filter: 'all',
  search: '',

  render() {
    const app = document.getElementById('app');
    const allShows = this._loadShows();

    app.innerHTML = `
      <div class="hero">
        <div class="hero-glow" aria-hidden="true"></div>
        <div class="hero-overline">影视百科</div>
        <h1 class="hero-title">探索<span class="highlight">光影</span>的世界</h1>
        <p class="hero-desc">收录你喜爱的每一部剧集。深入了解演员、场景、剧情、冷知识，构建属于你自己的影视百科。</p>
        <div class="search-box">
          <span class="search-icon" aria-hidden="true">⌕</span>
          <input type="text" id="search-input" placeholder="搜索剧集名称、演员、类型…"
                 value="${esc(this.search)}" aria-label="搜索剧集">
        </div>
        <div class="filters" id="filters">${this._renderFilters(allShows)}</div>
      </div>
      <div id="grid-area">${this._renderGrid(allShows)}</div>
    `;

    this._bindEvents(app, allShows);
  },

  _loadShows() {
    const entries = Storage.getShows();
    return entries.map(entry => {
      const data = getShowData(entry.id);
      if (!data) return null;
      return { ...data, locationId: entry.locationId };
    }).filter(Boolean);
  },

  _getFiltered(shows) {
    let result = shows;
    if (this.filter !== 'all') {
      result = result.filter(s => s.genre && s.genre.includes(this.filter));
    }
    if (this.search.trim()) {
      const q = this.search.toLowerCase();
      result = result.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.titleEn.toLowerCase().includes(q) ||
        (s.genre && s.genre.toLowerCase().includes(q)) ||
        (s.description && s.description.toLowerCase().includes(q)) ||
        (s.cast && s.cast.some(c =>
          c.name.toLowerCase().includes(q) ||
          (c.nameCn && c.nameCn.includes(q)) ||
          (c.role && c.role.toLowerCase().includes(q))
        ))
      );
    }
    return result;
  },

  _renderFilters(shows) {
    const genres = new Set();
    shows.forEach(s => {
      if (s.genre) s.genre.split(/\s*[\/·]\s*/).forEach(g => genres.add(g.trim()));
    });

    const chips = [{ key: 'all', label: '全部' }];
    genres.forEach(g => chips.push({ key: g, label: g }));

    return chips.map(c => `
      <button class="filter-chip ${c.key === this.filter ? 'active' : ''}"
              data-filter="${c.key}">${c.label}</button>
    `).join('');
  },

  _renderGrid(shows) {
    const filtered = this._getFiltered(shows);
    const available = getAvailableShows();
    const added = Storage.getShows().map(s => s.id);
    const canAdd = available.length > added.length;

    if (shows.length === 0) {
      return `
        <div class="empty-state">
          <div class="empty-icon">🎬</div>
          <h3>还没有收录任何剧集</h3>
          <p>开始构建你的影视百科，收录你喜爱的每一部作品。</p>
          <button class="btn-primary" onclick="Modal.showAddShow()">＋ 添加第一部剧集</button>
        </div>
      `;
    }

    if (filtered.length === 0) {
      return `
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <h3>没有找到匹配的剧集</h3>
          <p>试试其他关键词，或者清除筛选条件。</p>
        </div>
      `;
    }

    const cards = filtered.map((show, i) => `
      <article class="show-card" data-id="${show.id}" style="animation-delay:${i * 50}ms">
        <div class="show-card-top">
          <div class="show-card-logo">${show.logo}</div>
          <div class="show-card-info">
            <h3 class="show-card-title">${esc(show.title)}</h3>
            <div class="show-card-sub">${esc(show.titleEn)} · ${esc(show.year)}</div>
            <div class="show-card-tags">
              ${show.rating ? `<span class="tag tag-rating">${show.rating} ★</span>` : ''}
              <span class="tag tag-seasons">${show.seasons}季 · ${show.episodes}集</span>
              ${show.network ? `<span class="tag tag-network">${esc(show.network)}</span>` : ''}
            </div>
          </div>
        </div>
        <p class="show-card-desc">${esc(show.description)}</p>
        <div class="show-card-footer">
          <span class="show-card-action">查看详情 →</span>
          <span class="show-card-meta">${show.cast ? show.cast.length + '位演员' : ''}</span>
        </div>
      </article>
    `).join('');

    return `
      <div class="results-info">
        <span class="results-count">${filtered.length} 部剧集${this.search ? ` · "${esc(this.search)}"` : ''}</span>
        ${canAdd ? `<button class="btn-primary" onclick="Modal.showAddShow()" style="padding:6px 16px;font-size:12px;">＋ 添加</button>` : ''}
      </div>
      <div class="show-grid">${cards}</div>
    `;
  },

  _bindEvents(app, allShows) {
    // Search
    const searchInput = app.querySelector('#search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.search = e.target.value;
        this._refreshGrid(app, allShows);
      });
      // Auto-focus search on load
      setTimeout(() => searchInput.focus(), 100);
    }

    // Filters
    app.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        this.filter = chip.dataset.filter;
        this._refreshGrid(app, allShows);
        // Update filter chip styles
        app.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
      });
    });

    // Card clicks
    app.querySelectorAll('.show-card').forEach(card => {
      card.addEventListener('click', () => {
        Router.go('detail', card.dataset.id);
      });
    });
  },

  _refreshGrid(app, allShows) {
    const gridArea = app.querySelector('#grid-area');
    if (gridArea) {
      gridArea.innerHTML = this._renderGrid(allShows);
      // Re-bind card clicks
      gridArea.querySelectorAll('.show-card').forEach(card => {
        card.addEventListener('click', () => {
          Router.go('detail', card.dataset.id);
        });
      });
    }
  }
};
