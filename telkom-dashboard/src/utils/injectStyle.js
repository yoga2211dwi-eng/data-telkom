export const injectStyle = (css) => {
  if (typeof document !== 'undefined') {
    const existing = document.getElementById('alista-global');
    const styleEl = existing || document.createElement('style');
    styleEl.id = 'alista-global';
    styleEl.textContent = css;
    if (!existing) document.head.appendChild(styleEl);
  }
};
