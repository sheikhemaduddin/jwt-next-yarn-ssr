import { SignJWT, jwtVerify } from 'jose';

const ISSUER = 'nova-spa';
const AUDIENCE = 'nova-users';
const TOKEN_TTL = '8h';

function getSecret() {
  return new TextEncoder().encode(
    process.env.JWT_SECRET || 'nova-csr-demo-secret-change-me'
  );
}

export async function signToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setExpirationTime(TOKEN_TTL)
    .sign(getSecret());
}

export async function verifyToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      issuer: ISSUER,
      audience: AUDIENCE,
    });
    return payload;
  } catch {
    return null;
  }
}

export function publicUserFromPayload(payload) {
  if (!payload?.sub) return null;
  return {
    id: String(payload.sub),
    email: payload.email ? String(payload.email) : '',
    name: payload.name ? String(payload.name) : '',
  };
}
