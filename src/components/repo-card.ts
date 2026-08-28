import type { Repo } from '../types';

export function repoCard(repo: Repo, variant: 'featured' | 'full' = 'full'): HTMLElement {
  const card = document.createElement('a');
  card.href = `/projects/${repo.name}`;
  card.setAttribute('data-link', '');
  card.className = `repo-card repo-card--${variant}`;

  card.innerHTML = `
    <div>
      <span class="repo-name">◈ ${repo.name}</span>
      <p class="repo-desc">${repo.description || 'Project artifacts currently being cataloged.'}</p>
    </div>
    <div class="repo-meta">
      <span class="repo-lang" style="color:var(--blue)">${repo.language || 'Secret'}</span>
      <span>★ ${repo.stargazers_count}</span>
    </div>
  `;

  return card;
}
