type ThemeName = 'dark' | 'light';

const STORAGE_KEY = 'portfolio-theme';

const themes: Record<ThemeName, Record<string, string>> = {
  dark: {
    '--base': '#0b0b10',
    '--surface': '#11111b',
    '--overlay': '#45475a',
    '--text': '#cdd6f4',
    '--mauve': '#cba6f7',
    '--blue': '#89b4fa',
    '--rosewater': '#f5e0dc',
    '--nav-bg': 'rgba(11, 11, 16, 0.8)',
    '--nav-bg-scroll': 'rgba(11, 11, 16, 0.95)',
    '--border': 'rgba(49, 50, 68, 0.5)',
    '--card-bg': 'rgba(17, 17, 27, 0.4)',
    '--card-border': 'rgba(49, 50, 68, 0.4)',
    '--skeleton-base': '#181825',
    '--skeleton-shine': '#1e1e2e',
    '--readme-bg': '#0b0b10',
  },
  light: {
    '--base': '#f5f0e8',
    '--surface': '#ebe4d8',
    '--overlay': '#7a7168',
    '--text': '#2c2520',
    '--mauve': '#7b2d8b',
    '--blue': '#2563a8',
    '--rosewater': '#b8524a',
    '--nav-bg': 'rgba(245, 240, 232, 0.85)',
    '--nav-bg-scroll': 'rgba(245, 240, 232, 0.95)',
    '--border': 'rgba(160, 148, 130, 0.4)',
    '--card-bg': 'rgba(235, 228, 216, 0.7)',
    '--card-border': 'rgba(160, 148, 130, 0.35)',
    '--skeleton-base': '#ddd6c8',
    '--skeleton-shine': '#d0c8b8',
    '--readme-bg': '#ebe4d8',
  },
};

function getStoredTheme(): ThemeName {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'dark' || stored === 'light') return stored;
  return 'dark';
}

function applyTheme(name: ThemeName): void {
  const root = document.documentElement;
  root.setAttribute('data-theme', name);
  const vars = themes[name];
  for (const [key, value] of Object.entries(vars)) {
    root.style.setProperty(key, value);
  }
  localStorage.setItem(STORAGE_KEY, name);
}

export function toggleTheme(): void {
  const current = document.documentElement.getAttribute('data-theme') as ThemeName;
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

export function initTheme(): void {
  applyTheme(getStoredTheme());
}
