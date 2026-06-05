/* ════════════════════════════════════════
   App entry — init + bootstrap
   ════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // Bootstrap default data
  const shows = Storage.getShows();
  const hasBigBang = shows.some(s => s.id === 'big-bang-theory');
  if (!hasBigBang) {
    Storage.addShow('big-bang-theory', 'shangqiu-yizhong');
  } else {
    // Ensure all shows have locationId (data migration)
    const data = Storage.getAll();
    let changed = false;
    data.shows.forEach(s => {
      if (!s.locationId) { s.locationId = 'shangqiu-yizhong'; changed = true; }
    });
    if (changed) Storage.save(data);
  }

  // Init modal
  Modal.init();

  // Keyboard support for nav logo
  document.querySelectorAll('[role="link"]').forEach(el => {
    el.addEventListener('keydown', (e) => { if (e.key === 'Enter') el.click(); });
  });

  // Start router
  Router.init();
});
