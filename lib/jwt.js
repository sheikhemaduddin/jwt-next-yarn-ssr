import { SignJWT, jwtVerify } from 'jose';

// Demo secret for this CSR SPA. Swap for server-issued tokens in production.
const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXT_PUBLIC_JWT_SECRET || 'nova-csr-demo-secret-change-me'
);

const TOKEN_TTL = '8h';
const ISSUER = 'nova-spa';
const AUDIENCE = 'nova-users';

export async function signToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setExpirationTime(TOKEN_TTL)
    .sign(JWT_SECRET);
}

export async function verifyToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, {
      issuer: ISSUER,
      audience: AUDIENCE,
    });
    return payload;
  } catch {
    return null;
  }
}
