import { fetchRepos } from '../api';
import { repoCard } from '../components/repo-card';
import { skeletonCards } from '../components/skeleton';
import '../styles/views/home.css';

export async function home(): Promise<() => void> {
  const app = document.getElementById('app')!;

  app.innerHTML = `
    <header class="hero">
      <div class="status-badge">CURRENT STATUS: 2ND YEAR SE STUDENT</div>
      <h1>MARCO DANIEL<br>CASTILLO</h1>
      <p class="identity">Software Engineer • Digital Alchemist</p>
      <p class="location-text">
        Currently architecting digital artifacts in the heart of Western Visayas.
      </p>
      <a href="/projects" data-link class="btn">OPEN THE GRIMOIRE</a>
    </header>

    <section class="featured-section">
      <span class="section-label">THE GRIMOIRE</span>
      <h2>FEATURED ARTIFACTS</h2>
      <div id="featured-grid" class="repo-grid"></div>
      <div class="featured-cta">
        <a href="/projects" data-link class="btn">VIEW ALL PROJECTS</a>
      </div>
    </section>
  `;

  const grid = document.getElementById('featured-grid')!;
  grid.appendChild(skeletonCards(3));

  try {
    const repos = await fetchRepos();
    const featured = repos.slice(0, 3);
    grid.innerHTML = '';
    featured.forEach((repo, i) => {
      const card = repoCard(repo, 'featured');
      card.style.animation = `fadeIn 0.6s ease forwards ${i * 0.1}s`;
      grid.appendChild(card);
    });
  } catch {
    grid.innerHTML = '<p class="searching-text">The archives are currently sealed.</p>';
  }

  return () => {};
}
