import { NextResponse } from 'next/server';
import { AUTH_COOKIE, authCookieOptions } from '../../../../lib/server/authCookies';
import { signToken } from '../../../../lib/server/jwt';
import { findUserByEmail, hashPassword, publicUser } from '../../../../lib/server/users';

export async function POST(request) {
  try {
    const body = await request.json();
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const user = findUserByEmail(email);
    if (!user || user.passwordHash !== hashPassword(password)) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    const token = await signToken({
      sub: user.id,
      email: user.email,
      name: user.name,
    });

    const response = NextResponse.json({ user: publicUser(user), token });
    response.cookies.set(AUTH_COOKIE, token, authCookieOptions());
    return response;
  } catch {
    return NextResponse.json({ error: 'Login failed.' }, { status: 500 });
  }
}
