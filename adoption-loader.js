/* ===================================================
   CARAPAPOILS — Chargement automatique des animaux
   depuis les données saisies dans l'administration
   =================================================== */

(function () {
  const STORAGE_KEY = 'carapapoils_animaux';
  const grid        = document.getElementById('animalsGrid');
  const emptyState  = document.getElementById('animalsEmpty');

  function getAnimaux() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch { return []; }
  }

  function badgeLabel(espece) {
    const map = { chat: 'Chat', chien: 'Chien', autre: 'Autre' };
    return map[espece] || espece;
  }

  function renderCards() {
    const list = getAnimaux();

    // Supprimer les anciennes cartes injectées
    grid.querySelectorAll('.animal-card--dynamic').forEach(el => el.remove());

    if (!list.length) {
      // Aucun animal — l'état vide par défaut (chatons-priority) reste visible
      return;
    }

    // Cacher la box chatons-priority si on a des animaux
    const priority = grid.querySelector('.chatons-priority');
    if (priority) priority.style.display = 'none';
    if (emptyState) emptyState.style.display = 'none';

    list.forEach(a => {
      const card = document.createElement('article');
      card.className = 'animal-card animal-card--dynamic';
      card.setAttribute('data-espece', a.espece);

      const tagsHtml = a.tags.map(t => `<span class="animal-tag">${t}</span>`).join('');

      card.innerHTML = `
        <div class="animal-img-wrap">
          <img src="${a.photo}" alt="Photo de ${a.name}" class="animal-img" loading="lazy">
          <span class="animal-badge animal-badge--${a.espece}">${badgeLabel(a.espece)}</span>
        </div>
        <div class="animal-body">
          <h3 class="animal-name">${a.name}</h3>
          <div class="animal-tags">${tagsHtml}</div>
          <p class="animal-desc">${a.desc}</p>
          <a href="mailto:contact.carapapoils@gmail.com?subject=Adoption - ${encodeURIComponent(a.name)}" class="btn btn-adopt">
            Je suis intéressé(e)
          </a>
        </div>
      `;

      grid.appendChild(card);
    });

    // Mettre à jour les filtres si le script principal en a
    if (typeof window.initFilters === 'function') window.initFilters();
  }

  // Charger au démarrage
  renderCards();

  // Réagir si une autre onglet admin modifie le localStorage
  window.addEventListener('storage', e => {
    if (e.key === STORAGE_KEY) renderCards();
  });
})();
