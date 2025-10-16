const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000/api/v1';

export async function api(path, options = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = {};
  }

  if (!res.ok) {
    const err = new Error(data.message || 'API error');
    err.status = res.status;
    err.response = data;
    throw err;
  }

  return data;
}
