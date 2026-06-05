/* ════════════════════════════════════════
   Home Page — Carousel + Poster Grid
   ════════════════════════════════════════ */

const HomePage = {
  filter: 'all',
  search: '',
  carouselIndex: 0,
  _carouselTimer: null,

  render() {
    const app = document.getElementById('app');
    const allShows = this._loadShows();

    app.innerHTML = `
      ${this._renderCarousel(allShows)}
      <div class="home-filters-wrap">
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
    this._startCarousel(allShows);
  },

  _loadShows() {
    const entries = Storage.getShows();
    return entries.map(entry => {
      const data = getShowData(entry.id);
      if (!data) return null;
      return { ...data, locationId: entry.locationId };
    }).filter(Boolean);
  },

  _renderCarousel(shows) {
    if (shows.length === 0) return '';
    const show = shows[this.carouselIndex % shows.length];
    const bgUrl = placeholder('', '12121a', show.logo, 1920, 1080);
    return `
      <div class="hero-carousel" id="hero-carousel">
        <div class="hero-carousel-bg" style="background-image:linear-gradient(180deg, transparent 30%, rgba(10,10,15,0.85) 100%), url('${bgUrl}')"></div>
        <div class="hero-carousel-glow" aria-hidden="true"></div>
        <div class="glass-panel">
          <div class="glass-panel-tags">
            ${show.rating ? `<span class="tag tag-rating">${show.rating} ★</span>` : ''}
            <span class="tag tag-seasons">${show.seasons}季 · ${show.episodes}集</span>
          </div>
          <h1 class="glass-panel-title">${esc(show.title)}</h1>
          <p class="glass-panel-desc">${esc(show.description)}</p>
          <button class="glass-panel-btn" data-id="${show.id}">立即探索 →</button>
        </div>
        <div class="carousel-dots" id="carousel-dots">
          ${shows.map((_, i) => `<span class="carousel-dot ${i === this.carouselIndex ? 'active' : ''}" data-index="${i}"></span>`).join('')}
        </div>
      </div>
    `;
  },

  _startCarousel(shows) {
    if (shows.length <= 1) return;
    clearInterval(this._carouselTimer);
    this._carouselTimer = setInterval(() => {
      this.carouselIndex = (this.carouselIndex + 1) % shows.length;
      this._updateCarousel(shows);
    }, 5000);
  },

  _updateCarousel(shows) {
    const carousel = document.getElementById('hero-carousel');
    if (!carousel) return;
    const show = shows[this.carouselIndex];
    const title = carousel.querySelector('.glass-panel-title');
    const desc = carousel.querySelector('.glass-panel-desc');
    const tags = carousel.querySelector('.glass-panel-tags');
    const btn = carousel.querySelector('.glass-panel-btn');
    const bg = carousel.querySelector('.hero-carousel-bg');

    carousel.style.opacity = '0';
    setTimeout(() => {
      if (title) title.textContent = show.title;
      if (desc) desc.textContent = show.description;
      if (tags) {
        tags.innerHTML = `
          ${show.rating ? `<span class="tag tag-rating">${show.rating} ★</span>` : ''}
          <span class="tag tag-seasons">${show.seasons}季 · ${show.episodes}集</span>
        `;
      }
      if (btn) btn.dataset.id = show.id;
      if (bg) {
        const newBgUrl = placeholder('', '12121a', show.logo, 1920, 1080);
        bg.style.backgroundImage = `linear-gradient(180deg, transparent 30%, rgba(10,10,15,0.85) 100%), url('${newBgUrl}')`;
      }
      carousel.querySelectorAll('.carousel-dot').forEach((d, i) => {
        d.classList.toggle('active', i === this.carouselIndex);
      });
      carousel.style.opacity = '1';
    }, 300);
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
      <article class="show-card" data-id="${show.id}" style="animation-delay:${i * 60}ms">
        <div class="show-card-poster"${show.poster ? ` style="background-image:url('${show.poster}');background-size:cover;background-position:center"` : ''}>
          ${show.poster ? '' : `<span class="show-card-logo">${show.logo}</span>`}
        </div>
        <div class="show-card-info-overlay">
          <h3 class="show-card-title">${esc(show.title)}</h3>
          <div class="show-card-meta">${esc(show.year)} · ${show.rating || ''} ★</div>
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
    }

    // Filters
    app.querySelectorAll('.filter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        this.filter = chip.dataset.filter;
        this._refreshGrid(app, allShows);
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

    // Carousel explore button
    const panelBtn = app.querySelector('.glass-panel-btn');
    if (panelBtn) {
      panelBtn.addEventListener('click', () => {
        Router.go('detail', panelBtn.dataset.id);
      });
    }

    // Carousel dots
    app.querySelectorAll('.carousel-dot').forEach(dot => {
      dot.addEventListener('click', () => {
        this.carouselIndex = parseInt(dot.dataset.index);
        this._updateCarousel(allShows);
        clearInterval(this._carouselTimer);
        this._startCarousel(allShows);
      });
    });
  },

  _refreshGrid(app, allShows) {
    const gridArea = app.querySelector('#grid-area');
    if (gridArea) {
      gridArea.innerHTML = this._renderGrid(allShows);
      gridArea.querySelectorAll('.show-card').forEach(card => {
        card.addEventListener('click', () => {
          Router.go('detail', card.dataset.id);
        });
      });
    }
  }
};
