import { initRouter, addRoute } from './router';
import { initTheme } from './theme';
import { initThemeToggle } from './components/theme-toggle';
import { home } from './views/home';
import { projects } from './views/projects';
import { projectDetail } from './views/project-detail';
import { about } from './views/about';
import { contact } from './views/contact';
import { stats } from './views/stats';

import './styles/theme.css';
import './styles/global.css';
import './styles/transitions.css';
import './styles/skeleton.css';
import './styles/views/repo-card.css';

declare const particlesJS: (id: string, config: Record<string, unknown>) => void;

function initParticles(): void {
  particlesJS('particles-js', {
    particles: {
      number: { value: 90, density: { enable: true, value_area: 800 } },
      color: { value: '#cba6f7' },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: '#cba6f7', opacity: 0.3, width: 1.5 },
      move: { enable: true, speed: 1.2 },
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'grab' } },
      modes: { grab: { distance: 200, line_linked: { opacity: 0.6 } } },
    },
  });
}

function initNav(): void {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    if (nav) {
      nav.style.padding = window.scrollY > 50 ? '15px 0' : '20px 0';
      nav.style.background = window.scrollY > 50
        ? 'var(--nav-bg-scroll)'
        : 'var(--nav-bg)';
    }
  });
}

function initParticlesScript(): void {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
  script.onload = initParticles;
  document.body.appendChild(script);
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initThemeToggle();
  initNav();
  initParticlesScript();

  addRoute('/', home, 'Home');
  addRoute('/projects', projects, 'The Grimoire');
  addRoute('/projects/:name', projectDetail, 'Project');
  addRoute('/about', about, 'About Me');
  addRoute('/contact', contact, 'Contact');
  addRoute('/stats', stats, 'Chronicles');

  initRouter();
});
