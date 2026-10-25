/* ─────────────────────────────────────────────────────────────────────────────
   FRENCH TOAST — Interactive Menu
   Filter · Search · Modal
   ─────────────────────────────────────────────────────────────────────────── */

(function () {
  'use strict';

  const menuRoot     = document.getElementById('menu-root');
  const filterBar    = document.getElementById('menu-filter-bar');
  const searchInput  = document.getElementById('menu-search');
  const clearBtn     = document.getElementById('menu-search-clear');
  const modal        = document.getElementById('item-modal');
  const modalClose   = document.getElementById('item-modal-close');
  const modalBackdrop = document.getElementById('item-modal-backdrop');

  if (!menuRoot) return;

  let activeCategory = 'all';
  let searchQuery    = '';
  let focusTrigger   = null;

  const DIET_LABELS = MENU_DATA.dietLabels || { V: 'Veg', E: 'Egg', NV: 'Non-veg' };

  function formatPrice(price) {
    return '₹' + Number(price).toLocaleString('en-IN');
  }

  function dietBadge(diet) {
    if (!diet) return '';
    const label = DIET_LABELS[diet] || diet;
    return `<span class="badge-diet badge-diet--${diet.toLowerCase()}">${label}</span>`;
  }

  function dietLabel(diet) {
    return (DIET_LABELS[diet] || diet || '').toLowerCase();
  }

  // ── Category hash support ─────────────────────────────────────────────────
  function getCategoryFromHash() {
    const hash = window.location.hash.replace('#', '');
    return hash && MENU_DATA.categories.find(c => c.id === hash) ? hash : 'all';
  }

  activeCategory = getCategoryFromHash();

  // ── Render filter pills ───────────────────────────────────────────────────
  function renderFilters() {
    if (!filterBar) return;
    filterBar.innerHTML = '';
    MENU_DATA.categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'filter-pill' + (cat.id === activeCategory ? ' active' : '');
      btn.textContent = cat.label;
      btn.setAttribute('aria-pressed', cat.id === activeCategory);
      btn.dataset.catId = cat.id;
      btn.addEventListener('click', () => {
        activeCategory = cat.id;
        history.replaceState(null, '', cat.id === 'all' ? '#' : '#' + cat.id);
        renderFilters();
        renderMenu();
      });
      filterBar.appendChild(btn);
    });
  }

  // ── Search ────────────────────────────────────────────────────────────────
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      searchQuery = searchInput.value.trim().toLowerCase();
      clearBtn && clearBtn.classList.toggle('visible', searchQuery.length > 0);
      renderMenu();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      clearBtn.classList.remove('visible');
      searchInput.focus();
      renderMenu();
    });
  }

  // ── Filter items ──────────────────────────────────────────────────────────
  function getFilteredItems() {
    return MENU_DATA.items.filter(item => {
      const catMatch = activeCategory === 'all' || item.category === activeCategory;
      const haystack = [
        item.name,
        item.description,
        dietLabel(item.diet),
        item.diet,
      ].join(' ').toLowerCase();
      const searchMatch = !searchQuery || haystack.includes(searchQuery);
      return catMatch && searchMatch;
    });
  }

  // ── Group by category ─────────────────────────────────────────────────────
  function groupByCategory(items) {
    const groups = {};
    items.forEach(item => {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    });
    return groups;
  }

  // ── Render a single item card ─────────────────────────────────────────────
  function renderItemCard(item, isFirst) {
    const featured = isFirst && item.image;
    const card = document.createElement('article');
    card.className = 'menu-item' + (featured ? ' featured' : '');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', item.name);
    card.dataset.itemId = item.id;

    const sigBadge = item.signature
      ? `<span class="badge-signature">★ Signature</span>`
      : '';
    const dietTags = dietBadge(item.diet);

    card.innerHTML = `
      ${item.image ? `
        <div class="menu-item-img">
          <img
            src="${item.image}"
            alt="${item.name}"
            loading="lazy"
            width="400"
            height="${featured ? '533' : '300'}"
          />
        </div>` : ''}
      <div class="menu-item-meta">
        <div class="menu-item-top">
          <h3 class="menu-item-name">${item.name}</h3>
          <span class="menu-item-price">${formatPrice(item.price)}</span>
        </div>
        <p class="menu-item-desc">${item.description}</p>
        <div class="menu-item-tags">
          ${sigBadge}
          ${dietTags}
        </div>
      </div>
    `;

    card.addEventListener('click', () => openModal(item, card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(item, card);
      }
    });

    return card;
  }

  function keepMenuInView() {
    const bar = document.querySelector('.menu-filters-bar');
    if (!bar) return;
    const y = bar.getBoundingClientRect().top + window.scrollY;
    if (window.scrollY > y + 24) {
      window.scrollTo({ top: Math.max(0, y), behavior: 'instant' });
    }
  }

  // ── Render menu ───────────────────────────────────────────────────────────
  function renderMenu() {
    const items = getFilteredItems();
    
    // FLIP: record old positions before DOM change
    const oldCards = Array.from(menuRoot.querySelectorAll('.menu-item, .menu-item-compact'));
    const oldPositions = new Map();
    oldCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      oldPositions.set(card.dataset.itemId, {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      });
    });

    // Mark exiting items
    oldCards.forEach(card => {
      const itemId = card.dataset.itemId;
      if (!items.find(i => i.id === itemId)) {
        card.classList.add('mo-menu-exiting');
      }
    });

    menuRoot.innerHTML = '';

    if (items.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'menu-empty';
      empty.innerHTML = `
        <p>Nothing found.</p>
        <button id="clear-search-empty">Clear search</button>
      `;
      menuRoot.appendChild(empty);
      document.getElementById('clear-search-empty')?.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        clearBtn?.classList.remove('visible');
        activeCategory = 'all';
        renderFilters();
        renderMenu();
      });
      keepMenuInView();
      return;
    }

    if (activeCategory === 'all' && !searchQuery) {
      const popular = MENU_DATA.items.filter(item => item.popular);
      if (popular.length) {
        const popularSection = document.createElement('section');
        popularSection.className = 'menu-category-section menu-popular-section reveal';
        popularSection.innerHTML = `
          <header class="menu-category-header">
            <h2 class="menu-category-title">Popular</h2>
            <span class="menu-category-count">${popular.length} favourites</span>
          </header>
        `;
        const popularGrid = document.createElement('div');
        popularGrid.className = 'menu-items-grid has-featured';
        popular.forEach((item, idx) => {
          popularGrid.appendChild(renderItemCard(item, idx === 0));
        });
        popularSection.appendChild(popularGrid);
        menuRoot.appendChild(popularSection);
      }
    }

    if (activeCategory !== 'all' || searchQuery) {
      // Flat grid when filtered or searched
      const section = document.createElement('section');
      section.className = 'menu-category-section';
      const catMeta = MENU_DATA.categories.find(c => c.id === activeCategory);
      if (catMeta && activeCategory !== 'all') {
        const header = document.createElement('header');
        header.className = 'menu-category-header';
        header.innerHTML = `
          <div>
            <h2 class="menu-category-title">${catMeta.label}</h2>
            ${catMeta.note ? `<p class="menu-category-note">${catMeta.note}</p>` : ''}
          </div>
          <span class="menu-category-count">${items.length} item${items.length !== 1 ? 's' : ''}</span>
        `;
        section.appendChild(header);
      }

      const grid = document.createElement('div');
      grid.className = 'menu-items-grid' + (items[0]?.image ? ' has-featured' : '');

      items.forEach((item, idx) => {
        grid.appendChild(renderItemCard(item, idx === 0));
      });

      section.appendChild(grid);
      menuRoot.appendChild(section);
    } else {
      // Grouped by category
      const groups = groupByCategory(items);
      const catOrder = MENU_DATA.categories.filter(c => c.id !== 'all').map(c => c.id);

      catOrder.forEach(catId => {
        if (!groups[catId]) return;
        const catItems = groups[catId];
        const catMeta = MENU_DATA.categories.find(c => c.id === catId);

        const section = document.createElement('section');
        section.className = 'menu-category-section reveal';

        const header = document.createElement('header');
        header.className = 'menu-category-header';
        header.innerHTML = `
          <div>
            <h2 class="menu-category-title">${catMeta.label}</h2>
            ${catMeta.note ? `<p class="menu-category-note">${catMeta.note}</p>` : ''}
          </div>
          <span class="menu-category-count">${catItems.length} item${catItems.length !== 1 ? 's' : ''}</span>
        `;

        const imageItems = catItems.filter(i => i.image);
        const textItems  = catItems.filter(i => !i.image);

        section.appendChild(header);

        if (imageItems.length > 0) {
          const grid = document.createElement('div');
          grid.className = 'menu-items-grid' + (imageItems.length >= 2 ? ' has-featured' : '');
          imageItems.forEach((item, idx) => {
            grid.appendChild(renderItemCard(item, idx === 0));
          });
          section.appendChild(grid);
        }

        if (textItems.length > 0) {
          const list = document.createElement('div');
          list.className = 'menu-compact-list';
          textItems.forEach(item => {
            const row = document.createElement('div');
            row.className = 'menu-item-compact';
            row.setAttribute('tabindex', '0');
            row.dataset.itemId = item.id;

            const sigBadge = item.signature ? `<span class="badge-signature">★ Signature</span>` : '';

            row.innerHTML = `
              <div class="menu-item-compact-info">
                <p class="menu-item-compact-name">${item.name}</p>
                <p class="menu-item-compact-desc">${item.description}</p>
                <div class="menu-item-tags" style="margin-top:6px;">${sigBadge}${dietBadge(item.diet)}</div>
              </div>
              <span class="menu-item-compact-price">${formatPrice(item.price)}</span>
            `;

            row.addEventListener('click', () => openModal(item, row));
            row.addEventListener('keydown', (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(item, row);
              }
            });

            list.appendChild(row);
          });
          section.appendChild(list);
        }

        menuRoot.appendChild(section);
      });
    }

    // FLIP: animate items that moved
    requestAnimationFrame(() => {
      const newCards = Array.from(menuRoot.querySelectorAll('.menu-item, .menu-item-compact'));
      
      newCards.forEach(card => {
        const itemId = card.dataset.itemId;
        const oldPos = oldPositions.get(itemId);
        
        if (!oldPos) {
          // New item - mark as entering
          card.classList.add('mo-menu-entering');
          return;
        }
        
        // Calculate new position
        const newRect = card.getBoundingClientRect();
        const deltaX = oldPos.left - newRect.left;
        const deltaY = oldPos.top - newRect.top;
        const deltaW = oldPos.width / newRect.width;
        const deltaH = oldPos.height / newRect.height;
        
        // Only animate if there's meaningful movement (>1px)
        if (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1 || Math.abs(deltaW - 1) > 0.01 || Math.abs(deltaH - 1) > 0.01) {
          // Invert: apply transform to move card to old position
          card.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(${deltaW}, ${deltaH})`;
          card.style.transition = 'none';
          
          // Play: remove transform to animate to new position
          requestAnimationFrame(() => {
            card.style.transform = '';
            card.style.transition = '';
          });
        }
      });
      
      // Reinitialize reveal for newly added items
      const newReveals = menuRoot.querySelectorAll('.reveal:not(.visible)');
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });
      newReveals.forEach(el => obs.observe(el));
    });

    keepMenuInView();
  }

  // ── Modal ─────────────────────────────────────────────────────────────────
  function openModal(item, triggerEl) {
    focusTrigger = triggerEl;

    const sigBadge = item.signature ? `<span class="badge-signature">★ Signature</span>` : '';

    modal.querySelector('.item-modal-img').innerHTML = item.image
      ? `<img src="${item.image}" alt="${item.name}" width="350" height="467" />`
      : '';
    modal.querySelector('.item-modal-name').textContent  = item.name;
    modal.querySelector('.item-modal-price').textContent = formatPrice(item.price);
    modal.querySelector('.item-modal-desc').textContent  = item.description;
    modal.querySelector('.item-modal-tags').innerHTML    = `${sigBadge}${dietBadge(item.diet)}`;

    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';

    setTimeout(() => modalClose.focus(), 50);
  }

  function closeModal() {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
    focusTrigger?.focus();
    focusTrigger = null;
  }

  if (modalClose)    modalClose.addEventListener('click', closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop?.classList.contains('open')) {
      closeModal();
    }
  });

  // ── Init ──────────────────────────────────────────────────────────────────
  renderFilters();
  renderMenu();

  window.addEventListener('hashchange', () => {
    activeCategory = getCategoryFromHash();
    renderFilters();
    renderMenu();
  });

})();
