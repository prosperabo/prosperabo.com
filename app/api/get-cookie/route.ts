// src/app/api/get-cookie/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = cookies();
  const token =
    cookieStore.get('__Secure-next-auth.session-token')?.value ||
    cookieStore.get('next-auth.session-token')?.value;

  if (!token) {
    return new NextResponse('No auth token found', { status: 401 });
  }

  return new NextResponse(JSON.stringify({ token }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
