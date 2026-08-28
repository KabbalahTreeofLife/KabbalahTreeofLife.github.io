export function skeletonCards(count: number): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'repo-grid';
  for (let i = 0; i < count; i++) {
    const card = document.createElement('div');
    card.className = 'skeleton skeleton-card';
    card.style.animationDelay = `${i * 0.1}s`;
    wrapper.appendChild(card);
  }
  return wrapper;
}

export function skeletonStats(): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'stats-skeleton';
  wrapper.innerHTML = `
    <div class="skeleton skeleton-img"></div>
    <div class="skeleton skeleton-img"></div>
  `;
  return wrapper;
}
