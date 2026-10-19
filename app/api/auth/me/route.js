import { NextResponse } from 'next/server';
import { tokenFromRequest } from '../../../../lib/server/authCookies';
import { publicUserFromPayload, verifyToken } from '../../../../lib/server/jwt';

export async function GET(request) {
  const token = tokenFromRequest(request);
  const payload = await verifyToken(token);
  const user = publicUserFromPayload(payload);

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.json({ user, token });
}
