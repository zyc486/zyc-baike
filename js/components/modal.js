/* ════════════════════════════════════════
   Modal — Add Show / Add Location
   ════════════════════════════════════════ */

const Modal = {
  overlay: null,
  content: null,
  _prevFocus: null,
  _keyHandler: null,
  _selectedShowId: null,
  _selectedLocationId: null,
  _pickIcon: '📍',

  init() {
    this.overlay = document.getElementById('modal-overlay');
    this.content = document.getElementById('modal-content');
    if (this.overlay) {
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) this.hide();
      });
    }
  },

  show(html) {
    if (!this.content || !this.overlay) return;
    this._prevFocus = document.activeElement;
    this.content.innerHTML = html;
    this.overlay.classList.add('active');
    this.overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    this._keyHandler = (e) => {
      if (e.key === 'Escape') return this.hide();
      if (e.key !== 'Tab') return;
      const focusable = this.content.querySelectorAll(
        'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', this._keyHandler);
    requestAnimationFrame(() => {
      const first = this.content.querySelector('button, input, [tabindex]:not([tabindex="-1"])');
      if (first) first.focus();
    });
  },

  hide() {
    if (!this.overlay) return;
    this.overlay.classList.remove('active');
    this.overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (this._keyHandler) { document.removeEventListener('keydown', this._keyHandler); this._keyHandler = null; }
    if (this._prevFocus) { this._prevFocus.focus(); this._prevFocus = null; }
  },

  /* ── Add Show ── */

  showAddShow() {
    const available = getAvailableShows();
    const added = Storage.getShows().map(s => s.id);
    const unadded = available.filter(id => !added.includes(id));

    if (!unadded.length) {
      return this.show(`
        <div class="modal-header">
          <h3>添加剧集</h3>
          <button class="modal-close" onclick="Modal.hide()">✕</button>
        </div>
        <p style="color:var(--text-secondary);text-align:center;padding:24px 0;">
          所有预置剧集都已收录！
        </p>
      `);
    }

    const showOptions = unadded.map(id => {
      const show = getShowData(id);
      return `
        <div class="pick-item" data-showid="${id}" onclick="Modal._pickShow('${id}')">
          <span class="pick-icon">${show.logo}</span>
          <span class="pick-name">${esc(show.title)}</span>
          <span class="pick-badge">${esc(show.year)}</span>
        </div>
      `;
    }).join('');

    this.show(`
      <div class="modal-header">
        <h3>添加剧集</h3>
        <button class="modal-close" onclick="Modal.hide()">✕</button>
      </div>
      <div class="modal-field">
        <label>选择剧集</label>
        <div class="pick-list" id="show-pick-list">${showOptions}</div>
      </div>
      <div id="modal-loc-section" style="display:none">
        <div class="modal-field">
          <label>选择关联地点</label>
          <div class="pick-list" id="loc-pick-list"></div>
        </div>
        <div class="modal-field">
          <label>搜索新地点</label>
          <input type="text" class="modal-input" id="loc-search"
                 placeholder="输入地点名称…" oninput="Modal._onLocSearch(this.value)">
          <div class="search-results" id="loc-search-results"></div>
        </div>
        <button class="modal-submit" onclick="Modal._confirmAddShow()">确认收录</button>
      </div>
    `);

    this._selectedShowId = null;
    this._selectedLocationId = null;
  },

  _pickShow(showId) {
    this._selectedShowId = showId;
    document.querySelectorAll('#show-pick-list .pick-item').forEach(el => {
      el.classList.toggle('selected', el.dataset.showid === showId);
    });
    const section = document.getElementById('modal-loc-section');
    if (section) {
      section.style.display = 'block';
      this._renderLocList();
    }
  },

  _renderLocList() {
    const list = document.getElementById('loc-pick-list');
    if (!list) return;
    const all = PREDEFINED_LOCATIONS.concat(Storage.getLocations());
    const used = Storage.getShows().map(s => s.locationId).filter(Boolean);

    list.innerHTML = all.map(loc => {
      const taken = used.includes(loc.id);
      return `
        <div class="pick-item ${taken ? 'taken' : ''}" data-locid="${loc.id}"
             ${taken ? '' : `onclick="Modal._pickLoc('${loc.id}')"`}>
          <span class="pick-icon">${loc.icon}</span>
          <span class="pick-name">${esc(loc.name)}</span>
          <span class="pick-badge">${esc(loc.type)}</span>
        </div>
      `;
    }).join('');
  },

  _pickLoc(locId) {
    this._selectedLocationId = locId;
    document.querySelectorAll('#loc-pick-list .pick-item').forEach(el => {
      el.classList.toggle('selected', el.dataset.locid === locId);
    });
  },

  _onLocSearch(query) {
    const results = document.getElementById('loc-search-results');
    if (!results) return;
    if (!query.trim()) { results.innerHTML = ''; return; }

    const all = PREDEFINED_LOCATIONS.concat(Storage.getLocations());
    const matches = all.filter(l =>
      l.name.toLowerCase().includes(query.toLowerCase()) ||
      l.type.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 6);

    if (!matches.length) {
      results.innerHTML = `
        <div class="search-result-item" onclick="Modal._addCustomLoc('${esc(query)}')">
          <span class="sr-icon">＋</span>
          <span class="sr-name">添加「${esc(query)}」为新地点</span>
        </div>
      `;
      return;
    }

    results.innerHTML = matches.map(loc => `
      <div class="search-result-item" onclick="Modal._pickLoc('${loc.id}');document.getElementById('loc-search-results').innerHTML=''">
        <span class="sr-icon">${loc.icon}</span>
        <span class="sr-name">${esc(loc.name)}</span>
        <span class="sr-type">${esc(loc.type)}</span>
      </div>
    `).join('');
  },

  _addCustomLoc(name) {
    const id = 'custom-' + Date.now();
    const loc = { id, name, type: '自定义', icon: '📍', x: 30 + Math.random() * 40, y: 30 + Math.random() * 40 };
    Storage.addLocation(loc);
    this._selectedLocationId = id;
    this._renderLocList();
    const input = document.getElementById('loc-search');
    if (input) input.value = '';
    const results = document.getElementById('loc-search-results');
    if (results) results.innerHTML = '';
  },

  _confirmAddShow() {
    if (!this._selectedShowId) return alert('请选择一部剧集');
    if (!this._selectedLocationId) return alert('请选择一个地点');
    Storage.addShow(this._selectedShowId, this._selectedLocationId);
    this.hide();
    // Re-render current page
    Router.handle();
  },

  /* ── Add Location (standalone) ── */

  showAddLocation() {
    this.show(`
      <div class="modal-header">
        <h3>添加地点</h3>
        <button class="modal-close" onclick="Modal.hide()">✕</button>
      </div>
      <div class="modal-field">
        <label>地点名称</label>
        <input type="text" class="modal-input" id="new-loc-name" placeholder="例如：商丘古城">
      </div>
      <div class="modal-field">
        <label>类型</label>
        <input type="text" class="modal-input" id="new-loc-type" placeholder="学校、景点、商圈…">
      </div>
      <div class="modal-field">
        <label>图标</label>
        <div class="icon-picker">
          ${['📍','🏫','🏯','🚉','🏬','🌊','📖','🔥','⛩️','🌳','🎪','⛪','🏥','🏪','🎭'].map(e => `
            <button class="icon-pick-btn" onclick="Modal._pickIconBtn(this,'${e}')">${e}</button>
          `).join('')}
        </div>
      </div>
      <button class="modal-submit" onclick="Modal._confirmAddLoc()">确认添加</button>
    `);
    this._pickIcon = '📍';
  },

  _pickIconBtn(btn, icon) {
    this._pickIcon = icon;
    document.querySelectorAll('.icon-pick-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  },

  _confirmAddLoc() {
    const name = document.getElementById('new-loc-name')?.value?.trim();
    const type = document.getElementById('new-loc-type')?.value?.trim() || '自定义';
    if (!name) return alert('请输入地点名称');
    const loc = { id: 'custom-' + Date.now(), name, type, icon: this._pickIcon || '📍', x: 30 + Math.random() * 40, y: 30 + Math.random() * 40 };
    Storage.addLocation(loc);
    this.hide();
  }
};
