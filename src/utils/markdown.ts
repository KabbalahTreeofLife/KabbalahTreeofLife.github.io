import { marked } from 'marked';

marked.setOptions({
  gfm: true,
  breaks: false,
});

export function parseMarkdown(md: string): string {
  const raw = marked.parse(md) as string;
  return raw;
}
