import { fetchRepo, fetchReadme } from '../api';
import { skeletonStats } from '../components/skeleton';
import { parseMarkdown } from '../utils/markdown';
import '../styles/views/project-detail.css';

export async function projectDetail(params?: Record<string, string>): Promise<() => void> {
  const app = document.getElementById('app')!;
  const name = params?.name || '';

  app.innerHTML = `
    <section class="detail-view">
      <a href="/projects" data-link class="back-link">← Back to Grimoire</a>
      <div id="detail-content"></div>
    </section>
  `;

  const content = document.getElementById('detail-content')!;
  content.appendChild(skeletonStats());

  try {
    const [repo, readme] = await Promise.all([
      fetchRepo(name),
      fetchReadme(name),
    ]);

    const topicsHtml = repo.topics?.length
      ? `<div class="repo-topics">${repo.topics.map(t => `<span class="topic-tag">${t}</span>`).join('')}</div>`
      : '';

    const readmeHtml = readme
      ? `<div class="readme-section"><h3>README</h3><div class="readme-content">${parseMarkdown(readme)}</div></div>`
      : '';

    content.innerHTML = `
      <div class="detail-header">
        <h1 class="detail-title">◈ ${repo.name}</h1>
        ${repo.description ? `<p class="detail-desc">${repo.description}</p>` : ''}
        ${topicsHtml}
      </div>

      <div class="detail-stats">
        <div class="stat-item">
          <span class="stat-label">Language</span>
          <span class="stat-value" style="color:var(--blue)">${repo.language || 'Secret'}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Stars</span>
          <span class="stat-value">★ ${repo.stargazers_count}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Forks</span>
          <span class="stat-value">⑂ ${repo.forks_count}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Watchers</span>
          <span class="stat-value">👁 ${repo.watchers_count}</span>
        </div>
      </div>

      <div class="detail-actions">
        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="btn">VIEW ON GITHUB</a>
        ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" rel="noopener noreferrer" class="btn btn--secondary">LIVE DEMO</a>` : ''}
      </div>

      ${readmeHtml}
    `;
  } catch {
    content.innerHTML = '<p class="searching-text">This artifact could not be retrieved from the archives.</p>';
  }

  return () => {};
}
