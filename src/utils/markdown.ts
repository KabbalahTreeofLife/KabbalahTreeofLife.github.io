export function parseMarkdown(md: string): string {
  let html = md;

  // Code blocks (``` ... ```)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_m, lang, code) => {
    const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `\n<pre><code class="lang-${lang}">${escaped.trimEnd()}</code></pre>\n`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Headers
  html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy">');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');

  // Blockquotes
  html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');

  // Horizontal rules
  html = html.replace(/^---$/gm, '<hr>');

  // Tables - process line by line
  const lines = html.split('\n');
  const processedLines: string[] = [];
  let inTable = false;
  let tableLines: string[] = [];

  function flushTable(): void {
    if (tableLines.length === 0) return;
    let tableHtml = '<table>';
    tableLines.forEach((line, i) => {
      const cells = line.split('|').map(c => c.trim()).filter(c => c !== '');
      if (cells.length === 0) return;
      // Skip separator rows
      if (cells.every(c => /^[-:]+$/.test(c))) return;
      if (i === 0) {
        tableHtml += '<thead><tr>' + cells.map(c => `<th>${c}</th>`).join('') + '</tr></thead><tbody>';
      } else {
        tableHtml += '<tr>' + cells.map(c => `<td>${c}</td>`).join('') + '</tr>';
      }
    });
    tableHtml += '</tbody></table>';
    processedLines.push(tableHtml);
    tableLines = [];
  }

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      inTable = true;
      tableLines.push(trimmed);
    } else {
      if (inTable) {
        flushTable();
        inTable = false;
      }
      processedLines.push(line);
    }
  }
  if (inTable) flushTable();
  html = processedLines.join('\n');

  // Unordered lists
  html = html.replace(/^(?:- (.+)\n?)+/gm, (block) => {
    const items = block.trim().split('\n')
      .filter(l => l.startsWith('- '))
      .map(line => `<li>${line.replace(/^- /, '')}</li>`)
      .join('');
    return `<ul>${items}</ul>`;
  });

  // Ordered lists
  html = html.replace(/^(?:\d+\. (.+)\n?)+/gm, (block) => {
    const items = block.trim().split('\n')
      .filter(l => /^\d+\. /.test(l))
      .map(line => `<li>${line.replace(/^\d+\. /, '')}</li>`)
      .join('');
    return `<ol>${items}</ol>`;
  });

  // Paragraphs - wrap standalone text lines
  html = html.split('\n').map(line => {
    const trimmed = line.trim();
    if (!trimmed) return '';
    if (trimmed.startsWith('<h') || trimmed.startsWith('<pre') || trimmed.startsWith('<table') ||
        trimmed.startsWith('<ul') || trimmed.startsWith('<ol') || trimmed.startsWith('<blockquote') ||
        trimmed.startsWith('<hr') || trimmed.startsWith('<img') || trimmed.startsWith('</')) {
      return line;
    }
    return `<p>${trimmed}</p>`;
  }).join('\n');

  // Clean up empty lines
  html = html.replace(/\n{3,}/g, '\n\n');

  return html;
}
