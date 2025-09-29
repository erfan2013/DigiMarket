export function authHeaders() {
  try {
    const t = localStorage.getItem('jwt');
    return t ? { Authorization: `Bearer ${t}` } : {};
  } catch {
    return {};
  }
}