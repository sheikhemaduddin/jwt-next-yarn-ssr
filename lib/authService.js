import { clearToken, getToken, setToken } from './authStorage';

async function parseError(response) {
  try {
    const data = await response.json();
    return data.error || 'Request failed.';
  } catch {
    return 'Request failed.';
  }
}

export async function register({ name, email, password }) {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  const data = await response.json();
  setToken(data.token);
  return data;
}

export async function login({ email, password }) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  const data = await response.json();
  setToken(data.token);
  return data;
}

export async function logout() {
  clearToken();
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
  } catch {
    // ignore network errors on logout
  }
}

export async function getSession() {
  const token = getToken();
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch('/api/auth/me', {
    credentials: 'include',
    headers,
  });

  if (!response.ok) {
    clearToken();
    return null;
  }

  const data = await response.json();
  if (data.token) {
    setToken(data.token);
  }

  return {
    token: data.token || token,
    user: data.user,
  };
}
