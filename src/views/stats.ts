import { skeletonStats } from '../components/skeleton';
import '../styles/views/stats.css';

const USERNAME = 'KabbalahTreeofLife';

export function stats(): () => void {
  const app = document.getElementById('app')!;

  app.innerHTML = `
    <section class="stats-view">
      <span class="section-label">LOGBOOK</span>
      <h2>CHRONICLES OF EFFORT</h2>
      <div id="stats-container" class="stats-wrap"></div>
    </section>
  `;

  const container = document.getElementById('stats-container')!;
  container.appendChild(skeletonStats());

  const lightParam = document.documentElement.getAttribute('data-theme') === 'light'
    ? '&bg_color=eff1f5&title_color=8839ef&text_color=4c4f69&icon_color=1e66f5'
    : '&bg_color=0b0b10&title_color=cba6f7&text_color=cdd6f4&icon_color=89b4fa';

  container.innerHTML = `
    <img
      src="https://github-readme-stats-fast.vercel.app/api?username=${USERNAME}&show_icons=true&hide_border=true${lightParam}"
      alt="GitHub Stats" onerror="this.style.display='none'" class="stats-img">
    <img
      src="https://github-readme-stats-fast.vercel.app/api/top-langs/?username=${USERNAME}&layout=compact&hide_border=true${lightParam}"
      alt="Top Languages" onerror="this.style.display='none'" class="stats-img">
  `;

  return () => {};
}
