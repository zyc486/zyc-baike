const Storage = {
  KEY: 'zyc-encyclopedia',

  defaults() {
    return {
      shows: [],
      locations: [],
      currentShow: null
    };
  },

  getAll() {
    try {
      const raw = localStorage.getItem(this.KEY);
      if (raw) {
        const data = JSON.parse(raw);
        const merged = { ...this.defaults(), ...data };
        // Migrate old format: shows was string[], now is {id, locationId}[]
        if (merged.shows.length > 0 && typeof merged.shows[0] === 'string') {
          merged.shows = merged.shows.map(id => ({ id, locationId: null }));
        }
        return merged;
      }
    } catch (e) {
      console.warn('Storage read error, resetting:', e);
      localStorage.removeItem(this.KEY);
    }
    return this.defaults();
  },

  save(data) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Storage write error:', e);
    }
  },

  addShow(showId, locationId) {
    const data = this.getAll();
    if (!data.shows.find(s => s.id === showId)) {
      data.shows.push({ id: showId, locationId: locationId || null });
      this.save(data);
    }
  },

  removeShow(showId) {
    const data = this.getAll();
    data.shows = data.shows.filter(s => s.id !== showId);
    if (data.currentShow === showId) data.currentShow = null;
    this.save(data);
  },

  addLocation(loc) {
    const data = this.getAll();
    if (!data.locations.find(l => l.id === loc.id)) {
      data.locations.push(loc);
      this.save(data);
    }
  },

  removeLocation(locId) {
    const data = this.getAll();
    data.locations = data.locations.filter(l => l.id !== locId);
    // Also remove shows linked to this location
    data.shows = data.shows.filter(s => s.locationId !== locId);
    this.save(data);
  },

  getLocations() {
    return this.getAll().locations;
  },

  getShows() {
    return this.getAll().shows;
  },

  isShowAdded(showId) {
    return this.getAll().shows.some(s => s.id === showId);
  },

  setCurrentShow(showId) {
    const data = this.getAll();
    data.currentShow = showId;
    this.save(data);
  },

  reset() {
    localStorage.removeItem(this.KEY);
  }
};
