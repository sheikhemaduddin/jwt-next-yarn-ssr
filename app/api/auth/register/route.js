import { NextResponse } from 'next/server';
import { AUTH_COOKIE, authCookieOptions } from '../../../../lib/server/authCookies';
import { signToken } from '../../../../lib/server/jwt';
import { createUser, findUserByEmail, publicUser } from '../../../../lib/server/users';

export async function POST(request) {
  try {
    const body = await request.json();
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim().toLowerCase();
    const password = String(body.password || '');

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required.' },
        { status: 400 }
      );
    }
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters.' },
        { status: 400 }
      );
    }
    if (findUserByEmail(email)) {
      return NextResponse.json(
        { error: 'An account with this email already exists.' },
        { status: 409 }
      );
    }

    const user = createUser({ name, email, password });
    const token = await signToken({
      sub: user.id,
      email: user.email,
      name: user.name,
    });

    const response = NextResponse.json({ user: publicUser(user), token });
    response.cookies.set(AUTH_COOKIE, token, authCookieOptions());
    return response;
  } catch {
    return NextResponse.json({ error: 'Registration failed.' }, { status: 500 });
  }
}
