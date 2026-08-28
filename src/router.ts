import type { Route, CleanupFn } from './types';

const routes: Route[] = [];
let currentCleanup: CleanupFn | null = null;

export function addRoute(path: string, view: Route['view'], title: string): void {
  routes.push({ path, view, title });
}

function matchRoute(path: string): { route: Route; params: Record<string, string> } | null {
  for (const route of routes) {
    const paramNames: string[] = [];
    const regexStr = route.path.replace(/:([^/]+)/g, (_match, name) => {
      paramNames.push(name);
      return '([^/]+)';
    });
    const regex = new RegExp(`^${regexStr}$`);
    const match = path.match(regex);
    if (match) {
      const params: Record<string, string> = {};
      paramNames.forEach((name, i) => {
        params[name] = match[i + 1];
      });
      return { route, params };
    }
  }
  return null;
}

function getContainer(): HTMLElement {
  const app = document.getElementById('app');
  if (!app) throw new Error('No #app element found');
  return app;
}

export async function navigate(path: string, pushState = true): Promise<void> {
  const container = getContainer();
  const matched = matchRoute(path);

  if (!matched) {
    container.innerHTML = '<div class="view-404"><h1>404</h1><p>The archives cannot find this page.</p><a href="/" data-link class="btn">Return Home</a></div>';
    document.title = '404 | Marco Daniel Castillo';
    if (pushState) history.pushState({}, '', path);
    return;
  }

  if (currentCleanup) {
    currentCleanup();
    currentCleanup = null;
  }

  container.classList.add('view-exit');
  await new Promise(r => setTimeout(r, 200));

  container.innerHTML = '';
  container.classList.remove('view-exit');
  container.classList.add('view-enter');

  const { route, params } = matched;
  const result = route.view(params);

  const resolved = result instanceof Promise ? await result : result;
  if (typeof resolved === 'function') {
    currentCleanup = resolved;
  }

  document.title = route.title ? `${route.title} | Marco Daniel Castillo` : 'Marco Daniel Castillo';
  if (pushState) history.pushState({}, '', path);

  window.scrollTo({ top: 0 });
  updateActiveLink(path);

  requestAnimationFrame(() => {
    container.classList.remove('view-enter');
  });
}

function updateActiveLink(path: string): void {
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    link.classList.toggle('active', href === path);
  });
}

export function initRouter(): void {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest<HTMLAnchorElement>('[data-link]');
    if (!link) return;

    e.preventDefault();
    const href = link.getAttribute('href');
    if (href) navigate(href);
  });

  window.addEventListener('popstate', () => {
    navigate(location.pathname, false);
  });

  const redirect = sessionStorage.getItem('redirect');
  if (redirect) {
    sessionStorage.removeItem('redirect');
    navigate(redirect, true);
  } else {
    navigate(location.pathname, false);
  }
}
