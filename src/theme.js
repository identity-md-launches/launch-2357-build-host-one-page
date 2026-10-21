// Reading and navigation do not depend on this optional preference control.
const control = document.querySelector('#theme-toggle');
const root = document.documentElement;
const preference = window.matchMedia('(prefers-color-scheme: dark)');
const storageKey = 'feed-claus-theme';

/** @param {boolean} dark */
function applyTheme(dark) {
  root.dataset.theme = dark ? 'dark' : 'light';
  control?.setAttribute('aria-pressed', String(dark));
}

if (control instanceof HTMLButtonElement) {
  let saved = null;
  try { saved = localStorage.getItem(storageKey); } catch { /* Preference storage is optional. */ }
  applyTheme(saved === 'dark' || (saved !== 'light' && preference.matches));
  control.hidden = false;
  control.addEventListener('click', () => {
    const dark = root.dataset.theme !== 'dark';
    applyTheme(dark);
    try { localStorage.setItem(storageKey, dark ? 'dark' : 'light'); } catch { /* The switch still works. */ }
  });
  preference.addEventListener('change', () => {
    let saved = null;
    try { saved = localStorage.getItem(storageKey); } catch { /* Use the system preference. */ }
    if (saved !== 'light' && saved !== 'dark') applyTheme(preference.matches);
  });
}
