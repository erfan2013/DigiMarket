export function getInitialTheme(){
  try {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function applyTheme(t){
  const html = document.documentElement; // <html>
  if (t === 'dark') html.classList.add('dark');
  else html.classList.remove('dark');
  try { localStorage.setItem('theme', t); } catch {}
}
