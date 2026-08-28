import { fetchRepos } from '../api';
import { repoCard } from '../components/repo-card';
import { skeletonCards } from '../components/skeleton';
import type { Repo } from '../types';
import '../styles/views/projects.css';

let allRepos: Repo[] = [];
let currentFilter = '';
let currentSearch = '';
let currentSort = 'stars';

function getFilteredRepos(): Repo[] {
  let filtered = allRepos;
  if (currentFilter) {
    filtered = filtered.filter(r => r.language === currentFilter);
  }
  if (currentSearch) {
    const q = currentSearch.toLowerCase();
    filtered = filtered.filter(r =>
      r.name.toLowerCase().includes(q) ||
      (r.description || '').toLowerCase().includes(q)
    );
  }
  switch (currentSort) {
    case 'name':
      return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    case 'updated':
      return [...filtered].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
    default:
      return [...filtered].sort((a, b) => b.stargazers_count - a.stargazers_count);
  }
}

function renderGrid(): void {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  grid.innerHTML = '';
  const filtered = getFilteredRepos();
  if (filtered.length === 0) {
    grid.innerHTML = '<p class="searching-text">No artifacts match your query.</p>';
    return;
  }
  filtered.forEach((repo, i) => {
    const card = repoCard(repo, 'full');
    card.style.animation = `fadeIn 0.6s ease forwards ${i * 0.05}s`;
    grid.appendChild(card);
  });
}

function renderFilters(): void {
  const chipContainer = document.getElementById('lang-chips');
  if (!chipContainer) return;

  const languages = [...new Set(allRepos.map(r => r.language).filter(Boolean))] as string[];

  chipContainer.innerHTML = '';
  const allChip = document.createElement('button');
  allChip.className = `chip ${!currentFilter ? 'chip--active' : ''}`;
  allChip.textContent = 'All';
  allChip.addEventListener('click', () => {
    currentFilter = '';
    updateActiveChip();
    renderGrid();
  });
  chipContainer.appendChild(allChip);

  languages.forEach(lang => {
    const chip = document.createElement('button');
    chip.className = `chip ${currentFilter === lang ? 'chip--active' : ''}`;
    chip.textContent = lang;
    chip.addEventListener('click', () => {
      currentFilter = lang;
      updateActiveChip();
      renderGrid();
    });
    chipContainer.appendChild(chip);
  });
}

function updateActiveChip(): void {
  document.querySelectorAll('.chip').forEach(chip => {
    const isActive = chip.textContent === (currentFilter || 'All');
    chip.classList.toggle('chip--active', isActive);
  });
}

export async function projects(): Promise<() => void> {
  const app = document.getElementById('app')!;

  app.innerHTML = `
    <section class="projects-view">
      <span class="section-label">THE GRIMOIRE</span>
      <h2>ACTIVE ARTIFACTS</h2>

      <div class="projects-controls">
        <div class="search-bar">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="text" id="search-input" placeholder="Search artifacts..." class="search-input">
        </div>
        <div class="controls-row">
          <div id="lang-chips" class="lang-chips"></div>
          <select id="sort-select" class="sort-select">
            <option value="stars">★ Stars</option>
            <option value="name">Name</option>
            <option value="updated">Recently Updated</option>
          </select>
        </div>
      </div>

      <div id="projects-grid" class="repo-grid"></div>
    </section>
  `;

  const grid = document.getElementById('projects-grid')!;
  grid.appendChild(skeletonCards(6));

  const searchInput = document.getElementById('search-input') as HTMLInputElement;
  const sortSelect = document.getElementById('sort-select') as HTMLSelectElement;

  const onSearch = () => {
    currentSearch = searchInput.value;
    renderGrid();
  };
  const onSort = () => {
    currentSort = sortSelect.value;
    renderGrid();
  };

  searchInput.addEventListener('input', onSearch);
  sortSelect.addEventListener('change', onSort);

  try {
    allRepos = await fetchRepos();
    renderFilters();
    renderGrid();
  } catch {
    grid.innerHTML = '<p class="searching-text">The archives are currently sealed.</p>';
  }

  return () => {
    searchInput.removeEventListener('input', onSearch);
    sortSelect.removeEventListener('change', onSort);
  };
}
