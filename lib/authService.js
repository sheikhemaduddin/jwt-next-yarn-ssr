import { signToken, verifyToken } from './jwt';
import { clearToken, getToken, getUsers, saveUsers, setToken } from './authStorage';

async function hashPassword(password) {
  const data = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function publicUser(user) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}

export async function register({ name, email, password }) {
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedName = name.trim();

  if (!trimmedName || !trimmedEmail || !password) {
    throw new Error('Name, email, and password are required.');
  }
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters.');
  }

  const users = getUsers();
  if (users.some((u) => u.email === trimmedEmail)) {
    throw new Error('An account with this email already exists.');
  }

  const user = {
    id: crypto.randomUUID(),
    name: trimmedName,
    email: trimmedEmail,
    passwordHash: await hashPassword(password),
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  saveUsers(users);

  const token = await signToken({
    sub: user.id,
    email: user.email,
    name: user.name,
  });
  setToken(token);

  return { user: publicUser(user), token };
}

export async function login({ email, password }) {
  const trimmedEmail = email.trim().toLowerCase();
  if (!trimmedEmail || !password) {
    throw new Error('Email and password are required.');
  }

  const users = getUsers();
  const user = users.find((u) => u.email === trimmedEmail);
  if (!user) {
    throw new Error('Invalid email or password.');
  }

  const passwordHash = await hashPassword(password);
  if (passwordHash !== user.passwordHash) {
    throw new Error('Invalid email or password.');
  }

  const token = await signToken({
    sub: user.id,
    email: user.email,
    name: user.name,
  });
  setToken(token);

  return { user: publicUser(user), token };
}

export function logout() {
  clearToken();
}

export async function getSession() {
  const token = getToken();
  if (!token) return null;

  const payload = await verifyToken(token);
  if (!payload) {
    clearToken();
    return null;
  }

  return {
    token,
    user: {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
    },
  };
}
