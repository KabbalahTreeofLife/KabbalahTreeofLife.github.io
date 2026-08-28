export interface Repo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
  homepage: string | null;
}

export interface Readme {
  content: string;
  encoding: string;
}

export type CleanupFn = () => void;
export type ViewResult = CleanupFn | Promise<CleanupFn> | void | Promise<void>;
export type ViewFn = (params?: Record<string, string>) => ViewResult;

export interface Route {
  path: string;
  view: ViewFn;
  title: string;
}
