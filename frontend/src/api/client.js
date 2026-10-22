const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function request(path, { method = 'GET', body, token, signal } = {}) {
  const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method, headers, body: body ? JSON.stringify(body) : undefined, signal,
    });
  } catch (err) {
    throw new Error('Backend is unreachable. Start the AgroNexus server and try again.');
  }

  let data = {};
  try { data = await res.json(); } catch {}

  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

export const api = {
  get: (path, token, options = {}) => request(path, { token, ...options }),
  post: (path, body, token, options = {}) => request(path, { method: 'POST', body, token, ...options }),
  del: (path, token) => request(path, { method: 'DELETE', token }),
};
