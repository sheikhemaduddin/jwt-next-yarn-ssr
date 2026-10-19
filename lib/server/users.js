import { createHash, randomUUID } from 'crypto';

function store() {
  if (!globalThis.__novaUsers) {
    globalThis.__novaUsers = [];
  }
  return globalThis.__novaUsers;
}

export function hashPassword(password) {
  return createHash('sha256').update(password).digest('hex');
}

export function publicUser(user) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}

export function findUserByEmail(email) {
  return store().find((u) => u.email === email) || null;
}

export function createUser({ name, email, password }) {
  const user = {
    id: randomUUID(),
    name,
    email,
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString(),
  };
  store().push(user);
  return user;
}
