import type { Repo, Readme } from './types';

const USERNAME = 'KabbalahTreeofLife';
const BASE_URL = `https://api.github.com/users/${USERNAME}`;

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<unknown>>();
const CACHE_DURATION = 5 * 60 * 1000;

function getCached<T>(key: string): T | null {
  const entry = cache.get(key) as CacheEntry<T> | undefined;
  if (entry && Date.now() - entry.timestamp < CACHE_DURATION) {
    return entry.data;
  }
  cache.delete(key);
  return null;
}

function setCache<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() });
}

async function fetchJSON<T>(url: string): Promise<T> {
  const cached = getCached<T>(url);
  if (cached) return cached;

  const response = await fetch(url);
  if (response.status === 403) {
    throw new Error('RATE_LIMIT');
  }
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }
  const data = await response.json() as T;
  setCache(url, data);
  return data;
}

export async function fetchRepos(): Promise<Repo[]> {
  const repos = await fetchJSON<Repo[]>(`${BASE_URL}/repos?per_page=100`);
  return repos
    .filter(r => !r.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count);
}

export async function fetchRepo(name: string): Promise<Repo> {
  return fetchJSON<Repo>(`https://api.github.com/repos/${USERNAME}/${name}`);
}

export async function fetchReadme(name: string): Promise<string> {
  try {
    const readme = await fetchJSON<Readme>(`https://api.github.com/repos/${USERNAME}/${name}/readme`);
    const binary = atob(readme.content);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder('utf-8').decode(bytes);
  } catch {
    return '';
  }
}

export async function getRepoLanguages(): Promise<Record<string, number>> {
  const repos = await fetchJSON<Repo[]>(`${BASE_URL}/repos?per_page=100`);
  const langs: Record<string, number> = {};
  repos.forEach((r: Repo) => {
    if (r.language) {
      langs[r.language] = (langs[r.language] || 0) + 1;
    }
  });
  return langs;
}
